## General guidelines

The Auth0 Product Documentation team has internal documentation to review before you draft updates or submit PRs for Auth0 Docs, including the style guide.

## Docs-as-code

Auth0 documentation, https://www.auth0.com/docs is located at https://github.com/auth0/docs-v2/. If you are not in the Auth0 organization, report inconsistencies and bugs under the [Issues](https://github.com/auth0/docs-v2/issues) section.

For contributors in the Auth0 organization:
* Use your personal GitHub account.
* Review the [README](main/README.md) to set up your local environment and contribution workflow.
* Contact your Auth0 Product Docs liaison. All PRs must be approved by Auth0 Product Documentation.

### File standards

Mintlify’s articles files are a form of Markdown, so all your article files should have the `.mdx` suffix. File names should be the shortened article title with hyphenated word separation, not camel case or underscore.

| **Preferred** | **Discouraged** |
| ------------- | --------------- |
| `configure-identity-provider.mdx` | `ConfigureIdentityProviders.mdx` |
| `customize-ul-templates.mdx` | `customize_ul_templates.mdx` |

### File metadata

| **Field name** | **Description** | **Example** |
| ------ | -------- | ------ |
| `'og:description'` | Meta description for articles. This short summary populates in search engines. * Descriptions should: Start with present tense verbs: Learn, Configure, Access, Create. * Be no more than two clear, concise sentences. * Not contain complicated terminology. | `Learn how to configure your login page to use passwordless authentication using the Auth0 Dashboard.` |
| `'og:image'` | Main image from the doc site. | N/A |
| `‘og:title’` | Main title of the article. This field is specific for search engines.  Titles should be short with present-tense verbs (Get Started not Getting Started) and SEO keywords. | Configure Universal Login |
| `'og:url'` | Defines the docs domain: `https://auth0.com/docs` ||
| `'permalink'` | URL component of the article. For search engine optimization, URLs should be **short** and contain **necessary keywords**, such as the feature name and job-to-be-done. Permalinks don’t have to be grammatically correct or contain all words in the title of the article. | `oidc-adoption-access-tokens`|
| `'sidebarTitle'` | Title of the article as shown in the side navigation. **Note**: long titles will drop off in the side navigation. Be mindful when you title an article. | Manage Self-Service Single Sign-On |
| `'title'` | Main title of the page. ||
| `'twitter:description'` | Description for social media website, X. Is the same as meta description. | Learn how to configure your login page to use passwordless authentication using the Auth0 Dashboard. |
| `'twitter:title'` | Title for social media website, X. Is the same as standard title. | Native to Web SSO and Sessions |

### Format text

