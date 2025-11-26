## 📝 Before you begin

By opening this PR, you agree to the terms of the [Auth0 Code of Conduct](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md). For guidance on creating a high-quality PR, see the [Contributing Guidelines](CONTRIBUTING.md).

## ✏️ Changes

Describe what this PR changes and why. Keep it brief.

- What problem does it solve?
- Which docs or UI areas are affected?
- Does it span more than one docs site (`main/`, `auth4genai/`) or the shared UI library (`ui/`)?

## 📁 Documentation scope

**Docs site(s) affected**

- [ ] `main/`
- [ ] `auth4genai/`

**Other areas**

- [ ] Shared UI library (`ui/`)
- [ ] GitHub workflows (`.github/workflows/`)
- [ ] Tooling or scripts (`tools/`)

**Type of change**

- [ ] New page or major section
- [ ] Update to existing content
- [ ] Navigation or structure change
- [ ] Code examples or snippets
- [ ] UI component or Mintlify configuration
- [ ] GitHub workflows (`.github/workflows/`)
- [ ] Scripts or tooling (`tools/`)

Add paths or permalinks if it helps reviewers.

## 🔗 References

Link any related issues, design docs, or connected PRs.

- Issue(s): #
- Related work:

## 🎯 Testing

Mark what you validated and note anything skipped.  
(Unit tests do not apply in this repo.)

**Local validation**

- [ ] Content-only change (no build or navigation impact)
- [ ] `mint dev` in affected folders
- [ ] `mint broken-links` (when applicable)
- [ ] `mint a11y` (when applicable)
- [ ] `npm run build` in `ui/` (for UI changes)

**Style and structure**

- [ ] Follows the Contributing Guidelines
- [ ] Uses correct Auth0 terminology
- [ ] Code blocks include language and filenames when needed

**Repo checks**

- [ ] All required GitHub checks are passing
- [ ] The correct base branch is used

If something was not run or does not apply, note it here.

## 🔄 Redirects

Use this section only if URLs change.

- [ ] Pages removed or permalinks changed
- [ ] Navigation changes that alter existing URLs

If redirects are needed, update the relevant `docs.json` and list them here:

```json
[
  {
    "source": "/docs/old-path",
    "destination": "/docs/new-path"
  }
]
```

## 🌍 Internationalization (main docs only)

* [ ] Not applicable - no English content changes in `main/`
* [ ] English only; localization handled separately
* [ ] Includes updates to localized content (for example, `main/docs/fr-ca/`, `main/docs/ja-jp/`)

Add notes if something needs follow-up in localized folders.

## 🧩 Impact and dependencies

**User-facing impact**

Summarize what readers will notice:

* New or removed pages
* URL changes
* New feature, Early Access feature, or breaking change
* Plan restrictions that need callouts

**Dependencies**

List anything this PR depends on or influences:

* Product release timing
* Related PRs or repos
* Follow-up docs needed after merge

## 🚀 Deployment

* [ ] Safe to deploy on merge
* [ ] Do not merge until a condition is met

If blocked, state the condition:

* Dependent PRs:
* Date or window:
* Other requirement:

## 📝 Follow-up

* [ ] No follow-up needed
* [ ] Follow-up work required

Add links or describe next steps if needed.

## 💬 Additional context

Optional. Add anything reviewers should know:

* Specific pages in the Mintlify preview you want checked
* Screenshots or diagrams (with alt text)
* Notes for specific reviewers

> [!TIP]
> Useful references:
>
> * [Contributing Guidelines](CONTRIBUTING.md)
> * Mintlify documentation: [https://www.mintlify.com/docs](https://www.mintlify.com/docs)
> * [main README](main/README.md)
> * [auth4genai README](auth4genai/README.md)
