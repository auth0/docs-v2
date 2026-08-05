---
name: universal-portals-api
description: Reference guide for Auth0 Universal Portals — what they are, Management API endpoints, scopes, request/response schemas, component types, and a complete example. Use when creating, reading, updating, or deleting portals via the Management API or Auth0 CLI.
allowed-tools: Read, Grep, Glob
---

# Auth0 Universal Portals — API reference

> **Beta**: Universal Portals is currently in beta. Non-production tenants only.

Auth0 Universal Portals is a hosted identity experience platform. It lets you deploy pre-built, fully managed portals for profile management, organization settings, MFA enrollment, and more — without writing code, hosting infrastructure, or maintaining custom UI.

## Use cases

- **Consumer portals (B2C)** — give end-users self-service access to their account: profile, MFA enrollment, passkeys, password changes, and security settings. Replaces the "My Account" page every application builds from scratch.
- **Business portals (B2B)** — give organization members self-service control over their organization's configuration, domain verification, and team management. Replaces the "My Organization" page every B2B application builds from scratch.

## How a portal works

Every portal is backed by a Regular Web App in your Auth0 tenant (`client_id` + `client_secret`). The portal server authenticates users via SSO, stores tokens server-side, and issues session cookies to the browser. Access tokens are scoped per-section and refreshed transparently using a multi-resource refresh token.

## Prerequisites

- Non-production tenant with Universal Portals enabled (contact Auth0 Support to request access)
- A Regular Web App configured with the correct callback/logout URLs, grant types, and API access (My Account API, My Organization API, Management API)

The fastest way to provision everything is the Auth0 Beta CLI setup command:

```bash
auth0-beta universal-portals setup
# alias: auth0-beta up setup
```

This creates the resource servers, app, client grants, and a default portal in one step.

## How to call the API

Regardless of how you call the API, the following Management API scopes must be **pre-authorized** on the application before requesting a token. With `client_credentials`, scopes are granted at the application level in the Auth0 Dashboard (Application → API Access → Auth0 Management API) — they are not requested at token request time.

| Scope | Description |
|-------|-------------|
| `create:portals` | Create portals |
| `read:portals` | Read portals |
| `update:portals` | Update portals |
| `delete:portals` | Delete portals |

### Option 1: Management API directly

All endpoints live under the Auth0 Management API v2: https://auth0.com/docs/api/management/v2