Use the [Markdown Guide](https://www.markdownguide.org/) for a general tutorial of how to format text with Markdown.

Some special considerations:

* We do **not** use italics in docs due to issues with screen readers and accessibility.
* Avoid using underline. We use this for linking and additional underline can clutter the UI.

## Embedded content types

Embedded content types are UI elements:
* Use warnings and notes sparingly and only to bring things to the reader's attention that are critical or otherwise deserving of being called out from the body text.
* Remember to keep the number of embedded content types in your docs to a minimum. They make the document more difficult to read and interrupt the reading flow.

### Lists

You can create numbered lists or bulleted lists. Use numbered lists for steps in a process with standard numbering conventions. Internal Auth0 organization members should review the Style Guide.

Use standard numbers:

Enable the feature:
1. Navigate to Auth0 Dashboard > Applications.
2. Choose the application to update.
3. Scroll to the **Cross-Origin Authentication** setting.

Sub-level steps:
1. Navigate to Auth0 Dashboard > Applications. <p></p>
    A. Select the application you want to configure. <p></p>
    B. Select the **Authentication** tab.<p></p>
2. Scroll down to the correct setting.
<Note>
Try to keep sub-bullets even. If you have an A, try to also have a B.
</Note>

Use the asterisks (*) for unordered lists and bullet points:

The following options are available:
* Bot Detection
* Breached Password Detection
* Brute-Force Protection
* Suspicious IP Throttling

### Components

We use components in technical documentation to draw attention to important information customers need to know. Review the following components and when best to use them. To learn more, read [Components](https://www.mintlify.com/docs/components).

**Tip: Try to use the following components sparingly. These component can take the reader out of the doc if overly used.**

#### Accordions

Use accordions when you have a list of **four or more** items and you need to reduce content. To review an Accordion in Auth0 docs, review [Prompt Values on Customize Universal Login Text Elements](https://auth0.com/docs/customize/login-pages/universal-login/customize-text-elements#prompt-values).

<AccordionGroup>
<Accordion title=”Label for the Accordion element”>
Add content for this option.
</Accordion>
<Accordion title=”Label for the second Accordion element”>
Add content for this option.
</Accordion>
<Accordion title=”Label for the third Accordion element”>
Add content for this option.
</Accordion>
<Accordion title=”Label for the fourth Accordion element”>
Add content for this option.
</Accordion>
</AccordionGroup>

#### Asides/Cards

Use this content type when you want to separate long information (more than four lines) from the main body of the document.

Try to add a meaningful title to the panel. Avoid using "NOTE" or "WARNING". Review the overview on our [Custom Domains page](https://auth0.com/docs/customize/custom-domains).

<Card title="Find your Auth0 domain name">

Your Auth0 domain is your tenant name, your regional subdomain, and `auth0.com`, unless your tenant was created before June 2020 in the US region.
Example: If your tenant name is Travel0 and your region US, then your Auth0 domain is `travel0.us.auth0.com`. If your tenant was created before June 2020 in the US region, then your domain name would be `https://travel0.auth0.com`.
If you have a custom domains configured and verified in Auth0 Dashboard, your domain is your custom domain name. To learn more, read [Custom Domains](/docs/customize/custom-domains).

</Card>

#### Note/Callout

Use this content type if you want to display some extra information, a clarification, or include links to related content.

Only use this if the content is brief (one to four lines); otherwise, use the Aside/Card content type. To make sure you use the note with the book icon, use the following callout with icon, color, and iconType. **Do not change the color or iconType** to make sure this component is consistent across Docs.

<Callout icon="file-lines" color="#0EA5E9" iconType="regular">
The audience and scope properties must correspond to an existing application in your tenant, otherwise the refresh token exchange will silently ignore them.
</Callout>

#### Warnings

Use this content type if you want to highlight important information, such as that content is deprecated or there is a security issue to consider.

Keep the warning copy short and clear.

<Warning>
  Biometrics as a First Factor authentication type will not work with non-persistent sessions.
</Warning>

### Tables

When you are listing parameters, fields, data elements, settings, or properties (for example, https://auth0.com/docs/tokens/json-web-tokens/json-web-key-set-properties ), if there is more than one parameter, setting, or property, use a table.

Use the following guidelines:

* Table headings and left column entries should be in bold formatting.
* Include any default values, minimum and maximum values, and/or recommended values.
* Use monospaced font (code font) for parameter, field, or property.
* Descriptions should be in regular text with the exception of other properties, fields, or parameters.

You can draft tables in two ways:

** Markdown tables**

| Value | Description |
| --- | --- |
| `access_token` | The Auth0 default token profile generates an access token formatted as a [JSON Web Token (JWT)](/docs/secure/tokens/json-web-tokens). |
| `access_token_authz` | The Auth0 default token profile (`access_token`) with the `permissions` claim. |
| `rfc9068_profile` | The RFC 9068 token profile generates an access token formatted as a JWT following the [IETF JWT Profile for OAuth 2.0 Access Tokens (RFC 9068)](https://datatracker.ietf.org/doc/html/rfc9068). |
| `rfc9068_profile_authz` | The RFC 9068 token profile (`rfc9068_profile`) with the `permissions` claim. |

**HTML tables**

HTML tables are more complex. To learn how to structure an HTML table, read [Table Basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_table_basics#creating_your_first_table), or review an existing table in our repository.

<table class="table"><thead>
<tr>
<th><strong>Parameter</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>client_id</code></td>
<td><strong>Required</strong>. The <code>client_id</code> of your application.</td>
</tr>

<Note>
When creating Tables that contain Links and lists, use **Markdown** and refer to [Tables documentation](https://www.markdownguide.org/extended-syntax/#tables). 
</Note>

### Tabs

Use this content type when you want to give two-to-three options for the **same function**. Such as: 

* Configuring a feature via Auth0 Dashboard or Management API
* Two features able to support a configuration
* Two products with the same functionality

<Tabs>
<Tab title=”Auth0 Dashboard”>
To create a self-service profile on the Auth0 Dashboard:
1. Navigate to [Authentication > Enterprise](https://manage.auth0.com/#/connections/enterprise) and open the **Self-Service SSO** section. Then, select **Create Profile**.
2. In the space provided, enter a name and optional description for the profile. Then, select **Create**.
3. On the **Settings** tab, complete the sections below. Then, select **Save**.
   * **Identity Providers**: Enable one or more identity providers. In the self-service assistant, customer admins can select their preferred option from the list of enabled providers.
   * **Branding**: Provide a logo and primary color for the self-service assistant.
   * **Custom Introduction**: Modify or replace the default message as needed. This introduction text displays to customer admins on the landing page of the self-service assistant. Your messaging can include basic formatting options, such as bolding or hyperlinks, and is limited to 2000 characters.
4. On the **User Profile** tab, add up to 20 user attributes that your customers should capture through SSO, such as email or family name. You can set each attribute as `required` or `optional`.
</Tab>
<Tab title=”Management API”>
1. Make a POST call to the [Self-Service Profiles](https://auth0.com/docs/api/management/v2/self-service-profiles/post-self-service-profiles) endpoint.
2. Specify the following parameters in the request body, as needed:
</Tab>
</Tabs>

### Tooltips

Words in our [Identity Glossary](https://auth0.com/docs/glossary) require a tooltip for the first mention on a new page.

1. Check our glossary for terms, Auth0 and CIAM terms, that could be in your article.
2. For new additions to the Glossary and new tooltips, you need to: <p></p>
    A. Add the new word to the Identity Glossary. **Make sure you are following alphabetical order.** <p></p>
    B. Create a short definition for in-text tooltips.<p></p>
    C. Create a new entry for your word in the `glossary.jsx` file.<p></p>

    ```
    {
      term: "Generative AI",
      description:
        "A type of artificial intelligence (AI) that creates new, original content like text, images, music, and videos by learning from vast datasets of existing content.",
    },
    ```
3. For existing words, find the short text you will need for the tooltip. You can search for the term with the `term=` tag.

<Note>
Use the same short description to maintain consistency across Auth0 documentation.
</Note>

<Tooltip tip="Security Assertion Markup Language (SAML): Standardized protocol allowing two parties to exchange authentication information without a password." cta="View Glossary" href="/docs/glossary?term=SAML">SAML</Tooltip>



## Reference links
 
The Learn More section at the bottom of each page indicates a list of associated articles to read.

Use the following format:

## Learn More
- [Access Tokens](https://auth0.com/docs/secure/tokens/access-tokens)
- [ID Token](https://auth0.com/docs/secure/tokens/id-tokens)


## Media

Upload images or other files to the `/images` folders in the repository. Remember to add description for each image, which will be translated into alternate text for the image. For screenshots of Auth0 Dashboard, provide the directions to the screenshot. Review the example below.

**Example**
> 1. Navigate to your application’s settings, [Auth0 Dashboard > Applications > Settings](https://manage.auth0.com/application/settings).
>
>   <Frame!>[Auth0 Dashboard > Applications > Settings](/relative-link-to-the-image)</Frame>

<Warning>
Do not store images in external locations like Dropbox, CloudUp, or the Auth0 CDN.
</Warning>

Auth0 organization members should review the Screenshot policy.

### Screenshots

Screenshots of the Auth0 interface need to be taken with Chrome and should not show the browser window.

Resize the browser window to the standard size using the following script:

```bash
osascript -e 'tell application "Chrome" to set the bounds of the front window to {100, 150, 1200, 900}'
```
**Note**: This script is macOS-specific. Windows and Linux users should manually resize their browser window to 1100x750px.

General guidelines:

* Resize image to a maximum 600px width.
* Crop modal windows to remove any background image; only include the modal itself.
* When showing the Auth0 Dashboard UI, crop images to remove the top and left navigation bars.
* Do not include drop shadows.
* Use color #0099CC for highlights.

### Mobile screenshots

For mobile screenshots, use a phone mockup component.

### Close-ups

Use to highlight a detail as part of a tutorial (for example, to show a field requiring input).

Slightly shrink the screenshot to avoid having the image of the UI be mistaken for the actual UI.

## Navigation

The Product Documentation team researches articles before determining where articles belong in the navigation. Please contact Auth0 Product Documentation **before** you add an article to the `docs.json` file.

When you add a new article, create the file in the appropriate section. This structure helps build the first part of the URL. If you need to add an article about Universal Login, you would add the new MDX file under authenticate>login>auth0-universal-login. With the Permalink in the header of your article, the URL is constructed.

Next, add the relative path to the `docs.json` file to add it to the side navigation panel under the appropriate heading:

``` json
            "dropdown": "Authenticate",
            "description": "Auth0 simplifies the use of open industry standards",
            "icon": "lock",
            "pages": [
              "docs/authenticate",
              {
                "group": "Add Login",
                "pages": [
                  {
                    "group": "Login",
                    "pages": [
                      "docs/authenticate/login",
                      {
                        "group": "Auth0 Universal Login",
                        "pages": [
                          "docs/authenticate/login/auth0-universal-login",
                          {
                            "group": "Universal Login vs. Classic Login",
                            "pages": [
                              "docs/authenticate/login/auth0-universal-login/universal-login-vs-classic-login",
                              "docs/authenticate/login/auth0-universal-login/universal-login-vs-classic-login/universal-experience",
                              "docs/authenticate/login/auth0-universal-login/universal-login-vs-classic-login/classic-experience"
                            ]
                          },
                          {
                            "group": "Passwordless Login",
                            "pages": [
                              "docs/authenticate/login/auth0-universal-login/passwordless-login",
                              "docs/authenticate/login/auth0-universal-login/passwordless-login/webauthn-device-biometrics",
                              "docs/authenticate/login/auth0-universal-login/passwordless-login/email-or-sms"
                            ]
                          },
                          "docs/authenticate/login/auth0-universal-login/configure-default-login-routes",
                          "docs/authenticate/login/auth0-universal-login/identifier-first",
                          "docs/authenticate/login/auth0-universal-login/error-pages",
                          /* Example added here */
                          "docs/authenticate/login/auth0-universal-login/example-doc"   
```
Finally, update the Auth0 sitemap, `{}sitemap.json`.

## Testing

Before publishing your document, please check your work. You should:

* Ensure that all code is correct and functions as expected.
* Ensure that all steps are in an order that makes sense and that there are no missing or duplicate steps.
* Check for broken links.
* Check that markdown and HTML in tables are formatted properly.
* Check for outdated screenshots of the Auth0 Dashboard or product and third-party sites.
* Preview your document to ensure that the build will succeed once your changes are published.