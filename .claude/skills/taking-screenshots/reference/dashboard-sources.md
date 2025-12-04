# Auth0 Dashboard sources

Use this file when you need more detail about Auth0 Dashboard views. For general workflow and formatting, see `reference/screenshot-workflow.md`.

### Navigation clarity in text

In the documentation text:

- State the full navigation path in terms of the Dashboard hierarchy.
- For example: `Auth0 Dashboard > Applications > Applications > Settings`.

This ensures users can reach the correct view even without the screenshot.

### Navigation clarity in screenshots

In the screenshot:

- Include only enough UI context to confirm the location, such as a panel title or breadcrumb.
- Crop out:
    - Browser window and chrome.
    - Top navigation bar, unless it is directly relevant to the step.
    - Left navigation bar, unless the doc is explicitly about navigation.

The goal is to show the configuration or state the user cares about, plus minimal context to prove they are in the right place.

### Data hygiene

Use non sensitive values:

- Example tenant names instead of production tenant identifiers.
- Generic application names.
- Fake email addresses such as `user@example.com`.

Avoid:

- Real user data.
- Internal tenant names or identifiers.
- Secrets, tokens, or internal URLs.

### UI consistency

- Use exact UI label text in both screenshots and body text.
- If UI copy changes, update the screenshot and adjust the surrounding text to match.
- Avoid highlighting controls that are not referenced in the instructions.

## Third party UIs

- Avoid screenshots of third party applications or websites whenever possible.
- Do not include external branding, user data, or proprietary UI unless there is a specific approval and requirement.
- Prefer concise text descriptions or vector diagrams for third party interactions.

If a third party screenshot is unavoidable, treat it as an exception and follow internal review processes before adding it to `docs-v2`.
