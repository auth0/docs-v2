#!/bin/bash

# Bump patch only if the version field hasn't been manually changed already
BASE_VER=$(git show HEAD:package.json | jq -r '.version')
CUR_VER=$(jq -r '.version' package.json)
if [ "$BASE_VER" = "$CUR_VER" ]; then
  pnpm version patch --no-git-tag-version
fi

# Build TypeScript
pnpm tsc -b

# Build Vite
pnpm vite build

# Copy assets
pnpm copy:assets
