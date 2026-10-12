# Screenshot manifest build — triage notes

`scripts/screenshots/manifest.json` built from the "Dashboard Screenshots" sheet tab (819 rows → 675 unique entries, 661 with more than one locale ref, 1595 locale-twin refs added automatically).

## 12 refs the manifest couldn't verify (`found: false` on a ref)

`build-manifest.js` re-greps the live file for the image path rather than trusting the sheet's line number, specifically to catch drift since the audit. It found real drift in both directions — some benign, some real gaps:

| File | Expected image | What's actually there | Likely cause |
| --- | --- | --- | --- |
| `manage-users/organizations/configure-organizations/search-for-organizations.mdx` | `dashboard-organizations-search-bar.png` | **file doesn't exist** | Page deleted/renamed (commit `ab6022e05`, "Update Organizations for Dashboard Search") |
| `manage-users/user-accounts/metadata/configure-application-metadata.mdx` | `App_Metadata_-_English.png` | **file doesn't exist** | Page deleted/renamed |
| `authenticate/database-connections/require-username.mdx` | `2025-02-25_12-02-23.png` | A different image at the same hash folder (`2025-01-29_15-22-11.png`) | Screenshot re-captured and renamed since the audit |
| `authenticate/database-connections/password-change.mdx` | `.../dashboard-users-edit_view-details_danger-zone__1_.png` | A conceptually similar "Danger Zone" image at a different, non-dump path | Image moved out of the dump already, sheet row is stale |
| `troubleshoot/.../monitor-subscription-usage.mdx` | hash `...dbdcca12a44588e015af` | Same filename, hash differs by one character (`...dbd9cca...`) | Typo in the original audit sheet, not a transcription error on our side — verified against the live sheet directly |
| `manage-users/user-migration/bulk-user-exports.mdx` | `exportusers.png` | **no image refs in the file at all** | Screenshot removed from the page since the audit |
| `authenticate/database-connections/non-unique-emails.mdx` | `image__6_.png` | **no image refs in the file at all** | Screenshot removed |
| `manage-users/user-migration/configure-automatic-migration-from-your-database.mdx` | `import-export-diagram.png` and `Screen_Shot_2021-05-18_at_8.54.55_PM.png` | **no image refs in the file at all** | Screenshots removed |
| `manage-users/user-migration/bulk-user-imports.mdx` | `import.png` | **no image refs in the file at all** | Screenshot removed |
| `manage-users/sessions.mdx` | `use-case-storezero.png` | **no image refs in the file at all** | Screenshot removed |

These 11 image-missing entries stay in the manifest with `imageExists: false` (that's `build-manifest.js`'s intended triage behavior, not a bug). Two have genuinely dead refs (page restructured); the rest just mean the sheet is stale for that row. None of this blocks the manifest from being useful — it's 11 rows out of 675 entries, and they'll either resolve themselves (the real image exists under a slightly different ref the Dashboard Screenshots sheet should be corrected to) or get dropped as "no longer applicable."

## What's still blocked, and why

`scripts/screenshots/dashboard-map.md` (navigation, route shapes, stable selectors) is still the unfilled template — it can't be filled until the redesigned Dashboard is visible, per the plan's Phase 3/4 gate. Until it is:
- `dashboardUrl`, `steps`, `crop`, `mask` can't be filled for any entry (they require a human to look at the real redesigned screen).
- The vision pass (`propose.js`) can't run usefully — its whole value is pre-filling those fields from a route catalog that doesn't exist yet.
- **660 of 675 entries** have `proposed: true` and a `newPath` under `dashboard/unsorted/` — `build-manifest.js` can't guess a real feature folder for a dump image, that's explicitly a human judgment call per the plan ("Confirm newPath per manifest entry... the one per-entry task that stays with a person").

So the manifest is built and the mechanical/drift work is done; what's left needing you is the human checklist items from the plan: confirm `newPath` per entry, and (once access exists) fill `dashboard-map.md`.
