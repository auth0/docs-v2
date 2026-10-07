# PR: Dashboard link rewrite tooling

Branch: `dashboard-links/tooling`

## Command run

```
node scripts/update-dashboard-links.js --report=reports/links-dry-run.csv
```
(dry run only — this PR ships no content changes)

## What's in this PR

- `scripts/update-dashboard-links.js` — Track 1 rewriter (dry-run default, `--fix` opt-in)
- `scripts/check-dashboard-links.js` — CI guardrail, closes the gap left by `lychee.toml`'s exclusion of `manage.auth0.com`
- `scripts/lib/{args,csv,mdx,dashboard-links}.js` — shared helpers
- `scripts/data/dashboard-link-map.json` — 138 entries imported from the "New Dashboard links" sheet tab (131 original + 7 added for tenant-specific links, see below)
- `scripts/data/dashboard-link-patterns.json` — 9 shape rules for URLs with an id/placeholder segment
- `scripts/data/dashboard-link-policy.json` — guardrail rules
- `.github/workflows/dashboard-link-check.yml` — guardrail workflow, mirrors `link-check.yml`
- Test fixtures and `.gitignore` additions for the screenshot pipeline (added ahead of its own tooling PR)

## Decisions locked in this PR

1. **Blessed tenant-agnostic Dashboard URL form: `https://manage.auth0.com/dashboard/#/...`.** All 131 rows in the "New Dashboard links" sheet already target this form exclusively (confirmed by scanning every `new` value in the imported map); there was no real three-way competition once the sheet was decoded. The 9 pattern-rule placeholders (`REPLACE_WITH_BLESSED_FORM`) are now filled with this prefix, and `dashboard-link-policy.json` moved `/dashboard/*/` into `reject` and deleted the `/dashboard/#/` pending-decision entry.
2. **Tenant-specific links are rewritten, not left.** `dev-6endizjt`, `dev-gja8kxz4ndtex3rq`, `auth0-dsepaid` are seeded/leaked test-tenant names. `dashboard-link-policy.json` now rejects them under CI. 7 of these had no map entry (they were falling into `unmatched`); each was verified by hand to be an exact duplicate (different tenant prefix, same path) of an already-mapped tenant-agnostic URL in the sheet, and added to the map accordingly — not guessed.

## Dry-run counts (after the above, full tree, all locales + main/ai)

```
locale           rewritten pattern-rewritten    unchanged-root     unchanged-new       needs-human         unmatched
en                    1083                 1               171                24                 9                 0
fr-ca                 1073                 1               165                23                 9                 0
ja-jp                 1073                 1               165                23                 9                 0
total                 3229                 3               501                70                27                 0
```

`unmatched` is 0. The 27 remaining `needs-human` rows are genuinely malformed source URLs (`%7D`/`%7B` encoding, `/?/`, `/*/` wildcard without prefix, doubled `#/`) — see `reports/links-dry-run.csv` for the full per-line list. These need a hand fix in the content PRs, not a tooling change.

## Known gap found during setup

`main/snippets/**/*.mdx` (259 files) has 28 dashboard-link occurrences but is **not** in the rewriter's `DEFAULT_SCAN` (`main/docs`, `main/ai` only). The guardrail *does* scan all of `main/` by default, so `check-dashboard-links.js` with no file args currently reports errors in `main/snippets/`. Options: add `main/snippets` to `DEFAULT_SCAN` and give it its own content PR, or scope the guardrail's default scan to exclude it until a snippets PR lands. Flagging for a decision before this workflow goes live — right now it would be red on `main` the moment it merges.

## Reviewers

Both CODEOWNERS teams: `.github` and `scripts/data` route through `@auth0/project-docs-management-codeowner`; the workflow file touches `.github` so `@auth0/project-docs-writers-codeowner` should also look.
