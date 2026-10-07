# PR: Dashboard links — get-started (excluding applications/)

Branch: `dashboard-links/get-started-rest`

## Command run

Run once per subfolder (architecture-scenarios, auth0-mcp-server, auth0-overview, auth0-teams, authentication-and-authorization-flow, b2b-connect-enterprise, dashboard-profile, identity-fundamentals, manage-dashboard-access, tenant-settings, universal-components) and once per top-level `.mdx` file directly under `get-started/`, across en/ja-jp/fr-ca:

```
node scripts/update-dashboard-links.js --fix --path=main/docs/get-started/<subfolder-or-file>
```

`applications/` is deliberately excluded — it shipped as its own branch, `dashboard-links/get-started-applications` (87 files), because the full `get-started` section (283 files) exceeded the ~150-file PR size guide. Running `--fix --path=main/docs/get-started` directly would re-touch `applications/` and duplicate that PR's diff, so each subtree was scoped individually instead.

## Result

159 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: 0 errors.

Reports: `reports/links-get-started-rest-{en,ja-jp,fr-ca}.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
