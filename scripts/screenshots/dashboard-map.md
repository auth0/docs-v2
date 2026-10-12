# Redesigned Dashboard notes for the vision pass

Human-maintained. The whole file is sent to the model with every `propose.js` request, alongside the route list from `scripts/data/dashboard-link-map.json`. Keep it factual and short; every line here improves proposals for every entry.

Verified by hand against the seeded `dev-8dvxzxsavxoxwq7e` tenant (region `us`) on 2026-10-07, logged in as a real tenant member via Chrome (not Playwright's bundled Chromium -- see `playwright.config.js` for why). All URLs below were observed directly, not guessed.

## Navigation

Left nav, top to bottom, exactly as rendered:

- Home
- Users
- Organizations
- Settings
- **Integration**: Applications, APIs, Authentication, Connections, Enterprise SSO, Custom Token Exchange, Enterprise Groups (BETA), Authorization
- **Customization**: Branding, Pages, Domains
- **Messaging**: Emails, Phone
- **Automation & Extensibility**: Actions, Event Streams, Extensions, Rules, Hooks
- **Security & Monitoring**: Attack Protection, Access Control (NEW), Logs, Analytics

Important: "Connections" in the left nav is **social connections only** (shows `google-oauth2` etc.) in the redesign. Database connections (e.g. `Username-Password-Authentication`) moved under **Authentication**, not Connections. This matches the sheet's own mapping (`#/connections/database` -> `/authentication/database`); do not assume the old `#/connections/database` naming carries over to a page called "Connections" in the new UI.

### Route shapes, confirmed by clicking through

| Area | URL pattern | Example |
| --- | --- | --- |
| Tenant root | `/dashboard/{region}/{tenant}/` | `/dashboard/us/dev-8dvxzxsavxoxwq7e/` |
| Applications list | `/dashboard/{region}/{tenant}/applications/list` | |
| Application detail | `/dashboard/{region}/{tenant}/applications/{clientId}/{tab}` | `.../applications/Qn1B6YD3.../settings` |
| Application tabs (confirmed) | `quickstart`, `settings`, `api-access` (label "API Access"), `addons`, `connections`, `login-experience`, `okta-integration-network` (label "Okta Integration Network", tagged "New") | tab bar uses `role=tab`; URL segment for each tab not individually re-verified beyond `settings` -- check actual href when authoring a `steps`/`crop` for a non-settings tab |
| Organizations list | `/dashboard/{region}/{tenant}/organizations/list` | |
| Organization detail | `/dashboard/{region}/{tenant}/organizations/{orgId}/{tab}` | `.../organizations/org_T5VIX.../overview` |
| Organization tabs (confirmed) | Overview, Members, Groups, Roles (tagged "Early"), Invitations, Connections, Applications (tagged "Early"), Domains, Machine To Machine Access | |
| APIs list | `/dashboard/{region}/{tenant}/apis` | |
| API detail | `/dashboard/{region}/{tenant}/apis/{apiId}/{tab}` | `.../apis/6ac6ab34.../settings` |
| Database connections | `/dashboard/{region}/{tenant}/authentication/database` (list), `.../authentication/database/{connectionId}/settings` (detail) | |
| Social connections | `/dashboard/{region}/{tenant}/connections` (page title "Social Connections") | |
| Branding colors | `/dashboard/{region}/{tenant}/branding/customizations/colors` | matches sheet: `#/universal-login/customizations/colors` -> `/branding/customizations/colors` |
| Users list | `/dashboard/{region}/{tenant}/users` | |
| User detail | `/dashboard/{region}/{tenant}/users/{base64(auth0\|user_id)}` | user id is base64-encoded in the URL, not raw |
| Actions | `/dashboard/{region}/{tenant}/actions/triggers` | matches sheet: `#/actions/flows` -> `/actions/triggers` |
| Rules | `/dashboard/{region}/{tenant}/rules` | still a real, working page (see below) |
| Hooks | `/dashboard/{region}/{tenant}/hooks` | still a real, working page |
| Extensions | `/dashboard/{region}/{tenant}/extensions/list` | |

`{region}` and `{tenant}` resolve from `AUTH0_REGION`/`AUTH0_TENANT` as already implemented in `lib/tenant.js`; confirmed working end to end (`resolveUrl('/dashboard/{region}/{tenant}/applications/{client:Acme Bot}/settings')` resolved correctly against the real tenant).

## Stable selectors

Confirmed by direct inspection, not guessed:

- Main content region: `main` (has `role="main"` and `id="content"` -- `main` alone is enough and more robust than relying on the id, which may not be stable across pages).
- Tabs on resource pages (applications, organizations, APIs): `role=tab`, e.g. `page.getByRole('tab', { name: 'Settings' })`. These work reliably; element ids under tab panels are auto-generated garbage (e.g. `quantum-product-34736-control`) and must not be hardcoded.
- Links to a named resource: `role=link[name="<exact name>"]`, e.g. `page.getByRole('link', { name: 'Acme Bot' })`. Works for applications, organizations, APIs, users (partial/regex name match works for users, e.g. `/jane|john/i`).
- Form fields: prefer `page.getByLabel('<Label text>')` over any id/data-testid. `data-testid` attributes exist on chrome-level UI (search, tenant menu, onboarding guide widgets) but were **not** found on actual resource content (e.g. nothing on the Applications list rows, nothing distinguishing one textbox from another beyond its label). Do not assume `data-testid` coverage on content; verify per page before relying on it.
- Primary action button: `role=button`, e.g. `page.getByRole('button', { name: 'Create Application' })` (not yet directly verified by click, but consistent with the rest of the UI's accessibility-first markup).

## Things to mask

- Client Secret field: `page.getByLabel('Client Secret')` (works; the input itself is type=text with the value dot-masked by the UI already, but mask it anyway since the raw value is in the DOM and copy-button-accessible).
- Client ID is NOT masked by default in the UI and is not sensitive in the same way -- the plan's seeded tenant is synthetic, so client ids showing in screenshots is fine and matches existing docs practice (ids are already visible in current screenshots).
- Tenant name in the header: visible top-left as `dev-8dvxzxsavxoxwq7e` next to the flag icon; no selector confirmed yet, revisit when authoring a screenshot where the header is in frame.
- Dates in log tables: not yet visited; revisit before authoring any Logs screenshot.

## Known differences from the old Dashboard

- **Connections split.** "Connections" in the nav is social-only now. Database and enterprise connections live elsewhere (database under Authentication; enterprise connections not yet re-verified in this pass -- check Enterprise SSO and Authentication both before assuming one).
- **Rules and Hooks still exist**, contrary to the unfilled template's example guess. Rules shows a deprecation banner ("Rules are being deprecated... can still read or toggle the enabled state... will not be able to edit or create new Rules") but the page is fully real and screenshot-able. Do not mark Rules/Hooks screenshot rows `needsHuman` for "page removed" -- they're deprecated, not gone.
- **Node 12/16 runtime deprecation banner** also appears on the Rules page; worth knowing if a Rules screenshot accidentally captures it and the diff flags banner text that changes over time -- consider masking banner regions on that page specifically if it causes diff flakiness.
- **Early-access tags.** Organization tabs "Roles" and "Applications" are tagged "Early" in the UI; "Okta Integration Network" on application pages is tagged "New"; "Access Control" in the left nav is tagged "NEW". These badges may be removed as features graduate; don't bake the badge text into alt text or captions.
- Not yet checked: whether a UI locale switch exists (relevant to Phase 5, translated screenshots -- still an open question per the plan).

## Still to verify

- Enterprise connections (SAML/OIDC) detail page route and tabs -- the seeded tenant has one OIDC connection (`big-holdings-oidc`) under Authentication or Enterprise SSO, not yet clicked into.
- Actions: Library vs. Flows vs. Triggers sub-navigation (the sheet has three distinct old shapes mapping to variants of `/actions/...`; only `/actions/triggers` confirmed so far).
- Tenant Settings tabs (`/tenant/general`, `/tenant/advanced`, `/tenant/admins` per the link map) -- not yet visited.
- MFA / Attack Protection / Access Control pages -- not yet visited.
- A UI locale switch for Phase 5 (translated screenshots) -- not yet checked.
