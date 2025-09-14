/* scripts/append-related-pages.js */
const fs = require("fs");
const path = require("path");

const IMPORT_LINE = `import { AppendRelatedPages } from "/snippets/RelatedPages.mdx";`;
const COMPONENT_TAG = "AppendRelatedPages";

// ENV
const JSON_PATH = process.env.RELATED_PAGES_JSON || "related_links_map.json";
const DOCS_ROOT = process.env.DOCS_ROOT || ".";

function readJson(fp) {
  return JSON.parse(fs.readFileSync(fp, "utf8"));
}

function ensureSingleImport(content) {
  // Match both `import {AppendRelatedPages} ...` and `import { AppendRelatedPages } ...`
  const importRe = /^\s*import\s*{\s*AppendRelatedPages\s*}\s*from\s*["']\/snippets\/RelatedPages\.mdx["'];?\s*$/gm;

  // Remove all existing variants
  content = content.replace(importRe, "").trimStart();

  // Insert exactly one (after frontmatter if present)
  const FRONTMATTER_RE = /^---\n[\s\S]*?\n---\n?/;
  if (FRONTMATTER_RE.test(content)) {
    return content.replace(FRONTMATTER_RE, (m) => m + IMPORT_LINE + "\n");
  }
  return IMPORT_LINE + "\n" + content;
}

function stripAllComponents(content) {
  // Remove ALL forms of <AppendRelatedPages .../> (self-closing, multi-line)
  // Conservatively matches up to the first "/>" after the tag start.
  const re = new RegExp(`<${COMPONENT_TAG}\\b[\\s\\S]*?\\/>(\\s*\\n)?`, "g");
  return content.replace(re, "");
}

function toJsItems(items) {
  const lines = items.map((it) => `    { href: ${JSON.stringify(it.href)}, text: ${JSON.stringify(it.text)} }`);
  return `[\n${lines.join(",\n")}\n  ]`;
}

function buildComponentBlock(title, items) {
  const titleAttr = title ? ` title=${JSON.stringify(title)}` : "";
  return `\n\n<${COMPONENT_TAG}${titleAttr}\n  items={${toJsItems(items)}}\n/>\n`;
}

function appendAtEnd(content, block) {
  if (!content.endsWith("\n")) content += "\n";
  return content + block;
}

function normalizeEntry(entry, defaults) {
  if (Array.isArray(entry)) {
    return { title: defaults?.title || "Related pages", items: entry };
  }
  if (entry && typeof entry === "object") {
    return {
      title: entry.title != null ? String(entry.title) : defaults?.title || "Related pages",
      items: Array.isArray(entry.items) ? entry.items : [],
    };
  }
  return null;
}

function processFile(absPath, title, items) {
  if (!fs.existsSync(absPath)) {
    console.warn(`⚠️  Skip, file not found: ${absPath}`);
    return false;
  }

  let content = fs.readFileSync(absPath, "utf8");

  // 1) Ensure exactly one import
  content = ensureSingleImport(content);

  // 2) Remove ALL existing usages of the component
  content = stripAllComponents(content);

  // 3) Append fresh block from JSON
  const block = buildComponentBlock(title, items);
  content = appendAtEnd(content, block);

  fs.writeFileSync(absPath, content, "utf8");
  console.log(`✅ Updated: ${absPath}`);
  return true;
}

function main() {
  const cfgPath = path.resolve(JSON_PATH);
  if (!fs.existsSync(cfgPath)) {
    console.error(`❌ Config not found: ${cfgPath}`);
    process.exit(1);
  }

  const cfg = readJson(cfgPath);
  const defaults = cfg.defaults || {};
  const pages = cfg.pages || {};

  const entries = Object.entries(pages);
  if (!entries.length) {
    console.log("ℹ️  No pages configured. Nothing to do.");
    return;
  }

  let updated = 0;
  for (const [relPath, entry] of entries) {
    const norm = normalizeEntry(entry, defaults);
    if (!norm || !norm.items?.length) {
      console.warn(`⚠️  Skip ${relPath}: no items`);
      continue;
    }
    const absPath = path.resolve(DOCS_ROOT, relPath);
    if (processFile(absPath, norm.title, norm.items)) updated++;
  }

  console.log(`\n✨ Done. Updated ${updated}/${entries.length} file(s).`);
}

if (require.main === module) main();
