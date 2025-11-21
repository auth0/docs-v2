# Writing Mechanics

Writing mechanics include the conventions that govern the technical aspects of writing, such as grammar, punctuation, capitalization, and abbreviations.

## Language and Grammar

### Acronyms and abbreviations

When an acronym or abbreviation is likely unfamiliar to your readers, spell out the first mention of the term and immediately follow with the acronym or abbreviation in parentheses. For all subsequent mentions of the acronym or abbreviation, use the acronym or abbreviation by itself.

When deciding to spell out a term, consider your readers. If most of your readers are likely to recognize and understand the term, then don't spell it out. For example, if you're writing documentation for developers and you reference an API, you don't need to spell out “application programming interface”. However, if you're explaining the general concept of an API to someone with no programming experience, then you probably should spell out the abbreviation.

If an acronym or abbreviation will appear only once in your content, spell out the term. Don't follow it with the acronym or abbreviation in parentheses.

Other tips:
- Pluralize acronyms by adding "s" (for example, PCs, OSs, APIs). Avoid apostrophes.
- Avoid using periods with acronyms (for example, PC rather than P.C.).
- Avoid using "etc".
- Avoid abbreviating these words:
    - developer, developers (not dev or devs)
    - administrator, administration, or administrative (not admin)
    - application (not app)
    - authentication (not auth or authn)
    - authorization (not auth or authz)

### Active voice

In general, use active voice rather than passive voice—make the actor the subject of the sentence. In passive voice, readers often have trouble understanding who is supposed to do something and the resulting prose is generally more wordy than when using active voice.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| The API Gateway applies rate limits to incoming HTTP requests. | The API Gateway is used to apply rate limits to incoming HTTP requests. |
| Send a query to the service. The server sends an acknowledgment. | The service is queried, and an acknowledgment is sent.<br>The service is queried by you, and an acknowledgment is sent by the server. |

#### Exceptions

Passive voice is useful when you want to emphasize an object over an action, avoid placing blame on an actor, or when your readers don’t need to know who completed the action.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| The file was saved. | The system saved the file. |
| Over 50 conflicts were found in the file. | You created over 50 conflicts in the file. |
| The database was purged in January. | Our DBA purged the database in January. |

### Capitalization

#### In general

- Use sentence case. Capitalize only the first word and proper nouns.
- Avoid using capitals for emphasis or to denote "specialness".
- Follow the official capitalization for the names of brands. If an official name begins with a lowercase letter, then put it in lowercase even at the start of a sentence (or better, revise the sentence to avoid putting a lowercase word at the start).

#### In titles

