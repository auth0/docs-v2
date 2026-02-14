# Quickstart AI Integration Strategy

## Overview

This document outlines the strategy for AI-assisted Auth0 integration in quickstart documentation. We've replaced large embedded AI prompts with Auth0 Agent Skills references for supported frameworks, while maintaining framework-specific prompts for unsupported frameworks.

## Changes Made

### 1. Created Agent Skills Snippets

Created reusable MDX snippets in `/main/snippets/` for frameworks with agent skills support:

- `quickstart-agent-skills-react.mdx` - React integration guide (~23 lines)
- `quickstart-agent-skills-vue.mdx` - Vue 3 integration guide (~23 lines)
- `quickstart-agent-skills-angular.mdx` - Angular integration guide (~23 lines)
- `quickstart-agent-skills-nextjs.mdx` - Next.js integration guide (~23 lines)

Each snippet is a **collapsible accordion** containing:
- One-sentence explanation of what agent skills are
- Installation command (`npx skills add auth0/agent-skills`)
- Framework-specific example prompt
- What the AI will do (1 sentence)
- Note with link to manual steps and full agent skills documentation

### 2. Updated Quickstarts with Agent Skills Support

Replaced large accordion prompts (200-740 lines each) with agent skills snippets:

**Updated Files:**
- `/main/docs/quickstart/spa/react/index.mdx` - Reduced from 1,385 to 737 lines (648 lines removed)
- `/main/docs/quickstart/spa/vuejs/index.mdx` - Removed ~685 line accordion
- `/main/docs/quickstart/spa/angular/index.mdx` - Removed ~727 line accordion
- `/main/docs/quickstart/webapp/nextjs/index.mdx` - Removed ~649 line accordion

**Total Reduction:** ~2,709 lines of duplicated prompt content removed from these 4 files alone.

### 3. Created NEW Agent Skills

Created new agent skills in the agent-skills repository for previously unsupported frameworks:

**New Skills Created:**
- `/plugins/auth0-sdks/skills/auth0-svelte/` - Complete skill with SKILL.md and 3 reference files (setup.md, integration.md, api.md)
- `/plugins/auth0-sdks/skills/auth0-vanilla-js/` - Complete skill with SKILL.md and 3 reference files
- `/plugins/auth0-sdks/skills/auth0-fastapi/` - Complete skill with SKILL.md and 3 reference files

Each skill follows the writing-skills pattern from claude-marketplace:
- Gerund naming convention (auth0-svelte, auth0-vanilla-js, auth0-fastapi)
- "Use when..." description format
- Quick Start Workflow with 5 steps
- Progressive disclosure with references/ folder
- Automated setup scripts (Bash/PowerShell)
- Integration guides with advanced patterns
- Complete API reference documentation

### 4. Updated Quickstarts WITH New Agent Skills Support

Updated quickstarts to include agent skills accordions:

**Updated Files:**
- `/main/docs/quickstart/spa/svelte/index.mdx` - Added agent skills accordion (defaultOpen) with auth0-svelte skill
- `/main/docs/quickstart/spa/vanillajs/index.mdx` - Added agent skills accordion (defaultOpen) with auth0-vanilla-js skill
- `/main/docs/quickstart/webapp/fastapi/index.mdx` - Added agent skills accordion (defaultOpen) with auth0-fastapi skill

Each now has:
- Primary accordion: Agent skills (defaultOpen) with install command and example prompt
- Secondary accordion: Framework-specific AI prompt as alternative

**Frameworks Still Using ONLY Embedded Prompts:**
- Capn Web (SPA)
- ASP.NET Core (Web App)
- ASP.NET Core Blazor Server (Web App)
- ASP.NET Core Web API (Backend)

**Action Required:** When agent skills add support for these frameworks, update the quickstarts following the pattern used for React/Vue/Angular/Next.js.

## Benefits of This Approach

### 1. Reduced Maintenance Burden
- Single source of truth for agent skills instructions
- Changes to installation steps only need to be made in 4 snippet files instead of 12+ quickstart files
- Easier to keep instructions consistent and up-to-date

### 2. Better Developer Experience
- Developers can install agent skills once and use across all projects
- Versioned skills through GitHub repo ensure best practices are always current
- **Concise accordion format** - Agent skills section is collapsible, manual integration is 1 scroll away (not 3)
- Inline guidance with just the essentials (install command, example prompt, link to full docs)

