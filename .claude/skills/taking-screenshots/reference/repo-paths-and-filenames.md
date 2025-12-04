# Repo paths and filenames

Use this file as the single source of truth for screenshot locations and naming patterns. Other docs only refer to it.

## Auth0 for AI docs (`auth4genai/`)

Store shared screenshots in:

- `auth4genai/img/...`

Group by site structure when helpful:

- `auth4genai/img/get-started/...`
- `auth4genai/img/how-tos/...`
- `auth4genai/img/integrations/...`

Use descriptive filenames, for example:

- `auth4genai-user-authentication-login-screen.png`

## Main docs (`main/docs/`)

Use:

- `main/docs/img/...` (preferred)
- `main/docs/images/...` (when that pattern is already used nearby)

Group by product area where possible:

- `main/docs/img/authenticate/...`
- `main/docs/img/manage-users/...`

Examples:

- `main/docs/img/authenticate/universal-login-settings.png`

## UI workspace (`ui/`)

Use:

- `ui/src/assets/screenshots/...` for bundled assets
- `ui/public/screenshots/...` for static assets

Examples:

- `ui/src/assets/screenshots/pr-template-preview.png`

## File naming rules

- Lowercase only.
- Hyphen separated.
- Descriptive of purpose and UI area.

Patterns:

- `[product]-[area]-[view-state].png`
- `[site]-[section]-[focus].png`

Avoid:

- Generic names such as `image1.png` or `screenshot.png`.
- Dates or version numbers.
- Author initials or personal tags.

## Format

- PNG for screenshots.
- SVG only for logos or icons, not for UI screenshots.

If you need to replace an existing image with a new version, keep the filename and path the same whenever possible so that existing references remain valid.
