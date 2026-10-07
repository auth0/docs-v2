# PR: Dashboard links — quickstart/webapp + quickstart/backend

Branch: `dashboard-links/quickstart-webapp-backend`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/quickstart/webapp --report=...
node scripts/update-dashboard-links.js --fix --path=main/docs/quickstart/backend --report=...
```
(repeated for ja-jp/ and fr-ca/)

Split out of `quickstart` because the full section (216 files) exceeded the ~150-file PR size guide. webapp (81) + backend (69) = 150; native + spa ship in a separate branch.

## Result

150 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: 0 errors.

Reports: `reports/links-quickstart-webapp-backend-{en,ja-jp,fr-ca}.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
