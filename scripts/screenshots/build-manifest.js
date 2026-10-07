#!/usr/bin/env node
'use strict';

// Builds manifest.json from a CSV export of the "Dashboard Screenshots" sheet tab.
// Groups rows by current image path (one entry per image), adds ja-jp / fr-ca twin references,
// proposes a new path in the naming convention, and reports rows whose image or reference no
// longer exists on disk.
//
//   node scripts/screenshots/build-manifest.js <export.csv> [--root=../..] [--out=manifest.json] [--merge]
//
// --merge keeps dashboardUrl/steps/crop/mask/status/newPath from an existing manifest for entries
// whose currentPath matches, so re-running after a sheet update does not lose hand-filled fields.
//
// Column detection by header, case-insensitive: image path ("image"/"path"), MDX file ("mdx"/"file"),
// line ("line"), alt text ("alt"), page URL ("url"/"page"), assignee ("assign"). Override with
// --col-image=, --col-file=, --col-line=, --col-alt=, --col-url=, --col-assignee=.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('../lib/args');
const { parseCsv, toObjects } = require('../lib/csv');
const mdx = require('../lib/mdx');
const manifest = require('./lib/manifest');

function pick(headers, override, ...needles) {
  if (override) return override;
  for (const n of needles) {
    const h = headers.find((h) => h.toLowerCase().includes(n));
    if (h) return h;
  }
  return null;
}

