---
name: writing-auth0-docs
description: Use when authoring new documentation or fixing style/formatting violations in Auth0 docs-v2 repository - enforces Auth0 Docs Style Guide for terminology, voice/tone, admonitions, placeholders, capitalization, and translation readiness (not for reading/understanding docs)
---

# Auth0 Docs Authoring Skill

**Scope:** This skill applies ONLY to the Auth0 docs-v2 repository.

Use this skill when actively authoring new public Auth0 product documentation or fixing style violations in this repository to ensure content aligns with the Auth0 Docs Style Guide.

## When NOT to Use This Skill

**Do NOT load for:**
- Reading existing docs to understand Auth0 features or APIs
- Searching docs for information
- General discussion about documentation content
- Code implementation (even if docs-related)
- Navigating or exploring the docs repository

**Only load when actively authoring or correcting documentation style/structure.**

## Quick Reference

| Task | Reference File |
|------|----------------|
| Choose doc type (concept/guide/reference) | [documentation-types.md](reference/documentation-types.md), [document-structure.md](reference/document-structure.md) |
| Voice, tone, user focus | [focus-on-the-user.md](reference/focus-on-the-user.md) |
| Grammar, tense, pronouns, punctuation | [writing-mechanics.md](reference/writing-mechanics.md) |
| Tables, notes, callouts, code blocks | [formatting.md](reference/formatting.md) |
| Terminology, capitalization, UI wording | [word-lists.md](reference/word-lists.md) |
| Links, images, code, UI text | [other-conventions.md](reference/other-conventions.md) |
| Placeholders and template variables | [placeholders-and-template-variables.md](reference/placeholders-and-template-variables.md) |
| Translation-ready writing | [writing-for-translation.md](reference/writing-for-translation.md) |
| Deprecations, compliance, Early Access | [operational-policies-and-regulatory-articles.md](reference/operational-policies-and-regulatory-articles.md) |
| Overview and external resources | [auth0-docs-style-guide.md](reference/auth0-docs-style-guide.md), [references-and-resources.md](reference/references-and-resources.md) |

## Workflow

**Before drafting:**
- Choose doc type (concept/guide/reference) and title accordingly
- Plan headings for scannability, focus on one primary topic
- Note required terminology and compliance constraints

**While writing:**
- Voice/tone: Clear, approachable, user-focused
- Personalization: Use template variables (e.g., `{{yourDomain}}`) for tenant/client values
- Grammar: Present tense, active voice, imperative mood for instructions
- Headings: Sentence case (not title case)
- Language: Inclusive, accessible, avoid idioms/jargon
- Terminology: Use Word Lists for Auth0 features, capitalization
- Formatting: Follow rules for links, images, alt text, code blocks

**For translation readiness:**
- Short, unambiguous sentences
- Avoid and/or, (s) plurals, idiomatic phrasal verbs
- Define abbreviations on first use
- Reuse existing phrasing for translation memory

**For compliance/regulatory:**
- Legal/Security/Compliance teams are source of truth
- Follow structure for Early Access, Beta, deprecation notices
- Include required dates, replacement features, migration links

**When in doubt:** Prefer the most specific reference (Word Lists for terminology, Writing for Translation for international readers, Other Conventions for UI text/links). Apply guidance concisely without quoting verbatim.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Title case for headings | Use sentence case (only first word capitalized) |
| Warning for Enterprise plan restrictions | Use Callout with `icon="file-lines" color="#0EA5E9"` |
| Placeholder format `{{VAR}}` | Use `YOUR_SOMETHING` or `<something-id>` conventions |
| Passive voice in instructions | Use active voice and imperative mood |
| Using and/or or (s) for plurals | Write out both options or rephrase for clarity |
| Generic "click here" links | Use descriptive link text |
| Missing alt text for images | Provide specific, descriptive alt text |
