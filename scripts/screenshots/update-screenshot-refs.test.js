'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { parseCsv, toObjects } = require('../lib/csv');
const { rewriteRefLine } = require('./update-screenshot-refs');

const SCRIPT = path.join(__dirname, 'update-screenshot-refs.js');
const FIX = path.join(__dirname, '__fixtures__', 'refs');
const OLD = '/docs/images/cdy7uua7fh8z/abc/def/old-shot.png';
const NEW = '/docs/images/dashboard/applications/settings/dashboard-applications-settings-light.png';
const ALT = 'Auth0 Dashboard Applications Settings tab';

function tempRepo() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'shot-refs-'));
  fs.cpSync(FIX, dir, { recursive: true });
  return dir;
}

function run(root, ...args) {
  return execFileSync(process.execPath, [SCRIPT, `--root=${path.join(root, 'repo')}`, `--manifest=${path.join(root, 'manifest.json')}`, ...args], { encoding: 'utf8' });
}

const read = (root, rel) => fs.readFileSync(path.join(root, 'repo', rel), 'utf8');

test('rewriteRefLine: markdown, Frame-indented markdown, img, bare path, alt rules', () => {
  assert.equal(rewriteRefLine(`<Frame>![](${OLD})</Frame>`, OLD, NEW, ALT, 'en').line, `<Frame>![${ALT}](${NEW})</Frame>`);
  assert.equal(rewriteRefLine(`    ![Old alt](${OLD} "t")`, OLD, NEW, ALT, 'en').line, `    ![${ALT}](${NEW} "t")`);
  assert.equal(rewriteRefLine(`<img src="${OLD}" className="w-full" />`, OLD, NEW, ALT, 'en').line, `<img src="${NEW}" className="w-full" alt="${ALT}" />`);
  assert.equal(rewriteRefLine(`<img alt="x" src='${OLD}'>`, OLD, NEW, ALT, 'en').line, `<img alt="${ALT}" src='${NEW}'>`);
  assert.equal(rewriteRefLine(`image: "${OLD}"`, OLD, NEW, ALT, 'en').line, `image: "${NEW}"`);
  const ja = rewriteRefLine(`![既存](${OLD})`, OLD, NEW, ALT, 'ja-jp');
  assert.equal(ja.line, `![既存](${NEW})`);
  assert.equal(ja.fallback, false);
  const fr = rewriteRefLine(`![](${OLD})`, OLD, NEW, ALT, 'fr-ca');
  assert.equal(fr.line, `![${ALT}](${NEW})`);
  assert.equal(fr.fallback, true);
});

test('dry run reports and changes nothing', () => {
  const root = tempRepo();
  const out = run(root, `--report=${path.join(root, 'r.csv')}`);
  assert.match(out, /DRY RUN: 2 entries selected/);
  assert.ok(fs.existsSync(path.join(root, 'repo/main', OLD)), 'image not moved');
  assert.match(read(root, 'main/docs/page.mdx'), /old-shot\.png/);
  const rows = toObjects(parseCsv(fs.readFileSync(path.join(root, 'r.csv'), 'utf8')));
  const actions = rows.map((r) => r.action);
  assert.ok(actions.includes('move'));
  assert.ok(actions.includes('skipped-proposed'));
  assert.ok(actions.includes('alt-fallback'));
  assert.ok(actions.includes('leftover'));
  assert.equal(rows.filter((r) => r.action === 'rewritten').length, 4, 'en x3 + ja x1');
});

test('--fix moves the image, rewrites all locales, flags fallback alt and leftovers, marks entry rewritten', () => {
  const root = tempRepo();
  run(root, '--fix', `--report=${path.join(root, 'r.csv')}`);
  assert.ok(!fs.existsSync(path.join(root, 'repo/main', OLD)));
  assert.ok(fs.existsSync(path.join(root, 'repo/main', NEW)));
  const en = read(root, 'main/docs/page.mdx');
  assert.equal(en, [
    '---',
    'title: Page',
    '---',
    '',
    `<Frame>![${ALT}](${NEW})</Frame>`,
    '',
    '<Frame caption="Settings">',
    `    ![${ALT}](${NEW})`,
    '</Frame>',
    '',
    `<img src="${NEW}" className="w-full" alt="${ALT}" />`,
    '',
  ].join('\n'));
  assert.match(read(root, 'main/docs/ja-jp/page.mdx'), new RegExp(`!\\[既存の代替テキスト\\]\\(${NEW.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`));
  assert.match(read(root, 'main/docs/fr-ca/page.mdx'), new RegExp(`!\\[${ALT}\\]\\(`));
  const rows = toObjects(parseCsv(fs.readFileSync(path.join(root, 'r.csv'), 'utf8')));
  const leftover = rows.find((r) => r.action === 'leftover');
  assert.equal(leftover.file, 'main/docs/other.mdx');
  const m = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  assert.equal(m.find((e) => e.id === 'old-shot').status, 'rewritten');
  assert.equal(m.find((e) => e.id === 'proposed-one').status, 'approved', 'proposed entry untouched');
});

test('--section filters entries', () => {
  const root = tempRepo();
  const out = run(root, '--section=ciba');
  assert.match(out, /0 entries selected/);
});
