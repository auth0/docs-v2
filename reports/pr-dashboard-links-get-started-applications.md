# PR: Dashboard links — get-started/applications

Branch: `dashboard-links/get-started-applications`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/get-started/applications --report=reports/links-get-started-applications-en.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/ja-jp/get-started/applications --report=reports/links-get-started-applications-ja-jp.csv
node scripts/update-dashboard-links.js --fix --path=main/docs/fr-ca/get-started/applications --report=reports/links-get-started-applications-fr-ca.csv
```

Split out of `get-started` because the full section (283 files) exceeded the ~150-file PR size guide; `applications` alone is 87 files.

## Result

87 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: 0 errors.

Reports: `reports/links-get-started-applications-{en,ja-jp,fr-ca}.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
