'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { parseCsv, toObjects } = require('./lib/csv');

const SCRIPT = path.join(__dirname, 'update-dashboard-links.js');
const FIX = path.join(__dirname, '__fixtures__', 'dashboard-links');

function tempRepo() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dash-links-'));
  fs.cpSync(path.join(FIX, 'repo'), dir, { recursive: true });
  return dir;
}

function run(root, ...args) {
  return execFileSync(process.execPath, [SCRIPT, `--root=${root}`, `--map=${path.join(FIX, 'map.json')}`, `--patterns=${path.join(FIX, 'patterns.json')}`, ...args], { encoding: 'utf8' });
}

const read = (root, rel) => fs.readFileSync(path.join(root, rel), 'utf8');

test('dry run changes nothing and writes a report with one row per URL', () => {
  const root = tempRepo();
  const before = read(root, 'main/docs/page.mdx');
  const report = path.join(root, 'report.csv');
  const out = run(root, `--report=${report}`);
  assert.equal(read(root, 'main/docs/page.mdx'), before);
  assert.match(out, /DRY RUN: 5 files scanned, 4 would change/);
  const rows = toObjects(parseCsv(fs.readFileSync(report, 'utf8')));
  const byAction = {};
  for (const r of rows) byAction[r.action] = (byAction[r.action] || 0) + 1;
  // page.mdx: 4 rewritten, 1 pattern, 3 root, 1 new, 4 needs-human, 1 unmatched; clean.mdx: 1 new, 1 root, 1 unmatched (tenant-specific);
  // ja-jp, fr-ca and main/ai: 1 rewritten each
  assert.deepEqual(byAction, { rewritten: 7, 'pattern-rewritten': 1, 'unchanged-root': 4, 'unchanged-new': 2, 'needs-human': 4, unmatched: 2 });
  const un = rows.find((r) => r.action === 'unmatched' && r.file === 'main/docs/page.mdx');
  assert.equal(un.oldUrl, 'https://manage.auth0.com/#/connections/passwordless');
  assert.ok(un.nearestCandidates.includes('#/connections/database'));
  assert.deepEqual(new Set(rows.map((r) => r.locale)), new Set(['en', 'ja-jp', 'fr-ca']));
});

test('--fix rewrites exact, http, case-insensitive, pattern and backticked URLs; keeps roots, malformed, unmatched, fenced', () => {
  const root = tempRepo();
  run(root, '--fix');
  const page = read(root, 'main/docs/page.mdx');
  assert.match(page, /\[Applications\]\(https:\/\/manage\.auth0\.com\/dashboard\/applications\)/);
  assert.match(page, /href="https:\/\/manage\.auth0\.com\/dashboard\/apis"/);
  assert.match(page, /https:\/\/manage\.auth0\.com\/dashboard\/applications\/\{yourClientId\}\/settings\./, 'trailing period preserved');
  assert.match(page, /https:\/\/manage\.auth0\.com\/dashboard\/monitoring\/logs, see below/);
  assert.match(page, /`https:\/\/manage\.auth0\.com\/dashboard\/applications`/);
  assert.match(page, /https:\/\/manage\.auth0\.com\/ and https:\/\/manage\.auth0\.com\/# and https:\/\/manage\.auth0\.com\/login\?connection=auth0/);
  assert.match(page, /https:\/\/manage\.auth0\.com\/#\/applications%7D and https:\/\/manage\.auth0\.com\/\?\/authentication-profiles/);
  assert.match(page, /https:\/\/manage\.auth0\.com\/#\/connections\/passwordless/);
  assert.match(page, /https:\/\/manage\.auth0\.com\/#\/rules/);
  assert.match(page, /https:\/\/manage\.auth0\.com\/#\/security\/attack-protection/);
  assert.match(page, /curl https:\/\/manage\.auth0\.com\/#\/applications/, 'fenced code untouched');
  assert.match(read(root, 'main/docs/ja-jp/page.mdx'), /https:\/\/manage\.auth0\.com\/dashboard\/applications/);
  assert.match(read(root, 'main/docs/fr-ca/page.mdx'), /https:\/\/manage\.auth0\.com\/dashboard\/applications/);
  assert.match(read(root, 'main/ai/docs/agent.mdx'), /https:\/\/manage\.auth0\.com\/dashboard\/connections\/database/);
});

test('--locale and --path scope the run', () => {
  const root = tempRepo();
  run(root, '--fix', '--locale=ja-jp');
  assert.match(read(root, 'main/docs/ja-jp/page.mdx'), /dashboard\/applications/);
  assert.match(read(root, 'main/docs/fr-ca/page.mdx'), /#\/applications/, 'fr-ca untouched');
  assert.match(read(root, 'main/docs/page.mdx'), /\(https:\/\/manage\.auth0\.com\/#\/applications\)/, 'en untouched');

  run(root, '--fix', '--path=main/ai');
  assert.match(read(root, 'main/ai/docs/agent.mdx'), /dashboard\/connections\/database/);
  assert.match(read(root, 'main/docs/page.mdx'), /\(https:\/\/manage\.auth0\.com\/#\/applications\)/, 'en still untouched');
});

test('CRLF line endings are preserved', () => {
  const root = tempRepo();
  const file = path.join(root, 'main/docs/crlf.mdx');
  fs.writeFileSync(file, 'a https://manage.auth0.com/#/apis\r\nb\r\n');
  run(root, '--fix');
  assert.equal(fs.readFileSync(file, 'utf8'), 'a https://manage.auth0.com/dashboard/apis\r\nb\r\n');
});
