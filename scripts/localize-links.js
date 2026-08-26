// Localizes internal documentation links in translated MDX files
//
// This script automatically rewrites links in translated documentation to point
// to translated versions when they exist. It detects multiple link formats:
//
// 1. Markdown links:      [text](/docs/path) → [text](/docs/ja-jp/path)
// 2. Relative links:      [text](../guide) → [text](../ja-jp/guide)
// 3. href attributes:     href="/docs/path" → href="/docs/ja-jp/path"
// 4. Quoted doc URLs:     url: "/docs/path" → url: "/docs/ja-jp/path"
// 5. Full URLs:           "https://auth0.com/docs/path" → "https://auth0.com/docs/ja-jp/path"
//
// Usage: node scripts/localize-links.js [--fix] [--verbose]
//
// Options:
//   --fix        Apply changes to files (default is dry run)
//   --verbose    Show detailed processing information

const { readFileSync, writeFileSync, existsSync, globSync, link } = require("fs");
const path = require("path");

// Configuration
const DOC_ROOT = "main/docs";
const LANGUAGES = ["fr-ca", "ja-jp"];

// Parse command line arguments
const args = process.argv.slice(2);
const shouldFix = args.includes("--fix");
const isVerbose = args.includes("--verbose");

// Statistics
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  linksRewritten: 0,
  linksUnchanged: 0,
};

// Regular expressions for different link patterns

// 1. Standard markdown links: [text](url) or [text](url "title")
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+?)(?:\s+"[^"]*")?\)/g;

// 2. href attributes in JSX/HTML with double quotes: href="/docs/path"
const HREF_DOUBLE_QUOTE_REGEX = /href="([^"]+)"/g;

// 3. href attributes in JSX/HTML with single quotes: href='/docs/path'
const HREF_SINGLE_QUOTE_REGEX = /href='([^']+)'/g;

// 4. Quoted doc URLs (for strings in code): "https://auth0.com/docs/path" or "/docs/path"
// This is more conservative to avoid false positives
const QUOTED_URL_REGEX = /"((?:https?:\/\/auth0\.com)?\/docs\/[^"]+)"/g;

/**
 * Resolves a link path relative to the current file
 * @param {string} currentFilePath - Path to the file containing the link
 * @param {string} linkHref - The href attribute from the link
 * @returns {string|null} - Resolved absolute path or null if external/anchor
 */
function resolveLinkPath(currentFilePath, linkHref) {
  // Skip external links
  if (linkHref.startsWith("http://") || linkHref.startsWith("https://")) {
    return null;
  }

  // Skip anchors, mailto, and other protocols
  if (linkHref.startsWith("#") || linkHref.includes(":")) {
    return null;
  }

  // Remove anchor fragments
  const hrefWithoutAnchor = linkHref.split("#")[0];
  if (!hrefWithoutAnchor) {
    return null; // Pure anchor link
  }

  const currentDir = path.dirname(currentFilePath);

  // Handle absolute paths from doc root (e.g., /docs/path or /path)
  if (hrefWithoutAnchor.startsWith("/")) {
    // Convert absolute path to relative from DOC_ROOT
    const pathWithoutLeadingSlash = hrefWithoutAnchor.substring(1);

    // Handle both /docs/path and /path formats
    if (pathWithoutLeadingSlash.startsWith("docs/")) {
      return path.join(DOC_ROOT, pathWithoutLeadingSlash.substring(5));
    } else {
      return path.join(DOC_ROOT, pathWithoutLeadingSlash);
    }
  }

  // Handle relative paths
  return path.normalize(path.join(currentDir, hrefWithoutAnchor));
}

/**
 * Gets the language code from a file path
 * @param {string} filePath - Path to the file
 * @returns {string|null} - Language code (e.g., 'ja-jp') or null if not localized
 */
function getLanguageFromPath(filePath) {
  for (const lang of LANGUAGES) {
    if (filePath.includes(`/${lang}/`)) {
      return lang;
    }
  }
  return null;
}

/**
 * Checks if a translated version of a file exists
 * @param {string} targetPath - Resolved path to the target file
 * @param {string} language - Target language code
 * @returns {boolean} - True if translated version exists
 */
