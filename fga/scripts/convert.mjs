#!/usr/bin/env node
// Docusaurus -> Mintlify MDX converter for the FGA docs POC.
// One-shot script: reads each source page, applies four passes, writes to fga/.

import fs from "node:fs";
import path from "node:path";

const SRC_ROOT = "/Users/nick.gagliardi/fga-docs/docs/content";
const DST_ROOT = "/Users/nick.gagliardi/docs-v2/fga";

const POC_PAGES = [
  ["about-auth0-fga.mdx", "intro/about-auth0-fga.mdx"],
  ["authorization-concepts.mdx", "intro/authorization-concepts.mdx"],
  ["fga-concepts.mdx", "intro/fga-concepts.mdx"],
  ["getting-started/new-getting-started.mdx", "getting-started/new-getting-started.mdx"],
  ["getting-started/perform-check.mdx", "getting-started/perform-check.mdx"],
  ["modeling/getting-started.mdx", "modeling/getting-started.mdx"],
  ["modeling/direct-access.mdx", "modeling/direct-access.mdx"],
  ["modeling/user-groups.mdx", "modeling/user-groups.mdx"],
  ["interacting/managing-user-access.mdx", "interacting/managing-user-access.mdx"],
  ["migration-instructions.mdx", "migration-instructions.mdx"],
];

// Mirrors fga-docs/src/components/Docs/SnippetViewer/SupportedLanguage.tsx.
const LANG_LABEL = {
  CLI: "CLI",
  JS_SDK: "Node.js",
  GO_SDK: "Go",
  DOTNET_SDK: ".NET",
  PYTHON_SDK: "Python",
  JAVA_SDK: "Java",
  CURL: "curl",
  RPC: "Pseudocode",
  PLAYGROUND: "Playground",
};

const ADMONITIONS = {
  note: "Note",
  info: "Info",
  tip: "Tip",
  caution: "Warning",
  warning: "Warning",
  danger: "Warning",
};

// Pass 1: strip Docusaurus-only imports. Returns { body, svgMap } where svgMap
// captures `import X from '@site/static/img/Y.svg'` so we can rewrite usages.
function stripImports(body) {
  const svgMap = new Map();
  const lines = body.split("\n");
  const kept = [];
  let inImportBlock = false;
  let importBuffer = [];

  const isDocusaurusImport = (text) =>
    text.includes("'@components/Docs'") ||
    text.includes('"@components/Docs"') ||
    text.includes("'@theme/Tabs'") ||
    text.includes("'@theme/TabItem'") ||
    text.includes("'@site/static/");

  for (const line of lines) {
    if (inImportBlock) {
      importBuffer.push(line);
      if (line.includes(";")) {
        const full = importBuffer.join("\n");
        const svgMatch = full.match(/import\s+(\w+)\s+from\s+['"]@site\/static\/img\/([^'"]+)['"]/);
        if (svgMatch) svgMap.set(svgMatch[1], svgMatch[2]);
        if (!isDocusaurusImport(full)) kept.push(...importBuffer);
        importBuffer = [];
        inImportBlock = false;
      }
      continue;
    }
    if (line.trimStart().startsWith("import ") && !line.includes(";")) {
      inImportBlock = true;
      importBuffer = [line];
      continue;
    }
    if (line.trimStart().startsWith("import ") && line.includes(";")) {
      const svgMatch = line.match(/import\s+(\w+)\s+from\s+['"]@site\/static\/img\/([^'"]+)['"]/);
      if (svgMatch) svgMap.set(svgMatch[1], svgMatch[2]);
      if (isDocusaurusImport(line)) continue;
    }
    kept.push(line);
  }
  return { body: kept.join("\n"), svgMap };
}

// Pass 2: convert :::note...::: blocks to JSX equivalents.
function convertAdmonitions(body) {
  // ::: type [optional title] \n ... \n :::
  // Title must be on the SAME line as ::: type (separated by spaces/tabs, not a newline) —
  // otherwise [\s+] would slurp the leading newline and capture the next line as title.
  return body.replace(
    /^:::(\w+)(?:[ \t]+([^\n]*))?\n([\s\S]*?)\n:::\s*$/gm,
    (match, type, title, content) => {
      const tag = ADMONITIONS[type];
      if (!tag) return match;
      const inner = content.trim();
      if (title && title.trim()) {
        return `<${tag}>\n**${title.trim()}**\n\n${inner}\n</${tag}>`;
      }
      return `<${tag}>\n${inner}\n</${tag}>`;
    },
  );
}

// Pass 3: rewrite <Tabs groupId="..."> + <TabItem value=... label=...> to Mintlify <Tabs>/<Tab>.
function convertTabs(body) {
  let out = body;

  out = out.replace(/<Tabs\s+groupId=["'][^"']*["']\s*>/g, "<Tabs>");
  out = out.replace(/<\/TabItem>/g, "</Tab>");

  // <TabItem value={SupportedLanguage.X} label={languageLabelMap.get(SupportedLanguage.X)}>
  out = out.replace(
    /<TabItem\s+value=\{SupportedLanguage\.(\w+)\}\s+label=\{[^}]+\}\s*>/g,
    (_, key) => `<Tab title="${LANG_LABEL[key] ?? key}">`,
  );
  // <TabItem value="js" label="JavaScript">
  out = out.replace(
    /<TabItem\s+value=["'][^"']*["']\s+label=["']([^"']+)["']\s*>/g,
    (_, label) => `<Tab title="${label}">`,
  );

  return out;
}

