// Builds a site's redirects.json from per-page `redirects:` frontmatter
//
// `config/redirects.json` is a GENERATED file — do not edit it by hand. To add a
// redirect, add the old path to the `redirects:` frontmatter array of the .mdx
// page it should land on, then re-run this script:
//
//   ---
//   title: Auth0 APIs
//   redirects:
//     - "/docs/api/postman"
//     - "/docs/api/info"
//   ---
//
// The destination is derived from the file's location on disk, so a redirect
// always travels with the page that owns it:
//
//   main/docs/api.mdx         -> /docs/api
//   main/docs/index.mdx       -> /docs          (a trailing /index is dropped)
//   main/docs/ja-jp/api.mdx   -> /docs/ja-jp/api
//
// Redirects that have no page to live in — an external destination, or a path
// parameter pattern that rewrites into a segment (/docs/a/:path* -> /docs/b/:path*)
// — are hand-maintained in `config/redirects-explicit.json` and merged in here.
// That file also acts as an override: when it and a page's frontmatter claim the
// same source, the explicit destination wins. Use it for the handful of cases a
// derived destination can't express, such as landing on an anchor.
//
// Usage: node scripts/build-redirects.js [--check] [--verbose]
//
// Options:
//   --check      Do not write; exit 1 if the file on disk is out of date (CI)
//   --verbose    List every source that triggered a warning
//   --site NAME  Build a single site (default: every site in SITES)

const { readFileSync, writeFileSync, existsSync, globSync } = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");

// Sites with a generated redirects file. `root` is relative to the repo root;
// `output` and `explicit` are relative to `root`.
const SITES = {
  main: {
    root: "main",
    output: "config/redirects.json",
    explicit: "config/redirects-explicit.json",
    // Directories under `root` that never contain routable pages.
    ignore: ["node_modules", "snippets", "ui", ".mintlify"],
  },
};

// ---------------------------------------------------------------------------
// frontmatter
// ---------------------------------------------------------------------------

const FRONTMATTER_RE = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

function extractFrontmatter(text) {
  const match = FRONTMATTER_RE.exec(text);
  return match ? match[1] : null;
}

