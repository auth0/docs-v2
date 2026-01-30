const { readFile, writeFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const { SnippetResolver } = require("@fern-api/auth0-management-snippets");

const resolver = new SnippetResolver();

const oasFiles = [
  {
    file: "management-api-openapi.json",
    destination: "management/v2",
  },
  {
    file: "authenitcation-api-openapi31.json",
    destination: "authentication",
  },
  {
    file: "myaccount-api-openapi.json",
    destination: "myaccount",
  },
];

const languages = ["typescript", "go"];

async function readfile(file) {
  try {
    const filepath = resolve("main", file);
    const result = await readFile(filepath, { encoding: "utf8" });
    const data = JSON.parse(result);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function writefile(oas, data) {
  const { file, destination } = oas;
  try {
    const [filename, extension] = file.split(".");
    const filepath = resolve(
      `main/oas/${destination}`,
      `${filename}-gen.${extension}`,
    );
    return writeFile(filepath, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function main() {
  for (const oas of oasFiles) {
    const { file } = oas;
    if (file !== "management-api-openapi.json") {
      // INFO: bail out of any other API for now
      continue;
    }

    let data = {};
    try {
      data = await readfile(filename);
    } catch (err) {
      console.error(`error processing: ${oas}`, err);
      // INFO: bail out of processing this file
      continue;
    }

    for (const [path, pathSpec] of Object.entries(data.paths)) {
      // INFO: `pathSpec` contains all the methods of thes path
      for (const [method, spec] of Object.entries(pathSpec)) {
        // INFO: use `spec` to generate code sample
        if (!data.paths[path][method]["x-codeSamples"]) {
          data.paths[path][method]["x-codeSamples"] = [];
        }

        for (const language of languages) {
          console.group("generateing");
          console.log("language:", language);
          console.log("path:", path);
          console.log("method:", method);

          const {
            parameters = [],
            requestBody: specRequestBody = {},
            security,
          } = spec;
          const { content } = specRequestBody;

          console.log("spec:", {
            parameters,
            content: content && content["application/json"],
          });

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
            console.error("generate error:", err);
            console.groupEnd();
            // INFO: bail out if snippets fail
            continue;
          }

          const block = {
            lang: language,
            label: spec.summary,
            source: response.snippet,
          };

          console.log("block:", block);
          console.groupEnd();

          data.paths[path][method]["x-codeSamples"].push(block);

          if (language === "typescript") {
            data.paths[path][method]["x-codeSamples"].push({
              ...block,
              lang: "javascript",
            });
          }
        }
      }
    }

    await writefile(oas, JSON.stringify(data, null, 2));
  }
}

main();
