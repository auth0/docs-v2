# docs-v2

Mintlify monorepo for Auth0 documentation. Not a managed monorepo — each folder is independent.

## Layout
- `main/` — primary docs site (https://auth0.com/docs), own `docs.json`
- `ui/` — shared React/Vite/MobX component library (built separately, output is a UMD bundle)
- `universal-components/` — shared interactive component library

## Build & dev
- Docs: `cd main && mint dev` — disable VPN on first run
- UI: `cd ui && npm run build` — required after any UI changes before testing in docs
- Lint broken links: `mint broken-links` from inside `main/`

## Canonical conventions
- **Never** run commands from the repo root for docs — always `cd` into the target site first
- After any change to `ui/`, rebuild with `npm run build` before testing; docs site includes the built UMD file
- Page navigation is manual — new `.mdx` files must be added to `docs.json` to appear in sidebar
- Deployment is automatic on push to default branch — no manual deploy step

## Guardrails
- MobX stores in `ui/`: keep `SessionStore`, `ClientStore`, `TenantStore` etc. separate — do not merge state concerns
- See CONTRIBUTING.md for PR conventions and link-checking setup
