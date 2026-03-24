// Converts HTML <table> elements to Markdown table syntax in MDX files.
//
// Tables with features that have no Markdown equivalent are skipped and logged:
//   - colspan > 1 or rowspan > 1 on any cell
//   - nested <table> elements
//   - <caption> elements
//   - cells containing block-level HTML or unrecognised JSX components
//   - tables with no rows or no header row that can be inferred
//   - column count inconsistencies across rows
//
// Usage: node scripts/convert-html-tables.js [--dry-run] [--locale <locale>] [--file <rel>] [--verbose]
//
// Options:
//   --dry-run           Preview changes without writing files
//   --locale <locale>   Only process the specified locale (e.g. fr-ca, ja-jp)
//                       Default: all files including English source
//   --file <rel>        Only process one file (path relative to main/docs/)
//   --verbose           Log each table replacement

"use strict";

const { readFileSync, writeFileSync, globSync } = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { parse: parseHtml } = require("node-html-parser");

// ---------------------------------------------------------------------------
// Config from .tx/sync.yaml
// ---------------------------------------------------------------------------

const REPO_ROOT = path.resolve(__dirname, "..");
const txConfig = yaml.load(
  readFileSync(path.join(REPO_ROOT, ".tx/sync.yaml"), "utf8")
);
const filter = txConfig.filters[0];

const sourceBase = filter.source_files_expression
  .split("<")[0]
  .replace(/\/+$/, "");
const DOCS_DIR = path.join(REPO_ROOT, sourceBase);
const LOCALES = Object.values(txConfig.settings.language_mapping);

const localeDirSet = new Set(LOCALES.map((l) => `${sourceBase}/${l}`));
const EXCLUDED_PATHS = (filter.ignore_dirs ?? [])
  .filter((d) => !localeDirSet.has(d))
  .map((d) =>
    d.startsWith(sourceBase + "/") ? d.slice(sourceBase.length + 1) : d
  );

const isExcluded = (rel) =>
  EXCLUDED_PATHS.some((p) => rel === p || rel.startsWith(p + "/"));

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const verbose = args.includes("--verbose");
const localeFlag = args.indexOf("--locale");
const localeFilter = localeFlag !== -1 ? args[localeFlag + 1] : null;
const fileFlag = args.indexOf("--file");
const fileFilter = fileFlag !== -1 ? args[fileFlag + 1] : null;

// ---------------------------------------------------------------------------
// Code fence detection — returns character-offset ranges to skip
// ---------------------------------------------------------------------------

function getCodeFenceRanges(content) {
  const ranges = [];
  // Match lines that open or close a code fence (``` or ~~~, possibly indented)
  const fenceLineRe = /^[ \t]*(`{3,}|~{3,})[^\n]*/gm;
  let openMatch = null;

  let m;
  while ((m = fenceLineRe.exec(content)) !== null) {
    if (!openMatch) {
      openMatch = m;
    } else {
      const openChar = openMatch[1][0];
      const openLen = openMatch[1].length;
      if (m[1][0] === openChar && m[1].length >= openLen) {
        // end is just past the closing fence line
        ranges.push({ start: openMatch.index, end: m.index + m[0].length });
        openMatch = null;
      }
    }
  }

  return ranges;
}

function isInRange(pos, ranges) {
  return ranges.some((r) => pos >= r.start && pos <= r.end);
}

// ---------------------------------------------------------------------------
// Locate <table>...</table> spans, skipping code fences and handling nesting
// ---------------------------------------------------------------------------

function findTableSpans(content, codeRanges) {
  const spans = [];
  const lower = content.toLowerCase();

  // Find the next valid <table (followed by whitespace or >) starting at `from`
  function nextOpen(from) {
    let pos = from;
    while (pos < lower.length) {
      const idx = lower.indexOf("<table", pos);
      if (idx === -1) return -1;
      const ch = lower[idx + 6];
      if (!ch || /[\s>]/.test(ch)) return idx;
      pos = idx + 1;
    }
    return -1;
  }

  let start = nextOpen(0);

  while (start !== -1) {
    if (isInRange(start, codeRanges)) {
      start = nextOpen(start + 1);
      continue;
    }

    let depth = 1;
    let pos = start + 7; // move past "<table"

    while (depth > 0 && pos < lower.length) {
      const openIdx = nextOpen(pos);
      const closeIdx = lower.indexOf("</table>", pos);

      if (closeIdx === -1) {
        depth = -1; // malformed — no closing tag
        break;
      }

      if (openIdx !== -1 && openIdx < closeIdx) {
        depth++;
        pos = openIdx + 7;
      } else {
        depth--;
        pos = closeIdx + 8;
        if (depth === 0) spans.push({ start, end: closeIdx + 8 });
      }
    }

    start = nextOpen(depth === 0 ? pos : start + 1);
  }

  return spans;
}

// ---------------------------------------------------------------------------
// Convert a single DOM node's content to Markdown text.
// Returns null when the content cannot be represented in Markdown.
// ---------------------------------------------------------------------------

function nodeToMarkdown(node) {
  // Text node — preserve rawText so HTML entities (&lt; &gt; &amp; …) are kept
  // as-is. Bare < outside backticks would be parsed as a JSX tag in MDX.
  if (node.nodeType === 3) {
    return node.rawText.replace(/\r?\n/g, " ");
  }

  // Skip comment nodes and other non-element nodes
  if (node.nodeType !== 1) return "";

  const tag = (node.tagName || "").toLowerCase();

  // Recurse into children first
  const childParts = [];
  for (const child of node.childNodes) {
    const part = nodeToMarkdown(child);
    if (part === null) return null;
    childParts.push(part);
  }
  const inner = childParts.join("");

  switch (tag) {
    case "code":
      // Use node.text (decoded) so &lt; → < inside backticks, where < is safe
      return `\`${node.text}\``;
    case "strong":
    case "b":
      // trim leading and trailing spaces in inner content because ** in Markdown doesn't like it
      return `**${inner.trim()}**`;
    case "em":
    case "i":
      return `*${inner}*`;
    case "a": {
      const href = node.getAttribute("href") || "";
      return inner ? `[${inner}](${href})` : href;
    }
    case "br":
      return "\n";
    // Tags whose content can be kept verbatim (strip the tag itself)
    case "span":
      return inner;
    // <style> tags injected by portal tooling — strip silently
    case "style":
      return "";
    // <Tooltip> JSX component: keep visible text, convert href to a link if present
    case "tooltip": {
      const href = node.getAttribute("href");
      return href && inner ? `[${inner}](${href})` : inner;
    }
    // Tags that we need to keep as inline HTML in a table cell
    case "ul":
    case "ol":
    case "li":
    // Tags with no Markdown equivalent but valid as inline HTML in MDX
    case "abbr":
    case "samp":
    case "var":
    case "u":
    case "s":
    case "del":
    case "ins":
    case "mark":
    case "small":
    case "dfn":
    case "kbd":
    case "sub":
    case "sup":
      return `<${tag}>${inner}</${tag}>`;

    // Block-level wrappers: treat as paragraph separators using a sentinel newline.
    // cellToMarkdown will convert these to <br/> so they render correctly in the table.
    case "p":
    case "div":
      return inner ? `${inner}\n` : "";
    default:
      // Unknown tag: could be a JSX component or unsupported block element
      return null;
  }
}

