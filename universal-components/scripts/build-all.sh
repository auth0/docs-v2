#!/bin/bash

# Always install latest Auth0 Universal packages
pnpm install @auth0/universal-components-core@latest @auth0/universal-components-react@latest

# Build TypeScript
pnpm tsc -b

# Build Vite
pnpm vite build

# Copy assets
pnpm copy:assets
