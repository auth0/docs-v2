# PR: Dashboard links — authenticate/login, database-connections, passwordless, custom-token-exchange, enterprise-connections.mdx

Branch: `dashboard-links/authenticate-rest`

Third and final split of `authenticate` (334 files total exceeded the ~150-file guide; see `dashboard-links/authenticate-identity-providers` and `dashboard-links/authenticate-sso-protocols` for the other two).

Includes the top-level `database-connections.mdx` and `enterprise-connections.mdx` files, which needed a direct lib call rather than `--path` — see note below.

## Known script gap found during this branch

`update-dashboard-links.js --path=<single-file>.mdx` silently scans 0 files instead of processing that file. `walkMdx()` calls `fs.readdirSync()` on the path and swallows the ENOTDIR error, returning an empty list. This isn't visible unless you compare the dry-run's expected per-file list against what actually changed — I caught it because two top-level files (`database-connections.mdx`, `enterprise-connections.mdx`) were missing from this section's otherwise-complete coverage. Worked around manually for these two files using the shared lib directly; recommend `walkMdx` be fixed to accept a file path (treat it as a 1-element list) before relying on `--path=<file>` again.

## Result

121 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: 0 errors. Combined with the other two authenticate branches: 343 files, matching the dry-run's full expected count for the section exactly.

Reports: `reports/links-authenticate-rest-{en,ja-jp,fr-ca}.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
