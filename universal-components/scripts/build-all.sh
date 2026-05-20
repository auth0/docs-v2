#!/bin/bash

if git diff --quiet HEAD -- package.json; then
  pnpm version patch --no-git-tag-version
fi

# Build TypeScript
pnpm tsc -b

# Build Vite
pnpm vite build

# Copy assets
pnpm copy:assets
