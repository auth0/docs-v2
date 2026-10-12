# Dashboard screenshot pipeline

Playwright Test project that captures Auth0 Dashboard screenshots for `main/docs/images` from a seeded demo tenant and diffs them against the committed images. Runs locally only; the browser session is a saved login that CI cannot hold.

## Setup

```bash
cd scripts/screenshots
npm install
npx playwright install chromium
```

Environment (put these in `scripts/screenshots/.env.local`, which is gitignored, and `source` it, or export them):

| Variable | Value |
| --- | --- |
| `AUTH0_DOMAIN` | demo tenant domain, e.g. `docs-screenshots.us.auth0.com` |
| `AUTH0_CLIENT_ID` / `AUTH0_CLIENT_SECRET` | the Management API M2M app also used by Deploy CLI |
| `AUTH0_REGION` | `us` (the segment after `/dashboard/` in Dashboard URLs) |
| `AUTH0_TENANT` | `docs-screenshots` (the segment after the region) |
| `DASHBOARD_BASE_URL` | optional, defaults to `https://manage.auth0.com`; set to a staging host when one exists |

Seed the tenant once: `a0deploy import -c tenant/config.json -i tenant/tenant.yaml` (see `tenant/tenant.yaml` for the SAML/Okta placeholders). Then create a non-MFA admin user by hand for logging in, plus three or four sample users so user lists are not empty.

## Commands

| Command | What it does |
| --- | --- |
| `npm run auth` | Opens a headed browser; log in by hand; saves `storageState.json`. Re-run when captures report "Redirected to login". |
| `npm run build-manifest -- export.csv` | Builds `manifest.json` from the Dashboard Screenshots sheet export. Add `--merge` to keep hand-filled fields. |
| `npm run diff` | Captures every non-approved entry and compares with the committed image. Failing entries write `-actual.png` and `-diff.png` beside the image. Changes nothing committed. |
| `npm run diff -- --grep @dashboard-applications` | Same, one section. |
| `npm run capture -- --grep @dashboard-applications` | Overwrites the committed images for a section. |
| `npm run report` | Summarizes the last run to `review.csv` (outcome per entry, paths to actual/diff). |
| `npm run update-refs -- --section=dashboard-applications --report=refs.csv` | Dry-run of the MDX rewrite for approved entries; add `--fix` to write. |
| `npm test` | Unit tests for the rewrite step. |

## Manifest entry

```json
{
  "id": "dashboard-applications-settings",
  "currentPath": "/docs/images/cdy7uua7fh8z/<hash>/<hash>/app-settings.png",
  "newPath": "/docs/images/dashboard/applications/settings/dashboard-applications-settings-light.png",
  "proposed": false,
  "altText": "Auth0 Dashboard Applications Settings tab",
  "refs": [
    { "file": "main/docs/get-started/applications/application-settings.mdx", "line": 42, "locale": "en" },
    { "file": "main/docs/ja-jp/get-started/applications/application-settings.mdx", "line": 42, "locale": "ja-jp" },
    { "file": "main/docs/fr-ca/get-started/applications/application-settings.mdx", "line": 42, "locale": "fr-ca" }
  ],
  "dashboardUrl": "/dashboard/{region}/{tenant}/applications/{client:Acme Bot}/settings",
  "steps": [{ "click": "role=tab[name='Settings']" }],
  "crop": "[data-testid='application-settings-form']",
  "mask": ["[data-testid='client-secret']"],
  "width": 1280,
  "status": "pending"
}
```

- `proposed: true` means `build-manifest.js` guessed `newPath`; confirm it and set `proposed` to `false` before capture.
- `dashboardUrl` placeholders: `{region}`, `{tenant}`, `{client:Name}`, `{api:Name}`, `{connection:Name}`, `{org:Name}`, `{role:Name}`, `{action:Name}`, `{user:email}`. Resolved through the Management API at run time; never hardcode ids.
- `steps`: `{ "click": sel }`, `{ "hover": sel }`, `{ "fill": { "selector": sel, "value": v } }`, `{ "waitFor": sel }`, `{ "wait": ms }`. Playwright selector syntax (`role=`, `text=`, CSS).
- `crop`: the element whose bounding box becomes the image. `mask`: elements painted over before capture (secrets, dates, tenant names).
- `status`: `pending` → `captured` (optional) → `approved` (human accepted the new image) → `rewritten` (set by `update-screenshot-refs.js --fix`).

## Vision pass (optional, cuts manifest authoring to review)

`propose.js` sends each old screenshot, its alt text, the surrounding MDX and the redesigned-Dashboard route catalog to Claude and gets back a proposed `dashboardUrl`, `steps`, `crop`, `mask`, `newPath` and `altText` with a confidence score. `verify` mode compares a new capture against the old screenshot and flags wrong screen, wrong state, cut-off content or leaked secrets.

```bash
export ANTHROPIC_API_KEY=...            # or ANTHROPIC_BASE_URL for an internal proxy
npm run propose -- --limit=5 --dry-run  # prints the context that would be sent, no API call
npm run propose -- --limit=20           # proposals saved under entry.proposal
npm run propose -- --section=dashboard-applications --apply   # fill empty fields from proposals
npm run verify -- --section=dashboard-applications             # after npm run capture
```

- Model defaults to `claude-opus-5` at `medium` effort; override with `--model=` / `--effort=` or `PROPOSE_MODEL`.
- Fill `dashboard-map.md` with the redesigned navigation and stable selectors first. It is cached and sent with every request; it is the single biggest lever on proposal quality.
- Proposals never set `status`, never clear `proposed`, and only fill fields that are empty. A human still confirms every entry; sort by `proposal.confidence` and start with the low ones.
- `verification.score` and `verification.issues` on each entry drive the review order after a capture run.

## Review loop

1. `npm run diff -- --grep @section`
2. `npm run report`, open `review.csv`, look at each `changed` entry's diff image.
3. Accept: set the entry's `status` to `approved`. Reject: adjust `steps` / `crop` / `mask`, re-run.
4. `npm run update-refs -- --section=<section> --report=refs.csv`, read the report, then add `--fix`.
5. Commit images and MDX for that section as one PR.

## Files

| File | Purpose |
| --- | --- |
| `playwright.config.js` | snapshot path template into `main/docs/images`, tolerance, viewport, projects |
| `auth.setup.js` | one-time headed login, writes `storageState.json` (gitignored) |
| `capture.spec.js` | one test per manifest entry |
| `lib/manifest.js` | manifest load/save/validate, section tags, snapshot names |
| `lib/tenant.js` | placeholder resolution via Management API |
| `build-manifest.js` | sheet CSV → `manifest.json` |
| `report.js` | Playwright JSON results → `review.csv` |
| `update-screenshot-refs.js` | image move + MDX rewrite + alt text, all locales |
| `tenant/` | Deploy CLI config and YAML for the demo tenant |
