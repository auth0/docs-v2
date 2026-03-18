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
  // Find translation files that have no corresponding English source
  const orphaned = Object.fromEntries(locales.map((l) => [l, 0]));

  for (const locale of locales) {
    const translationFiles = globSync("**/*.mdx", {
      cwd: path.join(DOCS_DIR, locale),
    });

    for (const rel of translationFiles.sort()) {
      if (isExcluded(rel)) continue;
      if (!sourceSet.has(rel)) {
        console.log(`ORPHANED [${locale}]  ${rel}`);
        orphaned[locale]++;
      }
    }
  }

  console.log("\n--- Summary ---");
  for (const locale of locales) {
    console.log(`\n[${locale}]`);
    console.log(`  Orphaned translations: ${orphaned[locale]}`);
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
