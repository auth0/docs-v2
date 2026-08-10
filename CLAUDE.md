# docs-v2

Mintlify monorepo for Auth0 documentation. Not a managed monorepo — each folder is independent.

## Layout
- `main/` — primary docs site (https://auth0.com/docs), own `docs.json`
- `auth4genai/` — Auth0 for AI Agents site (https://auth0.com/ai/docs), own `docs.json`
- `ui/` — shared React/Vite/MobX component library (built separately, output is a UMD bundle)
- `universal-components/` — shared interactive component library

## Build & dev
- Docs: `cd main && mint dev` (or `cd auth4genai && mint dev`) — disable VPN on first run
- UI: `cd ui && npm run build` — required after any UI changes before testing in docs
- Lint broken links: `mint broken-links` (from inside `main/` or `auth4genai/`)

## Canonical conventions
- **Never** run commands from the repo root for docs — always `cd` into the target site first
- After any change to `ui/`, rebuild with `npm run build` before testing; docs sites include the built UMD file
- Page navigation is manual — new `.mdx` files must be added to `docs.json` to appear in sidebar
- Deployment is automatic on push to default branch — no manual deploy step

## Guardrails
- Do not use `{{VAR}}` placeholders — use `YOUR_SOMETHING` or `<something>` (see WRITING_GUIDE.md)
- `<Warning>` is only for Early Access features with legal agreement — use `<Callout>` for plan restrictions
- MobX stores in `ui/`: keep `SessionStore`, `ClientStore`, `TenantStore` etc. separate — do not merge state concerns
- See WRITING_GUIDE.md for component usage, placeholder conventions, and writing style
- See CONTRIBUTING.md for PR conventions and link-checking setup
