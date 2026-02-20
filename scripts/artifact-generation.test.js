const { describe, it } = require("node:test");
const assert = require("node:assert");
const {
  readJson,
  getEndpointScopes,
  writeMdxContent,
  injectCodeSnippets,
  generateCodeBlocks,
  convertDocsToFormat,
  patchDocsJson,
  getOasFilePath,
} = require("./artifact-generation.js");
const fs = require("node:fs/promises");
const dedent = require("dedent");

describe("readJson", () => {
  it("should successfully read and parse valid JSON", async (t) => {
    const mockData = { name: "test", version: "1.0.0" };

    // Mock fs.readFile to return JSON string
    const mockReadFile = t.mock.method(fs, "readFile", async () =>
      JSON.stringify(mockData),
    );

    const result = await readJson("test.json");

    assert.deepStrictEqual(result, mockData);
    assert.strictEqual(mockReadFile.mock.callCount(), 1);
    assert.match(mockReadFile.mock.calls[0].arguments[0], /test\.json$/);
    assert.deepStrictEqual(mockReadFile.mock.calls[0].arguments[1], {
      encoding: "utf8",
    });
  });

  it("should return null when file read fails", async (t) => {
    // Mock console.error to suppress expected error output
    t.mock.method(console, "error", () => {});

    // Mock fs.readFile to throw an error
    const mockReadFile = t.mock.method(fs, "readFile", async () => {
      throw new Error("ENOENT: no such file or directory");
    });

    const result = await readJson("missing.json");

    assert.strictEqual(result, null);
    assert.strictEqual(mockReadFile.mock.callCount(), 1);
  });

  it("should return null when JSON parsing fails", async (t) => {
    // Mock console.error to suppress expected error output
    t.mock.method(console, "error", () => {});

    // Mock fs.readFile to return invalid JSON
    const mockReadFile = t.mock.method(
      fs,
      "readFile",
      async () => "invalid json {{",
    );

    const result = await readJson("invalid.json");

    assert.strictEqual(result, null);
    assert.strictEqual(mockReadFile.mock.callCount(), 1);
  });

  it("should resolve the path correctly", async (t) => {
    let capturedPath;

    // Mock fs.readFile and capture the path argument
    const mockReadFile = t.mock.method(fs, "readFile", async (filePath) => {
      capturedPath = filePath;
      return '{"test": true}';
    });

    await readJson("relative/path.json");

    assert.strictEqual(mockReadFile.mock.callCount(), 1);
    // The resolved path should be absolute
    assert.match(capturedPath, /^[/\\]/);
  });
});

describe("getEndpointScopes", () => {
  it("should extract scopes from operation with single security requirement", () => {
    const spec = {
      summary: "Get user details",
      operationId: "getUserDetails",
      tags: ["Users"],
      security: [
        {
          oAuth2ClientCredentials: ["read:users", "read:profiles"],
        },
      ],
      responses: {},
    };

    const result = getEndpointScopes(spec);

    assert.deepStrictEqual(result, ["read:users", "read:profiles"]);
  });

  it("should extract scopes from operation with multiple security requirements", () => {
    const spec = {
      summary: "Update user",
      operationId: "updateUser",
      tags: ["Users"],
      security: [
        {
          oAuth2ClientCredentials: ["write:users"],
        },
        {
          oAuth2ClientCredentials: ["update:profiles", "update:metadata"],
        },
      ],
      responses: {},
    };

    const result = getEndpointScopes(spec);

    assert.deepStrictEqual(result, [
      "write:users",
      "update:profiles",
      "update:metadata",
    ]);
  });

  it("should return empty array when operation has no security property", () => {
    const spec = {
      summary: "Public endpoint",
      operationId: "getPublicData",
      tags: ["Public"],
      responses: {},
    };

    const result = getEndpointScopes(spec);

    assert.deepStrictEqual(result, []);
  });

  it("should return empty array when operation has empty security array", () => {
    const spec = {
      summary: "Endpoint with empty security",
      operationId: "getEndpoint",
      tags: ["Test"],
      security: [],
      responses: {},
    };

    const result = getEndpointScopes(spec);

    assert.deepStrictEqual(result, []);
  });

  it("should handle security requirements with empty scope arrays", () => {
    const spec = {
      summary: "Endpoint with no scopes required",
      operationId: "getEndpoint",
      tags: ["Test"],
      security: [
        {
          oAuth2ClientCredentials: [],
        },
      ],
      responses: {},
    };

    const result = getEndpointScopes(spec);

    assert.deepStrictEqual(result, []);
  });
});

