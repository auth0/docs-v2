# PR: Dashboard links — manage-users

Branch: `dashboard-links/manage-users`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/manage-users --report=reports/links-manage-users-en.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/ja-jp/manage-users --report=reports/links-manage-users-ja-jp.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/fr-ca/manage-users --report=reports/links-manage-users-fr-ca.csv
```

## Result

198 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: `node scripts/check-dashboard-links.js $(git diff --name-only main -- '*.mdx')` reports 0 errors.

Reports: `reports/links-manage-users-en.csv`, `reports/links-manage-users-ja-jp.csv`, `reports/links-manage-users-fr-ca.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
