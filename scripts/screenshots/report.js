#!/usr/bin/env node
'use strict';

// Summarizes the last `npm run diff` / `npm run capture` as a review CSV.
//
//   node scripts/screenshots/report.js [--results=test-results/results.json] [--out=review.csv]
//
// Columns: id, section, outcome (unchanged | changed | skipped | error), diffRatio, actual, diff, message.
// "changed" entries are the ones a human needs to look at: open the diff image, then set the manifest
// entry's status to "approved" (keep the new image) or adjust steps/crop and re-run.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('../lib/args');
const { toCsv } = require('../lib/csv');

function walk(suite, out) {
  for (const s of suite.suites || []) walk(s, out);
  for (const spec of suite.specs || []) {
    for (const t of spec.tests || []) {
      const r = (t.results || [])[t.results.length - 1] || {};
      const title = spec.title;
      const [id, tag] = title.split(' @');
      const msg = (r.error && (r.error.message || '')) || '';
      const ratio = msg.match(/ratio ([0-9.]+)/);
      const att = (name) => (r.attachments || []).find((a) => a.name && a.name.endsWith(name))?.path || '';
      out.push({
        id,
        section: tag || '',
        outcome: r.status === 'passed' ? 'unchanged' : r.status === 'skipped' ? 'skipped' : /toHaveScreenshot|screenshot/i.test(msg) ? 'changed' : 'error',
        diffRatio: ratio ? ratio[1] : '',
        actual: att('-actual.png'),
        diff: att('-diff.png'),
        message: msg.split('\n')[0].slice(0, 200),
      });
    }
  }
}

function main(argv) {
  const { opts } = parseArgs(argv);
  const resultsFile = path.resolve(opts.results || path.join(__dirname, 'test-results', 'results.json'));
  if (!fs.existsSync(resultsFile)) {
    console.error(`No results at ${resultsFile}. Run npm run diff first.`);
    return 2;
  }
  const json = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  const rows = [];
  for (const s of json.suites || []) walk(s, rows);
  const out = path.resolve(opts.out || path.join(__dirname, 'review.csv'));
  fs.writeFileSync(out, toCsv(['id', 'section', 'outcome', 'diffRatio', 'actual', 'diff', 'message'], rows), 'utf8');
  const counts = {};
  for (const r of rows) counts[r.outcome] = (counts[r.outcome] || 0) + 1;
  console.log(`Wrote ${out}: ${rows.length} entries`, counts);
  return 0;
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));

module.exports = { main };
