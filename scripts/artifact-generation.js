const fs = require("node:fs/promises");
const { resolve } = require("node:path");
const {
  kebabCase,
  startCase,
  flattenDeep,
  chain,
  initial,
  last,
} = require("lodash");
const dedent = require("dedent");

// supported languages/locales for the script
const LOCALES = ["en", "fr-ca", "ja-jp"];
const LOCALES_MAP = {
  en: "en",
  "fr-ca": "fr",
  "ja-jp": "ja",
};

// supported code snippet languages
// TODO: move this into the `oasConfig` object; each api can have it's own
// languages
const LANGUAGES = ["typescript", "go"];

const REFERENCE_SECTION_MAP = {
  en: "API Reference",
  "fr-ca": "API Reference",
  "ja-jp": "API Reference",
};

const oasConfigs = [
  {
    // TODO: this needs to be a location in `node_modules`
    inputFile: "node_modules/@a0/myaccount-api-oas/openapi-dereferenced.json",
    outputFile: "myaccount-api-oas.json",
    docRootDirectory: "myaccount",
    docSectionNameMap: {
      en: "MyAccount API",
      "fr-ca": "MyAccount API",
      "ja-jp": "MyAccount API",
    },
    SnippetResolver: require("@fern-api/auth0-myaccount-snippets")
      .SnippetResolver,
  },
  // {
  //   // TODO: this needs to be a location in `node_modules`
  //   inputFile: "myorganization-api-oas.json",
  //   outputFile: "myorganization-api-oas.json",
  //   docRootDirectory: "myorganization",
  //   docSectionNameMap: {
  //     en: "MyOrganization API",
  //     "fr-ca": "MyOrganization API",
  //     "ja-jp": "MyOrganization API",
  //   },
  //   SnippetResolver: require("@fern-api/auth0-myorganization-snippets")
  //     .SnippetResolver,
  // },
  // {
  //   // TODO: this needs to be a location in `node_modules`
  //   inputFile: "management-api-oas.json",
  //   outputFile: "management-api-oas.json",
  //   docRootDirectory: "management/v2",
  //   docSectionNameMap: {
  //     en: "Management API",
  //     "fr-ca": "Management API",
  //     "ja-jp": "Management API",
  //   },
  //   SnippetResolver: require("@fern-api/auth0-management-snippets")
  //     .SnippetResolver,
  // },
  // {
  //   // TODO: this needs to be a location in `node_modules`
  //   inputFile: "authentication-api-oas.json",
  //   outputFile: "authentication-api-oas.json",
  //   docRootDirectory: "authentication",
  //   docSectionNameMap: {
  //     en: "Authentication API",
  //     "fr-ca": "Authentication API",
  //     "ja-jp": "Authentication API",
  //   },
  //   SnippetResolver: null,
  // },
];

const DOCS_SITE = "main";
const DOCS_FOLDER = "docs";
const API_FOLDER = "api";
const SPEC_FOLDER = "oas";
const SPEC_LOCATION = `${DOCS_FOLDER}/${SPEC_FOLDER}`;

async function readJson(path) {
  try {
    const jsonPath = resolve(path);
    const rawData = await fs.readFile(jsonPath, { encoding: "utf8" });
    const data = JSON.parse(rawData);
    return data;
  } catch (err) {
    console.error(`readJson failed for: ${path}`, err);
    return null;
  }
}

function getEndpointScopes(spec) {
  const scopes = spec?.security?.reduce((acc, securityScheme) => {
    const scopeList = Object.values(securityScheme);
    return [...acc, ...scopeList];
  }, []);
  return flattenDeep(scopes);
}

