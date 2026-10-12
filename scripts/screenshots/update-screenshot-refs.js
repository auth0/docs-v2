#!/usr/bin/env node
'use strict';

// For every approved manifest entry: move the image file to its new path, rewrite every MDX
// reference in English and both locales, and set alt text. Dry run by default.
//
//   node scripts/screenshots/update-screenshot-refs.js [--fix] [--section=dashboard-applications]
//        [--root=../..] [--manifest=manifest.json] [--report=refs-report.csv] [--all]
//
//   --section   only entries whose section tag matches (see lib/manifest.js sectionOf)
//   --all       process every entry with a confirmed newPath, not only status "approved"
//
// Reference forms handled: ![alt](path), <img src="path" ...>, and any other literal occurrence
// of the path (JSX strings) which gets the path swapped only. Alt text: English refs get the
// manifest altText; ja-jp / fr-ca refs keep a non-empty existing alt, else get the English one
// and are reported as "alt-fallback" for the localization team.
//
// After processing, every .mdx under main/ is scanned for leftover references to the old paths.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('../lib/args');
const { toCsv } = require('../lib/csv');
const mdx = require('../lib/mdx');
const manifest = require('./lib/manifest');

const REPORT_HEADERS = ['id', 'file', 'line', 'locale', 'action', 'oldPath', 'newPath', 'note'];

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function chooseAlt(existing, altText, locale) {
  if (locale === 'en') return { alt: altText, fallback: false };
  if (existing && existing.trim()) return { alt: existing, fallback: false };
  return { alt: altText, fallback: true };
}

