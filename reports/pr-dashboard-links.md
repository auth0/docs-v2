# PR: Dashboard link rewrite for the redesigned Dashboard

Branch: `dashboard-links/all`

Rewrites every legacy `manage.auth0.com` link across English, Japanese and French-Canadian MDX (plus `main/ai`) to the redesigned Dashboard's URL form, and adds a CI guardrail so legacy links can't silently reappear. One PR, consolidated from what was prepared as 16 smaller branches during development — see "Why one big PR" below if you'd rather review by section.

## What's in this PR

- `scripts/update-dashboard-links.js` — Track 1 rewriter (dry-run default, `--fix` opt-in)
- `scripts/check-dashboard-links.js` — CI guardrail, closes the gap left by `lychee.toml`'s exclusion of `manage.auth0.com`
- `scripts/lib/{args,csv,mdx,dashboard-links}.js` — shared helpers
- `scripts/data/dashboard-link-map.json` — 138 entries imported from the "New Dashboard links" sheet tab (131 original + 7 added for tenant-specific links, see below)
- `scripts/data/dashboard-link-patterns.json` — 9 shape rules for URLs with an id/placeholder segment
- `scripts/data/dashboard-link-policy.json` — guardrail rules
- `.github/workflows/dashboard-link-check.yml` — guardrail workflow, mirrors `link-check.yml`
- Test fixtures and `.gitignore` additions for the screenshot pipeline (Track 2 tooling, added ahead of its own PR; no screenshot content in this PR)
- **1687 `.mdx` files rewritten** across `main/docs` (en, ja-jp, fr-ca) and `main/ai`
- Per-section CSV reports under `reports/links-*.csv` (one trio per docs section, plus the full-tree `reports/links-dry-run.csv`), so reviewers can spot-check instead of reading every line

## Decisions locked in this PR

1. **Blessed tenant-agnostic Dashboard URL form: `https://manage.auth0.com/dashboard/#/...`.** All 131 rows in the "New Dashboard links" sheet already target this form exclusively (confirmed by scanning every `new` value in the imported map); there was no real three-way competition once the sheet was decoded. The 9 pattern-rule placeholders (`REPLACE_WITH_BLESSED_FORM`) are filled with this prefix, and `dashboard-link-policy.json` moved `/dashboard/*/` into `reject` and deleted the `/dashboard/#/` pending-decision entry.
2. **Tenant-specific links are rewritten, not left.** `dev-6endizjt`, `dev-gja8kxz4ndtex3rq`, `auth0-dsepaid` are seeded/leaked test-tenant names. `dashboard-link-policy.json` now rejects them under CI. 7 of these had no map entry (they were falling into `unmatched`); each was verified by hand to be an exact duplicate (different tenant prefix, same path) of an already-mapped tenant-agnostic URL in the sheet, and added to the map accordingly — not guessed.

If either of these isn't actually settled yet (e.g. the Dashboard team hasn't signed off), say so before merging — reverting is a one-line policy/pattern edit plus a re-run, not a content rollback, since every rewrite is a pure function of (script, map, section).

## Two bugs found and fixed in the rewriter during this work

1. **`classify()` checked the malformed-shape heuristic before the map.** A URL that looks malformed (wildcard, encoded brace, double hash) but has an explicit, correct map entry was routed to `needs-human` instead of being rewritten. Reordered: map lookup first, `isMalformed()` only as a fallback for URLs the map doesn't cover. Rescued 15 occurrences across 3 URL shapes. Regression test added.
2. **`walkMdx()` silently scanned 0 files when `--path` pointed at a single `.mdx` file** instead of a directory, because it called `readdirSync()` on the path and swallowed the resulting error. Caught while assembling the `authenticate` section — two top-level files were missing from an otherwise-complete pass. Fixed to check `statSync` first; a single file now returns a one-element file list. Regression test added.

Both are covered by the full-coverage audit described below.

## How completeness was verified

Every file this rewrite touches was cross-checked against the full-tree dry-run's predicted change list, not just spot-checked: **1687 files predicted, 1687 files changed, 0 missing, 0 touched twice.** `node scripts/check-dashboard-links.js $(git diff --name-only main -- '*.mdx')` reports 0 errors on the full changed-file set.

## Dry-run counts after this PR (full tree, all locales + main/ai)

```
locale           rewritten pattern-rewritten    unchanged-root     unchanged-new       needs-human         unmatched
en                       0                 0               172              1111                 4                 1
fr-ca                    0                 0               166              1100                 4                 1
ja-jp                    0                 0               166              1100                 4                 1
total                    0                 0               504              3311                12                 3
```

"0 would change" confirms this PR already captured everything the script can fix. What's left:

- **12 `needs-human` rows** — all explicitly `changeType: malformed` in the sheet (`REMOVE - malformed URL in docs`): `%7D` encoding on `#/applications`, `#/apis`, `#/rules`. These are docs typos needing a human to fix the surrounding sentence, not something a script should guess at.
- **3 `unmatched` rows** (1 URL, 3 locale copies) — `main/docs/customize/login-pages/classic-login/customize-password-reset-page.mdx` already uses the new `/dashboard/#/connections/database/con_YOUR-CONNECTION-ID/security` form in prose, but with a non-standard placeholder (`con_YOUR-CONNECTION-ID` instead of `{id}`) that doesn't match the pattern rule. Pre-existing in the source, not introduced by this PR. Needs a human to normalize the placeholder.

Full per-line detail for both in `reports/links-dry-run.csv`.

## Known gap found during setup — not in scope here

`main/snippets/**/*.mdx` (259 files, some `.jsx`) has 28 dashboard-link occurrences but is **not** in the rewriter's `DEFAULT_SCAN` (`main/docs`, `main/ai` only), and the guardrail *does* scan all of `main/` by default — so `check-dashboard-links.js` with no file args will report errors in `main/snippets/` the moment this merges. Needs a decision: add `main/snippets` to `DEFAULT_SCAN` and give it its own follow-up PR, or scope the guardrail's default scan to exclude it until that lands. Flagging before the guardrail workflow goes green/red on `main`.

## Why one big PR

This was originally prepared as 16 small branches (one tooling PR + 15 content PRs split by docs section, several sections further split to stay under ~150 files) for independent review and revert. They were merged into this single branch at the user's request. If you'd prefer the smaller-PR review flow after all, the per-section branches still exist locally (`dashboard-links/api`, `dashboard-links/authenticate-*`, `dashboard-links/customize-*`, `dashboard-links/get-started-*`, `dashboard-links/quickstart-*`, `dashboard-links/deploy-monitor`, `dashboard-links/libraries`, `dashboard-links/manage-users`, `dashboard-links/secure`, `dashboard-links/troubleshoot`) and nothing stops you from pushing those instead of this one.

## Reviewers

Both CODEOWNERS teams: `.github` and `scripts/data` route through `@auth0/project-docs-management-codeowner`; the workflow file touches `.github` so `@auth0/project-docs-writers-codeowner` should also look. The actual `.mdx` content changes are writers'-team turf.
