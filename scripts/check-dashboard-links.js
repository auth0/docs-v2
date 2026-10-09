#!/usr/bin/env node
'use strict';

// CI guardrail: fails when an .mdx file contains a legacy or malformed manage.auth0.com URL.
// Closes the gap left by lychee.toml, which excludes manage.auth0.com entirely.
//
// Usage:
//   node scripts/check-dashboard-links.js [--ci] [--strict] [--root=.]
//        [--policy=scripts/data/dashboard-link-policy.json] [files...]
//
//   files     .mdx paths to check (CI passes the changed-files list). None = every .mdx under main/.
//   --ci      print GitHub Actions annotations (::error / ::warning) instead of plain lines
//   --strict  also fail on "pendingDecision" patterns (competing new forms awaiting a decision)
//
// Exit code 1 when any reject pattern matches (or any pending pattern with --strict), else 0.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('./lib/args');
const mdx = require('./lib/mdx');
const links = require('./lib/dashboard-links');

function loadPolicy(file) {
  const p = links.loadJson(file);
  const compile = (arr) => (arr || []).map((r) => ({ ...r, re: new RegExp(r.pattern, 'i') }));
  return { reject: compile(p.reject), pendingDecision: compile(p.pendingDecision) };
}

function checkFile(file, rel, policy) {
  const findings = [];
  mdx.mapOutsideFences(mdx.readText(file), (line, lineNo) => {
    for (const url of links.extractUrls(line)) {
      if (links.isRoot(links.normalize(url))) continue;
      for (const r of policy.reject) {
        if (r.re.test(url)) findings.push({ level: 'error', file: rel, line: lineNo, url, rule: r.id, message: r.message });
      }
      for (const r of policy.pendingDecision) {
        if (r.re.test(url)) findings.push({ level: 'warning', file: rel, line: lineNo, url, rule: r.id, message: r.message });
      }
    }
    return undefined;
  });
  return findings;
}

function main(argv) {
  const { opts, positional } = parseArgs(argv, { booleans: ['ci', 'strict', 'help'] });
  if (opts.help) {
    console.log(fs.readFileSync(__filename, 'utf8').split('\n').filter((l) => l.startsWith('//')).join('\n'));
    return 0;
  }
  const root = path.resolve(opts.root || '.');
  const policy = loadPolicy(path.resolve(root, opts.policy || 'scripts/data/dashboard-link-policy.json'));

  const files = positional.length
    ? positional.map((f) => path.resolve(root, f)).filter((f) => f.endsWith('.mdx') && fs.existsSync(f))
    : mdx.walkMdx(path.resolve(root, 'main'));

  const findings = [];
  for (const file of files) {
    const rel = mdx.toPosix(path.relative(root, file));
    findings.push(...checkFile(file, rel, policy));
  }

  for (const f of findings) {
    const level = f.level === 'warning' && opts.strict ? 'error' : f.level;
    const text = `${f.message} [${f.rule}]: ${f.url}`;
    if (opts.ci) console.log(`::${level} file=${f.file},line=${f.line}::${text}`);
    else console.log(`${f.file}:${f.line}: ${level}: ${text}`);
  }

  const errors = findings.filter((f) => f.level === 'error' || (opts.strict && f.level === 'warning')).length;
  const warnings = findings.length - errors;
  console.log(`\n${files.length} files checked: ${errors} error(s), ${warnings} warning(s)`);
  return errors > 0 ? 1 : 0;
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));

module.exports = { main, checkFile, loadPolicy };
