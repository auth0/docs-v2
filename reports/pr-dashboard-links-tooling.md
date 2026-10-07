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

## Bug fixed in this PR

`classify()` in `scripts/lib/dashboard-links.js` checked the raw-shape `isMalformed()` heuristic (wildcard, encoded brace, double hash) *before* consulting the map, so a URL that looks malformed but has an explicit, correct map entry was routed to `needs-human` instead of being rewritten. Reordered: map lookup first, `isMalformed()` only as a fallback for URLs the map doesn't cover. Fixed 3 real URL shapes (the `self-service-profiles` wildcard link, `#/*/logs`, and the double-hash okta-integration-network link), rescuing 15 occurrences across locales. Added a regression test and a fixture map entry covering it.

## Dry-run counts (after the above, full tree, all locales + main/ai)

```
locale           rewritten pattern-rewritten    unchanged-root     unchanged-new       needs-human         unmatched
en                    1088                 1               171                24                 4                 0
fr-ca                 1078                 1               165                23                 4                 0
ja-jp                 1078                 1               165                23                 4                 0
total                 3244                 3               501                70                12                 0
```

`unmatched` is 0. The 12 remaining `needs-human` rows are all explicitly `changeType: malformed` in the sheet (`REMOVE - malformed URL in docs`) — `%7D` encoding on `#/applications`, `#/apis`, `#/rules`. These are genuine docs typos needing a human to fix the surrounding sentence, not a script decision. See `reports/links-dry-run.csv` for the full per-line list.

## Known gap found during setup

`main/snippets/**/*.mdx` (259 files) has 28 dashboard-link occurrences but is **not** in the rewriter's `DEFAULT_SCAN` (`main/docs`, `main/ai` only). The guardrail *does* scan all of `main/` by default, so `check-dashboard-links.js` with no file args currently reports errors in `main/snippets/`. Options: add `main/snippets` to `DEFAULT_SCAN` and give it its own content PR, or scope the guardrail's default scan to exclude it until a snippets PR lands. Flagging for a decision before this workflow goes live — right now it would be red on `main` the moment it merges.

## Reviewers

Both CODEOWNERS teams: `.github` and `scripts/data` route through `@auth0/project-docs-management-codeowner`; the workflow file touches `.github` so `@auth0/project-docs-writers-codeowner` should also look.
