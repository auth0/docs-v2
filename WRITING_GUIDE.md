# Mintlify Writing Guide

Reference for Mintlify components, writing style, and content patterns used across docs-v2. See also the [internal Auth0 Docs Style Guide](https://oktawiki.atlassian.net/wiki/spaces/DOCS/pages/2544472407/Auth0+Docs+Style+Guide).

## Admonition Components

Choose based on content type — do not use interchangeably.

| Component | When to use |
|-----------|-------------|
| `<Warning>` | **Only** for Early Access features requiring legal agreement acceptance. Must include Free Trial terms links. |
| `<Callout icon="file-lines" color="#0EA5E9" iconType="regular">` | Plan-based restrictions (Enterprise/Professional). Always use these exact props. |
| `<Note>` | Supplementary info or clarifications that don't interrupt flow. |
| `<Info>` | Helpful contextual information (e.g., "if you don't see X, it's because Y"). |
| `<Tip>` | Productivity shortcuts or best practices. |

## Placeholder Conventions

- `YOUR_SOMETHING` — general config values users replace (e.g., `YOUR_TENANT`, `YOUR_AUTH0_DOMAIN`). Always uppercase with underscores.
- `<something>` — specific IDs returned from API calls or commands (e.g., `<client_id>`, `<your-action-id>`). Lowercase with hyphens.
- **Never use** `{{VAR}}` syntax — not the established pattern in this repo.

## Presenting Multiple Options

- **`<Tabs>`** — different ways to do the **same** thing (Dashboard vs API, different SDKs). Same outcome, different tools.
- **Bullet list** — different approaches or solutions (security strategies, architectural options). Different outcomes.

## Structured Content Components

### Steps
```mdx
<Steps>
  <Step title="Install the Auth0 CLI">
    Follow the [Auth0 CLI installation instructions](https://auth0.github.io/auth0-cli/).
  </Step>
  <Step title="Log in to your account">Run: `auth0 login`</Step>
</Steps>
```

### Tabs
```mdx
<Tabs>
  <Tab title="Dashboard">1. Go to Dashboard > Settings</Tab>
  <Tab title="Management API">1. Get an access token 2. Call the API endpoint</Tab>
</Tabs>
```

### Cards
```mdx
<Card title="User Authentication" icon="user" href="./user-authentication" iconType="solid" vertical>
  Secure your application with Auth0 authentication.
</Card>
```

### Frame (wrap all images)
```mdx
<Frame caption="Optional caption">
  <img src="/img/example.png" alt="Descriptive alt text" />
</Frame>
```

### CodeGroup
```mdx
<CodeGroup>
  ```bash npm
  npm i -g mint
  ```
  ```bash pnpm
  pnpm add -g mint
  ```
</CodeGroup>
```

### AccordionGroup
```mdx
<AccordionGroup>
  <Accordion title="Question 1">Answer to question 1</Accordion>
  <Accordion title="Question 2">Answer to question 2</Accordion>
</AccordionGroup>
```

### Columns
```mdx
<Columns cols={2}>
  <Card title="First" href="/path1">Description</Card>
  <Card title="Second" href="/path2">Description</Card>
</Columns>
```

## Code Blocks

Supports language, filename, line wrap, and highlighting:

```markdown
```typescript ./src/auth0/app wrap lines highlight={1,7-10}
// code here
```
```

## API Documentation Components

```mdx
<ParamField path="user_id" type="string" required>
  Unique identifier for the user.
</ParamField>

<ResponseField name="created_at" type="timestamp">
  ISO 8601 timestamp.
</ResponseField>
```

For nested object properties, use `<Expandable>` inside `<ResponseField>`.

## Page Frontmatter

Every page must begin with:

```yaml
---
title: "Clear, specific, keyword-rich title"
description: "Concise description explaining page purpose and value"
---
```

Use `validatedOn: yyyy-mm-dd` to indicate when content was last validated.

## Writing Principles

- Second person ("you") for instructions
- Active voice, present tense for current states
- Lead with the most important information
- Prerequisites before instructions
- Verification steps after major procedures
- Descriptive alt text on all images
- Specific link text — never "click here"
- Heading hierarchy starting at H2