function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2) {
    const first = trimmed[0];
    if ((first === '"' || first === "'") && trimmed.endsWith(first)) {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

// Reads the `redirects:` key out of a frontmatter block. Supports the block
// sequence form this repo writes plus an inline flow list, so a hand-edited
// `redirects: ["/a", "/b"]` still round-trips. Returns null when the key is
// absent, so callers can tell "no redirects" from "empty list".
function parseRedirects(frontmatter) {
  const lines = frontmatter.split(/\r?\n/);
  const keyIndex = lines.findIndex((line) => /^redirects[ \t]*:/.test(line));
  if (keyIndex === -1) return null;

  const keyLine = lines[keyIndex];
  const inline = keyLine.slice(keyLine.indexOf(":") + 1).trim();

  if (inline.startsWith("[")) {
    const body = inline.replace(/^\[/, "").replace(/\][ \t]*$/, "");
    return body
      .split(",")
      .map(unquote)
      .filter((value) => value !== "");
  }
  if (inline !== "") return [unquote(inline)];

  const sources = [];
  for (let i = keyIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const item = /^[ \t]+-[ \t]*(.*)$/.exec(line);
    if (!item) break; // dedented to the next top-level key
    const value = unquote(item[1]);
    if (value !== "") sources.push(value);
  }
  return sources;
}

// ---------------------------------------------------------------------------
// paths
// ---------------------------------------------------------------------------

// Inverse of Mintlify's route resolution: a file path relative to the site root
// becomes the URL the page is served at.
function pageUrl(relativePath) {
  let route = relativePath.split(path.sep).join("/").replace(/\.mdx$/, "");
  if (route === "index") return "/";
  route = route.replace(/\/index$/, "");
  return `/${route}`;
}

function isPattern(source) {
  return source.includes("*") || /:[A-Za-z]/.test(source);
}

function segmentCount(source) {
  return source.split("/").filter(Boolean).length;
}

// Deterministic order so the generated file has no incidental churn. Literal
// sources sort ahead of patterns because Mintlify takes the first match, and a
// pattern like /docs/videos/* must not shadow a literal /docs/videos/some-page.
// Within the pattern group, deeper (more specific) sources come first.
function compareEntries(a, b) {
  const aPattern = isPattern(a.source);
  const bPattern = isPattern(b.source);
  if (aPattern !== bPattern) return aPattern ? 1 : -1;
  if (aPattern) {
    const depth = segmentCount(b.source) - segmentCount(a.source);
    if (depth !== 0) return depth;
  }
  if (a.source < b.source) return -1;
  if (a.source > b.source) return 1;
  return 0;
}

// ---------------------------------------------------------------------------
// build
// ---------------------------------------------------------------------------

function readExplicitRedirects(siteRoot, explicitPath, report) {
  if (!explicitPath) return [];
  const absolute = path.join(siteRoot, explicitPath);
  if (!existsSync(absolute)) {
    report.warn(`${explicitPath} not found — skipping explicit redirects`);
    return [];
  }

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(absolute, "utf8"));
  } catch (error) {
    report.error(`${explicitPath} is not valid JSON: ${error.message}`);
    return [];
  }
  if (!Array.isArray(parsed)) {
    report.error(`${explicitPath} must contain an array of redirects`);
    return [];
  }

  return parsed.filter((entry, index) => {
    const at = `${explicitPath}[${index}]`;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      report.error(`${at}: expected an object with "source" and "destination"`);
      return false;
    }
    if (typeof entry.source !== "string" || entry.source === "") {
      report.error(`${at}: missing "source"`);
      return false;
    }
    if (typeof entry.destination !== "string" || entry.destination === "") {
      report.error(`${at} (${entry.source}): missing "destination"`);
      return false;
    }
    return true;
  });
}

function collectFrontmatterRedirects(siteRoot, ignore, report) {
  const entries = [];
  const pages = new Set();
  const files = globSync("**/*.mdx", { cwd: siteRoot }).sort();

  for (const relativePath of files) {
    const [topLevel] = relativePath.split(path.sep);
    if (ignore.includes(topLevel)) continue;

    const destination = pageUrl(relativePath);
    pages.add(destination);

    const frontmatter = extractFrontmatter(
      readFileSync(path.join(siteRoot, relativePath), "utf8")
    );
    if (frontmatter === null) continue;

    const sources = parseRedirects(frontmatter);
    if (sources === null) continue;
    if (sources.length === 0) {
      report.warn(`${relativePath}: empty "redirects:" frontmatter`);
      continue;
    }

    for (const source of sources) {
      if (!source.startsWith("/")) {
        report.error(
          `${relativePath}: redirect source "${source}" must start with "/"`
        );
        continue;
      }
      entries.push({ source, destination, file: relativePath });
    }
  }

  return { entries, pages };
}

