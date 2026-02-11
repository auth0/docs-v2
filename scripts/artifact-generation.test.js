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

  it("should return undefined when operation has no security property", () => {
    const spec = {
      summary: "Public endpoint",
      operationId: "getPublicData",
      tags: ["Public"],
      responses: {},
    };

    const result = getEndpointScopes(spec);

    assert.strictEqual(result, undefined);
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

      import { ReleaseLifecycle } from "/snippets/ApiReleaseLifecycle.jsx";
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

      import { ReleaseLifecycle } from "/snippets/ApiReleaseLifecycle.jsx";
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

      import { ReleaseLifecycle } from "/snippets/ApiReleaseLifecycle.jsx";
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

  it("should return null when SnippetResolver is falsy", async () => {
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
    const expected = { group: " ", pages: [] };

    const actual = convertDocsToFormat(rawDocs);

    assert.deepStrictEqual(actual, expected);
  });

  it("should convert single folder to single group with startCase formatting", () => {
    const rawDocs = {
      "user-management": [
        "main/docs/api/myaccount/user-management/get-user",
        "main/docs/api/myaccount/user-management/update-user",
      ],
    };
    const expected = {
      group: " ",
      pages: [
        {
          group: "User Management",
          pages: [
            "main/docs/api/myaccount/user-management/get-user",
            "main/docs/api/myaccount/user-management/update-user",
          ],
        },
      ],
    };

    const actual = convertDocsToFormat(rawDocs);

    assert.deepStrictEqual(actual, expected);
  });

  it("should convert multiple folders to multiple groups", () => {
    const rawDocs = {
      users: ["main/docs/api/myaccount/users/get-user"],
      sessions: ["main/docs/api/myaccount/sessions/list-sessions"],
      devices: ["main/docs/api/myaccount/devices/get-device"],
    };
    const expected = {
      group: " ",
      pages: [
        { group: "Users", pages: ["main/docs/api/myaccount/users/get-user"] },
        {
          group: "Sessions",
          pages: ["main/docs/api/myaccount/sessions/list-sessions"],
        },
        {
          group: "Devices",
          pages: ["main/docs/api/myaccount/devices/get-device"],
        },
      ],
    };

    const actual = convertDocsToFormat(rawDocs);

    assert.deepStrictEqual(actual, expected);
  });

  it("should handle kebab-case folder names with startCase", () => {
    const rawDocs = {
      "multi-factor-authentication": [
        "main/docs/api/myaccount/multi-factor-authentication/enroll",
      ],
    };
    const expected = {
      group: " ",
      pages: [
        {
          group: "Multi Factor Authentication",
          pages: ["main/docs/api/myaccount/multi-factor-authentication/enroll"],
        },
      ],
    };

    const actual = convertDocsToFormat(rawDocs);

    assert.deepStrictEqual(actual, expected);
  });
});

