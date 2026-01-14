# docs-v2

This is a monorepo for hosting the content for the documentation of various projects in Auth0.

We use [Mintlify](https://mintlify.com/) for our documentation needs.

## Directories

- `main`: Main Documentation for Auth0: https://auth0.com/docs
  - Contains the primary Auth0 documentation content
  - Includes `docs/`, `snippets/`, and `ui/` subdirectories
- `auth4genai`: Documentation for Auth0 for AI Agents features in Auth0: https://auth0.com/ai/docs
  - Contains content for AI-specific Auth0 features
  - Includes sections for quickstart guides, integrations, SDKs, MCP, and more
- `ui`: Shared UI components and tooling
  - React/Vite-based component library used across documentation sites

## Local Development

Use the [Mintlify CLI](https://mintlify.com/docs/installation) to preview and edit documentation locally.

### Prerequisites

- [Node.js](https://nodejs.org/en) v19 or higher

### Installation

Install the Mint CLI globally:

```bash
npm i -g mint
```

Or using pnpm:

```bash
pnpm add -g mint
```

> **Note for VPN Users**
>
> When running `mint dev` for the first time, you'll need to **disable your VPN** to allow the framework to download. After the initial download completes, you can re-enable your VPN for subsequent runs.

### Running the Dev Server

1. Navigate to the documentation folder you want to work with (where the `docs.json` file is located):
   ```bash
   cd main  # or cd auth4genai
   ```

2. Start the development server:
   ```bash
   mint dev
   ```

3. Open your browser to `http://localhost:3000` to view the local docs

### Useful Commands

- **Update the CLI**: `mint update` or `npm i -g mint@latest`
- **Find broken links**: `mint broken-links`
- **Check accessibility**: `mint a11y`
- **Custom port**: `mint dev --port 3333`

For more details, see the [Mintlify CLI documentation](https://mintlify.com/docs/installation).

## Link Checking

We use [Lychee](https://lychee.cli.rs/) to check for broken non-local links. Our Lychee config is in [`lychee.toml`](lychee.toml), which is used in our CI checks and which you can use locally.

### Check links locally

For local link checking, run `lychee` from the root of the repo. Specify the config file and the path(s) you want to check. For example, to check everything in the main docs site:

```
lychee -c lychee.toml 'main/docs/**/*.mdx' 
```

### Check links in PRs

The `.github/workflows/link-check.yml` GitHub Action runs against PRs that change content files and leaves a comment with a summary of the results which lists any broken links.
