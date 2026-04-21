# Auth0 Docs — Content Patterns Reference

Observed conventions across 20+ articles in `/main/docs/`. Use this as a companion to `CLAUDE.md` when writing or reviewing documentation.

---

## Frontmatter

All MDX files require `title` and `description`. Order is not standardized.

```yaml
---
title: "Page Title"
description: "SEO description explaining what the page covers."
---
```

Optional fields:
- `sidebarTitle` — Use when the full title is too long for the sidebar
- `mode: "wide"` — Used in quickstart articles for a wider layout
- `validatedOn` — Appears occasionally in procedural guides; not universal

---

## Intro paragraph

Opens the page before the first `##` heading. Keep to 1–2 sentences. Establish what the page covers and why it matters. Use inline links and `<Tooltip>` components where relevant. No code blocks or complex components here.

**Pattern:**
```mdx
Auth0 provides tenant administrators a more intuitive search capability for [Applications](https://manage.auth0.com/#/applications) and [APIs](https://manage.auth0.com/#/apis)...
```

---

## Section heading conventions

| Purpose | Heading |
|---|---|
| Feature overview | `## How it works` |
| Setup requirements | `## Prerequisites` |
| Sequential instructions | `## [Task name]` using a numbered list inside |
| Code or workflow examples | `## Example queries` / `## Examples` |
| Technical constraints | `## Limitations` |
| Combined constraints | `## Limitations and considerations` |
| Problem-solving | `## Troubleshooting` |
| Specific targeted problem | `## Troubleshoot [specific issue]` |
| Related resources | `## Learn more` |

**Never use:** `## Limits`, `## Restrictions` (standalone), `## Before you begin`, `## Requirements`

---

## "How it works" sections

Use paragraphs to explain the concept. Follow with bullet lists or subsections (`###`) for progressive disclosure. Do **not** use numbered lists here — numbered lists are for procedures, not explanations.

- 1–2 intro paragraphs before the first `###`
- Subsections using `###` for nested detail
- Bullet lists for component breakdowns or behavior descriptions
- Images (in `<Frame>`) are acceptable when they clarify the flow

---

## Prerequisites

Use a plain paragraph for a single requirement. Use a bullet list (inside `<Note>` for quickstarts) when multiple requirements exist.

**Single requirement:**
```mdx
## Prerequisites

Because this Action sends messages to Slack, you need to [create an Incoming Webhook](https://api.slack.com/messaging/webhooks) before continuing.
```

**Multiple requirements (quickstart style):**
```mdx
## Prerequisites

<Note>
You need the following to complete this quickstart:

* An Auth0 account. [Sign up for free](https://auth0.com/signup).
* Node.js LTS installed.
* (Optional) Git installed.
</Note>
```

---

## Procedures and steps

Use markdown numbered lists for sequential instructions. Do not use `<Steps>` / `<Step>` components.

```mdx
1. Navigate to **Auth0 Dashboard > Applications > Applications**.
2. Select the search bar and choose **Application ID**.
3. Paste the full `client_id`. The matching application appears immediately.
```

You can follow a numbered step with a code block, `<Note>`, or `<Callout>` at the same indentation level.

---

## Code samples

### Single language

Use a plain fenced code block with a language tag. Add `lines` for line numbers. Add `expandable` for long blocks.

````mdx
```javascript lines
const client = new ManagementClient({
  domain: 'YOUR_DOMAIN',
  clientId: 'YOUR_CLIENT_ID',
});
```
````

Common attributes:
- `lines` — enables line numbers (most common)
- `expandable` — collapses long blocks
- `wrap lines` — wraps long lines
- `highlight={1,7-10}` — highlights specific lines
- Filename: ` ```typescript ./src/auth0/app `

### Multiple languages

Use `<Tabs>` / `<Tab>` for multiple implementations of the same concept.

```mdx
<Tabs>
  <Tab title="Node.js">
    ```javascript lines
    // Node.js code
    ```
  </Tab>
  <Tab title="Python">
    ```python lines
    # Python code
    ```
  </Tab>
</Tabs>
```

Use `<CodeGroup>` for showing the same command across package managers or shells.

### Quickstart code

Use `<AuthCodeBlock>` (imported from `/snippets/`) for code that contains dynamic variable substitution (e.g., `{yourDomain}`, `{clientId}`).

```mdx
import { AuthCodeBlock } from '/snippets/AuthCodeBlock.jsx';

