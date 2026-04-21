---
name: Auth0
description: Use when adding authentication to any application — detects your framework, sets up Auth0, and provides production-ready integration guides for 14+ frameworks and platforms.
license: Apache-2.0
metadata:
  author: Auth0 <support@auth0.com>
  version: "1.0.0"
  repository: https://github.com/auth0/agent-skills
---

# Auth0 Agent Skills

Auth0 provides AI agent skills for implementing authentication across any framework. Each skill contains best practices, code patterns, and step-by-step guidance tested against the latest Auth0 SDKs.

## Getting Started

Start here — this skill detects your framework and routes to the correct integration guide:

- **auth0-quickstart** — Framework detection and Auth0 setup

## Frontend Frameworks

- **auth0-react** — React SPAs (Vite, CRA) with `@auth0/auth0-react`
- **auth0-vue** — Vue.js 3 applications with `@auth0/auth0-vue`
- **auth0-angular** — Angular 12+ with `@auth0/auth0-angular`

## Full-Stack Frameworks

- **auth0-nextjs** — Next.js App Router and Pages Router with `@auth0/nextjs-auth0`
- **auth0-nuxt** — Nuxt 3/4 applications with `@auth0/auth0-nuxt`

## Backend Frameworks

- **auth0-express** — Express.js web applications with `express-openid-connect`
- **auth0-fastify** — Fastify web applications with `@auth0/auth0-fastify`
- **auth0-fastify-api** — Fastify API JWT validation with `@auth0/auth0-fastify`
- **auth0-aspnetcore-api** — ASP.NET Core API authentication

## Mobile

- **auth0-react-native** — React Native and Expo with `react-native-auth0`
- **auth0-android** — Android (Kotlin) with `Auth0.Android`

## Advanced Features

- **auth0-mfa** — Multi-Factor Authentication (TOTP, SMS, Email, Push, WebAuthn)
- **auth0-migration** — Migrate from Firebase, Cognito, Supabase, or custom auth

## Installation

```bash
# Install all skills via CLI
npx skills add auth0/agent-skills

# Or install individually
npx skills add auth0/agent-skills/plugins/auth0-sdks/skills/auth0-react
```

## Resources

- **Full documentation**: https://auth0.com/docs
- **LLM-optimized docs**: https://auth0.com/docs/llms.txt
- **Source repository**: https://github.com/auth0/agent-skills