describe("patchDocsJson", () => {
  it("should create new dropdown when apiIdx is -1", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API [FR]",
        "ja-jp": "MyAccount API [JP]",
      },
    };
    const rawDocs = {
      users: ["main/docs/api/myaccount/users/get-user"],
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API References",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr-ca",
            tabs: [
              {
                tab: "API References [FR]",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja-jp",
            tabs: [
              {
                tab: "API References [JP]",
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
                tab: "API References",
                dropdowns: [
                  {
                    dropdown: "MyAccount API",
                    icon: "list",
                    pages: [
                      "main/docs/api/myaccount/index",
                      {
                        group: " ",
                        pages: [
                          {
                            group: "Users",
                            pages: ["main/docs/api/myaccount/users/get-user"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            language: "fr-ca",
            tabs: [
              {
                tab: "API References [FR]",
                dropdowns: [
                  {
                    dropdown: "MyAccount API [FR]",
                    icon: "list",
                    pages: [
                      "main/docs/fr-ca/api/myaccount/index",
                      {
                        group: " ",
                        pages: [
                          {
                            group: "Users",
                            pages: ["main/docs/api/myaccount/users/get-user"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            language: "ja-jp",
            tabs: [
              {
                tab: "API References [JP]",
                dropdowns: [
                  {
                    dropdown: "MyAccount API [JP]",
                    icon: "list",
                    pages: [
                      "main/docs/ja-jp/api/myaccount/index",
                      {
                        group: " ",
                        pages: [
                          {
                            group: "Users",
                            pages: ["main/docs/api/myaccount/users/get-user"],
                          },
                        ],
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

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson });

    assert.deepStrictEqual(actual, expected);
  });

  it("should update existing dropdown when found", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      sessions: ["main/docs/api/myaccount/sessions/list-sessions"],
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API References",
                dropdowns: [
                  {
                    dropdown: "MyAccount API",
                    icon: "list",
                    pages: [
                      "main/docs/api/myaccount/index",
                      {
                        group: " ",
                        pages: [
                          {
                            group: "Users",
                            pages: ["main/docs/api/myaccount/users/get-user"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            language: "fr-ca",
            tabs: [
              {
                tab: "API References [FR]",
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
            language: "ja-jp",
            tabs: [
              {
                tab: "API References [JP]",
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
      "main/docs/api/myaccount/index",
      {
        group: " ",
        pages: [
          {
            group: "Sessions",
            pages: ["main/docs/api/myaccount/sessions/list-sessions"],
          },
        ],
      },
    ];

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson });

    // Check en locale pages were updated
    const actualEnPages =
      actual.navigation.languages[0].tabs[0].dropdowns[0].pages;
    assert.deepStrictEqual(actualEnPages, expectedPages);

    // Check fr-ca locale pages were updated
    const actualFrPages =
      actual.navigation.languages[1].tabs[0].dropdowns[0].pages;
    const expectedFrPages = [
      "main/docs/fr-ca/api/myaccount/index",
      {
        group: " ",
        pages: [
          {
            group: "Sessions",
            pages: ["main/docs/api/myaccount/sessions/list-sessions"],
          },
        ],
      },
    ];
    assert.deepStrictEqual(actualFrPages, expectedFrPages);

    // Check ja-jp locale pages were updated
    const actualJpPages =
      actual.navigation.languages[2].tabs[0].dropdowns[0].pages;
    const expectedJpPages = [
      "main/docs/ja-jp/api/myaccount/index",
      {
        group: " ",
        pages: [
          {
            group: "Sessions",
            pages: ["main/docs/api/myaccount/sessions/list-sessions"],
          },
        ],
      },
    ];
    assert.deepStrictEqual(actualJpPages, expectedJpPages);
  });

  it("should construct correct docsPath for en locale", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      users: ["main/docs/api/myaccount/users/get-user"],
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API References",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr-ca",
            tabs: [
              {
                tab: "API References [FR]",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja-jp",
            tabs: [
              {
                tab: "API References [JP]",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };

    const expectedEnIndexPath = "main/docs/api/myaccount/index";

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson });
    const actualEnIndexPath =
      actual.navigation.languages[0].tabs[0].dropdowns[0].pages[0];

    assert.strictEqual(actualEnIndexPath, expectedEnIndexPath);
  });

  it("should construct correct docsPath for non-en locales", () => {
    const oasConfig = {
      docRootDirectory: "myaccount",
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      users: ["main/docs/api/myaccount/users/get-user"],
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API References",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr-ca",
            tabs: [
              {
                tab: "API References [FR]",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja-jp",
            tabs: [
              {
                tab: "API References [JP]",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };

    const expectedFrIndexPath = "main/docs/fr-ca/api/myaccount/index";
    const expectedJpIndexPath = "main/docs/ja-jp/api/myaccount/index";

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson });
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
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "MyAccount API",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      users: ["main/docs/api/myaccount/users/get-user"],
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API References",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr-ca",
            tabs: [
              {
                tab: "API References [FR]",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja-jp",
            tabs: [
              {
                tab: "API References [JP]",
                dropdowns: [],
              },
            ],
          },
        ],
      },
    };

    const originalDocsJson = docsJson;
    const expectedIsSameObject = true;

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson });
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
      docSectionNameMap: {
        en: "MyAccount API",
        "fr-ca": "API MyAccount",
        "ja-jp": "MyAccount API",
      },
    };
    const rawDocs = {
      users: ["main/docs/api/myaccount/users/get-user"],
    };
    const docsJson = {
      navigation: {
        languages: [
          {
            language: "en",
            tabs: [
              {
                tab: "API References",
                dropdowns: [],
              },
            ],
          },
          {
            language: "fr-ca",
            tabs: [
              {
                tab: "API References [FR]",
                dropdowns: [],
              },
            ],
          },
          {
            language: "ja-jp",
            tabs: [
              {
                tab: "API References [JP]",
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

    const actual = patchDocsJson({ oasConfig, rawDocs, docsJson });

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
});
