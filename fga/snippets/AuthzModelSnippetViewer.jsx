// Mintlify port of fga-docs/src/components/Docs/AuthorizationModel/AuthzModelSnippetViewer.tsx.
//
// Limitation: the original viewer derives DSL syntax from JSON via @openfga/syntax-transformer,
// an npm package that this snippet runtime does not yet bundle. POC behavior:
//   - SyntaxFormat.Json (default): renders the configuration object as pretty-printed JSON.
//   - SyntaxFormat.Dsl: requires the caller to pass a pre-computed `dsl` string prop. If
//     `dsl` is absent the JSON is rendered with a note that DSL is not available.
// For the full migration the team should either bundle @openfga/syntax-transformer or
// pre-render DSL strings during the conversion pass.

import { SyntaxFormat } from "/snippets/SupportedLanguage.jsx";

function renderJson(configuration, skipVersion) {
  const cleaned = { ...configuration, id: "" };
  let out = JSON.stringify(cleaned, null, "  ").replace(',\n  "id": ""', "");
  if (skipVersion) {
    out = out.replace('  "schema_version": "1.1",\n', "");
  }
  return out;
}

const SYNTAX_LABEL = { json: "JSON", dsl: "DSL" };
const SYNTAX_HIGHLIGHT = { json: "json", dsl: "fga" };

export const AuthzModelSnippetViewer = ({
  configuration,
  syntaxesToShow = [SyntaxFormat.Dsl],
  skipVersion,
  dsl,
}) => {
  const formats = Array.isArray(syntaxesToShow) && syntaxesToShow.length
    ? syntaxesToShow
    : [SyntaxFormat.Dsl];

  const codeFor = (format) => {
    if (format === SyntaxFormat.Dsl) {
      if (dsl) return dsl;
      return `# DSL not available — configuration shown as JSON.\n# To render DSL, pass dsl="..." or bundle @openfga/syntax-transformer.\n\n${renderJson(configuration, skipVersion)}`;
    }
    return renderJson(configuration, skipVersion);
  };

  if (formats.length === 1) {
    const f = formats[0];
    return (
      <pre data-language={SYNTAX_HIGHLIGHT[f]} data-title={SYNTAX_LABEL[f]}>
        <code>{codeFor(f)}</code>
      </pre>
    );
  }

  return (
    <CodeGroup>
      {formats.map((f) => (
        <pre key={f} data-language={SYNTAX_HIGHLIGHT[f]} data-title={SYNTAX_LABEL[f]}>
          <code>{codeFor(f)}</code>
        </pre>
      ))}
    </CodeGroup>
  );
};

export { SyntaxFormat } from "/snippets/SupportedLanguage.jsx";