// Rewrite references to oldPath on one line. Returns { line, kinds, fallback }.
function rewriteRefLine(line, oldPath, newPath, altText, locale) {
  const kinds = [];
  let fallback = false;
  const oldRe = escapeRe(oldPath);
  let out = line;

  out = out.replace(new RegExp(`!\\[([^\\]]*)\\]\\(${oldRe}((?:\\s+"[^"]*")?)\\)`, 'g'), (m, alt, title) => {
    const c = chooseAlt(alt, altText, locale);
    fallback ||= c.fallback;
    kinds.push('markdown');
    return `![${c.alt}](${newPath}${title})`;
  });

  out = out.replace(new RegExp(`<img\\b([^>]*?)src=(["'])${oldRe}\\2([^>]*)>`, 'g'), (m, before, q, after) => {
    kinds.push('img');
    let attrs = `${before}src=${q}${newPath}${q}${after}`;
    const altRe = /\salt=(["'])(.*?)\1/;
    const existing = attrs.match(altRe);
    const c = chooseAlt(existing ? existing[2] : '', altText, locale);
    fallback ||= c.fallback;
    attrs = existing
      ? attrs.replace(altRe, ` alt=${existing[1]}${c.alt}${existing[1]}`)
      : attrs.replace(/(\s*\/?)$/, ` alt=${q}${c.alt}${q}$1`);
    return `<img${attrs}>`;
  });

  if (out.includes(oldPath)) {
    out = out.split(oldPath).join(newPath);
    kinds.push('path');
  }
  return { line: out, kinds, fallback };
}

function planImage(root, entry) {
  const oldAbs = path.join(root, 'main', entry.currentPath);
  const newAbs = path.join(root, 'main', entry.newPath);
  if (oldAbs === newAbs) return { action: 'image-unchanged', oldAbs, newAbs };
  const oldExists = fs.existsSync(oldAbs);
  const newExists = fs.existsSync(newAbs);
  if (oldExists && newExists) return { action: 'delete-old', oldAbs, newAbs };
  if (oldExists) return { action: 'move', oldAbs, newAbs };
  if (newExists) return { action: 'already-moved', oldAbs, newAbs };
  return { action: 'image-missing', oldAbs, newAbs };
}

function applyImage(plan) {
  if (plan.action === 'move') {
    fs.mkdirSync(path.dirname(plan.newAbs), { recursive: true });
    fs.renameSync(plan.oldAbs, plan.newAbs);
  } else if (plan.action === 'delete-old') {
    fs.unlinkSync(plan.oldAbs);
  }
}

function main(argv) {
  const { opts } = parseArgs(argv, { booleans: ['fix', 'all', 'help'] });
  if (opts.help) {
    console.log(fs.readFileSync(__filename, 'utf8').split('\n').filter((l) => l.startsWith('//')).join('\n'));
    return 0;
  }
  const root = path.resolve(opts.root || path.join(__dirname, '..', '..'));
  const manifestFile = path.resolve(opts.manifest || manifest.DEFAULT_FILE);
  const fix = Boolean(opts.fix);
  const entries = manifest.load(manifestFile);
  const report = [];
  const add = (r) => report.push({ id: '', file: '', line: '', locale: '', action: '', oldPath: '', newPath: '', note: '', ...r });

  const selected = entries.filter((e) => {
    if (opts.section && manifest.sectionOf(e) !== opts.section) return false;
    return opts.all ? e.status !== 'rewritten' : e.status === 'approved';
  });

  const processedOld = [];
  for (const entry of selected) {
    const base = { id: entry.id, oldPath: entry.currentPath, newPath: entry.newPath };
    const problems = manifest.validate(entry);
    if (problems.length) {
      add({ ...base, action: 'skipped-invalid', note: problems.join('; ') });
      continue;
    }
    if (entry.proposed) {
      add({ ...base, action: 'skipped-proposed', note: 'newPath not confirmed (proposed: true)' });
      continue;
    }

    const plan = planImage(root, entry);
    add({ ...base, action: plan.action });
    if (fix) applyImage(plan);

    for (const ref of entry.refs) {
      const abs = path.join(root, ref.file);
      if (!fs.existsSync(abs)) {
        add({ ...base, file: ref.file, locale: ref.locale, action: 'ref-file-missing' });
        continue;
      }
      let hits = 0;
      const { text, changed } = mdx.mapOutsideFences(mdx.readText(abs), (line, lineNo) => {
        if (!line.includes(entry.currentPath)) return undefined;
        const r = rewriteRefLine(line, entry.currentPath, entry.newPath, entry.altText, ref.locale);
        hits++;
        add({ ...base, file: ref.file, line: lineNo, locale: ref.locale, action: r.fallback ? 'alt-fallback' : 'rewritten', note: r.kinds.join('+') });
        return r.line;
      });
      if (hits === 0) add({ ...base, file: ref.file, line: ref.line || '', locale: ref.locale, action: 'ref-not-found' });
      if (fix && changed) mdx.writeText(abs, text);
    }
    processedOld.push(entry.currentPath);
    if (fix) entry.status = 'rewritten';
  }

  if (processedOld.length) {
    const leftoverRe = new RegExp(processedOld.map(escapeRe).join('|'));
    for (const file of mdx.walkMdx(path.join(root, 'main'))) {
      const text = mdx.readText(file);
      if (!leftoverRe.test(text)) continue;
      const rel = mdx.toPosix(path.relative(root, file));
      text.split('\n').forEach((line, i) => {
        const m = line.match(leftoverRe);
        if (m) add({ file: rel, line: i + 1, locale: mdx.localeOf(rel), action: 'leftover', oldPath: m[0], note: 'reference not listed in manifest refs' });
      });
    }
  }

  if (fix) manifest.save(entries, manifestFile);
  if (opts.report) {
    const out = path.resolve(opts.report);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, toCsv(REPORT_HEADERS, report), 'utf8');
  }

  const counts = {};
  for (const r of report) counts[r.action] = (counts[r.action] || 0) + 1;
  console.log(`${fix ? 'APPLIED' : 'DRY RUN'}: ${selected.length} entries selected`);
  for (const [k, v] of Object.entries(counts).sort()) console.log(`  ${String(v).padStart(5)}  ${k}`);
  if (opts.report) console.log(`Report: ${opts.report}`);
  if (!fix) console.log('Re-run with --fix to write changes.');
  return 0;
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));

module.exports = { main, rewriteRefLine, chooseAlt, planImage };