function translatedFileExists(targetPath, language) {
  // Remove .mdx extension if present
  const pathWithoutExt = targetPath.replace(/\.mdx?$/, "");

  // Build the localized path by inserting language after DOC_ROOT
  const relativePath = path.relative(DOC_ROOT, pathWithoutExt);
  const localizedPath = path.join(DOC_ROOT, language, relativePath);

  // Check both .mdx and .md extensions
  
  return existsSync(`${localizedPath}.mdx`) || existsSync(`${localizedPath}.md`);
}

/**
 * Rewrites a link to point to the localized version
 * @param {string} originalHref - Original link href
 * @param {string} resolvedPath - Resolved absolute path
 * @param {string} language - Target language code
 * @returns {string} - Rewritten href
 */
function rewriteLink(originalHref, resolvedPath, language) {
  const hasAnchor = originalHref.includes("#");
  const anchor = hasAnchor ? originalHref.substring(originalHref.indexOf("#")) : "";

  // Determine if original was absolute or relative
  const isAbsolutePath = originalHref.startsWith("/");

  if (isAbsolutePath) {
    // For absolute paths, insert language after /docs/
    let newHref = originalHref.split("#")[0];

    if (newHref.startsWith("/docs/")) {
      newHref = `/docs/${language}${newHref.substring(5)}`;
    } else {
      newHref = `/${language}${newHref}`;
    }

    return newHref + anchor;
  } else {
    // For relative paths, insert ../language/ or adjust existing path
    const parts = originalHref.split("#")[0].split("/");

    // Count leading ../
    let upLevels = 0;
    while (parts[upLevels] === "..") {
      upLevels++;
    }

    // Insert language at appropriate level
    const remaining = parts.slice(upLevels);
    const newParts = [...parts.slice(0, upLevels), language, ...remaining];

    return newParts.join("/") + anchor;
  }
}

/**
 * Process a link and determine if it should be rewritten
 * @param {string} linkHref - The link href to process
 * @param {string} filePath - Path to the file containing the link
 * @param {string} language - Target language code
 * @returns {string|null} - New href if should be rewritten, null otherwise
 */
function processLink(linkHref, filePath, language) {
  stats.linksUnchanged++; // Increment total links found

  // Resolve the link path
  const resolvedPath = resolveLinkPath(filePath, linkHref);

  if (!resolvedPath) {
    // External link or anchor, don't modify
    if (isVerbose) {
      logFileAction(filePath, `↷ Skipping external/anchor: ${linkHref}`)
    }
    return null;
  }

  // Check if this is already a localized path
  const currentLang = getLanguageFromPath(resolvedPath);
  if (currentLang) {
    // Already pointing to a localized file, don't change
    if (currentLang === language) {
      if (isVerbose) {
        logFileAction(filePath, `↷ Skipping localized link: ${linkHref}`);
      }
      return null;
    }
    logFileAction(filePath, `⚠️ Incorrect language mapping found, pointing to ${linkHref}. Not replaced automatically.`);
    return null;
  }

  // Check if translated version exists
  if (translatedFileExists(resolvedPath, language)) {
    const newHref = rewriteLink(linkHref, resolvedPath, language);
    stats.linksRewritten++;
    stats.linksUnchanged--; // Decrement since we're rewriting

    if (true || isVerbose) {
      logFileAction(filePath, `✓ Rewriting: ${linkHref} → ${newHref}`);
    }

    return newHref;
  }

  if (isVerbose) {
    logFileAction(filePath, `↷ No translation found: ${linkHref} at ${resolvedPath}`);
  }

  return null;
}

let lastFilePathLogged = null;
function logFilePath(filePath) {
  if (lastFilePathLogged !== filePath) {
    console.log(`\x1b[1m${filePath}\x1b[0m${shouldFix ? '' : ' [DRY RUN]'}`);
    lastFilePathLogged = filePath;
  }
}
function logFileAction(filePath, action) {
  logFilePath(filePath);
  console.log(` ⎿  ${action}`);
}