describe("writeMdxContent", () => {
  it("should generate correct MDX content format", async (t) => {
    let actualPath;
    let actualContent;

    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (path, content) => {
        actualPath = path;
        actualContent = content;
      },
    );

    const config = {
      frontMatter: {
        file: "myaccount-api-oas.json",
        method: "get",
        path: "/api/v2/users/{id}",
      },
      content: {
        releaseLifecycle: "generally-available",
        scopes: ["read:users", "read:profiles"],
      },
      docpath: "/tmp/docs/api",
      filename: "get-user-details",
    };

    const expectedPath = "/tmp/docs/api/get-user-details.mdx";
    const expectedContent = dedent`
      ---
      openapi: myaccount-api-oas.json get /api/v2/users/{id}
      ---

      import { ReleaseLifecycle } from "/snippets/ReleaseLifecycle.jsx";
      import { Scopes } from "/snippets/ApiScopes.jsx";

      <ReleaseLifecycle releaseLifecycle="generally-available" />
      <Scopes scopes={["read:users","read:profiles"]} />
    `;

    await writeMdxContent(config);

    assert.strictEqual(mockWriteFile.mock.callCount(), 1);
    assert.strictEqual(actualPath, expectedPath);
    assert.strictEqual(actualContent, expectedContent);
  });

  it("should call writeFile with correct path structure", async (t) => {
    let actualPath;

    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (path, content) => {
        actualPath = path;
      },
    );

    const config = {
      frontMatter: {
        file: "myaccount-api-oas.json",
        method: "post",
        path: "/api/v2/users",
      },
      content: {
        releaseLifecycle: "early-access",
        scopes: ["create:users"],
      },
      docpath: "/var/docs/myaccount/users",
      filename: "create-user",
    };

    const expectedPath = "/var/docs/myaccount/users/create-user.mdx";

    await writeMdxContent(config);

    assert.strictEqual(mockWriteFile.mock.callCount(), 1);
    assert.strictEqual(actualPath, expectedPath);
  });

  it("should format scopes array correctly in MDX", async (t) => {
    let actualContent;

    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (path, content) => {
        actualContent = content;
      },
    );

    const config = {
      frontMatter: {
        file: "test-api.json",
        method: "delete",
        path: "/api/v2/resource/{id}",
      },
      content: {
        releaseLifecycle: "generally-available",
        scopes: ["delete:resource", "write:resource", "admin:all"],
      },
      docpath: "/tmp/docs",
      filename: "delete-resource",
    };

    const expectedContent = dedent`
      ---
      openapi: test-api.json delete /api/v2/resource/{id}
      ---

      import { ReleaseLifecycle } from "/snippets/ReleaseLifecycle.jsx";
      import { Scopes } from "/snippets/ApiScopes.jsx";

      <ReleaseLifecycle releaseLifecycle="generally-available" />
      <Scopes scopes={["delete:resource","write:resource","admin:all"]} />
    `;

    await writeMdxContent(config);

    assert.strictEqual(mockWriteFile.mock.callCount(), 1);
    assert.strictEqual(actualContent, expectedContent);
  });

  it("should handle empty scopes array", async (t) => {
    let actualContent;

    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (path, content) => {
        actualContent = content;
      },
    );

    const config = {
      frontMatter: {
        file: "test-api.json",
        method: "get",
        path: "/api/v2/public",
      },
      content: {
        releaseLifecycle: "generally-available",
        scopes: [],
      },
      docpath: "/tmp/docs",
      filename: "get-public-data",
    };

    const expectedContent = dedent`
      ---
      openapi: test-api.json get /api/v2/public
      ---

      import { ReleaseLifecycle } from "/snippets/ReleaseLifecycle.jsx";
      import { Scopes } from "/snippets/ApiScopes.jsx";

      <ReleaseLifecycle releaseLifecycle="generally-available" />
      <Scopes scopes={[]} />
    `;

    await writeMdxContent(config);

    assert.strictEqual(mockWriteFile.mock.callCount(), 1);
    assert.strictEqual(actualContent, expectedContent);
  });

  it("should throw error when writeFile fails", async (t) => {
    t.mock.method(console, "error", () => {});

    const mockWriteFile = t.mock.method(fs, "writeFile", async () => {
      throw new Error("Permission denied");
    });

    const config = {
      frontMatter: {
        file: "test-api.json",
        method: "get",
        path: "/api/v2/test",
      },
      content: {
        releaseLifecycle: "generally-available",
        scopes: ["read:test"],
      },
      docpath: "/tmp/docs",
      filename: "test-endpoint",
    };

    await assert.rejects(async () => await writeMdxContent(config), {
      message: "Permission denied",
    });

    assert.strictEqual(mockWriteFile.mock.callCount(), 1);
  });

  it("should handle French-Canadian locale OAS filename correctly", async (t) => {
    let actualContent;

    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (path, content) => {
        actualContent = content;
      },
    );

    const config = {
      frontMatter: {
        file: "myaccount-api-oas.fr-ca.json",
        method: "get",
        path: "/api/v2/users/{id}",
      },
      content: {
        releaseLifecycle: "generally-available",
        scopes: ["read:users"],
      },
      docpath: "/tmp/docs/fr-ca/api",
      filename: "get-user-details",
    };

    const expectedContent = dedent`
      ---
      openapi: myaccount-api-oas.fr-ca.json get /api/v2/users/{id}
      ---

      import { ReleaseLifecycle } from "/snippets/ReleaseLifecycle.jsx";
      import { Scopes } from "/snippets/ApiScopes.jsx";

      <ReleaseLifecycle releaseLifecycle="generally-available" />
      <Scopes scopes={["read:users"]} />
    `;

    await writeMdxContent(config);

    assert.strictEqual(mockWriteFile.mock.callCount(), 1);
    assert.strictEqual(actualContent, expectedContent);
  });

  it("should handle Japanese locale OAS filename correctly", async (t) => {
    let actualContent;

    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (path, content) => {
        actualContent = content;
      },
    );

    const config = {
      frontMatter: {
        file: "myaccount-api-oas.ja-jp.json",
        method: "post",
        path: "/api/v2/sessions",
      },
      content: {
        releaseLifecycle: "early-access",
        scopes: ["create:sessions"],
      },
      docpath: "/tmp/docs/ja-jp/api",
      filename: "create-session",
    };

    const expectedContent = dedent`
      ---
      openapi: myaccount-api-oas.ja-jp.json post /api/v2/sessions
      ---

      import { ReleaseLifecycle } from "/snippets/ReleaseLifecycle.jsx";
      import { Scopes } from "/snippets/ApiScopes.jsx";

      <ReleaseLifecycle releaseLifecycle="early-access" />
      <Scopes scopes={["create:sessions"]} />
    `;

    await writeMdxContent(config);

    assert.strictEqual(mockWriteFile.mock.callCount(), 1);
    assert.strictEqual(actualContent, expectedContent);
  });

  it("should handle English locale OAS filename correctly", async (t) => {
    let actualContent;

    const mockWriteFile = t.mock.method(
      fs,
      "writeFile",
      async (path, content) => {
        actualContent = content;
      },
    );

    const config = {
      frontMatter: {
        file: "myaccount-api-oas.json",
        method: "delete",
        path: "/api/v2/devices/{id}",
      },
      content: {
        releaseLifecycle: "generally-available",
        scopes: ["delete:devices"],
      },
      docpath: "/tmp/docs/api",
      filename: "delete-device",
    };

    const expectedContent = dedent`
      ---
      openapi: myaccount-api-oas.json delete /api/v2/devices/{id}
      ---

      import { ReleaseLifecycle } from "/snippets/ReleaseLifecycle.jsx";
      import { Scopes } from "/snippets/ApiScopes.jsx";

      <ReleaseLifecycle releaseLifecycle="generally-available" />
      <Scopes scopes={["delete:devices"]} />
    `;

    await writeMdxContent(config);

    assert.strictEqual(mockWriteFile.mock.callCount(), 1);
    assert.strictEqual(actualContent, expectedContent);
  });
});

