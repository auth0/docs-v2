#!/usr/bin/env node
// Post-conversion cleanup pass. Idempotent — safe to re-run.
// Operates on fga/ files already produced by convert.mjs.

import fs from "node:fs";
import path from "node:path";

const FGA_ROOT = "/Users/nick.gagliardi/docs-v2/fga";

// Files to clean up (all 10 POC files).
const FILES = [
  "intro/about-auth0-fga.mdx",
  "intro/authorization-concepts.mdx",
  "intro/fga-concepts.mdx",
  "getting-started/new-getting-started.mdx",
  "getting-started/perform-check.mdx",
  "modeling/getting-started.mdx",
  "modeling/direct-access.mdx",
  "modeling/user-groups.mdx",
  "interacting/managing-user-access.mdx",
  "migration-instructions.mdx",
];

// Viewers we have NOT ported — replace with a Tip placeholder.
const UNPORTED_VIEWERS = [
  "BatchCheckRequestViewer",
  "WriteRequestViewer",
  "ListObjectsRequestViewer",
  "ListUsersRequestViewer",
  "ReadChangesRequestViewer",
  "ExpandRequestViewer",
  "RelationshipTuplesViewer",
];

function placeholderFor(viewer) {
  // Single-line so the placeholder is safe inside list items / nested contexts.
  return `<Tip>**Code example coming soon** — \`${viewer}\` has not yet been ported to Mintlify. See the [OpenFGA SDK docs](https://openfga.dev/docs) for examples.</Tip>`;
}

// Find a balanced JSX tag starting at index i. Returns end index (exclusive)
// of the matched tag, or -1 if not balanced. Handles both self-closing
// (`<Foo .../>`) and open/close (`<Foo>...</Foo>`) forms.
function findJsxEnd(text, start, tagName) {
  // Try to find the corresponding "/>" before any "</tagName>".
  // The original viewers in fga-docs are all self-closing (multiline), so
  // we walk forward, tracking nesting on the bare tagName.
  let depth = 1;
  let i = start;
  while (i < text.length) {
    if (text[i] === "/" && text[i + 1] === ">") {
      depth--;
      if (depth === 0) return i + 2;
      i += 2;
      continue;
    }
    // Opening of a same-name tag, e.g. nested <Foo ...>.
    const openMatch = text.slice(i).match(new RegExp(`^<${tagName}\\b`));
    if (openMatch) {
      depth++;
      i += openMatch[0].length;
      continue;
    }
    const closeMatch = text.slice(i).match(new RegExp(`^</${tagName}\\s*>`));
    if (closeMatch) {
      depth--;
      if (depth === 0) return i + closeMatch[0].length;
      i += closeMatch[0].length;
      continue;
    }
    i++;
  }
  return -1;
}

function replaceUnportedViewers(text) {
  let out = text;
  for (const viewer of UNPORTED_VIEWERS) {
    const re = new RegExp(`<${viewer}\\b`);
    while (true) {
      const m = re.exec(out);
      if (!m) break;
      const start = m.index;
      const end = findJsxEnd(out, start + m[0].length, viewer);
      if (end < 0) break;
      out = out.slice(0, start) + placeholderFor(viewer) + out.slice(end);
    }
  }
  return out;
}

function rewriteUpdateProductNameInLinks(text) {
  // <UpdateProductNameInLinks link="X" name="Y" /> -> [Y](X)
  let out = text.replace(
    /<UpdateProductNameInLinks\s+link=["']([^"']+)["']\s+name=["']([^"']+)["']\s*\/>/g,
    (_, link, name) => `[${name}](${link})`,
  );
  // Same with prop order reversed.
  out = out.replace(
    /<UpdateProductNameInLinks\s+name=["']([^"']+)["']\s+link=["']([^"']+)["']\s*\/>/g,
    (_, name, link) => `[${name}](${link})`,
  );
  return out;
}

function stripStandaloneProductConcept(text) {
  // <ProductConcept /> with no props — replaced with the literal phrase.
  return text.replace(/<ProductConcept\s*\/>/g, "FGA concepts");
}

function rewriteSdkSetupHeader(text) {
  // <SdkSetupHeader lang={SupportedLanguage.X} /> — these were only kept
  // inside Tabs blocks. Drop them; the per-language setup is summarized
  // by the surrounding <Tip>.
  return text.replace(/<SdkSetupHeader\s+lang=\{[^}]+\}\s*\/>\s*\n?/g, "");
}

function ensureCheckRequestViewerImport(text, filePath) {
  if (!/<CheckRequestViewer\b/.test(text)) return text;
  if (text.includes('from "/snippets/CheckRequestViewer.jsx"')) return text;
  // Insert import line right after the closing frontmatter `---`.
  return text.replace(
    /(^---\n[\s\S]*?\n---\n)/,
    `$1\nimport { CheckRequestViewer, SupportedLanguage } from "/snippets/CheckRequestViewer.jsx";\n`,
  );
}

function ensureAuthzModelSnippetViewerImport(text) {
  if (!/<AuthzModelSnippetViewer\b/.test(text)) return text;
  if (text.includes('from "/snippets/AuthzModelSnippetViewer.jsx"')) return text;
  return text.replace(
    /(^---\n[\s\S]*?\n---\n)/,
    `$1\nimport { AuthzModelSnippetViewer, SyntaxFormat } from "/snippets/AuthzModelSnippetViewer.jsx";\n`,
  );
}

function stripHtmlComments(text) {
  // Docusaurus tolerates HTML comments; MDX 3 does not. Strip them whole.
  return text.replace(/<!--[\s\S]*?-->\s*\n?/g, "");
}

function clean(text, filePath) {
  let out = text;
  out = rewriteUpdateProductNameInLinks(out);
  out = stripStandaloneProductConcept(out);
  out = rewriteSdkSetupHeader(out);
  out = replaceUnportedViewers(out);
  out = stripHtmlComments(out);
  out = ensureCheckRequestViewerImport(out, filePath);
  out = ensureAuthzModelSnippetViewerImport(out);
  return out;
}

function main() {
  for (const rel of FILES) {
    const p = path.join(FGA_ROOT, rel);
    const text = fs.readFileSync(p, "utf8");
    const cleaned = clean(text, p);
    if (cleaned !== text) {
      fs.writeFileSync(p, cleaned);
      console.log(`cleaned ${rel}`);
    } else {
      console.log(`(no change) ${rel}`);
    }
  }
}

main();
