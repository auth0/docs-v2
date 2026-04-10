#!/bin/bash

# Build TypeScript
pnpm tsc -b

# Build Vite
pnpm vite build

# Copy assets
pnpm copy:assets