async function writeMdxContent(config) {
  const {
    frontMatter: { file, method, path },
    content: { releaseLifecycle, scopes },
    docpath,
    filename,
  } = config;

  const mdxContent = dedent`
    ---
    openapi: ${file} ${method} ${path}
    ---

    import { ReleaseLifecycle } from "/snippets/ReleaseLifecycle.jsx";
    import { Scopes } from "/snippets/ApiScopes.jsx";

    <ReleaseLifecycle releaseLifecycle="${releaseLifecycle}" />
    <Scopes scopes={${JSON.stringify(scopes)}} />
  `;

  const mdxFilePath = `${docpath}/${filename}.mdx`;
  try {
    await fs.writeFile(mdxFilePath, mdxContent);
  } catch (err) {
    console.error(`failed to write: ${mdxFilePath}`, err);
    throw err;
  }
}


/**
 * For new APIs add an `index.mdx` landing page that will be 
 * managed by the product team. 
 * 
 * Note: This file will be ignored if it already exists to prevent
 * loss of any changes.
 */
async function writeApiIndexMdx({ docpath, apiName }) {
  const indexContent = dedent`
    ---
    title: "${apiName}"
    description: "${apiName} endpoints"
    ---
  `;

  const indexFilePath = `${docpath}/index.mdx`;

  // Check if index.mdx already exists to avoid overwriting manual changes
  try {
    await fs.access(indexFilePath);
    // File exists, don't overwrite
    return;
  } catch {
    // File doesn't exist, create it
    try {
      await fs.writeFile(indexFilePath, indexContent);
    } catch (err) {
      console.error(`failed to write index: ${indexFilePath}`, err);
    }
  }
}

// TODO: this function needs to be updated to produce based on passed in spec
async function generateCodeBlocks({
  language,
  spec,
  path,
  method,
  SnippetResolver,
}) {
  const { parameters = [], requestBody: specRequestBody = {}, security } = spec;
  const { content } = specRequestBody;

  // INFO: bail out if no snippets resolver
  if (!SnippetResolver) {
    return null;
  }

  const reducer =
    (loc) =>
    (parameters = []) =>
      parameters.reduce((acc, param) => {
        if (param.in === loc) {
          acc[param.name] = "";
        }
        return acc;
      }, {});

  const queryParameters = reducer("query")(parameters);
  const pathParameters = reducer("path")(parameters);
  const headers = reducer("header")(parameters);
  // const requestBody = content && content["application/json"]?.schema;
  const requestBody = null;

  let response = null;
  try {
    const resolver = new SnippetResolver();
    const provider = resolver.sdk(language);
    const entity = provider.endpoint(`${method.toUpperCase()} ${path}`);
    // response = await entity.generate({
    //   ...(queryParameters && { queryParameters }),
    //   ...(pathParameters && { pathParameters }),
    //   ...(requestBody && { requestBody }),
    //   ...(headers && { headers }),
    //   ...(security && { auth: { type: "bearer", token: "<token>" } }),
    // });
    response = await entity.generate();
  } catch (err) {
    console.error("code snippet generation error:", err.toString());
    return null;
  }

  return {
    lang: language,
    label: spec.summary,
    source: response.snippet,
  };
}

// INFO: this method will need to mutate an input object
async function injectCodeSnippets(oasData, { spec, path, method, oasConfig }) {
  // INFO: do the code snippet generation
  if (!oasData.paths[path][method]["x-codeSamples"]) {
    oasData.paths[path][method]["x-codeSamples"] = [];
  }
  // iterate through each of the supported code snippet languages
  for (const language of LANGUAGES) {
    const block = await module.exports.generateCodeBlocks({
      language,
      spec,
      path,
      method,
      SnippetResolver: oasConfig.SnippetResolver,
    });
    // block being false means the code snippets failed to generation, we should skip this
    if (!block) {
      continue;
    }
    oasData.paths[path][method]["x-codeSamples"].push(block);
    // INFO: `typescript` and `javascript` are the same code snippets
    if (language === "typescript") {
      oasData.paths[path][method]["x-codeSamples"].push({
        ...block,
        lang: "javascript",
      });
    }
  }
}

