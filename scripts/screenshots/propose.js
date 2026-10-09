#!/usr/bin/env node
'use strict';

// Vision pass over the screenshot manifest, two modes:
//
//   propose (default)  For each entry, send the OLD screenshot plus its alt text, page context and the
//                      catalog of redesigned-Dashboard routes to Claude, and get back a proposal for
//                      dashboardUrl, steps, crop, mask, newPath and altText. Written to entry.proposal.
//                      With --apply the proposal fills any of those fields that are still empty.
//   verify             For entries that have both the old image and a new capture on disk, ask Claude
//                      whether the new capture shows the same screen and state. Written to entry.verification.
//
//   node scripts/screenshots/propose.js [propose|verify] [--apply] [--force] [--limit=N] [--section=x] [--id=x]
//        [--root=../..] [--manifest=manifest.json] [--model=claude-opus-5] [--effort=medium] [--concurrency=3] [--dry-run]
//
// Auth: ANTHROPIC_API_KEY (or an `ant auth login` profile). ANTHROPIC_BASE_URL points the SDK at an internal
// proxy if the org uses one. Nothing is written to the manifest on --dry-run; it prints the request context.
//
// Human review is still the gate: a proposal is a starting point with a confidence score, never an approval.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('../lib/args');
const mdx = require('../lib/mdx');
const manifest = require('./lib/manifest');

const DEFAULT_MODEL = 'claude-opus-5';
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MEDIA_TYPES = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp' };

// ---------- schemas (zod is loaded lazily so unit tests can run without the SDK installed) ----------

function schemas() {
  const { z } = require('zod');
  const Step = z.object({
    action: z.enum(['click', 'hover', 'waitFor', 'fill', 'wait']),
    selector: z.string(),
    value: z.string(),
  });
  const Proposal = z.object({
    screen: z.string(),
    subscreen: z.string(),
    dashboardUrl: z.string(),
    steps: z.array(Step),
    crop: z.string(),
    mask: z.array(z.string()),
    newPath: z.string(),
    altText: z.string(),
    confidence: z.number().min(0).max(1),
    rationale: z.string(),
    needsHuman: z.string().nullable(),
  });
  const Verification = z.object({
    sameScreen: z.boolean(),
    sameState: z.boolean(),
    score: z.number().min(0).max(1),
    issues: z.array(z.string()),
    summary: z.string(),
  });
  return { Proposal, Verification };
}

// ---------- context ----------

function loadCatalog(root) {
  const mapFile = path.join(root, 'scripts', 'data', 'dashboard-link-map.json');
  const notesFile = path.join(__dirname, 'dashboard-map.md');
  const routes = new Set();
  if (fs.existsSync(mapFile)) {
    for (const e of JSON.parse(fs.readFileSync(mapFile, 'utf8'))) if (e.new) routes.add(e.new.trim());
  }
  const notes = fs.existsSync(notesFile) ? fs.readFileSync(notesFile, 'utf8') : '';
  return { routes: [...routes].sort(), notes };
}

function readImage(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  const media_type = MEDIA_TYPES[ext];
  if (!media_type) return { error: `unsupported image type ${ext || '(none)'}` };
  if (!fs.existsSync(absPath)) return { error: 'image missing on disk' };
  const buf = fs.readFileSync(absPath);
  if (buf.length > MAX_IMAGE_BYTES) return { error: `image is ${(buf.length / 1048576).toFixed(1)} MB, over the 5 MB limit` };
  return { block: { type: 'image', source: { type: 'base64', media_type, data: buf.toString('base64') } } };
}

