# Placeholders & Template Variables

This guide covers all placeholder and variable conventions used in Auth0 documentation, including dynamic template variables that auto-populate for logged-in users and static placeholders that users manually replace.

## Overview

Auth0 documentation uses three types of placeholders to represent values that vary by user, tenant, or context:

1. **Dynamic Template Variables** (`{{doubleCurly}}`): Auto-populate from user's session for logged-in readers
2. **Build-time Document Variables** (`${dollar}`): Replaced during build process with static values
3. **Static Placeholders** (`{singleCurly}` or `<ANGLE>`): Manual replacement by users when copying code

This personalization reduces friction by allowing developers to copy and paste code snippets directly into their projects without manually locating and swapping configuration values.

## Dynamic Template Variables (`{{doubleCurly}}`)

Dynamic template variables automatically populate with values from the user's **current session context** when they are logged into the docs site. This context is determined by three factors:

1.  **User Authentication**: The identity of the user logged into the docs site.
2.  **Selected Tenant**: The Auth0 tenant currently active in the user's session.
3.  **Selected Resources**: The specific Application (Client) or API (Resource Server) the user has selected in the docs site navigation or profile menu.

If a user switches tenants or selects a different application in the docs UI, all template variables on the page update immediately to reflect the new context.

### Variable Catalog

The following variables are available for use in prose, code blocks, and tables.

| Variable | Description | Origin |
| :--- | :--- | :--- |
| `{{yourAppName}}` | The name of the currently selected Auth0 Application. | Selected Application |
| `{{userName}}` | The display name of the authenticated user. | User Profile |
| `{{yourTenant}}` | The name of the currently selected Auth0 Tenant. | Selected Tenant |
| `{{yourDomain}}` | The Domain/Namespace of the current Tenant (e.g., `dev-abc.auth0.com`). | Selected Tenant |
| `{{yourClientId}}` | The Client ID of the selected Application. | Selected Application |
| `{{yourClientSecret}}` | The Client Secret of the selected Application. | Selected Application |
| `{{https://yourApp/callback}}` | The first Callback URL configured for the selected Application. | Selected Application |
| `{{yourApiIdentifier}}` | The Identifier (Audience) of the selected API. | Selected API |
| `{{yourConnectionName}}` | Reserved for connection name selection. | *Reserved* |

## Usage Guidelines

### Inline text

Use template variables in paragraphs to provide context-aware instructions. Wrap the variable name in double curly braces `{{ }}`.

**Example Markdown:**
```markdown
To configure your application, use the domain **{{yourDomain}}**.
````

**Rendered Output (Logged In):**

> To configure your application, use the domain **dev-tenant.us.auth0.com**.

**Rendered Output (Logged Out):**

> To configure your application, use the domain **{yourDomain}**.

### Code blocks

Standard Markdown code blocks (triple backticks) do **not** support dynamic variable replacement. To use variables in code, you must use the `<AuthCodeBlock>` component.

Define the code snippet as an exported constant string, then pass it to the component.

**Example MDX:**

```jsx
import {AuthCodeBlock} from "/snippets/AuthCodeBlock.jsx";

export const sdkConfig = `const auth0 = new Auth0Client({
  domain: '{{yourDomain}}',
  client_id: '{{yourClientId}}'
});`;

<AuthCodeBlock children={sdkConfig} language="javascript" />
```

### Tables

You can use variables within Markdown tables to create configuration reference guides.

**Example Markdown:**

```markdown
| Parameter | Value | Description |
| :--- | :--- | :--- |
| Domain | `{{yourDomain}}` | Your tenant domain. |
| Client ID | `{{yourClientId}}` | Your application's ID. |
```

## Behavior and States

It is important to understand how variables render in different user states to ensuring the documentation remains readable for everyone.

### Logged out state

When a user is not logged in, the system cannot retrieve session data. In this state, the variable is rendered as a literal string wrapped in single braces (e.g., `{yourDomain}`). This serves as a generic placeholder.

### Missing context state

A user may be logged in but has not created or selected a specific resource required by the variable.

* **Example:** A user is logged in but has no Applications defined in their tenant.
* **Result:** The variable `{{yourClientId}}` will fall back to its default placeholder text (`{yourClientId}`).

### Secret masking

The `{{yourClientSecret}}` variable is sensitive.

* It is only populated if the user has the necessary permissions to view secrets.
* If the user does not have permission, or if the session has expired, it renders as the default placeholder.

## Best Practices

### Writing for fallbacks

Write surrounding text that makes grammatical sense regardless of whether the variable is replaced or rendered as a placeholder.

* ✅ **Preferred:** "Enter your domain: `{{yourDomain}}`."
* ❌ **Discouraged:** "Your domain is `{{yourDomain}}`." (This reads poorly when logged out: "Your domain is {yourDomain}").

### Security awareness

Be mindful when using `{{yourClientSecret}}`.

* **Do not** use this variable in code examples for Single Page Applications (SPAs), Mobile Apps, or Native Apps. These client types cannot securely store secrets.
* **Do** use this variable in backend/server-side code examples (Regular Web Apps, Machine-to-Machine) where the secret remains secure.

### Consistency

Always use the exact variable name and capitalization defined in the catalog.

* ✅ `{{yourClientId}}`
* ❌ `{{yourClientid}}`
* ❌ `{{clientID}}`

## Build-time Document Variables (`${dollar}`)

Build-time document variables use the `${variableName}` syntax and are replaced during the documentation build process with static values. These are used for system-wide constants like CDN URLs, dashboard URLs, and other infrastructure references.

### Common Variables

| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `${manage_url}` | The URL to the management portal. | `https://manage.auth0.com` |
| `${auth0js_url}` | The URL to the auth0.js CDN location. | *(Version-specific)* |
| `${auth0js_urlv8}` | The URL to the auth0.js v8 CDN location. | *(Version-specific)* |
| `${lock_url}` | The URL to the Lock script CDN location. | *(Version-specific)* |
| `${env.DOMAIN_URL_SUPPORT}` | Support Center URL | `https://support.auth0.com` |

