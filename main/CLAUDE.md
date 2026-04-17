# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Auth0 Documentation repository, a Mintlify-based documentation platform deployed at https://auth0.com/docs. It contains 4,305 MDX files organized across multiple documentation sections and supports 3 languages (English, French-Canada, Japanese).

## Development Commands

### Local Development
```bash
# Install Mintlify CLI (requires Node.js v20)
npm install mint -g

# Start development server from /main directory
mint dev
# Preview at localhost:3000
```

## Repository Structure

```
/main/
├── docs.json                # Mintlify configuration (24,200 lines)
│                           # Defines navigation, SEO, redirects, styling
├── docs/                   # Main documentation content (4,305 MDX files)
│   ├── get-started/        # Getting started guides
│   ├── authenticate/       # Authentication documentation
│   ├── manage-users/       # User management
│   ├── customize/          # Customization (Actions, Extensions, etc.)
│   ├── secure/             # Security and token documentation
│   ├── deploy-monitor/     # Deployment and monitoring
│   ├── libraries/          # SDK documentation
│   ├── quickstart/         # Platform-specific quickstarts
│   ├── troubleshoot/       # Troubleshooting guides
│   ├── fr-ca/              # French (Canada) translations (full mirror)
│   ├── ja-jp/              # Japanese translations (full mirror)
│   └── [assets]/           # css/, fonts/, images/, logo/, media/
├── snippets/               # Reusable React components and content
│   ├── *.jsx               # React components (AuthCodeBlock, etc.)
│   ├── *.mdx               # Reusable MDX content snippets
│   └── quickstart/         # Platform/language-specific code examples
│       ├── native/         # iOS, Android, Flutter, React Native, etc.
│       ├── spa/            # React, Vue, Angular, Vanilla JS
│       ├── webapp/         # Node.js, ASP.NET, Python, Java, etc.
│       └── backend/        # API authentication examples
└── ui/                     # UI library files (CSS and JS bundles)
```

## MDX File Structure

All documentation files follow this structure:

```mdx
---
title: "Page Title"
description: "SEO description for search engines"
sidebarTitle: "Optional sidebar label"
---

import { Component } from '/snippets/component.jsx';

export const codeExample1 = `code content here`;
export const codeExample2 = `more code here`;

# Page Content Starts Here

<AuthCodeBlock children={codeExample1} language="javascript" />
```

### Key Conventions

1. **Frontmatter**: All MDX files require complete YAML frontmatter
2. **Code Examples**: Export code as constants at the top of the file (after imports, before content)
3. **Imports**: Custom components imported from `/snippets/` directory
4. **Permalinks**: Used for stable URLs and redirects

## Custom Components

Import and use these React components from `/snippets/`:

- **`<AuthCodeBlock>`**: Code blocks with variable substitution (replaces placeholders dynamically)
  ```mdx
  export const code = `const domain = "{yourDomain}";`;
  <AuthCodeBlock children={code} language="javascript" />
  ```

- **`<AuthCodeGroup>`**: Grouped code examples with language/platform tabs

- **`<AuthDocsPipeline>`**: Visual navigation breadcrumb/pipeline
  ```mdx
  <AuthDocsPipeline activeId="authenticate"/>
  ```

- **`<Card>`**: Navigation cards for linking to other sections
  ```mdx
  <Card title="Title" href="/docs/path">Description</Card>
  ```

- **`<Tooltip>`**: Inline glossary tooltips
  ```mdx
  <Tooltip tip="Explanation" cta="View Glossary" href="/docs/glossary?term=Term">Text</Tooltip>
  ```

- Standard Mintlify components: `<Tabs>`, `<Tab>`, `<Frame>`, `<Callout>`, etc.

## Navigation Configuration

The `docs.json` file at the root defines the entire site structure:

