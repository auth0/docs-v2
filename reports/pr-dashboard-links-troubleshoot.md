# PR: Dashboard links — troubleshoot

Branch: `dashboard-links/troubleshoot`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/troubleshoot --report=reports/links-troubleshoot-en.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/ja-jp/troubleshoot --report=reports/links-troubleshoot-ja-jp.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/fr-ca/troubleshoot --report=reports/links-troubleshoot-fr-ca.csv
```

## Result

66 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: `node scripts/check-dashboard-links.js $(git diff --name-only main -- '*.mdx')` reports 0 errors.

Reports: `reports/links-troubleshoot-en.csv`, `reports/links-troubleshoot-ja-jp.csv`, `reports/links-troubleshoot-fr-ca.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
