# PR: Dashboard links — quickstart/native + quickstart/spa

Branch: `dashboard-links/quickstart-native-spa`

## Command run

```
node scripts/update-dashboard-links.js --fix --path=main/docs/quickstart/native --report=...
node scripts/update-dashboard-links.js --fix --path=main/docs/quickstart/spa --report=...
```
(repeated for ja-jp/ and fr-ca/)

Second half of the `quickstart` split (see `dashboard-links/quickstart-webapp-backend` for the first half and the reason for splitting). `quickstart/agent-skills.mdx` has one dashboard link but it's a bare root URL (`unchanged-root`), so no change was needed there.

## Result

66 .mdx files changed across en/ja-jp/fr-ca. Guardrail check: 0 errors.

Reports: `reports/links-quickstart-native-spa-{en,ja-jp,fr-ca}.csv`

## Reviewers

Writers team (`@auth0/project-docs-writers-codeowner`), content-only change.
