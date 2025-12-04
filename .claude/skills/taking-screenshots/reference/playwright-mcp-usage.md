# Using Playwright MCP for deterministic screenshots

Use Playwright MCP when you need consistent, reproducible captures or when UI states are hard to reach manually. It reuses the same viewport and formatting rules defined in `reference/screenshot-workflow.md`.

## 1. Start the correct dev server

Run the appropriate dev server:

- In `main/`: `mint dev`
- In `auth4genai/`: `mint dev`
- In `ui/`: `npm run dev`

Use the preview URL from the console output. Do not hardcode localhost ports if they can change.

## 2. Apply the standard viewport

When launching the browser in Playwright MCP:

- Use the standard viewport `1200 × 900`.
- Do not resize the window manually after launch.
- Do not include browser chrome or OS UI in screenshots.

Follow all cropping and formatting rules from `reference/screenshot-workflow.md`.

## 3. Wait for stable selectors

Before taking a screenshot:

- Choose selectors that appear only when the main content is fully loaded.
- Prefer selectors that represent the primary content region, not transient placeholders.
- Avoid selectors that match skeleton states, loading spinners, or transient banners.

Examples of good selectors:

- Main content containers
- Stable header or breadcrumb elements that exist only after load
- Key form sections for configuration pages

## 4. Interact to reach the documented state

Use Playwright interactions to reach the UI state described in the doc:

- Click tabs, accordions, and toggles.
- Apply filters or sorting.
- Scroll to the relevant section.

If the path to reach the state is non obvious, describe it briefly in the PR description so others can reproduce it.

## 5. Capture the screenshot

Prefer element screenshots:

- Take an element screenshot of the main content region or specific panel you are documenting.
- Use full viewport screenshots only when necessary, for example when showing page level layout that is relevant to the doc.

Save screenshots using repo relative paths:

- `auth4genai/img/...`
- `main/docs/img/...`
- `main/docs/images/...`
- `ui/src/assets/screenshots/...`
- `ui/public/screenshots/...`

File naming and formatting must follow the rules in:

- `reference/repo-paths-and-filenames.md`
- `reference/screenshot-workflow.md`

## 6. Inspect and iterate

After capture:

- Verify the screenshot matches the state described in the doc.
- Confirm no transient UI, loaders, or toasts are visible.
- Check that the element boundaries provide enough context without extra noise.
- Re capture if cropping, whitespace, or context is insufficient.

When you find a stable selector and pattern that works well, keep using it for future captures of the same page to minimize visual drift over time.
