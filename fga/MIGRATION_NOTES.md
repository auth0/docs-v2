# FGA Docs Migration Notes (Docusaurus → Mintlify)

POC scope: 10 of 88 source pages converted from `github.com/atko-cic/fga-docs` (Docusaurus 3.9.2) into this Mintlify microsite. The patterns and tooling here are designed to scale to the full migration.

## What's in the POC

| Pattern exercised | Page(s) |
|---|---|
| Frontmatter cleanup | All 10 |
| Admonitions (`:::note` → `<Note>` etc.) | `getting-started/perform-check`, `modeling/user-groups`, `migration-instructions` |
| Tabs/TabItem rewrite | `getting-started/perform-check`, `migration-instructions` |
| SVG-as-component imports | `modeling/getting-started` |
| Image asset path rewrite | `getting-started/new-getting-started`, `modeling/getting-started` |
| Branding helpers (ProductName/Concept) | All 10 |
| Related sections (CardGroup) | All except `new-getting-started`, `migration-instructions` |
| Ported viewer components | `intro/fga-concepts`, `getting-started/perform-check`, `modeling/*`, `interacting/managing-user-access` |

## Tooling

Two scripts in `fga/scripts/`:

- **`convert.mjs`** — non-idempotent. Reads a source MDX from `fga-docs/docs/content/` and writes a Mintlify-shaped MDX into `fga/`. Performs five passes:
  1. Strip Docusaurus-only imports (`@theme/Tabs`, `@theme/TabItem`, `@components/Docs`, `@site/static/...`).
  2. Convert `:::note ... :::` → `<Note>...</Note>` and other admonition flavors.
  3. Rewrite `<Tabs groupId>`/`<TabItem value label>` → `<Tabs>`/`<Tab title>` using a static `SupportedLanguage` lookup.
  4. Frontmatter cleanup: drop `sidebar_position`, `toc_max_heading_level`, `id`, `sidebar_label`; rename `slug` → `permalink`.
  5. SVG-as-component import rewrite + branding helper replacement (`<ProductName/>` → `Auth0 FGA`, `<ProductConcept .../>` → markdown link, `<DocumentationNotice/>` removed, `<CardBox>` → `<Card>`, `<ColumnLayout>` → `<Columns>`).
- **`cleanup.mjs`** — idempotent. Operates on the already-written files in `fga/`. Adds viewer imports, replaces unported viewer JSX with `<Tip>` placeholders, rewrites stragglers (`<UpdateProductNameInLinks>`, bare `<ProductConcept/>`, `<SdkSetupHeader>`).

To migrate the remaining 78 pages: extend `POC_PAGES` in `convert.mjs` and `FILES` in `cleanup.mjs` with the source/dest path tuples, then run `node fga/scripts/convert.mjs && node fga/scripts/cleanup.mjs` from the repo root.

## Manual touch-ups still required per page

After both scripts run, each file needs one human pass for:

- **`<RelatedSection ...>`** → `<CardGroup cols={2}>` of `<Card>` elements. Each block has a unique `description` prop and unique `relatedLinks` entries; the convert script could be extended to handle this mechanically, but each link's `href` may need manual remapping (the source uses `./relative-path` Docusaurus paths; Mintlify wants absolute `/route` paths matching the new navigation).
- **JSX prop edge cases** that fall outside the convert.mjs regexes — observed cases: `<ProductConcept linkName="user's"/>` (apostrophe in attribute breaks the regex), `<ProductName/>` with no `format` prop. Watch for these in the cleanup pass.
- **External link remapping**: any Docusaurus-style `../advanced/use-cases/gdrive#02-...` links that point to pages outside the POC subset should be repointed at `https://docs.fga.dev/...` until those pages are migrated.

## Viewer porting

Two of the nine FGA viewer components are ported as Mintlify snippets:

| Snippet | Status | Limitation |
|---|---|---|
| `fga/snippets/CheckRequestViewer.jsx` | Fully functional | None — pure code generation in JS |
| `fga/snippets/AuthzModelSnippetViewer.jsx` | Partial | Renders JSON only by default. `SyntaxFormat.Dsl` falls back to JSON unless the caller passes a pre-computed `dsl` prop. The original uses `@openfga/syntax-transformer` for JSON→DSL conversion; bundling that package into Mintlify's snippet runtime is a follow-up task. |

Seven viewer types are NOT ported — they're replaced with `<Tip>` placeholders by `cleanup.mjs`:

- `BatchCheckRequestViewer`
- `WriteRequestViewer`
- `ListObjectsRequestViewer`
- `ListUsersRequestViewer`
- `ReadChangesRequestViewer`
- `ExpandRequestViewer`
- `RelationshipTuplesViewer`

Each uses the same pattern as `CheckRequestViewer`: a switch over `SupportedLanguage` rendering language-specific code from structured props. To port any of them:

1. Read the source at `fga-docs/src/components/Docs/SnippetViewer/<Name>.tsx`.
2. Translate the per-language string templates to JS (drop type annotations, fix any TS-only syntax).
3. Wrap the result in `<CodeGroup>` of `<pre data-language data-title>` blocks, mirroring `fga/snippets/CheckRequestViewer.jsx`.
4. Export the component plus any constants the MDX consumers reference (e.g. `SupportedLanguage` is re-exported from `CheckRequestViewer.jsx` so calling pages get one canonical reference).
5. Add `cleanup.mjs` skipping the viewer name from `UNPORTED_VIEWERS` and add an `ensureXImport` helper.

Estimated effort per viewer: 1–3 hours, mostly mechanical translation. The source switch statements are large but straightforward.

## docs.json

Modeled on `auth4genai/docs.json`. The key differences:

- `theme: "mint"` (same as auth4genai)
- Auth0 orange palette (`#EB5424`)
- Standalone domain target (`docs.fga.dev`) — all `og:url`, `canonical`, `logo.href` and `seo.metatags` point there
- Five redirects ported from `fga-docs/docusaurus.config.js`
- Only the POC subset of pages is in `navigation.tabs[0].groups`. Extending requires adding entries that match the on-disk path under `fga/`.

## Follow-up work for the team

1. **Extend POC list and re-run scripts** for the remaining 78 pages.
2. **Port the seven remaining viewer types** (start with `WriteRequestViewer` — most-used after the two already done).
3. **Solve the DSL transformation problem** in `AuthzModelSnippetViewer` (bundle `@openfga/syntax-transformer` or pre-compute DSL during conversion).
4. **Replace external `https://docs.fga.dev/...` placeholder links** with internal `/...` links once the target pages exist in this microsite.
5. **Confirm brand**: Auth0 orange used as default. Adjust if FGA gets a distinct palette.
6. **Cross-link from `auth4genai/mcp/get-started/secure-mcp-server-with-auth0-fga.mdx`** to relevant pages in the new `fga/` microsite once it's live.
7. **Mintlify project setup**: a new Mintlify project pointing at `fga/` and DNS for `docs.fga.dev` is out of scope for this POC.
