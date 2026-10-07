'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const links = require('./dashboard-links');

const FIX = path.join(__dirname, '..', '__fixtures__', 'dashboard-links');
const ctx = { map: links.loadMap(path.join(FIX, 'map.json')), patterns: links.loadPatterns(path.join(FIX, 'patterns.json')) };

test('normalize: scheme, encoded braces, escaped braces, trailing slash', () => {
  assert.equal(links.normalize('http://manage.auth0.com/#/apis/'), 'https://manage.auth0.com/#/apis');
  assert.equal(links.normalize('https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings'), 'https://manage.auth0.com/#/applications/{yourClientId}/settings');
  assert.equal(links.normalize('https://manage.auth0.com/#/applications/\\{id\\}/settings'), 'https://manage.auth0.com/#/applications/{id}/settings');
  assert.equal(links.normalize('https://manage.auth0.com/'), 'https://manage.auth0.com');
});

test('splitTrailingPunct keeps sentence punctuation out of the URL', () => {
  assert.deepEqual(links.splitTrailingPunct('https://manage.auth0.com/#/apis.'), { url: 'https://manage.auth0.com/#/apis', suffix: '.' });
  assert.deepEqual(links.splitTrailingPunct('https://manage.auth0.com/#/apis'), { url: 'https://manage.auth0.com/#/apis', suffix: '' });
});

test('isMalformed', () => {
  assert.equal(links.isMalformed('https://manage.auth0.com/#/applications%7D'), true);
  assert.equal(links.isMalformed('https://manage.auth0.com/?/authentication-profiles'), true);
  assert.equal(links.isMalformed('https://manage.auth0.com/*/connections/enterprise'), true);
  assert.equal(links.isMalformed('https://manage.auth0.com/dashboard/#/applications/#/okta'), true);
  assert.equal(links.isMalformed('https://manage.auth0.com/dashboard/*/organizations/list'), false, 'wildcard after /dashboard is a competing form, not malformed');
  assert.equal(links.isMalformed('https://manage.auth0.com/#/applications'), false);
});

test('classify: exact map match, http variant, case-insensitive fallback', () => {
  assert.deepEqual(links.classify('https://manage.auth0.com/#/applications', ctx), { action: 'rewritten', newUrl: 'https://manage.auth0.com/dashboard/applications', reason: 'add /dashboard/ prefix' });
  assert.equal(links.classify('https://manage.auth0.com/#/apis', ctx).newUrl, 'https://manage.auth0.com/dashboard/apis');
  assert.equal(links.classify('https://manage.auth0.com/#/logs', ctx).newUrl, 'https://manage.auth0.com/dashboard/monitoring/logs');
});

test('classify: root, already-new, map-malformed, malformed, unmatched', () => {
  assert.equal(links.classify('https://manage.auth0.com/', ctx).action, 'unchanged-root');
  assert.equal(links.classify('https://manage.auth0.com/#', ctx).action, 'unchanged-root');
  assert.equal(links.classify('https://manage.auth0.com/login?connection=x', ctx).action, 'unchanged-root');
  assert.equal(links.classify('https://manage.auth0.com/dashboard/apis', ctx).action, 'unchanged-new');
  assert.equal(links.classify('https://manage.auth0.com/#/rules', ctx).action, 'needs-human');
  assert.equal(links.classify('https://manage.auth0.com/#/apis%7D', ctx).action, 'needs-human');
  const un = links.classify('https://manage.auth0.com/#/connections/passwordless', ctx);
  assert.equal(un.action, 'unmatched');
  assert.equal(un.candidates[0], 'https://manage.auth0.com/#/connections/database');
});

test('classify: pattern with id or placeholder; unconfigured replacement is needs-human', () => {
  assert.equal(links.classify('https://manage.auth0.com/#/applications/abc123XYZ/settings', ctx).newUrl, 'https://manage.auth0.com/dashboard/applications/abc123XYZ/settings');
  assert.equal(links.classify('https://manage.auth0.com/#/applications/{yourClientId}/settings', ctx).newUrl, 'https://manage.auth0.com/dashboard/applications/{yourClientId}/settings');
  assert.equal(links.classify('https://manage.auth0.com/#/applications/abc/other', ctx).action, 'unmatched');
  assert.equal(links.classify('https://manage.auth0.com/#/security/attack-protection', ctx).action, 'needs-human');
});

test('rewriteLine handles markdown links, href, backticks, angle brackets and punctuation', () => {
  const seen = [];
  const out = links.rewriteLine(
    'See [a](https://manage.auth0.com/#/applications), <a href="http://manage.auth0.com/#/apis">b</a>, `https://manage.auth0.com/#/apis` and <https://manage.auth0.com/#/apis>. Done.',
    ctx,
    (m) => seen.push(m.action),
  );
  assert.equal(out, 'See [a](https://manage.auth0.com/dashboard/applications), <a href="https://manage.auth0.com/dashboard/apis">b</a>, `https://manage.auth0.com/dashboard/apis` and <https://manage.auth0.com/dashboard/apis>. Done.');
  assert.deepEqual(seen, ['rewritten', 'rewritten', 'rewritten', 'rewritten']);
});

test('extractUrls strips trailing punctuation and finds every URL on a line', () => {
  assert.deepEqual(links.extractUrls('x https://manage.auth0.com/#/a. y (https://manage.auth0.com/#/b) z'), ['https://manage.auth0.com/#/a', 'https://manage.auth0.com/#/b']);
});
