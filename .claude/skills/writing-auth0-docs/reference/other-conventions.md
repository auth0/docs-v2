# Other Conventions

We recommend these additional guidelines that govern the way we present and format various elements at Auth0.

### Brand names

When referring to Auth0 products, follow these guidelines:
- Use the full product name when first mentioned on a page (for example, “Auth0 Management API”).
- Use the abbreviated product name when further mentioned on the page (for example, “Management API”).
- Continue to use the full product name when it helps with clarity (for example, “You can use the Amazon Web Services (AWS) Console to configure an Amazon API Gateway proxy for the URL found in the CLI Console”).
- Don't use "the" before a product name unless you're using the name to qualify something else.
- Do use "the" before tool and API names.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Use Layer0 with Multi-factor Authentication | Use the Layer0 with Multi-factor Authentication |
| The Authentication API | Authentication API |
| The Universal Login Password Reset page | Universal Login Password Reset page |
| The Auth0 Dashboard | Auth0 Dashboard |

### Code

Format any inline code with a monospace font.

Add `code` styling for all text that refers to a command or other input or output from a CLI. This includes file paths (for example, `/etc/hosts/docker.conf`).

Do not include code in headings and titles.

### Code blocks

Use tabs for line indentation. Each nested line is indented one tab from the parent.

Control structures such as parentheses require spacing on the outside only:

```java
if (foo bar) {
  // do something
}
```

