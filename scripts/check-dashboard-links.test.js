'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const SCRIPT = path.join(__dirname, 'check-dashboard-links.js');
const ROOT = path.join(__dirname, '__fixtures__', 'dashboard-links', 'repo');
const POLICY = path.join(__dirname, 'data', 'dashboard-link-policy.json');

function run(...args) {
  try {
    return { code: 0, out: execFileSync(process.execPath, [SCRIPT, `--root=${ROOT}`, `--policy=${POLICY}`, ...args], { encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status, out: e.stdout };
  }
}

test('clean file fails on a tenant-specific link now that the blessed form is locked', () => {
  const { code, out } = run('main/docs/clean.mdx');
  assert.equal(code, 1);
  assert.match(out, /1 error\(s\), 0 warning\(s\)/);
  assert.match(out, /tenant-specific/);
});

test('legacy page fails with one error per offending URL, fenced code ignored', () => {
  const { code, out } = run('main/docs/page.mdx');
  assert.equal(code, 1);
  const errors = out.split('\n').filter((l) => /: error:/.test(l));
  // hash routes: applications, apis(http: hash-route + http-scheme), {id}/settings, applications%7D (hash + brace),
  // ?/ (query-slash), passwordless, rules, logs, security, backticked applications
  assert.ok(errors.length >= 10, `expected >= 10 errors, got ${errors.length}:\n${errors.join('\n')}`);
  assert.ok(errors.some((l) => l.includes('[http-scheme]')));
  assert.ok(errors.some((l) => l.includes('[encoded-brace]')));
  assert.ok(errors.some((l) => l.includes('[query-slash]')));
  assert.ok(!errors.some((l) => l.includes('curl ')), 'fenced code must not be reported');
  assert.ok(!out.includes('manage.auth0.com/#\n'), 'bare root is allowed');
});

test('--ci prints GitHub annotations', () => {
  const { out } = run('--ci', 'main/docs/page.mdx');
  assert.match(out, /^::error file=main\/docs\/page\.mdx,line=\d+::/m);
});

test('no file arguments scans everything under main/', () => {
  const { code, out } = run();
  assert.equal(code, 1);
  assert.match(out, /5 files checked/);
});