### Legacy User-specific Variables

The following `${account.*}` variables are legacy syntax that has been superseded by the `{{doubleCurly}}` dynamic template variables documented above. **Do not use these in new documentation.**

| Variable | Modern Equivalent |
| :--- | :--- |
| `${account.appName}` | `{{yourAppName}}` |
| `${account.tenant}` | `{{yourTenant}}` |
| `${account.namespace}` | `{{yourDomain}}` |
| `${account.clientId}` | `{{yourClientId}}` |
| `${account.clientSecret}` | `{{yourClientSecret}}` |
| `${account.callback}` | `{{https://yourApp/callback}}` |

## Static Placeholders (`{singleCurly}` or `<ANGLE>`)

Static placeholders are used in code examples to indicate values that users must manually replace when copying code. Unlike dynamic template variables, these **do not** auto-populate and serve as visual markers for user-provided values.

### When to Use Each Syntax

Use different bracket styles based on the context and type of value:

#### Curly Braces `{singleCurly}` for URL Path Variables

Use single curly braces for variables that are **part of a URL path or API endpoint**.

* ✅ `{yourDomain}` - Domain in URLs
* ✅ `{clientId}` - Client ID in API paths
* ✅ `/api/v2/clients/{clientId}` - Path parameters in REST endpoints

**Formatting convention:**
- Use camelCase
- No underscores or hyphens
- Descriptive but concise

#### Angle Brackets `<ANGLE>` for User-Provided Values

Use angle brackets with uppercase letters and underscores for **user-provided configuration values** like tokens, secrets, and environment-specific settings.

* ✅ `<YOUR_MANAGEMENT_API_TOKEN>` - API tokens
* ✅ `<YOUR_CUSTOM_VALUE>` - Configuration values
* ✅ `<YOUR_TENANT_NAME>` - Environment-specific names

**Formatting convention:**
- ALL_UPPERCASE
- Use underscores for word separation
- Prefix with `YOUR_` when appropriate

### Complete Example

Properly-formatted code example using both conventions:

```bash
curl --request PATCH 'https://{yourDomain}/api/v2/clients/{clientId}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_MANAGEMENT_API_TOKEN>' \
--data '{
    "grant_types": [
        "authorization_code"
    ]
}'
```

### What to Avoid

❌ **Discouraged** - Mixing conventions incorrectly:

```bash
# Don't use angle brackets for path variables
curl 'https://{yourDomain}/api/v2/clients/<clientId>'

# Don't use lowercase with angle brackets
curl --header 'Authorization: Bearer <your-management-api-token>'

# Don't use inconsistent capitalization
curl 'https://{yourDomain}/api/v2/clients/{ClientId}'
```

## Choosing the Right Placeholder Type

Use this decision tree when adding placeholders to documentation:

1. **Does this value come from the user's Auth0 tenant/app?**
   - Yes, and should auto-populate when logged in? → Use `{{doubleCurly}}` dynamic template variables
   - Yes, but is for legacy content only? → Migrate to `{{doubleCurly}}` syntax
   - No, continue to step 2

2. **Is this a system-wide constant (CDN URL, dashboard URL)?**
   - Yes → Use `${dollar}` build-time variable
   - No, continue to step 3

3. **Is this part of a URL path or API endpoint?**
   - Yes → Use `{singleCurly}` static placeholder
   - No → Use `<ANGLE_BRACKET>` static placeholder

### Examples

| Value Type | Correct Syntax | Example |
| :--- | :--- | :--- |
| User's tenant domain (dynamic) | `{{yourDomain}}` | `https://{{yourDomain}}/authorize` |
| User's client ID (dynamic) | `{{yourClientId}}` | `client_id: '{{yourClientId}}'` |
| Dashboard URL (build-time) | `${manage_url}` | Navigate to `${manage_url}` |
| API path parameter (static) | `{clientId}` | `GET /api/v2/clients/{clientId}` |
| API token (static, user-provided) | `<YOUR_API_TOKEN>` | `Authorization: Bearer <YOUR_API_TOKEN>` |
