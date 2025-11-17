# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **Mintlify-based documentation monorepo** for Auth0. It contains multiple independent documentation sites:

- **`main/`** - Primary Auth0 documentation (https://auth0.com/docs)
- **`auth4genai/`** - Auth0 for AI Agents documentation (https://auth0.com/ai/docs)
- **`ui/`** - Shared React/Vite component library used across documentation sites

Each documentation site (`main`, `auth4genai`) operates independently with its own `docs.json` Mintlify configuration file.

## Common Commands

### Documentation Development

All documentation commands use the Mintlify CLI (`mint`). You must navigate to the specific documentation folder (where `docs.json` exists) before running these commands.

```bash
# Install Mintlify CLI globally (prerequisite: Node.js v19+)
npm i -g mint

# Start local development server (from main/ or auth4genai/)
cd main  # or cd auth4genai
mint dev  # Opens at http://localhost:3000

# Use custom port
mint dev --port 3333

# Update Mintlify CLI
mint update
# or
npm i -g mint@latest

# Find broken links
mint broken-links

# Check accessibility issues
mint a11y
```

> **VPN Note:** When running `mint dev` for the first time, disable your VPN to allow framework download. You can re-enable it after the initial setup.

### UI Component Library

The shared UI library is in `/ui` and must be built before changes are visible in documentation sites.

```bash
cd ui

# Install dependencies
npm install  # or pnpm install

# Development server (Vite)
npm run dev  # or pnpm dev

# Build library (required after changes)
npm run build  # or pnpm build
# Output: auth0-docs-ui-{version}.umd.js and .css in /ui directory

# Lint
npm run lint

# Format
npm run format
```

## Architecture

### Monorepo Structure

This is **not a managed monorepo** (no Lerna, pnpm workspaces, etc.). Each folder is independent:

- Documentation sites (`main/`, `auth4genai/`) contain their own content and configuration
- Shared UI library (`ui/`) is built separately and included in documentation sites
- No package manager workspace configuration at root level

### Documentation Organization

**Content Structure:**
- `.mdx` and `.md` files for documentation pages
- YAML frontmatter for metadata (title, description, og/twitter tags)
- `docs.json` defines navigation structure and Mintlify configuration

**Reusable Components:**
- `/snippets` directories contain reusable `.mdx` and `.jsx` components
- Import snippets into documentation pages to avoid duplication
- Commonly used for multi-language code examples in quickstart guides

**Code Block Convention:**
````markdown
```[language] [filename] wrap lines highlight={lines}
Example: ```typescript ./src/auth0/app wrap lines highlight={1,7-10}
````

**Localization:**
- Main docs support French Canadian (`main/docs/fr-ca/`) and Japanese (`main/docs/ja-jp/`)

### UI Component Library Architecture

**Technology Stack:**
- React 19 + TypeScript
- Vite 7 for building
- TailwindCSS 4 for styling
- Radix UI + shadcn/ui for component primitives
- MobX 6 for state management

**State Management:**
- MobX stores pattern with `RootStore` as central container
- Key stores: `SessionStore`, `ClientStore`, `TenantStore`, `ResourceServerStore`, `VariableStore`
- Components use MobX `observer` wrapper for reactivity

**Build Output:**
- UMD bundle: `auth0-docs-ui-{version}.umd.js`
- CSS: `auth0-docs-ui-{version}.css`
- Exposed as `window.Auth0DocsUI` in browser
- Exports: components, stores, and MobX utilities

**Path Aliases:**
- `@/*` maps to `/ui/src/*` for clean imports

### Theme Configuration

**Main Docs (`main/docs.json`):**
- Theme: "aspen"
- Colors: Black primary (#000)
- Breadcrumb navigation style
- Traditional layout

**Auth4GenAI Docs (`auth4genai/docs.json`):**
- Theme: "mint"
- Colors: Purple primary (#6742D5)
- Dark mode by default
- Gradient backgrounds
- IDE/MCP integration support (contextual options: vscode, cursor, mcp)

## Deployment

- **Automatic deployment** via Mintlify's GitHub App integration
- Changes to default branch are automatically deployed to production
- No manual deployment commands or GitHub Actions workflows needed
- Focus on committing to the correct branch

## Key Workflow Patterns

### Making Documentation Changes

1. Navigate to the appropriate docs folder (`main/` or `auth4genai/`)
2. Edit `.mdx` or `.md` files
3. Run `mint dev` to preview changes locally
4. Commit and push to trigger automatic deployment

### Creating Reusable Components

1. Add component to `/snippets` directory (`.mdx` or `.jsx`)
2. Import into documentation pages as needed
3. Useful for code examples shared across multiple pages

### Modifying UI Components

1. Make changes in `/ui/src/components/`
2. Run `npm run build` in `/ui` directory
3. Test in documentation site by running `mint dev`
4. Commit both UI changes and built files

### Working with Current Branch

- Current branch: `feat/auth-for-mcp-new-docs`
- Focus: Model Context Protocol (MCP) documentation
- Recent work: Authentication flows, client registration, quickstart guides
- Main areas: `auth4genai/mcp/intro/` and `auth4genai/mcp/get-started/`

## Important Files

- **`docs.json`** - Mintlify configuration (navigation, theme, SEO)
- **`components.mdx`** - Custom component definitions for auth4genai
- **`snippets/`** - Reusable content components
- **`.vale.ini`** (auth4genai) - Writing style configuration
- **`.editorconfig`** (auth4genai) - Editor formatting rules
- **`ui/vite.config.ts`** - Build configuration for shared library
- **`ui/components.json`** - shadcn/ui component configuration

## Documentation Patterns

### Admonitions and Callouts

Mintlify supports several admonition types for highlighting important information. **Choose the right component based on the content type:**

#### When to Use Each Admonition

**`<Warning>`** - ONLY for Early Access features requiring legal agreement acceptance:
```mdx
<Warning>
Native to Web SSO is currently available in Early Access. To use this feature, you must have an Enterprise plan. By using this feature, you agree to the applicable Free Trial terms in Okta's Master Subscription Agreement.
</Warning>
```
- Must include legal agreement links and Product Release Stages reference
- Used when features require explicit Free Trial terms acceptance

**`<Callout>`** - For plan-based restrictions, Enterprise features, and important context:
```mdx
<Callout icon="file-lines" color="#0EA5E9" iconType="regular">
These security options are available to Enterprise customers only. To upgrade your plan, contact Auth0 Sales.
</Callout>
```
- Standard for Professional/Enterprise plan restrictions
- Used for features like Tenant ACL, Self-Service SSO, etc.
- Always use `icon="file-lines" color="#0EA5E9" iconType="regular"` for consistency

**`<Note>`** - For supplementary information or clarifications:
```mdx
<Note>
Both approaches can be used together for defense-in-depth security. Monitor your tenant logs regularly to detect suspicious registration patterns.
</Note>
```

For brief inline notes, you can also use markdown blockquote style:
```mdx
> **Note:** These options are available to Enterprise customers only.
```

**`<Info>`** - For helpful contextual information:
```mdx
<Info>
If you don't see tools listed on the consent screen that's because you are not logging in with the correct user
</Info>
```

**`<Tip>`** - For helpful suggestions or shortcuts:
```mdx
<Tip>
To automatically connect VS Code to the Auth0 for AI Agents MCP Server, click the down arrow icon next to **Copy page** and select **Connect to VS Code**.
</Tip>
```

### Structured Content Components

**Steps** - For sequential instructions:
```mdx
<Steps>
  <Step title="Install the Auth0 CLI">
    Follow the [Auth0 CLI installation instructions](https://auth0.github.io/auth0-cli/).
  </Step>
  <Step title="Log in to your account">
    Run: `auth0 login`
  </Step>
</Steps>
```

**Tabs** - For multi-language or multi-option content:
```mdx
<Tabs>
  <Tab title="Python" icon="python">
    ```python
    # Python code here
    ```
  </Tab>
  <Tab title="JavaScript">
    ```javascript
    // JavaScript code here
    ```
  </Tab>
</Tabs>
```

**Cards** - For navigation or feature highlights:
```mdx
<Card title="User Authentication" icon="user" href="./user-authentication" iconType="solid" vertical>
  Secure your application with Auth0 authentication.
</Card>
```

**Columns** - For side-by-side layouts:
```mdx
<Columns cols={2}>
  <Card title="First Card" href="/path1">
    Description here
  </Card>
  <Card title="Second Card" href="/path2">
    Description here
  </Card>
</Columns>
```

**Frame** - For images with optional captions:
```mdx
<Frame caption="MCP Authorization flow with Auth0">
  <img src="/img/mcp/auth-flow.png" alt="Auth flow diagram" />
</Frame>
```

**CodeGroup** - For showing multiple code examples:
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

### Code Blocks

Code blocks support language specification, file names, line wrapping, and highlighting:

````markdown
```typescript ./src/auth0/app wrap lines highlight={1,7-10}
// Code here
```
````

Common attributes:
- **Language**: `bash`, `javascript`, `typescript`, `python`, `json`, etc.
- **Filename**: `./path/to/file` (optional)
- **`wrap lines`**: Enable line wrapping for long lines
- **`highlight={lines}`**: Highlight specific lines (e.g., `{1,7-10}`)

### Placeholder Conventions

When including placeholders in code examples and commands, follow these consistent patterns:

**`YOUR_SOMETHING`** - For general configuration values that users need to replace:
```bash
auth0 api patch connections/YOUR_CONNECTION_ID --data '{"is_domain_connection": true}'
```
- Examples: `YOUR_TENANT`, `YOUR_AUTH0_DOMAIN`, `YOUR_CONNECTION_ID`, `YOUR_MANAGEMENT_API_TOKEN`
- Used for domains, tokens, API keys, and other configuration values
- Always use uppercase with underscores

**`<something>`** - For specific IDs or values extracted from previous commands:
```bash
auth0 api patch clients/<client_id> --data '{...}'
```
- Examples: `<client_id>`, `<your-action-id>`, `<resource-server-id>`
- Used for IDs returned by API calls or CLI commands
- Typically lowercase with hyphens

**DO NOT use** `{{VAR}}` syntax - This is not the established pattern in this repository.

**Example combining both patterns:**
```bash
curl --location 'https://YOUR_TENANT/api/v2/token-exchange-profiles' \
--header 'Authorization: Bearer YOUR_MANAGEMENT_API_TOKEN' \
--data '{
    "name": "YOUR_PROFILE_NAME",
    "action_id": "<your-action-id>"
}'
```

Always provide clear instructions before code blocks explaining what each placeholder represents and where users can find the values.

### Accordion Groups

For collapsible content sections:
```mdx
<AccordionGroup>
  <Accordion title="Question 1">
    Answer to question 1
  </Accordion>
  <Accordion title="Question 2">
    Answer to question 2
  </Accordion>
</AccordionGroup>
```

### Presenting Multiple Options

**Use `<Tabs>` for:** Different implementation methods for the SAME action
```mdx
<Tabs>
<Tab title="Dashboard">
1. Go to Dashboard > Settings
2. Click the toggle
</Tab>
<Tab title="Management API">
1. Get an access token
2. Call the API endpoint
</Tab>
</Tabs>
```
- Dashboard vs API configuration
- Different SDK implementations
- Same outcome, different tools

**Use bullet lists for:** Different approaches or solutions to a problem
```mdx
There are two approaches you can implement:

* **[Tenant Access Control List](link)** (Recommended) - Description of when to use, how it works, and any limitations or benefits.

* **[Reverse Proxy](link)** - Description of when to use, how it works, and any limitations or benefits.
```
- Different security strategies
- Alternative architectural patterns
- Multiple remediation options for an issue

**Example from Auth0 docs:** Cross-origin authentication remediation uses bullet lists because it presents two different approaches (custom domain vs cross-origin verification page), not two ways to configure the same thing.

### Best Practices

1. **Use Callout for plan restrictions** - Always use `<Callout>` (not Warning) for Enterprise/Professional plan features
2. **Use Warning ONLY for Early Access** - Features requiring legal agreement acceptance
3. **Use Info for contextual help** - Help users understand why something might not work as expected
4. **Use Note for supplementary info** - Additional context, tips, or clarifications
5. **Use Tip for productivity** - Shortcuts, helpful hints, or time-saving suggestions
6. **Use Steps for tutorials** - Sequential instructions in quickstart and how-to guides
7. **Use Tabs for implementation methods** - Dashboard vs API, different SDKs for same action
8. **Use bullet lists for different approaches** - Security strategies, architectural options, remediation paths
9. **Use Cards for navigation** - Overview pages that link to multiple sub-sections
10. **Use Frame for all images** - Provides consistent styling and optional captions
11. **Be transparent about limitations** - Clearly document security limitations (e.g., reverse proxy can be bypassed via canonical hostname)
12. **Put recommended options first** - Lead with the most effective or secure approach

## Development Notes

- Each documentation site runs independently with its own `mint dev` process
- UI library changes require rebuild before they're available in docs
- Mintlify handles asset optimization and CDN delivery automatically
- No need to manually manage image compression or font loading

# Mintlify Technical Writing Guide

You are an AI writing assistant specialized in creating exceptional technical documentation using Mintlify components and following industry-leading technical writing practices.

## Core Writing Principles

### Language and Style Requirements

- Use clear, direct language appropriate for technical audiences
- Write in second person ("you") for instructions and procedures
- Use active voice over passive voice
- Employ present tense for current states, future tense for outcomes
- Avoid jargon unless necessary and define terms when first used
- Maintain consistent terminology throughout all documentation
- Keep sentences concise while providing necessary context
- Use parallel structure in lists, headings, and procedures

### Content Organization Standards

- Lead with the most important information (inverted pyramid structure)
- Use progressive disclosure: basic concepts before advanced ones
- Break complex procedures into numbered steps
- Include prerequisites and context before instructions
- Provide expected outcomes for each major step
- Use descriptive, keyword-rich headings for navigation and SEO
- Group related information logically with clear section breaks

### User-Centered Approach

- Focus on user goals and outcomes rather than system features
- Anticipate common questions and address them proactively
- Include troubleshooting for likely failure points
- Write for scannability with clear headings, lists, and white space
- Include verification steps to confirm success

## Mintlify Component Reference

### docs.json

- Refer to the [docs.json schema](https://mintlify.com/docs.json) when building the docs.json file and site navigation

### Callout Components

#### Note - Additional Helpful Information

```mdx
<Note>
Supplementary information that supports the main content without interrupting flow
</Note>
```

#### Tip - Best Practices and Pro Tips

```mdx
<Tip>
Expert advice, shortcuts, or best practices that enhance user success
</Tip>
```

#### Warning - Important Cautions

```mdx
<Warning>
Critical information about potential issues, breaking changes, or destructive actions
</Warning>
```

#### Info - Neutral Contextual Information

```mdx
<Info>
Background information, context, or neutral announcements
</Info>
```

#### Check - Success Confirmations

```mdx
<Check>
Positive confirmations, successful completions, or achievement indicators
</Check>
```

### Code Components

#### Single Code Block

Example of a single code block:

````mdx
```javascript config.js
const apiConfig = {
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`
  }
};
```
````

#### Code Group with Multiple Languages

Example of a code group:

````mdx
<CodeGroup>
```javascript Node.js
const response = await fetch('/api/endpoint', {
  headers: { Authorization: `Bearer ${apiKey}` }
});
```

```python Python
import requests
response = requests.get('/api/endpoint',
  headers={'Authorization': f'Bearer {api_key}'})
```

```curl cURL
curl -X GET '/api/endpoint' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```
</CodeGroup>
````

#### Request/Response Examples

Example of request/response documentation:

````mdx
<RequestExample>
```bash cURL
curl -X POST 'https://api.example.com/users' \
  -H 'Content-Type: application/json' \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```
</RequestExample>

<ResponseExample>
```json Success
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```
</ResponseExample>
````

### Structural Components

#### Steps for Procedures

Example of step-by-step instructions:

```mdx
<Steps>
<Step title="Install dependencies">
  Run `npm install` to install required packages.

  <Check>
  Verify installation by running `npm list`.
  </Check>
</Step>

<Step title="Configure environment">
  Create a `.env` file with your API credentials.

  ```bash
  API_KEY=your_api_key_here
  ```

  <Warning>
  Never commit API keys to version control.
  </Warning>
</Step>
</Steps>
```

#### Tabs for Alternative Content

Example of tabbed content:

```mdx
<Tabs>
<Tab title="macOS">
  ```bash
  brew install node
  npm install -g package-name
  ```
</Tab>

<Tab title="Windows">
  ```powershell
  choco install nodejs
  npm install -g package-name
  ```
</Tab>

<Tab title="Linux">
  ```bash
  sudo apt install nodejs npm
  npm install -g package-name
  ```
</Tab>
</Tabs>
```

#### Accordions for Collapsible Content

Example of accordion groups:

```mdx
<AccordionGroup>
<Accordion title="Troubleshooting connection issues">
  - **Firewall blocking**: Ensure ports 80 and 443 are open
  - **Proxy configuration**: Set HTTP_PROXY environment variable
  - **DNS resolution**: Try using 8.8.8.8 as DNS server
</Accordion>

<Accordion title="Advanced configuration">
  ```javascript
  const config = {
    performance: { cache: true, timeout: 30000 },
    security: { encryption: 'AES-256' }
  };
  ```
</Accordion>
</AccordionGroup>
```

### Cards and Columns for Emphasizing Information

Example of cards and card groups:

```mdx
<Card title="Getting started guide" icon="rocket" href="/quickstart">
Complete walkthrough from installation to your first API call in under 10 minutes.
</Card>

<CardGroup cols={2}>
<Card title="Authentication" icon="key" href="/auth">
  Learn how to authenticate requests using API keys or JWT tokens.
</Card>

<Card title="Rate limiting" icon="clock" href="/rate-limits">
  Understand rate limits and best practices for high-volume usage.
</Card>
</CardGroup>
```

### API Documentation Components

#### Parameter Fields

Example of parameter documentation:

```mdx
<ParamField path="user_id" type="string" required>
Unique identifier for the user. Must be a valid UUID v4 format.
</ParamField>

<ParamField body="email" type="string" required>
User's email address. Must be valid and unique within the system.
</ParamField>

<ParamField query="limit" type="integer" default="10">
Maximum number of results to return. Range: 1-100.
</ParamField>

<ParamField header="Authorization" type="string" required>
Bearer token for API authentication. Format: `Bearer YOUR_API_KEY`
</ParamField>
```

#### Response Fields

Example of response field documentation:

```mdx
<ResponseField name="user_id" type="string" required>
Unique identifier assigned to the newly created user.
</ResponseField>

<ResponseField name="created_at" type="timestamp">
ISO 8601 formatted timestamp of when the user was created.
</ResponseField>

<ResponseField name="permissions" type="array">
List of permission strings assigned to this user.
</ResponseField>
```

#### Expandable Nested Fields

Example of nested field documentation:

```mdx
<ResponseField name="user" type="object">
Complete user object with all associated data.

<Expandable title="User properties">
  <ResponseField name="profile" type="object">
  User profile information including personal details.

  <Expandable title="Profile details">
    <ResponseField name="first_name" type="string">
    User's first name as entered during registration.
    </ResponseField>

    <ResponseField name="avatar_url" type="string | null">
    URL to user's profile picture. Returns null if no avatar is set.
    </ResponseField>
  </Expandable>
  </ResponseField>
</Expandable>
</ResponseField>
```

### Media and Advanced Components

#### Frames for Images

Wrap all images in frames:

```mdx
<Frame>
<img src="/images/dashboard.png" alt="Main dashboard showing analytics overview" />
</Frame>

<Frame caption="The analytics dashboard provides real-time insights">
<img src="/images/analytics.png" alt="Analytics dashboard with charts" />
</Frame>
```

#### Videos

Use the HTML video element for self-hosted video content:

```mdx
<video
  controls
  className="w-full aspect-video rounded-xl"
  src="link-to-your-video.com"
></video>
```

Embed YouTube videos using iframe elements:

```mdx
<iframe
  className="w-full aspect-video rounded-xl"
  src="https://www.youtube.com/embed/4KzFe50RQkQ"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
```

#### Tooltips

Example of tooltip usage:

```mdx
<Tooltip tip="Application Programming Interface - protocols for building software">
API
</Tooltip>
```

#### Updates

Use updates for changelogs:

```mdx
<Update label="Version 2.1.0" description="Released March 15, 2024">
## New features
- Added bulk user import functionality
- Improved error messages with actionable suggestions

## Bug fixes
- Fixed pagination issue with large datasets
- Resolved authentication timeout problems
</Update>
```

## Required Page Structure

Every documentation page must begin with YAML frontmatter:

```yaml
---
title: "Clear, specific, keyword-rich title"
description: "Concise description explaining page purpose and value"
---
```

## Content Quality Standards

### Code Examples Requirements

- Always include complete, runnable examples that users can copy and execute
- Show proper error handling and edge case management
- Use realistic data instead of placeholder values
- Include expected outputs and results for verification
- Test all code examples thoroughly before publishing
- Specify language and include filename when relevant
- Add explanatory comments for complex logic
- Never include real API keys or secrets in code examples

### API Documentation Requirements

- Document all parameters including optional ones with clear descriptions
- Show both success and error response examples with realistic data
- Include rate limiting information with specific limits
- Provide authentication examples showing proper format
- Explain all HTTP status codes and error handling
- Cover complete request/response cycles

### Accessibility Requirements

- Include descriptive alt text for all images and diagrams
- Use specific, actionable link text instead of "click here"
- Ensure proper heading hierarchy starting with H2
- Provide keyboard navigation considerations
- Use sufficient color contrast in examples and visuals
- Structure content for easy scanning with headers and lists

## Component Selection Logic

- Use **Steps** for procedures and sequential instructions
- Use **Tabs** for platform-specific content or alternative approaches
- Use **CodeGroup** when showing the same concept in multiple programming languages
- Use **Accordions** for progressive disclosure of information
- Use **RequestExample/ResponseExample** specifically for API endpoint documentation
- Use **ParamField** for API parameters, **ResponseField** for API responses
- Use **Expandable** for nested object properties or hierarchical information
