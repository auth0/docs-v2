// Mintlify port of fga-docs/src/components/Docs/SnippetViewer/CheckRequestViewer.tsx.
// Renders multi-language SDK code for an FGA check() call inside a Mintlify <CodeGroup>.

import {
  SupportedLanguage,
  languageLabel,
  languageHighlight,
  DefaultAuthorizationModelId,
} from "/snippets/SupportedLanguage.jsx";

function generate(lang, opts) {
  const { user, relation, object, allowed, contextualTuples, context, headers } = opts;
  const modelId = opts.authorizationModelId || DefaultAuthorizationModelId;

  switch (lang) {
    case SupportedLanguage.PLAYGROUND:
      return `is ${user} related to ${object} as ${relation}?
${contextualTuples ? "\n# Note: Contextual Tuples are not supported on the playground" : ""}${context ? "\n# Note: Check context is not supported on the playground" : ""}${headers ? "\n# Note: Custom headers are not supported on the playground" : ""}

# Response: ${allowed ? "A green path from the user to the object" : "A red object"} indicating that the response from the API is \`{"allowed":${allowed ? "true" : "false"}}\`
`;

    case SupportedLanguage.CLI:
      return `fga query check --store-id=$FGA_STORE_ID${modelId ? ` --model-id=${modelId}` : ""} ${user} ${relation} ${object}${
        contextualTuples
          ? contextualTuples
              .map((t) => ` --contextual-tuple "${t.user} ${t.relation} ${t.object}"`)
              .join(" ")
          : ""
      }${context ? ` --context='${JSON.stringify(context)}'` : ""}${
        headers ? "\n# Note: Custom headers are not supported in the CLI" : ""
      }

# Response: {"allowed":${allowed}}`;

    case SupportedLanguage.CURL:
      return `curl -X POST $FGA_API_URL/stores/$FGA_STORE_ID/check \\
  -H "Authorization: Bearer $FGA_API_TOKEN" \\
  -H "content-type: application/json" \\${
    headers
      ? Object.entries(headers)
          .map(([k, v]) => `\n  -H "${k}: ${v}" \\`)
          .join("")
      : ""
  }
  -d '{${modelId ? `"authorization_model_id": "${modelId}", ` : ""}"tuple_key":{"user":"${user}","relation":"${relation}","object":"${object}"}${
    contextualTuples
      ? `,"contextual_tuples":{"tuple_keys":[${contextualTuples
          .map(
            (t) =>
              `{"user":"${t.user}","relation":"${t.relation}","object":"${t.object}"}`,
          )
          .join(",")}]}`
      : ""
  }${context ? `,"context":${JSON.stringify(context)}}` : "}"}'

# Response: {"allowed":${allowed}}`;

    case SupportedLanguage.JS_SDK:
      return `// Run a check
const { allowed } = await fgaClient.check({
    user: '${user}',
    relation: '${relation}',
    object: '${object}',${
      contextualTuples
        ? `\n    contextualTuples: [\n      ${contextualTuples
            .map((t) => JSON.stringify(t))
            .join(",\n      ")}\n    ],`
        : ""
    }${context ? `\n    context: ${JSON.stringify(context)}\n  ` : "\n  "}}, {${
        modelId ? `\n    authorizationModelId: '${modelId}',` : ""
      }${
        headers && Object.keys(headers).length
          ? `\n    headers: {\n${Object.entries(headers)
              .map(([k, v]) => `      "${k}": "${v}",`)
              .join("\n")}\n    },`
          : ""
      }
});

// allowed = ${allowed}`;

    case SupportedLanguage.GO_SDK:
      return `options := ClientCheckOptions{${
        modelId ? `\n    AuthorizationModelId: openfga.PtrString("${modelId}"),` : ""
      }${
        headers && Object.keys(headers).length
          ? `\n    RequestOptions: RequestOptions{\n        Headers: map[string]string{\n${Object.entries(
              headers,
            )
              .map(([k, v]) => `            "${k}": "${v}"`)
              .join(",\n")}\n        }\n    }`
          : ""
      }
}

body := ClientCheckRequest{
    User:     "${user}",
    Relation: "${relation}",
    Object:   "${object}",${
      contextualTuples
        ? `\n    ContextualTuples: []ClientTupleKey{\n${contextualTuples
            .map(
              (t) =>
                `        {\n            User:     "${t.user}",\n            Relation: "${t.relation}",\n            Object:   "${t.object}",\n        },`,
            )
            .join("\n")}\n    },`
        : ""
    }${context ? `\n    Context: &map[string]interface{}${JSON.stringify(context)},` : ""}
}

data, err := fgaClient.Check(context.Background()).
    Body(body).
    Options(options).
    Execute()

// data = { allowed: ${allowed} }`;

    case SupportedLanguage.DOTNET_SDK:
      return `var options = new ClientCheckOptions {
    AuthorizationModelId = "${modelId}"${
      headers && Object.keys(headers).length
        ? `,\n    Headers = new Dictionary<string, string> {\n${Object.entries(headers)
            .map(([k, v]) => `        { "${k}", "${v}" }`)
            .join(",\n")}\n    }`
        : ""
    }
};
var body = new ClientCheckRequest {
    User = "${user}",
    Relation = "${relation}",
    Object = "${object}",${
      contextualTuples
        ? `\n    ContextualTuples = new List<ClientTupleKey> {\n${contextualTuples
            .map(
              (t) =>
                `    new(user: "${t.user}", relation: "${t.relation}", _object: "${t.object}")`,
            )
            .join(",\n")}\n    }`
        : ""
    }${
      context
        ? `\n    Context = new { ${Object.entries(context)
            .map(([k, v]) => `${k}="${v}"`)
            .join(",")} }`
        : ""
    }
};
var response = await fgaClient.Check(body, options);

// response.Allowed = ${allowed}`;

    case SupportedLanguage.PYTHON_SDK:
      return `options = {${modelId ? `\n    "authorization_model_id": "${modelId}",` : ""}${
        headers && Object.keys(headers).length
          ? `\n    "headers": {\n${Object.entries(headers)
              .map(([k, v]) => `        "${k}": "${v}"`)
              .join(",\n")}\n    }`
          : ""
      }
}
body = ClientCheckRequest(
    user="${user}",
    relation="${relation}",
    object="${object}",${
      contextualTuples
        ? `\n    contextual_tuples=[\n${contextualTuples
            .map(
              (t) =>
                `        ClientTuple(user="${t.user}", relation="${t.relation}", object="${t.object}")`,
            )
            .join(",\n")}\n    ],`
        : ""
    }${
      context
        ? `\n    context=dict(${Object.entries(context)
            .map(([k, v]) => `${k}="${v}"`)
            .join(",")})`
        : ""
    }
)

response = await fga_client.check(body, options)

# response.allowed = ${allowed}
`;

    case SupportedLanguage.RPC:
      return `check(
  user = "${user}", // check if the user \`${user}\`
  relation = "${relation}", // has an \`${relation}\` relation
  object = "${object}", // with the object \`${object}\`
  ${
    contextualTuples
      ? `contextual_tuples = [\n    ${contextualTuples
          .map(
            (t) =>
              `{user = "${t.user}", relation = "${t.relation}", object = "${t.object}"}`,
          )
          .join(",\n    ")}\n  ],`
      : ""
  }${
    context
      ? `\n  context = { ${Object.entries(context)
          .map(([k, v]) => `${k} = "${v}"`)
          .join(", ")} },`
      : ""
  } authorization_id = "${modelId}"
);

Reply: ${allowed}`;

    case SupportedLanguage.JAVA_SDK: {
      const ct = contextualTuples
        ? `\n        .contextualTuples(\n            List.of(${contextualTuples
            .map(
              (t) =>
                `\n                new ClientTupleKey()\n                    .user("${t.user}")\n                    .relation("${t.relation}")\n                    ._object("${t.object}")`,
            )
            .join(",")}\n            ))`
        : "";
      const ctx = context
        ? `\n        .context(Map.of(${Object.entries(context)
            .map(([k, v]) => `"${k}", "${v}"`)
            .join(",")}))`
        : "";
      return `var options = new ClientCheckOptions()${
        modelId ? `\n        .authorizationModelId("${modelId}")` : ""
      };

var body = new ClientCheckRequest()
        .user("${user}")
        .relation("${relation}")
        ._object("${object}")${ct}${ctx};

var response = fgaClient.check(body, options).get();

// response.getAllowed() = ${allowed}`;
    }

    default:
      return `// Unsupported language: ${lang}`;
  }
}

const DEFAULT_LANGS = [
  SupportedLanguage.JS_SDK,
  SupportedLanguage.GO_SDK,
  SupportedLanguage.DOTNET_SDK,
  SupportedLanguage.PYTHON_SDK,
  SupportedLanguage.JAVA_SDK,
  SupportedLanguage.CLI,
  SupportedLanguage.CURL,
  SupportedLanguage.RPC,
  SupportedLanguage.PLAYGROUND,
];

export const CheckRequestViewer = (opts) => {
  const langs = opts.allowedLanguages?.length ? opts.allowedLanguages : DEFAULT_LANGS;
  return (
    <CodeGroup>
      {langs.map((lang) => (
        <pre
          key={lang}
          data-language={languageHighlight[lang]}
          data-title={languageLabel[lang]}
        >
          <code>{generate(lang, opts)}</code>
        </pre>
      ))}
    </CodeGroup>
  );
};

export { SupportedLanguage } from "/snippets/SupportedLanguage.jsx";
