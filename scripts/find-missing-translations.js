// Finds MDX files in main/docs/ that are missing a translation in fr-ca or ja-jp,
// or translation files that have no corresponding English source (orphans).
//
// Usage: node scripts/find-missing-translations.js [--locale fr-ca|ja-jp] [--orphaned]
//
// Options:
//   --locale <locale>   Only check the specified locale (default: check all)
//   --orphaned          Find translation files with no English source instead

const { existsSync, readFileSync, globSync } = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// ---------------------------------------------------------------------------
// Derive configuration from .tx/sync.yaml
// ---------------------------------------------------------------------------

const REPO_ROOT = path.resolve(__dirname, "..");
const txConfig = yaml.load(
  readFileSync(path.join(REPO_ROOT, ".tx/sync.yaml"), "utf8")
);
const filter = txConfig.filters[0];

// DOCS_DIR: base path extracted from source_files_expression before the first placeholder
const sourceBase = filter.source_files_expression.split("<")[0].replace(/\/+$/, "");
const DOCS_DIR = path.join(REPO_ROOT, sourceBase);

// LOCALES: directory names from the values of language_mapping
const LOCALES = Object.values(txConfig.settings.language_mapping);

// EXCLUDED_PATHS: ignore_dirs entries that are not locale root dirs,
// expressed relative to DOCS_DIR to match the paths used in the checks
const localeDirSet = new Set(LOCALES.map((l) => `${sourceBase}/${l}`));
const EXCLUDED_PATHS = (filter.ignore_dirs ?? [])
  .filter((d) => !localeDirSet.has(d))
  .map((d) =>
    d.startsWith(sourceBase + "/") ? d.slice(sourceBase.length + 1) : d
  );

const isExcluded = (rel) =>
  EXCLUDED_PATHS.some((p) => rel === p || rel.startsWith(p + "/"));

const args = process.argv.slice(2);
const localeFlag = args.indexOf("--locale");
const locales = localeFlag !== -1 ? [args[localeFlag + 1]] : LOCALES;
const orphanedMode = args.includes("--orphaned");

const sourceFiles = globSync("**/*.mdx", { cwd: DOCS_DIR }).filter(
  (rel) =>
    !LOCALES.some((locale) => rel.startsWith(locale + "/")) &&
    !isExcluded(rel)
);
const sourceSet = new Set(sourceFiles);

if (orphanedMode) {
  // Build a redirect lookup from docs.json:
  //   relative source path (no .mdx) → relative destination path (no .mdx)
  // Redirect URLs use the format "/docs/some/path" (sometimes without leading slash).
  const urlPrefix = "/" + sourceBase.split("/").pop() + "/"; // e.g. "/docs/"

  const urlToRel = (url) => {
    const normalized = url.startsWith("/") ? url : "/" + url;
    if (!normalized.startsWith(urlPrefix)) return null;
    return normalized.slice(urlPrefix.length) + ".mdx";
  };

  const docsJson = JSON.parse(
    readFileSync(path.join(REPO_ROOT, sourceBase, "../docs.json"), "utf8")
  );
  const redirectMap = new Map();
  for (const { source, destination } of docsJson.redirects ?? []) {
    const srcRel = urlToRel(source);
    const dstRel = urlToRel(destination);
    if (srcRel && dstRel) redirectMap.set(srcRel, dstRel);
  }

  // Find translation files that have no corresponding English source
  const counts = Object.fromEntries(
    locales.map((l) => [l, { movable: 0, conflict: 0, stale: 0 }])
  );

  for (const locale of locales) {
    const translationFiles = globSync("**/*.mdx", {
      cwd: path.join(DOCS_DIR, locale),
    });

    for (const rel of translationFiles.sort()) {
      if (isExcluded(rel)) continue;
      if (sourceSet.has(rel)) continue;

      const newRel = redirectMap.get(rel);
      if (newRel && existsSync(path.join(DOCS_DIR, newRel))) {
        const translationExists = existsSync(
          path.join(DOCS_DIR, locale, newRel)
        );
        if (translationExists) {
          console.log(`CONFLICT [${locale}]  ${rel}  →  ${newRel}`);
          counts[locale].conflict++;
        } else {
          console.log(`MOVABLE  [${locale}]  ${rel}  →  ${newRel}`);
          counts[locale].movable++;
        }
      } else {
        console.log(`STALE    [${locale}]  ${rel}`);
        counts[locale].stale++;
      }
    }
  }

  console.log("\n--- Summary ---");
  for (const locale of locales) {
    const { movable, conflict, stale } = counts[locale];
    const total = movable + conflict + stale;
    console.log(`\n[${locale}]`);
    console.log(`  Total orphaned:  ${total}`);
    console.log(`  MOVABLE:         ${movable}  (can be moved to new location)`);
    console.log(`  CONFLICT:        ${conflict}  (redirect exists but translation already at target)`);
    console.log(`  STALE:           ${stale}  (no matching redirect)`);
  }
} else {
  // Find English source files that are missing a translation
  const missing = Object.fromEntries(locales.map((l) => [l, 0]));
  const existing = Object.fromEntries(locales.map((l) => [l, 0]));

  for (const rel of sourceFiles.sort()) {
    for (const locale of locales) {
      const translated = path.join(DOCS_DIR, locale, rel);
      if (existsSync(translated)) {
        existing[locale]++;
      } else {
        console.log(`MISSING [${locale}]  ${rel}`);
        missing[locale]++;
      }
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Total English documents: ${sourceFiles.length}`);
  for (const locale of locales) {
    console.log(`\n[${locale}]`);
    console.log(`  Existing translations: ${existing[locale]}`);
    console.log(`  Missing translations:  ${missing[locale]}`);
  }
}
