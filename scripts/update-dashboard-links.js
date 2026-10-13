#!/usr/bin/env node
'use strict';

// Rewrites legacy manage.auth0.com links to their redesigned-Dashboard equivalents using the
// committed lookup map, across English, ja-jp, fr-ca and main/ai MDX. Dry run by default.
//
// Usage:
//   node scripts/update-dashboard-links.js [--fix] [--verbose] [--report=out.csv]
//        [--locale=en|ja-jp|fr-ca|all] [--path=main/docs/authenticate] [--root=.]
//        [--map=scripts/data/dashboard-link-map.json] [--patterns=scripts/data/dashboard-link-patterns.json]
//
// Actions reported per URL:
//   rewritten          exact match in the map
//   pattern-rewritten  matched a shape rule with an id or placeholder segment
//   unchanged-root     bare root / login URL, still valid, left alone
//   unchanged-new      already in the new form
//   needs-human        malformed, or the map marks it malformed; never touched
//   unmatched          not in the map; nearest map keys listed for triage

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('./lib/args');
const { toCsv } = require('./lib/csv');
const mdx = require('./lib/mdx');
const links = require('./lib/dashboard-links');

const DEFAULT_SCAN = ['main/docs', 'main/ai'];
const REPORT_HEADERS = ['file', 'line', 'locale', 'oldUrl', 'action', 'newUrl', 'reason', 'nearestCandidates'];

function main(argv) {
  const { opts } = parseArgs(argv, { booleans: ['fix', 'verbose', 'help'] });
  if (opts.help) {
    console.log(fs.readFileSync(__filename, 'utf8').split('\n').filter((l) => l.startsWith('//')).join('\n'));
    return 0;
  }
  const root = path.resolve(opts.root || '.');
  const mapFile = path.resolve(root, opts.map || 'scripts/data/dashboard-link-map.json');
  const patternsFile = path.resolve(root, opts.patterns || 'scripts/data/dashboard-link-patterns.json');
  const localeFilter = opts.locale && opts.locale !== 'all' ? opts.locale : null;
  const fix = Boolean(opts.fix);

  const ctx = { map: links.loadMap(mapFile), patterns: links.loadPatterns(patternsFile) };

  const scanDirs = (opts.path ? [opts.path] : DEFAULT_SCAN)
    .map((d) => path.resolve(root, d))
    .filter((d) => fs.existsSync(d));
  if (scanDirs.length === 0) {
    console.error(`No scan directories found under ${root}`);
    return 2;
  }

  const records = [];
  const stats = { files: 0, filesChanged: 0, byLocale: {} };
  const bump = (locale, action) => {
    stats.byLocale[locale] ??= Object.fromEntries(links.ACTIONS.map((a) => [a, 0]));
    stats.byLocale[locale][action]++;
  };

  for (const dir of scanDirs) {
    for (const file of mdx.walkMdx(dir)) {
      const rel = mdx.toPosix(path.relative(root, file));
      const locale = mdx.localeOf(rel);
      if (localeFilter && locale !== localeFilter) continue;
      stats.files++;
      const text = mdx.readText(file);
      const { text: out, changed } = mdx.mapOutsideFences(text, (line, lineNo) =>
        links.rewriteLine(line, ctx, (m) => {
          bump(locale, m.action);
          records.push({
            file: rel,
            line: lineNo,
            locale,
            oldUrl: m.url,
            action: m.action,
            newUrl: m.newUrl || '',
            reason: m.reason || '',
            nearestCandidates: (m.candidates || []).join(' | '),
          });
          if (opts.verbose) console.log(`${rel}:${lineNo} ${m.action} ${m.url}${m.newUrl ? ` -> ${m.newUrl}` : ''}`);
        }),
      );
      if (changed) {
        stats.filesChanged++;
        if (fix) mdx.writeText(file, out);
      }
    }
  }

  if (opts.report) {
    const reportPath = path.resolve(opts.report);
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, toCsv(REPORT_HEADERS, records), 'utf8');
  }

  printSummary(stats, fix, opts.report);
  return 0;
}

function printSummary(stats, fix, report) {
  const locales = Object.keys(stats.byLocale).sort();
  const cols = links.ACTIONS;
  const width = Math.max(...cols.map((c) => c.length), 6);
  console.log(`\n${fix ? 'APPLIED' : 'DRY RUN'}: ${stats.files} files scanned, ${stats.filesChanged} would change${fix ? ' (written)' : ''}\n`);
  console.log(['locale'.padEnd(8), ...cols.map((c) => c.padStart(width))].join(' '));
  const totals = Object.fromEntries(cols.map((c) => [c, 0]));
  for (const l of locales) {
    const row = stats.byLocale[l];
    for (const c of cols) totals[c] += row[c];
    console.log([l.padEnd(8), ...cols.map((c) => String(row[c]).padStart(width))].join(' '));
  }
  console.log(['total'.padEnd(8), ...cols.map((c) => String(totals[c]).padStart(width))].join(' '));
  if (report) console.log(`\nReport: ${report}`);
  if (!fix) console.log('\nRe-run with --fix to write changes.');
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));

module.exports = { main };
