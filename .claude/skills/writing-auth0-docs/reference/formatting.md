# Formatting

Formatting includes the visual representation of elements on the page.

### Dates

Use unambiguous date formatting.

In general, spell out the names of months and days of the week in full. Give the full four-digit year, not a two-digit abbreviation.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| 21 December | Dec. 21 |
| 21 December 2048 | Dec. 21, 2048 |
| December 2048 | Dec. 2048 |
| 21 December | 12/21 |

If including the day of the week, add it before the month as follows: day-of-week day-month year.

| ℹ️ **Examples** |
| --- |
| Tuesday, 19 January 2017 |

When giving only the month and year, don't use a comma.

| ℹ️ **Examples** |
| --- |
| She was hired in January 2017. |

## Document variables and placeholders

Auth0 documentation uses several types of variables and placeholders to represent dynamic values. For complete guidance on all variable types, catalogs, and usage guidelines, read [Placeholders & Template Variables](placeholders-and-template-variables.md).

**Summary of variable types:**

1. **Dynamic Template Variables** (`{{doubleCurly}}`): Auto-populate from logged-in user's session
2. **Build-time Document Variables** (`${dollar}`): Replaced during build process
3. **Static Placeholders** (`{singleCurly}` or `<ANGLE>`): Manual replacement by users

## Endpoint names

Write about endpoints with the following guidelines:
- Endpoint names should be capitalized and not bold when used in-text: Discovery endpoint, Authorization endpoint, Token endpoint.
- Endpoints with names longer than one or two words should also be capitalized with the exception of prepositions and articles (that is, with, to, the, a, an), such as Update a Hook endpoint, Get a Job endpoint, Get a Client endpoint, Where Is My Dog endpoint.
- Endpoint names denoted as a path should not be capitalized but should be in the monospace font: `/delegation`, `/authorize`, `/post_users_imports`  
  Use monospace font for endpoint paths.
- Endpoints should be cross-referenced to the corresponding section of the API docs whenever possible.

## Lists

When writing lists, keep the following in mind:
- Use bullets when the items being listed are independent of each other and the order of presentation is not important.
- Use numbers for steps that have to happen in order or if you have mentioned the list in introductory text. For example, if you wrote "There are three configuration settings available for SSL, as follows:", you would number each configuration setting in the subsequent list.

In all lists, if an item is a complete sentence, it should end with a period. Otherwise, avoid terminal punctuation for list items.

Each item in a list should start with a capital letter.

## Numbers

Write out numbers in body text and titles from one to nine. From 10 on, use numerals.

Write fractions numerically.

Spell out any number that starts a sentence.

If one number immediately follows another, spell out the first number.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Save three items. | Save 3 items. |
| The password must contain at least 12 characters. | The password must contain at least twelve characters. |
| Fourteen plugins are available. | 14 plugins are available. |
| Configure twelve 50GB drives. | Configure 12 50GB drives |

## Tables

When you are listing parameters, fields, data elements, settings, or properties (for example, [https://auth0.com/docs/tokens/json-web-tokens/json-web-key-set-properties](https://auth0.com/docs/tokens/json-web-tokens/json-web-key-set-properties) ), if there is more than one parameter, setting, or property, use a table.

Use the following guidelines:
- Table headings and left column entries should be in bold formatting.
- Include any default values, minimum and maximum values, and/or recommended values.
- Use monospaced font (code font) for parameter, field, or property.
- Descriptions should be in regular text with the exception of other properties, fields, or parameters.

## Variables

For comprehensive information on using variables and placeholders in code samples, including dynamic auto-population for logged-in users, read [Placeholders & Template Variables](placeholders-and-template-variables.md).

