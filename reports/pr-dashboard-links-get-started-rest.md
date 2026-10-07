# PR: Dashboard links — get-started (excluding applications/)

Branch: `dashboard-links/get-started-rest`

## Command run

Run once per subfolder (architecture-scenarios, auth0-mcp-server, auth0-overview, auth0-teams, authentication-and-authorization-flow, b2b-connect-enterprise, dashboard-profile, identity-fundamentals, manage-dashboard-access, tenant-settings, universal-components) and once per top-level `.mdx` file directly under `get-started/`, across en/ja-jp/fr-ca:

```
node scripts/update-dashboard-links.js --fix --path=main/docs/get-started/<subfolder-or-file>
```

`applications/` is deliberately excluded — it shipped as its own branch, `dashboard-links/get-started-applications` (87 files), because the full `get-started` section (283 files) exceeded the ~150-file PR size guide. Running `--fix --path=main/docs/get-started` directly would re-touch `applications/` and duplicate that PR's diff, so each subtree was scoped individually instead.

The `apis/` subfolder and four top-level files (`applications.mdx`, `auth0-teams.mdx`, `b2b-connect-enterprise.mdx`, `tenant-settings.mdx`) were missed in the first enumeration pass and added in a follow-up commit, caught by diffing this branch's changed-file set against the dry-run's full expected list for `get-started` (every PR in this project was checked this way before being called complete).

## Result

196 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: 0 errors. Combined with `dashboard-links/get-started-applications`: 283 files, matching the dry-run's full expected count for `get-started` exactly (verified file-by-file across all content branches in this project: 1687/1687, zero missing, zero double-processed).

Reports: `reports/links-get-started-rest-{en,ja-jp,fr-ca}.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