function pageContext(root, entry) {
  const ref = (entry.refs || []).find((r) => r.locale === 'en') || (entry.refs || [])[0];
  if (!ref) return { title: '', excerpt: '', file: '' };
  const abs = path.join(root, ref.file);
  if (!fs.existsSync(abs)) return { title: '', excerpt: '', file: ref.file };
  const lines = fs.readFileSync(abs, 'utf8').split('\n');
  const title = (lines.find((l) => /^title:\s*/.test(l)) || '').replace(/^title:\s*/, '').replace(/^['"]|['"]$/g, '');
  let idx = lines.findIndex((l) => l.includes(entry.currentPath));
  if (idx === -1) idx = Math.max(0, (ref.line || 1) - 1);
  const excerpt = lines.slice(Math.max(0, idx - 12), idx + 13).join('\n');
  return { title, excerpt, file: ref.file };
}

const SYSTEM_PROPOSE = `You map screenshots from the OLD Auth0 Dashboard to the REDESIGNED Auth0 Dashboard and write capture instructions for a Playwright script.

You receive one old screenshot, its alt text, the docs page it appears on with surrounding text, and a catalog of routes in the redesigned Dashboard. Return a proposal for where and how to capture the equivalent screenshot in the new UI.

Rules:
- dashboardUrl: a path starting with /dashboard/{region}/{tenant}/ followed by the route. Use only routes from the catalog or notes; if the screen is not in the catalog, pick the closest route and say so in needsHuman. Use lookup placeholders for ids: {client:Acme Bot}, {api:Travel0 API}, {connection:Username-Password-Authentication}, {org:Big Holdings, Co.}, {role:Travel Agent}, {action:Log login event}, {user:email}. Never invent ids.
- steps: the minimum actions to reach the state shown (open a tab, expand a section, open a modal). Playwright selectors, preferring role and text: role=tab[name='Settings'], role=button[name='Create'], text=Advanced Settings. Empty if the deep link already shows the state. action=wait uses value as milliseconds; action=fill uses selector and value.
- crop: the smallest element that contains everything the old screenshot shows (a form, a table, a card, a modal), not the whole page. Use a stable selector: role, aria-label, data-testid if visible in the notes, or a heading-anchored container. The docs policy caps Dashboard images at 600px wide, so prefer tight crops.
- mask: selectors for secrets, tenant names, dates, user emails or anything that changes between runs.
- newPath: /docs/images/dashboard/{screen}/{subscreen}/dashboard-{screen}-{subscreen}-light.png for Dashboard screens, or /docs/images/{feature}/{job}/{feature}-{job}-light.png for feature flows. Lowercase kebab-case segments. If the screenshot is not of the Dashboard at all (an app, a terminal, a diagram), say so in needsHuman and keep the existing newPath.
- altText: "Auth0 Dashboard <Section> <Subsection> <view>" in sentence form, under 120 characters, describing what the image shows, not what to do.
- confidence: your honest probability that a reviewer accepts the proposal without edits. Below 0.5 when the route or the state is a guess.
- needsHuman: null, or one sentence on what a person must check or decide.

Respond with the JSON object only.`;

const SYSTEM_VERIFY = `You compare two Auth0 Dashboard screenshots: ORIGINAL from the old Dashboard, and NEW CAPTURE from the redesigned Dashboard taken automatically for the same docs page.

Judge whether the new capture is an acceptable replacement: the same screen (sameScreen), the same state and content focus such as the same tab, modal, or section (sameState), with nothing important cut off, no error or loading state, no empty table where the original had rows, and no sensitive values visible. Visual restyling is expected and is not an issue. List concrete issues a reviewer must fix. score is your probability that a reviewer accepts the new capture as-is.

Respond with the JSON object only.`;

function catalogText(catalog) {
  const routes = catalog.routes.length ? catalog.routes.map((r) => `- ${r}`).join('\n') : '- (no link map found; rely on the notes and say so in needsHuman)';
  return `Redesigned Dashboard route catalog (from the docs link map):\n${routes}\n\nHuman notes on the redesigned Dashboard (navigation, stable selectors):\n${catalog.notes || '(none yet)'}`;
}

function buildProposeRequest(entry, ctx) {
  const img = readImage(path.join(ctx.root, 'main', entry.currentPath));
  if (img.error) return { error: img.error };
  const page = pageContext(ctx.root, entry);
  const text = [
    `Manifest entry id: ${entry.id}`,
    `Current image path: ${entry.currentPath}`,
    `Current alt text: ${entry.altText || '(none)'}`,
    `Proposed new path (from file name, may be wrong): ${entry.newPath}`,
    `Docs page: ${page.title || '(unknown title)'} (${page.file})`,
    entry.pages && entry.pages.length ? `Page URLs: ${entry.pages.join(', ')}` : '',
    `Referenced from ${(entry.refs || []).length} MDX file(s) across locales.`,
    '',
    'Surrounding MDX:',
    '---',
    page.excerpt || '(no excerpt)',
    '---',
  ].filter((l) => l !== '').join('\n');
  return {
    system: [
      { type: 'text', text: SYSTEM_PROPOSE },
      { type: 'text', text: catalogText(ctx.catalog), cache_control: { type: 'ephemeral' } },
    ],
    messages: [{ role: 'user', content: [img.block, { type: 'text', text }] }],
  };
}

function buildVerifyRequest(entry, ctx) {
  const oldImg = readImage(path.join(ctx.root, 'main', entry.currentPath));
  const newImg = readImage(path.join(ctx.root, 'main', entry.newPath));
  if (oldImg.error) return { error: `original: ${oldImg.error}` };
  if (newImg.error) return { error: `new capture: ${newImg.error}` };
  const page = pageContext(ctx.root, entry);
  return {
    system: [{ type: 'text', text: SYSTEM_VERIFY, cache_control: { type: 'ephemeral' } }],
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: `ORIGINAL (old Dashboard). Docs page: ${page.title || page.file}. Alt text: ${entry.altText || '(none)'}` },
          oldImg.block,
          { type: 'text', text: `NEW CAPTURE (redesigned Dashboard), taken at ${entry.dashboardUrl} with crop "${entry.crop}".` },
          newImg.block,
        ],
      },
    ],
  };
}

