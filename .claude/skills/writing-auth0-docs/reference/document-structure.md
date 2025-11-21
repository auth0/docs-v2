# Document Structure

Document structure describes the organization of a document into graphical elements, such as sections, paragraphs, and sentences.

### Headings

Use short headings to group related paragraphs and clearly describe the sections. Good headings provide an outline of the content.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Use clear section headings to organize content logically | Avoid walls of text without clear heading structure |

### Verb forms

In headings with verbs, avoid the infinitive and gerund form and use the simple tense.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Connect a custom database | How to connect a custom database<br>Connecting a custom database |
| Assign and change users | Assigning and changing users |

### Ambiguity

Include all words that you need to clarify what is in the section.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| IP routing protocols | Routing protocols |
| Use scripts to monitor user activity | Monitoring scripts |
| Suggestions for setting up user metadata | Things to consider |
| Reverse proxy server requirements | Requirements |

### Capitalization

Use title case for document titles; capitalize every word except articles (“a”, “an”, “the”), coordinating conjunctions (“and”, “but”, “or”, “nor”, “for”, “so”, and “yet”), and [prepositions](https://grammarist.com/grammar/prepositions) fewer than four letters long. Capitalize the second part of hyphenated major words (for example, Self-Report rather than Self-report) unless the first element is a prefix like “pre-”, “post-”, or “anti-” (for example, Post-game rather than Post-Game).

Use sentence case for headings. Capitalize only the first word of each heading (unless it is case-sensitive) and all proper nouns.

### Singular vs. plural forms

Use the plural form of nouns in headings unless the singular form is obviously required.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Restore backup files | Restoring a backup file |
| Create Delegated Admin Applications | Create a Delegated Admin Application |
| Install the Delegated Admin Extension | Installing the Delegated Admin Extension |

## Content

### Introductory text

In the first few sentences, try to describe who, what, and when. Include an example if possible.

Avoid using phrases like:
- This guide will show...
- This tutorial shows you...
- This article describes...
- This document...
- Auth0 offers...

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| As a tenant administrator, use the Delegated Admin Extension to allow a select group of your users to access the Users section of the Auth0 Dashboard. | This guide will show you how to install the Delegated Admin Extension, which allows you to expose the Users section of the Auth0 Dashboard to a select group of users without allowing them access to the rest of the Dashboard. |
| If you are responsible for managing your build system, use the Deploy CLI tool to manage a configuration repository for each environment and deploy them using the command line. | Auth0 offers a Deploy CLI tool that we recommend you incorporate into your build system. |

### Body text

In general, keep paragraphs short for internet reading.

Also, consider the following:
- Subheadings are not independent statements. Repeat the information from the subheading in the paragraph.
- When mentioning several elements, use lists.
- Avoid abbreviations. Use “for example” instead of “e.g.” Do not use “etc”.
- Refer to the developer's customer as the "user".
- If you need to use the name of a fictional company, use "ExampleCo".
- Don't pre-announce anything. Avoid “currently” or “available in an upcoming release”.
- Avoid overusing adjectives or adverbs. Never use more than two in a sentence.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| To enable authentication in your application, use the OpenID Connect (OIDC) middleware. | The easiest way to enable authentication with Auth0 in your application is to use the OpenID Connect middleware. |
| Once a user has logged in, you can go to `/Account/Claims` to see these claims. | Once a user has signed in, you can simply go to `/Account/Claims` to see these claims. |

### Steps

Use the imperative form for steps.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Save authentication data. | Authentication data should be saved. |
| Set user email preferences. | Email preferences can be set. |

If an action is required, use "must".

If an action is available, use "can".

If an action is optional, use "may".

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| To limit access to your resources, you must use scopes. | To limit access to your resources, you should use scopes. |
| To limit access to your resources, use scopes. | You might want to use scopes to limit access to your resources. |
| You may want to create more access roles. | Creating more access roles is possible. |

Use "select" when referring to text links in a webpage or UI components. Remember that the UI may be rendered differently on different devices

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Select **Save**. | Click **Save**. |
| Select **Go to Settings** to access the settings section. | Click **Go to Settings** to access the settings section. |

Depending on the situation, the reader can "gain access", "grant access", or "allow access".

## Nesting

Avoid deep nesting of document structure. Three levels of headings are usually enough.

The same applies to lists: avoid lists that are nested too deeply, in most cases, two levels should be enough.
