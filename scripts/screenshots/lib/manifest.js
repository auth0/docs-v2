'use strict';

// manifest.json helpers. One entry per target image; see README.md for the schema.

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_FILE = path.join(__dirname, '..', 'manifest.json');
const IMAGES_PREFIX = '/docs/images/';
const STATUSES = ['pending', 'captured', 'approved', 'rewritten'];

function load(file = DEFAULT_FILE) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function save(entries, file = DEFAULT_FILE) {
  fs.writeFileSync(file, JSON.stringify(entries, null, 2) + '\n', 'utf8');
}

// '/docs/images/dashboard/a/b.png' -> 'dashboard/a/b.png'
function imagesRel(docsPath) {
  return docsPath.replace(/^\/?docs\/images\//, '').replace(/^\/?images\//, '');
}

// Path segments for toHaveScreenshot(), which resolves them under main/docs/images.
function snapshotName(entry) {
  return imagesRel(entry.newPath).split('/');
}

// Tag used in test titles so `--grep @dashboard-applications` scopes a run to one section.
function sectionOf(entry) {
  const seg = imagesRel(entry.newPath).split('/');
  if (seg[0] === 'dashboard' && seg.length > 2) return `dashboard-${seg[1]}`;
  return seg.length > 1 ? seg[0] : 'misc';
}

function validate(entry) {
  const problems = [];
  for (const k of ['id', 'currentPath', 'newPath', 'altText']) if (!entry[k]) problems.push(`missing ${k}`);
  if (!Array.isArray(entry.refs) || entry.refs.length === 0) problems.push('no refs');
  if (entry.status && !STATUSES.includes(entry.status)) problems.push(`bad status ${entry.status}`);
  if (entry.newPath && !/-light\.(png|jpg|jpeg|webp)$/.test(entry.newPath)) problems.push('newPath must end in -light.<ext>');
  return problems;
}

module.exports = { DEFAULT_FILE, IMAGES_PREFIX, STATUSES, load, save, imagesRel, snapshotName, sectionOf, validate };
