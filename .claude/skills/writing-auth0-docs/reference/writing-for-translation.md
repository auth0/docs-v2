# Writing for Translation

### Overview

As Okta is an international organization with customers around the globe, ensuring our content provides a positive learning experience for all users is essential - regardless of language or location.

For a successful translation experience for both internal and external customers, we align our efforts with the following goals:
- **Reduce word count**: Translation services typically charge per word. We can help keep costs down by reducing our overall word count and reusing words, strings, and content chunks that already exist in our [translation memory](https://phrase.com/blog/posts/translation-memory/).
- **Develop translation memory (TM)**: A TM is a bank of words, strings, and phrases that have previously been translated. When content is sent for translation, it is compared to the TM for both perfect and fuzzy (near) matches. These matches help speed up the translation process and reduce the cost associated with translating new words.
- **Account for expansion**: Translated content can be 30% - 50% larger than its English counterpart. Embracing concision, brevity, and whitespace helps accommodate this expansion for an easier reader experience.
- **Reduce complexity and ambiguity**: Reducing ambiguity in the source content leads to more accurate translations. Straightforward language helps reduce the time spent translating complex phrases and lowers the risk of mistranslation.

## Content Guidelines

The following guidelines provide best practices for creating translation-ready content:
- Aim for clarity and simplicity
- Use approachable language
- Reduce ambiguity
- Write for reusability
- Keep it brief
- Define abbreviations and terms
- Avoid English-only structures

### Aim for clarity and simplicity

Be simple, clear, and consistent. Straightforward writing leads to more precise translations and improved comprehension.

| **Best Practice** | **Example** |
| --- | --- |
| Use active voice and present tense. | ✅ Auth0 assigns a Client Secret when you first create your application.<br>🚫 A Client Secret is assigned by Auth0 when your application is first created. |
| Use consistent pronouns. Avoid changing between perspectives (e.g., 2nd or 3rd person) within a single document. | ✅ You can sign up for a free account. To get started, click the Register button.<br>🚫 Customers can sign up for a free account. To get started, click the Register button. |
| Use simple, descriptive verbs. Use complex verbs only when necessary to boost clarity or comprehension of a topic. | ✅ Use the Management API to update your organization.<br>🚫 Utilize the Management API to amend your organization. |
| Use phrasal verbs sparingly. Whenever possible, opt for a more direct verb. (Phrasal verbs often border on colloquialisms and do not have adequate translations.) | ✅ For more information, review [Test Database Connections](https://auth0.com/docs/get-started/applications/test-database-connections).<br>🚫 For more information, check out [Test Database Connections](https://auth0.com/docs/get-started/applications/test-database-connections). |

### Use approachable language

We write content for a global audience with different experiences, customs, knowledge, and abilities. Use approachable language that can be clearly understood by all.

| **Best Practice** | **Example** |
| --- | --- |
| Do not use jargon, idioms, colloquialisms, humor, or overly conversational phrases. Avoid cultural references that may not be universally understood. | ✅ An error displays if you exceed the rate limit.<br>🚫 An error displays if you hit the rate limit.<br>✅ With Auth0, you can add authentication and authorization to your application with minimal implementation.<br>🚫 Auth0 is a drop-in solution for adding authentication and authorization to your application.<br>✅ Summary<br>🚫 TL;DR |
| Avoid long, complex, or otherwise obscure terms. Use words that are easily understood to boost the overall comprehension of a topic.<br>As a baseline, remember that the average American adult reads at a 9th-grade reading level. | ✅ Values associated with restricted claims cannot be added to the user profile.<br>🚫 Values that collide with restricted claims cannot be added to the user profile. |
| Use caution when using symbols or icons, as they may have alternate meanings in other cultures. | ℹ️ [Microsoft Globalization Guidelines - Using Images and Icons](https://learn.microsoft.com/en-us/globalization/localizability/images-and-icons) |

### Reduce ambiguity

Language often leaves room for interpretation. For better translations, strive to be as clear and direct as possible. When writing or reviewing content, look for ambiguity:
- Is the object of a phrase clearly apparent?
- Is the target of an adverb or limitation easily understood?
- Is it clear which party is completing an action?

| **Best Practice** | **Example** |
| --- | --- |
| If a sentence or phrase could be interpreted in multiple ways, rewrite it. Limit the use of words with multiple meanings and avoid ambiguous modal verbs such as `may` or `should`. | ✅ In order to use Email as an MFA factor, you first must configure an independent factor.<br>🚫 You may enable Email as an MFA factor. However, you should first configure an independent factor. |
| Include relative pronouns (e.g., that, who, which) and articles (e.g., the, a, an) to add clarity. | ✅ Return the user to your application and update the local session created in Step 2.<br>🚫 Return user to application and update local sessions. |
| Avoid using complex noun strings as adjectives. | ✅ Configure error messages for invalid user credentials.<br>🚫 Configure invalid user credential error messaging. |
| Use descriptive adverbs instead of prepositions. | ✅ Timeout occurs after approximately 2 hours.<br>🚫 The timeout period is about 2 hours. |
| Whenever possible, choose [positive phrasing](https://www.btb.termiumplus.gc.ca/tpv2guides/guides/wrtps/index-eng.html?lang=eng&lettr=indx_catlog_c&page=9-8PgTLwxx40.html). | ✅ To configure additional options, you must first enable the Customization toggle.<br>🚫 If you don’t enable the Customization toggle, you cannot configure additional options. |

### Write for reusability

Consistency in language and structure helps to develop your translation memory and leads to faster, cheaper, and more accurate translations.

| **Best Practice** | **Example** |
| --- | --- |
| Use consistent verbs and terminology. When possible, limit the use of synonyms. | ✅ Select one or more files to download. On the popup, choose whether you want to download the files individually or as a .zip file. Then, select Download.<br>🚫 Select one or more files to save. On the popup, choose whether you want to export the files individually or as a .zip file. Then, select Download. |
| Reuse existing content whenever possible - introductions, notes, warnings, phrases, steps, etc. | N/A |
| Embrace [parallelism](https://ewriteonline.com/how-and-why-to-make-your-lists-parallel-and-what-does-parallel-mean/). Use consistent phrasal structures in titles, headings, labels, and lists. | ✅ Consistent headings:<br>- Creating connections<br>- Configuring settings<br>- Importing users<br>🚫 Inconsistent headings:<br>- Creating connections<br>- Setting configuration<br>- Import users |

Some organizations use [controlled language systems](https://www.tcbok.org/designing-and-developing-information/translation-localization-and-globalization/controlled-languages/) (CLS) - normalized vocabularies that extend beyond glossary and industry terms. These systems can be helpful resources when drafting tricky concepts.

### Keep it brief.

Shorter sentences and paragraphs are both easier to read and easier to translate. Translations are often 30% - 50% longer than English content. Incorporating whitespace helps reduce information overload and prevents translated content from becoming the dreaded “wall of text”.

| **Best Practice** | **Example** |
| --- | --- |
| Keep sentences short and focused. Use multiple sentences and semicolons to separate ideas. Two shorter sentences are easier to translate than a single compound sentence. | ✅ There are a number of factors to consider when determining the number of Auth0 tenants to create in your environment. Some primary factors to consider include branding requirements and the level of isolation needed for your domains.<br>🚫 Determining the level of isolation you require when it comes to your user domains is an important step, and together with your branding requirements helps you determine the number of Auth0 tenants needed in your environment. |
| Opt for shorter paragraphs with focused attention. Use whitespace wisely to increase readability and allow for expansion. | N/A |

### Define abbreviations and terms

Abbreviations and niche terminology are often not universal. Defining ambiguous terms provides context that can help translators adapt content. It also boosts general comprehension of materials.

| **Best Practice** | **Example** |
| --- | --- |
| Avoid abbreviations and acronyms when possible. If an abbreviation must be used, ensure it is clearly defined. | ✅ Auth0 supports the use of multi-factor authentication (MFA) for securing your application. MFA is a verification method that requires users to provide more than one credential to prove their digital identity.<br>🚫 Auth0 supports the use of MFA for securing your application. |
| Clearly define any product or industry terms that may not be universally known. Regularly review and update the glossary. | ✅ Adaptive MFA is a multi-factor authentication (MFA) policy that assesses potential risk during login transactions and prompts users for additional verification only when needed.<br>🚫 Adaptive MFA can help you protect your tenant from bad actors without increasing friction for real users. |
| Define abbreviations and terms the first time they appear in **any** document, even if they were already defined in related content.<br>Additionally, it may be beneficial to redefine abbreviations in later sections of a document if a significant amount of reading time (~5 or more minutes) has passed since the definition was first provided. Use your best judgement when making such decisions. | N/A |

### Avoid English-only shortcuts

Avoid using language shortcuts that rely on English grammar and spelling. Other languages often do not have compatible shortcuts, and translators are then tasked with changing or rewriting entire sentences. This adds unnecessary complexity and increases the risk of mistranslation.

| **Best Practice** | **Example** |
| --- | --- |
| Do not use `and/or` notation. | ✅ Enter one or more of the following, then select Save:<br>- Support URL<br>- Support Email<br>🚫 Enter a support URL and/or email, then select Save. |
| Do not use `(s)` to signify plurals. | ✅ Configure one or more settings, then select Save.<br>🚫 Configure the desired setting(s), then select Save. |
| Use caution when referencing keyboard commands. Keyboard commands are **not** universal. | Consider the shortcut `CTRL+A`:<br>- **English**: Selects all text available<br>- **Portuguese**: Opens a document<br>In English, `A` refers to `All`. In Portuguese, `A` refers to `Abrir,` meaning "to open". |
| Avoid using capitalization to signify differences between identical terms. Languages such as Japanese do not use capitalization. | Consider the following sentences:<br>- You can create and assign users to your Organization.<br>- You can import your organization’s users.<br>In English, we read `Organization` as an Auth0 component and` organization` as something akin to a company. In Japanese, these words will seem identical to readers. |

