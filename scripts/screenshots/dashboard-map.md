# Redesigned Dashboard notes for the vision pass

Human-maintained. The whole file is sent to the model with every `propose.js` request, alongside the route list from `scripts/data/dashboard-link-map.json`. Keep it factual and short; every line here improves proposals for every entry.

## Navigation

- Left nav sections, top to bottom: (fill in once the redesign is visible, e.g. Getting Started, Activity, Applications, Authentication, Organizations, User Management, Branding, Security, Actions, Monitoring, Marketplace, Extensions, Settings)
- Route shape: `/dashboard/{region}/{tenant}/<section>/<subsection>`; application pages: `/applications/{clientId}/<tab>`; tabs are query or path segments? (fill in)

## Stable selectors

List what the Dashboard team confirms as stable. Examples of the form to use:

- Page main content container: `main` or `[data-testid='page-content']`
- Tabs on resource pages: `role=tab[name='Settings']`
- Primary action button: `role=button[name='Create Application']`
- Tables: `role=table` inside `main`
- Modals: `role=dialog`

## Things to mask

- Client secret fields: (selector)
- Tenant name in the header: (selector)
- Dates in log tables: (selector)

## Known differences from the old Dashboard

- (e.g. "Rules and Hooks pages no longer exist; proposals for them must say needsHuman")
- (e.g. "Universal Login customization moved under Branding > Universal Login > Customization")
