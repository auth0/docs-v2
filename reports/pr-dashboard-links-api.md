# PR: Dashboard links — api

Branch: `dashboard-links/api`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/api --report=reports/links-api-en.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/ja-jp/api --report=reports/links-api-ja-jp.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/fr-ca/api --report=reports/links-api-fr-ca.csv
```

## Result

15 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: `node scripts/check-dashboard-links.js $(git diff --name-only main -- '*.mdx')` reports 0 errors.

Reports: `reports/links-api-en.csv`, `reports/links-api-ja-jp.csv`, `reports/links-api-fr-ca.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