function convertDocsToFormat({ docs, tags }) {
  const docsByLocale = {};
  // at the level of the api (management, account, etc)
  for (const locale in docs) {
    const data = { group: " ", pages: [] };
    for (const folder in docs[locale]) {
      const tag = tags.find((tag) => tag.name === folder);
      const groupName = tag?.["x-displayName"] || startCase(folder);
      data.pages.push({
        group: groupName,
        pages: docs[locale][folder],
      });
      // at the level of the folder (actions, users, etc)
    }
    docsByLocale[locale] = data;
  }
  return docsByLocale;
}

function patchDocsJson({ oasConfig, rawDocs, docsJson, oasData }) {
  // this gets the raw doc snippet into the right format
  const docsByLocale = convertDocsToFormat({
    docs: rawDocs,
    tags: oasData.tags || [],
  });
  // loop through languages
  for (const locale of LOCALES) {
    // construct docsPath based on locale
    const docsPath =
      locale === "en"
        ? `${DOCS_FOLDER}/${API_FOLDER}/${oasConfig.docRootDirectory}`
        : `${DOCS_FOLDER}/${locale}/${API_FOLDER}/${oasConfig.docRootDirectory}`;
    // where is our current language's object at in the docs.json
    const langIdx = docsJson.navigation.languages.findIndex(
      (item) => item.language === LOCALES_MAP[locale],
    );
    // this is the language "object" that contains navigation for the site
    const langObj = docsJson.navigation.languages[langIdx];
    // within the language, where in the api reference section
    const refIdx = langObj.tabs.findIndex(
      (item) => item.tab === REFERENCE_SECTION_MAP[locale],
    );
    // within the api reference section, where is the specific api we're interested in
    let apiIdx = langObj.tabs[refIdx].dropdowns.findIndex(
      (item) => item.dropdown === oasConfig.docSectionNameMap[locale],
    );
    // now let's see if our specific api exists in the nav
    if (apiIdx === -1) {
      // let's set the correct index (it will be correct shortly)
      apiIdx =
        docsJson.navigation.languages[langIdx].tabs[refIdx].dropdowns.length;
      // start a new api explorer nav item
      docsJson.navigation.languages[langIdx].tabs[refIdx].dropdowns.push({
        dropdown: oasConfig.docSectionNameMap[locale],
        icon: "list",
        pages: [],
      });
    }
    // now either way (existed before or not), we can replace the found nav object's pages
    docsJson.navigation.languages[langIdx].tabs[refIdx].dropdowns[
      apiIdx
    ].pages = [`${docsPath}/index`, ...docsByLocale[locale].pages];
  }
  return docsJson;
}

async function getOasFilePath({ locale, oasConfig }) {
  const enPath = `${DOCS_FOLDER}/${SPEC_FOLDER}/${oasConfig.docRootDirectory}/${oasConfig.outputFile}`;
  if (locale === "en") {
    return enPath;
  }
  const localeFilename = chain(oasConfig.outputFile)
    .split(".")
    .thru((parts) => [...initial(parts), locale, last(parts)])
    .join(".")
    .value();
  const localeAbsPath = `${DOCS_SITE}/${SPEC_LOCATION}/${oasConfig.docRootDirectory}/${localeFilename}`;
  try {
    await fs.access(localeAbsPath);
    return `${DOCS_FOLDER}/${SPEC_FOLDER}/${oasConfig.docRootDirectory}/${localeFilename}`;
  } catch {
    return enPath; // locale file doesn't exist, fall back to English
  }
}

