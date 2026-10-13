#!/usr/bin/env node
'use strict';

// One-time conversion of the "New Dashboard links" sheet tab (CSV export) into the committed
// lookup map used by update-dashboard-links.js.
//
// Usage:
//   node scripts/data/import-link-map.js <export.csv> [--out=scripts/data/dashboard-link-map.json]
//
// Column detection is by header name, case-insensitive: the first header containing "old" or
// "current" is the old URL, the first containing "new" is the new URL, the first containing
// "change" is the change type. Override with --old=, --new=, --type= if the sheet is renamed.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('../lib/args');
const { parseCsv, toObjects } = require('../lib/csv');
const { normalize } = require('../lib/dashboard-links');

function pickColumn(headers, override, ...needles) {
  if (override) return override;
  for (const n of needles) {
    const h = headers.find((h) => h.toLowerCase().includes(n));
    if (h) return h;
  }
  throw new Error(`No column matching ${needles.join('/')} in: ${headers.join(', ')}`);
}

function main(argv) {
  const { opts, positional } = parseArgs(argv);
  const input = positional[0];
  if (!input) {
    console.error('Usage: node scripts/data/import-link-map.js <export.csv> [--out=path]');
    return 2;
  }
  const rows = toObjects(parseCsv(fs.readFileSync(input, 'utf8')));
  if (rows.length === 0) {
    console.error('CSV has no data rows');
    return 2;
  }
  const headers = Object.keys(rows[0]);
  const oldCol = pickColumn(headers, opts.old, 'old', 'current');
  const newCol = pickColumn(headers, opts.new, 'new');
  const typeCol = pickColumn(headers, opts.type, 'change', 'type');

  const seen = new Map();
  const entries = [];
  const byType = {};
  let dupes = 0;
  for (const r of rows) {
    const oldUrl = r[oldCol];
    if (!oldUrl) continue;
    const key = normalize(oldUrl);
    if (seen.has(key)) {
      dupes++;
      if (seen.get(key) !== (r[newCol] || '')) console.warn(`Conflicting duplicate for ${oldUrl}: "${seen.get(key)}" vs "${r[newCol]}"`);
      continue;
    }
    seen.set(key, r[newCol] || '');
    const changeType = r[typeCol] || '';
    byType[changeType] = (byType[changeType] || 0) + 1;
    entries.push({ old: oldUrl, new: r[newCol] || '', changeType });
  }

  const out = path.resolve(opts.out || 'scripts/data/dashboard-link-map.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(entries, null, 2) + '\n', 'utf8');

  console.log(`Wrote ${entries.length} entries to ${out} (${dupes} duplicate old URLs skipped)`);
  for (const [t, n] of Object.entries(byType)) console.log(`  ${n.toString().padStart(4)}  ${t || '(blank change type)'}`);
  const missingNew = entries.filter((e) => !e.new && !/malformed/i.test(e.changeType));
  if (missingNew.length) console.warn(`\n${missingNew.length} entries have no new URL and are not marked malformed; they will be reported as needs-human.`);
  return 0;
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));

module.exports = { main };