### 3. Scalability
- Easy to add new framework snippets as agent skills expand
- Clear pattern for transitioning from embedded prompts to agent skills
- Embedded prompts remain as fallback for unsupported frameworks

### 4. Discoverability
- Prominent callout at top of each quickstart
- Multiple installation paths (CLI, plugins, manual) to match developer preferences
- Links to comprehensive agent skills documentation for advanced usage

## Usage Patterns

### For Supported Frameworks (React, Vue, Angular, Next.js)

```mdx
import QuickstartAgentSkills from "/snippets/quickstart-agent-skills-react.mdx";

<QuickstartAgentSkills />

<Note>
  **Prerequisites:** Before you begin, ensure you have the following installed:
  ...
</Note>
```

### For Unsupported Frameworks (Svelte, ASP.NET, FastAPI, etc.)

```mdx
<Info>
**Want to use AI to integrate Auth0?** [Auth0 Agent Skills](/quickstart/agent-skills) provide structured guidance for AI coding assistants. [Framework] support is coming soon. In the meantime, use the AI prompt below.
</Info>

<Accordion title="AI Prompt ([Framework]-specific)" icon="microchip-ai" iconType="sharp-solid">
  Add this prompt to Cursor, Windsurf, Copilot, Claude Code or your favourite AI-powered IDE to speed up development.

  ```markdown expandable
  [Framework-specific prompt content]
  ```
</Accordion>
```

## Next Steps

### 1. Agent Skills Created ✅
Successfully created agent skills for:
- ✅ Svelte - `auth0-svelte` skill in agent-skills repo
- ✅ Vanilla JS - `auth0-vanilla-js` skill in agent-skills repo
- ✅ FastAPI - `auth0-fastapi` skill in agent-skills repo

### 2. Remaining Frameworks Needing Agent Skills
Create agent skills for these frameworks (following the same pattern):
- ASP.NET Core (Web App) - needs `auth0-aspnet-core` skill
- ASP.NET Core Blazor Server - needs `auth0-blazor-server` skill
- ASP.NET Core Web API (Backend) - needs `auth0-aspnet-webapi` skill
- Capn Web (SPA) - needs clarification on framework/SDK

### 3. Test New Skills
Test the newly created skills on sample applications:
1. Create a Svelte app and use `npx skills add auth0/agent-skills`, then ask AI to "Add Auth0 authentication to my Svelte app"
2. Create a vanilla JS app and test the auth0-vanilla-js skill
3. Create a FastAPI app and test the auth0-fastapi skill

Verify that:
- Skills install correctly via CLI
- AI can discover and use the skills
- Code examples work correctly
- Setup scripts function properly
- Documentation is accurate and complete

### 4. Consider Additional Skills
Potential future skills for frameworks that already have basic agent support:
- `auth0-express` - Express.js (skill exists, check if needs updates)
- `auth0-react-native` - React Native (skill exists, check if needs updates)
- `auth0-nuxt` - Nuxt (skill exists, check if needs updates)

### 4. Maintain Consistency
When updating agent skills documentation or snippets:
- Ensure all snippets follow the same structure
- Keep installation instructions identical across all snippets
- Update example prompts to match actual agent skill capabilities
- Test with actual AI assistants to verify instructions work

## Rollout Complete

✅ **Phase 1:** Created agent skills snippets for 4 frameworks (React, Vue, Angular, Next.js)
✅ **Phase 2:** Updated 4 quickstarts with agent skills (React, Vue, Angular, Next.js)
✅ **Phase 3:** Created NEW agent skills for 3 frameworks (Svelte, Vanilla JS, FastAPI)
✅ **Phase 4:** Updated 3 quickstarts to use new agent skills (Svelte, Vanilla JS, FastAPI)

**Remaining:**
- Create agent skills for 4 frameworks (ASP.NET Core variants, Capn Web)
- Test newly created skills on sample applications
- Update remaining quickstarts once agent skills are available

## Metrics

- **Lines of code removed:** ~2,709 lines from 4 quickstarts
- **Maintenance files reduced from:** 12+ to 4 snippet files
- **Developer experience improved:** Inline installation guidance with verification steps
- **Scalability:** Clear pattern for future framework additions