```bash
curl -X POST https://{domain}/api/v2/portals \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Option 2: Auth0 CLI (`auth0 api`)

If the Auth0 CLI is already authenticated, use `auth0 api` to call the same endpoints without managing tokens manually. Docs: https://auth0.github.io/auth0-cli/auth0_api.html

```bash
auth0 api post   /api/v2/portals        --data '{...}'
auth0 api get    /api/v2/portals
auth0 api get    /api/v2/portals/{id}
auth0 api patch  /api/v2/portals/{id}   --data '{...}'
auth0 api delete /api/v2/portals/{id}
```

Prefer the CLI when available — it reuses the active login session.

## Endpoints

| Method | Path | Scope | Success code | Notes |
|--------|------|-------|-------------|-------|
| POST | `/api/v2/portals` | `create:portals` | 201 | Returns full Portal object |
| GET | `/api/v2/portals` | `read:portals` | 200 | Returns array of PortalSummary. Hard-capped at 50. |
| GET | `/api/v2/portals/{id}` | `read:portals` | 200 | Returns full Portal object |
| PATCH | `/api/v2/portals/{id}` | `update:portals` | 200 | Returns full Portal object |
| DELETE | `/api/v2/portals/{id}` | `delete:portals` | 204 | No response body |

**PortalSummary** (returned by list): `id`, `name`, `slug`, `created_at`, `updated_at`

**Portal** (returned by get/create/update): same as PortalSummary plus `client` (without `client_secret`), `navigation`, `pages`

## POST /api/v2/portals — request body

Required: `slug`, `name`, `client`. Optional: `navigation`, `pages`.

```json
{
  "slug": "my-account",
  "name": "My Account",
  "client": {
    "token_endpoint_auth_method": "client_secret_post",
    "client_id": "<CLIENT_ID>",
    "client_secret": "<CLIENT_SECRET>"
  },
  "navigation": { ... },
  "pages": { ... }
}
```

### `slug`
String with format `portal-slug` (URL-safe, kebab-case). Must be unique per tenant — duplicate returns **409 Conflict**.

### `name`
String, 1–150 chars.

### `client`
Currently only `client_secret_post` is supported. All three fields are required:

| Field | Type | Notes |
|-------|------|-------|
| `token_endpoint_auth_method` | `"client_secret_post"` (const) | |
| `client_id` | string (format: `client-id`) | |
| `client_secret` | string, 1–256 chars | **Write-only** — never returned in responses |

### `navigation` (optional)
```json
{
  "sidebar": {
    "components": [ ...SidebarComponent ]
  }
}
```

### `pages` (optional)
```json
{
  "default": "<page-slug>",
  "content": [ ...PortalPage ]
}
```
Both `default` and `content` are optional. A portal with no pages is valid.

**PortalPage**:
```json
{
  "title": "Profile",
  "slug": "profile",
  "components": [ ...PageComponent ]
}
```
`title` (1–150) and `slug` are required. `components` is optional.

## PATCH /api/v2/portals/{id} — request body

All fields are optional (true PATCH semantics). Only include the fields you want to change.

```json
{
  "name": "Updated Name",
  "navigation": null,
  "pages": null
}
```

- **Omitting** `navigation` or `pages` leaves them unchanged.
- **Sending `null`** for `navigation` or `pages` **clears the field entirely**.

## Sidebar component types

| `type` | Config required? | Required config fields | Optional config fields |
|--------|-----------------|----------------------|----------------------|
| `sidebar:component:auth0:internal_link` | yes | `label` (1–50) | `to` (page slug, 1–50), `icon` |
| `sidebar:component:auth0:external_link` | yes | `label` (1–50) | `url` (URL, 1–200), `icon` |

`icon` accepts any icon name from the Lucide library (https://lucide.dev/icons/) in kebab-case, e.g. `user`, `shield`, `file-text`, `building-2`, `lock-keyhole`.

## Page component types

| `type` | Config required? | Required config fields | Optional config fields |
|--------|-----------------|----------------------|----------------------|
| `page:component:auth0:form` | yes | `form_id` (1–50), `completion_message` (1–200) | — |
| `page:component:auth0:typography:heading` | yes | `title` (1–50) | `description` (1–200, supports `<a>`, `<b>`, `<i>`, `<u>`) |
| `page:component:auth0:typography:rich_text` | yes | `content` (1–10000, HTML) | — |
| `page:component:auth0:structure:section` | yes | `variant` (`"card"` or `"none"`), `children` (array, 0–20) | `title` (1–50), `description` (1–200) |
| `page:component:auth0:structure:separator` | no | — | `variant` (`"dashed"`, `"none"`, `"solid"`), `text` (1–50) |
| `page:component:auth0:my_account:passkey_management` | no | — | — |
| `page:component:auth0:my_account:mfa_management` | no | — | — |
| `page:component:auth0:my_organization:details_edit` | no | — | — |
| `page:component:auth0:my_organization:domain_table` | no | — | — |

### Nesting rule

`structure:section` `children` accept any page component **except another `structure:section`**. Sections cannot be nested — max 1 level deep.

### `form_id`

Must reference a pre-existing Auth0 Forms resource in the tenant. The form renders inline inside the section. Use Auth0 Forms to collect profile updates, policy acceptance, and marketing communication preferences.

### `rich_text` HTML support

Supports headings, `<b>`, `<i>`, `<u>`, `<a>`, text alignment, and lists. Use `<em>` for italic in placeholder text.

## Complete example

A realistic "My Account" consumer portal with four pages. Use this as a reference when composing a portal from scratch.

```json
{
  "slug": "my-account",
  "name": "My Account",
  "client": {
    "token_endpoint_auth_method": "client_secret_post",
    "client_id": "<CLIENT_ID>",
    "client_secret": "<CLIENT_SECRET>"
  },
  "navigation": {
    "sidebar": {
      "components": [
        {
          "type": "sidebar:component:auth0:internal_link",
          "config": {
            "label": "Profile",
            "to": "profile",
            "icon": "user"
          }
        },
        {
          "type": "sidebar:component:auth0:internal_link",
          "config": {
            "label": "Security",
            "to": "security",
            "icon": "shield"
          }
        },
        {
          "type": "sidebar:component:auth0:internal_link",
          "config": {
            "label": "Organization",
            "to": "organization",
            "icon": "building"
          }
        },
        {
          "type": "sidebar:component:auth0:internal_link",
          "config": {
            "label": "Legal & privacy",
            "to": "legal-privacy",
            "icon": "file-text"
          }
        }
      ]
    }
  },
  "pages": {
    "default": "profile",
    "content": [
      {
        "title": "Profile",
        "slug": "profile",
        "components": [
          {
            "type": "page:component:auth0:structure:section",
            "config": {
              "title": "Personal information",
              "description": "Basic info about you, like your name and contact details, that you use across services.",
              "variant": "card",
              "children": [
                {
                  "type": "page:component:auth0:form",
                  "config": {
                    "form_id": "<PERSONAL_INFO_FORM_ID>",
                    "completion_message": "Your personal information has been updated."
                  }
                }
              ]
            }
          },
          {
            "type": "page:component:auth0:structure:section",
            "config": {
              "title": "Passkeys",
              "description": "Use your fingerprint, face, or screen lock instead of a password to sign in quickly and more securely.",
              "variant": "card",
              "children": [
                {
                  "type": "page:component:auth0:my_account:passkey_management"
                }
              ]
            }
          }
        ]
      },
      {
        "title": "Security",
        "slug": "security",
        "components": [
          {
            "type": "page:component:auth0:structure:section",
            "config": {
              "title": "Multi-factor authentication",
              "description": "Add an extra layer of protection to your account by requiring a second verification step each time you sign in.",
              "variant": "card",
              "children": [
                {
                  "type": "page:component:auth0:my_account:mfa_management"
                }
              ]
            }
          },
          {
            "type": "page:component:auth0:structure:section",
            "config": {
              "title": "Sessions & devices",
              "description": "Review the devices and sessions that are currently signed in to your account.",
              "variant": "card",
              "children": [
                {
                  "type": "page:component:auth0:typography:rich_text",
                  "config": {
                    "content": "<p><em>Sessions & devices management coming soon.</em></p>"
                  }
                }
              ]
            }
          }
        ]
      },
      {
        "title": "Organization",
        "slug": "organization",
        "components": [
          {
            "type": "page:component:auth0:structure:section",
            "config": {
              "title": "Organization details",
              "description": "Update your organization's name and other details visible to its members.",
              "variant": "card",
              "children": [
                {
                  "type": "page:component:auth0:my_organization:details_edit"
                }
              ]
            }
          }
        ]
      },
      {
        "title": "Legal & privacy",
        "slug": "legal-privacy",
        "components": [
          {
            "type": "page:component:auth0:structure:section",
            "config": {
              "title": "Privacy & data consent",
              "description": "Control how your personal data is collected and used across our services.",
              "variant": "card",
              "children": [
                {
                  "type": "page:component:auth0:form",
                  "config": {
                    "form_id": "<PRIVACY_CONSENT_FORM_ID>",
                    "completion_message": "Your privacy preferences have been saved."
                  }
                }
              ]
            }
          },
          {
            "type": "page:component:auth0:structure:section",
            "config": {
              "title": "Communication preferences",
              "description": "Choose which emails and notifications you'd like to receive from us.",
              "variant": "card",
              "children": [
                {
                  "type": "page:component:auth0:form",
                  "config": {
                    "form_id": "<COMMUNICATION_PREFERENCES_FORM_ID>",
                    "completion_message": "Your communication preferences have been updated."
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
```