An opening curly brace should be on the line of the command that uses it. The closing one should be on its own line (or if it is part of something like an `else` statement, on the line with the `else`:

```java
if (foo bar) {
  // do something
} else {
  // do something different
}
```

…or:

```java
if (foo bar) {
  // do something
} else if (foo rae) {
  // do something different
}
```

### Placeholders and template variables

Auth0 documentation uses several types of placeholders to represent values that vary by user, tenant, or context. For comprehensive guidance on choosing and formatting placeholders, read [Placeholders & Template Variables](placeholders-and-template-variables.md).

**Quick reference:**

- Use `{{doubleCurly}}` for dynamic template variables that auto-populate: `{{yourDomain}}`, `{{yourClientId}}`
- Use `{singleCurly}` for URL path variables: `{yourDomain}`, `/api/v2/clients/{clientId}`
- Use `<ANGLE_BRACKETS>` for user-provided values: `<YOUR_MANAGEMENT_API_TOKEN>`
- Use `${dollar}` for build-time document variables: `${manage_url}`, `${auth0js_url}`

See also: [Google Developer Style Guide on Placeholders](https://developers.google.com/style/placeholders)

### Cross-references and links

Readers scan web pages looking for the information that they're after, so it’s important that link text is easy to find and understand. To achieve this goal, do the following:

#### Ensure link text is descriptive of its destination

When you scan link text, you should be able to instantly understand the content to which the link will direct you without reading any surrounding text.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| This is some text, lots and lots of lovely text. Now, here's a sentence with a link in it: Please read about how to [construct our widgets](http://test/) while visiting our website. Following this, there is more text, lots and lots of lovely text. And one more sentence, containing yet more text to illustrate this point. | This is some text, lots and lots of lovely text. Now, here's a sentence with a link in it: To read more about our widgets, please [click here](http://test/). Following this, there is more text, lots and lots of lovely text. And one more sentence, containing yet more text to illustrate this point. |

#### Place important words at the front of link text

When scanning for links, the first words readers see are the words at the front of the link text. They may not even read the words after the first two. Make sure the words conveying the most useful information to the reader are at the front of the link text where they are most likely to be seen.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Find out more about the [conference next week](https://www.webcredible.com/blog/writing-effective-link-text/#). | Find out more about [next week's conference](https://www.webcredible.com/blog/writing-effective-link-text/#). |

Do not include terminal punctuation inside the link.

#### Link text

Link text should describe any of the following:
- the action performed by the link
- the action referred to by the linked document
- the title of the linked document

Typically, parts of a sentence that refer to an action or task can be turned into links.

| ℹ️ **Examples** |
| --- |
| You can use the Dashboard or the Management API to [customize text for the new Universal Login experience](https://auth0.com/docs/universal-login/new-experience/text-customization-new-universal-login). |
| For help designing the infrastructure and system model, [download the Design Checklist](https://cdn2.auth0.com/docs/media/articles/architecture-scenarios/checklists/Design-Checklist.xlsx). |

Generally, nouns should be accompanied by a full, separate sentence explaining where the link goes and why you're referring the reader to that info. This is also true when multiple tasks are discussed in the same sentence.

**Baseline format**

`To learn more, read [article name].`

| ℹ️ **Examples** |
| --- |
| Because regular web apps are server-side apps where the source code is not publicly exposed, they can use the Authorization Code Flow, which exchanges an Authorization Code for a token. To learn more, read [Authorization Code Flow](https://auth0.com/docs/flows/authorization-code-flow). |
| You can assign roles to tenant users or to members of organizations. To learn how to assign roles to tenant users, read [Assign Roles to Users](https://auth0.com/docs/users/assign-roles-to-users). To learn how to assign roles to members of organizations, read [Add Roles to Organization Members](https://auth0.com/docs/organizations/add-member-roles). |

If there's a chance that "to learn more" isn't enough to let the reader know why they should click that x-ref link, add a description of what they'll learn more about.

`To learn more about [topic], read [article name].`

| ℹ️ **Examples** |
| --- |
| Use the SSO Session Timeout value instead of foo because foo is bad. To learn more about session timeouts, read [Session Lifetime Limits](https://auth0.com/docs/sessions/session-lifetime-limits). |
| ID tokens are JSON Web Tokens (JWTs) that eat daisies. To learn more about JSON Web Tokens, read [JSON Web Tokens](https://auth0.com/docs/tokens/json-web-tokens). To learn more about daisies, read Bellis Perennis. |

If “to learn more” fails to describe the purpose of clicking the link, it’s acceptable to use different language.

| ℹ️ **Examples** |
| --- |
| Authorization Core functionality is different from the Authorization Extension. For a comparison, read [Authorization Core vs. Authorization Extension](https://auth0.com/docs/authorization/authorization-core-vs-authorization-extension). |

##### External links

For external links, add information about where you're sending the reader.

`To learn more, read [article name] on [domain name].`

or

`To learn more, read [article name] in [document name].`

| ℹ️ **Examples** |
| --- |
| Enter your application's origin URL to tell the server where the request comes from. To learn more, read [Origin in Mozilla MDN Webdocs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin). |
| Use only certified OpenID Connect deployments. For more information, read [OpenID Connect Certification on openid.net](https://openid.net/certification/). |

#### Exceptions and notes

- Endpoints can be linked within a sentence (inline text). For example "Use the `GET /userinfo` endpoint to..." Be sure to use proper format and capitalization for endpoint cross-references.
- Glossary pop-ups (when we have them) can just be hot words or phrases.
- Links to the dashboard: use the “Navigate to [Auth0 Dashboard > Authentication > Database](https://manage.auth0.com/#/connections/database)" style.

### Elements

Present inline elements in lowercase to maintain consistency with post-XHTML best practices and improve readability.

| ℹ️ **Examples** |
| --- |
| I extract the content of the `div` and add it to the list. |

### Functions

For function and method references in paragraphs, include their associated `()` unless being addressed specifically as a function or method.

| ℹ️ **Examples** |
| --- |
| In this section, we pass the variable to `doSomething()`. |
| In this section, we pass the variable to the `doSomething` function. |

### Glossary terms

Glossary terms are maintained in our CMS and listed in our [Identity Glossary](https://auth0.com/docs/glossary).

A tooltip for any term from the glossary can be manually linked to from inside Docs content by embedding an inline entry to the Glossary Entry for the desired term through our CMS.

Much like acronyms, glossary tooltips should only be added to the first occurrence of the word on a page. Overusing tooltips can unnecessarily distract the reader from content.

### Images

Images should be no more than 1500px wide.

The preferred file format for screenshots and diagrams is PNG. The preferred file format for logos is SVG.

When you need to add a graphic, optimize to make the file size as small as possible while retaining quality.

Make sure you have permission to use any included graphics.

Be sure to include descriptive alt-text for the graphic to help users with accessibility issues.

A diagram or illustration should never be the sole source of any piece of information for the reader.

Avoid referencing images in text to avoid translation quirks later. If there's a setting that's only in screenshot, make sure it is in explained the text.

#### Alt-text for images

Accompany each image with alt-attribute text that concisely provides the information contained in or explains the function of the image. Use sentence-casing.

| ✅ **Preferred** |
| --- |
| Use descriptive alt text that explains the action shown (e.g., "Plug cable into the bottom edge of the phone.") |
| Pair images with clear body text that explains what to do. |
| ❌ **Discouraged** |
| Use generic alt text that just names the action (e.g., "Charging phone") |
| Rely on images alone without supporting text explanation. |

A diagram or illustration should never be the sole source of any piece of information for the reader. Body text must explain what is in the diagram. When your body text does its job, then alt text for the diagram can be simple.

**Baseline format**

`[Diagram Title] [optional descriptor] diagram`

| ℹ️ **Examples** |
| --- |
| Identifier First login flow diagram |
| Cat Video Prevention process diagram |
| Architecture Vulnerabilities diagram |

### Multimedia

For audio-only content, provide a transcript. For audio and visual content, provide both a transcript and captions. Include both the spoken information and sounds that are important for understanding the content (for example, “door creaks”). For video transcripts, also include a description of the important visual content (for example, “Ethan leaves the room”).

### Screenshots

Keep screenshots to a minimum. Before you include screenshots, consider the following:
- Task-oriented content requires fewer screenshots than a descriptive approach.
- Usability studies show that users tend to scroll through screenshots to get to the next piece of information.
- Content that describes everything in text is more accessible to users with disabilities than content with text plus screenshots.
- You must add and maintain alternative text for each screenshot.
- Screenshots add to the localization burden.
- Screenshots clutter up small device screens.
- Screenshots quickly become out-of-date, especially for third-party products.

Use the following guidelines:
- Do not use screenshots as a matter of course.
- Include a screenshot only when a step is exceedingly complicated and a screenshot will alleviate the need for numerous, convoluted sub-steps.
- Make sure that a screenshot supports the text rather than simply verifies or repeats what the text says.
- Do not use screenshots in place of text for steps the user needs to perform.
- Clearly note how to navigate to a screen in the steps.
- Provide alt text.
- Use SVG files or crushed PNG images.
- Provide high-resolution images when practical.


#### Alt-text for screenshots

A screen shot should never be the sole source of any piece of information for the reader. Avoid adding arrows, circles, or text to a screenshot to serve as a step in a process. Instead, write body text that explains what is shown. When your body text does its job, then alt text for the screenshot can be simple.

**Baseline format**

For most cases (where the view section is optional):

[Dashboard section] [subsection] [view] [view section] view

| ℹ️ **Examples** |
| --- |
| Auth0 Branding Universal Login Settings tab |
| Auth0 Tenant Settings General tab |

Follow the same idea for other screenshots.

| ℹ️ **Examples** |
| --- |
| Auth0 Roles Add Role |
| Microsoft Server 2016 FPRG Settings Grants tabm |

### Tags

Pluralize tag names. Use all lowercase. Hyphenate multi-word tags.

### UI text styling

Text taken from a GUI, such as menu text or button text, should be bold. Use the text exactly as it appears in the GUI. For example: Select **Continue** to save the settings.

Text that refers to a keyboard command or hotkey should be capitalized and bold. For example: **Ctrl-D**.

Text from a CLI should be quoted verbatim, even if it contains errors or its style contradicts this guide. You can add “(sic)” after the quote to indicate the errors are in the quote.

When writing CLI examples, give the user hints by making the examples resemble exactly what they see in their shell:
- Render shell examples as code blocks.
- Start typed commands with `$ `(dollar space), so that they are easily differentiated from program output.
- Program output has no prefix.
- Comments begin with `# `(hash space).

Test all code samples to ensure that they are correct and functional so that users can successfully copy-and-paste samples directly into the CLI.
