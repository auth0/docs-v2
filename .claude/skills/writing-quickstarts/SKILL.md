---
name: writing-quickstarts
description: Guides technical writers through creating Auth0 QuickStart guides that address known usability patterns. Use when writing new QuickStarts, improving existing integration guides, clarifying navigation, structuring prerequisites, or simplifying external service setup.
---

# Writing Auth0 QuickStarts

Create QuickStart guides that help users integrate Auth0 authentication successfully.

Refer to the `writing-auth0-docs` skill for comprehensive style guide information including voice, tone, terminology, and formatting conventions.

## Known usability patterns

QuickStart users consistently struggle with:
- **Dashboard navigation**: Multiple Settings pages in the Auth0 Dashboard with similar names cause confusion
- **Setup flow distinction**: Users treat setup steps as part of main workflow, not separate preparation
- **External service complexity**: Third-party configurations involve platform switching and unfamiliar interfaces
- **Resource relationships**: Similar Auth0 resources need explicit differentiation
- **Missing context**: Users need to understand why each step matters, not just how

## QuickStart structure

QuickStarts are guides that help readers complete a task efficiently. Structure every QuickStart in three phases:
- **Setup phase**: Dashboard configuration and resource creation
- **Integration phase**: Code implementation and configuration
- **Verification phase**: Testing and troubleshooting

Name sections appropriately for your context while maintaining this logical flow.

## Start with goals and prerequisites

Begin every QuickStart with a clear goal explaining what the developer will achieve.

List all prerequisites:
- Programming language familiarity
- Required concepts
- Installed developer tools
- Required user accounts
- Existing configuration needs

Make each step clear about why it needs to be followed.

## Setup phase

Provide the same level of detail as your integration section. Users don't mentally separate these phases.

### Navigation must be explicit

Always specify which Settings page in the Auth0 Dashboard you mean. The Dashboard contains multiple Settings pages:
- Application Settings (specific to each application)
- Tenant Settings (account-wide settings)
- API Settings (specific to each API)

Never write "Go to Settings" without qualification. Always provide full navigation paths with dashboard links.

### Structure each resource setup

For each resource:
1. Purpose statement - why this resource exists and how it's used
2. Navigation - exact path with dashboard link
3. Configuration steps - numbered, sequential instructions
4. Field explanations - what each setting does and why it matters
5. Checkpoint - confirmation of correct state via callout
6. Forward reference - how this connects to integration

### Writing steps effectively

- Tell users what the outcome should be before describing the behavior
- List actions in the order they need to happen
- Be direct and concise for introductory text

## Integration phase

### Start with environment configuration

Always begin with environment setup showing exact format. Explain what each value represents and where it came from.

### Include complete examples

Examples are crucial - many developers copy and paste. Ensure:
- Each step has an example
- Examples can be copied, pasted, and executed
- Placeholders are clearly highlighted when values need replacement
- Downloaded projects match examples exactly (naming conventions, structure, code location)

### Code quality requirements

- Include all imports
- Use realistic, descriptive variable names
- Comment Auth0-specific parts
- Connect each parameter back to dashboard configuration with inline comments
- Show complete, runnable code - not snippets requiring assembly

### Explain configuration parameters

For each parameter describe:
- What it is
- Why it's needed
- What value to use
- How it connects to dashboard configuration

### Maintain consistent terminology

Choose one term for each concept throughout. Don't alternate between synonyms.

## Verification phase

### Testing and troubleshooting

- Number each verification step showing exactly what should happen
- Use accordions when you have four or more common errors
- For each error: show the message, explain the cause, provide resolution steps
- Explicitly state what indicators show successful integration

### Notes and warnings

- **Notes**: General information that would be nice to know
- **Warnings**: Information that may cause failure if not followed
- Place warnings exactly where the user needs to perform the related action

## External service setup pattern

Third-party configurations require platform switching and unfamiliar interfaces. Use a clear two-part structure.

### External service configuration
- Set context explicitly - state you're leaving Auth0 and entering another platform
- Tell users to keep both tabs open
- Number steps clearly with descriptive headers for each phase
- Provide exact values with placeholder replacement instructions
- Add checkpoints confirming what credentials or settings should exist

### Auth0 connection configuration
- Bridge back explicitly - state you're returning to Auth0 Dashboard
- Show exactly where external credentials go in Auth0
- Show how to activate the connection for the application
- Provide test procedure with common error resolutions

## Clarify complex relationships

When users must create multiple related resources:
- Use callout upfront to indicate which tech stacks require these steps
- Provide skip-ahead link for others
- Create clear contrast: what each represents, how they differ, why both needed, how they work together
- Show relationship visually if possible
- Show exactly how each resource appears in code

## Break tasks into steps and sub-tasks

QuickStarts can be read in parts or as a whole. Use clear hierarchy.

When describing a feature, answer:
- Who typically does the task?
- What is the goal?
- Why is the task needed?
- When and where in the workflow should it happen?
- Does it deserve its own section or fall under a larger task?

Don't add too much conceptual information in step descriptions. Link to concept documentation instead.

Break out reference sections (tables, lists, best practices, troubleshooting) into separate documents when they could be reused.

## Headings

Use sentence case - only capitalize first word and proper nouns or Auth0 product names.

Use simple tense, not progressive or gerund forms.

Use task-oriented titles describing performance goals, not Auth0-specific feature names.

## Content patterns

- **Callouts**: Supplementary information or warnings for critical issues
- **Cards**: "Find your X" helpers, concept clarifications, related information
- **Accordions**: Lists of four or more items (troubleshooting, optional features, detailed references)
- **Tabs**: Same result through different paths (Dashboard vs API, different providers/frameworks)
- **Tooltips**: First mention of Auth0 or CIAM terms, linking to glossary

## Content organization checklist

Before publishing verify:

**Structure**
- Setup matches integration detail level
- Steps numbered sequentially
- Purpose stated for each section
- Tasks broken into appropriate sub-tasks
- Minimal conceptual information (linked to concept docs)

**Navigation**
- Specific Dashboard Settings page identified (Application, Tenant, or API)
- Dashboard links provided
- Full paths shown
- Device-agnostic directions ("select" not "click", avoid "scroll")

**Explanations**
- Setup steps explain why needed
- Format-sensitive values have examples
- Resource relationships clarified
- Glossary terms have tooltips

**Code**
- Examples complete and runnable
- Can be copied, pasted, and executed
- Placeholders clearly highlighted
- Auth0 parts commented
- Variable names descriptive
- Downloaded projects match examples exactly

**Verification**
- Checkpoints after major steps
- Testing instructions provided
- Troubleshooting organized (accordions for 4+ items)
- Success criteria defined
- Warnings placed exactly where needed

**External integrations**
- Two-part structure clear
- Platform switching explicit
- Exact configuration values
- Verification included

## Common mistakes

- **Vague navigation**: Always specify which Settings page (Application, Tenant, or API) and provide link
- **Assumed knowledge**: Never assume users know where to find Auth0 resources
- **Missing purpose**: Every configuration step needs a "why"
- **Inconsistent terms**: Pick one name per concept and stick with it
- **Tech stack assumptions**: Note which instructions vary by stack
- **Generic link text**: Make link titles scannable and descriptive
- **Wrong verb/noun forms**: "Log in" (verb) vs "login" (noun), "set up" (verb) vs "setup" (noun)
- **Wrong heading case**: Use sentence case, not title case
- **Progressive tense in headings**: Use simple tense
- **Expectations last**: Tell users what will happen before what to do
- **Too much concept**: Link to explanatory documentation instead
- **Reference sections inline**: Break out reusable reference information
