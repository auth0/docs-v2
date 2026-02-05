const { readFile, writeFile, mkdir } = require("node:fs/promises");
const { resolve } = require("node:path");
const { SnippetResolver } = require("@fern-api/auth0-management-snippets");

const resolver = new SnippetResolver();

// supported languages/locales for the script
const LOCALES = ["en"];
// supported code snippet languages
const LANGUAGES = ["typescript", "go"];
// this is what gets added to all converted json apis
const prefix = "oas-";
const oasFiles = [
    {
        file: "management-api-openapi.json",
        destination: "management/v2",
        friendly: "Management API"
    },
    // {
    //     file: "authenitcation-api-openapi31-gen.json",
    //     destination: "authentication",
    // },
    // {
    //     file: "myaccount-api-openapi-gen.json",
    //     destination: "myaccount",
    // },
];

async function main() {
    // docsJson is the parsed representation of the docs.json nav listing for mintlify
    let docsJson;
    const jsonPath = resolve("main/docs.json");
    try {
        const rawData = await readFile(jsonPath, { encoding: "utf8" });
        docsJson = JSON.parse(rawData);
    } catch (err) {
        console.error("Parsing failed", err);
    }
    // loop through each spec in our config
    for (const oas of oasFiles) {
        const { file } = oas;
        // the eventual parsed spec
        let data = {};
        try {
            // resolving, reading, and parsing the spec
            const specPath = resolve(`main/${file}`);
            console.log("specPath:", specPath);
            const rawData = await readFile(specPath, { encoding: "utf8" });
            data = JSON.parse(rawData);
        } catch (err) {
            console.error(`error processing: ${oas}`, err);
            // INFO: bail out of processing this file
            continue;
        }

        // the output snippet for docs.json based on what we make
        let docs = {};
        for (const [path, pathSpec] of Object.entries(data.paths)) {
            // INFO: `pathSpec` contains all the methods of this path
            for (const [method, spec] of Object.entries(pathSpec)) {
                // figure out the folder and file names
                const folder = data.paths[path][method].tags[0];
                const fileName = convertPathToName(data.paths[path][method].summary);
                // build the docs tree as we go
                if (docs.hasOwnProperty(folder) === false) {
                    docs[folder] = [];
                }
                docs[folder].push(`docs/api/${oas.destination}/${folder}/${fileName}`);
                const basePath = `main/docs/api/${oas.destination}/${folder}`;
                const mdxPath = resolve(`${basePath}/${fileName}`);
                // the base snippet and scopes snippet make up the entire file
                const mdxContent = formatSnippet(oas, path, method) + formatScopeSnippet(data.paths[path][method]);
                // create the directory so we have a place to write files
                const outputPath = resolve(`${basePath}`);
                await mkdir(outputPath, { recursive: true });
                await writeFile((mdxPath + ".mdx"), mdxContent);
                // do the code snippet generation
                if (!data.paths[path][method]["x-codeSamples"]) {
                    data.paths[path][method]["x-codeSamples"] = [];
                }
                // iterate through each of the supported code snippet languages
                for (const language of LANGUAGES) {
                    const block = generateCodeBlocks(language, spec, path, method);
                    // block being false means the code snippets failed to generation, we should skip this
                    if (block === false) { continue; }
                    data.paths[path][method]["x-codeSamples"].push(block);
                    // todo: remove this and do it for all
                    if (language === "typescript") {
                        data.paths[path][method]["x-codeSamples"].push({
                            ...block,
                            lang: "javascript",
                        });
                    }
                }
            }
        }
        // give it all the data it needs to mutate docsJson with the right info
        docsJson = patchDocsJson(oas, docs, docsJson);
        await writeFile(jsonPath, JSON.stringify(docsJson, null, 2));
        // actually write the spec
        const newSpecPath = resolve(`main/oas/${oas.destination}/${prefix}${file}`);
        // this isn't present in the original, but that presents problems i think?
        data.openapi = "3.1.0";
        await writeFile(newSpecPath, JSON.stringify(data, null, 2));   
    }
}

main();

function convertPathToName(path) {
    let cleanPath = path.replace(/[()'\.]/g, "");
    return `${cleanPath.toLowerCase().split(" ").join("-")}`
}

// creates the base snippet
function formatSnippet(oas, path, method) {
    return `---
openapi: ${prefix}${oas.file} ${method} ${path}
---
`;
}

// create the additional scopes section below it
function formatScopeSnippet(obj) {
    const targetKey = "oAuth2ClientCredentials";
    const scopeArrStr = obj.security.find(item => item.hasOwnProperty(targetKey))?.[targetKey];
    // don't @ me on the weird joining, it's fast and i'm old
    return `
import { Scopes } from "/snippets/ApiScopes.jsx";
import { ReleaseLifecycle } from "/snippets/ApiReleaseLifecycle.jsx";
<ReleaseLifecycle releaseLifecycle="${obj["x-release-lifecycle"]}" />
<Scopes scopes={["${scopeArrStr.join("\", \"")}"]} />
`;
}

function convertDocsToFormat(docs) {
    const data = { group: " ", pages: [] };
    // at the level of the api (management, account, etc)
    for (const folder in docs) {
        data.pages.push({ group: toTitle(folder), pages: docs[folder] })
        // at the level of the folder (actions, users, etc)
    }
    return data;
}

function patchDocsJson(oas, rawDocs, docsJson) {
    // this gets the raw doc snippet into the right format
    const docs = convertDocsToFormat(rawDocs);
    // loop through languages 
    for (const lang of LOCALES) {
        // where is our current language's object at in the docs.json
        const langIdx = docsJson.navigation.languages.findIndex(item => item.language === lang);
        // this is the language "object" that contains navigation for the site
        const langObj = docsJson.navigation.languages[langIdx];
        // within the language, where in the api reference section
        const refIdx = langObj.tabs.findIndex(item => item.tab === "API References");
        // within the api reference section, where is the specific api we're interested in
        let apiIdx = langObj.tabs[refIdx].dropdowns.findIndex(item => item.dropdown === oas.friendly);
        // now let's see if our specific api exists in the nav
        if (apiIdx === -1) {
            // let's set the correct index (it will be correct shortly)
            apiIdx = docsJson.navigation.languages[langIdx].tabs[refIdx].dropdowns.length;
            // start a new api explorer nav item
            docsJson.navigation.languages[langIdx].tabs[refIdx].dropdowns.push({
                "dropdown": oas.friendly,
                "description": `Auth0 ${oas.friendly} Documentation`,
                "icon": "list",
                "pages": []
            });
        }
        // now either way (existed before or not), we can replace the found nav object's pages
        docsJson.navigation.languages[langIdx].tabs[refIdx].dropdowns[apiIdx].pages = [`docs/api/${oas.destination}/index`, docs];
    }
    return docsJson;
}

function toTitle(str) {
    return str.toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

async function generateCodeBlocks(language, spec, path, method) {
    const {
        parameters = [],
        requestBody: specRequestBody = {},
        security,
    } = spec;
    const { content } = specRequestBody;

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
        return false;
    }
    return {
        lang: language,
        label: spec.summary,
        source: response.snippet,
    };
}