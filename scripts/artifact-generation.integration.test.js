const { describe, it } = require("node:test");
const assert = require("node:assert");
const { main } = require("./artifact-generation.js");
const fs = require("node:fs/promises");
const path = require("node:path");

describe("main integration tests", () => {
  it("should create new API dropdown when docs.json has empty dropdowns", async (t) => {
    // Load fixture data
    const docsEmptyFixture = require("./fixtures/docs-empty.json");
    const testApiOasFixture = require("./fixtures/test-api-oas.json");

    let capturedDocsJson = null;
    let capturedOasData = null;
    const writtenMdxFiles = [];
    const createdDirectories = [];

    // Mock fs.readFile to return fixtures based on path
    const mockReadFile = t.mock.method(
      fs,
      "readFile",
      async (filePath, options) => {
        if (filePath.includes("docs.json")) {
          return JSON.stringify(docsEmptyFixture);
        }
        if (filePath.includes("myaccount-api-oas.json") || filePath.includes("openapi-dereferenced.json")) {
          return JSON.stringify(testApiOasFixture);
        }
        throw new Error(`Unexpected file read: ${filePath}`);
      },
    );

    // Mock fs.writeFile to capture writes
    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (filePath, content) => {
        if (filePath.includes("docs.json")) {
          capturedDocsJson = JSON.parse(content);
        } else if (filePath.endsWith("myaccount-api-oas.json")) {
          capturedOasData = JSON.parse(content);
        } else if (filePath.endsWith(".mdx")) {
          writtenMdxFiles.push({ path: filePath, content });
        }
      },
    );

    // Mock fs.mkdir to prevent directory creation
    const mockMkdir = t.mock.method(fs, "mkdir", async (dirPath, options) => {
      createdDirectories.push(dirPath);
    });

    // Mock generateCodeBlocks to skip actual snippet generation
    const mockGenerateCodeBlocks = t.mock.method(
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => ({
        lang: language,
        label: spec.summary,
        source: `// ${language} code for ${method} ${path}`,
      }),
    );

    // Run main function
    await main();

    // Verify docs.json was created with new MyAccount API dropdown
    assert.ok(capturedDocsJson, "docs.json should be written");
    assert.strictEqual(
      capturedDocsJson.navigation.languages[0].tabs[0].dropdowns.length,
      1,
      "Should have 1 dropdown in en locale",
    );
    assert.strictEqual(
      capturedDocsJson.navigation.languages[0].tabs[0].dropdowns[0].dropdown,
      "MyAccount API",
      "Dropdown should be named MyAccount API",
    );

    // Verify all locales have the dropdown
    for (let i = 0; i < 3; i++) {
      const locale = capturedDocsJson.navigation.languages[i];
      assert.ok(
        locale.tabs[0].dropdowns.length > 0,
        `Locale ${locale.language} should have dropdown`,
      );
    }

    // Verify that x-displayName from tags is used for group names
    const enPages = capturedDocsJson.navigation.languages[0].tabs[0].dropdowns[0].pages;
    const groupStructure = enPages.find(item => item.group === " ");
    assert.ok(groupStructure, "Should have group structure");
    const groups = groupStructure.pages.map(p => p.group);
    assert.ok(
      groups.includes("Test Resources"),
      "Should use 'Test Resources' from x-displayName in tags",
    );

    // Verify OAS data was written
    assert.ok(capturedOasData, "OAS data should be written");
    assert.ok(
      capturedOasData.paths["/test-resources"].get["x-codeSamples"],
      "Should have code samples for /test-resources GET",
    );
    assert.ok(
      capturedOasData.paths["/test-resources"].get["x-codeSamples"].length > 0,
      "Should have at least one code sample",
    );

    // Verify MDX files were created
    assert.ok(
      writtenMdxFiles.length > 0,
      "Should have written at least one MDX file",
    );

    // Verify MDX files reference correct locale-specific OAS filenames
    const enMdxFiles = writtenMdxFiles.filter(f => f.path.includes("main/docs/api/"));
    const frMdxFiles = writtenMdxFiles.filter(f => f.path.includes("main/docs/fr-ca/api/"));
    const jpMdxFiles = writtenMdxFiles.filter(f => f.path.includes("main/docs/ja-jp/api/"));

    assert.ok(
      enMdxFiles.some(f => f.content.includes("openapi: myaccount-api-oas.json")),
      "English MDX files should reference myaccount-api-oas.json",
    );
    assert.ok(
      frMdxFiles.some(f => f.content.includes("openapi: myaccount-api-oas.fr-ca.json")),
      "French-CA MDX files should reference myaccount-api-oas.fr-ca.json",
    );
    assert.ok(
      jpMdxFiles.some(f => f.content.includes("openapi: myaccount-api-oas.ja-jp.json")),
      "Japanese MDX files should reference myaccount-api-oas.ja-jp.json",
    );

    // Verify directories were created
    assert.ok(
      createdDirectories.length > 0,
      "Should have created at least one directory",
    );
  });

  it("should update existing API dropdown when docs.json has matching API", async (t) => {
    // Load fixture data
    const docsWithMatchingApiFixture = require("./fixtures/docs-with-matching-api.json");
    const testApiOasFixture = require("./fixtures/test-api-oas.json");

    let capturedDocsJson = null;
    let capturedOasData = null;

    // Mock fs.readFile to return fixtures based on path
    const mockReadFile = t.mock.method(
      fs,
      "readFile",
      async (filePath, options) => {
        if (filePath.includes("docs.json")) {
          return JSON.stringify(docsWithMatchingApiFixture);
        }
        if (filePath.includes("myaccount-api-oas.json") || filePath.includes("openapi-dereferenced.json")) {
          return JSON.stringify(testApiOasFixture);
        }
        throw new Error(`Unexpected file read: ${filePath}`);
      },
    );

    // Mock fs.writeFile
    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (filePath, content) => {
        if (filePath.includes("docs.json")) {
          capturedDocsJson = JSON.parse(content);
        } else if (filePath.endsWith("myaccount-api-oas.json")) {
          capturedOasData = JSON.parse(content);
        }
      },
    );

    // Mock fs.mkdir
    const mockMkdir = t.mock.method(fs, "mkdir", async (dirPath, options) => {});

    // Mock generateCodeBlocks
    const mockGenerateCodeBlocks = t.mock.method(
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => ({
        lang: language,
        label: spec.summary,
        source: `// ${language} code`,
      }),
    );

    // Run main function
    await main();

    // Verify docs.json still has Test API but pages are updated
    assert.ok(capturedDocsJson, "docs.json should be written");
    const enDropdown =
      capturedDocsJson.navigation.languages[0].tabs[0].dropdowns[0];
    assert.strictEqual(
      enDropdown.dropdown,
      "MyAccount API",
      "Should still have MyAccount API dropdown",
    );
    assert.ok(
      Array.isArray(enDropdown.pages),
      "Pages should be an array",
    );
    assert.ok(enDropdown.pages.length > 0, "Should have pages");

    // Verify the pages were replaced (should have test-resources, not users)
    const pagesStructure = JSON.stringify(enDropdown.pages);
    assert.ok(
      pagesStructure.includes("test-resources"),
      "Should include test-resources from test API",
    );

    // Verify that x-displayName from tags is used
    const groupStructure = enDropdown.pages.find(item => item.group === " ");
    if (groupStructure) {
      const groups = groupStructure.pages.map(p => p.group);
      assert.ok(
        groups.includes("Test Resources"),
        "Should use 'Test Resources' from x-displayName in tags",
      );
    }

    // Verify OAS data was written
    assert.ok(capturedOasData, "OAS data should be written");
    assert.ok(
      capturedOasData.paths["/test-resources"].get["x-codeSamples"],
      "Should have code samples for /test-resources GET",
    );
    assert.ok(
      capturedOasData.paths["/test-resources"].get["x-codeSamples"].length > 0,
      "Should have at least one code sample",
    );
  });

  it("should append new API dropdown when docs.json has other APIs", async (t) => {
    // Load fixture data
    const docsWithOtherApisFixture = require("./fixtures/docs-with-other-apis.json");
    const testApiOasFixture = require("./fixtures/test-api-oas.json");

    let capturedDocsJson = null;
    let capturedOasData = null;

    // Mock fs.readFile to return fixtures based on path
    const mockReadFile = t.mock.method(
      fs,
      "readFile",
      async (filePath, options) => {
        if (filePath.includes("docs.json")) {
          return JSON.stringify(docsWithOtherApisFixture);
        }
        if (filePath.includes("myaccount-api-oas.json") || filePath.includes("openapi-dereferenced.json")) {
          return JSON.stringify(testApiOasFixture);
        }
        throw new Error(`Unexpected file read: ${filePath}`);
      },
    );

    // Mock fs.writeFile
    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (filePath, content) => {
        if (filePath.includes("docs.json")) {
          capturedDocsJson = JSON.parse(content);
        } else if (filePath.endsWith("myaccount-api-oas.json")) {
          capturedOasData = JSON.parse(content);
        }
      },
    );

    // Mock fs.mkdir
    const mockMkdir = t.mock.method(fs, "mkdir", async (dirPath, options) => {});

    // Mock generateCodeBlocks
    const mockGenerateCodeBlocks = t.mock.method(
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => ({
        lang: language,
        label: spec.summary,
        source: `// ${language} code`,
      }),
    );

    // Run main function
    await main();

    // Verify docs.json has 3 dropdowns now (Management, Authentication, MyAccount)
    assert.ok(capturedDocsJson, "docs.json should be written");
    const enDropdowns = capturedDocsJson.navigation.languages[0].tabs[0].dropdowns;
    assert.strictEqual(
      enDropdowns.length,
      3,
      "Should have 3 dropdowns after append",
    );

    // Verify Management API and Authentication API are still present
    const dropdownNames = enDropdowns.map((d) => d.dropdown);
    assert.ok(
      dropdownNames.includes("Management API"),
      "Should still have Management API",
    );
    assert.ok(
      dropdownNames.includes("Authentication API"),
      "Should still have Authentication API",
    );
    assert.ok(
      dropdownNames.includes("MyAccount API"),
      "Should have new MyAccount API",
    );

    // Verify the new dropdown is at the end
    assert.strictEqual(
      enDropdowns[2].dropdown,
      "MyAccount API",
      "New dropdown should be appended at the end",
    );

    // Verify that x-displayName from tags is used in the new dropdown
    const newDropdown = enDropdowns[2];
    const groupStructure = newDropdown.pages.find(item => item.group === " ");
    if (groupStructure) {
      const groups = groupStructure.pages.map(p => p.group);
      assert.ok(
        groups.includes("Test Resources"),
        "Should use 'Test Resources' from x-displayName in tags",
      );
    }

    // Verify OAS data was written
    assert.ok(capturedOasData, "OAS data should be written");
    assert.ok(
      capturedOasData.paths["/test-resources"].get["x-codeSamples"],
      "Should have code samples for /test-resources GET",
    );
    assert.ok(
      capturedOasData.paths["/test-resources"].get["x-codeSamples"].length > 0,
      "Should have at least one code sample",
    );
  });
});
