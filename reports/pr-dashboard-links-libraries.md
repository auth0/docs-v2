# PR: Dashboard links — libraries

Branch: `dashboard-links/libraries`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/libraries --report=reports/links-libraries-en.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/ja-jp/libraries --report=reports/links-libraries-ja-jp.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/fr-ca/libraries --report=reports/links-libraries-fr-ca.csv
```

## Result

36 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: `node scripts/check-dashboard-links.js $(git diff --name-only main -- '*.mdx')` reports 0 errors.

Reports: `reports/links-libraries-en.csv`, `reports/links-libraries-ja-jp.csv`, `reports/links-libraries-fr-ca.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
