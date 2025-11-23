---
name: taking-screenshots
description: Provides a consistent, reproducible workflow for creating, updating, and maintaining screenshots in the Auth0 docs-v2 monorepo. Use when capturing or modifying screenshots for Mintlify pages, Auth0 Dashboard interfaces, or UI surfaces within main, auth4genai, or ui. Ensures correct formatting, accessibility, alt text, paths, viewport, file size, cropping rules, and Playwright MCP usage.
---

# Taking screenshots for docs-v2

Use this skill when capturing or updating screenshots that will be committed to `docs-v2`. It defines when screenshots add value, how they must be formatted, how to capture them reproducibly, where to store them, and how to handle alt text and accessibility.

## When to use

Use this skill when:

- A screenshot helps clarify a complex UI step or validates that the reader is in the correct place.
- A UI region has multiple interdependent settings and is hard to describe concisely in text.
- A Mintlify preview or Auth0 Dashboard interface needs visual confirmation to reduce ambiguity.
- An existing screenshot in `docs-v2` is out of date due to UI changes.

## When NOT to use

Do not use this skill for:

- Conceptual diagrams, flowcharts, or visuals that should be vector graphics.
- Decorative or aesthetic images.
- One off internal exploration screenshots that will not be committed to `docs-v2`.
- Third party applications or websites.
- Cases where clear text instructions are enough and the screenshot would only duplicate the text.

## Standard workflow

For most tasks, follow this workflow. Only open reference files if you need additional detail.

1. Decide if the screenshot is additive
    - Confirm that the screenshot will reduce ambiguity or cognitive load, not just restate the text.
    - Users must still be able to complete tasks using text alone.

2. Reach the correct UI state
    - Open the right Mintlify preview or Auth0 Dashboard view.
    - Reproduce the exact page, tab, filters, and selections described in the doc.
    - Use safe, generic, non sensitive values.

3. Use a stable viewport and browser
    - Use Chrome.
    - Use a viewport of `1200 × 900`.
    - Do not include browser chrome, URL bar, tabs, or OS UI.
    - No device emulation unless explicitly required.

4. Stabilize the UI
    - Wait for loading indicators, skeletons, and animations to finish.
    - Dismiss banners, toasts, or modals unless they are part of the documented behavior.
    - Confirm that visible labels match the current UI text.

5. Capture a focused region
    - Capture only the relevant panel, section, or modal, plus minimal surrounding context to confirm location.
    - Avoid full dashboard windows and unnecessary whitespace.
    - For modals, capture only the modal, not the background.

6. Apply required formatting
    - Add a `1px` centered border with color `#CCCCCC`.
    - Do not add shadows or decorative effects.
    - Use highlight color `#0099CC` only when it clarifies a specific control or region.
    - Capture at `1200px` width, keep outputs at no more than `1500px`.
    - Use PNG format for screenshots.

7. Save and name the file
    - Use the appropriate path for the workspace (main, auth4genai, or ui).
    - Use lowercase, hyphen separated, descriptive filenames.
    - Do not include dates, version numbers, or author initials.

8. Provide alt text and verify
    - Write concise, purpose driven alt text that describes the UI state and product area, not the image mechanics.
    - Confirm there are no sensitive values.
    - Make sure the page text does not depend on the screenshot as the only source of information.

9. Prefer Playwright MCP when possible
    - For reproducible captures, use Playwright MCP to open the preview, reach the correct state, and take an element screenshot that follows the same viewport and formatting rules.

## Quick reference

| Task | Reference |
|------|-----------|
| Detailed inclusion and alt text rules | [reference/alt-text-and-accessibility.md](reference/alt-text-and-accessibility.md) |
| Full capture and formatting workflow | [reference/screenshot-workflow.md](reference/screenshot-workflow.md) |
| Deterministic captures using Playwright MCP | [reference/playwright-mcp-usage.md](reference/playwright-mcp-usage.md) |
| Repo paths and filename patterns | [reference/repo-paths-and-filenames.md](reference/repo-paths-and-filenames.md) |
| Auth0 Dashboard specifics | [reference/dashboard-sources.md](reference/dashboard-sources.md) |

## Common mistakes

| Mistake | Fix |
|--------|-----|
| Including browser chrome or OS UI | Capture only the app region in a `1200 × 900` viewport |
| Using screenshots where text is sufficient | Replace the screenshot with clear step by step instructions |
| Using screenshots of third party UIs | Remove or replace with text, unless explicitly approved and necessary |
| Out of date UI labels | Recapture the screenshot and update surrounding text to match |
| Missing or generic alt text | Write concise, task oriented alt text that names the product area and view |
| Including loaders, transient modals, or toasts | Wait for a stable UI state before capture |