export const code = `const domain = "{yourDomain}";`;

<AuthCodeBlock children={code} language="javascript" />
```

### Most common languages

JavaScript/TypeScript, Bash, JSON, Python, Go, Terraform, HTML, YAML, SQL variants, C#

---

## Alerts and callouts

| Component | When to use |
|---|---|
| `<Warning>` | **Only** for Early Access / Public Beta features requiring legal agreement. Must include link to Okta MSA and Product Release Stages. |
| `<Callout icon="file-lines" color="#0EA5E9" iconType="regular">` | Plan restrictions (Enterprise/Professional), important feature context, security notes |
| `<Note>` | Supplementary information, clarifications, caveats |
| `<Info>` | Neutral contextual help, background information |
| `<Tip>` | Shortcuts, productivity suggestions, best practices |
| `<Check>` | Success confirmations or achievement indicators |

**Callout styling is standardized — always use exactly:**
```mdx
<Callout icon="file-lines" color="#0EA5E9" iconType="regular">
  Content here.
</Callout>
```

---

## Tables

Use standard markdown table format. Bold all column headers. Use inline code for field names in headers or cells.

```mdx
| **Field** | **Description** | **Match type** |
|---|---|---|
| **Name** | The name of the application | Partial match |
| **Client ID** (`client_id`) | The unique client ID | Exact match |
```

- Typically 3 columns; 4 maximum
- Separator row: `|---|---|---|` (no alignment specifiers)
- Link inside cells is acceptable; keep descriptions concise

---

## Images

Always wrap images in `<Frame>`. Always include alt text. Caption is optional.

```mdx
<Frame>
  ![Descriptive alt text](/docs/images/[uuid]/[uuid]/[uuid]/filename.png)
</Frame>

<Frame caption="Optional caption describing the image">
  ![Descriptive alt text](/docs/images/[uuid]/[uuid]/[uuid]/filename.png)
</Frame>
```

- Image paths follow the CDN UUID convention: `/docs/images/[uuid]/[uuid]/[uuid]/[filename]`
- Alt text: 2–15 words, describes content not appearance
- No inline images without `<Frame>` wrapper

---

## "Learn more" sections

Always a `## Learn more` heading at the end of the article. Use a plain markdown bullet list of internal links. No Cards, no descriptions — the link text is self-describing.

```mdx
## Learn more

* [Organizations Overview](/docs/manage-users/organizations/organizations-overview)
* [Configure Organizations](/docs/manage-users/organizations/configure-organizations)
* [Work with Tokens and Organizations](/docs/manage-users/organizations/using-tokens)
```

- 3–5 links is typical
- Internal links only (use `/docs/...` paths)
- Positioned at the very end of the article

---

## Placeholder conventions

| Pattern | Use for |
|---|---|
| `YOUR_SOMETHING` | Configuration values users replace (e.g., `YOUR_DOMAIN`, `YOUR_CLIENT_ID`) |
| `<something>` | IDs or values returned from a previous command (e.g., `<client_id>`, `<action-id>`) |

Never use `{{VAR}}` syntax.

---

## Navigation paths

Format dashboard navigation paths with bold and `>` separators:

```
**Auth0 Dashboard > Applications > Applications**
```

---

## Tooltips for glossary terms

Use `<Tooltip>` for glossary terms rather than plain links.

```mdx
<Tooltip tip="Definition here" cta="View Glossary" href="/docs/glossary?term=TermName">Term</Tooltip>
```

---

## Tabs vs. bullet lists for options

| Use `<Tabs>` when | Use bullet list when |
|---|---|
| Showing different ways to do the **same thing** (Dashboard vs. API, Node vs. Python) | Presenting **different approaches** or strategies (each with trade-offs) |

---

## What to avoid

- `## Limits` — use `## Limitations`
- `## Troubleshoot search results` (general) — use `## Troubleshooting`; reserve `## Troubleshoot X` for targeted problems
- `<Steps>` / `<Step>` components for procedures — use markdown numbered lists instead
- Images without `<Frame>` wrapper
- `<Warning>` for anything other than Early Access / legal agreement features
- `{{VAR}}` placeholder syntax
- Exports or code blocks inline with content — code exports must be at top of file, after imports