// Any of: /docs/images/x, docs/images/x, main/docs/images/x, images/x, /images/x -> /docs/images/x
function normalizeImagePath(p) {
  let s = p.trim().replace(/\\/g, '/');
  s = s.replace(/^\/?main\//, '/').replace(/^\/?docs\//, '/docs/').replace(/^\/?images\//, '/docs/images/');
  if (!s.startsWith('/docs/images/')) s = `/docs/images/${s.replace(/^\/+/, '')}`;
  return s;
}

function slug(s) {
  return s.toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Proposed newPath. Dump images land in dashboard/unsorted/ for a human to place; others keep
// their folder and gain the -light suffix.
function proposeNewPath(currentPath) {
  const rel = manifest.imagesRel(currentPath);
  const base = slug(path.posix.basename(rel));
  if (rel.startsWith('cdy7uua7fh8z/')) return `/docs/images/dashboard/unsorted/${base}-light.png`;
  const dir = path.posix.dirname(rel);
  return `/docs/images/${dir === '.' ? 'dashboard/unsorted' : dir}/${base.replace(/-light$/, '')}-light.png`;
}

function fileContains(absFile, needle) {
  if (!fs.existsSync(absFile)) return null;
  const lines = fs.readFileSync(absFile, 'utf8').split('\n');
  const idx = lines.findIndex((l) => l.includes(needle));
  return idx === -1 ? null : idx + 1;
}

function main(argv) {
  const { opts, positional } = parseArgs(argv, { booleans: ['merge'] });
  const input = positional[0];
  if (!input) {
    console.error('Usage: node scripts/screenshots/build-manifest.js <export.csv> [--root=../..] [--out=manifest.json] [--merge]');
    return 2;
  }
  const root = path.resolve(opts.root || path.join(__dirname, '..', '..'));
  const outFile = path.resolve(opts.out || manifest.DEFAULT_FILE);
  const existing = opts.merge ? new Map(manifest.load(outFile).map((e) => [e.currentPath, e])) : new Map();

  const rows = toObjects(parseCsv(fs.readFileSync(input, 'utf8')));
  if (rows.length === 0) {
    console.error('CSV has no data rows');
    return 2;
  }
  const headers = Object.keys(rows[0]);
  const col = {
    image: pick(headers, opts['col-image'], 'image', 'path'),
    file: pick(headers, opts['col-file'], 'mdx', 'file'),
    line: pick(headers, opts['col-line'], 'line'),
    alt: pick(headers, opts['col-alt'], 'alt'),
    url: pick(headers, opts['col-url'], 'url', 'page'),
    assignee: pick(headers, opts['col-assignee'], 'assign'),
  };
  if (!col.image || !col.file) {
    console.error(`Could not detect image/file columns in: ${headers.join(', ')}`);
    return 2;
  }

  const groups = new Map();
  let skipped = 0;
  for (const r of rows) {
    if (!r[col.image] || !r[col.file]) {
      skipped++;
      continue;
    }
    const currentPath = normalizeImagePath(r[col.image]);
    const file = mdx.toPosix(r[col.file].trim()).replace(/^\/+/, '').replace(/^(?!main\/)/, 'main/');
    const g = groups.get(currentPath) || { currentPath, alts: [], refs: [], assignees: new Set(), pages: new Set() };
    g.refs.push({ file, line: Number(r[col.line]) || null, locale: mdx.localeOf(file) });
    if (col.alt && r[col.alt]) g.alts.push(r[col.alt]);
    if (col.assignee && r[col.assignee]) g.assignees.add(r[col.assignee]);
    if (col.url && r[col.url]) g.pages.add(r[col.url]);
    groups.set(currentPath, g);
  }

  const entries = [];
  const stats = { rows: rows.length, skipped, entries: 0, multiRef: 0, twinsAdded: 0, imageMissing: 0, refMissing: 0 };
  for (const g of groups.values()) {
    const seen = new Set();
    const refs = [];
    const addRef = (ref) => {
      if (seen.has(ref.file)) return false;
      seen.add(ref.file);
      refs.push(ref);
      return true;
    };
    for (const ref of g.refs) {
      const found = fileContains(path.join(root, ref.file), g.currentPath);
      if (found === null) stats.refMissing++;
      addRef({ ...ref, line: found ?? ref.line, found: found !== null });
      for (const twin of mdx.localeTwins(ref.file)) {
        const twinLine = fileContains(path.join(root, twin), g.currentPath);
        if (twinLine !== null && addRef({ file: twin, line: twinLine, locale: mdx.localeOf(twin), found: true })) stats.twinsAdded++;
      }
    }
    const imageExists = fs.existsSync(path.join(root, 'main', g.currentPath));
    if (!imageExists) stats.imageMissing++;
    if (refs.length > 1) stats.multiRef++;

    const prev = existing.get(g.currentPath) || {};
    const altText = prev.altText || g.alts.find(Boolean) || '';
    entries.push({
      id: prev.id || slug(path.posix.basename(g.currentPath)),
      currentPath: g.currentPath,
      newPath: prev.newPath || proposeNewPath(g.currentPath),
      proposed: prev.newPath ? Boolean(prev.proposed) : true,
      altText,
      refs,
      pages: [...g.pages],
      assignees: [...g.assignees],
      imageExists,
      dashboardUrl: prev.dashboardUrl || '',
      steps: prev.steps || [],
      crop: prev.crop || '',
      mask: prev.mask || [],
      width: prev.width || 1280,
      status: prev.status || 'pending',
    });
    stats.entries++;
  }
  entries.sort((a, b) => a.newPath.localeCompare(b.newPath));

  const ids = new Map();
  for (const e of entries) {
    if (ids.has(e.id)) e.id = `${e.id}-${ids.get(e.id)}`;
    ids.set(e.id, (ids.get(e.id) || 1) + 1);
  }

  manifest.save(entries, outFile);
  console.log(`Wrote ${outFile}`);
  console.log(`  rows ${stats.rows}, skipped ${stats.skipped}, entries ${stats.entries}, entries with >1 ref ${stats.multiRef}`);
  console.log(`  locale twin refs added ${stats.twinsAdded}, refs not found in file ${stats.refMissing}, images missing on disk ${stats.imageMissing}`);
  console.log('Next: fill newPath (clear "proposed"), dashboardUrl, steps, crop and mask per entry; see README.md.');
  return 0;
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));

module.exports = { main, normalizeImagePath, proposeNewPath };