function buildSite(name, config, report) {
  const siteRoot = path.resolve(REPO_ROOT, config.root);
  const { entries, pages } = collectFrontmatterRedirects(
    siteRoot,
    config.ignore ?? [],
    report
  );
  const explicit = readExplicitRedirects(siteRoot, config.explicit, report).map(
    (entry) => ({
      source: entry.source,
      destination: entry.destination,
      file: config.explicit,
    })
  );

  // Explicit entries are seeded first so they win any collision with a page's
  // frontmatter. Two pages claiming the same source is an authoring mistake.
  const bySource = new Map();
  for (const entry of explicit) {
    const existing = bySource.get(entry.source);
    if (existing) {
      report.error(`${entry.file}: duplicate source "${entry.source}"`);
      continue;
    }
    bySource.set(entry.source, entry);
  }

  for (const entry of entries) {
    const existing = bySource.get(entry.source);
    if (!existing) {
      bySource.set(entry.source, entry);
      continue;
    }
    if (existing.file === config.explicit) {
      report.warn(
        `${entry.file}: redirect "${entry.source}" is overridden by ` +
          `${config.explicit} (-> ${existing.destination})`
      );
    } else if (existing.destination === entry.destination) {
      report.warn(
        `duplicate redirect "${entry.source}" in ${existing.file} and ${entry.file}`
      );
    } else {
      report.error(
        `conflicting redirect "${entry.source}": ${existing.file} sends it to ` +
          `${existing.destination}, ${entry.file} sends it to ${entry.destination}`
      );
    }
  }

  for (const entry of bySource.values()) {
    if (entry.source === entry.destination) {
      report.error(`${entry.file}: redirect "${entry.source}" points at itself`);
    } else if (!isPattern(entry.source) && pages.has(entry.source)) {
      // A page exists at this path, so the page wins and the redirect is dead.
      report.warn(
        `${entry.file}: redirect source "${entry.source}" is also a real page`
      );
    }
  }

  const redirects = [...bySource.values()]
    .sort(compareEntries)
    .map(({ source, destination }) => ({ source, destination }));

  return {
    name,
    output: path.join(siteRoot, config.output),
    outputLabel: path.join(config.root, config.output),
    contents: `${JSON.stringify(redirects, null, 2)}\n`,
    fromFrontmatter: entries.length,
    fromExplicit: explicit.length,
    total: redirects.length,
  };
}

// ---------------------------------------------------------------------------
// cli
// ---------------------------------------------------------------------------

function createReport() {
  const errors = [];
  const warnings = [];
  return {
    errors,
    warnings,
    error: (message) => errors.push(message),
    warn: (message) => warnings.push(message),
  };
}

function main() {
  const argv = process.argv.slice(2);
  const check = argv.includes("--check");
  const verbose = argv.includes("--verbose");
  const siteFlag = argv.indexOf("--site");
  const siteNames =
    siteFlag === -1 ? Object.keys(SITES) : [argv[siteFlag + 1]].filter(Boolean);

  let failed = false;

  for (const name of siteNames) {
    const config = SITES[name];
    if (!config) {
      console.error(
        `Unknown site "${name}". Known sites: ${Object.keys(SITES).join(", ")}`
      );
      process.exitCode = 1;
      return;
    }

    const report = createReport();
    const result = buildSite(name, config, report);

    console.log(
      `${result.outputLabel}: ${result.total} redirects ` +
        `(${result.fromFrontmatter} from frontmatter, ${result.fromExplicit} explicit)`
    );

    if (report.warnings.length > 0) {
      console.log(`  ${report.warnings.length} warning(s)`);
      const shown = verbose ? report.warnings : report.warnings.slice(0, 10);
      for (const warning of shown) console.log(`    warn: ${warning}`);
      if (shown.length < report.warnings.length) {
        console.log(
          `    ... ${report.warnings.length - shown.length} more (--verbose)`
        );
      }
    }

    for (const error of report.errors) console.error(`    error: ${error}`);
    if (report.errors.length > 0) {
      failed = true;
      console.error(
        `  ${report.errors.length} error(s) — ${result.outputLabel} not written`
      );
      continue;
    }

    const current = existsSync(result.output)
      ? readFileSync(result.output, "utf8")
      : null;

    if (current === result.contents) {
      console.log(`  up to date`);
      continue;
    }

    if (check) {
      failed = true;
      console.error(
        `  out of date — run "node scripts/build-redirects.js" and commit the result`
      );
      continue;
    }

    writeFileSync(result.output, result.contents);
    console.log(`  wrote ${result.outputLabel}`);
  }

  if (failed) process.exitCode = 1;
}

if (require.main === module) main();

module.exports = {
  SITES,
  buildSite,
  compareEntries,
  createReport,
  extractFrontmatter,
  isPattern,
  pageUrl,
  parseRedirects,
};
