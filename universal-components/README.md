# Universal Components

This folder contains the implementation and integration of Auth0 Universal Components for the docs-v2 project. It provides reusable React components and core utilities for organization and account management, including domain tables, SSO provider tables, and more.

## Structure

- `src/` — Component source code, styles, and integration logic.
- `package.json` — Project dependencies and scripts.
- `index.css` — Custom styles and overrides for component previews and modals.
- `README.md` — This documentation.

## Expectations:

- Interactive Documentation: Enable live, interactive components within documentation
- Component Embedding: Support direct embedding in MDX documentation files.
- Dynamic Mounting: Mount React components dynamically based on component names
- Mock API Logic: Provide realistic mock implementations & skip real authentication calls
- Mintlify Integration: Handle client-side routing changes, detect theme switches (light/dark).

## Auth0 Universal Packages

This project uses [@auth0/universal-components-core](https://www.npmjs.com/package/@auth0/universal-components-core) and [@auth0/universal-components-react](https://www.npmjs.com/package/@auth0/universal-components-react):

- `@auth0/universal-components-core`: Provides core utilities, API logic, and shared types for Auth0 Universal Components.
- `@auth0/universal-components-react`: Provides React UI components for organization and account management, ready to embed in your app or docs.

Both packages are installed via `pnpm` and used throughout the docs-v2 project for interactive demos and previews.

## Setup & Usage

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

   This will install all dependencies, including Auth0 Universal packages.

2. **Build the universal-components package:**

   ```bash
   pnpm build
   ```

   This runs TypeScript build, Vite build, and copies assets as needed.

3. **Move to the main docs-v2 folder:**

   ```bash
   cd ..
   ```

4. **Run Mintlify docs locally:**
   ```bash
   pnpm mint dev
   ```
   This will start the documentation site with all universal components integrated and previewable.

### Using Auth0 Universal Components

- Components like `DomainTableView`, `SsoProviderTableView`, etc. are imported from `@auth0/universal-components-react`.
- Core logic and API integration are handled by `@auth0/universal-components-core`.
- You can use these packages in your own apps or in the docs-v2 previews.

Example:

```tsx
import { DomainTableView } from "@auth0/universal-components-react/spa";

export function DomainsPage() {
  return <DomainTableView />;
}
```

## Node Version Support

This project requires **Node.js 18.x or later** for compatibility with all dependencies and scripts.  
Please ensure your environment uses a supported Node version before running `pnpm install` or build scripts.

You can check your Node version with:
```bash
node --version
```

## Notes

- Make sure we update package.json to next version(minor/major/patch) so that our component bundle gets created with that version and mintlify automatically bursts the cache for us once its redeployed.
- All component previews are rendered with fixed height and scrollbars for overflow.
- Modals/dialogs are scoped to the preview container for accurate demo experience.
- Use the snippets (e.g., `ComponentLoader`, `SsoProviderTablePreview`) for consistent preview styling and loading states.

## Contributing

- Make changes in the `universal-components` folder, rebuild, and then run the docs site from the main folder.
- Keep styles and preview logic up-to-date for new components.

---
