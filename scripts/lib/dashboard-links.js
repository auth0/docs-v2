'use strict';

// Dashboard URL extraction, normalization and classification shared by
// update-dashboard-links.js (rewriter) and check-dashboard-links.js (CI guardrail).

const fs = require('node:fs');

const HOST = 'https://manage.auth0.com';

// A dashboard URL in prose, a markdown link, an href attribute, angle brackets or backticks.
// Stops at whitespace and the delimiters those contexts use.
const URL_RE = /https?:\/\/manage\.auth0\.com[^\s)>"'`\]]*/g;

// Sentence punctuation that is not part of the URL. Remembered and re-attached after rewriting.
const TRAILING_PUNCT_RE = /[.,;:]+$/;

function splitTrailingPunct(raw) {
  const m = raw.match(TRAILING_PUNCT_RE);
  return m ? { url: raw.slice(0, -m[0].length), suffix: m[0] } : { url: raw, suffix: '' };
}

// Canonical form used for map lookups. Does not change case.
function normalize(url) {
  let u = url.trim();
  u = u.replace(/^http:\/\//i, 'https://');
  u = u.replace(/%7B/gi, '{').replace(/%7D/gi, '}');
  u = u.replace(/\\([{}])/g, '$1'); // markdown-escaped braces: \{yourClientId\}
  u = u.replace(/\/+$/, '');
  return u;
}

// Root and login URLs are still valid after the redesign and are never rewritten.
function isRoot(n) {
  return n === HOST || n === `${HOST}/#` || n === `${HOST}/login` || n.startsWith(`${HOST}/login?`);
}

// Checked on the raw URL, before normalization.
function isMalformed(raw) {
  return (
    /%7B|%7D/i.test(raw) || // {…} that was URL-encoded by an editor
    /\/\?\//.test(raw) || // manage.auth0.com/?/authentication-profiles
    /(?<!\/dashboard)\/\*\//.test(raw) || // manage.auth0.com/*/connections (wildcard without /dashboard)
    /#\/[^\s]*#\//.test(raw) // two hash routes in one URL
  );
}

function loadJson(file, fallback) {
  if (!fs.existsSync(file)) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing file: ${file}`);
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Map entries: { old, new, changeType }. Entries with changeType "malformed" or empty new are
// flagged for a human. Lookup is exact on the normalized old URL, then case-insensitive.
function loadMap(file) {
  const entries = loadJson(file);
  const byOld = new Map();
  const byOldLower = new Map();
  const newUrls = new Set();
  for (const e of entries) {
    if (!e.old) continue;
    const k = normalize(e.old);
    byOld.set(k, e);
    byOldLower.set(k.toLowerCase(), e);
    if (e.new) newUrls.add(normalize(e.new));
  }
  return { entries, byOld, byOldLower, newUrls };
}

// Pattern entries: { pattern, replacement, note }. `{id}` in pattern matches one path segment
// (an id like abc123XYZ or a docs placeholder like {yourClientId}) and is substituted into
// replacement in order.
function compilePatterns(entries) {
  return entries.map((p) => {
    const esc = normalize(p.pattern).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const src = esc.replace(/\\\{id\\\}/g, '([A-Za-z0-9_-]+|\\{[A-Za-z0-9_]+\\})');
    return { ...p, re: new RegExp(`^${src}$`) };
  });
}

function loadPatterns(file) {
  return compilePatterns(loadJson(file, []));
}

// Three map keys sharing the longest prefix with n, to make extending the map a copy-paste job.
function nearest(n, map, k = 3) {
  const scored = [];
  for (const key of map.byOld.keys()) {
    let i = 0;
    while (i < n.length && i < key.length && n[i] === key[i]) i++;
    scored.push([i, key]);
  }
  return scored
    .sort((a, b) => b[0] - a[0] || a[1].localeCompare(b[1]))
    .filter((s) => s[0] > HOST.length + 2)
    .slice(0, k)
    .map((s) => s[1]);
}

const ACTIONS = ['rewritten', 'pattern-rewritten', 'unchanged-root', 'unchanged-new', 'needs-human', 'unmatched'];

// Decide what to do with one URL. Returns { action, newUrl?, reason?, candidates? }.
function classify(raw, ctx) {
  const n = normalize(raw);
  if (isRoot(n)) return { action: 'unchanged-root' };
  if (isMalformed(raw)) return { action: 'needs-human', reason: 'malformed URL' };
  if (ctx.map.newUrls.has(n)) return { action: 'unchanged-new', reason: 'already in new form' };

  const entry = ctx.map.byOld.get(n) || ctx.map.byOldLower.get(n.toLowerCase());
  if (entry) {
    const type = (entry.changeType || '').toLowerCase();
    if (type.includes('malformed') || !entry.new) {
      return { action: 'needs-human', reason: `map: ${entry.changeType || 'no new URL'}` };
    }
    return { action: 'rewritten', newUrl: entry.new, reason: entry.changeType || 'map' };
  }

  for (const p of ctx.patterns) {
    const m = n.match(p.re);
    if (m) {
      if (/REPLACE_WITH/.test(p.replacement)) {
        return { action: 'needs-human', reason: `pattern "${p.pattern}" has no replacement configured yet` };
      }
      let i = 1;
      const newUrl = p.replacement.replace(/\{id\}/g, () => m[i++]);
      return { action: 'pattern-rewritten', newUrl, reason: p.note || p.pattern };
    }
  }

  return { action: 'unmatched', candidates: nearest(n, ctx.map) };
}

// Rewrite every dashboard URL in one line. onMatch is called per URL with the classification.
function rewriteLine(line, ctx, onMatch) {
  return line.replace(URL_RE, (raw) => {
    const { url, suffix } = splitTrailingPunct(raw);
    const res = classify(url, ctx);
    if (onMatch) onMatch({ url, ...res });
    return res.newUrl ? res.newUrl + suffix : raw;
  });
}

// Every dashboard URL in a line, with trailing punctuation removed. Used by the guardrail.
function extractUrls(line) {
  const out = [];
  for (const m of line.matchAll(URL_RE)) out.push(splitTrailingPunct(m[0]).url);
  return out;
}

module.exports = {
  HOST,
  URL_RE,
  ACTIONS,
  splitTrailingPunct,
  normalize,
  isRoot,
  isMalformed,
  loadJson,
  loadMap,
  loadPatterns,
  compilePatterns,
  nearest,
  classify,
  rewriteLine,
  extractUrls,
};
