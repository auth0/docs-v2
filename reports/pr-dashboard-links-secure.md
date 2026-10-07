# PR: Dashboard links — secure

Branch: `dashboard-links/secure`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/secure --report=reports/links-secure-en.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/ja-jp/secure --report=reports/links-secure-ja-jp.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/fr-ca/secure --report=reports/links-secure-fr-ca.csv
```

## Result

180 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: `node scripts/check-dashboard-links.js $(git diff --name-only main -- '*.mdx')` reports 0 errors.

Reports: `reports/links-secure-en.csv`, `reports/links-secure-ja-jp.csv`, `reports/links-secure-fr-ca.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