describe("generateCodeBlocks", () => {
  it("should return null when SnippetResolver is not provided", async () => {
    const spec = {
      summary: "Get users",
      operationId: "getUsers",
      tags: ["Users"],
      parameters: [],
      responses: {},
    };

    const result = await generateCodeBlocks({
      language: "typescript",
      spec,
      path: "/api/v2/users",
      method: "get",
      SnippetResolver: null,
    });

    assert.strictEqual(result, null);
  });

  it("should return null when SnippetResolver is undefined", async () => {
    const spec = {
      summary: "Get users",
      operationId: "getUsers",
      tags: ["Users"],
      parameters: [],
      responses: {},
    };

    const result = await generateCodeBlocks({
      language: "typescript",
      spec,
      path: "/api/v2/users",
      method: "get",
      SnippetResolver: undefined,
    });

    assert.strictEqual(result, null);
  });


});

describe("getOasFilePath", () => {
  const oasConfig = {
    outputFile: "myaccount-api-oas.json",
    docRootDirectory: "myaccount",
  };

  it("should return English OAS path for en locale without calling fs.access", async (t) => {
    const mockAccess = t.mock.method(fs, "access", async () => {});

    const result = await getOasFilePath({ locale: "en", oasConfig });

    assert.strictEqual(result, "docs/oas/myaccount/myaccount-api-oas.json");
    assert.strictEqual(mockAccess.mock.callCount(), 0, "fs.access should not be called for en locale");
  });

  it("should return locale-specific OAS path when locale file exists", async (t) => {
    t.mock.method(fs, "access", async () => {}); // resolves — file exists

    const result = await getOasFilePath({ locale: "fr-ca", oasConfig });

    assert.strictEqual(result, "docs/oas/myaccount/myaccount-api-oas.fr-ca.json");
  });

  it("should fall back to English OAS path when locale file does not exist", async (t) => {
    t.mock.method(fs, "access", async () => {
      throw new Error("ENOENT: no such file or directory");
    });

    const result = await getOasFilePath({ locale: "fr-ca", oasConfig });

    assert.strictEqual(result, "docs/oas/myaccount/myaccount-api-oas.json");
  });
});

