# Standard screenshot workflow

This workflow defines how to capture, crop, format, and prepare screenshots for Auth0 documentation. All screenshots must follow these rules.

Most tasks can be completed with this file plus `SKILL.md`. Use the other reference files only when you need more detail on a specific topic.

## 1. Define the target state

Before capturing:

- Confirm that a screenshot is justified and additive. See `reference/alt-text-and-accessibility.md` for full guidance.
- Identify the exact Dashboard view and navigation path.
- Reproduce the exact page, tab, filter, or selection described in the doc.
- Ensure any values shown are safe, generic, and non sensitive.

## 2. Use a stable viewport

All Dashboard screenshots must use:

- Chrome
- Viewport size `1200 × 900`
- No browser window, tab strip, URL bar, or OS chrome

Avoid device emulation unless explicitly required.

## 3. Stabilize the UI

Before capturing:

- Wait for skeletons, spinners, and loading indicators to disappear.
- Ensure animations have finished.
- Dismiss banners, toasts, or modals unless they are directly relevant to the step being documented.
- Confirm text labels match the current Dashboard UI.

Avoid capturing transient UI or partially loaded states.

## 4. Capture a focused region

Screenshots must:

- Show only the relevant Dashboard panel, section, or control.
- Include enough surrounding context to confirm location without showing unnecessary UI.
- Prefer capturing the main content region rather than global navigation.

For navigation specific docs:

- Include only navigation elements that the instruction refers to.
- Crop out unrelated navigation or global UI.

For modals:

- Crop out the background entirely.
- Show only the modal content.

For close ups:

- When isolating a specific field or control, keep the crop tight and slightly smaller than full scale so it is not mistaken for live UI.

Avoid empty whitespace or unrelated regions.

## 5. Required formatting rules

All Dashboard screenshots must follow these formatting constraints:

- Border: `1px` centered border, color `#CCCCCC`
- Drop shadow: none
- Highlight color: `#0099CC` when needed
    - Highlights must be minimal and call attention to a specific element
- Capture width: `1200px`
- Maximum output width: `1500px`
- Expected render width: ~600px once scaled by Mintlify
- Browser window: never included
- File format: PNG

If highlighting multiple elements, use consistent markings that do not obscure UI labels.

## 6. Save and verify

After capturing:

- Verify:
    - Text is readable at the expected render size.
    - No sensitive or tenant specific values appear.
    - The UI state matches the narrative and current Dashboard behavior.
    - Labels and terminology match what the doc describes.
- Save using the paths and naming patterns in `reference/repo-paths-and-filenames.md`.
- Use descriptive, lowercase, hyphen separated filenames.

## 7. Alt text and accessibility

Every Dashboard screenshot must have alt text.

- Describe the purpose of the screenshot and the UI state.
- Include product area and view context.
- Keep it concise and aligned with the surrounding instructions.

See `reference/alt-text-and-accessibility.md` for examples.

## 8. Updating screenshots

When updating:

1. Capture with the same workflow and viewport.
2. Resize if needed so the final image remains within the maximum width.
3. Replace the existing asset.
4. Search for other pages using the same image and confirm correctness.
5. Update surrounding text if UI labels or layout changed.

Prefer stable UI states and minimal cropping changes to reduce churn for translators and dependent docs.

## 9. Mobile screenshots

For mobile UI examples in the Dashboard:

- Capture using the same stabilization and cropping rules where possible.
- Present them using the standard phone mockup component.
- Maintain the same border and highlight rules.
- Avoid decorative effects or device chrome that does not add information.