// Pass 4: frontmatter cleanup + SVG-import-as-component rewrite + asset path rewrite.
function cleanFrontmatter(body) {
  const match = body.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return body;
  const fmLines = match[1].split("\n");
  const out = [];
  for (const line of fmLines) {
    if (/^\s*sidebar_position\s*:/.test(line)) continue;
    if (/^\s*toc_max_heading_level\s*:/.test(line)) continue;
    if (/^\s*sidebar_label\s*:/.test(line)) continue;
    if (/^\s*id\s*:/.test(line)) continue;
    if (/^\s*slug\s*:/.test(line)) {
      out.push(line.replace(/^\s*slug\s*:/, "permalink:"));
      continue;
    }
    out.push(line);
  }
  const newFm = `---\n${out.join("\n")}\n---\n`;
  return body.replace(match[0], newFm);
}

function rewriteSvgUsages(body, svgMap) {
  let out = body;
  for (const [varName, file] of svgMap) {
    const selfClose = new RegExp(`<${varName}\\s*/>`, "g");
    const open = new RegExp(`<${varName}\\s*>([\\s\\S]*?)</${varName}>`, "g");
    const replacement = `<img src="/img/${file}" alt="${varName}" />`;
    out = out.replace(selfClose, replacement);
    out = out.replace(open, replacement);
  }
  return out;
}

function rewriteAssetPaths(body) {
  let out = body;
  // Markdown images and JSX src= attributes pointing into Docusaurus asset folders
  // get rewritten to the site-root /img/ path. Covers ./assets/, ../assets/,
  // bare assets/, ./<section>/assets/, and @site/static/img/.
  out = out.replace(/(['"\(])\.{0,2}\/?(?:[\w-]+\/)*assets\//g, "$1/img/");
  out = out.replace(/(['"\(])@site\/static\/img\//g, "$1/img/");
  return out;
}

// Pass 5: replace branding / concept helpers with static text or Mintlify-friendly markup.
function replaceBranding(body) {
  let out = body;

  // <ProductName format={ProductNameFormat.LongForm}/> -> "Auth0 Fine Grained Authorization"
  out = out.replace(
    /<ProductName\s+format=\{ProductNameFormat\.LongForm\}\s*\/>/g,
    "Auth0 Fine Grained Authorization",
  );
  // ShortForm and ProductLink both render as "Auth0 FGA" (the link wrapping is dropped for now).
  out = out.replace(
    /<ProductName\s+format=\{ProductNameFormat\.(?:ShortForm|ProductLink)\}\s*\/>/g,
    "Auth0 FGA",
  );

  // <ProductConcept section="x" linkName="y" /> -> [y](/intro/fga-concepts#x)
  out = out.replace(
    /<ProductConcept\s+section=["']([^"']+)["']\s+linkName=["']([^"']+)["']\s*\/>/g,
    (_, section, linkName) => `[${linkName}](/intro/fga-concepts#${section})`,
  );
  out = out.replace(
    /<ProductConcept\s+linkName=["']([^"']+)["']\s+section=["']([^"']+)["']\s*\/>/g,
    (_, linkName, section) => `[${linkName}](/intro/fga-concepts#${section})`,
  );

  // <IntroductionSection linkName="y" section="x"/> -> [y](/intro/authorization-concepts#x)
  out = out.replace(
    /<IntroductionSection\s+linkName=["']([^"']+)["']\s+section=["']([^"']+)["']\s*\/>/g,
    (_, linkName, section) => `[${linkName}](/intro/authorization-concepts#${section})`,
  );
  out = out.replace(
    /<IntroductionSection\s+section=["']([^"']+)["']\s+linkName=["']([^"']+)["']\s*\/>/g,
    (_, section, linkName) => `[${linkName}](/intro/authorization-concepts#${section})`,
  );

  // Inline "{ProductName}" placeholders inside string props (RelatedSection etc.).
  out = out.replace(/\{ProductName\}/g, "Auth0 FGA");

  // <DocumentationNotice /> renders an Early Access banner in the source — drop it for POC.
  out = out.replace(/<DocumentationNotice\s*\/>\s*\n?/g, "");

  // CardBox -> Card; ColumnLayout -> Columns.
  out = out.replace(/<CardBox(\s|>)/g, "<Card$1");
  out = out.replace(/<\/CardBox>/g, "</Card>");
  out = out.replace(/<ColumnLayout(\s|>)/g, "<Columns$1");
  out = out.replace(/<\/ColumnLayout>/g, "</Columns>");

  return out;
}

function convert(srcText) {
  const stripped = stripImports(srcText);
  let out = stripped.body;
  out = convertAdmonitions(out);
  out = convertTabs(out);
  out = cleanFrontmatter(out);
  out = rewriteSvgUsages(out, stripped.svgMap);
  out = rewriteAssetPaths(out);
  out = replaceBranding(out);
  return out;
}

function main() {
  for (const [src, dst] of POC_PAGES) {
    const srcPath = path.join(SRC_ROOT, src);
    const dstPath = path.join(DST_ROOT, dst);
    const text = fs.readFileSync(srcPath, "utf8");
    const out = convert(text);
    fs.mkdirSync(path.dirname(dstPath), { recursive: true });
    fs.writeFileSync(dstPath, out);
    console.log(`${src}  ->  ${dst}`);
  }
}

main();
