---
name: creating-universal-component-mocks
description: Creates or repairs preview mocks for Auth0 Universal Components in docs-v2/universal-components. Use when adding a component to the docs preview harness, when a preview renders blank or throws, or after bumping @auth0/universal-components-react. Triggers on requests like "add a mock for <Component>", "wire up the <Component> preview in docs", "the <Component> preview is broken", or "the preview shows Component not found".
license: Apache-2.0
metadata:
  author: Auth0 <support@auth0.com>
---

# Creating Universal Component Mocks

A preview mock is a fake `useXxx()` hook result handed to a component's headless `XxxView`, so the docs can render a live component with no tenant and no API calls.

All paths below are relative to `docs-v2/universal-components/`.

## How the harness fits together

```
main/docs/.../*.mdx
  └─ <ComponentLoader componentSelector="<key>" />
       └─ emits <div data-uc-component="<key>" data-uc-props="{...}">
            └─ src/index.tsx scans the DOM and looks up src/routes/index.ts
                 ├─ module[route.componentKey]      // the exported View symbol
                 └─ getComponentMock("<key>")       // src/helpers/getComponentMock.ts
                      └─ src/mocks/<key>-mock.ts
```

Four places must use the identical kebab-case key:

| File                              | Holds                                       |
| :-------------------------------- | :------------------------------------------ |
| `src/routes/index.ts`             | key → `componentKey` (exported View symbol) |
| `src/helpers/getComponentMock.ts` | key → mock factory                          |
| `src/mocks/index.ts`              | barrel export of the factory                |
| the `.mdx` doc                    | `componentSelector="<key>"`                 |

A mismatch shows up in the browser console as `Component "<X>" not found in module` or `No mock logic found for "<key>"`, with an empty preview.

## Steps

### 1. Confirm the View is a runtime export

A type-only export type-checks and then renders nothing.

```bash
grep -c "XxxView" node_modules/@auth0/universal-components-react/dist/index.mjs
```

If the symbol appears only in `dist/index.d.ts`, the library's barrel is missing it. Report that — it can't be fixed from docs-v2.

### 2. Read the prop contract from the installed package

Read the installed `.d.ts`, not the component's source in another repo — that repo tracks its own branch and drifts from what's installed here.

```bash
grep -n "XxxViewProps\|UseXxxResult" node_modules/@auth0/universal-components-react/dist/index.d.ts
```

List every field of `UseXxxResult` plus the extra props on `XxxViewProps`. Mocks are `any`-typed, so `tsc` won't catch a missing field — a gap surfaces as a runtime crash.

### 3. Match the shape

`src/index.tsx` spreads the mock three ways at once:

```tsx
<Component
  logic={mockData?.logic}
  handlers={mockData?.handlers}
  {...mockData}
/>
```

so both shapes work. Use whichever the `.d.ts` declares:

- **Flat** — `XxxViewProps extends UseXxxResult`. One object with every hook field at the top level, plus `styling`, `customMessages`, and any display props.
- **Nested** — `{ logic, handlers }`, or a named sub-object such as `{ domainTable, schema, styling }`.

Check a sibling mock in `src/mocks/` that shares the shape before writing a new one.

### 4. Decide the modal policy

Ask the requester if it isn't stated; otherwise infer from the component's purpose and match the sibling mocks already in `src/mocks/`.

**Live** — the reader should be able to open and complete the flows:

```ts
const [modalState, setModalState] = useState<ModalState>({ type: null });
const closeModal = () => setModalState({ type: null });
// ...
modalState,
openModal: (state: ModalState) => setModalState(state),
closeModal,
```

Each `handleXxxConfirm` then mutates the in-memory list, flips its `isXxx` flag around an `await delay()`, and calls `closeModal()`. Mirror the discriminated union from the `.d.ts` as a local `ModalState` type so `modalState.type === '...'` narrows to the payload.

**Suppressed** — pin the flags off and no-op the setters, so the modal cannot open at all:

