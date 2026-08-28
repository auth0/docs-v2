const test = require("node:test");
const assert = require("node:assert");
const { mkdtempSync, mkdirSync, writeFileSync, readFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");

const {
  buildSite,
  compareEntries,
  createReport,
  extractFrontmatter,
  isPattern,
  pageUrl,
  parseRedirects,
} = require("./build-redirects.js");

test("pageUrl maps a file path to the route Mintlify serves", () => {
  assert.equal(pageUrl("docs/api.mdx"), "/docs/api");
  assert.equal(pageUrl("docs/index.mdx"), "/docs");
  assert.equal(pageUrl("docs/ja-jp/api/authentication.mdx"), "/docs/ja-jp/api/authentication");
  assert.equal(pageUrl("index.mdx"), "/");
});

test("extractFrontmatter returns the block, or null when there is none", () => {
  assert.equal(extractFrontmatter("---\ntitle: A\n---\n\nbody"), "title: A");
  assert.equal(extractFrontmatter("# Just a heading\n"), null);
});

test("parseRedirects reads a block sequence and stops at the next key", () => {
  assert.deepEqual(
    parseRedirects('title: A\nredirects:\n  - "/one"\n  - /two\ndescription: B'),
    ["/one", "/two"]
  );
});

test("parseRedirects reads an inline flow list", () => {
  assert.deepEqual(parseRedirects('redirects: ["/one", "/two"]'), ["/one", "/two"]);
});

test("parseRedirects distinguishes an absent key from an empty list", () => {
  assert.equal(parseRedirects("title: A"), null);
  assert.deepEqual(parseRedirects("redirects:\ntitle: A"), []);
});

test("compareEntries sorts literal sources ahead of patterns", () => {
  const sorted = [
    { source: "/docs/videos/*" },
    { source: "/docs/zebra" },
    { source: "/docs/a/:path*" },
    { source: "/docs/alpha" },
  ].sort(compareEntries);
  assert.deepEqual(sorted.map((e) => e.source), [
    "/docs/alpha",
    "/docs/zebra",
    "/docs/a/:path*",
    "/docs/videos/*",
  ]);
});

test("compareEntries sorts deeper patterns ahead of shallower ones", () => {
  const sorted = [{ source: "/docs/*" }, { source: "/docs/a/b/*" }, { source: "/docs/a/*" }].sort(
    compareEntries
  );
  assert.deepEqual(sorted.map((e) => e.source), ["/docs/a/b/*", "/docs/a/*", "/docs/*"]);
});

test("isPattern recognizes globs and path parameters", () => {
  assert.equal(isPattern("/docs/videos/*"), true);
  assert.equal(isPattern("/docs/a/:path*"), true);
  assert.equal(isPattern("/docs/a/b"), false);
});

function fixture(files) {
  const root = mkdtempSync(path.join(tmpdir(), "build-redirects-"));
  for (const [relative, contents] of Object.entries(files)) {
    const absolute = path.join(root, relative);
    mkdirSync(path.dirname(absolute), { recursive: true });
    writeFileSync(absolute, contents);
  }
  return root;
}

function build(files, { explicit = null } = {}) {
  const root = fixture(files);
  if (explicit) {
    mkdirSync(path.join(root, "config"), { recursive: true });
    writeFileSync(
      path.join(root, "config/redirects-explicit.json"),
      JSON.stringify(explicit, null, 2)
    );
  }
  const report = createReport();
  const result = buildSite(
    "fixture",
    {
      root,
      output: "config/redirects.json",
      explicit: explicit ? "config/redirects-explicit.json" : null,
      ignore: ["snippets"],
    },
    report
  );
  return { report, result, redirects: JSON.parse(result.contents) };
}

test("buildSite derives destinations from frontmatter and page location", () => {
  const { report, redirects } = build({
    "docs/api.mdx": '---\ntitle: API\nredirects:\n  - "/docs/api/info"\n---\n\nbody\n',
    "docs/guides/index.mdx": '---\nredirects:\n  - "/docs/guides/old"\n---\n',
    "docs/plain.mdx": "---\ntitle: No redirects\n---\n",
    "snippets/ignored.mdx": '---\nredirects:\n  - "/docs/nope"\n---\n',
  });
  assert.deepEqual(report.errors, []);
  assert.deepEqual(redirects, [
    { source: "/docs/api/info", destination: "/docs/api" },
    { source: "/docs/guides/old", destination: "/docs/guides" },
  ]);
});

test("buildSite merges the explicit file and lets it override frontmatter", () => {
  const { report, redirects } = build(
    {
      "docs/search.mdx": '---\nredirects:\n  - "/docs/find"\n  - "/docs/anchored"\n---\n',
    },
    {
      explicit: [
        { source: "/docs/external", destination: "https://example.com/thing" },
        { source: "/docs/anchored", destination: "/docs/search#section" },
      ],
    }
  );
  assert.deepEqual(report.errors, []);
  assert.deepEqual(redirects, [
    { source: "/docs/anchored", destination: "/docs/search#section" },
    { source: "/docs/external", destination: "https://example.com/thing" },
    { source: "/docs/find", destination: "/docs/search" },
  ]);
  assert.match(report.warnings.join("\n"), /overridden by config\/redirects-explicit\.json/);
});

test("buildSite errors when two pages claim the same source", () => {
  const { report } = build({
    "docs/a.mdx": '---\nredirects:\n  - "/docs/shared"\n---\n',
    "docs/b.mdx": '---\nredirects:\n  - "/docs/shared"\n---\n',
  });
  assert.equal(report.errors.length, 1);
  assert.match(report.errors[0], /conflicting redirect "\/docs\/shared"/);
});

test("buildSite errors on a source without a leading slash or pointing at itself", () => {
  const { report, redirects } = build({
    "docs/a.mdx": '---\nredirects:\n  - "docs/no-slash"\n---\n',
    "docs/b.mdx": '---\nredirects:\n  - "/docs/b"\n---\n',
  });
  assert.equal(redirects.length, 1);
  assert.equal(report.errors.length, 2);
  assert.match(report.errors.join("\n"), /must start with "\/"/);
  assert.match(report.errors.join("\n"), /points at itself/);
});

test("buildSite warns when a redirect source is also a real page", () => {
  const { report } = build({
    "docs/new.mdx": '---\nredirects:\n  - "/docs/old"\n---\n',
    "docs/old.mdx": "---\ntitle: Still here\n---\n",
  });
  assert.deepEqual(report.errors, []);
  assert.match(report.warnings.join("\n"), /"\/docs\/old" is also a real page/);
});

test("the committed main/config/redirects.json is up to date", () => {
  const { SITES } = require("./build-redirects.js");
  const report = createReport();
  const result = buildSite("main", SITES.main, report);
  assert.deepEqual(report.errors, []);
  assert.equal(
    readFileSync(result.output, "utf8"),
    result.contents,
    "run `node scripts/build-redirects.js` and commit the result"
  );
});
