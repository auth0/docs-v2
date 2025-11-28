# Vale Linting

This directory contains the Vale configuration used to lint and standardize the documentation in `auth4genai`. Vale helps ensure consistent terminology, brand usage, spelling, and overall prose quality.

## Requirements

To run Vale with MDX support, you must have:

- **Vale 3.13.0 or newer**
- **mdx2vast 0.3.0 or newer**
- Node.js and npm installed
- Both `vale` and `mdx2vast` available on your `$PATH`

## Installation

Vale must be installed locally before running checks. MDX support additionally requires the external parser `mdx2vast`.

Install Vale ([docs](https://vale.sh/docs/install)):

```bash
brew install vale
```

Install the MDX parser ([MDX format docs](https://vale.sh/docs/formats/mdx)):

```bash
npm install -g mdx2vast
```

Both executables must be available in your `$PATH`.

Run Vale from the `auth4genai` directory:

```bash
vale .
```

A clean run should report zero errors. If you see unexpected output, refer to the [MDX behavior notes](https://vale.sh/docs/formats/mdx#behaviors) for details on what Vale ignores by default.

## How MDX content is interpreted

> **Important:** MDX files do *not* support HTML comments (`<!-- vale off -->`).
> Always use MDX comment syntax instead:
>
> ```mdx
> {/* vale off */}
> ...ignored content...
> {/* vale on */}
> ```

Vale parses `.mdx` files using `mdx2vast`. The parser automatically ignores:

* `import` and `export` statements
* JSX components and JSX blocks
* fenced code blocks
* inline backtick code
* URLs (see Vale’s URL handling notes: https://github.com/errata-ai/vale/issues/320)
* single-line `{ ... }` JavaScript expressions

These defaults help avoid false positives in pages that combine prose with examples, components, and structured metadata.

Inline MDX-aware controls are supported when necessary. MDX files use curly-brace comment syntax (not HTML comments):

```mdx
{/* vale off */}   …ignored…   {/* vale on */}
{/* vale Style.RuleName = NO */}
{/* vale Style.RuleName["match"] = NO */}
```

For example, to disable the custom spelling rule for a specific word that would normally be flagged:

```mdx
{/* vale AuthDocs.Spelling["ocurrance"] = NO */}
This misspelling is intentional in this context and should be skipped.
{/* vale AuthDocs.Spelling["ocurrance"] = YES */}
```

**Note:** These are MDX-style comments. HTML comments (`<!-- vale off -->`) will not work in `.mdx` files.

Guidance on these controls:
[https://vale.sh/docs/topics/config/#comment-based-controls](https://vale.sh/docs/topics/config/#comment-based-controls)

## Configuration structure

All configuration begins with a single file: `.vale.ini`. That file loads a custom style bundle located under `.vale/styles`.

### `.vale.ini`

* Configures MDX and Markdown behavior using a shared style stack
* Enables project-specific rules via `AuthDocs`
* Sets global defaults such as `MinAlertLevel = error` (only error-level issues are reported; suggestions and warnings are suppressed)
* Applies overrides for snippet directories, component demos, and sample-app index pages
* Contains path-based exceptions for content where strict linting generates false positives

See the Vale config reference:
[https://vale.sh/docs/topics/config](https://vale.sh/docs/topics/config)

### `.vale/styles/AuthDocs/Spelling.yml`

Defines a custom spelling rule that replaces Vale’s default spellchecker.
This rule:

* Uses project-specific ignore lists
* Reduces noise from acronyms, product names, config keys, or identifiers
* Helps catch real typos while avoiding false positives

Vale spelling check reference:
[https://vale.sh/docs/checks/spelling](https://vale.sh/docs/checks/spelling)

The ignore list it relies on lives at:

```
.vale/styles/config/ignore/authdocs.txt
```

### `.vale/styles/config/ignore/authdocs.txt`

Contains domain-specific vocabulary:

* Product names
* Framework and platform names
* Identifiers and config keys
* Project jargon
* Terms we expect to appear in code or prose without being flagged

See the “ignore files” section of the spelling check docs:
[https://vale.sh/docs/checks/spelling/#ignore-files](https://vale.sh/docs/checks/spelling/#ignore-files)

This file should be kept up to date as terminology evolves. Mintlify’s maintenance guidance is helpful here:
[https://www.mintlify.com/guides/maintenance](https://www.mintlify.com/guides/maintenance)

### `.vale/styles/AuthDocs/Brands.yml`

Contains substitution rules for:

* brand capitalization (for example, `github` → `GitHub`, `javascript` → `JavaScript`)
* recurring misspellings
* invalid plurals (for example, `SDK's` → `SDKs`)

Vale substitution check reference:
[https://vale.sh/docs/checks/substitution](https://vale.sh/docs/checks/substitution)

Only systematic, project-wide corrections should be added.

**Note:** If a file generates repeated false positives from brand checks (for example, GitHub URLs on an integration page), the preferred approach is to disable `AuthDocs.Brands` for that path in `.vale.ini` rather than adding exceptions to the rule. See the "MDX and Markdown overrides in `.vale.ini`" section below.

### MDX and Markdown overrides in `.vale.ini`

Certain paths contain examples, generated text, or content where strict rules generate noise. In these paths we disable or relax specific rules:

* `snippets/**/*.mdx` – brand checks disabled
* `components.mdx` – brand and spelling checks disabled
* `sample-apps.mdx` and `mcp/sample-apps.mdx` – brand checks disabled
* overview or card-heavy pages (`how-tos/overview.mdx`) – brand checks disabled

These overrides help keep CI output stable without disabling important linting elsewhere.

## Helpful references

* Vale documentation: [https://vale.sh/docs](https://vale.sh/docs)
* MDX parser (`mdx2vast`): [https://github.com/errata-ai/MDX](https://github.com/errata-ai/MDX)
* Mintlify CI integration: [https://mintlify.com/docs/deploy/ci](https://mintlify.com/docs/deploy/ci)
* Mintlify maintenance guidance: [https://mintlify.com/guides/maintenance](https://mintlify.com/guides/maintenance)
* Mintlify writing style tips: [https://mintlify.com/guides/writing-style-tips](https://mintlify.com/guides/writing-style-tips)
