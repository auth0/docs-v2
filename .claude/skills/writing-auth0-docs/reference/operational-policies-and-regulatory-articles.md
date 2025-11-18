# Operational Policies and Regulatory Articles

Guidelines for documenting Beta/Early Access features, deprecations, and regulatory information.

**Content**

- Beta or Early Access notices
- Deprecation notices
- Operational and regulatory content

## Beta or Early Access

Early Access and Beta notices should follow this structure:

`Feature or Service + Plan type (if applicable) + link to Product Release Stages + contact information`

###### Example

Auth0's Mobile Driver's License feature is currently in Early Access. To learn more about Auth0's product release cycle, read [Product Release Stages](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages). To participate in this program, contact [Auth0 Support](http://support.auth0.com/) or your Technical Account Manager.

### Beta or Early Access terms and conditions

For Open EA and Beta programs, include the following disclaimer:

`By using this feature, you agree to the applicable Free Trial terms in Okta's [Master Subscription Agreement](https://www.okta.com/legal).`

###### Example

Auth0's Mobile Driver's License feature is currently in Early Access. By using this feature, you agree to the applicable Free Trial terms in Okta's [Master Subscription Agreement](https://www.okta.com/legal). To learn more about Auth0's product release cycle, read [Product Release Stages](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages). To participate in this program, contact [Auth0 Support](http://support.auth0.com/) or your Technical Account Manager.

### Beta and EA in Docs

Beta and Early Access notices should be created in a prominent warning panel at the top of the documentation.

Do not:
- Add the release stage in the article text
- Add the release stage to the URL
- Add the release stage to the title of the article or in the headings
- Discuss what the feature/service can do in GA. Tech docs should keep in-line with the product can *currently do*.
    
Do:
- Add relevant details to the warning panel
- Use general EA/Beta notices across multiple articles
- Add links to sources for support with the program
      
## Deprecations

Deprecation notices should include the following information:
- Official deprecation date
- End-of-life date
- Service or feature taking the place of the deprecated service or feature
- Link to deprecation if a third-party service is involved (i.e. a deprecation via Azure or AWS)
- Migration guidance to replacement feature

Deprecation notices can be tailored to context. For brief mentions on related pages, use a simplified notice with:
- Deprecation date
- End-of-life date
- Link to replacement feature

Place deprecation notices in a Warning component at the top of affected documentation pages.

After deprecation is complete, migration guides should be moved to [Past Migrations](https://auth0.com/docs/troubleshoot/product-lifecycle/past-migrations).

## Operational and Regulatory Content

Auth0 documentation includes operational policies, regulatory compliance, and security guidance articles. These articles should:
- Link to verified sources and specifications (such as [FAPI](https://openid.net/specs/fapi-security-profile-2_0-final.html))
- Reference official standards and regulations
- Include dated information when applicable

### Operational policies

Operational policy articles cover service-level agreements (SLAs), terms and conditions, and contractual obligations.

Examples: [Operational Policies](https://auth0.com/docs/troubleshoot/customer-support/operational-policies)

### Regulatory

Regulatory articles document compliance with federal law and regulations in countries where Auth0 operates.

Examples: [General Data Protection Regulation Compliance](https://auth0.com/docs/secure/data-privacy-and-compliance/gdpr)

### Security

Security guidance articles cover best practices and attack mitigation strategies.

Examples: [Security Guidance](https://auth0.com/docs/secure/security-guidance)

Topics include:
- Types of attacks and how to mitigate them
- Preventing attacks with Auth0's services
- Securing user data
- Assessing the impact of a security incident