```ts
const noop = () => {};
// ...
showDeleteModal: false,
setShowDeleteModal: noop,
```

### 5. Write the mock

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

/**
 * Mock for `XxxView`.
 */

const initialItems = [
  /* ... */
];
const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const getXxxMock = () => {
  const [items, setItems] = useState<any[]>(initialItems);
  const [isDeleting, setIsDeleting] = useState(false);

  return {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    customMessages: {},
    hideHeader: false,
    readOnly: false,

    items,
    isLoading: false,
    isDeleting,

    handleDeleteConfirm: async (item: any) => {
      setIsDeleting(true);
      await delay();
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setIsDeleting(false);
    },
  };
};
```

- **The factory is a hook** — it calls `useState` and is invoked from render by `getComponentMock`. Keep both `eslint-disable` lines; the file is deliberately `any`-typed and deliberately breaks the hook-naming rule.
- **No `Date.now()`, `Math.random()`, or `new Date()`** — use hardcoded ISO strings and a `useState` sequence counter for generated IDs. Nondeterministic previews cause diff noise and hydration mismatches.
- **Supply every loading and staleness flag** the `.d.ts` lists (`isFetchingX`, `isXStale`, `xUpdatedAt`) — a missing one often crashes formatting code.
- **`refetchX` is usually a TanStack Query `refetch`**, not a plain function. Check the `.d.ts`: if the prop resolves to `UseQueryResult<T>['refetch']`, it must return a full `QueryObserverResult` (26 fields — `isError`, `isPending`, `status`, …), and a bare `{ data }` will throw at render. Use the shared `mockRefetch(() => data)` helper from `src/mocks/query-result.ts`.
- **Navigation handlers log rather than navigate**: `console.log('[preview] navigate to ...', id)`.
- **Seed realistic, non-empty data** — 2–4 rows, `example.com` emails, `your-tenant.auth0.com` URLs, and one row per status the UI can render.

### 6. Wire the four files

```ts
// src/mocks/index.ts — import and re-export alphabetically

// src/helpers/getComponentMock.ts
"<key>": getXxxMock,

// src/routes/index.ts
'<key>': { LazyComponent: null, componentKey: 'XxxView' },
```

Then set `componentSelector="<key>"` in the `.mdx`, spelled identically.

### 7. Verify

```bash
pnpm tsc -b && pnpm lint && pnpm build
grep -c "XxxView" ../main/ui/universal-components/universal-components-*.umd.js
```

`pnpm tsc -b` is a **weak signal** — `any`-typed mocks hide a changed View contract.

To actually check the mock against the contract, write a temporary file that forces the comparison, one assertion per prop so every mismatch is reported rather than just the first:

```ts
// src/__typecheck.tsx — delete when done
import type { XxxViewProps as P } from '@auth0/universal-components-react';
import { getXxxMock } from './mocks/xxx-mock';
type M = ReturnType<typeof getXxxMock>;

export const _1: P['items'] = (0 as never as M)['items'];
export const _2: P['refetchItems'] = (0 as never as M)['refetchItems'];
export const _3: P['modalState'] = (0 as never as M)['modalState'];
// ...one line per prop
```

```bash
npx tsc --noEmit --jsx react-jsx --strict --moduleResolution bundler \
  --module esnext --target es2022 --skipLibCheck src/__typecheck.tsx
```

Each error names a prop whose mock value doesn't satisfy the declared type. Delete the file afterward — it's a scratch check, not something to commit.

Finish in the browser: `cd ../main && mint dev`, load the page, and watch the console for `not found in module` or `No mock logic found`.

## After a library version bump

A minor bump can reshape several Views at once, including renames of the exported View symbol (which breaks `componentKey` in `src/routes/index.ts`). Re-read `dist/index.d.ts` and diff **every** existing mock against it, not just the one you came for.

Also check peer dependencies. The bundle imports some of them directly, so a peer missing from `node_modules` stops every preview from mounting.