// Route comparison ignores host and tenant prefix: both of these become "/applications":
//   https://manage.auth0.com/dashboard/*/applications, https://manage.auth0.com/dashboard/#/applications,
//   https://manage.auth0.com/dashboard/{region}/{tenant}/applications, /dashboard/{region}/{tenant}/applications
function routeTail(url) {
  return url
    .replace(/^https?:\/\/manage\.auth0\.com/, '')
    .replace(/^\/dashboard/, '')
    .replace(/^\/(#|\*|\{region\}\/\{tenant\})(?=\/|$)/, '')
    .replace(/\/+$/, '');
}

function proposalTail(url) {
  return routeTail(url);
}

// ---------- apply ----------

function toStep(s) {
  if (s.action === 'wait') return { wait: Number(s.value) || 1000 };
  if (s.action === 'fill') return { fill: { selector: s.selector, value: s.value } };
  return { [s.action]: s.selector };
}

function isEmpty(v) {
  return v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
}

// Fill empty manifest fields from a proposal. Returns the list of fields changed.
function applyProposal(entry, p) {
  const changed = [];
  const set = (k, v) => {
    if (!isEmpty(v) && isEmpty(entry[k])) {
      entry[k] = v;
      changed.push(k);
    }
  };
  set('dashboardUrl', p.dashboardUrl);
  set('crop', p.crop);
  set('steps', (p.steps || []).map(toStep));
  set('mask', p.mask);
  set('altText', p.altText);
  if (entry.proposed !== false && p.newPath && /-light\.(png|jpg|jpeg|webp)$/.test(p.newPath) && p.newPath !== entry.newPath) {
    entry.newPath = p.newPath;
    entry.proposed = true;
    changed.push('newPath');
  }
  if (changed.length) entry.proposedBy = 'vision';
  return changed;
}

// ---------- model calls ----------

function makeClient() {
  const Anthropic = require('@anthropic-ai/sdk').default || require('@anthropic-ai/sdk');
  return new Anthropic({ maxRetries: 4 });
}

function zodFormat(schema) {
  const { zodOutputFormat } = require('@anthropic-ai/sdk/helpers/zod');
  return zodOutputFormat(schema);
}

async function callModel(client, req, format, opts) {
  const res = await client.messages.parse({
    model: opts.model,
    max_tokens: 8000,
    system: req.system,
    messages: req.messages,
    output_config: { effort: opts.effort, format: opts.toFormat(format) },
  });
  if (res.stop_reason === 'refusal') return { error: `model declined: ${res.stop_details ? res.stop_details.explanation : 'no detail'}` };
  if (!res.parsed_output) return { error: `no parseable output (stop_reason ${res.stop_reason})` };
  return { output: res.parsed_output, usage: res.usage };
}

async function pool(items, size, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

function selectEntries(entries, opts, mode) {
  return entries.filter((e) => {
    if (opts.id) return e.id === opts.id;
    if (opts.section && manifest.sectionOf(e) !== opts.section) return false;
    if (mode === 'verify') return e.status !== 'rewritten' && (opts.force || !e.verification);
    if (e.status !== 'pending') return false;
    if (!opts.force && e.proposal) return false;
    if (!opts.force && !isEmpty(e.dashboardUrl) && !isEmpty(e.crop)) return false;
    return true;
  });
}

async function run(argv, deps = {}) {
  const { opts, positional } = parseArgs(argv, { booleans: ['apply', 'force', 'dry-run', 'help'] });
  if (opts.help) {
    console.log(fs.readFileSync(__filename, 'utf8').split('\n').filter((l) => l.startsWith('//')).join('\n'));
    return 0;
  }
  const mode = positional[0] === 'verify' ? 'verify' : 'propose';
  const root = path.resolve(opts.root || path.join(__dirname, '..', '..'));
  const manifestFile = path.resolve(opts.manifest || manifest.DEFAULT_FILE);
  const entries = manifest.load(manifestFile);
  const ctx = { root, catalog: loadCatalog(root) };
  const modelOpts = {
    model: opts.model || process.env.PROPOSE_MODEL || DEFAULT_MODEL,
    effort: opts.effort || 'medium',
    toFormat: deps.toFormat || zodFormat,
  };
  const limit = Number(opts.limit) || Infinity;
  const selected = selectEntries(entries, opts, mode).slice(0, limit);
  const log = deps.log || console.log;

  log(`${mode}: ${selected.length} entries selected (model ${modelOpts.model}, effort ${modelOpts.effort})`);
  if (selected.length === 0) return 0;

  if (opts['dry-run']) {
    for (const e of selected) {
      const req = mode === 'verify' ? buildVerifyRequest(e, ctx) : buildProposeRequest(e, ctx);
      log(`\n== ${e.id}: ${req.error ? `SKIP (${req.error})` : req.messages[0].content.filter((b) => b.type === 'text').map((b) => b.text).join('\n')}`);
    }
    return 0;
  }

  const client = deps.client || makeClient();
  const { Proposal, Verification } = deps.schemas || schemas();
  const stamp = new Date().toISOString();
  let usage = { input: 0, output: 0, cacheRead: 0 };
  const counts = { ok: 0, skipped: 0, error: 0, applied: 0 };

  await pool(selected, Number(opts.concurrency) || 3, async (entry) => {
    const req = mode === 'verify' ? buildVerifyRequest(entry, ctx) : buildProposeRequest(entry, ctx);
    if (req.error) {
      counts.skipped++;
      log(`  skip ${entry.id}: ${req.error}`);
      return;
    }
    let res;
    try {
      res = await callModel(client, req, mode === 'verify' ? Verification : Proposal, modelOpts);
    } catch (err) {
      res = { error: `${err.constructor ? err.constructor.name : 'Error'}: ${err.message}` };
    }
    if (res.error) {
      counts.error++;
      log(`  error ${entry.id}: ${res.error}`);
      entry[mode === 'verify' ? 'verification' : 'proposal'] = { error: res.error, model: modelOpts.model, at: stamp };
      return;
    }
    if (res.usage) {
      usage.input += res.usage.input_tokens || 0;
      usage.output += res.usage.output_tokens || 0;
      usage.cacheRead += res.usage.cache_read_input_tokens || 0;
    }
    counts.ok++;
    if (mode === 'verify') {
      entry.verification = { ...res.output, model: modelOpts.model, at: stamp };
      log(`  ${entry.id}: score ${res.output.score.toFixed(2)} sameScreen=${res.output.sameScreen} sameState=${res.output.sameState}${res.output.issues.length ? ` issues: ${res.output.issues.join('; ')}` : ''}`);
      return;
    }
    const inCatalog = ctx.catalog.routes.some((r) => routeTail(r) && proposalTail(res.output.dashboardUrl).startsWith(routeTail(r)));
    entry.proposal = { ...res.output, inCatalog, model: modelOpts.model, at: stamp };
    let applied = [];
    if (opts.apply) {
      applied = applyProposal(entry, res.output);
      if (applied.length) counts.applied++;
    }
    log(`  ${entry.id}: ${res.output.confidence.toFixed(2)} ${res.output.dashboardUrl} crop=${res.output.crop}${res.output.needsHuman ? ` | human: ${res.output.needsHuman}` : ''}${applied.length ? ` | applied ${applied.join(',')}` : ''}`);
  });

  manifest.save(entries, manifestFile);
  log(`\n${counts.ok} ok, ${counts.skipped} skipped, ${counts.error} errors${opts.apply ? `, ${counts.applied} entries updated` : ''}; tokens in ${usage.input} (cache read ${usage.cacheRead}) out ${usage.output}`);
  if (mode === 'propose' && !opts.apply) log('Proposals saved under entry.proposal. Re-run with --apply to fill empty fields, or copy by hand.');
  return counts.error > 0 ? 1 : 0;
}

if (require.main === module) {
  run(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (err) => {
      console.error(err);
      process.exitCode = 1;
    },
  );
}

module.exports = { run, buildProposeRequest, buildVerifyRequest, applyProposal, selectEntries, loadCatalog, toStep, SYSTEM_PROPOSE, SYSTEM_VERIFY };