describe("injectCodeSnippets", () => {
  it("should initialize x-codeSamples array when it doesn't exist", async (t) => {
    const mockGenerateCodeBlocks = t.mock.method(
      // Need to reference the module to mock the function
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => ({
        lang: "typescript",
        label: "Get users",
        source: "const response = await fetch('/api/v2/users');",
      }),
    );

    const oasData = {
      paths: {
        "/api/v2/users": {
          get: {
            summary: "Get users",
            operationId: "getUsers",
            tags: ["Users"],
            // Note: no x-codeSamples property initially
          },
        },
      },
    };

    const spec = oasData.paths["/api/v2/users"].get;
    const oasConfig = { SnippetResolver: class MockSnippetResolver {} };
    const expected = true; // x-codeSamples should be created

    await injectCodeSnippets(oasData, {
      spec,
      path: "/api/v2/users",
      method: "get",
      oasConfig,
    });

    const actual = Array.isArray(
      oasData.paths["/api/v2/users"].get["x-codeSamples"],
    );
    assert.strictEqual(actual, expected);
    assert.ok(oasData.paths["/api/v2/users"].get["x-codeSamples"].length > 0);
  });

  it("should append code samples to existing x-codeSamples array", async (t) => {
    const mockGenerateCodeBlocks = t.mock.method(
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => ({
        lang: "typescript",
        label: "Create user",
        source:
          "const response = await fetch('/api/v2/users', { method: 'POST' });",
      }),
    );

    const oasData = {
      paths: {
        "/api/v2/users": {
          post: {
            summary: "Create user",
            operationId: "createUser",
            tags: ["Users"],
            "x-codeSamples": [
              { lang: "python", label: "Existing", source: "print('hello')" },
            ],
          },
        },
      },
    };

    const spec = oasData.paths["/api/v2/users"].post;
    const oasConfig = { SnippetResolver: class MockSnippetResolver {} };
    const expectedInitialLength = 1;

    const actualInitialLength =
      oasData.paths["/api/v2/users"].post["x-codeSamples"].length;
    assert.strictEqual(actualInitialLength, expectedInitialLength);

    await injectCodeSnippets(oasData, {
      spec,
      path: "/api/v2/users",
      method: "post",
      oasConfig,
    });

    const actualFinalLength =
      oasData.paths["/api/v2/users"].post["x-codeSamples"].length;
    assert.ok(actualFinalLength > expectedInitialLength);
  });

  it("should generate both TypeScript and JavaScript for TypeScript blocks", async (t) => {
    let callCount = 0;
    const mockGenerateCodeBlocks = t.mock.method(
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => {
        callCount++;
        if (language === "typescript") {
          return {
            lang: "typescript",
            label: "Delete resource",
            source:
              "await fetch('/api/v2/resource/123', { method: 'DELETE' });",
          };
        }
        if (language === "go") {
          return {
            lang: "go",
            label: "Delete resource",
            source: "http.Delete('/api/v2/resource/123')",
          };
        }
        return null;
      },
    );

    const oasData = {
      paths: {
        "/api/v2/resource/{id}": {
          delete: {
            summary: "Delete resource",
            operationId: "deleteResource",
            tags: ["Resources"],
            "x-codeSamples": [],
          },
        },
      },
    };

    const spec = oasData.paths["/api/v2/resource/{id}"].delete;
    const oasConfig = { SnippetResolver: class MockSnippetResolver {} };

    await injectCodeSnippets(oasData, {
      spec,
      path: "/api/v2/resource/{id}",
      method: "delete",
      oasConfig,
    });

    const actualSamples =
      oasData.paths["/api/v2/resource/{id}"].delete["x-codeSamples"];

    // Should have typescript, javascript (copy of typescript), and go
    const expectedMinLength = 3;
    assert.ok(actualSamples.length >= expectedMinLength);

    // Find the javascript block (should be a copy of typescript with lang changed)
    const jsBlock = actualSamples.find((block) => block.lang === "javascript");
    const tsBlock = actualSamples.find((block) => block.lang === "typescript");

    assert.ok(jsBlock, "JavaScript block should exist");
    assert.ok(tsBlock, "TypeScript block should exist");
    assert.strictEqual(jsBlock.source, tsBlock.source);
    assert.strictEqual(jsBlock.label, tsBlock.label);
  });

  it("should skip when generateCodeBlocks returns null", async (t) => {
    const mockGenerateCodeBlocks = t.mock.method(
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => null,
    );

    const oasData = {
      paths: {
        "/api/v2/users": {
          get: {
            summary: "Get users",
            operationId: "getUsers",
            tags: ["Users"],
            "x-codeSamples": [],
          },
        },
      },
    };

    const spec = oasData.paths["/api/v2/users"].get;
    const oasConfig = { SnippetResolver: class MockSnippetResolver {} };
    const expectedLength = 0;

    await injectCodeSnippets(oasData, {
      spec,
      path: "/api/v2/users",
      method: "get",
      oasConfig,
    });

    const actualLength =
      oasData.paths["/api/v2/users"].get["x-codeSamples"].length;
    assert.strictEqual(actualLength, expectedLength);
  });

  it("should iterate through all LANGUAGES constant", async (t) => {
    const actualCalls = [];
    const mockGenerateCodeBlocks = t.mock.method(
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => {
        actualCalls.push({ language, spec, path, method });
        return {
          lang: language,
          label: spec.summary,
          source: `// ${language} code`,
        };
      },
    );

    const oasData = {
      paths: {
        "/api/v2/test": {
          post: {
            summary: "Test endpoint",
            operationId: "testEndpoint",
            tags: ["Test"],
            "x-codeSamples": [],
          },
        },
      },
    };

    const spec = oasData.paths["/api/v2/test"].post;
    const path = "/api/v2/test";
    const method = "post";
    const oasConfig = { SnippetResolver: class MockSnippetResolver {} };

    // LANGUAGES constant is ["typescript", "go"]
    const expectedLanguages = ["typescript", "go"];

    await injectCodeSnippets(oasData, { spec, path, method, oasConfig });

    // Verify generateCodeBlocks was called for each language
    const actualLanguages = actualCalls.map((call) => call.language);
    assert.deepStrictEqual(actualLanguages, expectedLanguages);

    // Verify each call received correct parameters
    actualCalls.forEach((call) => {
      assert.strictEqual(call.spec, spec);
      assert.strictEqual(call.path, path);
      assert.strictEqual(call.method, method);
    });
  });

  it("should mutate the oasData object that is passed in", async (t) => {
    const mockGenerateCodeBlocks = t.mock.method(
      require("./artifact-generation.js"),
      "generateCodeBlocks",
      async ({ language, spec, path, method, SnippetResolver }) => ({
        lang: language,
        label: "Mutate test",
        source: `// ${language} code for mutation test`,
      }),
    );

    const oasData = {
      paths: {
        "/api/v2/mutate": {
          patch: {
            summary: "Mutate test",
            operationId: "mutateTest",
            tags: ["Test"],
            "x-codeSamples": [],
          },
        },
      },
    };

    const spec = oasData.paths["/api/v2/mutate"].patch;
    const path = "/api/v2/mutate";
    const method = "patch";
    const oasConfig = { SnippetResolver: class MockSnippetResolver {} };

    // Keep a reference to the original object to verify it's mutated
    const originalOasData = oasData;
    const expectedIsSameObject = true;

    await injectCodeSnippets(oasData, { spec, path, method, oasConfig });

    // Verify the same object reference was mutated (not a copy)
    const actualIsSameObject = oasData === originalOasData;
    assert.strictEqual(actualIsSameObject, expectedIsSameObject);

    // Verify the mutation occurred
    const actualHasCodeSamples =
      oasData.paths["/api/v2/mutate"].patch["x-codeSamples"].length > 0;
    const expectedHasCodeSamples = true;
    assert.strictEqual(actualHasCodeSamples, expectedHasCodeSamples);
  });
});