/**
 * Process a single MDX file and rewrite localized links
 * @param {string} filePath - Path to the MDX file to process
 * @returns {number} - Number of links rewritten
 */
function processFile(filePath) {
  const language = getLanguageFromPath(filePath);

  if (!language) {
    // Not a localized file, skip
    return 0;
  }

  let content = readFileSync(filePath, "utf-8");
  let linksRewritten = 0;
  let modified = false;
  // 1. Process markdown links: [text](url)
  content = content.replace(MARKDOWN_LINK_REGEX, (match, linkText, linkHref) => {
    const newHref = processLink(linkHref, filePath, language);
    if (newHref) {
      linksRewritten++;
      modified = true;
      return `[${linkText}](${newHref})`;
    }
    return match;
  });

  // 2. Process href attributes with double quotes: href="/docs/path"
  content = content.replace(HREF_DOUBLE_QUOTE_REGEX, (match, linkHref) => {
    const newHref = processLink(linkHref, filePath, language);
    if (newHref) {
      linksRewritten++;
      modified = true;
      return `href="${newHref}"`;
    }
    return match;
  });

  // 3. Process href attributes with single quotes: href='/docs/path'
  content = content.replace(HREF_SINGLE_QUOTE_REGEX, (match, linkHref) => {
    const newHref = processLink(linkHref, filePath, language);
    if (newHref) {
      linksRewritten++;
      modified = true;
      return `href='${newHref}'`;
    }
    return match;
  });

  // 4. Process quoted doc URLs: "/docs/path" or "https://auth0.com/docs/path"
  content = content.replace(QUOTED_URL_REGEX, (match, linkHref) => {
    // Remove domain if present for processing
    const cleanHref = linkHref.replace(/^https?:\/\/auth0\.com/, '');
    const newHref = processLink(cleanHref, filePath, language);
    if (newHref) {
      linksRewritten++;
      modified = true;
      // Preserve the original format (with or without domain)
      if (linkHref.startsWith('http')) {
        return `"https://auth0.com${newHref}"`;
      }
      return `"${newHref}"`;
    }
    return match;
  });

  // Write back to file if modified and fix flag is set
  if (modified) {
    stats.filesModified++;
    if (shouldFix) {
      writeFileSync(filePath, content, "utf-8");
    }
  }
  return linksRewritten;
}

/**
 * Main execution
 */
function main() {
  console.log("🔗 Localizing documentation links...\n");

  if (!shouldFix) {
    console.log("⚠️  DRY RUN MODE - No files will be modified.\n");
  }

  // Find all MDX files in localized directories
  const patterns = LANGUAGES.map(lang => `${DOC_ROOT}/${lang}/**/*.mdx`);
  const files = patterns.flatMap(pattern => globSync(pattern)).sort();

  if (files.length === 0) {
    console.log("❌ No localized MDX files found");
    process.exit(1);
  }

  console.log(`📄 Found ${files.length} localized files to process\n`);

  // Process each file
  for (const file of files) {
    stats.filesProcessed++;

    if (isVerbose) {
      logFilePath(file);
    }

    const linksRewritten = processFile(file);
    if (isVerbose) {
      logFileAction(file, `${linksRewritten} ${linksRewritten === 1 ? "link" : "links"} rewritten`)
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Summary:");
  console.log("=".repeat(60));
  console.log(`Files processed:     ${stats.filesProcessed}`);
  console.log(`Files modified:      ${stats.filesModified}`);
  console.log(`Links rewritten:     ${stats.linksRewritten}`);
  console.log(`Links unchanged:     ${stats.linksUnchanged}`);
  console.log("=".repeat(60));

  if (!shouldFix) {
    console.log("\n💡 Run with --fix to apply changes");
  } else if (stats.filesModified > 0) {
    console.log("\n✅ Link localization complete!");
  } else {
    console.log("\n✨ All links are already localized!");
  }
}

// Run the script
try {
  main();
} catch (error) {
  console.error("\n❌ Error:", error.message);
  if (isVerbose) {
    console.error(error.stack);
  }
  process.exit(1);
}