function cellToMarkdown(cellNode) {
  const parts = [];
  for (const child of cellNode.childNodes) {
    const part = nodeToMarkdown(child);
    if (part === null) return null;
    parts.push(part);
  }
  return parts
    .join("")
    .trim()
    // Collapse runs of spaces on each line, then convert sentinel newlines to <br/>
    .split("\n")
    .map((line) => line.trim())
    .filter((line, i, arr) => line || (i < arr.length - 1)) // drop trailing empty line
    .join("<br/>")
    .replace(/ {2,}/g, " ")
    .replace(/\|/g, "\\|");
}

// ---------------------------------------------------------------------------
// Validate that a parsed table can be converted; return reason string if not
// ---------------------------------------------------------------------------

function checkConvertible(tableNode) {
  if (tableNode.querySelector("caption")) return "has <caption>";

  // Detect nested tables (querySelectorAll on the table node itself excludes
  // the outer table, so any result here means genuine nesting)
  if (tableNode.querySelectorAll("table").length > 0)
    return "has nested <table>";

  for (const cell of tableNode.querySelectorAll("td, th")) {
    const colspan = parseInt(cell.getAttribute("colspan") || "1", 10);
    const rowspan = parseInt(cell.getAttribute("rowspan") || "1", 10);
    if (colspan > 1) return `cell has colspan="${colspan}"`;
    if (rowspan > 1) return `cell has rowspan="${rowspan}"`;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Convert a validated table node to a Markdown table string.
// Returns { markdown } on success or { error } on failure.
// ---------------------------------------------------------------------------

function convertTableToMarkdown(tableNode) {
  const byTag = (parent, ...tags) =>
    parent.childNodes.filter((n) => tags.includes(n.tagName));

  const thead = byTag(tableNode, "THEAD")[0] ?? null;
  const tbody = byTag(tableNode, "TBODY")[0] ?? null;
  const tfoot = byTag(tableNode, "TFOOT")[0] ?? null;

  const getRows = (container) =>
    container ? byTag(container, "TR") : [];

  let headerRows = getRows(thead);
  let bodyRows = getRows(tbody);
  const footRows = getRows(tfoot);

  // No explicit thead/tbody — collect all direct <tr> children
  if (!thead && !tbody) {
    const allRows = byTag(tableNode, "TR");
    if (allRows.length === 0) return { error: "table has no rows" };
    headerRows = [allRows[0]];
    bodyRows = allRows.slice(1);
  }

  // If tbody exists but thead does not, promote first body row to header
  if (!thead && tbody && headerRows.length === 0 && bodyRows.length > 0) {
    headerRows = [bodyRows[0]];
    bodyRows = bodyRows.slice(1);
  }

  if (headerRows.length === 0) return { error: "could not determine header row" };
  if (headerRows.length > 1) return { error: "multiple header rows in <thead>" };

  const headerCells = byTag(headerRows[0], "TH", "TD");
  if (headerCells.length === 0) return { error: "header row has no cells" };

  const headers = [];
  for (const cell of headerCells) {
    const md = cellToMarkdown(cell);
    if (md === null) return { error: "header cell has unconvertible content" };
    // Strip bold markers — <th> cells are already rendered bold by browsers/renderers
    headers.push((md || " ").replace(/\*\*(.+?)\*\*/gs, "$1"));
  }

  const colCount = headers.length;
  const lines = [
    "| " + headers.join(" | ") + " |",
    "| " + headers.map(() => "---").join(" | ") + " |",
  ];

  for (const row of [...bodyRows, ...footRows]) {
    const cells = byTag(row, "TD", "TH");
    if (cells.length === 0) continue; // skip empty/spacer rows
    if (cells.length !== colCount) {
      return {
        error: `row has ${cells.length} cell(s) but header has ${colCount}`,
      };
    }
    const cellTexts = [];
    for (const cell of cells) {
      const md = cellToMarkdown(cell);
      if (md === null) return { error: "body cell has unconvertible content" };
      cellTexts.push(md || " ");
    }
    lines.push("| " + cellTexts.join(" | ") + " |");
  }

  return { markdown: lines.join("\n") };
}

// ---------------------------------------------------------------------------
// Process one file: find tables, convert what we can, report skipped ones
// ---------------------------------------------------------------------------

function processFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const codeRanges = getCodeFenceRanges(content);
  const tableSpans = findTableSpans(content, codeRanges);

  if (tableSpans.length === 0) return { converted: 0, skipped: [] };

  const skipped = [];
  const replacements = [];

  for (const span of tableSpans) {
    const tableHtml = content.slice(span.start, span.end);
    const root = parseHtml(tableHtml);
    const tableNode = root.querySelector("table");

    if (!tableNode) {
      skipped.push({ reason: "parse error: no <table> found", tableHtml });
      continue;
    }

    const incompatible = checkConvertible(tableNode);
    if (incompatible) {
      skipped.push({ reason: incompatible, tableHtml });
      continue;
    }

    const result = convertTableToMarkdown(tableNode);
    if (result.error) {
      skipped.push({ reason: result.error, tableHtml });
      continue;
    }

    replacements.push({
      start: span.start,
      end: span.end,
      markdown: result.markdown,
    });
  }

  if (replacements.length === 0) return { converted: 0, skipped };

  // Apply replacements from last to first to preserve offsets
  let newContent = content;
  for (const rep of [...replacements].reverse()) {
    newContent =
      newContent.slice(0, rep.start) +
      rep.markdown +
      newContent.slice(rep.end);
  }

  if (!dryRun) {
    writeFileSync(filePath, newContent, "utf8");
  }

  return { converted: replacements.length, skipped };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

let files;

if (fileFilter) {
  files = [path.join(DOCS_DIR, fileFilter)];
} else if (localeFilter) {
  files = globSync("**/*.mdx", { cwd: path.join(DOCS_DIR, localeFilter) })
    .filter((rel) => !isExcluded(rel))
    .map((rel) => path.join(DOCS_DIR, localeFilter, rel));
} else {
  files = globSync("**/*.mdx", { cwd: DOCS_DIR })
    .filter((rel) => !isExcluded(rel))
    .map((rel) => path.join(DOCS_DIR, rel));
}

files.sort();

let totalConverted = 0;
let totalSkipped = 0;
let totalFilesModified = 0;

for (const filePath of files) {
  const rel = path.relative(DOCS_DIR, filePath);
  const { converted, skipped } = processFile(filePath);

  if (skipped.length > 0) {
    for (const { reason, tableHtml } of skipped) {
      console.log(`SKIP  ${rel}`);
      console.log(`      Reason: ${reason}`);
      if (verbose) {
        const preview = tableHtml.slice(0, 120).replace(/\n/g, " ").trimEnd();
        console.log(`      Table:  ${preview}${tableHtml.length > 120 ? "…" : ""}`);
      }
    }
    totalSkipped += skipped.length;
  }

  if (converted > 0) {
    const action = dryRun ? "WOULD CONVERT" : "CONVERTED";
    console.log(
      `${action}  ${rel}  (${converted} table${converted === 1 ? "" : "s"})`
    );
    totalConverted += converted;
    totalFilesModified++;
  }
}

console.log("\n--- Summary ---");
if (dryRun) console.log("(dry run — no files written)");
console.log(`Files modified:   ${totalFilesModified}`);
console.log(`Tables converted: ${totalConverted}`);
console.log(`Tables skipped:   ${totalSkipped}`);