describe("convertDocsToFormat", () => {
  it("should convert empty docs object to structure with empty pages array", () => {
    const rawDocs = {};
    const expected = {};

    const actual = convertDocsToFormat({ docs: rawDocs, tags: [] });

    assert.deepStrictEqual(actual, expected);
  });

  it("should convert single folder to single group with startCase formatting", () => {
    const rawDocs = {
      en: {
        "user-management": [
          "docs/api/myaccount/user-management/get-user",
          "docs/api/myaccount/user-management/update-user",
        ],
      },
      "fr-ca": {
        "user-management": [
          "docs/api/myaccount/user-management/get-user",
          "docs/api/myaccount/user-management/update-user",
        ],
      },
      "ja-jp": {
        "user-management": [
          "docs/api/myaccount/user-management/get-user",
          "docs/api/myaccount/user-management/update-user",
        ],
      },
    };
    const expected = {
      en: {
        group: " ",
        pages: [
          {
            group: "User Management",
            pages: [
              "docs/api/myaccount/user-management/get-user",
              "docs/api/myaccount/user-management/update-user",
            ],
          },
        ],
      },
      "fr-ca": {
        group: " ",
        pages: [
          {
            group: "User Management",
            pages: [
              "docs/api/myaccount/user-management/get-user",
              "docs/api/myaccount/user-management/update-user",
            ],
          },
        ],
      },
      "ja-jp": {
        group: " ",
        pages: [
          {
            group: "User Management",
            pages: [
              "docs/api/myaccount/user-management/get-user",
              "docs/api/myaccount/user-management/update-user",
            ],
          },
        ],
      },
    };

    const actual = convertDocsToFormat({ docs: rawDocs, tags: [] });

    assert.deepStrictEqual(actual, expected);
  });

  it("should convert multiple folders to multiple groups", () => {
    const rawDocs = {
      en: {
        users: ["docs/api/myaccount/users/get-user"],
        sessions: ["docs/api/myaccount/sessions/list-sessions"],
        devices: ["docs/api/myaccount/devices/get-device"],
      },
      "fr-ca": {
        users: ["docs/api/myaccount/users/get-user"],
        sessions: ["docs/api/myaccount/sessions/list-sessions"],
        devices: ["docs/api/myaccount/devices/get-device"],
      },
      "ja-jp": {
        users: ["docs/api/myaccount/users/get-user"],
        sessions: ["docs/api/myaccount/sessions/list-sessions"],
        devices: ["docs/api/myaccount/devices/get-device"],
      },
    };
    const expected = {
      en: {
        group: " ",
        pages: [
          { group: "Users", pages: ["docs/api/myaccount/users/get-user"] },
          {
            group: "Sessions",
            pages: ["docs/api/myaccount/sessions/list-sessions"],
          },
          {
            group: "Devices",
            pages: ["docs/api/myaccount/devices/get-device"],
          },
        ],
      },
      "fr-ca": {
        group: " ",
        pages: [
          { group: "Users", pages: ["docs/api/myaccount/users/get-user"] },
          {
            group: "Sessions",
            pages: ["docs/api/myaccount/sessions/list-sessions"],
          },
          {
            group: "Devices",
            pages: ["docs/api/myaccount/devices/get-device"],
          },
        ],
      },
      "ja-jp": {
        group: " ",
        pages: [
          { group: "Users", pages: ["docs/api/myaccount/users/get-user"] },
          {
            group: "Sessions",
            pages: ["docs/api/myaccount/sessions/list-sessions"],
          },
          {
            group: "Devices",
            pages: ["docs/api/myaccount/devices/get-device"],
          },
        ],
      },
    };

    const actual = convertDocsToFormat({ docs: rawDocs, tags: [] });

    assert.deepStrictEqual(actual, expected);
  });

  it("should handle kebab-case folder names with startCase", () => {
    const rawDocs = {
      en: {
        "multi-factor-authentication": [
          "docs/api/myaccount/multi-factor-authentication/enroll",
        ],
      },
      "fr-ca": {
        "multi-factor-authentication": [
          "docs/api/myaccount/multi-factor-authentication/enroll",
        ],
      },
      "ja-jp": {
        "multi-factor-authentication": [
          "docs/api/myaccount/multi-factor-authentication/enroll",
        ],
      },
    };
    const expected = {
      en: {
        group: " ",
        pages: [
          {
            group: "Multi Factor Authentication",
            pages: ["docs/api/myaccount/multi-factor-authentication/enroll"],
          },
        ],
      },
      "fr-ca": {
        group: " ",
        pages: [
          {
            group: "Multi Factor Authentication",
            pages: ["docs/api/myaccount/multi-factor-authentication/enroll"],
          },
        ],
      },
      "ja-jp": {
        group: " ",
        pages: [
          {
            group: "Multi Factor Authentication",
            pages: ["docs/api/myaccount/multi-factor-authentication/enroll"],
          },
        ],
      },
    };

    const actual = convertDocsToFormat({ docs: rawDocs, tags: [] });

    assert.deepStrictEqual(actual, expected);
  });

  it("should use x-displayName from matching tags when available", () => {
    const rawDocs = {
      en: {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        factors: ["docs/api/myaccount/factors/get-status"],
      },
      "fr-ca": {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        factors: ["docs/api/myaccount/factors/get-status"],
      },
      "ja-jp": {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        factors: ["docs/api/myaccount/factors/get-status"],
      },
    };
    const tags = [
      { name: "authentication-methods", "x-displayName": "Authentication Methods" },
      { name: "factors", "x-displayName": "Factors" },
    ];
    const expected = {
      en: {
        group: " ",
        pages: [
          {
            group: "Authentication Methods",
            pages: ["docs/api/myaccount/authentication-methods/list"],
          },
          {
            group: "Factors",
            pages: ["docs/api/myaccount/factors/get-status"],
          },
        ],
      },
      "fr-ca": {
        group: " ",
        pages: [
          {
            group: "Authentication Methods",
            pages: ["docs/api/myaccount/authentication-methods/list"],
          },
          {
            group: "Factors",
            pages: ["docs/api/myaccount/factors/get-status"],
          },
        ],
      },
      "ja-jp": {
        group: " ",
        pages: [
          {
            group: "Authentication Methods",
            pages: ["docs/api/myaccount/authentication-methods/list"],
          },
          {
            group: "Factors",
            pages: ["docs/api/myaccount/factors/get-status"],
          },
        ],
      },
    };

    const actual = convertDocsToFormat({ docs: rawDocs, tags });

    assert.deepStrictEqual(actual, expected);
  });

  it("should fall back to startCase when tag has no x-displayName", () => {
    const rawDocs = {
      en: {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "fr-ca": {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "ja-jp": {
        users: ["docs/api/myaccount/users/get-user"],
      },
    };
    const tags = [{ name: "users" }]; // No x-displayName
    const expected = {
      en: {
        group: " ",
        pages: [
          { group: "Users", pages: ["docs/api/myaccount/users/get-user"] },
        ],
      },
      "fr-ca": {
        group: " ",
        pages: [
          { group: "Users", pages: ["docs/api/myaccount/users/get-user"] },
        ],
      },
      "ja-jp": {
        group: " ",
        pages: [
          { group: "Users", pages: ["docs/api/myaccount/users/get-user"] },
        ],
      },
    };

    const actual = convertDocsToFormat({ docs: rawDocs, tags });

    assert.deepStrictEqual(actual, expected);
  });

  it("should handle mixed scenario with some tags having x-displayName and others falling back to startCase", () => {
    const rawDocs = {
      en: {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        "user-profile": ["docs/api/myaccount/user-profile/get"],
        devices: ["docs/api/myaccount/devices/list"],
      },
      "fr-ca": {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        "user-profile": ["docs/api/myaccount/user-profile/get"],
        devices: ["docs/api/myaccount/devices/list"],
      },
      "ja-jp": {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        "user-profile": ["docs/api/myaccount/user-profile/get"],
        devices: ["docs/api/myaccount/devices/list"],
      },
    };
    const tags = [
      { name: "authentication-methods", "x-displayName": "Authentication Methods" },
      // user-profile has no matching tag - should use startCase
      // devices has tag but no x-displayName
      { name: "devices" },
    ];
    const expected = {
      en: {
        group: " ",
        pages: [
          {
            group: "Authentication Methods",
            pages: ["docs/api/myaccount/authentication-methods/list"],
          },
          {
            group: "User Profile",
            pages: ["docs/api/myaccount/user-profile/get"],
          },
          {
            group: "Devices",
            pages: ["docs/api/myaccount/devices/list"],
          },
        ],
      },
      "fr-ca": {
        group: " ",
        pages: [
          {
            group: "Authentication Methods",
            pages: ["docs/api/myaccount/authentication-methods/list"],
          },
          {
            group: "User Profile",
            pages: ["docs/api/myaccount/user-profile/get"],
          },
          {
            group: "Devices",
            pages: ["docs/api/myaccount/devices/list"],
          },
        ],
      },
      "ja-jp": {
        group: " ",
        pages: [
          {
            group: "Authentication Methods",
            pages: ["docs/api/myaccount/authentication-methods/list"],
          },
          {
            group: "User Profile",
            pages: ["docs/api/myaccount/user-profile/get"],
          },
          {
            group: "Devices",
            pages: ["docs/api/myaccount/devices/list"],
          },
        ],
      },
    };

    const actual = convertDocsToFormat({ docs: rawDocs, tags });

    assert.deepStrictEqual(actual, expected);
  });
});

describe("patchDocsJson", () => {
  it("should create new dropdown when apiIdx is -1", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API [FR]",
        "ja-jp": "MyAccount API [JP]",
      },
    };
    const rawDocs = {
      en: {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "fr-ca": {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "ja-jp": {
        users: ["docs/api/myaccount/users/get-user"],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };

    const expected = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [
                  {
                    dropdown: "MyAccount API",
                    icon: "list",
                    openapi: "docs/oas/myaccount/myaccount-api-oas.json",
                    pages: [
                      "docs/api/myaccount/index",
                      {
                        group: "Users",
                        pages: ["docs/api/myaccount/users/get-user"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [
                  {
                    dropdown: "MyAccount API [FR]",
                    icon: "list",
                    openapi: "docs/oas/myaccount/myaccount-api-oas.json",
                    pages: [
                      "docs/fr-ca/api/myaccount/index",
                      {
                        group: "Users",
                        pages: ["docs/api/myaccount/users/get-user"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [
                  {
                    dropdown: "MyAccount API [JP]",
                    icon: "list",
                    openapi: "docs/oas/myaccount/myaccount-api-oas.json",
                    pages: [
                      "docs/ja-jp/api/myaccount/index",
                      {
                        group: "Users",
                        pages: ["docs/api/myaccount/users/get-user"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    const oasData = { tags: [] };

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });

    assert.deepStrictEqual(actual, expected);
  });

  it("should update existing dropdown when found", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      en: {
        sessions: ["docs/api/myaccount/sessions/list-sessions"],
      },
      "fr-ca": {
        sessions: ["docs/api/myaccount/sessions/list-sessions"],
      },
      "ja-jp": {
        sessions: ["docs/api/myaccount/sessions/list-sessions"],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [
                  {
                    dropdown: "MyAccount API",
                    icon: "list",
                    pages: [
                      "docs/api/myaccount/index",
                      {
                        group: "Users",
                        pages: ["docs/api/myaccount/users/get-user"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [
                  {
                    dropdown: "MyAccount API",
                    icon: "list",
                    pages: [],
                  },
                ],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [
                  {
                    dropdown: "MyAccount API",
                    icon: "list",
                    pages: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    const expectedPages = [
      "docs/api/myaccount/index",
      {
        group: "Sessions",
        pages: ["docs/api/myaccount/sessions/list-sessions"],
      },
    ];
    const oasData = { tags: [] };

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });

    // Check en locale pages were updated
    const actualEnPages =
      actual.navigation.languages[0].tabs[0].dropdowns[0].pages;
    assert.deepStrictEqual(actualEnPages, expectedPages);

    // Check fr-ca locale pages were updated
    const actualFrPages =
      actual.navigation.languages[1].tabs[0].dropdowns[0].pages;
    const expectedFrPages = [
      "docs/fr-ca/api/myaccount/index",
      {
        group: "Sessions",
        pages: ["docs/api/myaccount/sessions/list-sessions"],
      },
    ];
    assert.deepStrictEqual(actualFrPages, expectedFrPages);

    // Check ja-jp locale pages were updated
    const actualJpPages =
      actual.navigation.languages[2].tabs[0].dropdowns[0].pages;
    const expectedJpPages = [
      "docs/ja-jp/api/myaccount/index",
      {
        group: "Sessions",
        pages: ["docs/api/myaccount/sessions/list-sessions"],
      },
    ];
    assert.deepStrictEqual(actualJpPages, expectedJpPages);

    // Check openapi field is set on all locales
    const expectedOpenapi = "docs/oas/myaccount/myaccount-api-oas.json";
    assert.strictEqual(
      actual.navigation.languages[0].tabs[0].dropdowns[0].openapi,
      expectedOpenapi,
    );
    assert.strictEqual(
      actual.navigation.languages[1].tabs[0].dropdowns[0].openapi,
      expectedOpenapi,
    );
    assert.strictEqual(
      actual.navigation.languages[2].tabs[0].dropdowns[0].openapi,
      expectedOpenapi,
    );
  });

  it("should construct correct docsPath for en locale", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      en: {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "fr-ca": {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "ja-jp": {
        users: ["docs/api/myaccount/users/get-user"],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };

    const expectedEnIndexPath = "docs/api/myaccount/index";
    const oasData = { tags: [] };

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });
    const actualEnIndexPath =
      actual.navigation.languages[0].tabs[0].dropdowns[0].pages[0];

    assert.strictEqual(actualEnIndexPath, expectedEnIndexPath);
  });

  it("should construct correct docsPath for non-en locales", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      en: {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "fr-ca": {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "ja-jp": {
        users: ["docs/api/myaccount/users/get-user"],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };

    const expectedFrIndexPath = "docs/fr-ca/api/myaccount/index";
    const expectedJpIndexPath = "docs/ja-jp/api/myaccount/index";
    const oasData = { tags: [] };

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });
    const actualFrIndexPath =
      actual.navigation.languages[1].tabs[0].dropdowns[0].pages[0];
    const actualJpIndexPath =
      actual.navigation.languages[2].tabs[0].dropdowns[0].pages[0];

    assert.strictEqual(actualFrIndexPath, expectedFrIndexPath);
    assert.strictEqual(actualJpIndexPath, expectedJpIndexPath);
  });

  it("should mutate the original docsJson object", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      en: {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "fr-ca": {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "ja-jp": {
        users: ["docs/api/myaccount/users/get-user"],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };

    const originalDocsJson = docsJson;
    const expectedIsSameObject = true;
    const oasData = { tags: [] };

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });
    const actualIsSameObject = actual === originalDocsJson;

    assert.strictEqual(actualIsSameObject, expectedIsSameObject);

    // Verify the mutation occurred
    const actualHasDropdowns =
      docsJson.navigation.languages[0].tabs[0].dropdowns.length > 0;
    const expectedHasDropdowns = true;
    assert.strictEqual(actualHasDropdowns, expectedHasDropdowns);
  });

  it("should process all three LOCALES correctly", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "API MyAccount",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      en: {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "fr-ca": {
        users: ["docs/api/myaccount/users/get-user"],
      },
      "ja-jp": {
        users: ["docs/api/myaccount/users/get-user"],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };

    const expectedEnDropdownName = "MyAccount API";
    const expectedFrDropdownName = "API MyAccount";
    const expectedJpDropdownName = "MyAccount API";
    const oasData = { tags: [] };

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });

    const actualEnDropdownName =
      actual.navigation.languages[0].tabs[0].dropdowns[0].dropdown;
    const actualFrDropdownName =
      actual.navigation.languages[1].tabs[0].dropdowns[0].dropdown;
    const actualJpDropdownName =
      actual.navigation.languages[2].tabs[0].dropdowns[0].dropdown;

    assert.strictEqual(actualEnDropdownName, expectedEnDropdownName);
    assert.strictEqual(actualFrDropdownName, expectedFrDropdownName);
    assert.strictEqual(actualJpDropdownName, expectedJpDropdownName);
  });

  it("should handle when oasData doesn't have tags property", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      en: {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
      },
      "fr-ca": {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
      },
      "ja-jp": {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };
    const oasData = {}; // No tags property

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });

    // Should fall back to startCase since no tags are provided
    const enDropdown =
      actual.navigation.languages[0].tabs[0].dropdowns[0];
    assert.strictEqual(enDropdown.dropdown, "MyAccount API");
    assert.strictEqual(
      enDropdown.pages[1].group,
      "Authentication Methods",
      "Should use startCase when tags property is missing",
    );
  });

  it("should pass tags from oasData to convertDocsToFormat", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      en: {
        factors: ["docs/api/myaccount/factors/get-status"],
      },
      "fr-ca": {
        factors: ["docs/api/myaccount/factors/get-status"],
      },
      "ja-jp": {
        factors: ["docs/api/myaccount/factors/get-status"],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };
    const oasData = {
      tags: [{ name: "factors", "x-displayName": "Factors" }],
    };

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });

    // Verify tags were used - should see "Factors" not "Factors" from startCase
    const enDropdown =
      actual.navigation.languages[0].tabs[0].dropdowns[0];
    assert.strictEqual(
      enDropdown.pages[1].group,
      "Factors",
      "Should use x-displayName from tags",
    );
  });

  it("should use x-displayName from tags when available in patchDocsJson", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      outputFile: "myaccount-api-oas.json",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      en: {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        "connected-accounts": [
          "docs/api/myaccount/connected-accounts/create",
        ],
      },
      "fr-ca": {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        "connected-accounts": [
          "docs/api/myaccount/connected-accounts/create",
        ],
      },
      "ja-jp": {
        "authentication-methods": [
          "docs/api/myaccount/authentication-methods/list",
        ],
        "connected-accounts": [
          "docs/api/myaccount/connected-accounts/create",
        ],
      },
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja",
            tabs: [
              {
                tab: "API Reference",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };
    const oasData = {
      tags: [
        {
          name: "authentication-methods",
          "x-displayName": "Authentication Methods",
        },
        { name: "connected-accounts", "x-displayName": "Connected Accounts" },
      ],
    };

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson, oasData });

    const enDropdown =
      actual.navigation.languages[0].tabs[0].dropdowns[0];
    const groups = enDropdown.pages.slice(1).map((p) => p.group);

    assert.ok(
      groups.includes("Authentication Methods"),
      "Should include Authentication Methods from x-displayName",
    );
    assert.ok(
      groups.includes("Connected Accounts"),
      "Should include Connected Accounts from x-displayName",
    );
  });
});
