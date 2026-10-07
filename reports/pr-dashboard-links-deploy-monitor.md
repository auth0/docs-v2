# PR: Dashboard links — deploy-monitor

Branch: `dashboard-links/deploy-monitor`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/deploy-monitor --report=reports/links-deploy-monitor-en.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/ja-jp/deploy-monitor --report=reports/links-deploy-monitor-ja-jp.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/fr-ca/deploy-monitor --report=reports/links-deploy-monitor-fr-ca.csv
```

## Result

21 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: `node scripts/check-dashboard-links.js $(git diff --name-only main -- '*.mdx')` reports 0 errors.

Reports: `reports/links-deploy-monitor-en.csv`, `reports/links-deploy-monitor-ja-jp.csv`, `reports/links-deploy-monitor-fr-ca.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
