# Experiment Center Docs — Review To-Do (Carlos + Michael)

PR: auth0/docs-v2 #1332 ("feat: Experiment Center")
Review pass: Michael, 2026-06-10. Buckets A and B are applied in this branch; Bucket C below needs discussion/rework. Some C items overlap Carlos's planned restructure.

Pages skipped this pass: `configure-experiment-center.mdx` (Carlos restructuring), `troubleshooting.mdx` (being removed).

---

## Applied in this commit (context, no action)

- Tenant-log field corrected to `details.experiment = { experiment_id, variation_id, is_control, allocation_strategy }`. `segment_id` omitted at Beta; `config` never in logs.
- Actions event field is `event.experiment` (not `event.experimentation`).
- Context variable name is `experiment` across ACUL, page templates, and Actions.
- `authentication_flow: "pre_authentication"` added to experiment-create examples.
- `assignment_config.subject` ∈ `{device, user, session}` (verified vs OpenAPI).
- Segment operators corrected to the Beta set: `equals, not_equals, in, not_in, exists, not_exists` (per `rfd-segment-expression-language.md`).
- Actions `api.*` calls verified correct vs the docs-v2 Actions reference (`multifactor.enable`, `idToken.setCustomClaim`, `user.setUserMetadata`).
- Dropped the "EC" abbreviation (collides with Enterprise Connections).
- Removed Auth0 CLI examples (curl-only until the API reference page lands).
- Trimmed the Assignment and Limitations sections; framed limitations as Beta-only; clarified the ACUL-only opt-in model.

---

## Bucket C — discuss / rework

- [ ] **1. ACUL context is not an SDK prop at Beta.** `use-cases/acul-integration-guide.mdx`
  Customers read it from `window.universal_login_context.experiment`, not a React prop. Add a Beta note and rework both code examples (currently use `LoginScreen({ experiment, ...props })` prop destructuring). *Confirm the final shape/availability of `window.universal_login_context.experiment`.*

- [ ] **2. Add Auth0 Forms as a fourth surface.** `overview.mdx`, `use-cases/actions-integration-guide.mdx`
  Add Forms to the surfaces list and document how Forms receives the context via `vars`. Replace the `post_user_registration` webhook example with an `api.render_form` example that passes the experiment to a Form.
  Ref: https://auth0.com/docs/customize/forms/render#inject-custom-data-with-shared-variables-server-side
  *Confirm Forms is in Beta scope for EC.*

- [ ] **3. Partials inherit context automatically.** `use-cases/page-templates-integration-guide.mdx` ("Auth0 Partials")
  The current section says you pass `experiment` explicitly via `include(...)` — incorrect. Partials are auto-included at the entry point where they're defined and already receive the experiment data. Rewrite the section, and add a note near the top that partials inherit the context.
  Ref: `docs/customize/login-pages/universal-login/customize-signup-and-login-prompts`

- [ ] **4. Passkey-rollout approach.** `use-cases/experiment-passkey-rollout.mdx` (Step 6)
  Replace the `post_login` "redirect to a customer-built enrollment page" approach with ACUL skipping the enrollment screen for the no-passkey variant during signup. Reworks the use case end to end.

- [ ] **5. Signup-copy: add the assignment-success event.** `use-cases/experiment-signup-flow-copy-variant.mdx` (Analyze)
  Reference `experiment_assignment_succeeded` so customers can compute time-to-authenticate and success/failure rate (Epic 6B: join on `session_id`; TTA p50 = `(s|f).date − experiment_assignment_succeeded.date`).

- [ ] **6. (minor) Structured-mode callout.** `overview.mdx` (Parameters and overrides)
  Michael flagged it as unclear. It's accurate (Decision E — structured-only at Beta) but obscure. Decide: simplify the wording or cut it.

---

## Also pending (not page-specific)

- [ ] **Management API reference page** for `/api/v2/experimentation/*` (decision 2026-06-09: ship the API reference at Beta; swagger not hidden). Docs stay curl-only until it lands, then revisit adding CLI/SDK examples.
- [ ] **`segment_id` in tenant logs** ships in an N+1 Beta release; document `details.experiment.segment_id` for segment experiments then. (It is not reliably derivable from `variation_id`, since allocations can map multiple segments to one variation.)
- [ ] **`configure-experiment-center.mdx`** — Carlos restructuring.
- [ ] **`troubleshooting.mdx`** — being removed; also clean up its nav entry and any cross-links once removed.
