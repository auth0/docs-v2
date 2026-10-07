'use strict';

// Shared MDX helpers for the dashboard link and screenshot scripts:
// - walk a tree for .mdx files
// - map locale twins (main/docs/<page> <-> main/docs/ja-jp/<page>, main/docs/fr-ca/<page>)
// - transform lines while skipping fenced code blocks

const fs = require('node:fs');
const path = require('node:path');

const LOCALES = ['ja-jp', 'fr-ca'];

function toPosix(p) {
  return p.split(path.sep).join('/');
}

// Recursively list .mdx files under dir. Skips dotfiles and node_modules. Sorted, absolute.
function walkMdx(dir) {
  const out = [];
  (function rec(d) {
    let entries;
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p);
      else if (e.isFile() && e.name.endsWith('.mdx')) out.push(p);
    }
  })(dir);
  return out.sort();
}

// 'ja-jp' | 'fr-ca' | 'en' from a repo-relative path. main/ai and everything else count as 'en'.
function localeOf(relPath) {
  const m = toPosix(relPath).match(/^main\/docs\/(ja-jp|fr-ca)\//);
  return m ? m[1] : 'en';
}

// For an English page under main/docs, the paths of its localized twins (whether or not they exist).
function localeTwins(relPath) {
  const p = toPosix(relPath);
  if (!p.startsWith('main/docs/') || localeOf(p) !== 'en') return [];
  return LOCALES.map((l) => p.replace(/^main\/docs\//, `main/docs/${l}/`));
}

const FENCE_RE = /^\s*(```|~~~)/;

// Call cb(line, lineNumber) for every line outside fenced code blocks. If cb returns a string
// different from the line, it replaces it. Line endings (LF or CRLF) are preserved.
function mapOutsideFences(text, cb) {
  const lines = text.split('\n');
  let fence = null;
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(FENCE_RE);
    if (m) {
      if (!fence) fence = m[1];
      else if (m[1] === fence) fence = null;
      continue;
    }
    if (fence) continue;
    const r = cb(line, i + 1);
    if (typeof r === 'string' && r !== line) {
      lines[i] = r;
      changed = true;
    }
  }
  return { text: lines.join('\n'), changed };
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function writeText(file, text) {
  fs.writeFileSync(file, text, 'utf8');
}

module.exports = { LOCALES, toPosix, walkMdx, localeOf, localeTwins, mapOutsideFences, readText, writeText };
