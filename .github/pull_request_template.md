## ✏️ Changes

Please describe what this PR changes and why. If this touches multiple documentation sites (`main/` and `auth4genai/`), please call that out.

## 📁 Documentation scope

**Site(s) affected:**
- [ ] `main/` - Auth0 main documentation
- [ ] `auth4genai/` - Auth0 for AI Agents documentation
- [ ] `ui/` - Shared component library
- [ ] Infrastructure/tooling

**Type of change:**
- [ ] New documentation
- [ ] Update to existing documentation
- [ ] Navigation/information architecture change
- [ ] Code examples or snippets
- [ ] UI component or Mintlify configuration
- [ ] Linting/tooling/workflows

## 🔗 References

Link to Jira issues, product specs, or related discussions:

https://auth0team.atlassian.net/browse/<issue>

## 🎯 Testing

**Local validation:**
- [ ] Ran `mint dev` in affected docs folder(s)
- [ ] Checked for broken links with `mint broken-links` (if applicable)
- [ ] Verified accessibility with `mint a11y` (if applicable)
- [ ] Built UI library with `npm run build` (if UI changes)

**Style compliance:**
- [ ] Follows the Contribution Guidelines (TBD)
- [ ] Follows placeholder conventions (`YOUR_SOMETHING`, `<id-value>`)
- [ ] Uses correct Auth0 terminology and sentence case for headings
- [ ] Code blocks include language and filename where appropriate
- [ ] All images wrapped in `<Frame>` components

## 🔄 Redirects

**Please add redirects if:**
- [ ] Pages are being removed or URLs are changing
- [ ] Navigation structure changes affect existing URLs

If redirects are needed, please add them to the `redirects` array in the appropriate `docs.json` file:
```json
{
  "source": "/docs/old-path",
  "destination": "/docs/new-path"
}
```

## 📊 Impact

**User-facing changes:**
Please describe any user-facing impact:
- Does this introduce new pages, remove pages, or change URLs?
- Does this document a new feature, Early Access capability, or breaking change?
- Are there plan restrictions (Enterprise/Professional) that need callouts?

**Dependencies:**
Please note any dependencies or coordination needs:
- Are there related PRs or release timing considerations?
- Does this require coordination with Product, Legal, or Security teams?

## 🚀 Deployment

✅🚫 This can be deployed any time (Mintlify auto-deploys on merge to main)

<!--
OR
⚠️ This should not be merged until:
- Other PR is merged because REASON
- After date because REASON
- Other condition: REASON
-->

## 📝 Follow-up

- [ ] No follow-up needed
- [ ] Follow-up issue/PR needed (describe below)

## 💬 Additional context

Please add any other context, screenshots, or preview links that would help reviewers.
