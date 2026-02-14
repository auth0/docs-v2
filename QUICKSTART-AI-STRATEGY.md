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

### 3. Updated Quickstarts WITHOUT Agent Skills Support

For frameworks not yet supported by agent skills, we added an `<Info>` callout above the existing accordion:

**Example (Svelte):**
```mdx
<Info>
**Want to use AI to integrate Auth0?** [Auth0 Agent Skills](/quickstart/agent-skills) provide structured guidance for AI coding assistants. Svelte support is coming soon. In the meantime, use the AI prompt below.
</Info>

<Accordion title="AI Prompt (Svelte-specific)" icon="microchip-ai" iconType="sharp-solid">
  Add this prompt to Cursor, Windsurf, Copilot, Claude Code or your favourite AI-powered IDE to speed up development.
  ...
</Accordion>
```

**Frameworks Still Using Embedded Prompts:**
- Svelte (SPA)
- Vanilla JS (SPA)
- Capn Web (SPA)
- ASP.NET Core (Web App)
- ASP.NET Core Blazor Server (Web App)
- ASP.NET Core Web API (Backend)
- FastAPI (Web App and Backend)

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

### 1. Monitor Agent Skills Repository
Watch https://github.com/auth0/agent-skills for new framework support additions:
- Svelte
- ASP.NET Core
- FastAPI
- Ruby on Rails
- PHP/Laravel
- Mobile frameworks (iOS, Android, Flutter)

### 2. Update Additional Frameworks
As agent skills expand coverage, migrate remaining quickstarts from embedded prompts to agent skills snippets:

1. Create new snippet file: `/main/snippets/quickstart-agent-skills-[framework].mdx`
2. Update quickstart: `/main/docs/quickstart/[type]/[framework]/index.mdx`
3. Remove the large accordion block
4. Add import and `<QuickstartAgentSkills />` component

### 3. Consider Additional Snippets
Potential future snippets:
- `quickstart-agent-skills-express.mdx` - Express.js (already has agent skill)
- `quickstart-agent-skills-react-native.mdx` - React Native (already has agent skill)
- `quickstart-agent-skills-nuxt.mdx` - Nuxt (already has agent skill)

### 4. Maintain Consistency
When updating agent skills documentation or snippets:
- Ensure all snippets follow the same structure
- Keep installation instructions identical across all snippets
- Update example prompts to match actual agent skill capabilities
- Test with actual AI assistants to verify instructions work

## Rollout Complete

✅ **Phase 1:** Created agent skills snippets for 4 frameworks
✅ **Phase 2:** Updated 4 quickstarts with agent skills (React, Vue, Angular, Next.js)
✅ **Phase 3:** Updated 1 quickstart without agent skills to reference them (Svelte)

**Remaining:** Update the other 7 quickstarts without agent skills (Vanilla JS, Capn Web, ASP.NET variants, FastAPI) with similar Info callouts.

## Metrics

- **Lines of code removed:** ~2,709 lines from 4 quickstarts
- **Maintenance files reduced from:** 12+ to 4 snippet files
- **Developer experience improved:** Inline installation guidance with verification steps
- **Scalability:** Clear pattern for future framework additions
