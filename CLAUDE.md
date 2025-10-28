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