async function main() {
  // docsJson is the parsed representation of the docs.json nav listing for mintlify
  let docsJson = await readJson(`${DOCS_SITE}/docs.json`);

  if (!docsJson) {
    console.error("`docs.json` not found");
    return;
  }
  // loop through each spec in our config
  for (const oasConfig of oasConfigs) {
    const { inputFile, docRootDirectory } = oasConfig;

    const oasData = await readJson(inputFile);

    if (!oasData) {
      console.warn(`${inputFile} not found`);
      continue;
    }

    // the output snippet for docs.json based on what we make
    const collectedDocs = {};
    for (const locale of LOCALES) {
      if (!collectedDocs[locale]) {
        collectedDocs[locale] = {};
      }

      const DOCS_PATH =
        locale === "en"
          ? `${DOCS_FOLDER}/${API_FOLDER}/${docRootDirectory}`
          : `${DOCS_FOLDER}/${locale}/${API_FOLDER}/${docRootDirectory}`;

      const API_ROOT_PATH = `${DOCS_SITE}/${DOCS_PATH}`;

      // INFO: create API root directory and index.mdx once per locale
      try {
        await fs.mkdir(API_ROOT_PATH, { recursive: true });
        await writeApiIndexMdx({
          docpath: API_ROOT_PATH,
          apiName: oasConfig.docSectionNameMap[locale],
        });
      } catch (err) {
        console.error(`failed to create API root: ${API_ROOT_PATH}`, err);
      }

      for (const [path, pathSpec] of Object.entries(oasData.paths)) {
        // INFO: `pathSpec` contains all the methods of this path
        for (const [method, spec] of Object.entries(pathSpec)) {
          // INFO: collect information about this spec
          // figure out the folder and file names
          const folder = kebabCase(spec.tags[0]);
          const filename = kebabCase(spec.summary);
          const releaseLifecycle = spec["x-release-lifecycle"];
          const scopes = getEndpointScopes(spec);

          const docpath = `${DOCS_PATH}/${folder}`;
          const mdxpath = `${DOCS_SITE}/${DOCS_PATH}/${folder}`;

          // INFO: collecting documents to build `docs.json` after loop
          if (!collectedDocs[locale][folder]) {
            collectedDocs[locale][folder] = [];
          }
          collectedDocs[locale][folder].push(`${docpath}/${filename}`);

          // INFO: make folder for api docs section
          try {
            await fs.mkdir(mdxpath, { recursive: true });
          } catch (err) {
            console.error(`failed to create: ${docpath}`, err);
            // TODO: figure out of `break` or `continue` is what we want here
            break;
          }

          // INFO: write MDX file content
          const oasFilePath = await getOasFilePath({ locale, oasConfig });
          try {
            await writeMdxContent({
              // INFO: this is the path to the OAS file relative to docs root
              frontMatter: {
                file: oasFilePath,
                method,
                path,
              },
              content: {
                releaseLifecycle,
                scopes,
              },
              docpath: mdxpath,
              filename,
            });
          } catch (err) {
            // TODO: figure out of `break` or `continue` is what we want here
            continue;
          }

          // INFO: do the code snippet generation
          await injectCodeSnippets(oasData, { spec, path, method, oasConfig });
        }
      }
    } // INFO: end of `LOCALES` loop

    // give it all the data it needs to mutate docsJson with the right info
    docsJson = patchDocsJson({
      oasConfig,
      rawDocs: collectedDocs,
      docsJson,
      oasData,
    });

    // INFO: create `oas` directory if it doesn't exist
    const generatedSpecPath = `${DOCS_SITE}/${SPEC_LOCATION}/${oasConfig.docRootDirectory}`;
    try {
      await fs.mkdir(generatedSpecPath, { recursive: true });
    } catch (err) {
      console.error(`failed to create: ${generatedSpecPath}`, err);
      continue;
    }

    // INFO: write generated OAS to disk
    await fs.writeFile(
      `${generatedSpecPath}/${oasConfig.outputFile}`,
      JSON.stringify(oasData, null, 2),
    );

    // INFO: write mutated `docs.json` to disk
    const docsJsonPath = `${DOCS_SITE}/docs.json`;
    await fs.writeFile(docsJsonPath, JSON.stringify(docsJson, null, 2));
    console.log("Done! 🎉")
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  readJson,
  getEndpointScopes,
  writeMdxContent,
  writeApiIndexMdx,
  getOasFilePath,
  injectCodeSnippets,
  generateCodeBlocks,
  patchDocsJson,
  convertDocsToFormat,
  main,
};
