# Screenshot inclusion and accessibility

This file defines when screenshots should be included, how to minimize accessibility and localization burden, and how to write alt text. For basic decisions, see `SKILL.md`. Use this file when you need more detailed guidance or examples.

## 1. When screenshots add value

Include a screenshot when it does at least one of the following:

- Reassures the user that they are in the correct UI location.
- Calls attention to a specific region or control within a complex UI.
- Supports an example that is hard to visualize from text alone.
- Shows a configuration screen with multiple interdependent settings.
- Serves as a first interface verification screenshot for a new section or product area.

Use an additive approach. The screenshot should reduce ambiguity or cognitive load, not just repeat the text.

## 2. When NOT to include screenshots

Avoid screenshots when:

- Text instructions alone can fully convey the step without confusion.
- The screenshot provides no additional technical information beyond what is already described.
- The user is likely to have the application open beside the docs and can see the referenced UI directly.
- The screenshot is used mainly as decoration or to break up long text.
- It duplicates exactly what is described in text, especially step by step instructions.
- It tries to verify every small step instead of the overall state.
- The UI changes frequently, making it hard to keep screenshots accurate.

Screenshots can slow reading, may confuse users if mistaken for live UI, and increase maintenance cost.

## 3. Accessibility considerations

- Every screenshot requires alt text.
- Alt text must stay in sync with the image and with the current UI.
- Localization multiplies maintenance cost for both image and text.
- Screenshots should never be the only source of information for a task.
- Users with disabilities must be able to complete tasks using text alone.

Design the doc so that removing the screenshot would not prevent a user from succeeding.

## 4. Localization considerations

- Each screenshot adds translation overhead.
- Alt text must be translated along with the rest of the content.
- Avoid embedding critical text inside images. When possible, rely on UI labels and body text instead of annotations rendered into the screenshot.

Only introduce new screenshots when they clearly improve comprehension enough to justify ongoing translation cost.

## 5. Alt text rules

Alt text must:

- Describe the purpose of the screenshot and the UI state, not the image itself.
- Indicate product area and UI section.
- Use sentence case.
- Use Auth0 terminology accurately and consistently.

Good examples:

- `Auth0 Dashboard Application Settings view showing Allowed Callback URLs field`
- `Auth0 Tenant Settings General tab with support email, logo, and session settings`
- `Docs UI quickstart card grid on the Get Started page`

Avoid:

- Generic text such as `screenshot` or `image of the UI`.
- Repeating captions or surrounding body text word for word.
- Describing every visual detail or pixel level layout.

## 6. Information placement

- Body text explains what the user must do and why.
- The screenshot clarifies or validates a complex UI state or set of controls.
- Alt text provides a brief textual stand in for the screenshot.

If a step references content that appears only in the screenshot, move that information into the body text so that screen reader users and translated versions are not dependent on the image alone.