```json
{
  "navigation": {
    "languages": [
      {
        "language": "en",
        "tabs": [
          {
            "tab": "Documentation",
            "dropdowns": [
              {
                "dropdown": "Getting Started",
                "description": "Learn the basics",
                "icon": "play",
                "pages": ["docs/get-started", ...]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### To Add/Remove Pages

1. Edit `docs.json` to update the navigation structure
2. Add/remove the corresponding MDX file in `docs/`
3. Test locally with `mint dev`

### Redirects

`docs.json` includes a `redirects` array for URL changes:
```json
"redirects": [
  {"source": "/old-path", "destination": "/new-path"}
]
```

## Content Organization

### Main Documentation Sections

1. **Getting Started** - Identity fundamentals, Auth0 overview, architecture
2. **Authenticate** - Login, SSO, passwordless, identity providers, protocols
3. **Manage Users** - User accounts, organizations, sessions, metadata
4. **Customize** - Actions, custom domains, email templates, events, extensions, forms, hooks
5. **Secure** - Access tokens, refresh tokens, ID tokens, rate limiting
6. **Deploy and Monitor** - Deploy CLI, logs, monitoring
7. **Libraries** - SDK documentation (Auth0.js, SPA SDK, mobile SDKs)
8. **Quickstart** - Platform-specific implementation guides

### Quickstart Structure

Quickstarts are organized by application type:
- **native/**: iOS, Android, React Native, Flutter, Ionic, MAUI
- **spa/**: React, Vue, Angular, Vanilla JS
- **webapp/**: Node.js, ASP.NET, PHP, Python, Java, Go, Ruby
- **backend/**: API authentication

Code examples for quickstarts live in `/snippets/quickstart/{type}/{platform}/`

### Localization

Full documentation is mirrored in three languages:
- **`docs/`** - English (primary)
- **`docs/fr-ca/`** - French (Canada)
- **`docs/ja-jp/`** - Japanese

When editing English content, consider whether translations need updates. The directory structure is identical across languages.

## Contribution Workflow

### Branch Naming Convention

- **`fix/`** - Bug fixes, typos, broken links
- **`feat/`** - New features or documentation sections
- **`refactor/`** - Non-feature updates, reorganization

Example: `fix/broken-link-in-quickstart` or `feat/new-mfa-guide`

### Making Changes

1. **Contact Auth0 Product Documentation team** before opening PRs
2. Fork repository and create a feature branch with appropriate prefix
3. Edit MDX files following the conventions above
4. Test changes locally: `mint dev` and preview at `localhost:3000`
5. Commit with clear messages explaining what changed and why
6. Push to forked repository on GitHub
7. Create pull request with completed template
8. Request review from Auth0 Documentation team

## Common Patterns and Pitfalls

### Code Example Pattern

**Correct:**
```mdx
---
title: "Example"
---
import {AuthCodeBlock} from "/snippets/AuthCodeBlock.jsx";

export const codeExample = `console.log("hello");`;

# Content

<AuthCodeBlock children={codeExample} language="javascript" />
```

**Incorrect:**
```mdx
# Content

export const codeExample = `console.log("hello");`; // ❌ Too late!

<AuthCodeBlock children={codeExample} language="javascript" />
```

Code exports must be at the top of the file after imports, not inline with content.

### Navigation Updates

When creating new pages, remember to:
1. Create the MDX file in the appropriate `docs/` subdirectory
2. Add the page path to `docs.json` navigation
3. Both steps are required for the page to appear in navigation

### Variable Substitution

`AuthCodeBlock` supports dynamic variable replacement. Variables like `{yourDomain}`, `{clientId}`, etc. are automatically replaced based on user context. Use this pattern for user-specific values in code examples.

### Asset References

- Images: `/docs/images/...` or use CDN URLs
- Fonts: Configured in `docs.json` with CDN links
- Custom CSS: `/docs/css/` or `/snippets/css/`

### Glossary Links

Link to glossary terms using Tooltip components rather than plain links for better UX:
```mdx
<Tooltip tip="Definition" href="/docs/glossary?term=TermName">Term</Tooltip>
```

## Additional Resources

- **Mintlify Documentation**: https://mintlify.com/docs
- **Auth0 Docs Site**: https://auth0.com/docs
- **Issue Tracker**: https://github.com/auth0/docs-v2/issues
- **Security Disclosure**: https://auth0.com/whitehat (do not use public issue tracker)
- **License**: MIT License
