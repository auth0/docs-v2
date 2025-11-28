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

We use [Lychee](https://lychee.cli.rs/) to check for broken links across both documentation sites (`main/` and `auth4genai/`).  
All configuration and exclusions live in [`lychee.toml`](lychee.toml), and both local runs and CI use the same rules.

### Local Usage

There are two recommended ways to check links locally, depending on what you want to validate.

#### 1. Check links as they behave on auth0.com

This mode asks Lychee to treat absolute paths like `/docs/...` as if they were being loaded from the live site.  
It is useful when you want to confirm that public links resolve correctly through redirects, locale routing, or dynamically rendered pages.

**Main docs:**
```bash
lychee --format detailed --verbose --base-url https://auth0.com \
  'main/**/*.md' 'main/**/*.mdx' 'main/**/*.jsx'
````

**Auth0 for AI Agents docs:**

```bash
lychee --format detailed --verbose --base-url https://auth0.com/ai/docs \
  'auth4genai/**/*.md' 'auth4genai/**/*.mdx' 'auth4genai/**/*.jsx'
```

#### 2. Check links against the local filesystem

This mode validates only links that actually exist in the repo.
It is useful when you’re working on local references (images, snippets, relative paths) and want to ensure nothing in the tree is broken.

**Main docs:**

```bash
lychee --format detailed --verbose --root-dir "$(pwd)/main" \
  'main/**/*.md' 'main/**/*.mdx' 'main/**/*.jsx'
```

**Auth0 for AI Agents docs:**

```bash
lychee --format detailed --verbose --root-dir "$(pwd)/auth4genai" \
  'auth4genai/**/*.md' 'auth4genai/**/*.mdx' 'auth4genai/**/*.jsx'
```

### Notes

* You can combine `--base-url` and glob patterns however you like; the examples above are the patterns used in CI.
* Any URLs that need to be ignored should be added to `lychee.toml`, not passed on the command line.
* Lychee caches results locally, so repeat runs are much faster.
* Mintlify already checks internal routes during `mint dev`, so Lychee is mainly for external links and static references.
