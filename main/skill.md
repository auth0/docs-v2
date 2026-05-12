---
name: Auth0
description: Use when adding authentication to any application — detects your framework, sets up Auth0, and provides production-ready integration guides for 25 frameworks and platforms.
license: Apache-2.0
metadata:
  author: Auth0 <support@auth0.com>
  version: "1.1.0"
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
- **auth0-angular** — Angular 13+ with `@auth0/auth0-angular`
- **auth0-spa-js** — Vanilla JS, Svelte, SolidJS, or any SPA with `@auth0/auth0-spa-js`

## Full-Stack Frameworks

- **auth0-nextjs** — Next.js App Router and Pages Router with `@auth0/nextjs-auth0`
- **auth0-nuxt** — Nuxt 3/4 applications with `@auth0/auth0-nuxt`

## Backend Frameworks

- **auth0-express** — Express.js web applications with `express-openid-connect`
- **auth0-flask** — Flask web applications with `auth0-server-python`
- **auth0-fastify** — Fastify web applications with `@auth0/auth0-fastify`
- **auth0-java-mvc-common** — Java Servlet applications with `mvc-auth-commons`

## API Protection

- **express-oauth2-jwt-bearer** — Node.js/Express API JWT validation with `express-oauth2-jwt-bearer`
- **auth0-fastify-api** — Fastify API JWT validation with `@auth0/auth0-fastify`
- **auth0-fastapi-api** — Python FastAPI JWT validation with `auth0-fastapi-api`
- **auth0-springboot-api** — Spring Boot API JWT validation with `auth0-springboot-api`
- **auth0-aspnetcore-api** — ASP.NET Core API JWT validation with `Auth0.AspNetCore.Authentication`
- **go-jwt-middleware** — Go API JWT validation with `go-jwt-middleware`

## Mobile

- **auth0-react-native** — React Native CLI (bare workflow) with `react-native-auth0`
- **auth0-expo** — Expo managed workflow with `react-native-auth0`
- **auth0-android** — Android (Kotlin/Java) with `Auth0.Android`
- **auth0-swift** — iOS, macOS, tvOS, watchOS, visionOS with `Auth0.swift`

## Developer Tools

- **auth0-cli** — Auth0 CLI for tenant management, app configuration, and CI/CD automation

## Advanced Features

- **auth0-mfa** — Multi-Factor Authentication (TOTP, SMS, Email, Push, WebAuthn)
- **auth0-migration** — Migrate from Firebase, Cognito, Supabase, Clerk, or custom auth
- **acul-screen-generator** — Custom Universal Login screens with `@auth0/auth0-acul-react` or `@auth0/auth0-acul-js`

## Installation

```bash
npx skills add auth0/agent-skills
```

## Resources

- **Full documentation**: https://auth0.com/docs
- **LLM-optimized docs**: https://auth0.com/docs/llms.txt
- **Source repository**: https://github.com/auth0/agent-skills