- Use title case. Capitalize each major word. Capitalize the second part of hyphenated major words (for example, Self-Report rather than Self-report) unless the first element is a prefix like "pre-", "post-", or "anti-" (for example, Post-game rather than Post-Game).
- Do not capitalize:
    - articles ("a", "an", "the").
    - coordinating conjunctions ("and", "but", "or", "nor", "for", "so", and "yet").
    - [prepositions](https://grammarist.com/grammar/prepositions) fewer than four letters long.

#### In headings

- Use sentence case. Capitalize only the first word of each heading (unless it is case-sensitive) and all proper nouns.

### Clause order

If you want to tell readers to do something under certain conditions, mention the conditions before you provide the instruction so that readers can skip the instruction if the condition doesn't apply.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| To learn more, read [link]. | Read [link] to learn more. |
| To delete the entire document, select **Delete**. | Select **Delete** if you want to delete the entire document. |

### Contractions

As long as your prose does not become too informal, use contractions. When doing so, make sure to use apostrophes correctly.

### Gerunds

Avoid gerunds in headings and the main body.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Save User Authentication Data. | Saving User Authentication Data. |
| To set up the authorization process, you need an ID token and a valid access token. | Setting up the authorization process requires an ID token and a valid access token. |

### Idioms and euphemisms

Avoid [idioms](https://www.merriam-webster.com/dictionary/idiom) and [euphemisms](https://www.merriam-webster.com/dictionary/euphemism). These types of expressions can be difficult for English as a Second Language (ESL) readers to understand, as well as for readers who speak English as their primarily language, but are not familiar with American English.

Idioms and euphemisms can confuse readers and are difficult to translate.

### Imperative mood

For instructions, use the imperative mood.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Save user authentication data. | User authentication data should be saved. |
| We recommend that you save user authentication data. | Saving user authentication data is recommended. |

### Modal verbs

Use modal verbs to inform users of the possibility or necessity of a given action.

| **Word** | **Meaning of action** | **Example** |
| --- | --- | --- |
| Should | Recommended | “An API **should** have its own internal access control system…” |
| May | Possible | “Users **may** need to delete the browser cookie…” |
| Can | Optional | “You **can** configure a custom domain…” |
| Must | Required | “The protocol of the URL **must** be `http` or `https`…” |

### Present tense

In general, use present tense rather than future tense. Avoid using “will” unless there’s a specific reason to be talking about the future. Avoid using “would”.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Send a query to the service. The server sends an acknowledgment. | Send a query to the service. The server will send an acknowledgment. |
| If you send an unsubscribe message, the server removes you from the mailing list. | You can send an unsubscribe message. The server would then remove you from the mailing list. |
| Before you can add the proxy server, you need the following information. | Before you can add the proxy server, you will need the following information. |
| (Proper future tense)  <br>When the upgrade is complete, your system will comply with all GDPR requirements | When the upgrade is complete, your system complies with all GDPR requirements |

### Pronouns

Avoid vague and confusing references between a pronoun and its antecedent.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| If you type text in the field, the text doesn't change. | If you type text in the field, it doesn't change. |
| The name of the function to execute in the given script. The name does not include parentheses or parameters. | The name of the function to execute in the given script. It does not include parentheses or parameters. |
| Set this value to true. | Set this to true. |

Avoid using gendered pronouns. Either rewrite the sentence so the pronoun is not needed or use "they" instead.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| The user enters their password. | The user enters his password. |

When referring to a person, use “who”, not “that”. However, you can use "whose" to refer to people, animals, and things. "Whose" is the possessive form of both "who" and "which."

Use “that” and “which” appropriately. “That” introduces a restrictive clause and is not preceded by a comma. “Which” introduces a non-restrictive clause and is preceded by a comma.

| ℹ️ **Examples** |
| --- |
| The echidna that has a long snout is furry.  <br>This sentence describes a particular echidna, the one that has a long snout. |
| The echidna, which has a long snout, is furry.  <br>This sentence describes all echidnas and mentions that they all have long snouts. |

### Second person and first person

Address the reader directly by using the second person rather than first person—”you” rather than “we”. Use “we” to refer to Auth0.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| If you're deleting multiple entries at a time…<br>When deleting multiple entries at a time... | If we're deleting multiple entries at a time... |
| We recommend that you upgrade to Node 16. | We should upgrade to Node 16. |

In an instruction, leave out the “you”.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Select **Submit**. | Let's select **Submit** now.<br>We now select **Submit**. |
| Create an XML entry. | You'll need to create an XML entry. |

Avoid "our."

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| For details, read [All About Pandas](https://developers.google.com/style/person). | For details, read our documentation. |

### Verb forms in reference docs

When you’re writing reference documentation for a method, phrase the main method description in terms of what it does (“Gets”, “Lists”, “Creates”, “Searches”), rather than what the developer would use it to do (“Get”, “List”, “Create”, “Search”).

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| tasks.insert: Creates a new task on the specified task list. | tasks.insert: Create a new task on the specified task list. |

## Punctuation

### Ampersands

Avoid using the ampersand in text and titles.

### Commas

Use the Oxford comma (the comma preceding the “and” before the last element in a list) except in article titles.

### Dashes

Two types of dashes exist: en dashes (–) and em dashes (—). Remember that spaces are not used on either side of en or em dashes.

#### En dashes

Use en dashes to show ranges in numbers and dates, to connect terms that are already hyphenated, or when you are using a two-word phrase as a modifier.

| ℹ️ **Examples** |
| --- |
| The teacher assigned pages 101–181 for tonight’s reading material. |
| The scheduled window for the cable installation is 1:00–3:00pm. |
| The 2015–2016 fiscal year was the most profitable year for the new business. |
| The pro-choice–pro-life argument is always a heated one. |
| The Nobel Prize–winning author will be reading from her book at the library tonight. |

#### Em dashes

Use em dashes to separate and emphasize parenthetical material. Use em dashes sparingly, and prefer commas or parentheses where these would work just as well.

| ℹ️ **Examples** |
| --- |
| Dennis stuffed his four best friends into his car—a tiny, two-door Honda—for a weekend road trip. |
| Her best friend—indeed her only friend—did not even send her a birthday wish. |
| It’s up to you, but remember: Making a choice that is more apt—the semicolon is already a difficult piece of punctuation to navigate—will show off your skills as a writer. |
| This is an example of a client—which uses Lock in its login page—and does x, y, and z. |

### Exclamation Marks

Avoid exclamation points. The presence of an exclamation mark often indicates deeper issues in the content.

### Hyphens

Hyphenate compound noun phrases used as adjectives unless the noun phrase is so popularly used that hyphenation appears awkward.

| ℹ️ **Examples** |
| --- |
| This is an all-too-common error. |
| I am wearing my noise-canceling headphones. |

Do not hyphenate compound noun phrases that come after the noun they describe.

| ℹ️ **Examples** |
| --- |
| This error is all too common. |
| My headphones are noise canceling. |

Do not hyphenate compound adjective phrases whose first element is an adverb.

| ℹ️ **Examples** |
| --- |
| It is an amazingly good idea. |

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Write code for the client side. | Write code for the client-side. |
| Write the client-side code. | Write the client side code. |
| Save the logged-in user's access token. | Save the logged in user's access token. |
| Edit the backward-compatible file. | Edit the backward compatible file. |
| The format is backward compatible. | The format is backward-compatible. |

### Periods

Include one space after a period at the end of a sentence, not two.

### Semicolons

Use semicolons sparingly and only to join two independent clauses that are closely related. If there is no close relation between the clauses, rewrite the sentence as two, shorter sentences.
