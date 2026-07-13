export const ChangelogPage = () => {
  const CHANGELOG = [
    {
      "id": "6aN3hsgrdNAaAdXwAOMpAk",
      "date": "2026-07-10",
      "displayDate": "July 10, 2026",
      "version": "v202628",
      "type": "added",
      "title": "Third-Party Apps for Organizations is now Generally Available",
      "description": "Third-party applications now work with Auth0 Organizations. Tenant admins can allow or block third-party app access on a per-organization basis — access is blocked by default, so existing organizations are unaffected until you explicitly opt in. \n- To authenticate users within an organization, a third-party app's connection must be promoted to domain level (`is_domain_connection: true`). \n- User consent is scoped per organization — granting access in one organization does not carry over to another.\n\n![Third-party-app-org-toggle](https://cdn.auth0.com/blog/third-party-apps-orgs.png)\n\nTo learn more, read [Enable third-party application access for an Organization](https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-third-party-application-access)."
    },
    {
      "id": "4z6HdXIEVNEQTLl2lsZv2J",
      "date": "2026-07-09",
      "displayDate": "July 9, 2026",
      "version": null,
      "type": "added",
      "title": "Google One Tap Support for Universal Login EA",
      "description": "Bring frictionless, one-tap authentication to your users! Auth0 now supports Google One Tap within the Universal Login prompt for Early Access. Users are greeted with a secure, non-intrusive identity overlay that lets them sign in instantly with a single tap, completely eliminating manual forms and page redirects. Check out the [Auth0 Google Social Connection documentation](https://auth0.com/docs/authenticate/identity-providers/social-identity-providers/google-one-tap) to learn how to enable it for your web applications!"
    },
    {
      "id": "5r4fX5ujK6WJIAVKCc2dTC",
      "date": "2026-07-08",
      "displayDate": "July 8, 2026",
      "version": "v202627",
      "type": "added",
      "title": "IPSIE session_expiry Claim Support for Okta and OIDC Enterprise Connections",
      "description": "Auth0 now supports the session_expiry claim for Okta and OIDC-based Enterprise connections, in alignment with the IPSIE SL1 profile. When your upstream identity provider includes a session_expiry value in the ID token, Auth0 uses it to enforce the ceiling on the Auth0 session lifetime — evaluated as the minimum of the IdP claim, your tenant's absolute session expiration, and any expiry set via Actions.\n\nThis closes a real gap in federated sessions: when a federated user's access expires at their IdP, their Auth0 session terminates accordingly — no stale sessions, no residual access. Enable it on any Okta/OIDC Enterprise connection via the Dashboard or Management API. For end-to-end enforcement down to your downstream applications, deploy a Post-Login Action to inject the final session_expiry value as a custom claim in the Auth0-issued ID token.\n\nNote: Supported on Okta/OIDC Enterprise connections only. SAML connections are not supported. This feature implements the evolving IPSIE SL1 open standard.\n\nSee the [product documentation](https://auth0-feat-session-expiry-oidc-ipsie.auth0-mintlify.app/docs/authenticate/enterprise-connections/session-expiry-enterprise-connections)"
    },
    {
      "id": "5oeJlvY2ka2k2GPGoHfign",
      "date": "2026-07-07",
      "displayDate": "July 7, 2026",
      "version": null,
      "type": "added",
      "title": "Tenant Log Catalog Now Available in Auth0 Docs",
      "description": "We now have an expansive and interactive Tenant Log Catalog available to dive deeper into [Tenant Logs](https://auth0.com/docs/deploy-monitor/logs) Codes and their associated schemas. Instead of a flat list of [codes](https://auth0.com/docs/deploy-monitor/logs/log-event-type-codes) or diving into GitHub to understand Tenant Log schemas, you can now uncover Tenant Log event schemas directly within Auth0 Docs.\n\nTry out the new Tenant Log Catalog here: [https://auth0.com/docs/tenant-logs](https://auth0.com/docs/tenant-logs)"
    },
    {
      "id": "3Lf7dKv4xizkNd839JVYfr",
      "date": "2026-07-01",
      "displayDate": "July 1, 2026",
      "version": null,
      "type": "added",
      "title": "Automate Downstream Provisioning with Outbound SCIM for Users via Event Streams",
      "description": "We are excited to announce the release of our new __Outbound SCIM Action template for Event Streams__! This new capability delivers an infrastructure-free way to push `user.created`, `user.updated`, and `user.deleted` events directly from Auth0 to any `SCIM 2.0`-compliant downstream application, making it easier than ever to automate your user provisioning workflows.\n\n__Key Highlights:__\n- __Infrastructure-free provisioning__: Use our ready-to-copy [Outbound SCIM Action template](https://github.com/auth0/opensource-marketplace/tree/main/templates/outbound-scim-EVENT_STREAM) to translate Auth0 user events into standard `SCIM 2.0 REST` requests (`POST`, `PUT`, and `DELETE`). This eliminates the need to build, host, or maintain custom webhook consumers.\n- __Template-driven customization__: You retain full control over your provisioning logic. Edit the script to map specific Auth0 attributes to your downstream `SCIM` schema, or enable opt-in behaviors like `UPSERT` (create-on-update) for trickling in users. \n- __Built-in fault tolerance__: The template script handles API timeouts and retries for transient failures natively. \n\n__How to get started:__ \nTo use this feature, navigate to __Event Streams__ in the Auth0 Dashboard, create a new stream with __Auth0 Actions__ as the destination, and apply the __Outbound SCIM provisioning template__.\n\n*Note: Because the Event Stream only reacts to new events, we recommend performing a one-time full bulk sync of your existing Auth0 users to your downstream SCIM server before enabling the stream.*\n\nFor step-by-step setup instructions, prerequisite details, limitations, and configuration guidelines, check out [How to Synchronize User Changes with Outbound SCIM Requests using Event Streams](https://auth0.com/docs/customize/events/send-outbound-scim).\n"
    },
    {
      "id": "5LUH5ZfanVeAoI3sCMUxrp",
      "date": "2026-06-22",
      "displayDate": "June 22, 2026",
      "version": null,
      "type": "updated",
      "title": "Refresh Token metadata is now Generally Available",
      "description": "\nWe're excited to announce that **Refresh Token Metadata** is now **Generally Available** for Enterprise customers.\n\nRefresh Token Metadata allows you to attach custom key-value pairs to refresh tokens, enabling richer context storage and more personalized authentication experiences.\n\n### What's included in the feature\n\n**Store Custom Data on Refresh Tokens**\n\nYou can now attach up to 25 custom key-value pairs to each refresh token. This metadata persists throughout the token's lifecycle and can be accessed or modified via the Management API.\n\n```javascript\n// In Post-Login Action\nexports.onExecutePostLogin = async (event, api) => {\n  api.refreshToken.setMetadata('deviceName', event.request.user_agent);\n  api.refreshToken.setMetadata('loginRegion', event.request.geoip?.countryCode);\n  api.refreshToken.setMetadata('orgContext', event.organization?.id);\n};\n```\n\n**Management API Support**\n\nAccess and manage refresh token metadata programmatically:\n\n- `GET /api/v2/refresh-tokens/{id}` - Retrieve token with metadata\n- `PATCH /api/v2/refresh-tokens/{id}` - Update token metadata\n- `DELETE /api/v2/refresh-tokens/{id}` - Revoke token\n\nLearn more about Refresh Token Metadata in our [documentation](https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-metadata) and our [blog](https://auth0.com/blog/auth0-session-refresh-token-metadata-guide/) "
    },
    {
      "id": "6MQTItbuf5MXEiBhVHJslQ",
      "date": "2026-06-17",
      "displayDate": "June 17, 2026",
      "version": null,
      "type": "added",
      "title": "Google Workspace Directory Sync for Groups - Early Access Updates ",
      "description": "We are happy to share that Google Workspace Directory Sync for Groups is now available in Early Access without enrolment!\n\nAll [previously announced](https://auth0.com/changelog#3sQ4fmmnZQuIAu9jZBoBOS) Early Access capabilities including automated group synchronization, \"Sync all\" functionality, and partial group selection are now available out-of-the-box without enrolment. Additionally, you can now natively assign groups synced through Google Workspace to Auth0 tenant-level RBAC roles and Auth0 organization-specific roles, allowing group members to automatically inherit correct permissions when they log in.\n\nThis update is available to all customers in public cloud today, and will be gradually rolling out to private cloud environments in the coming weeks. \n\nTo get started, navigate to your Google Workspace enterprise connection in the Auth0 Dashboard and configure your group synchronization preferences.\n\nLearn more in our public documentation:\n- [How to Sync Google Workspace Users and Groups to Auth0 with Directory Sync](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/google-directory-sync)\n- [Assign Roles for Enterprise Groups](https://auth0.com/docs/manage-users/access-control/configure-core-rbac/rbac-users/assign-roles-to-groups)\n"
    },
    {
      "id": "11jCyayIcdZbxkThMUNadU",
      "date": "2026-06-15",
      "displayDate": "June 15, 2026",
      "version": null,
      "type": "added",
      "title": "Dashboard Search for APIs Now in Beta",
      "description": "\n__Dashboard Search for APIs is now available in Public Beta!__ Find your API faster without scrolling through paginated lists.\n\nDashboard users can now __search APIs in real time by ID, identifier or name.__ \n\nRolling out progressively to Public Cloud tenants starting this week, with broader availability in the coming weeks.\n\nFor detailed documentation on search capabilities, visit our [Product documentation](https://www.auth0.com/docs/get-started/auth0-overview/dashboard/search-and-filter-auth0-dashboard)."
    },
    {
      "id": "1E2gt08TRyG1Q5S2wfWzJb",
      "date": "2026-06-11",
      "displayDate": "June 11, 2026",
      "version": null,
      "type": "added",
      "title": "Improved refresh token management is Early Access",
      "description": "We're excited to announce the addition of two new endpoints for refresh token management, introducing granularity in search and revocation capabilities, as well as bulk revocation of refresh tokens (up to 100 individual IDs at a time):\n\n- A new GET api/v2/refresh-tokens endpoint which allows retrieving refresh tokens for a user_id or a user_id + client_id combination\n- A new POST api/v2/refresh-tokens/revoke endpoint which allows RT revocation:\n  -  by ids (up to 100 at a time)\n  -  by user_id (remove all refresh tokens for a given user)\n  -  by user_id + client_id (remove all refresh tokens bound to a client for a given user)\n  -  by user_id + client_id + audience (remove all refresh bound to a client and a resource server for a given user)\n\nThe new endpoints are in __Early Access__. Please contact your TAM or open a support ticket to get this feature enabled in your tenant"
    },
    {
      "id": "3xb6mFaZEO6NQTHGxzZKdH",
      "date": "2026-06-08",
      "displayDate": "June 8, 2026",
      "version": null,
      "type": "updated",
      "title": "Enhanced Bot Detection for Signup Flows",
      "description": "We have updated the machine learning model driving Bot Detection during the Signup Flow. \n\nThis update lowers false-negative rates to intercept more automated traffic while keeping false-positive rates low for valid users.\n\n__What's New:__\n\n__Smarter Signup Security:__ Optimized thresholds catch advanced bot behaviors while preserving a seamless registration experience for legitimate users.\n\n__Consistent Protection at Scale:__ The model now delivers uniform detection accuracy across tenants of all sizes, regardless of your baseline traffic volumes.\n\n__Note:__ This model optimization specifically targets the signup flow and rolls out automatically to Enterprise tenants utilizing Attack Protection with no customer action or migration steps required.\n\nTo learn more about Bot Detection check out our online docs [here](\"https://auth0.com/docs/secure/attack-protection/bot-detection)"
    },
    {
      "id": "3JIQlpZIUJmq1diRBXKZUd",
      "date": "2026-06-05",
      "displayDate": "June 5, 2026",
      "version": null,
      "type": "added",
      "title": "Inbound SCIM Groups for Enterprise Connections is now Generally Available!",
      "description": "We’re pleased to announce that support for Groups within Auth0’s [Inbound SCIM](https://auth0.com/docs/authenticate/protocols/scim/configure-inbound-scim) for Enterprise Connections capability is now Generally Available (GA)!\n\nThis release closes the loop between identity provisioning and access control by allowing you to natively map synced groups to Auth0 roles at two levels: globally at the tenant level, or scoped specifically to an organization based on the user’s login context. \n\nAdditionally, developers can now accelerate B2B onboarding by empowering their enterprise customers to self-configure SCIM provisioning for groups directly. \n\n__What’s new in GA:__\n\nBuilding on our [Early Access](https://auth0.com/changelog#6osxJFJUB5gsCePUpSanRQ) capabilities, this release introduces the following enhancements to deliver out-of-the-box B2B delegated administration:\n- __Associate tenant-level RBAC roles with Enterprise Groups__: For global access, you can assign Auth0 tenant-level roles directly to SCIM-provisioned groups. Any member of the synced group will automatically inherit these roles globally.\n- __Assign Organization scoped roles to Enterprise Groups__: You can now assign organization scoped roles to SCIM-provisioned groups. In tandem with [Auto-Membership](https://auth0.com/docs/manage-users/organizations/configure-organizations/grant-just-in-time-membership), your customers' users will automatically inherit workspace-scoped permissions the moment they log in.\n- __Self-Service Enterprise Configuration__: Empower your enterprise customers (or their IdP administrators) to configure SCIM provisioning for users and groups on their own through the [Self-Service](https://auth0.com/docs/authenticate/enterprise-connections/self-service-enterprise-configuration/manage-self-service-enterprise-config) flow, accelerating B2B onboarding and removing your support team from the loop.\n\n__How to get started:__\n\nThis feature will be rolled out to all public cloud environments over the next few days and to private cloud environments as per their release pipeline.\n\nSCIM Groups is available for all tenants whose Auth0 plan includes Enterprise Connections. To enable it, navigate to the Auth0 Dashboard, go to __Authentication > Enterprise__, select your SAML, OpenID Connect, Okta Workforce, or Microsoft Entra ID connection, and toggle __Sync user profiles using SCIM__ to __On__ under the __Provisioning__ tab.\n\n__Learn more:__\n- [Configure Inbound SCIM](https://auth0.com/docs/authenticate/protocols/scim/configure-inbound-scim)\n- [Assign Roles to Enterprise Groups](https://auth0.com/docs/manage-users/access-control/configure-core-rbac/rbac-users/assign-roles-to-groups)\n- [Self-Service Enterprise Configuration](https://auth0.com/docs/authenticate/enterprise-connections/self-service-enterprise-configuration#self-service-enterprise-configuration-workflow)\n- [Group Events using the Eventing Platform](https://auth0.com/docs/events)\n"
    },
    {
      "id": "4pl2qmNBc5YGkSnfArJQJD",
      "date": "2026-06-02",
      "displayDate": "June 2, 2026",
      "version": null,
      "type": "added",
      "title": "Dashboard Search for Applications Now in Beta",
      "description": "We're excited to announce that __Dashboard Search for Applications__ is now available in Public Beta! Find your applications faster without scrolling through paginated lists.\n![Dashboard Application Search](//images.ctfassets.net/kbkgmx9upatd/CLZvKgggLTwNHcHC7ddJv/b837369cf65724c3535a376728447375/Dashboard_Application_search.gif)\n\n__What's New:__\nDashboard users can now __search and filter applications__ in real time by application name, client ID, external client ID, metadata, application type, and first-party status.\n- __Multiple filter options__ — Combine up to 5 filters\n- __Guided filter menu__ with Boolean search logic\n- __Filters persist in URLs__ for sharing and bookmarking\n\nRolling out progressively to Public Cloud tenants starting this week, with broader availability in the coming weeks.\n\nFor detailed documentation on search capabilities, visit our [Product documentation](https://www.auth0.com/docs/get-started/auth0-overview/dashboard/search-and-filter-auth0-dashboard)."
    },
    {
      "id": "2tvGxAGzcIJemzFFN67Yfc",
      "date": "2026-06-02",
      "displayDate": "June 2, 2026",
      "version": "v202623",
      "type": "added",
      "title": "M2M Support for Third-Party Applications is now Generally Available",
      "description": "We're happy to announce that `strict` third-party applications now support machine-to-machine (M2M) access using the `client_credentials` grant type.\n\nAs you expose your APIs to AI agents and partner backend services that operate without a user in the loop, you need those integrations to work within the same secure-by-default posture as the rest of your third-party application setup. This release makes that possible.\n\n![M2M-third-party-app](https://cdn.auth0.com/blog/M2M-third-party-app.png)\n\n__What's included__:\n- `client_credentials` grant type support for `strict` third-party applications, available via the Management API and Dashboard.\n- Organization-scoped M2M access: `strict` third-party applications can request access tokens within the scope of a specific organization, with the same explicit grant requirements that apply to all M2M applications. Learn more about [M2M access for organizations](https://auth0.com/docs/manage-users/organizations/organizations-for-m2m-applications).\n- M2M access is intentionally restricted to applications created manually via the Management API or Dashboard. Applications registered via Dynamic Client Registration are excluded to prevent uncontrolled token issuance by unvetted third parties.\n\nTo learn more, visit the [Third-Party Applications documentation](https://auth0.com/docs/get-started/applications/third-party-applications)."
    },
    {
      "id": "1bJBNHLBIg4ZrsCHnxZYWZ",
      "date": "2026-06-02",
      "displayDate": "June 2, 2026",
      "version": null,
      "type": "updated",
      "title": "Dashboard Navigation & IA Refresh is now in Beta",
      "description": "We are excited to announce that the redesigned __Dashboard navigation and information architecture (IA)__ is now available in Beta. This update is the first step toward a more unified platform experience across Auth0, making it faster to find what you need and easier to act on everything across the platform. Alongside the IA changes, this beta also includes a significant visual refresh.\n\n## What's in the Beta\n\n### Flattened navigation\n\n- __Label-only group headers__ so every item is visible at a glance, reducing clicks and making pages faster to reach.\n- __Reorganized around common tasks__ to surface the pages you use most and match the way you actually work.\n- __External actions__ have moved out of the sidebar and into the top bar, keeping the sidebar focused on tenant configuration.\n\n### Consolidated & renamed pages\n\n- __Related functionality grouped together__ to bring common tasks closer together.\n- __Clearer naming__ to better align functionality across the platform.\n\n### Availability\n\n- Existing bookmarks and deep links will continue to work and you'll be automatically redirected to the new page.\n- This is a navigation, IA, and visual update only. All underlying functionality and APIs remain the same.\n\n## Join the beta!\n\nIf you're interested in joining the Dashboard Navigation & IA Refresh beta program, please send a request through the [Auth0 Support Center](https://support.auth0.com) or contact your Technical Account Manager (TAM) or Auth0 Sales Executive to help you out with the process."
    },
    {
      "id": "6uk8FQUyJBGwPDlhniz8nr",
      "date": "2026-06-01",
      "displayDate": "June 1, 2026",
      "version": null,
      "type": "updated",
      "title": "Customize RPID values for Passkeys GA",
      "description": "Boost Passkey adoption by enabling shared enrollment across subdomains. You can now customize the RP ID to allow a single Passkey to authenticate users across multiple applications under the same root domain. Now GA!\n\nLearn more: \n[Enable and Configure Passkey Authentication for Database Connections](https://auth0.com/docs/authenticate/database-connections/passkeys/configure-passkey-policy)\n[Native Passkeys for Mobile Applications](https://auth0.com/docs/authenticate/database-connections/passkeys/native-passkeys-for-mobile-applications)\n[Passkey Authentication for Database Connections](https://auth0.com/docs/authenticate/database-connections/passkeys) - "
    },
    {
      "id": "6vVPJOO6lSpdhrsHtfc7PW",
      "date": "2026-05-29",
      "displayDate": "May 29, 2026",
      "version": null,
      "type": "added",
      "title": "Auth0 Teams: Delegate tenant management with the new Tenant Manager role",
      "description": "You can now delegate tenant-level user management with the **Tenant Manager** role. This allows you to offload day-to-day administrative tasks from Team Owners to dedicated managers, providing the autonomy they need without exposing sensitive configuration settings.\n\n**Key capabilities:**\n*   **Independent administration:** Directly invite, update, and revoke tenant members without escalating to Team Owners.\n*   **Scoped permissions:** Access is limited strictly to assigned tenants; sensitive configurations—such as connections and security logs—remain restricted to Team Owners.\n*   **Audit trails:** All management actions are captured in Team Activity logs for full compliance and visibility.\n\n**Use cases:**\n*   **Regional autonomy:** Empower regional leads to manage their own tenant members without granting visibility into other regional or global tenants.\n*   **Separation of duties:** Delegate administrative tasks to specific departments while centralizing control of critical security settings at the account level.\n\n[Learn more about Teams Roles and Responsibilities](https://auth0.com/docs/get-started/auth0-teams/team-member-management#team-membership-role-comparison)."
    },
    {
      "id": "6nxqGjfn3ToWBLO9jL2TSB",
      "date": "2026-05-28",
      "displayDate": "May 28, 2026",
      "version": null,
      "type": "added",
      "title": "Token Vault with Organization Support Available in GA!",
      "description": "We're excited to announce the GA release of __Token Vault with Organization Support__! ISVs building multi-tenant B2B SaaS applications and agents on Auth0 Organizations can now use Token Vault to store and exchange third-party tokens within the context of each organization their users belong to.\n\nWith this release, Token Vault exchanges and the Connected Accounts flow respect `org_id` end-to-end. Tokens are scoped to `(user, org_id)`, so each organization maintains its own token records for a given user and data isolation between organizations is preserved by default. Token Vault exchanges that do not carry an `org_id` claim continue to behave as before.\n\nFor complete setup instructions and more, refer to our [documentation](https://auth0.com/docs/secure/call-apis-on-users-behalf/token-vault#use-with-organizations).."
    },
    {
      "id": "6t3B5qOiI4OSTGtrupS8uh",
      "date": "2026-05-27",
      "displayDate": "May 27, 2026",
      "version": "v202618",
      "type": "added",
      "title": "Actions - Access Token Scope Customization - EA",
      "description": "We are excited to announce that we are adding __new Credentials Exchange Actions Access Token Scope Interfaces__ and they are now available in [__Early Access__](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#early-access \"Early Access\").\n\nThese new interfaces allow you to customize the scopes to be considered when the access token is issued by writing __Credentials Exchange Actions__, considering the restrictions based on API and Client Grants definitions.\n\n__Early Access__ functionality includes:\n- __Add/Remove:__ New interfaces to add or remove target scopes from Credentials Exchange Actions.\n- __Set/Clear:__ Additional interfaces to clear or set target scopes from Credentials Exchange Actions without having to loop through the list of scopes.\n- __Read:__ The list of target scopes becomes available immediately after being transformed.\n- __Limits:__ Increased limits to handle up-to 1000 scopes for both __Credentials Exchange Actions__.\n- __Bonus:__ The limits were also increased for __Post Login Actions__.\n- __Docs:__\n  - __Event Object__: [https://auth0.com/docs/customize/actions/explore-triggers/machine-to-machine-trigger/credentials-exchange-event-object#param-target-scopes](https://auth0.com/docs/customize/actions/explore-triggers/machine-to-machine-trigger/credentials-exchange-event-object#param-target-scopes \"Event Object\") \n  - __API Object__: [https://auth0.com/docs/customize/actions/explore-triggers/machine-to-machine-trigger/credentials-exchange-api-object#api-transaction](https://auth0.com/docs/customize/actions/explore-triggers/machine-to-machine-trigger/credentials-exchange-api-object#api-transaction \"API Object\")"
    },
    {
      "id": "43nGPOY7E0sW9L3s2lrzfx",
      "date": "2026-05-27",
      "displayDate": "May 27, 2026",
      "version": "v202622",
      "type": "added",
      "title": "Custom Token Exchange - Delegated Authorization now available in Open Early Access",
      "description": "We're excited to announce that __Custom Token Exchange now supports Delegated Authorization__. This release is available to all __Enterprise, B2B Professional, and B2C Professional customers__.\n\nDelegated Authorization covers scenarios where a principal (e.g. a human support agent, a backend service, an AI agent) performs actions in the context of a user. Unlike traditional impersonation where the actor's identity is lost, delegated authorization preserves both identities: the `sub` claim identifies the user being acted for, while a standards-based `act` claim (per [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html)) identifies who is actually performing the action. Every token carries a verifiable record of the delegation.\n\nWith the flexibility to define custom actor semantics and authorization logic via Actions, __customers now have the tools to address emerging access patterns, including agentic AI flows, alongside traditional delegation scenarios__ like support tooling and service-to-service chains.\n\nKey __highlights__ of this release:\n- Actor token parameters: Pass `actor_token` and `actor_token_type` to convey the acting party's credential\n- `setActor()` Action command: Developers explicitly control when and how delegation `act` claim is included in tokens via the new `setActor()` method\n- Auth0 ID tokens as actor tokens: Automatic validation when the actor is an Auth0-managed user \n- Audit trail: Actor identity captured in tenant logs for compliance and traceability\n- Nesting support: Up to 5 levels of delegation chains for multi-hop service scenarios\n\nTo learn more, visit the [Custom Token Exchange documentation](https://auth0.com/docs/authenticate/custom-token-exchange).\n\n![set-Actor-Actions](https://cdn.auth0.com/blog/set-actor-actions-method.png)"
    },
    {
      "id": "Bqn7JFXNtNpr5pK4SjNYF",
      "date": "2026-05-26",
      "displayDate": "May 26, 2026",
      "version": "v202621",
      "type": "added",
      "title": "General availability of DPoP sender constraining for Enterprise Connections",
      "description": "Demonstrating Proof of Possession (DPoP) sender constraining for Enterprise Connections is now generally available. Customers can now establish Okta and OIDC Enterprise Connections with DPoP enabled on those connections. This is available on all plans with Enterprise Connections.\n\nDPoP for Enterprise Connections enables Auth0 to generate DPoP proofs when performing token exchange and calling userinfo endpoints on upstream OIDC and/or Okta connections. DPoP is a core building block of FAPI2 and IPSIE (Identity Proofing and Secure Identity Exchange) ecosystems. It provides a lightweight, standards-based way to enforce proof-of-possession (of a private key) without the operational overhead of mTLS token binding.\n\nPlease see [product documentation](https://auth0.com/docs/authenticate/enterprise-connections/enable-dpop-enterprise-connections) for further details. "
    },
    {
      "id": "2xFJS2QkpbCMiFX0eEciWG",
      "date": "2026-05-26",
      "displayDate": "May 26, 2026",
      "version": "v202621",
      "type": "added",
      "title": "Federated Logout for OIDC and Okta enterprise connections is now generally available",
      "description": "Federated Logout is now generally available for OIDC and Okta enterprise connections. When a user logs out with `?federated` appended to the logout URL, Auth0 calls the upstream identity provider's `end_session_endpoint` to terminate the IdP session, closing the gap where a lingering IdP session could silently re-authenticate the user on their next login attempt.\n\nNote: if federated logout is attempted without providing an `end_session_endpoint`, federated logout will not be able to be completed, and a `federated_logout_failed` tenant log will be generated. The user will be successfully logged out of Auth0 and redirected back to the application, just as with a standard (non-federated) logout.\n\nWith federated logout:\n - Auth0 takes the burden off customers by handling IdP session termination\n - Customers simply indicate if the IdP session should be ended when the Auth0 logout endpoint is reached — no extra setup needed for compliant IdPs\n - Employers and employees have peace of mind that their data is not accessible when they logout from their applications\n\nThis feature is available on all plans that include enterprise connections. Read the [documentation](https://auth0.com/docs/authenticate/login/logout/log-users-out-of-idps ) to learn more."
    },
    {
      "id": "1HJRARwaxBi5V94dshJcZ3",
      "date": "2026-05-26",
      "displayDate": "May 26, 2026",
      "version": null,
      "type": "added",
      "title": "Secure Canonical Domains with New Tenant ACL Signals",
      "description": "We have enhanced Tenant Access Control Lists (ACLs) to provide granular control over upstream proxy infrastructure and canonical domain routing.\n\nWith this update, you can now isolate traffic by enforcing distinct rules on your canonical hostnames while keeping your user-facing custom domains open.\n\n##### What's New? \n\n* **Canonical Hostname Routing**\n    * Match access rules directly against your canonical hostnames. This allows you to lock down backend default domains while keeping customer-facing custom domains open and accessible to your users.\n* **Connecting IP Verification**\n    *  Define precise allowed IPv4 and IPv6 CIDR blocks for the infrastructure (such as reverse proxies or content delivery networks) connecting directly to the Auth0 edge.\n*  **Expanded Attribute Quotas**\n    * The limit for Tenant ACL attributes has been increased from 10 to 20 per signal, giving you the additional flexibility needed to scale complex, multi-domain configurations seamlessly.\n\n##### Resources\nTo learn more about Tenant ACLs, click [here](https://auth0.com/docs/secure/tenant-access-control-list)\n"
    },
    {
      "id": "4b2KRadEVCQGKre4hvNtmH",
      "date": "2026-05-19",
      "displayDate": "May 19, 2026",
      "version": null,
      "type": "added",
      "title": "Suspicious IP Throttling for Custom Token Exchange",
      "description": "We have introduced a Dashboard configuration interface for Suspicious IP Throttling, specifically for Custom Token Exchange. This update allows administrators to easily set thresholds to throttle high-velocity traffic from suspicious IP addresses during the token exchange process.\n\nLearn more about Custom Token Exchange attack protection [here](https://auth0.com/docs/authenticate/custom-token-exchange/cte-attack-protection)"
    },
    {
      "id": "aGVRGJTYvJA0AG9vcs3gu",
      "date": "2026-05-13",
      "displayDate": "May 13, 2026",
      "version": null,
      "type": "updated",
      "title": "Non-Unique Emails is Now Generally Available",
      "description": "Non-Unique Emails is now Generally Available (GA) for all Auth0 customers. This feature allows multiple user accounts to share the same email address within a database connection, supporting real-world use cases like families, small businesses, and multi-role users who need separate accounts tied to the same email.\n\n**Key Details:**\n\n- Available on new database connections only (cannot be enabled on existing connections).\n- Requires a different primary identifier (username or phone number) to uniquely distinguish users.\n- All email communications (verification, password reset, etc.) are still sent to the shared email address.\n- Once enabled on a connection, the non-unique email setting is permanent.\n\n**Documentation:** [Non-Unique Emails](https://auth0.com/docs/authenticate/database-connections/non-unique-emails)"
    },
    {
      "id": "1NpRoaiD8iGMEMRVd9cyS3",
      "date": "2026-05-12",
      "displayDate": "May 12, 2026",
      "version": null,
      "type": "added",
      "title": "Secure your Account API with ACR EA",
      "description": "Auth0's ACR EA release empowers you to secure Account API token issuance by enforcing step-up authentication for sensitive scopes. Whether your users are managing their authentication factors via Universal Login or Embedded flows, you can now gate access through Actions-driven policies or enable a secure-by-default toggle. This ensures stronger security for self-service account management while maintaining a seamless experience for low-risk actions.\nLearn more here:\n[API Settings Auth0 Docs \n](https://auth0.com/docs/get-started/apis/api-settings)\n[My Account API Docs](https://auth0.com/docs/manage-users/my-account-api)"
    },
    {
      "id": "btdYfRrErQnUehwPJ1Ndw",
      "date": "2026-05-11",
      "displayDate": "May 11, 2026",
      "version": null,
      "type": "added",
      "title": "Online Refresh Tokens is now in Beta",
      "description": "We are excited to announce that our new feature \"Online refresh tokens\" is now available to all customers in Beta. This powerful new feature is designed to simplify token management and modernize your application architecture, especially for Single Page Applications (SPAs) allowing you to bind refresh tokens to the sessions they originated from, which provides seamless and consistent continuation of a session when cookies are affected by the browser vendor behaviour across different applications. \n\n### What's in the Beta\n\n#### ✨ New configuration options\n- **Configure specific audiences to provide Online refresh tokens** - online refresh tokens configuration is now available under the API > settings page\n\n#### 🔒 Applications Integration\n- **New scope** — Request the new online_access scope to receive your online refresh tokens, which will be bound to the session\n- **Refresh tokens normally** — Online refresh tokens will continue your application access while the session exists\n- **Revoke a session, revoke its refresh tokens** — Once the session is revoked, all its online refresh tokens become invalid, too\n\n#### 🚀 Availability\n- Since online refresh tokens lifecycle is entirely based on their underlying session, online refresh tokens can be issued only in OIDC flows that generate a valid session and can return refresh tokens\n- Following OIDC standards, implicit sessions that do generate a session but shall not return a refresh token, will not provide online refresh tokens either\n\n## Documentation Links\n[Online refresh tokens documentation](https://auth0.com/docs/secure/tokens/refresh-tokens/online-refresh-tokens/online-refresh-tokens)\n\n## Join the beta!\nIf you're interested in joining the online refresh token beta program, please send a request through the [Auth0 Support Center](https://support.auth0.com) or contact your Technical Account Manager (TAM) or Auth0 Sales Executive to help you out with the process"
    },
    {
      "id": "6ebGxL02wewJCMS5nW2mNc",
      "date": "2026-05-06",
      "displayDate": "May 6, 2026",
      "version": null,
      "type": "added",
      "title": "Resend Email Provider is now Generally Available",
      "description": "![Resend Email Provider](//images.ctfassets.net/kbkgmx9upatd/38WSnL4J8G0N29XEkycNUh/67a787ba40829ea953a838679b3afcd8/CleanShot_2026-05-07_at_10.07.31_2_2x.png)\n\nWe're excited to announce that __Resend__ is now __Generally Available__ as an out-of-the-box email delivery provider in Auth0!\n\nWith this release, you can now configure Resend as your email delivery provider with built-in configuration directly within Auth0. Resend offers a modern, developer-friendly approach to transactional email with excellent deliverability and a clean API.\n\nCheck out our [documentation](https://auth0.com/docs/customize/email/smtp-email-providers/resend) for detailed setup instructions.\n\nHave questions or suggestions? Reach out to us in our community channel and we'd love to hear how Resend is working for you!\n\n---\n\n*This feature is available on all Auth0 plans.*"
    },
    {
      "id": "6SeJmK4wyY7sizFRsLJvvq",
      "date": "2026-05-06",
      "displayDate": "May 6, 2026",
      "version": null,
      "type": "added",
      "title": "Auth for MCP is now Generally Available",
      "description": "We are excited to announce Auth for MCP is now Generally Available.\n\nAuth for MCP gives you a straightforward way to add authentication and authorization to any MCP server, so you control exactly who gets access, and what they get access to. Implement authentication, CIMD registration, and OBO token exchange for AI agents.\n\nAuth for MCP is a product capability that uses the combination of the following features:\n\n### Client ID Metadata (CIMD) Registration (GA)\nFor MCP clients to connect to MCP servers, they need to identify themselves. But how does a server trust a new client it's never seen? The MCP spec solves this by recommending the use of CIMD: each client hosts a document containing its metadata at a URL that identifies the client. In Auth0, tenant admins provide that URL, and Auth0 fetches the metadata, validates it, and displays it for confirmation before creating the client. You get control over which clients can access your MCP server ensuring no surprise registrations.\n\n### On-Behalf-Of Token Exchange (GA)\nAfter a user's agent authenticates with an MCP server and issues a request, it needs to call another API like a Salesforce instance or HR system to finish the job. The question is: how does that second API know the request is legitimate and who it's actually for? On-Behalf-Of Token Exchange lets MCP servers trade the user’s access token for one that works with the downstream API, scoped correctly and still tied to the original user. No shared secrets, no service accounts with too much power. And full auditing and visibility into every action.\n\n### Resource Parameter Compatibility Mode (GA)\nThe MCP spec uses \"resource\" identifiers to indicate which server an agent wants to talk to, rather than the \"audience\" parameter that OAuth has traditionally used. Auth0 now supports this natively, allowing MCP implementations to stay spec-compliant without workarounds or translation layers.\n\n### Enhanced Security Controls for Third-Party Applications (GA)\nAs you open your APIs to AI agents, partners, and developer ecosystems, third-party applications need to be secure by default. The recently shipped Enhanced Security Controls gives third-party apps a production-ready, secure-by-default posture, with the control you need over what external applications can access.\n\n### Documentation Links\n\n- [Register Applications with CIMD](https://auth0.com/docs/get-started/auth0-overview/create-applications/register-applications-with-cimd)\n- [On-Behalf-Of Token Exchange](https://auth0.com/docs/secure/call-apis-on-users-behalf/on-behalf-of-token-exchange)\n- [Auth for MCP Quickstart](https://auth0.com/ai/docs/mcp/get-started/call-your-apis-on-users-behalf)"
    },
    {
      "id": "20FMZ1MYg5HlOYzM1fwZux",
      "date": "2026-05-06",
      "displayDate": "May 6, 2026",
      "version": "v202618",
      "type": "fixed",
      "title": "Fix for Empty login_hint Parameter on External Identity Providers Requests",
      "description": "__What's Changing:__\n\nWe are fixing an issue where Auth0 was including an empty `login_hint` query parameter when redirecting users to external identity providers. Going forward, `login_hint` will only be included in the authorization request when a value is actually present.\n\n__Why This Matters:__ Some external OAuth providers strictly validate request parameters and reject authorization requests that contain empty parameter values. This caused authentication failures for customers whose upstream identity providers do not tolerate empty `login_hint` values — particularly in scenarios where customers do not control the external IdP and cannot modify its validation behavior.\n\n__Rollout Timing:__ This fix will be rolled out progressively over the next 1–2 weeks.\n\n__Action Required:__ No action is required from customers. If you previously implemented a workaround by [overriding connection parameters](https://auth0.com/docs/authenticate/identity-providers/pass-parameters-to-idps#update-the-connection-static-) to suppress the empty `login_hint`, you may optionally remove that override after confirming the fix is active in your environment."
    },
    {
      "id": "3mhwjZdB3L7vXnesSa5t8E",
      "date": "2026-05-05",
      "displayDate": "May 5, 2026",
      "version": null,
      "type": "added",
      "title": "\"CMD+K\" available now on Auth0 Dashboard",
      "description": "![CMD+K Command Palette](//images.ctfassets.net/kbkgmx9upatd/60n7SRA7oPIEsPPTco6afZ/be85b9583c66e54af2f311c6093b2b31/CleanShot_2026-05-05_at_12.03.46_2x.png)\n\nWe're excited to announce the new __CMD+K Command Palette functionality__ is now available to all users in the __Auth0 dashboard__. Get instant access to navigation, quick actions and recently visited pages all from a single keyboard shortcut.\n\n__What’s new:__\n- __Globally available:__ Always accessible from any page by entering CMD+K.\n- __Quick navigation:__ Jump to any page, feature, or setting without leaving the keyboard.\n- __Recently visited:__ Have your last 3 visited pages available at the top.\n- __Action shortcuts:__ Execute common tasks directly from the palette.\n- __Contextual actions:__ Get tasks specific to pages right in CMD+K.\n\nTo keep improving this experience, we’ll be continuously adding more contextual actions and capabilities to the __CMD+K Command Palette__."
    },
    {
      "id": "2ckvKtsLDrmK7m1283Tjb8",
      "date": "2026-05-05",
      "displayDate": "May 5, 2026",
      "version": "v202618",
      "type": "added",
      "title": "Support for Private Key JWT assertions and additional signing algorithms on Okta and OIDC enterprise connections.",
      "description": "Private Key JWT assertions and expanded signing algorithm support are now generally available across Enterprise Okta and OIDC Connections.\n\nPrivate Key JWT assertions deliver enterprise-grade security by leveraging asymmetric cryptography to authenticate against your upstream Okta and OIDC identity providers. You now have full control over which signing algorithms Auth0 uses when generating client assertion JWTs - giving you the flexibility to align with your security standards and existing infrastructure.\n\nWe've also expanded ID token verification on enterprise connections to support additional signing algorithms: RS384, RS512, PS256, PS384, ES256, and ES384. This means fewer integration headaches when connecting to upstream identity providers and greater compatibility across your authentication flows.\n\nThese capabilities put you in the driver's seat: choose the cryptographic methods that work best for your environment, eliminate integration blockers, and stay ahead of evolving security standards.\n\nPlease refer to the [product documentation](https://auth0.com/docs/authenticate/enterprise-connections/private-key-jwt-client-auth)."
    },
    {
      "id": "fuWON1ktuPMy4n09B1mrR",
      "date": "2026-04-30",
      "displayDate": "April 30, 2026",
      "version": "v202618",
      "type": "updated",
      "title": "Auth0 Event Streams for Outbound User Lifecycle Management – Now in General Availability",
      "description": "Event Streams is now available for all customers in General Availablity.\n\nCustomer can:\n- Subscribe to Auth0 User, Organizations, and Groups (Early Access Limited Release) Events\n- Deliver Events to AWS EventBridge, Auth0 Actions, and Webhooks (including to [Okta Workflows](https://help.okta.com/wf/en-us/content/topics/workflows/execute/flow-api-endpoint.htm \"Okta Workflows\") via Customer Header Auth)\n- Consume events via the Events API\n\nSee the [Auth0 Docs](https://auth0.com/docs/deploy-monitor/events \"Event Streams\") and [Event Catalog](https://auth0.com/docs/events \"Event Catalog\") for further instructions."
    },
    {
      "id": "YcrZfUuth36sz2ZLClPEh",
      "date": "2026-04-30",
      "displayDate": "April 30, 2026",
      "version": "v202618",
      "type": "added",
      "title": "Enhanced Security Controls for Third-Party Applications is now Generally Available",
      "description": "We're excited to announce that **Enhanced Security Controls for Third-Party Applications** is now Generally Available for all Auth0 customers.\n\nAs you open your APIs to AI agents, customers, partners, and external developers, you need strong security defaults for third-party applications. Enhanced security controls give third-party applications a secure-by-default posture, so Auth0 does the heavy lifting, and you stay in control of what external applications can access.\n\n**What's included:**\n\n* **Strict security mode** for third-party applications (`third_party_security_mode: 'strict'`)\n* **OAuth 2.1 alignment**: mandatory PKCE, restricted grant types\n* **Explicit API authorization**: third-party applications always require a client grant to access an API\n* **Default permissions for third-party applications**: configure default API permissions that apply automatically to all third-party applications, including those created via **Dynamic Client Registration**\n* **Open redirect protection**: configurable `redirection_policy` to prevent redirect-based attacks\n* **Reduced attack surface**: curated property allowlist and feature restrictions\n\n![new-stict-3pa](//images.ctfassets.net/kbkgmx9upatd/42IkAkkH2ACxpxnVseCPh6/f8a79b1675c96d60bb1c995b02c2cf41/new-stict-3pa.png)\n\n**For existing customers using third-party applications**: Your existing applications continue to work exactly as they do today — no changes required. A 6-month migration window gives you time to adopt enhanced security controls for new application creation. Review the [migration guide](https://auth0.com/docs/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-to-enhanced-security-third-party-applications) for detailed steps.\n\nTo learn more, visit the [Third-Party Applications documentation](https://auth0.com/docs/get-started/applications/third-party-applications).\n"
    },
    {
      "id": "5KDss6efgwLvwrnUYFADEs",
      "date": "2026-04-30",
      "displayDate": "April 30, 2026",
      "version": null,
      "type": "added",
      "title": "Auth0 FGA Permissions Index Is Now in Developer Preview",
      "description": "\n__What is a Permissions Index?__\n\nIn relationship-based access control like FGA, checking for permissions requires traversing a complex graph of relationships to find a valid path between a user and an object. The [FGA Permissions Index](https://docs.fga.dev/permissions-index/fga-permissions-index) anticipates this time-consuming traversal by pre-calculating every possible permission path and storing them as direct, user-to-object relationships. Whenever an indexed relationship is added or revoked in FGA, an incremental compute engine cleverly remembers which parts of the graph are affected, quickly ‘flattens’ those relationships, and enables a simple, efficient lookup at query time, no real-time graph traversal necessary.\n\nThis makes it easier to power traditionally diffucult authorization use cases such as [enterprise search](https://docs.fga.dev/integration/advanced/search-with-permissions) and AI retrieval (like RAG) over large datasets without repeatedly traversing the authorization graph every time.\n\nThe Developer Preview of FGA Permissions Index is available to any existing FGA enterprise customer. [Get started](https://docs.fga.dev/permissions-index/getting-started) today!\n\n__Learn more__:\n- [What is a Permissions Index?](https://docs.staging.fga.dev/permissions-index/fga-permissions-index#what-is-a-permissions-index)\n- [Permissions Index Best Practices](https://docs.fga.dev/permissions-index/best-practices)\n\n![FGA Colocated Permisssions Index](//images.ctfassets.net/kbkgmx9upatd/5CRF124QdAzhLSegaqS2ca/9bc2efffe9329c8b37efcb3b33aea3d4/FGA_Colocated_Permisssions_Index.png)"
    },
    {
      "id": "6ALAmotlACYGqbTE8UoJ3",
      "date": "2026-04-28",
      "displayDate": "April 28, 2026",
      "version": "v202618",
      "type": "added",
      "title": "Self-Service Domain Verification now in General Availabilty!",
      "description": "We're excited to announce that __Self-Service Domain Verification is now in General Availability__! Allow your customers' IT admins to verify their own email domains for HRD directly within the SSO setup assistant — no back-and-forth with your team required.\n\nKey Advantages at a Glance:\n- Proven ownership: IT admins verify domains via DNS TXT record.\n- Flexible requirements: Configure domain verification as off, optional, or required — per customer engagement.\n- Domain management: IT admins can now add, re-verify, and delete domains entirely through self-service.\n- Enterprise-ready controls: Pre-configure domains for your customers to verify, or pre-verify domains on their behalf — with verified domains automatically powering Organization Discovery when enabled.\n\nTo dive deeper, please review our updated documentation on[ Self-Service Enterprise Configuration](https://auth0.com/docs/authenticate/enterprise-connections/self-service-enterprise-config)."
    },
    {
      "id": "3TqcZNu5FJI7nIrTd4C59S",
      "date": "2026-04-28",
      "displayDate": "April 28, 2026",
      "version": "v202618",
      "type": "added",
      "title": "Self-Service Provisioning now in General Availability!",
      "description": "We’re thrilled to announce that the __Self-Service Provisioning experience is now in General Availability__! Empower your customers' IT teams to handle user onboarding and offboarding themselves, which means less manual work and fewer support tickets for your team.\n\n__Key Advantages at a Glance__\n- Automation: Allow your customer's admins to manage their own SCIM setup.\n- Interoperability: Ensure seamless integration with a wide variety of customer IdPs.\n- Consistency: Use a single, unified schema for easier support and debugging.\n- Flexibility: Retain the ability to override attribute mappings for specific protocols if needed.\n\n![User Provisioning](//images.ctfassets.net/kbkgmx9upatd/1sLKLMX9mHZ3fwwnYVtM0p/bf92648b962e8ab7127231222020f59a/SS-SCIM.gif)\n\nTo dive deeper, please review our updated documented on [Self-Service Enterprise Configuration](https://auth0.com/docs/authenticate/enterprise-connections/self-service-enterprise-config)."
    },
    {
      "id": "25JUjMOH28xo3ysd3seeqa",
      "date": "2026-04-28",
      "displayDate": "April 28, 2026",
      "version": "v202618",
      "type": "updated",
      "title": "New Identity, Same Great Features: Self-Service SSO is now Self-Service Enterprise Configuration",
      "description": "The new name better reflects the full scope of the suite, which includes:\n\n- Single Sign-On (SSO): Allow enterprise customers to configure and maintain SSO for their applications.\n- Domain Verification: Self-managed domain verification and mapping for IT admins.\n- Google Directory Sync: Keep user attributes synchronized across systems.\n- User Provisioning: Automate the user lifecycle through SCIM 2.0.\n\nNo functional changes — everything works the same. For full details, see the [Self-Service Enterprise Configuration](https://auth0.com/docs/authenticate/enterprise-connections/self-service-enterprise-config) documentation."
    },
    {
      "id": "1PKSNs4ANJ6DkZWjq9d203",
      "date": "2026-04-28",
      "displayDate": "April 28, 2026",
      "version": "v202618",
      "type": "added",
      "title": "Organization Discovery by Domain now in General Availability!",
      "description": "We're thrilled to announce that __Organization Discovery by Domain is now in General Availability__! Automatically identify your customers' users and route them to the right identity provider based on their email domain — before they even reach the login screen.\n\nKey Advantages at a Glance:\n- Automatic routing: Direct users to their organization's IdP the moment they enter their email — no manual org selection required.\n- Multi-org support: When a single domain maps to multiple organizations, an org picker ensures users land in the right place.\n- Seamless B2B login: Eliminate the friction of Home Realm Discovery by adding full organization context to the pre-login flow.\n- Flexible configuration: Support email-based, org-name-based, or combined discovery to match your customers' login requirements.\n\nTo dive deeper, please review our documentation [here](https://auth0.com/docs/manage-users/organizations/login-flows-for-organizations#organization-domain-discovery-optional)."
    },
    {
      "id": "4O6ALxGyt6yFHtkcW90rmD",
      "date": "2026-04-23",
      "displayDate": "April 23, 2026",
      "version": null,
      "type": "added",
      "title": "Auth0 Private Cloud Now Available on Azure in Japan",
      "description": "Auth0 Private Cloud is now supported in the Azure Japan East (Tokyo) region!\n\nJapan already has Auth0 coverage through AWS Private Cloud and our Public Cloud environment, and this addition brings Azure into the mix for the first time. Organizations can now deploy Auth0 Private Cloud in-country on Azure, giving them a dedicated identity infrastructure with the latency and data residency benefits of a local deployment.\n\nThis expansion reflects our ongoing commitment to meeting customers where they are — on the cloud platform and in the geography that works best for them."
    },
    {
      "id": "31ExGKQkdxxa7L4HWJPZzY",
      "date": "2026-04-22",
      "displayDate": "April 22, 2026",
      "version": null,
      "type": "updated",
      "title": "Deploy CLI Dry Run is now GA",
      "description": "We're excited to announce that Dry Run on Auth0 Deploy CLI is now Generally Available — giving developers full visibility into tenant changes before they're applied.\n\n__Key Benefits:__\n- Preview changes before they hit your tenant. Run a0deploy import --dry-run to see exactly what resources will be created, updated, or deleted — then exit safely. No changes applied, no surprises in production.\n- CI/CD-native by default. Dry Run is now non-interactive out of the box, so it works in GitHub Actions, Jenkins, and any headless pipeline. Use --dry-run --apply to show the plan and deploy without prompting — full visibility, zero manual intervention.\n- Flexible review modes. Need manual control? --dry-run --interactive gives you the review menu to apply, export to JSON, or exit. Choose the workflow that fits: automated gates in CI, manual review locally.\n\n__What's new in GA (beyond EA):__\n- --dry-run is now non-interactive by default (was interactive-only in EA)\n- --dry-run --apply: preview then deploy without prompting — built for CI pipelines\n- --dry-run --interactive: opt into the EA interactive menu when you want it\n- Backward-compatible Node module API (AUTH0_DRY_RUN: true still works)\n\n__Getting Started:__\n- [Documentation](https://github.com/auth0/auth0-deploy-cli/blob/master/docs/using-dry-run.md)\n- [Official Repo](https://github.com/auth0/auth0-deploy-cli)"
    },
    {
      "id": "3Hw5SUItRR6ZDls01MMVUC",
      "date": "2026-04-21",
      "displayDate": "April 21, 2026",
      "version": null,
      "type": "added",
      "title": "Actions - TypeScript Definitions in Github",
      "description": "We are excited to announce the Actions TypeScript definitions are now available on GitHub and npm.\n\n- GitHub Repository: [https://github.com/auth0/auth0-actions](https://github.com/auth0/auth0-actions)\n- NPM Package: [https://www.npmjs.com/package/@auth0/actions](https://www.npmjs.com/package/@auth0/actions)\n\nThese resources provide the official Actions TypeScript definitions, helping developers and AI agents write better code when building Actions outside of the Management Dashboard's editor.\n\nTo learn more, check out the [Actions NPM Docs](https://auth0.com/docs/customize/actions/actions-npm \"Actions Types Docs\") and the [Actions Unit Test Docs](https://auth0.com/docs/customize/actions/actions-unit-test \"Actions Unit Test Docs\")."
    },
    {
      "id": "37Bpvtxbjs4NAeKFJOxqdD",
      "date": "2026-04-20",
      "displayDate": "April 20, 2026",
      "version": null,
      "type": "deprecated",
      "title": "Mobile Driver’s License Verification Service Early Access",
      "description": "After May 11, 2026, Auth0 is ending the Free Trial for the [Mobile Driver’s License (mDL) Verification Service Early Access](https://auth0.com/docs/secure/mdl-verification) and will remove access to the mDL Verification Service for tenants that enrolled in Early Access.\n\nWhile we are not planning to move forward with mDL Verification Service capabilities as part of the Auth0 product, if you are still interested in capabilities related to verifiable digital credentials (VDCs) and want to learn how Okta is shaping the future with VDCs, visit [oktacredentials.dev](https://oktacredentials.dev) or read about the [Okta Digital ID Verification Beta](https://www.okta.com/blog/product-innovation/okta-digital-id-verification-beta/). To join the Beta and get involved, [fill out this short form](https://surveys.okta.com/jfe/form/SV_6yDRiNg5bYVcttI) or email the team directly at `oktacredentials@okta.com`.\n"
    },
    {
      "id": "5agVKVb0XqU9j5y8Z2S12t",
      "date": "2026-04-17",
      "displayDate": "April 17, 2026",
      "version": "v202617",
      "type": "fixed",
      "title": "Delegated Administration Extension",
      "description": "__v4.8.1 — Custom Domain Hook__\n\nAdded support for a new [Custom Domain Hook](https://auth0.com/docs/customize/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-custom-domain-hook) in the Delegated Administration Extension. This hook allows you to customize behavior when [Multiple Custom Domains](https://auth0.com/docs/customize/custom-domains/multiple-custom-domains) are in use.\n\n__v4.8.3 — Compatibility fix for deprecation of enabled_clients on connections__\n\nThe extension has been updated to remove its dependency on the deprecated enabled_clients field on connections. If your tenant uses the Delegated Administration Extension, you may have been seeing deprecation warning errors in your tenant logs. This release resolves that.\n\n__Action recommended before July 15:__ Auth0 is deprecating legacy management of a connection's enabled clients. See the [deprecation notice](https://auth0.com/docs/troubleshoot/product-lifecycle/deprecations-and-migrations#legacy-management-of-connection's-enabled-clients) for full details. Updating to v4.8.3 ensures the extension is compatible with this change.\n\n__Upgrading__\n\nNot on v4.8.x: Manually update the extension in your Auth0 tenant by navigating to Extensions → Installed Extensions, locating the Delegated Administration Extension, and clicking Update.\n\nAlready on v4.8.x: No action required — the patch has been automatically applied."
    },
    {
      "id": "3sQ4fmmnZQuIAu9jZBoBOS",
      "date": "2026-04-17",
      "displayDate": "April 17, 2026",
      "version": null,
      "type": "added",
      "title": "Google Workspace Directory Sync for Groups - Expanded Early Access (EA)",
      "description": "We are excited to announce the next phase of our __Google Workspace Directory Sync for Groups__ Early Access! \n\nBuilding on our initial Early Access [release](https://auth0.com/changelog#6WhEr0c0yB3K5oh7jiPADP), this update introduces __Partial Group Sync__, giving you exact control over which Enterprise Groups to import from your Google Workspace Directory into Auth0.\n\n__What's new:__\n- Targeted Group Sync: Instead of syncing your entire directory, you can now choose to synchronize only a specific subset of your Google Workspace groups. Easily manage your selected groups through either the Management Dashboard or Management API. \n\n__How to join Early Access:__\nTo join the EA program, please complete the [EA Terms & Conditions form](https://forms.gle/9MK4hnQUW8AVfREZ9) and contact your Auth0 Account Team to request activation and supporting documentation."
    },
    {
      "id": "3R4EktlkSnNsaB2TtXBk0B",
      "date": "2026-04-14",
      "displayDate": "April 14, 2026",
      "version": null,
      "type": "updated",
      "title": "Multi-Resource Refresh Tokens (MRRT) is now Generally Available",
      "description": "Following the successful Early Access period that began on August 11, 2025, we are excited to announce that MRRT is now available to all customers with full production support. This is a powerful enhancement that simplifies token management and modernizes app architecture across both native and web platforms\n\n---\n\n### What's New in GA\n\n#### ✨ Auth0 Dashboard Support\n- **Configure MRRT policies directly in the Dashboard** — No more Management API-only configuration\n- **Visual refresh token policy editor** — Easily add, remove, and modify audience/scope policies for your applications\n- **Application settings integration** — MRRT configuration is now available under the Application > Settings page\n\n#### 🔒 Enhanced Security with Client Grants Integration\n- **Client Grants enforcement** — MRRT now respects Client Grants restrictions, ensuring applications can only request access tokens for APIs they are authorized to access\n- **Improved validation** — Better error messages when attempting to configure unauthorized audience/scope combinations\n\n#### 🐛 Bug Fixes and Improvements (based on EA feedback)\n- Fixed: Token exchange now properly validates scopes against both MRRT policy and Resource Server definitions\n- Fixed: Improved error handling when requesting access tokens for deleted or modified Resource Servers\n- Fixed: `org_id` claim is now correctly preserved in access tokens when using MRRT with Organizations\n- Fixed: Refresh token rotation works correctly when exchanging tokens for different audiences\n- Improved: Better logging in tenant logs (`type: sertft`) for MRRT token exchanges\n- Improved: More descriptive error messages for unauthorized audience requests\n\n#### 📦 SDK Updates\n- **iOS SDK (Auth0.swift)** — Full GA support \n- **Android SDK (Auth0.Android)** — Full GA support \n\n#### 🛠️ Developer Tooling\n- **Auth0 CLI** — Full support for configuring MRRT policies\n- **Terraform Provider** — Complete resource configuration for refresh token policies\n- **Auth0 Deploy CLI** — Full support for managing MRRT configurations in deployment pipelines\n\n## Documentation Links\n\n- [Multi-Resource Refresh Token Overview](https://auth0.com/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token)\n- [Configure and Implement MRRT](https://auth0.com/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token/configure-and-implement-multi-resource-refresh-token)\n- [Management API - Update Client](https://auth0.com/docs/api/management/v2/clients/patch-clients-by-id)\n"
    },
    {
      "id": "3kRaHbKHHvaDZjqdKFSNX2",
      "date": "2026-04-13",
      "displayDate": "April 13, 2026",
      "version": "v202615",
      "type": "added",
      "title": "Early Access availability of DPoP sender constraining for Enterprise Connections",
      "description": "Demonstrating Proof of Possession (DPoP) sender constraining for Enterprise Connections is now available in Early Access. Customers can now establish Okta and OIDC Enterprise Connections with DPoP enabled on those connections. This is available on all plans with Enterprise Connections.\n\nDPoP for Enterprise Connections enables Auth0 to generate DPoP proofs when performing token exchange and calling userinfo endpoints on upstream OIDC and/or Okta connections. DPoP is a core building block of FAPI2 and IPSIE (Identity Proofing and Secure Identity Exchange) ecosystems. It provides a lightweight, standards-based way to enforce proof-of-possession (of a private key) without the operational overhead of mTLS token binding.\n\nPlease see [product documentation](https://auth0.com/docs/authenticate/enterprise-connections/enable-dpop-enterprise-connections) for details.  "
    },
    {
      "id": "ZTobrcpU7AQ3v37HPRDWa",
      "date": "2026-04-09",
      "displayDate": "April 9, 2026",
      "version": "v202614",
      "type": "updated",
      "title": "Universal Login — \"Forgot Password\" CTA updated to \"Reset Password\"",
      "description": "The call to action for the Universal Login forgot password flow has been updated from \"Forgot Password\" to \"Reset Password.\" This aligns all Universal Login CTAs to be action-oriented. The updated text is available across all languages supported by Auth0. Customers who want to keep the original \"Forgot Password\" text can restore it via language customization at Branding > Universal Login > Edit text and translations. \n\nLearn more: https://auth0.com/docs/customize/login-pages/universal-login/customize-text-elements"
    },
    {
      "id": "7wWQexQzB29PXNwEFJhAZA",
      "date": "2026-04-09",
      "displayDate": "April 9, 2026",
      "version": null,
      "type": "added",
      "title": "My Organization API and Embeddable UI Components - Organization Details and IdP Management in Early Access!",
      "description": "We are excited to announce the __Early Access (EA)__ release of the __My Organization API__ and a library of __Embeddable UI Components for Organization Detail and Identity Provider Management__. Every B2B product needs an admin console for customers to manage their own members and security. This new feature set empowers B2B SaaS developers to deliver robust self-service experience for admins in a matter of days, not months.\n\nThe __My Organization API__ removes the need to build complex interfaces from scratch. With a secure governance layer that integrates seamlessly with your application, developers can easily deliver sophisticated, branded admin portals that meet the needs of even the largest customers without extra operational overhead.\n\n__Key Highlights:__\n\n__My Organization System API__: A purpose-built API designed for secure, scalable delegated administration, allowing customers to manage organization details and identity providers directly.\n\n__Embeddable UI Components__: A library of white-label building blocks that can be dropped into any application to provide instant self-service management for SSO, domains, and members.\n\n__Security-First Primitives__: Built-in support for cryptographically bound tokens via DPoP and automatic step-up authentication that triggers inline MFA for privileged actions.\n\n__Intelligent Onboarding__: A new Dashboard-based onboarding wizard that simplifies configuration with safe defaults, automated entity setup, and a test environment.\n\n__B2B Observability and Governance__: Enhanced tenant logs and per-organization rate limiting ensure full visibility into administrative actions while protecting tenant stability.\n\n__Interactive Developer Tools__: A modernized API Explorer and extensive SDK support across multiple languages allow developers to integrate and test administrative activity at scale.\n\n__Why This Matters:__\n\nThis release moves beyond simple API access to a unified governance layer for human and machine identity. Modern primitives like automatic least privilege ensures administrative sessions are always secure and context-aware. The result? Enterprise buyers can now get granular access levels and organization-specific rate limits they expect without the complexity of building custom backend middleware yourself.\n\nThis feature is available for all tenants. To begin, navigate to the __Applications > APIs __section of your Dashboard to activate the My Organization API.\n\nTo learn more, read the [My Organization API documentation](https://auth0.com/docs/manage-users/my-organization-api) and if you have any feedback, give us a shout in our community channel!"
    },
    {
      "id": "5HgzBbwQyUv6qtPHjfV0mX",
      "date": "2026-04-09",
      "displayDate": "April 9, 2026",
      "version": null,
      "type": "added",
      "title": "Akamai Supplemental Signals is Now GA",
      "description": "__Auth0 Akamai Supplemental Signals is now GA__ and available across the full authentication lifecycle. \n\nThis update allows developers to ingest risk scores and edge intelligence from Akamai Bot Manager and Account Protector into several new Action triggers: __Pre-User Registration__, __Post-User Registration__, __Post-Challenge__, and __Post-Change Password__. \n\nBy integrating these signals directly into the Auth0 pipeline, organizations can stop automated bot signups before an account is created and enforce real-time security logic during critical events like password resets or MFA challenges.\n\nTo learn more about __Akamai Supplemental Signals__ and how to set it up review our online documentation [here](https://auth0.com/docs/secure/attack-protection/configure-akamai-supplemental-signals)\n"
    },
    {
      "id": "52jneyDuedriHasGYwAOQw",
      "date": "2026-04-08",
      "displayDate": "April 8, 2026",
      "version": "v202614",
      "type": "added",
      "title": "Multiple Custom Domains General Availability ",
      "description": "We’re excited to announce that __Multiple Custom Domains (MCD)__ is now __Generally Available__.\n\nWith Multiple Custom Domains, Enterprise customers can support __multiple branded login experiences from a single Auth0 tenant__. This helps you deliver more tailored authentication experiences across __consumer applications__, __multi-brand businesses__, and __B2B SaaS use cases__.\n\nMCD GA includes support for:\n- Configuring __custom domains at scale__ within a single tenant\n- A __default domain__ for streamlined development and testing\n- __Passkey enrollment__ on custom domains\n- __B2B SaaS Self-Service SSO__ customizations\n- __Custom domain metadata__ in __Advanced Customizations for Universal Login (ACUL)__\n- Support across __Management SDKs__, __Authentication SDKs__, and __Forms__\n\nVisit [Auth0 docs](https://auth0.com/docs/customize/custom-domains/multiple-custom-domains) to get started. "
    },
    {
      "id": "4SIYjVxOsFw6paD8OcEu8l",
      "date": "2026-04-08",
      "displayDate": "April 8, 2026",
      "version": null,
      "type": "added",
      "title": "Express Submission to the Okta Integration Network",
      "description": "Auth0 developers leveraging [Express Configuration with Okta](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta/express-configuration) now have a more streamlined process for submitting their application to the Okta Integration Network.\n\nThe Okta Integration Network (OIN) Wizard has been updated with a new section for Auth0 developers that automatically populates the required configuration fields for OpenID Connect (OIDC), System for Cross-domain Identity Management (SCIM), and Global Token Revocation (GTR) integrations, based on information sourced from the Auth0 Dashboard.\n\nTo learn more about Express Configuration with Okta and the Okta Integration Network (OIN), [click here](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta/express-configuration)."
    },
    {
      "id": "1f7TwWKr5f9m3oy4e4vmLE",
      "date": "2026-04-07",
      "displayDate": "April 7, 2026",
      "version": null,
      "type": "added",
      "title": "Introducing the Developer Preview Release Stage",
      "description": "We are excited to introduce __Developer Preview__, a new product release stage designed to get upcoming capabilities into your hands faster! \n\nDeveloper Preview serves as a new release phase for new Auth0 product introductions. We utilize this stage when a new product capability will eventually be a paid feature, but we want to grant you access before the official pricing is applied.\n\nKey Highlights:\n\n- __Free Production Access__: You can use Developer Preview features in your production environments for free during the preview period.\n- __Clear Expectations__: Participating in a Developer Preview provides a clear signal that the feature will include a paid component once it reaches General Availability (GA).\n- __Help Shape the Product__: Getting these features to you early allows us to collect valuable feedback to iterate on prior to the GA launch.\n\nTo participate in an active Developer Preview, you will simply need to sign up and accept the specific opt-in requirements for that feature. \n\nTo learn more about how Developer Preview fits into our overall release process, visit our updated [Product Release Stages documentation](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages).\n"
    },
    {
      "id": "3MZj1D42UqFktc1W2YauoP",
      "date": "2026-04-02",
      "displayDate": "April 2, 2026",
      "version": "v202609",
      "type": "updated",
      "title": "Customize Signup and Login Prompts: Dashboard UI, Passkey Support, and Custom Database Access",
      "description": "You can now manage custom authentication screen partials directly in the Auth0 dashboard with a purpose-built visual editor. Instead of encoding HTML as strings and sending them through the API, you get a proper code editor with syntax highlighting and live feedback.\n\n![Custom Prompts Dashboard UI](//images.ctfassets.net/kbkgmx9upatd/5IuiTcddCX8fTQb9FOQ1oz/e6ab41985aff4f48ec34a18ffec60cc6/Screenshot_2026-04-02_at_1.13.12â__PM.png)\n\nThe editor includes supporting tools:\n\n- **Code snippet library:** pre-built snippets for common use cases like first and last name, phone number, terms of service checkboxes, and more, ready to insert with a click\n- **Template variable reference:** a clickable list of all context variables available in the partial, for quick insertion without leaving the editor\n- **Actions shortcut:** open Actions in a new window directly from the editor\n- **Interactive preview:** click into entry points to edit HTML inline, see visually which entry point each element belongs to, and toggle entry point wrappers off to preview what the prompt looks like in the login flow\n\nThis update also expands what's possible with partials:\n\n- **Passkey screens:** customize passkey authentication screens anywhere they appear in your flow; data capture is supported in the signup flow\n- **Custom database connections:** data captured from partials is now surfaced in custom database connection scripts\n\nHead over to the [Auth0 Docs](https://auth0.com/docs/customize/login-pages/universal-login/customize-signup-and-login-prompts) to learn more."
    },
    {
      "id": "7ahFabBSSuqU5So54b78C1",
      "date": "2026-03-26",
      "displayDate": "March 26, 2026",
      "version": null,
      "type": "updated",
      "title": "Session ID Rotation for SAML and WS-Fed Authentication",
      "description": "## What's new:                                                                                                   \n\nWe've updated session handling in SAML-P and WS-Fed authentication flows to align with industry best practices and our existing OAuth2/OIDC behavior. Following a successful login via SAML-P or WS-Fed, the session ID will now be rotated and a new session cookie will be issued.\n\n## What this means for you:                                                                        \n\nIf your implementation includes client-side logic, downstream services, or integrations that read or store session IDs across SAML-P or WS-Fed login flows, you will now receive a new session ID after authentication completes. Please review and update any such implementations accordingly.\n\nThis change brings SAML-P and WS-Fed session handling in line with the existing behavior of OAuth2 and OIDC flows, ensuring consistent and secure session management across all authentication protocols."
    },
    {
      "id": "2x4w10jjTmGC1AQuf5fJkZ",
      "date": "2026-03-17",
      "displayDate": "March 17, 2026",
      "version": null,
      "type": "added",
      "title": "Introducing the New Spring Boot API SDK",
      "description": "We are excited to announce the release of auth0-springboot-api, a new official SDK designed to streamline authentication and security for Spring Boot backend applications.\n\n__Key Benefits:__\n- __Supports Spring Boot 3.2+ (Java 17+)__ and built for the modern filter-chain pattern.Developers can secure an API by injecting Auth0AuthenticationFilter into their SecurityFilterChain — just configure auth0.domain and auth0.audience in application.yml and go.\n- __Abstracts the complexity of JWT validation__. Developers no longer need to write fragile boilerplate code to check Audiences or Issuers. The SDK handles JWKS fetching, token validation, and scope-to-authority mapping (SCOPE_ prefix) out of the box.\n- __Supports DPoP with flexible enforcement modes__ (Allowed, Required, Disabled). Enterprise customers can enforce proof-of-possession token security per RFC 9449 with a single config property — no controller changes needed.\n\n__Getting Started:__\n- [Quickstart](https://auth0.com/docs/quickstart/backend/java-spring-security5)\n- [Official Repo](https://github.com/auth0/auth0-auth-java)\n- [Examples](https://github.com/auth0/auth0-auth-java/blob/main/auth0-springboot-api/EXAMPLES.md)"
    },
    {
      "id": "6WhEr0c0yB3K5oh7jiPADP",
      "date": "2026-03-13",
      "displayDate": "March 13, 2026",
      "version": null,
      "type": "added",
      "title": "Google Workspace Directory Sync for Groups - Now in Early Access",
      "description": "We’re excited to announce that __Google Workspace Directory Sync for Groups__ is now available in Early Access (EA)!\n\nThis enhancement enables the automatic and reliable sync of group structures and memberships from Google Workspace directly into Auth0 Enterprise Groups.  \n\n__Key Highlights:__\n\n- __Automated group synchronization:__ Continuously mirror your Google Workspace groups into Auth0 to ensure your roles and access permissions remain accurate and up to date without manual intervention or relying on login events.\n- __Streamlined \"Sync All\" functionality:__ Enable groups synchronization for your entire Google Workspace Enterprise Connection through either the Management Dashboard or Management API in one step.  \n- __View groups in Auth0:__ Groups provisioned using Google Workspace Directory Sync for Groups can be viewed in the Management Dashboard under Enterprise Groups, or retrieved through the Management API. \n- __Sync groups from Auth0 to external systems:__ Users and groups provisioned inbound to Auth0 can be synchronized outbound to external systems using Auth0’s Event streams feature.\n- __Use groups in the Post-Login Action:__ Use group information pushed from Enterprise identity providers in your Auth0 post-login actions to make access control and authorization decisions in Auth0.\n\nTo join the EA program, please complete the EA Terms & Conditions [form](https://forms.gle/AtySc6Y9fxs15yXj9) and contact your Auth0 Account Team to request activation and supporting documentation."
    },
    {
      "id": "1RJ7fX7AJuT01XZ9o4ZeH6",
      "date": "2026-03-11",
      "displayDate": "March 11, 2026",
      "version": "v202610",
      "type": "added",
      "title": "Sender constrained tokens using DPoP is now Generally Available on Enterprise plans.",
      "description": "Support for sender constraining tokens using Demonstrating Proof of Possession (DPoP) is now generally available on Enterprise plans. \n\nDemonstrating Proof of Possession (DPoP) as defined in RFC9449, is an application level mechanism for binding tokens issued by Auth0 to the client application that requested that token. This is implemented using asymmetric key cryptography and with keys that are generated and managed by the client application - no public key infrastructure (PKI) is required.\n\nSender constraining tokens in this way using DPoP helps to:\n - enhance security by mitigating against token theft and misuse by unauthorised parties\n - improve user experience by being able to use longer-lived access tokens without significantly increasing security risk i.e. not requiring frequent user authentication\n\nAdditional features since the EA release includes replay protection against client applications sending repeated DPoP proofs, and the ability to require DPoP for public clients only, or all clients.\n\nA number of Auth0 SDKs have shipped with support for DPoP: \n - Authentication SDKs supporting DPoP for client applications:  auth0-spa-js,  auth0-react, auth0-angular, nextjs-auth0, auth0-flutter, Auth0.Swift and Auth0.Android\n - Authentication SDKs supporting DPoP for APIs/Resource Servers:express-oauth2-jwt-bearer, auth0-api-js, auth0-api-python, aspnetcore-api\n - Management SDKs supporting DPoP configuration: terraform-provider, go-auth0,deploy-cli, node-auth0, auth0.net\n\nFor more details, see the [product documentation](https://auth0.com/docs/secure/sender-constraining/demonstrating-proof-of-possession-dpop)."
    },
    {
      "id": "a8ASoFgEcUK0MefoGhIYi",
      "date": "2026-03-10",
      "displayDate": "March 10, 2026",
      "version": null,
      "type": "added",
      "title": "Customize RPID values for Passkeys EA",
      "description": "Boost Passkey adoption by enabling shared enrollment across subdomains. You can now customize the RP ID to allow a single Passkey to authenticate users across multiple applications under the same root domain.Currently in EA\n\nLearn more about customizing RP ID for Passkeys:\n\n[Configure Passkey Policy ](https://auth0.com/docs/authenticate/database-connections/passkeys/configure-passkey-policy)\n\nNative Passkeys for Mobile Applications - Auth0 Docs - [Native Passkeys for Mobile Applications ](https://auth0.com/docs/authenticate/database-connections/passkeys/native-passkeys-for-mobile-applications)\n\nPasskeys - Auth0 Docs - [Passkeys Docs](https://auth0.com/docs/authenticate/database-connections/passkeys)"
    },
    {
      "id": "24nAKx5yhwaJc9tCnjVABy",
      "date": "2026-03-06",
      "displayDate": "March 6, 2026",
      "version": "v202610",
      "type": "added",
      "title": "Real-time API & Rate Limit Metrics Streaming (Beta)",
      "description": "You can now stream real-time metrics for Auth0 Management API usage and rate limit events directly to your observability platform.\n\nThese new metric streams give you detailed telemetry on every API request, including success/failure status, specific failure reasons like rate limits, and diagnostic data such as Client ID and request path. This allows you to proactively monitor for rate limit issues, troubleshoot API errors faster, and correlate Auth0 performance with your own application's health, all from within your existing monitoring tools.\n\nWe've included out-of-the-box support for Datadog, and you can connect to New Relic, Prometheus, and Splunk using OpenTelemetry.\n\nThis feature is now available in Beta. To get started, check out our Metric Streams documentation."
    },
    {
      "id": "8WjIOWCE7KMD1HF8qRBjj",
      "date": "2026-03-04",
      "displayDate": "March 4, 2026",
      "version": "v202610",
      "type": "added",
      "title": "Forms - HTTP Vault Connection New Options",
      "description": "We’re excited to announce that we added new options for __Forms HTTP Vault Connections__!\n\nThis new set of options allows you to configure different authorization methods for your HTTP Request Flow Actions.\n\n![http-vault-connection-options](//images.ctfassets.net/kbkgmx9upatd/3q09gMqKtLyOuVngPdJlV1/bb95459cac6209d240d42c02002cb922/Changelog.svg)\n\nWhat's new:\n- __Client Credentials Support:__ Configure [OAuth Client Credentials](https://auth0.com/docs/customize/forms/vaults/http#configure-your-http-vault-connection-for-oauth-client-credentials) and keep the access token fresh for your HTTP Request Flow Actions authorization.\n- __API Key Support:__ Authorize your HTTP Request Flow Actions using an [API Key](https://auth0.com/docs/customize/forms/vaults/http#configure-your-http-vault-connection-for-api-key), defining the header or query param key and secret value.\n- __Basic Auth Support:__ Configure and reuse [Basic Auth](https://auth0.com/docs/customize/forms/vaults/http#configure-your-http-vault-connection-for-basic-authentication) authorization for your HTTP Request Flow Actions, helping you replace the legacy built-in option.\n"
    },
    {
      "id": "6NsBsJujkexciOsVQkTSO9",
      "date": "2026-03-03",
      "displayDate": "March 3, 2026",
      "version": null,
      "type": "added",
      "title": " Brute Force Protection for Passwordless Notifications",
      "description": "To improve the end-user experience and mitigate message spam, Brute Force Protection now proactively prevents the sending of passwordless email and SMS codes to users who are already blocked. \n\nThis update ensures that restricted users cannot continue to trigger unsolicited notifications, closing a gap in our abuse prevention coverage and reducing unnecessary messages\n\nFor more information on _Brute Force Protection_, check out our [online documentation](https://auth0.com/docs/secure/attack-protection/brute-force-protection)."
    },
    {
      "id": "1yZLr3z0RceWn8mQ1bLvUL",
      "date": "2026-03-03",
      "displayDate": "March 3, 2026",
      "version": "v202609",
      "type": "updated",
      "title": "Actions - Transaction Metadata - GA",
      "description": "We are excited to announce that __Actions Transaction Metadata__ is now GA.\n\nThis feature allows you to set, share, and access, custom data between Actions run in the same `post-login` execution.\n\nFunctionality includes:\n- __Accessing Transaction Metadata:__ A new `event.transaction.metadata` object within `post-login` Actions that contains the custom `key/value` pairs, which can be accessed through `key`.\n- __Setting Transaction Metadata:__ A new `api.transaction.setMetadata` function within `post-login` Actions that serves as interface to set the custom `key/value` pairs.\n- __Immediate Access:__ Values are available immediately after being set in the calling Action and subsequent Actions.\n- __Values Types:__ Values can be `boolean`, `number`, `string`, or `string` serialization of `object` and `array`.\n- __Docs:__ [Actions Transaction Metadata](https://auth0.com/docs/customize/actions/transaction-metadata \"Actions Transaction Metadata Docs\")"
    },
    {
      "id": "5KqKUjbLeP1GnlbP5FOeYp",
      "date": "2026-02-26",
      "displayDate": "February 26, 2026",
      "version": "v202609",
      "type": "added",
      "title": "Actions - Modules - EA",
      "description": "We are excited to announce that __Actions Modules__ is now available in [__Early Access__](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#early-access \"Early Access\").\n\nThis feature allows you to create, manage, and share reusable code across different Actions within your Auth0 Tenant.\n\n__Early Access__ functionality includes:\n- __Simplified Code Management:__ Reduce code duplication and improve organization by writing common logic once and importing it into any Action where it is needed. This makes your Actions easier to maintain and update.\n- __Improved Performance:__ Move expensive initialization work into a module that can be reused across multiple Actions. This avoids re-running the same setup code in every execution.\n- __Cross-trigger Access:__ Actions Modules become available for every Action Trigger type.\n- __Independent Secrets and Dependencies:__ Actions Modules have independent secrets and dependencies from Actions.\n- __Docs:__ [Actions Modules](https://auth0.com/docs/customize/actions/modules/actions-modules-overview)"
    },
    {
      "id": "ogAQMfll57UWlfbmvphPA",
      "date": "2026-02-25",
      "displayDate": "February 25, 2026",
      "version": "v202608",
      "type": "added",
      "title": "Native to Web SSO is now Generally Available",
      "description": "### Description\n\nNative to Web SSO enables seamless single sign-on from native mobile applications to web applications. Users authenticated in a native mobile app can now transition to web content without re-authenticating, providing a frictionless cross-platform experience.\n\n### What's New in GA\n\nBuilding on the Early Access release, GA includes the following enhancements:\n\n- **Auth0 Dashboard Support**: Configure Native to Web SSO directly from the Auth0 Dashboard, no longer limited to Management API configuration\n- **Refresh Token Metadata in Actions**: Access parent refresh token metadata within Session Transfer Actions, enabling richer context for customization and security decisions during the session transfer flow\n- **Step-up Authentication Support**: Trigger MFA challenges during the Native to Web SSO flow for enhanced security when accessing sensitive web content\n- **React Native SDK Support**: Native to Web SSO is now available in the Auth0 React Native SDK, supporting both Hooks (`useAuth0`) and class-based approaches\n- **Organizations Support**: Use Native to Web SSO with Auth0 Organizations to maintain organization context when transferring sessions from native to web\n- **Web SDK Integration Examples**: New code examples for Auth0 SPA SDK (`@auth0/auth0-spa-js`) and Auth0 React SDK (`@auth0/auth0-react`) for receiving session transfer tokens in web applications\n- **Enhanced Monitoring & Troubleshooting**: Comprehensive warning log events help developers troubleshoot session transfer validation failures\n\n### Core Features\n\n- **Session Transfer Tokens (STT)**: Native apps can request a secure, short-lived token to transfer the authenticated session to web applications\n- **Seamless Web Session Creation**: Exchange STT for a web session without user interaction\n- **Cross-Platform SSO**: Maintain authentication state when moving between native and web contexts\n- **Session Transfer Actions**: Customize the session transfer flow with Auth0 Actions\n\n### How It Works\n\n1. User authenticates in the native mobile app using Auth0\n2. Native app requests a Session Transfer Token via the Authentication API\n3. When opening web content (WebView or browser), the STT is included in the authorization request\n4. Auth0 validates the STT and creates a web session\n5. User is automatically authenticated in the web application\n\n### Benefits\n\n- **Improved User Experience**: Eliminate re-authentication friction when moving from native to web\n- **Enhanced Security**: STTs are short-lived, single-use, and bound to the original session\n- **Easy Integration**: Works with existing Auth0 mobile SDKs (iOS, Android, React Native)\n\n### Getting Started\n\n- [Native to Web SSO Overview](https://auth0.com/docs/authenticate/single-sign-on/native-to-web)\n- [Configure and Implement Native to Web SSO](https://auth0.com/docs/authenticate/single-sign-on/native-to-web/configure-implement-native-to-web)\n- [Native to Web SSO and Sessions](https://auth0.com/docs/authenticate/single-sign-on/native-to-web/native-to-web-sso-and-sessions)\n- [Mobile to Web Payment Flows Quickstart](https://auth0.com/docs/authenticate/single-sign-on/native-to-web/configure-mobile-to-web-payment-flows)\n- [iOS SDK Documentation](https://auth0.com/docs/libraries/auth0-swift)\n- [Android SDK Documentation](https://auth0.com/docs/libraries/auth0-android)\n- [React Native SDK Documentation](https://auth0.com/docs/libraries/auth0-react-native)\n- [Auth0 CLI](https://github.com/auth0/auth0-cli)\n- [Terraform Provider Documentation](https://registry.terraform.io/providers/auth0/auth0/latest/docs)\n- [Deploy CLI Documentation](https://auth0.com/docs/deploy-monitor/deploy-cli-tool)\n\n### Availability\n\nThis feature is now generally available for all Auth0 Enterprise customers."
    },
    {
      "id": "5LrDcc5jpGzMlmWsfsvdCQ",
      "date": "2026-02-19",
      "displayDate": "February 19, 2026",
      "version": "v202607",
      "type": "added",
      "title": "New Self-Service SSO Templates for Okta & Auth0 SAML Now Available!",
      "description": "We’ve expanded our Self-Service SSO capabilities with two new, highly-requested IdP templates for Okta SAML and Auth0 SAML. This update streamlines the configuration process for your enterprise customers, enabling faster, more reliable SSO integration.\n\n__Guided, Step-by-Step Configuration__\n\nPreviously, setting up connections for providers like Okta SAML required using a generic template. Now, your customers will get a purpose-built, guided experience. Our new templates provide detailed, step-by-step instructions with screenshots specific to each IdP, reducing complexity and eliminating guesswork for your customers' IT teams.\n\n__Key Enhancements:__\n\n- New Templates: A dedicated guide for customers who use Okta or Auth0 as their identity provider, making one of the most common connection types easier than ever.\n- Reduced Support Load: By making the process more intuitive for your customers, we help reduce your team's support burden and speed up your enterprise onboarding flow.\n\nLearn more about Self-Service SSO in the [product documentation](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO \"product documentation\")."
    },
    {
      "id": "7bcwAONmeID47j86VfN5rd",
      "date": "2026-02-17",
      "displayDate": "February 17, 2026",
      "version": "v202607",
      "type": "added",
      "title": "Forms - Flows Auth0 Send SMS and Auth0 Make Call Actions",
      "description": "We’re excited to announce that we added __Flows Auth0 Send SMS and Auth0 Make Call Actions__!\n\nThis new feature allows you to send phone messages from Flows using the customized Phone Provider at your Auth0 Tenant.\n\n![auth0-notifications-send-sms-make-call-preview](//images.ctfassets.net/kbkgmx9upatd/2npX0Xj85LdlsdStjFLTuN/160af1b5cf5890673df0bb912faac5e9/Changelog.svg)\n\nWhat's new:\n- __Phone Providers:__ take advantage of the [supported phone providers](https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers) that can be configured at your Auth0 Tenant.\n- __Custom Phone Provider:__ write custom code to send your phone messages to unsupported phone providers using the [Custom Phone Provider Action](https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers/configure-a-custom-phone-provider).\n- __Custom Properties:__ customize [Send SMS Action](https://auth0.com/docs/customize/forms/flows/integrations/auth0#send-sms) and [Make Call Action](https://auth0.com/docs/customize/forms/flows/integrations/auth0#make-call) for the outgoing phone messages including from, to, message, and variables.\n- __Liquid Syntax:__ use [Liquid syntax](https://auth0.com/docs/customize/email/email-templates/use-liquid-syntax-in-email-templates) at your phone message.\n"
    },
    {
      "id": "4XCPHK0lxXRWfPqughjGqS",
      "date": "2026-02-10",
      "displayDate": "February 10, 2026",
      "version": "v202604",
      "type": "updated",
      "title": "Session Metadata is now Generally Available for all Enterprise customers.",
      "description": "## What's New\n\nSession Metadata allows you to attach custom key–value data to a user's session using Actions or the Auth0 Management API. This enables you to persist contextual data throughout the session lifecycle, powering richer integrations, stronger audit trails, and personalized session behavior.\n\n### Key capabilities:\n\n- **Set and retrieve metadata in Actions** using `api.session.setMetadata(key, value)` and `event.session.metadata`\n- **Manage metadata via Management API** with `GET` and `PATCH` on `/api/v2/sessions/{id}`\n- **Delete individual keys** using `api.session.deleteMetadata(key)` or evict all metadata with `api.session.evictMetadata()`\n- **Include session metadata in OIDC Back-Channel Logout tokens** for downstream systems to receive context during logout events\n\n### Example usage in Actions:\n\n    exports.onExecutePostLogin = async (event, api) => {\n      api.session.setMetadata(\"deviceName\", event.request.user_agent);\n      api.session.setMetadata(\"loginRegion\", event.request.geoip?.countryCode);\n      api.session.setMetadata(\"orgContext\", event.organization?.id);\n    };\n\n### Limits:\n\n- Maximum of **25 key-value pairs** per session\n- Each key and value must be a **string** with max **255 characters**\n- Metadata is stored as a flat JSON object (no nesting)\n\n---\n\n## Use Cases\n\n- **Self-service device management**: Store device names or login locations for user-facing session management UIs\n- **Keep Me Signed In**: Persist user preferences to customize session behavior\n- **Organization context**: Store organization information for multi-tenant applications\n- **Audit and compliance**: Include session context in logout tokens for downstream audit systems\n\n---\n\n## Availability\n\nSession Metadata is now **Generally Available** for all Enterprise tenants.\n\nNo API or behavior changes from Early Access.\n\n---\n\n## Learn more\n\n- [Session Metadata Documentation](https://auth0.com/docs/manage-users/sessions/session-metadata)\n- [Configure Session Metadata](https://auth0.com/docs/manage-users/sessions/session-metadata/configure-session-metadata)\n- [Use Case: Organization Information in Session Metadata](https://auth0.com/docs/manage-users/sessions/session-metadata/add-organization-information)"
    },
    {
      "id": "66wOIhfWKdTVk1y1eFjwH4",
      "date": "2026-02-06",
      "displayDate": "February 6, 2026",
      "version": "v202602",
      "type": "added",
      "title": "Refresh Token Metadata now available in Early Access",
      "description": "\nWe're excited to announce that **Refresh Token Metadata** is now available in **Early Access** for Enterprise customers.\n\nRefresh Token Metadata allows you to attach custom key-value pairs to refresh tokens, enabling richer context storage and more personalized authentication experiences.\n\n### What's New\n\n**Store Custom Data on Refresh Tokens**\n\nYou can now attach up to 25 custom key-value pairs to each refresh token. This metadata persists throughout the token's lifecycle and can be accessed or modified via the Management API.\n\n```javascript\n// In Post-Login Action\nexports.onExecutePostLogin = async (event, api) => {\n  api.refreshToken.setMetadata('deviceName', event.request.user_agent);\n  api.refreshToken.setMetadata('loginRegion', event.request.geoip?.countryCode);\n  api.refreshToken.setMetadata('orgContext', event.organization?.id);\n};\n```\n\n**Management API Support**\n\nAccess and manage refresh token metadata programmatically:\n\n- `GET /api/v2/refresh-tokens/{id}` - Retrieve token with metadata\n- `PATCH /api/v2/refresh-tokens/{id}` - Update token metadata\n- `DELETE /api/v2/refresh-tokens/{id}` - Revoke token\n\nLearn more about Refresh Token Metadata in our [documentation](https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-metadata) "
    },
    {
      "id": "3EewWZ94uLQBroGrdOSAAQ",
      "date": "2026-02-06",
      "displayDate": "February 6, 2026",
      "version": null,
      "type": "added",
      "title": "Credential Guard: Breached Phone Credentials Support",
      "description": "To strengthen defenses across the identity surface, we have added millions of breached phone credentials to our detection capabilities within __Credential Guard__\n\nThis enhancement allows organizations using Phone as an Identifier to proactively identify compromised credentials and trigger automated security responses, such as login blocks or password resets. \n\nThis expansion ensures that phone-based authentication is as secure as traditional email-based methods without impacting system performance. \n\nFor more information on __Credential Guard__, check out our [online documentation](https://auth0.com/docs/secure/attack-protection/breached-password-detection#detect-breaches-faster-with-credential-guard).\n"
    },
    {
      "id": "34nfrABQdaCKQ7ZFzslAqP",
      "date": "2026-02-06",
      "displayDate": "February 6, 2026",
      "version": null,
      "type": "added",
      "title": "Auth0 Agent Skills ",
      "description": "We're introducing Auth0 Agent Skills Beta- structured guidance that teaches AI coding assistants how to implement Auth0 authentication correctly across any framework.\n\nAgent Skills are AI-native instructions that work with popular coding assistants like Claude Code, Codex, Gemini CLI, etc... They provide production-ready code patterns, security best practices, and step-by-step implementation flows directly within your development workflow.\n\n__Key Features__\n  - Framework Coverage: Support for React, Next.js, Vue, Angular, Express, Nuxt, React Native, and more\n  - Security First: Built-in best practices for MFA, protected routes, and secure token handling\n  - Migration Support: Guided migration from Firebase Auth, AWS Cognito, Supabase, and other providers\n  - Easy Installation: Install via CLI (npx skills add auth0/agent-skills) or directly in Claude Code plugins\n  - Production Ready: Generate complete authentication implementations in minutes\n\n__Getting Started__\n- Install Auth0 Agent Skills: `npx skills add auth0/agent-skills`\n- Then ask your AI assistant: \"Add auth0 to my app\" and you're ready to go.\n\n__Learn More__\n  - [auth0/agent-skills repo](https://github.com/auth0/agent-skills)\n  - [Documentation](https://auth0.com/docs/quickstart/agent-skills)"
    },
    {
      "id": "40upcFBPuFxKG7nacgSlQc",
      "date": "2026-02-02",
      "displayDate": "February 2, 2026",
      "version": null,
      "type": "added",
      "title": " Enhanced Bot Detection Accuracy with JA4 Signals",
      "description": "To provide a more robust defense against sophisticated automated threats, Auth0 has integrated JA4 signals into the core of our Bot Detection machine learning engine.\n\nThe addition of JA4 signals allows our models to surface and mitigate sophisticated automated threats that traditional signals often miss. \n\nThis enhanced security feature is available now to all Enterprise customers with the Attack Protection add-on. The rollout is currently underway and will be completed in the coming weeks, aligned with individual customer release schedules.\n\nTo learn more about Auth0's Bot Detection Product, click [here](https://auth0.com/docs/secure/attack-protection/bot-detection)\n"
    },
    {
      "id": "29R56ta9PFA5dZI59IiWOr",
      "date": "2026-02-02",
      "displayDate": "February 2, 2026",
      "version": "v202547",
      "type": "updated",
      "title": "Better Mobile UX: Numeric Keyboards Now Default for OTPs ",
      "description": "We’re excited to roll out a highly requested update to the mobile login experience! We know that every tap matters when it comes to user conversion, so we’ve eliminated a common friction point in the authentication journey.\n\n![otp_numeric_pad.png](//images.ctfassets.net/kbkgmx9upatd/695PTlpJ9e7m5fcfOonCZy/79286d8ef2a1db5c63bf38543ab14c30/otp_numeric_pad.png)\n\nPreviously, users might have been met with a standard alphabetical keyboard when prompted for a code. Now, for all SMS and Email OTP challenges, mobile devices will automatically surface the numeric keyboard. This change spans 16+ touchpoints—including MFA enrollment, Passwordless login, and password resets—ensuring your authentication flow feels native, intuitive, and fast.\n\n### What do you need to do?\nNothing at all. This optimization is automatically enabled for all customers using the Universal Login experience. Your users are already enjoying a smoother, \"fat-finger\" proof login today!\n\n### Experience it yourself\nTrigger an MFA challenge or Passwordless login from your mobile device to see the new flow in action.\n* Visit your [Dashboard](https://manage.auth0.com)"
    },
    {
      "id": "6osxJFJUB5gsCePUpSanRQ",
      "date": "2026-01-30",
      "displayDate": "January 30, 2026",
      "version": null,
      "type": "added",
      "title": "Inbound SCIM Groups for Enterprise Connections is now in Limited Early Access",
      "description": "We’re pleased to announce that support for Groups within Auth0’s [Inbound SCIM for Enterprise Connections](https://auth0.com/docs/authenticate/protocols/scim/configure-inbound-scim) feature is now in limited early access!\n\nThis release is useful for developers that support users and groups natively in their applications, and need to support integrations with Enterprise identity providers that use SCIM 2.0 to remotely manage these users and groups.\n\n__New group capabilities added:__\n\n- __SCIM groups endpoint per connection__ - Each Enterprise connection gets dedicated SCIM */users* and */groups* endpoints and dedicated credentials that enable provisioning, de-provisioning, and management of the users and groups specific to that connection.\n\n- __Sync groups from Auth0 to external systems__  - Users and groups provisioned inbound to Auth0 can be synchronized outbound to external systems using Auth0’s [Event streams](https://auth0.com/docs/customize/events) feature.   \n\n- __Use groups in the Post-Login Action__ - Use group information pushed from Enterprise identity providers in your Auth0 [post-login actions](https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger) to make access control and authorization decisions in Auth0.  \n\n- __View groups in the Auth0 Dashboard__ - All groups provisioned using SCIM can be viewed in the Auth0 Dashboard under a new Enterprise Groups tab, as well as per user under the Users section. \n\n__How to get access__\n\nTo join the Limited EA program and access SCIM Groups for Enterprise connections, complete the [EA Terms & Conditions form](https://docs.google.com/forms/d/e/1FAIpQLSeGhlEuXSm4hqrP9DZgeEWtntUHCSzqCpKC_yiK2ISIUubsGg/viewform) and contact your Auth0 Account Team to request activation and supporting documentation."
    },
    {
      "id": "6Kmd70H7bziDh3wpJ1ofSG",
      "date": "2026-01-30",
      "displayDate": "January 30, 2026",
      "version": null,
      "type": "added",
      "title": "New FGA Dashboard Logging UI is being rolled out",
      "description": "We are excited to announce the **FGA Logging UI**! This introduces a web interface to the existing logging API, giving you the ability to view FGA logs directly in the FGA Dashboard. \n\nUsers can now filter, sort and inspect access logs directly from the FGA Dashboard, significantly reducing the time required for debugging and troubleshooting issues.\n\nThe Logging UI provides an easy-to-use visual interface with capabilities to sort and filter log entries.\n\n- **Visual Interface:** Users can now immediately view a list of log entries for operations like Check() and Write() in the main viewing area of the UI. Drilling down into a single log entry will open a side panel for a full detailed view of the log data in JSON format, with a convenient copy-and-paste button to quickly copy and paste log data into another application for viewing or saving.\n\n- **Date/time ranges:** Viewing log data can be daunting due to sheer volume. The UI has a convenient date picker to set the time-bound log retrieval window.\n\n- **Filtering:** We’ve introduced a simple search box for filtering. Its simplicity does not take away from its power as the search accepts Lucene syntax (a subset) for advanced querying of logs. Now, retrieving all write operations is as easy as typing request.operation:\"Write\" into the search box.\n\n- **Sorting:** The UI supports standard sorting of fields for ascending and descending ordering of data, used in situations, for example, when quickly needing to toggle between seeing “newest first” or “oldest first” log data.\n\nFor more details, refer to Auth0 FGA’s [logging](https://docs.fga.dev/fga-logging) documentation."
    },
    {
      "id": "5KLqJ24PwGJRs8qputOEkL",
      "date": "2026-01-30",
      "displayDate": "January 30, 2026",
      "version": "v202605",
      "type": "added",
      "title": "API Access Policies for Applications is now Generally Available",
      "description": "We are pleased to announce that __API Access Policies for Applications__ is now Generally Available (GA) for all Auth0 customers. This feature allows you to specifically control which applications can request access tokens for your APIs, covering __both user and machine-to-machine access__.\n\nPreviously available only via the Management API, these __policies can now be fully configured directly within the Auth0 Dashboard__. The new UI allows you to easily visualize and manage permissions per API, ensuring that only authorized applications can access sensitive resources.\n\n__Key Benefits__:\n- __Granular Control__: Define distinct access policies for user access vs. machine-to-machine access.\n- __Enhanced Security__: Use the `require_client_grant` policy to ensure only explicitly authorized applications can obtain tokens for the subset of allowed permissions.\n- __Simplified Management__: Configure these settings visually through the new Dashboard UI.\n\nTo learn more, navigate to Applications > APIs > Application Access in the dashboard or read our [reference docs](https://auth0.com/docs/get-started/apis/api-access-policies-for-applications).\n\n![API Access Permissions dashboard](https://cdn.auth0.com/blog/API-Access-Polices-for-Apps.png)"
    },
    {
      "id": "495lZtEV5GFvXCEEOTmXpQ",
      "date": "2026-01-30",
      "displayDate": "January 30, 2026",
      "version": null,
      "type": "added",
      "title": "Google Workspace Inbound User Directory Sync is Now Generally Available!",
      "description": "We’re excited to announce that Google Workspace User Directory Sync is now generally available! This feature keeps Auth0 user profiles up to date by syncing users from your Google Workspace directory into Auth0 - so user profile updates don’t depend on login events. \n\n__Key highlights of this release:__\n\n- __Dashboard configuration__: Enable and manage inbound user directory sync directly from the Auth0 Dashboard on your Google Workspace enterprise connection (including attribute mapping, automated sync, and manual sync). \n- __Management API support__: Programmatically enable, configure, and run inbound user directory sync using the Management API Connections endpoints. \n- __Self-Service SSO experience__: Your customers’ IT teams can configure Google Workspace inbound directory sync alongside SSO and SCIM provisioning, and manage user onboarding/offboarding directly. \n\n__Learn more:__\n- [Sync Google Workspace Users to Auth0 with Directory Sync](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/google-directory-sync)\n- [Management API Connection Endpoints](https://auth0.com/docs/api/management/v2/connections/post-directory-provisioning)\n\n![Screenshot 2026-01-30 at 10.47.49 AM](//images.ctfassets.net/kbkgmx9upatd/2bVmoNFeDlZBTetDmgw1gy/fd8428b105883b223c54d880a935214b/Screenshot_2026-01-30_at_10.47.49â__AM.png)"
    },
    {
      "id": "3gORrQiUn2cmxZp3UPwRLN",
      "date": "2026-01-30",
      "displayDate": "January 30, 2026",
      "version": null,
      "type": "added",
      "title": "Self-Service Domain Verification for Organization Discovery now in Early Access!",
      "description": "We’ve integrated Organization Discovery by Domain into the Self-Service SSO workflow, eliminating manual backend configuration and providing a seamless login experience for your enterprise users.\n\n__Zero-Touch Discovery__ \nPreviously, verifying a domain only configured the SSO connection. Now, when a ticket is scoped to a single Organization, verified domains are automatically synced to the Organization record. This enables [Organization Domain Discovery](https://auth0.com/docs/manage-users/organizations/login-flows-for-organizations#organization-domain-discovery-optional \"Organization Domain Discovery\") instantly, allowing end-users to log in with just their email address.\n\n__Key Enhancements:__\n\n- Verify One, Apply Everywhere: Verified domains are added to both the Connection and the Organization simultaneously.\n- Domain Association: If a domain was previously verified for an Organization, customers can now simply associate it with a new connection, skipping repeat DNS TXT steps.\n- Deterministic Routing: By gating this to a 1:1 mapping, we ensure users are routed to the correct IdP every time.\n\nLearn more about Self-Service SSO in the [product documentation](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO \"product documentation\").\n\nBy using Self-Service SSO Domain Verification for Organization Discovery by Domain, you agree to the applicable Free Trial terms in Okta’s Master Subscription Agreement and Okta’s Privacy Policy during use of the Early Access feature. The Free Trial terms can be found within the Master Subscription Agreement at [https://www.okta.com/agreements](https://www.okta.com/agreements \"https://www.okta.com/agreements\")."
    },
    {
      "id": "2FC37fwfuoG9VdrUyt74jt",
      "date": "2026-01-30",
      "displayDate": "January 30, 2026",
      "version": null,
      "type": "added",
      "title": "Roles for the Auth0 FGA Dashboard",
      "description": "We are excited to release the __Per-Member Authorization__ feature that introduces __roles__ to the FGA Dashboard! This allows you to grant appropriate levels of access based on users’ needs.\n\nWe are enhancing the permission model from a single admin to __Groups__ that can be assigned roles. Groups are an organizational container for managing permissions and offer convenience when assigning roles to multiple users at once.\n\n- __New Roles__: We are introducing three new granular roles to sit alongside the previous admin role (now renamed __Account Owner__):\n  - __Group Manager__: An account-level role for managing teams without accessing FGA stores directly.\n  - __Store Editor__: A store-level role that can modify models and tuples but cannot manage groups.\n  - __Store Viewer__: A read-only role useful for ops teams or sales engineers who need visibility without the ability to impact systems.\n- __Groups__: Account Owners or Group Managers can create groups (ex., \"IT Group\" or \"Dev Team\") and assign members to them. All members automatically inherit the permissions defined at the group level.\n- __Scoping__: Crucially, these roles can be scoped to specific stores. For example, this allows a single user, to be an Editor for a \"Staging\" store but restricted to Viewer for a \"Production\" store.\n\nFor more details, refer to Auth0 FGA Dashboard’s [Roles](https://docs.fga.dev/dashboard/roles) documentation.\n"
    },
    {
      "id": "3WMgdBcHEtaUv3ITFGRvX1",
      "date": "2026-01-28",
      "displayDate": "January 28, 2026",
      "version": null,
      "type": "added",
      "title": "Universal Custom Password Hash for Bulk Import - Now in Limited Early Access!",
      "description": "We’re excited to introduce __Universal Custom Password Hash__ in Limited Early Access (EA), enabling user migrations into Auth0 without disrupting sign-ins - even when your existing system uses custom or legacy password formats.\n\nWith __Universal Custom Password Hash__ you can bring existing users over through [Bulk Import](https://auth0.com/docs/manage-users/user-migration/bulk-user-imports) and use [Auth0 Actions](https://auth0.com/docs/customize/actions) to script custom password validation logic for your environment so users can continue signing in with their current credentials.\n\n__Key Capabilities:__\n- __Support for custom password formats during migration__: Migrate users from legacy and proprietary systems while maintaining the existing sign-in experience. \n- __Custom validation logic with Auth0 Actions__: Write and deploy password validation logic that matches your current security architecture using Actions.\n- __Seamless end-user experience__: Users continue to sign in as usual - less password resets and less support tickets means reduced rollout friction.\n- __Built for enterprise migrations__: Designed for complex environments where password handling varies across regionals, applications, or historical platforms. \n\n__Why It Matters:__\n- Accelerate migrations by reducing friction and avoiding user disruption.\n- Lower helpdesk load by minimizing password reset spikes during cutover.\n- Increase confidence in large-scale rollouts with flexible support for legacy password formats.\n\n__How to Join EA:__\nUniversal Custom Password Hash is available through Limited Early Access enrollment. To request access and supporting documentation, contact your Auth0 Account Team and complete the Limited EA Terms & Conditions process. \n"
    },
    {
      "id": "6JOR803jeYagZmFxNkpcPs",
      "date": "2026-01-21",
      "displayDate": "January 21, 2026",
      "version": null,
      "type": "deprecated",
      "title": "Legacy Management of Connection's Enabled Clients",
      "description": "The `enabled_clients` field, within the connection object, is deprecated in the following scenarios:\n\n* [Retrieving multiple connections](https://auth0.com/docs/api/management/v2/connections/get-connections) using (GET - `/api/v2/connections`).\n* [Retrieving a connection](https://auth0.com/docs/api/management/v2/connections/get-connections-by-id) using (GET - `/api/v2/connections/{id}`).\n* [Updating a connection](https://auth0.com/docs/api/management/v2/connections/patch-connections-by-id) using (PATCH - `/api/v2/connections/{id}`).\n\nAs an alternative to the deprecated functionality, two new Management API endpoints are available:\n\n* [Get enabled clients for a connection](https://auth0.com/docs/api/management/v2/connections/get-connection-clients).\n* [Update enabled clients for a connection](https://auth0.com/docs/api/management/v2/connections/patch-clients).\n\nWe have provided additional information and timelines for enforcing this change across tenants through a dashboard and support center [notification](https://support.auth0.com/notifications/696687215149fab1c3f27f81). It is important to note that when creating a new connection via the (POST - `/api/v2/connections`) endpoint, the `enabled_clients` field remains supported.\n"
    },
    {
      "id": "WzmksMvHw7MYfW42pVsBb",
      "date": "2026-01-19",
      "displayDate": "January 19, 2026",
      "version": "v202537",
      "type": "updated",
      "title": "Ephemeral Sessions with Actions  - General Availability",
      "description": "As part of our Continuous Session Protection, you can now configure ephemeral (non-persistent) sessions using Actions. This allows enterprise customers to dynamically control whether a session is stored in a persistent cookie or only in memory.\n\nEphemeral sessions:\n\n*   Exist only in memory and are cleared when the browser or app is closed.\n*   Are ideal for high-sensitivity workflows such as step-up authentication or use on public devices.\n*   Can be configured per session using `api.session.setCookieMode(\"non-persistent\")` in post-login Actions.\n\nThis feature, previously in Early Access, is now in **General Availability** and available to all Enterprise tenants.\n\n**Learn more:**\n\n*   [Set Session Persistence with Actions](https://auth0.com/docs/manage-users/sessions/manage-sessions-actions#set-session-cookie-persistence-with-actions)\n*   [Session Lifecycle](https://auth0.com/docs/manage-users/sessions/session-lifecycle)\n*   [Use Ephemeral Sessions with Actions to configure Keep Me Signed In](https://auth0.com/docs/manage-users/sessions/configure-keep-me-signed-in-sessions)"
    },
    {
      "id": "1hynzVRKqrPmoeALKcx5US",
      "date": "2025-12-22",
      "displayDate": "December 22, 2025",
      "version": null,
      "type": "added",
      "title": "Auth0 Private Cloud Now Available on Azure 30x & 30x Burst Tiers",
      "description": "We are pleased to announce the expanded availability of __Auth0 Private Cloud on Microsoft Azure__, now supporting the __30x and 30x Burst__ performance tiers.\n\nThis update enables enterprise organizations to leverage high-scale, dedicated identity infrastructure while maintaining their commitment to the Azure ecosystem.\n\n__Performance at Scale__\n- __30x__ \n  - Sustained Capacity: 3,000 RPS\n  - Peak Burst Capacity: 3,000 RPS\n  - Best for: Consistent, high-volume baseline traffic\n- __30x Burst__ \n  - Sustained Capacity: 1,500 RPS\n  - Peak Burst Capacity: 3,000 RPS\n  - Best for: Variable traffic with high-intensity spikes\n\n__Why This Matters__\n- __Compliance & Residency__: Deploy to the Azure region of your choice to satisfy localized data residency and compliance needs at scale.\n- __Financial Strategy__: Burn down your existing Microsoft Azure Consumption Commitments (MACC) by investing in the market-leading identity platform.\n- __Operational Excellence__: Benefit from a fully managed, dedicated instance that provides you infrastructure isolation and flexibility as you grow.\n\n__Get Started__\n\nThese tiers are available immediately for new and existing customers. Please visit [Auth0 documentation](https://auth0.com/docs/deploy-monitor/deploy-private-cloud/private-cloud-on-azure#private-cloud-on-azure) for more info."
    },
    {
      "id": "Qu4slJXGZVsPh339UCCEE",
      "date": "2025-12-18",
      "displayDate": "December 18, 2025",
      "version": null,
      "type": "added",
      "title": "Security Center: Unleash Deeper Insights with New Filtering & Pre-defined Groupings",
      "description": "We're excited to announce a significant update to the Security Center, marking the first major enhancement since last year's introduction of Thresholds and Alerts! These new capabilities drastically improve your ability to monitor, analyze, and respond to security threats with greater precision and speed.\n\n__What's New__:\n- __Granular Filtering by Applications and Connections__: You can now filter security metrics within the Overview and Threat Monitoring pages by specific applications and connections. This allows for a more detailed examination of your tenant traffic, enabling faster incident triage and more effective troubleshooting by visualizing subsets of data.\n- __Deeper Insights into Top Threat Behaviors__: We've introduced new charts to highlight the top 5 connections and IPs associated with various security metrics. These groupings provide quick insights into potential anomalies and common threat behaviors, empowering you to identify and address risks more efficiently.\n- __Consolidated Threat Monitoring View__: The Threat Monitoring page has been revamped to offer a more intuitive and unified experience. This updated view, combined with the new filtering options by application and connection, streamlines your ability to track and respond to threats effectively.\n\nThese enhancements are available on all public cloud envirovments and gradually rolling out to private cloud environments.\n\nExplore the updated [Security Center](https://auth0.com/docs/secure/security-center) today to take control of your security insights and strengthen your security posture!\n"
    },
    {
      "id": "4lhB2wvkmckLOncrc71BJr",
      "date": "2025-12-18",
      "displayDate": "December 18, 2025",
      "version": "v202551",
      "type": "updated",
      "title": "Custom Token Exchange now available in Open Early Access",
      "description": "We’re excited to announce the __Open Early Access (EA) of Custom Token Exchange__. OAuth 2.0 Token Exchange allows to trade one security token for another (typically an Access Token). With Custom Token Exchange, you can __run Auth0 Actions as part of that exchange__, giving you a flexible way to inject custom logic and implement your own authentication and authorization semantics. This lets you validate and authorize the request, and precisely set the user for every token exchange transaction.\n\nKey highlights of this release:\n- Automatic Entitlement: The feature is now __automatically available to all Enterprise and B2B Pro customers__ to be used for testing and __production__ (no manual enablement required).\n- __Organizations Support__: Full compatibility with Organizations. You can now pass the `organization` parameter in the request or use the new `setOrganization` function within your Action.\n- Enhanced Security: Includes __Multi-Factor Authentication (MFA) support__ during the exchange.\n\n![CTE-Orgs-sample-code.png](https://cdn.auth0.com/blog/CTE-Orgs-sample-code.png)\n\nTo learn more, read the [reference documentation](https://auth0.com/docs/authenticate/custom-token-exchange)."
    },
    {
      "id": "6M0qaJ4knbbaUK9QdVLH7N",
      "date": "2025-12-17",
      "displayDate": "December 17, 2025",
      "version": "v202550",
      "type": "updated",
      "title": "MyAccount API Explorer Experience Updated",
      "description": "The MyAccount API Explorer now has an updated experience! Using MyAccount API, customers can build self-service management experiences at scale, powered directly from their applications.\n\nTo learn more about the MyAccount API feature, [click here](https://auth0.com/docs/manage-users/my-account-api).\n\nThe improved MyAccount API Explorer experience includes:\n- modernization of the look & feel\n- interactivity between the response schema and response example\n- full endpoint URL readily available to copy\n- ability to quickly navigate to other API Explorers \n\nNavigate to: https://auth0.com/docs/api/myaccount to try it out!"
    },
    {
      "id": "5efx3H1Sj4jmt2Ecjbrua9",
      "date": "2025-12-17",
      "displayDate": "December 17, 2025",
      "version": "v202546",
      "type": "added",
      "title": "Forms - Flows Auth0 Send Email Action",
      "description": "We’re excited to announce that we added __Flows Auth0 Send Email Action__!\n\nThis new feature allows you to send emails from Flows using the customized Email Provider at your Auth0 Tenant.\n\n![auth0-notifications-send-email-preview](//images.ctfassets.net/kbkgmx9upatd/2S9f31dj0Zc9wain4LDBWu/868ef042c9f74542eecf9915243787d1/Changelog.svg)\n\nWhat's new:\n- __Email Providers:__ take advantage of the [supported email providers](https://auth0.com/docs/customize/email/smtp-email-providers) that can be configured at your Auth0 Tenant.\n- __Custom Email Provider:__ write custom code to send your emails to unsupported email providers using the [Custom Email Provider Action](https://auth0.com/docs/customize/email/configure-a-custom-email-provider).\n- __Custom Properties:__ customize the [settings](https://auth0.com/docs/customize/forms/flows/integrations/auth0#input-settings-5) for the outgoing emails including sender, recipient, subject, message, and variables.\n- __Liquid Syntax:__ use [Liquid syntax](https://auth0.com/docs/customize/email/email-templates/use-liquid-syntax-in-email-templates) at your email subject and message.\n"
    },
    {
      "id": "71HvvdfH0QUOTJB9ZzrpLc",
      "date": "2025-12-15",
      "displayDate": "December 15, 2025",
      "version": null,
      "type": "deprecated",
      "title": "Deprecation of Weak TLS 1.2 Cipher Suites",
      "description": "To ensure the highest security standards for your identity infrastructure, we are retiring specific weak TLS 1.2 cipher suites. This change affects all connections to Auth0 service endpoints and web applications, specifically:\n- __Tenant Domains__: All default (e.g., [tenant].auth0.com) and Custom Domains for both Public and Private Cloud.\n- __Auth0 Tools__: The Dashboard (manage.auth0.com), Marketplace, and Support Center.\n- __Infrastructure__: The Auth0 CDN.\n\n__Cipher Suites Scheduled for Removal__: The following ciphers are being deprecated. For cross-reference, we have provided the unique Hex Code, IANA name, and a link to the OpenSSL equivalent.\n\n* `0xC0,0x09` - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA (https://ciphersuite.info/cs/TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA/)\n* `0xC0,0x0A` - TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA (https://ciphersuite.info/cs/TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA/)\n* `0xC0,0x23` - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256 (https://ciphersuite.info/cs/TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256/)\n* `0xC0,0x24` - TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384 (https://ciphersuite.info/cs/TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384/)\n* `0xC0,0x13` - TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA https://ciphersuite.info/cs/TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA/)\n* `0xC0,0x14` - TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA (https://ciphersuite.info/cs/TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA/)\n* `0xC0,0x27` - TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 (https://ciphersuite.info/cs/TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256/)\n* `0xC0,0x28` - TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 (https://ciphersuite.info/cs/TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384/)\n* `0x00,0x9C` - TLS_RSA_WITH_AES_128_GCM_SHA256 (https://ciphersuite.info/cs/TLS_RSA_WITH_AES_128_GCM_SHA256/)\n* `0x00,0x2F` - TLS_RSA_WITH_AES_128_CBC_SHA (https://ciphersuite.info/cs/TLS_RSA_WITH_AES_128_CBC_SHA/)\n* `0x00,0x9D` - TLS_RSA_WITH_AES_256_GCM_SHA384 (https://ciphersuite.info/cs/TLS_RSA_WITH_AES_256_GCM_SHA384/)\n* `0x00,0x35` - TLS_RSA_WITH_AES_256_CBC_SHA (https://ciphersuite.info/cs/TLS_RSA_WITH_AES_256_CBC_SHA/)\n* `0x00,0x3C` - TLS_RSA_WITH_AES_128_CBC_SHA256 (https://ciphersuite.info/cs/TLS_RSA_WITH_AES_128_CBC_SHA256/)\n* `0x00,0x3D` - TLS_RSA_WITH_AES_256_CBC_SHA256 (https://ciphersuite.info/cs/TLS_RSA_WITH_AES_256_CBC_SHA256/)\n\nAdditional information is available through the Auth0 dashboard and Support Center [notification](https://support.auth0.com/notifications/6939a866455870ad4537976d). "
    },
    {
      "id": "5pjJwHzDjb3Dp91OVbSnlS",
      "date": "2025-12-12",
      "displayDate": "December 12, 2025",
      "version": "v202549",
      "type": "updated",
      "title": "Advanced Customizations for Universal Login has reached General Availability",
      "description": "We are excited to announce that __Advanced Customizations for Universal Login (ACUL)__ is now generally available. ACUL enables developers to create custom, client-rendered user interfaces for Universal Login using their preferred frontend technologies.\n\n__Key capabilities in this release:__\n* __Full Screen Parity:__ Support for customizing all Universal Login screens and flows, including Login, Signup, MFA, Password Reset, and more.\n* __New SDKs:__ Production-ready __React__ and __TypeScript__ SDKs to accelerate development.\n  * NPM: [@auth0/auth0-acul-js](https://www.npmjs.com/package/@auth0/auth0-acul-js) | [@auth0/auth0-acul-react](https://www.npmjs.com/package/@auth0/auth0-acul-react)\n  * GitHub: [auth0-acul-js](https://github.com/auth0/universal-login/releases/tag/auth0-acul-js-v1.1.0) | [auth0-acul-react](https://github.com/auth0/universal-login/releases/tag/auth0-acul-react-v1.1.0)\n* __Visual Editor:__ A new Dashboard UI for managing screen configurations and assets.\n* __Improved Developer Tooling:__ Major updates to  Auth0 CLI to support scaffolding (auth0 acul init), local mocking, testing, and CI/CD deployments.\n* __Production-Ready Sample App:__ A robust sample repository featuring implementations of 34 authentication screens built with React 19 and Tailwind 4.\n\nACUL allows you to leverage all the security benefits of Universal Login, such as bot protection and threat intelligence, while providing complete control over the visual presentation and user journey.\n\n[Read the Documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations)"
    },
    {
      "id": "7oAdYxc0jsCVdQHqDBQ13R",
      "date": "2025-12-10",
      "displayDate": "December 10, 2025",
      "version": "v202544",
      "type": "added",
      "title": "Requesting App for Cross App Access (XAA) is now available in Beta.",
      "description": "This new Token Vault capability allows Client Applications to obtain access tokens from third-party APIs (resource servers), through an authorization flow that is coordinated by a common Identity Provider implementing the [Identity Assertion Authorisation Grant](https://datatracker.ietf.org/doc/draft-ietf-oauth-identity-assertion-authz-grant/) standard. This new standard enables requesting applications such as AI Agents to obtain access tokens where user consent is managed by policy at the Identity Provider.\n\nTo evaluate the Requesting App for Cross App Access, please contact Auth0. For more details, see the [product documentation](https://auth0.com/docs/secure/call-apis-on-users-behalf/xaa)."
    },
    {
      "id": "14aKLOPk3BgCLwFuyG9fsp",
      "date": "2025-12-10",
      "displayDate": "December 10, 2025",
      "version": "v202550",
      "type": "added",
      "title": "Google Workspace User Directory Sync - Now in Early Access",
      "description": "We’re excited to announce that Google Workspace User Directory Sync is now available in Limited Early Access (EA) with major enhancements to configuration, usability, and performance.\n\nThis feature automatically synchronizes users from your Google Workspace directory into Auth0 - ensuring user profiles stay accurate and up to date without relying on login events.\n\n__What’s New in EA:__\n- __Management Dashboard Support:__ You can now enable and configure Google Workspace Directory Sync directly from the Auth0 Management Dashboard. \n- __Integrated with Self-Service SSO:__ We’ve expanded the Self-Service SSO Provisioning flow to include Google Workspace Directory Sync alongside SCIM. Your customers’ IT teams can now configure SSO, SCIM provisioning, and Google Workspace Directory Sync through a unified setup flow, and manage user onboarding/offboarding directly, with less manual work for you.  \n- __Performance Improvements:__ Backend optimizations reduce sync latency and ensure stable performance under high load.\n\n__Why It Matters:__\n- Eliminates reliance on user login events for updating user data in Auth0\n- Reduces identity drift and accelerates user lifecycle management\n- Delegates Directory Sync setup to your customers’ IT administrators. \n\n__How to Join EA:__\nTo join the Limited EA program and access Google Workspace User Directory Sync, complete the [EA Terms & Conditions form](https://forms.gle/evWKYGQeML9b7zSs9) and contact your Auth0 Account Team to request activation and supporting documentation. \n"
    },
    {
      "id": "T06vwxUfZAHLuFWYhR3AM",
      "date": "2025-12-05",
      "displayDate": "December 5, 2025",
      "version": null,
      "type": "added",
      "title": "Introducing the New ASP.NET Core API SDK ",
      "description": "We are excited to announce the release of __Auth0.Aspnetcore.Authentication.Api__, a new official SDK designed to streamline authentication and security for ASP.NET Core backend applications.\n\n__Key Benefits:__\n- __Supports .NET 8.0+__ and built for the modern \"middleware\" pattern. Developers can now secure an API with a single line: builder.Services.AddAuth0ApiAuthentication(...).\n- __Abstracts the complexity of JWT validation__. Developers no longer need to write fragile boilerplate code to check Audiences or Issuers. The SDK enforces security best practices out of the box.\n- __Supports DPoP__ with flexible enforcement modes (Allowed, Required, Disabled). Enterprise customers can now enforce a higher level of security with minimal code changes.\n\n__Getting Started:__\n- [Quickstart](https://auth0.com/docs/quickstart/backend/aspnet-core-webapi)\n- [Official Repo](https://github.com/auth0/aspnetcore-api)\n- [Examples](https://github.com/auth0/aspnetcore-api/blob/master/EXAMPLES.md)"
    },
    {
      "id": "13WwjMh6BIBKhKU4GsbFBu",
      "date": "2025-12-04",
      "displayDate": "December 4, 2025",
      "version": null,
      "type": "added",
      "title": "Adaptive MFA: Customizable Device Remembrance",
      "description": "**Adaptive MFA** now allows administrators to configure **device remembrance durations (TTL)** for the **New Device assessor**. The **default remains at 30 days**, but can now be customized to any value between **1–365 days**.  \n\nWhen users log in successfully on a remembered device, that device’s TTL automatically refreshes to the currently configured value. \n\nThis enhancement provides greater flexibility to balance **security and user convenience**, helping teams align device remembrance with organizational policies and login patterns.  \n\nConfiguration is available through both the **Dashboard** and the **new Adaptive MFA Management API endpoints**, enabling automated setup and management of device remembrance. \n\nLearn more about configuration options in our [Adaptive MFA documentation](https://auth0.com/docs/secure/multi-factor-authentication/adaptive-mfa/enable-adaptive-mfa#enable-adaptive-mfa).  \nFor details on the new Adaptive MFA Management API endpoints, visit the [Risk Assessment API documentation](https://auth0.com/docs/api/management/v2/risk-assessments/get-risk-assessments-settings).\n"
    },
    {
      "id": "4mra6BpFrAGNhNAc4jdPHK",
      "date": "2025-11-24",
      "displayDate": "November 24, 2025",
      "version": null,
      "type": "added",
      "title": "Express Configuration is now Generally Available for Auth0 SaaS apps in the Okta Integration Network",
      "description": "We’re pleased to announce that Express Configuration with Okta is now generally available for Auth0 applications in the [Okta Integration Network](https://www.okta.com/integrations/)!\n\nExpress Configuration automates how your enterprise customers using Okta set up identity integrations with your Auth0 application. This includes configuring OpenID Connect (OIDC) for single sign-on, System for Cross-domain Identity Management (SCIM) for automated user onboarding and offboarding, and Global Token Revocation (GTR) for centralized session management with Universal Logout.\n\nTo learn more about Express Configuration with Okta, click [here](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta/express-configuration).\n\nThis feature is available immediately in all public cloud environments, and will be rolled out to private cloud environments as per their release pipeline."
    },
    {
      "id": "4Q5cGgm4BEO4yaUyRs6ndj",
      "date": "2025-11-20",
      "displayDate": "November 20, 2025",
      "version": "v202547",
      "type": "added",
      "title": "Auth0 for AI Agents is generally available.",
      "description": "We are thrilled to announce a major milestone: the General Availability (GA) of **Auth0 for AI Agents!**\n\n[Auth0 for AI Agents](https://auth0.com/ai) is a suite of features to empower developers to build secure agentic applications and experiences. The solution suite includes updates to: **Token Vault** for secure token based access to third-party APIs and applications; and **Asynchronous Authorization** for user approvals to keep the human in the loop for sensitive agent actions.\n\nHere are some highlights of the latest updates to the solution suite:\n- A new connected accounts flow (with connection purpose) to easily establish federated connections, initiated by client applications.\n- Support for Microsoft Entra (Azure AD) and Google Workspace as enterprise connected accounts.\n- Support exchanging a first-party access token for a third-party access token at the Token Vault.\n- Send notifications for asynchronous authorization flows using email or the Guardian App, with client initiated backchannel authentication (CIBA).\n- Revamped Quickstarts and SDKs to delight developers.\n- Pricing and packaging for Essential, Professional, and Enterprise plans.\n\nYou can read more about the solution suite and the component features in the [Auth0 for AI documentation](https://auth0.com/ai/docs)."
    },
    {
      "id": "2MLI247jm7qFZrxNSAJJMf",
      "date": "2025-11-18",
      "displayDate": "November 18, 2025",
      "version": null,
      "type": "added",
      "title": "Auth for MCP: Now in Early Access",
      "description": "Auth0 is thrilled to announce that __Auth for MCP__ is officially in Early Access! This release extends the power of Auth0’s standards-based authorization platform to the Model Context Protocol (MCP), securing your MCP servers, MCP clients, AI agents and the APIs they interact with.\n\nWith Auth for MCP, Auth0 integrates OAuth 2.1 and OpenID Connect directly into the MCP ecosystem, ensuring consistent access control and auditability across every agentic interaction.\n\nKey capabilities include:\n\n- MCP Server Authorization: Protect your MCP Servers by leveraging Auth0’s Universal Login to authorize access. You can leverage social, enterprise, and custom identity providers with full support for MFA and advanced attack protection.\n\n- Standards-based discovery and registration: Allow MCP clients and servers to automatically discover authorization endpoints and dynamically register with Auth0. This removes manual setup and ensures consistent configuration across your environment.\n\n- Leveraging your Existing APIs: Enable MCP clients to securely call internal APIs on behalf of users using short-lived, purpose-scoped tokens.\n\n- Connecting to Third party APIs using Token Vault: Securely store, refresh, and revoke access tokens for third-party APIs. This lets your MCP applications act on behalf of users across external SaaS systems like Google, Microsoft, GitHub, and more.\n\n- Developer-ready integration: Explore quickstarts, guides, and sample apps to easily implement Auth for MCP. Auth0 provides ready-to-use examples for securing your MCP server, calling APIs on users’ behalf, and using the Token Vault with JavaScript or Python SDKs.\n\n- MCP Spec Compliance: Works with Auth0’s Resource Parameter Compatibility Profile and token dialect rfc9068_profile_authz, ensuring that access tokens include the permissions claim required for authorization in MCP. \n\nThis Early Access release allows developers to unify authorization across MCP clients, servers, and tools, improving governance of agent actions.\n\nAuth for MCP is available today in Early Access. To participate, please submit the [Early Access Form](https://docs.google.com/forms/d/e/1FAIpQLSferoMH9K1ZasfOqXVByCwwKoL4qOidCIdOtpHXMzUcUibGOQ/viewform) and/or contact your Auth0 Technical Account Manager.\n\nFor setup instructions, SDKs, and sample applications, and more, visit the [Auth for MCP documentation](https://auth0.com/ai/docs/mcp/intro/overview)."
    },
    {
      "id": "1rIcvUQxpYkR8Le0zW9yo7",
      "date": "2025-11-18",
      "displayDate": "November 18, 2025",
      "version": null,
      "type": "updated",
      "title": "Security Center Threat Behavior Metrics Update",
      "description": "We’ve refined the logic behind how Security Center metrics are calculated to provide more accurate and actionable insights.\n\nMetrics now reflect IP activity using the following logic:\n\nWhen an IP address triggers more than 10 relevant events for a given metric within a single hour, it will now be counted toward that metric.\n\nThis update ensures greater consistency and reliability across event-based metrics within the Security Center.\n\nFor more details on which metrics are affected and their updated definitions, see the [Security Center Metrics documentation](https://auth0.com/docs/secure/security-center/metrics)"
    },
    {
      "id": "KNla4yWuL2eEHiYX60swb",
      "date": "2025-11-13",
      "displayDate": "November 13, 2025",
      "version": "v202546",
      "type": "added",
      "title": "Exciting Enhancements Now Live in Multiple Custom Domains (MCD) Early Access",
      "description": "We are thrilled to announce a significant expansion of capabilities within the Multiple Custom Domains (MCD) Early Access program for Enterprise customers.\n\nThis update delivers powerful branding and white-labeling capabilities with improved flexibility to scale your identity solution from a single Auth0 tenant.\n\n- Search and filter custom domains via Management APIs and Dashboard to simplify administration.\n- Pixel-perfect branding using ACUL to associate unique asset bundles directly with individual custom domains.\n- Ensure brand consistency by customizing Email and Phone Templates based on the custom domain context.\n- Build tailored, conditional logic using the custom domain name and metadata directly within Actions.\n\nPlease refer to Auth0 docs for details - [Multiple Custom Domains](https://auth0.com/docs/customize/custom-domains/multiple-custom-domains).\n\nThese updates are available automatically to the current participants in MCD Early Access program. If you're interested in joining the MCD Early Access program, please send a request through the [Auth0 Support Center](https://support.auth0.com/center/s/) and contact your Technical Account Manager (TAM) or Auth0 Sales Executive."
    },
    {
      "id": "4IIvynXfhRzUq01YELrRg4",
      "date": "2025-11-12",
      "displayDate": "November 12, 2025",
      "version": "v202545",
      "type": "added",
      "title": "New Management API endpoints to configure Bot Detection settings",
      "description": "Auth0 now provides Management API endpoints to manage Bot Detection configuration!\n\n__Key Capabilities:__\n\n__Bot Detection Controls:__ Automate adjustments to the Bot Detection Level (low, medium, or high) and manage your trusted IP AllowList via API.\n\n__Challenge Policies:__ Programmatically control CAPTCHA enforcement for password, passwordless, and password reset flows (options: always, when risky, or never).\n\n__CAPTCHA Management:__ Fully manage your CAPTCHA provider selection and configuration, including Auth0’s native challenge or third-party solutions.\n\nTo learn more about the new Bot Detection API endpoints check out our online documentation [here](https://auth0.com/docs/api/management/v2/attack-protection/get-bot-detection)\n"
    },
    {
      "id": "3c5qVcNRPE30dQBH9rqG5C",
      "date": "2025-11-12",
      "displayDate": "November 12, 2025",
      "version": null,
      "type": "added",
      "title": "New Dynamic Client Registration (DCR) Scope Added to Tenant ACL",
      "description": "Auth0 has added a __Dynamic Client Registration (DCR)__ scope to the __Tenant Access Control List (ACL)__. \n\nThis enhancement allows administrators to control access to the /oidc/register endpoint based on a variety of network and client signals, helping prevent unauthorized or automated client creation. \n\nConfiguration is available via the __Management API__.\n\nLearn more about our __Tenant Access Control List__ in our online documentation found [here](\"https://auth0.com/docs/secure/tenant-access-control-list\") "
    },
    {
      "id": "1g7Si9zf4VnEOC3Na7zxGR",
      "date": "2025-11-12",
      "displayDate": "November 12, 2025",
      "version": null,
      "type": "added",
      "title": "Actions - TypeScript Definitions in NPM",
      "description": "We are excited to announce that __Actions Types__ is now available at [__npmjs @auth0/actions__](https://www.npmjs.com/package/@auth0/actions \"Actions NPM package\").\n\nThis NPM library currently facilitates TypeScript definitions for Auth0 Actions. \n\nDevelopers can use this library for:\n- __IDE / Code Editor Assistance:__ By referencing this library, IDEs and code editors can help developers coding with autocompletion, object and functions definitions, and error checking.\n- __TypeScript Development:__ This library enables Actions development using TypeScript which then can be built and deployed to Actions as Common JS.\n- __Unit Testing Improvements:__ This library allows developers to follow best practices and to improve their Unit Testing based on TypeScript definitions.\n- __AI Actions Generation:__ Gives AI assisted IDEs the context they need to generate more accurate and secure Actions code.\n\n**Docs:** Learn more at [Actions NPM Docs](https://auth0.com/docs/customize/actions/actions-npm \"Actions Types Docs\") and [Actions Unit Test Docs](https://auth0.com/docs/customize/actions/actions-unit-test \"Actions Unit Test Docs\")."
    },
    {
      "id": "4Nd7A8REfdfFDRaJatKrOF",
      "date": "2025-11-07",
      "displayDate": "November 7, 2025",
      "version": "v202544",
      "type": "added",
      "title": "Add Session Metadata to Auth0 Sessions",
      "description": "As part of Continuous Session Protection, you can now attach custom key–value data to a user’s session using Actions or the Auth0 Management API. This allows enterprise customers to persist contextual data (such as device name, organization ID, or custom flags) throughout the session lifecycle.\n\n**Session Metadata:**\n\nEnables storing and retrieving custom metadata directly within Auth0 sessions\n\nCan be set in Post-Login Actions using `api.session.setMetadata(key, value)` and accessed through `event.session.metadata`\n\nIs available via the Management API for reading, updating, or evicting metadata during the session’s lifetime\n\nCan be automatically included in OIDC Back-Channel Logout tokens, enabling downstream systems to receive the same metadata context\n\nThis feature expands session extensibility, allowing richer integrations, stronger audit trails, and personalized session behavior across applications.\n\n**Availability:**\n\nSession Metadata is available to Enterprise tenants in Early Access.\nTo enable this feature, reach out to your Technical Account Manager or open a Support Ticket.\n\nLearn more:\n[Session Metadata Documentation](https://auth0.com/docs/manage-users/sessions/session-metadata)\n"
    },
    {
      "id": "plEKpbkUrXopryqGwRITI",
      "date": "2025-11-04",
      "displayDate": "November 4, 2025",
      "version": null,
      "type": "added",
      "title": "Google Workspace Inbound User Directory Sync Beta",
      "description": "We’re excited to introduce Google Workspace User Directory Sync, now available as part of our Beta program.\n\nThis feature allows organizations to automatically synchronize users from their Google Workspace directory into Auth0 - ensuring user data stays accurate and up to date without relying on login events.\n\n__What’s New:__\n- __Automated user synchronization:__ Automatically sync user profiles from your Google Workspace Enterprise connection into Auth0.\n- __Flexible sync cadence:__ Choose between manual on-demand syncs or automatic syncs that run every 30 minutes.\n- __Custom attribute mapping:__ Map Google Workspace user attributes to Auth0 user profile fields for full control over data consistency.\n- __Management API support:__ Configure, update, retrieve, or delete your Directory Sync settings programmatically - with Postman collection templates included.\n\n__Why It Matters:__\nThis enhancement eliminates the need for users to log in before their profiles are updated in Auth0, reducing data drift and simplifying identity lifecycle management.\n\n__How to Get Started:__\nTo join the Beta program and access Google Workspace User Directory Sync, complete the Beta Terms & Conditions [form](https://forms.gle/aargNxY1cwmsQv4z5) and contact your Auth0 Account Team to request activation and supporting documentation. "
    },
    {
      "id": "82DJ9Ae7NcArO8KVTfY1F",
      "date": "2025-11-03",
      "displayDate": "November 3, 2025",
      "version": "v202544",
      "type": "deprecated",
      "title": "Prompt for Organization Name Without SSO",
      "description": "Login flows initiated in the context of client applications associated with business users (`organization_usage=require`) and configured to prompt for the organization at the start of the login flow (`organization_require_behavior=pre_login_prompt`) will consider an existing authenticated session and allow single sign-on (SSO).\n\nThe previous behavior where these flows disregarded SSO is deprecated. We have provided additional information and timelines for enforcing this change across tenants through a dashboard and [support center notification](https://support.auth0.com/notifications/6904f0f1b6ffc7703507bccf)."
    },
    {
      "id": "70GXiAO3CNCFXFMoixP4H9",
      "date": "2025-11-03",
      "displayDate": "November 3, 2025",
      "version": null,
      "type": "added",
      "title": "New Private Cloud Region in Thailand",
      "description": "Auth0's Private Cloud footprint is expanding again, this time to the AWS Asia Pacific __Thailand Region!__\n\nThis launch plants our secure identity infrastructure in the heart of one of Southeast Asia's largest digital economies. Customers in the region can now leverage this new presence for significantly reduced latency and enhanced performance. It also provides a robust, in-country solution for organizations managing their data governance and sovereignty objectives. \n\nWe are excited to support the rapid growth of Thailand's booming e-commerce, fintech, and digital service sectors with this new deployment."
    },
    {
      "id": "BOjfz3jcAYdqAC2lDfhPi",
      "date": "2025-10-31",
      "displayDate": "October 31, 2025",
      "version": null,
      "type": "added",
      "title": "Ignore Duplicate Writes and Missing Deletes in Auth0 FGA",
      "description": "We've enhanced the [Auth0 FGA Write API](https://docs.fga.dev/api/service#/Relationship%20Tuples/Write) endpoint to help streamline imports and reduce errors. You can now use two new optional parameters:\n\n`on_duplicate: \"ignore\"`: This will gracefully skip any write operations for relationship tuples that already exist.\n\n`on_missing: \"ignore\"`: This will gracefully skip any delete operations for relationship tuples that do not exist.\n\nPreviously, these common conditions would cause the entire Write request to fail. These new parameters prevent unnecessary failures, eliminating the need for complex client-side retry logic and improving import performance.\n\nThis feature is available now via the API and our latest SDKs.\n\nLearn more about [Writing Tuples in FGA](https://docs.fga.dev/integration/update-tuples#05-ignoring-duplicate-or-missing-tuples) from our product documentation or [API Reference](https://docs.fga.dev/api/service#/Relationship%20Tuples/Write)."
    },
    {
      "id": "7jDniG64OodylRHrA3YCVb",
      "date": "2025-10-31",
      "displayDate": "October 31, 2025",
      "version": "v202544",
      "type": "added",
      "title": "Organization Discovery by Domain now in Early Access!",
      "description": "We’re excited to announce __Organization Discovery by Domain__, a new capability that makes enterprise login smarter and more seamless. Together with __Prompt for Organizations__, it automatically identifies a user’s Organization before authentication, using either their email or organization name — eliminating the need for guessing, manual routing, or dealing with misspellings.\n\n__Smarter Login Experience__: Users can now enter either their organization name or work email on the __Prompt for Organization__ screen. If the Organization has a verified domain, Auth0 detects the Organization instantly, loads the correct branded login, and routes the user to the right IdP.\n\n__Verified Domains__: Tenant admins can now associate one or more verified domains with each Organization using the new Domains tab. Verified domains power automatic organization detection and ensure HRD (Home Realm Discovery) runs only against that Organization’s enabled connections.\n\n__Unified Enterprise Login Flow__: This update enhances the __Prompt for Organization__ experience for both __Business__ and __Both__ (Business + Individual) *app types*, unifying login flows across personal and enterprise users.\n\n__Availability__: Rollout is happening now. No opt-in required, it’s ready as soon as it appears in your tenant.\n\nLearn more about [Organization Discovery by Domain](https://auth0.com/docs/manage-users/organizations/create-first-organization#configure-organization-domains \"Organization Discovery by Domain\") in our product documentation.\n\nBy using Organization Discovery by Domain,  you agree to the applicable Free Trial terms in Okta’s Master Subscription Agreement and [Okta’s Privacy Policy](https://www.okta.com/privacy-policy/?_gl=1*skku8u*_gcl_aw*R0NMLjE3NjA0NTQ3MTkuQ2owS0NRanc2YmZIQmhETkFSSXNBSUdzcUxnSmhnX09rU2tuWmV1WFdPU3pMNTNIZXhDRDUxVlhEaVU2ZnZ2R3NPSlBiZlpGLWJaQ3N4OGFBbk13RUFMd193Y0I.*_gcl_au*MTI4ODcyNDQ5Ni4xNzU2ODQwNjA1*_ga*NDE0MDA3OTE4LjE3MDUwNzM0OTQ.*_ga_QKMSDV5369*czE3NjA3MDA5NzYkbzQ0MyRnMCR0MTc2MDcwMDk3NyRqNTkkbDAkaDA. \"Okta’s Privacy Policy\") during use of the Early Access feature. The Free Trial terms can be found within the Master Subscription Agreement at [Legal Agreements | Okta](https://www.okta.com/agreements?_gl=1*skku8u*_gcl_aw*R0NMLjE3NjA0NTQ3MTkuQ2owS0NRanc2YmZIQmhETkFSSXNBSUdzcUxnSmhnX09rU2tuWmV1WFdPU3pMNTNIZXhDRDUxVlhEaVU2ZnZ2R3NPSlBiZlpGLWJaQ3N4OGFBbk13RUFMd193Y0I.*_gcl_au*MTI4ODcyNDQ5Ni4xNzU2ODQwNjA1*_ga*NDE0MDA3OTE4LjE3MDUwNzM0OTQ.*_ga_QKMSDV5369*czE3NjA3MDA5NzYkbzQ0MyRnMCR0MTc2MDcwMDk3NyRqNTkkbDAkaDA. \"Legal Agreements | Okta\")."
    },
    {
      "id": "2ojmrILLb5p5UkkbJO8prj",
      "date": "2025-10-29",
      "displayDate": "October 29, 2025",
      "version": null,
      "type": "added",
      "title": "New Sign in with Shop Social Connection",
      "description": "Auth0 now supports Sign in with Shop, a new social login integration designed for Shopify merchants. This feature allows merchants to offer customers a familiar authentication option using their existing Shop accounts. This new integration provides:\n\n- Streamlined Experience: Customers can sign in using their existing Shop credentials, reducing friction and simplifying account access.\n- Consistent User Journey: Enables a unified sign-in experience for customers already accustomed to Shopify’s ecosystem.\n- Expanded Capabilities: Combines the trusted Shopify experience with Auth0’s advanced identity features — including enhanced security, single sign-on (SSO), customizable branding, and extensibility.\n\n![Login-Sign_in_with_shop](//images.ctfassets.net/kbkgmx9upatd/6lEdKbpW1FSQvvVmtgOWaN/13feb1fd060cffd344133d048dc88752/Screenshot_2025-10-29_at_4.05.19â__PM.png)\n\nGet started today with our [quick start guide to connect your Shopify store](https://auth0.com/blog/how-to-connect-auth0-with-shopify-a-tech-quick-start-guide/) to Auth0 and our built-in [Sign in with Shop social integration](https://marketplace.auth0.com/integrations/shop).\n"
    },
    {
      "id": "6lnnjamoMl4gbeypvZ4gsC",
      "date": "2025-10-28",
      "displayDate": "October 28, 2025",
      "version": null,
      "type": "updated",
      "title": "Enhanced Signup Bot Detection for Stronger Security and Seamless User Experience",
      "description": "We’ve improved our **machine learning (ML) model for signup** to deliver stronger protection against automated account creation while keeping friction low for legitimate users.\n\n> **Note:** This update applies **only to the signup flow**. There are **no changes** to the ML models used for bot detection in login or password reset flows.\n\n#### **Highlights of this update include**\n\n- **Expanded detection signals:**  \n  The model now leverages **user-agent–based signals**, such as operating system and browser version data, to more accurately distinguish between human and automated signup attempts.\n\n- **Smarter traffic classification:**  \n  An **updated labeling strategy** improves how the model differentiates between malicious and legitimate signup activity, helping it adapt more effectively to evolving attack patterns.\n\n- **Optimized sensitivity settings:**  \n  Adjusted detection thresholds capture a broader range of bot activity while maintaining a low false positive rate, ensuring a smooth experience for valid users.\n\n#### **What this means for you**\n\nThese enhancements strengthen the signup protection capabilities of **Attack Protection**, enabling more effective detection of automated signup attempts without adding unnecessary friction for real users.\n\nThe rollout is in progress for all **Enterprise customers with the Attack Protection add-on** and will complete over the coming weeks in line with individual release schedules.\n\nFor configuration guidance or to learn more about protecting your signup flows, please refer to our [documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or contact your account team.\n"
    },
    {
      "id": "3TMMeLK9t0STvL3QpAGitY",
      "date": "2025-10-28",
      "displayDate": "October 28, 2025",
      "version": "v202543",
      "type": "changed",
      "title": "Upcoming Changes when using Non-Verifiable Callback URIs",
      "description": "To enhance security and mitigate risks of application impersonation and phishing attacks, we are **recommending the transition to HTTPS-based callbacks using [Android App Links](https://developer.android.com/training/app-links#android-app-links) and [Apple Universal Links](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content) whenever possible**. In addition, we are introducing a **change in how the service handles custom URI schemes and loopback URI as callbacks**.\n\nMore specifically, for authentication requests specifying a custom URI scheme or a loopback URI as the callback, we are introducing a **login confirmation prompt** used in scenarios that would previously return a response without requiring user interaction. For example, in a single sign-on (SSO) scenario, if authentication request requirements can be satisfied from an existing authenticated session, the service will display the new login confirmation prompt instead of seamlessly returning a response to the specified custom URI scheme / loopback URI callback. \n\nAdditionally, authentication requests including `prompt=none` will be rejected when Applications use non-verifiable callback URIs and are configured to use the new login confirmation prompt.\n\n**Review the User Confirmation Prompt section of [Measures Against Application Impersonation](https://auth0.com/docs/secure/security-guidance/measures-against-app-impersonation) to learn more about the new prompt**.\n\nTenants created before **October 15, 2025**, maintain the previous behavior as the default until **April 28, 2026**. After the October cutoff date, newly created tenants may default to displaying the new login confirmation prompt with some exceptions due to each environment's deployment schedule. For any tenant maintaining the previous behavior, we recommend you opt in beforehand to use the new behavior. Alternatively, you can opt out of using the additional confirmation prompt if strictly required. Additional **information on this situation is available at [Migrate to Custom URI Scheme Redirect End-User Confirmation](https://auth0.com/docs/troubleshoot/product-lifecycle/deprecations-and-migrations/non-verifiable-callback-uri-end-user-confirmation)**.\n\n![Login Confirmation Prompt](https://cdn.auth0.com/blog/Login-confirmation-prompt.png)\n"
    },
    {
      "id": "7y92FX6iRNAareczm4R5Y3",
      "date": "2025-10-27",
      "displayDate": "October 27, 2025",
      "version": "v202541",
      "type": "added",
      "title": "Auth0 Events Catalog Explorer Now Available",
      "description": "As part of the [Early Access launch of Event Streams](https://auth0.com/changelog#4SmjmcbmVZgt1Zsn7JYF1V), there is now an Events Catalog explorer available in Auth0 Docs to better guide you on the details of each Event -- including examples. The Event Streams feature allows you to discover completed changes to Auth0 Users and Organizations as they happen. You can do this by:\n\n- Creating an Event Stream in the Manage Dashboard or the Management API\n- Configuring the Event Streams with the desired destination (Webhook or Amazon EventBridge) and selecting the events to receive\n\nView the new Event Catalog Explorer here: [https://auth0.com/docs/events/](https://auth0.com/docs/events/)\n\nLearn more about Event Streams here: [https://auth0.com/docs/customize/events](https://auth0.com/docs/customize/events)"
    },
    {
      "id": "7gWr2NaIsSpsQ5DHC8Hlic",
      "date": "2025-10-17",
      "displayDate": "October 17, 2025",
      "version": null,
      "type": "added",
      "title": "FGA Logging API Now Generally Available",
      "description": "__FGA Logging API Now Generally Available__\n\nThe Auth0 FGA Logging API is now Generally Available (GA). This dedicated endpoint provides a comprehensive audit trail for every interaction with the FGA system. You can now programmatically retrieve detailed logs for auditing, debugging, and monitoring.\n\n- __Strengthen Audit & Compliance__: Retrieve a complete audit trail for all public FGA APIs, including permission changes, access checks, and model updates, to verify who accessed resources and when.\n- __Accelerate Troubleshooting & Monitoring__: Gain granular insight into API operations to debug issues faster and proactively monitor for unusual activity. Use powerful Lucene query syntax to filter logs by user, IP address, status code, and more.\n- __Centralize Your Logs__: Easily export log data to your preferred SIEM, log management, or analytics tools to centralize your security and operational visibility.\n\nThe FGA Logging API is available for all paid-tier customers. For more information, please read the [Auth0 FGA Logging API documentation](https://docs.fga.dev/fga-logging)."
    },
    {
      "id": "7B59wWrQCnGXj1QHpO5qoF",
      "date": "2025-10-16",
      "displayDate": "October 16, 2025",
      "version": null,
      "type": "added",
      "title": "Auth0 Nuxt SDK Beta ",
      "description": "The first public beta of the Auth0 Nuxt SDK is now available for developers building web apps on the __Nuxt__ framework! \n\n### Key Highlights\n- __Idiomatic Nuxt 3 Experience:__ Simple, composable functions (useAuth0) that feel native to Nuxt developers, dramatically reducing time-to-first-login.\n- __Advanced Security Out-of-the-Box:__ We've included support for the latest security standards from day one, including PAR, RAR, and Backchannel Logout.\n- __Powerful API Authentication:__ Seamlessly obtain tokens for backend APIs using the TokenVault integration.\n\n### Resources\nHere are the helpful resources to explore the new Nuxt SDK and get started:\n- [Quickstart](https://auth0.mintlify.app/docs/quickstart/webapp/nuxt)\n- [Examples](https://github.com/auth0/auth0-nuxt/tree/main/examples)\n\nThis SDK is still in Beta and we need your feedback! Please share any feedback, questions or comments on [GitHub](https://github.com/auth0/auth0-nuxt)."
    },
    {
      "id": "m3EtR1dodzd1wUyGwN5gX",
      "date": "2025-10-10",
      "displayDate": "October 10, 2025",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Audience Validation for Private Key JWT Client Authentication",
      "description": "When validating [JWT assertions used for client application authentication](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authenticate-with-private-key-jwt), **Auth0 will impose stricter requirements and accept only a tenant's issuer identifier as a single JSON string value in the \"aud\" (audience) claim**.\n\nThe possibility of providing an \"aud\" claim with either one of the approaches listed below is deprecated, and at a future date will cause the service to consider such JWT assertions invalid:\n* A JSON array of strings, provided that one of the entries contains a valid issuer identifier or endpoint URL for the respective tenant and endpoint the client authenticates against.\n* A single JSON string representing a valid endpoint URL for the respective tenant and endpoint the client authenticates against.\n\nOIDC enterprise connections configured to use Private Key JWT in authenticated requests to the upstream identity provider will also be able to use the applicable issuer identifier represented as a JSON string in the \"aud\" claim included in JWT assertions.\n\nWe have provided additional information and timelines for enforcing this change across tenants through a dashboard and [support center notification](https://support.auth0.com/notifications/68e3e29a45f175778e64b020)."
    },
    {
      "id": "4YG7c1KgGcHBDKN5O198uP",
      "date": "2025-10-10",
      "displayDate": "October 10, 2025",
      "version": null,
      "type": "added",
      "title": "Easily Update Your Firewall with the New IP Allow List",
      "description": "We are excited to announce an improvement that makes it faster and easier for you to keep your firewall configurations up-to-date.\n\nOur __IP allow list for Auth0's Public Cloud regions__ is now available in a standardized, machine-readable format. This new format is designed to help you automate updates and ensure the most accurate configuration for your firewall.\n\nWhat this means for you:\n- __Automation__: You can now programmatically fetch and parse the list, eliminating the need for manual updates.\n- __Accuracy__: The structured data ensures you're always using the latest and most accurate IP addresses.\n- __Clarity__: The changelogs highlight specific additions and removals, so you can easily see what has been updated.\n\nYou can access this information at: [https://cdn.auth0.com/ip-ranges.json](https://cdn.auth0.com/ip-ranges.json)\n\nFor more details, please see our documentation on [IP allow list](https://auth0.com/docs/secure/security-guidance/data-security/allowlist)."
    },
    {
      "id": "2ldfQCyYglA30MXDtNXcn",
      "date": "2025-10-08",
      "displayDate": "October 8, 2025",
      "version": "v202540",
      "type": "added",
      "title": "Akamai Supplemental Signals is Now in Early Access",
      "description": "We’re excited to announce the Early Access release of **Akamai Supplemental Signals**. This feature allows **Auth0 Enterprise customers who have Akamai configured as a reverse proxy** in front of Auth0 to forward signals from [**Akamai Bot Manager**](https://www.akamai.com/products/bot-manager) and [**Akamai Account Protector**](https://www.akamai.com/products/account-protector) into Auth0.\n\nWith this integration, you can enrich your authentication flows with supplemental signals from Akamai and make more dynamic security decisions in post-login Actions and gain visibility through tenant logs.\n\n---\n\n### Key Benefits\n\n- **Combined Risk Context:** Leverage Akamai’s bot and user risk signals together with Auth0’s risk assessment for a more complete view of login risk.  \n\n- **Adaptive Security Controls:** Combine Akamai and Auth0 risk signals to trigger MFA, deny sessions, or revoke access based on risk indicators.  \n\n- **Seamless Integration:** Configure Akamai to forward signals and use them immediately in post-login Actions and tenant logs.  \n\n---\n\n### Availability\n\n- Available to all **Enterprise customers using Akamai as a reverse proxy** in front of Auth0.  \n\n- Currently in **Early Access**.  \n\n---\n\n### Learn More\n\n- [Configure Akamai as a Reverse Proxy](https://auth0.com/docs/customize/custom-domains/self-managed-certificates)  \n- [Configure Akamai to Send Supplemental Signals](https://auth0.com/docs/secure/attack-protection/configure-akamai-to-send-supplemental-signals)  \n- [Use Akamai Supplemental Signals in Actions](https://auth0.com/docs/secure/attack-protection/use-akamai-supplemental-signals-actions)\n"
    },
    {
      "id": "39RZCNYZg2waEwr5fLhd7d",
      "date": "2025-10-02",
      "displayDate": "October 2, 2025",
      "version": null,
      "type": "added",
      "title": "Additional Signing Algorithms for OIDC and Okta Enterprise Connections in Limited Early Access!",
      "description": "We’re thrilled to introduce the __Limited Early Access__ release of __Additional Signing Algorithm for Okta and OIDC enterprise connections__! This release expands flexibility for both __Private Key JWT client authentication__ and __ID token verification__ by adding support for stronger signing algorithms beyond RS256, including: \n- RS512\n- PS256\n- ES256\n\nFor Private Key JWT, Auth0 now lets you choose which algorithm is used to sign client assertion JWTs when authenticating requests to an upstream IdP. For ID token verification, Auth0 can validate tokens signed with a wider set of algorithms, ensuring compatibility across OIDC flows. Together, these enhancements give customers more control over cryptographic choices, making it easier to align with security policies and adapt as standards evolve\n\nThis release is currently rolling out to all environments. To enable the Additional Signing Algorithms Limited Early Access release in your Auth0 tenant once available in your environment, please contact your Technical Account Manager to request access."
    },
    {
      "id": "801RizzHxgyfsVczkHGNN",
      "date": "2025-10-01",
      "displayDate": "October 1, 2025",
      "version": "v202538",
      "type": "updated",
      "title": "Organizations Support for Native Passkeys",
      "description": "You can now use __Organizations with your native passkey flows__!  User sign-in and registration flows can now pass the organization to complete sign up in the organization context.  Like Universal Login flows, auto-enrollment into an organization during sign-in is also supported. \n\n__Organizations Support for Native Passkeys__ is in Limited EA - reach out to your Auth0 contact to get started today.\n\nTo get started with Passkey APIs and use them with Organizations, please see our [documentation](https://auth0.com/docs/native-passkeys-api) or read our [blog](https://auth0.com/blog/how-to-signup-and-login-with-passkeys-android/ \"How to Sign Up and Log In with Passkeys in Android Using Auth0's Native Login\") for getting started with native applications.\n"
    },
    {
      "id": "7lQuIF4vTPKsvn7RFUl3ZZ",
      "date": "2025-10-01",
      "displayDate": "October 1, 2025",
      "version": "v202538",
      "type": "updated",
      "title": "Native Passkey Management Now Available On MyAccount",
      "description": "We’re very excited to announce the availability of __Native Passkey Management__, extending the management of authentication methods using APIs.  Customers can now delete passkeys using APIs and list all enrolled authentication methods for a user.\n\nCustomers can build end-to-end management of the passkeys directly into their native applications. \n\n__Native Passkey Management__ is in Limited EA - reach out to your Auth0 contact to get started today.\n\nTo get started with MyAccount please read our [documentation](https://auth0.com/docs/manage-users/my-account-api \"MyAccount API\")"
    },
    {
      "id": "5plVH0sRpMqH1cNb4FBGOK",
      "date": "2025-10-01",
      "displayDate": "October 1, 2025",
      "version": null,
      "type": "updated",
      "title": "React Native SDK v5.0 (GA)",
      "description": "We are excited to announce the release of the __Auth0 React Native SDK v5__, a foundational rewrite designed to provide a best-in-class developer experience for one of the world's most popular mobile frameworks. This major update delivers a simpler, more powerful way to integrate secure authentication into your React Native applications while ensuring compatibility with the latest evolution of the ecosystem.\n\n__Highlights:__\n- __Stay on the Cutting Edge of React Native:__ Deploy with confidence knowing your authentication layer is ready for the future. The SDK is fully compatible with React 19 and Expo 53, and now includes Beta support for React Native's New Architecture (Turbo Modules). This allows you to leverage the latest performance and UI capabilities of the ecosystem without compromising on security.\n- __Accelerate Development with a Better DX:__ We've refactored the entire SDK from the ground up to create a more intuitive and efficient developer experience. With a simpler API surface, unified cross-platform error handling, and an Android layer rewritten in modern Kotlin, you can integrate Auth0 faster and spend less time debugging.\n- __Build for More Platforms with react-native-web:__ The new, robust architecture enables first-class support for react-native-web. Now you can share more of your authentication logic between your native mobile and web applications, streamlining development and ensuring a consistent user experience everywhere.\n\nGet Started Today. The Auth0 React Native SDK v5 is now generally available.\n\nAs a major version release, v5 includes breaking changes aimed at improving the long-term health and usability of the SDK. To upgrade, please consult our comprehensive [Migration Guide](https://github.com/auth0/react-native-auth0/blob/master/MIGRATION_GUIDE.md) to v5.\n\nFor a full list of new features, improvements, and breaking changes, view the complete release notes on [GitHub](https://github.com/auth0/react-native-auth0/releases/tag/v5.0.0)."
    },
    {
      "id": "3R5TLwcoC5ELeNg9vS0QL7",
      "date": "2025-10-01",
      "displayDate": "October 1, 2025",
      "version": "v202537",
      "type": "added",
      "title": "Ephemeral Sessions with Actions (Public EA)",
      "description": "As part of the Continuous Session Protection, you can now configure ephemeral (non-persistent) sessions using Actions. This allows enterprise customers to dynamically control whether a session is stored in a persistent cookie or only in memory.\n\nEphemeral sessions:\n- Exist only in memory and are cleared when the browser or app is closed\n- Are ideal for high-sensitivity workflows such as step-up authentication or use on public devices\n- Can be configured per session using `api.session.setCookieMode(\"non-persistent\")` in post-login Actions\n\nThis feature is available to all Enterprise tenants in Public Early Access and requires no enrolment.\n\nLearn more: https://auth0.com/docs/manage-users/sessions/sessions-with-actions#set-session-persistence-with-actions and https://auth0.com/docs/manage-users/sessions/session-lifecycle\n\n[Use Ephemeral Sessions with Actions to configure Keep Me Sign In](https://auth0.com/docs/manage-users/sessions/configure-keep-me-signed-in-sessions)\n"
    },
    {
      "id": "IoPz85GPXHERLRM0pvTOI",
      "date": "2025-09-30",
      "displayDate": "September 30, 2025",
      "version": "v202537",
      "type": "added",
      "title": "Cross App Access (XAA) for Resource Applications is now in Beta",
      "description": "We're excited to announce that __Cross App Access (XAA) for Resource Applications is now in Beta__. \n\n__Connecting AI Agents and Third Party Apps in an enterprise__ introduces two key challenges: poor IT visibility into data sharing and repetitive user consent flows. Cross App Access (XAA) solves this by __enabling IT teams to centralize control over these connections__, eliminating constant user consent prompts and providing better governance and visibility into data sharing.\n\nThis new feature provides __built-in support for SaaS providers to get their APIs ready for secure connection by AI Agents and other SaaS Apps in enterprise environments__. No code changes needed, simply configure the feature in your Auth0 tenant to instantly support central policy enforcement and a seamless user experience.\n\nThis Beta release is for testing purposes only. \n\nTo learn more, read our [documentation](https://auth0.com/docs/xaa-resource-app).\n\n![XAA-Resource-Apps-Beta](https://cdn.auth0.com/blog/XAA-Resource-Apps-Beta.png)"
    },
    {
      "id": "3n1TWpvmYiwv2bIX8Gif7t",
      "date": "2025-09-30",
      "displayDate": "September 30, 2025",
      "version": "v202540",
      "type": "added",
      "title": " Self-Service User Provisioning now in Early Access!",
      "description": "We’re excited to share that we've expanded the Self-Service SSO experience with __User Provisioning (SCIM)__. Now your customers’ IT teams can manage user onboarding and offboarding directly, reducing manual work for you. This feature is currently in __Early Access__.\n\n__Smarter Provisioning__: Your customers can now configure __SCIM directly in the Self-Service SSO wizard__, streamlining setup and reducing time-to-value.\n\n__Unified User Data__: This release introduces __User Attribute Profiles (UAP)__, a standardized way to map, normalize, and sync user attributes across identity protocols (SAML, OIDC, SCIM) and Auth0’s Self-Service SSO feature. This ensures consistent data handling across integrations and simplifies ongoing maintenance. Furthermore, when using UAP with the Self-Service Profile and Self-Service SSO, those mappings are now used to populate the Enterprise Connection Mapping object in Auth0.  \n\n__Key Benefits__\n- __Automation__: Delegate SCIM setup to your customers’ admins\n- __Interoperability__: Works seamlessly across varied IdPs\n- __Consistency__: One schema for easier debugging and support\n- __Flexibility__: Override mappings per protocol when needed\n\n![User Provisioning](//images.ctfassets.net/kbkgmx9upatd/1sLKLMX9mHZ3fwwnYVtM0p/bf92648b962e8ab7127231222020f59a/SS-SCIM.gif)\n\nRollout is happening now. No opt-in required, it’s ready as soon as it appears in your tenant.\n\nLearn more about [Self-Service](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO) and [User Attribute Profile](https://auth0.com/docs/authenticate/enterprise-connections/user-attribute-profile) in our product documentation.\n\nBy using Self-Service User Provisioning, you agree to the applicable Free Trial terms in Okta’s Master Subscription Agreement and [Okta’s Privacy Policy](https://www.okta.com/privacy-policy/) during use of the Early Access feature. The Free Trial terms can be found within the Master Subscription Agreement at [Legal Agreements | Okta](https://www.okta.com/agreements \"Legal Agreements | Okta\")."
    },
    {
      "id": "2kbzAyBitSREV8XEa0RdpC",
      "date": "2025-09-18",
      "displayDate": "September 18, 2025",
      "version": null,
      "type": "updated",
      "title": "Auth0 Support Center - Now Enhanced",
      "description": "A new and improved Auth0 Support Center is now live. The new Auth0 Support Center is re-designed to help you find answers faster and adopt features more confidently. \n\nHere’s what’s new:\n- Summarized solutions, fast: A single AI-powered search scans thousands of support resources, and learning content, and delivers a single answer tailored for you.\n- Unblock faster, stay ahead: The new [Knowledge Base](https://support.auth0.com/center/s/knowledge) provides real-world how-tos and fixes. [The Product Hub](https://support.auth0.com/center/s/product-hub) keeps you up to speed on what’s coming next.\n- Level up your skills: The [Auth0 Learning Hub](https://support.auth0.com/center/s/learning) offers self-paced, tailored learning paths and plans to help you build skills and feature mastery.\n\nReady to try it out?\nHead to the [Auth0 Support Center](https://support.auth0.com/center/s/) and explore for yourself. A great place to begin: search for a product or feature you’re working on and see how the new search delivers fast, tailored answers.\n\nWant to learn more?\nCheck out the [YouTube video](https://www.youtube.com/watch?v=gNl1gEGYAbk&feature=youtu.be) and [Knowledge Base article](https://support.auth0.com/center/s/article/Announcing-the-Enhanced-Auth0-Support-Center).\n"
    },
    {
      "id": "3Re4EKKbxl36YvYeLdnKUI",
      "date": "2025-09-16",
      "displayDate": "September 16, 2025",
      "version": null,
      "type": "updated",
      "title": "Auth0 Teams: Streamlined Team Member Invitations with Pre-assigned Tenant Access (Early Access)",
      "description": "We're excited ✨ to announce a significant enhancement to Auth0 Teams that simplifies and accelerates the onboarding process for your team members. This new feature, Pre-tenant Assign in Team Invitations reduces the steps required to get your team members productive faster.\n\n__The Challenge We Solved ⁉️__:\n\nPreviously, inviting a new team member and granting them tenant access was a multi-step process: invite, acceptance, then manual tenant assignment.\n\n__What's New 🎉__:\n\nYou can now combine these steps into a single action. When inviting a new team member, an optional step in the invitation modal allows you to pre-select the tenants and associated roles the invitee should automatically access upon accepting the invitation.\n\n__Key Benefits for Your Team ✅__:\n\n- One-Step Onboarding: Reduce administrative overhead by combining invitation and tenant access assignment into one efficient workflow.\n- Immediate Access: Invitees gain immediate access to pre-assigned tenants upon accepting the invitation, eliminating waiting periods.\n- Improved Audibility: Team Activity logs now record \"Invitation accepted\" events for better visibility along with tenant member event detail logs.\n\nThis feature empowers Team Owners to onboard administrators and contributors effortlessly, ensuring they have the right access from day one.\n\n__Availability 🍾__: Available in Early Access to Enterprise Customers, with General Availability coming soon.\n\n\"__Do not have Teams enabled as yet?__ Click [here](https://auth0.com/docs/get-started/auth0-teams \"Auth0 Teams\") to learn on how to enable Auth0 Teams\"\n\n![Pre-assign Tenant Access](//images.ctfassets.net/kbkgmx9upatd/351BkTJanA3OvhU3CB2aJl/07e45de3ce5fc3cef31b3a36ae2a09e0/Screenshot_2025-09-15_at_12.12.51â__AM.png)"
    },
    {
      "id": "7zzzayEn8bRUiDnakTnU5D",
      "date": "2025-09-11",
      "displayDate": "September 11, 2025",
      "version": null,
      "type": "updated",
      "title": "Bulk User Import / Export Now Available in the Management Dashboard",
      "description": "We are excited to share that Bulk User Import / Export is now available for everyone directly in the Auth0 Management Dashboard!\n\n__What’s New:__\n- Streamlined experience: submit import / export jobs directly in the Dashboard UI - no Extension management required\n- Expanded RBAC support: now available to tenant members with *Editor - Users* Role in addition to Admin\n- Bulk update existing users: upserting pre-existing users in a connection is now available for manual import jobs \n- Export as a sample: quickly validate export file structure and field naming by exporting a sample file of 10 users\n\n__Deprecation Notice__\nThe [Bulk Import / Export Extension](https://auth0.com/docs/manage-users/user-migration/user-import-export-extension) __will reach end of life in October 2025__. We recommend switching to the new Dashboard experience as soon as possible. \n\nFor more information on the new Import/Export UI, please refer to [Bulk User Import / Export](https://auth0.com/docs/manage-users/user-migration/bulk-user-import-export) in the Auth0 docs."
    },
    {
      "id": "22F0R6b9osOqH0F5ctrfwR",
      "date": "2025-09-11",
      "displayDate": "September 11, 2025",
      "version": "v202535",
      "type": "updated",
      "title": "Tenant Access Control List (ACL) is Now Generally Available",
      "description": "We’re excited to announce the General Availability of Tenant Access Control List (ACL), a security feature that helps you control who can access your tenant.\n\nWith Tenant ACL, you can create custom lists to allow, block, or redirect requests based on predefined signals – strengthening security and optimizing performance.\n\n### Key Benefits\n- Reduce Attack Surface: Block malicious traffic before it reaches your tenant  \n- Enhance Security: Enforce access policies based on IPs, geolocation, user agents, ASN, and more  \n- Optimize Performance: Redirect traffic to improve user experience  \n\n### What’s New in GA\n- Enterprise customers: Create one Tenant ACL list  \n- Attack Protection add-on customers: Create up to 10 Tenant ACL lists  \n- Dashboard support: View, enable, and disable ACL lists directly from the Auth0 Dashboard  \n\n### Learn More\n- [Tenant ACL Documentation](https://auth0.com/docs/secure/tenant-access-control-list)  \n- [Network ACL Management API](https://auth0.com/docs/api/management/v2/network-acls/get-network-acls) "
    },
    {
      "id": "v3c4QDo1RlDJpQUIcpCNz",
      "date": "2025-09-09",
      "displayDate": "September 9, 2025",
      "version": "v202537",
      "type": "added",
      "title": "API Access Policies for Applications now available in Early Access",
      "description": "We're excited to announce that API Access Policies for Applications is now in __Early Access  for all Auth0 customers and is fully supported for production use.__\n\nThis feature enables you to control how applications access your APIs registered in Auth0. You can configure separate application API access policies for user access and client (machine-to-machine) flows, giving you __declarative, granular and easy-to-reason control over which applications can obtain an access token for a specific API__. For instance, with the require_client_grant policy, you can ensure that only explicitly authorized applications can get tokens, even during user flows. This strengthens your security posture by preventing unauthorized applications from accessing sensitive API resources on behalf of a user.\n\nTo learn more, __check out the [documentation](https://auth0.com/docs/get-started/apis/api-access-policies-for-applications).__"
    },
    {
      "id": "0W4ZIHyeQvtNGT9q2TDKU",
      "date": "2025-09-01",
      "displayDate": "September 1, 2025",
      "version": null,
      "type": "added",
      "title": "Announcing Dry Run for the Auth0 Deploy CLI",
      "description": "One of the most requested features for the Auth0 Deploy CLI is here: __you can now preview your deployment changes before applying them.__\n\nSay goodbye to deployment anxiety. With the new --dry-run flag, you can __get a detailed summary of exactly what resources will be created, updated, or deleted__ before you run an import. This brings the confidence of infrastructure-as-code practices like terraform plan to your Auth0 tenant management.\n\n__Get started by simply adding the --dry-run flag__ to your import command to see a safe preview of your changes. \n\nThis will help you and your team:\n- __Deploy with Confidence:__ Eliminate uncertainty by verifying the exact impact of your changes. \n- __Prevent Unintended Changes:__ Catch potential issues and avoid accidental modifications to critical production resources. \n- __Improve Collaboration:__ Share the dry-run output with team members for review and approval before deployment. \n\nThe Dry Run feature is now available in Early Access. Update to the latest version of the Deploy CLI to get started.\n\n[Learn More](https://github.com/auth0/auth0-deploy-cli/blob/beta/docs/using-dry-run.md)\n\n![deploy cli dry run image](//images.ctfassets.net/kbkgmx9upatd/1yYRD5CIwi3CYBmaffCTuA/73164b700b556c810392cfa27a88f75e/444405682-17f94ba1-f5cc-4e89-beb3-277895544e72.png)\n"
    },
    {
      "id": "62W58bGFJRK1LQNqINDgW",
      "date": "2025-08-22",
      "displayDate": "August 22, 2025",
      "version": "v202533",
      "type": "added",
      "title": "Non-Unique Emails Now in Open Early Access",
      "description": "**What's new:**\\\n**Non-Unique Emails** is now in **Open Early Access** and rolling out to all environments. With this feature, multiple user accounts can share the same email address within a database connection. This enables support for real-world scenarios like:\n\n-   Parent/child accounts using a shared inbox\n\n-   Small businesses with a single location email\n\n-   Users managing multiple roles under one email address\n\n**Key details:**\n\n-   Rollout has **just begun** and will take **1--4 weeks** to reach every environment.\n\n-   Available only for **new database connections**.\n\n-   Email **cannot** be used as a primary identifier, customers must configure **username** or **phone number**.\n\n-   Email communications will still be delivered to the shared email.\n\n-   Once enabled, the non-unique email setting is **permanent**.\n\n**Status:**\n\n-   This feature is **production-ready**.\n\n-   **No opt-in required**, all customers will gain access once rollout reaches their environment.\n\n-   **GA planned for Q4 2025.**\n\n**Getting started:**\\\nCustomers can create a new database connection with Non-Unique Emails in the **Dashboard** or via the **Management API**. See full documentation here:\\\n[Non-Unique Emails Documentation](https://auth0.com/docs/authenticate/database-connections/non-unique-emails)"
    },
    {
      "id": "6rsbSpu16aiOJxNQZ77D7V",
      "date": "2025-08-20",
      "displayDate": "August 20, 2025",
      "version": "v202531",
      "type": "added",
      "title": "Auth0 Teams Tenant Member Management and SSO enforcement for Private Cloud (Beta)",
      "description": "We are excited to announce a major update for our Private Cloud customers, extending the powerful management and security capabilities of Auth0 Teams to your private cloud environments. This release introduces the Beta versions of Tenant Member Management and SSO Enforcement, closing the feature gap with our Public Cloud offering.\n\n## ✨ New Features\n\n__Tenant Member Management (Beta) for Private Cloud__:\n\nYou can now centrally manage tenant membership and roles for your team members directly from the Auth0 Teams dashboard. This feature simplifies user administration by allowing you to:\n- View and manage all tenant access from a single interface.\n- Efficiently onboard and off-board users across multiple tenants.\n- Perform bulk operations to grant or revoke access.\n\n__SSO Enforcement (Beta) for Private Cloud__:\n\nStrengthen your organization's security posture by requiring all team and tenant members to authenticate using one of your configured Enterprise Identity Provider (IdP) connections. This ensures that access to Auth0 resources is governed by your corporate identity solution.\n\n__Activity Log Integration for Tenant Management__:\n\nAll operations related to Tenant Member Management (e.g., adding, updating or deleting) are now recorded in the Auth0 Teams Activity Log, providing a complete audit trail for compliance and security monitoring. \n(**Note** Now available to all Auth0 Teams customers.)\n\n__Session Revocation for Private Cloud__:\n\nAdministrators now have the ability to revoke active user sessions for Private Cloud tenants, providing an immediate way to off-board users or respond to security events.\n\n## 📈 Improvements\n\n__Streamlined Private Cloud User Invites__:\n\nTeam members can now be invited directly to a Private Cloud tenant through the Teams interface. This removes the previous requirement of first adding the user to the configuration tenant, simplifying and accelerating the onboarding workflow.\n\n__Increased Bulk Tenant__:\n\nThe limit for bulk tenant assignment has been doubled, allowing you to grant or modify access to 10 tenants at once, up from the previous limit of 5.\n\n## Beta Program Information\nTenant Member Management and SSO Enforcement features for Private Cloud are being released in Beta.\n\n![Continue with Auth0 Teams](//images.ctfassets.net/kbkgmx9upatd/71qq7xpwzOg5sLwhys2Mha/b191d44c2639f982b8a002eaa50f46fd/Continue_with_Auth0_Teams.png)\n"
    },
    {
      "id": "6QhAXo1Sx0218LcNXUnzi7",
      "date": "2025-08-19",
      "displayDate": "August 19, 2025",
      "version": "v202531",
      "type": "added",
      "title": "Sender constrained tokens using DPoP is now available in Early Access.",
      "description": "We are delighted to announce that support for sender constraining tokens using Demonstrating Proof of Possession (DPoP) is now available in Early Access. \n\nDemonstrating Proof of Possession (DPoP) as defined in RFC9449, is an application level mechanism for binding tokens issued by Auth0 to the client application that requested that token. This is implemented using asymmetric key cryptography and with keys that are generated and managed by the client application - no public key infrastructure (PKI) is required.\n\nSender constraining tokens using DPoP can be used to mitigate the risk of tokens being used by unauthorised parties if they are intercepted in transit or exfiltrated from applications. This helps to:\n - enhance security by mitigating against token theft and misuse by unauthorised parties\n - improve user experience by being able to use longer-lived access tokens without significantly increasing security risk i.e. not requiring frequent user authentication\n\nAuth0 will be rolling out SDK support for DPoP for native applications, single page applications, backend server APIs, and Auth0 management: \n - SDKs for iOS Swift and Android Kotlin are available now.\n - SDKs for Javascript, React, Python and more are coming soon.\n\nTo evaluate DPoP for securing your tokens, contact your Auth0 representative. For more details, check out our [product documentation](https://auth0.com/docs/secure/sender-constraining/demonstrating-proof-of-possession-dpop)."
    },
    {
      "id": "2AHovpFxwoGWDImYkICvvQ",
      "date": "2025-08-18",
      "displayDate": "August 18, 2025",
      "version": "v202531",
      "type": "added",
      "title": "JA3 and JA4 TLS Fingerprints Now Available in Tenant Logs and Actions",
      "description": "We have expanded our security telemetry to include **JA3** and **JA4 TLS fingerprints**. **TLS fingerprinting** is a proven technique for identifying client software based on the TLS handshake.  \n\n- **JA3** is a fingerprinting method that identifies TLS clients based on their connection parameters.  \n- **JA4** refines TLS fingerprinting to make client identification more stable and resilient to small variations.  \n\nThese signals help customers detect and respond to **malicious traffic** faster, identify suspicious client behavior, and correlate related activity across changing IPs and sessions.  \n\n---\n\n## **What’s New**  \n\n**Tenant Logs**  \nJA3 and JA4 fingerprints are now logged in applicable authentication and security events such as **`Success Login`**, **`Failed Login`**, and **`Anomaly Detection`**.  \n\n**Actions Integration**  \nJA3 and JA4 fingerprints are now available in **Actions** for real-time, custom security responses, but **only in the following triggers**:  \n- `pre-user-registration`  \n- `post-user-registration`  \n- `post-login`  \n\n**Tenant Access Control List (ACL) Support**  \nYou can also use the [Tenant Access Control List](https://auth0.com/docs/secure/tenant-access-control-list) to block specific TLS fingerprints directly by adding a rule. Alternatively, you can combine JA3 and JA4 signals with Actions to apply custom business logic, such as requiring MFA or conditionally denying access.  \n\n---\n\n## **Why It Matters**  \nJA3 and JA4 provide a **stable, high-entropy signal** that is hard to spoof, helping you correlate malicious activity even across changing IPs and sessions.  \n\n---\n\n## **Availability**  \nAvailable for all **Enterprise** customers. Start using these signals today.  \n"
    },
    {
      "id": "Irk6hQzcGKdEYK2v4pY4p",
      "date": "2025-08-12",
      "displayDate": "August 12, 2025",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Upcoming Removal of Legacy Management API Swagger Endpoint on September 11, 2025",
      "description": "Starting on September 11, 2025, we will be deprecating and removing the legacy, undocumented Management API Swagger Specification.\n### What is changing?\nOn September 11 2025, the endpoint path /api/v2/api-docs/ will be removed. After this date, any requests made to this path will result in a 404 Not Found error.\n### Why are we making this change?\nPlease note that this endpoint and the Swagger specification it provides were never officially documented or intended for public use. The current Swagger specification available at this endpoint is unmaintained, undocumented, and does not reflect the full capabilities of our Management API. As part of our commitment to providing robust and reliable tools, we are removing this legacy specification to prevent confusion and potential issues.\n\nWe strongly encourage all users to migrate to our officially supported [OpenAPI 3.1 Specification for the Management API](https://auth0.com/docs/api/management/v2), which is currently in Beta. This new specification is actively maintained and provides a more accurate and comprehensive development experience.\n### What do you need to do?\nIf any of your processes are calling the /api/v2/api-docs/ endpoints, take the following steps before September 11, 2025 to ensure your applications and services continue to function without interruption:\n1. Identify any systems, scripts, or CI/CD processes that access https://[your-tenant.yourdomain.com]/api/v2/api-docs/.\n2. Update these systems to use our new, officially supported OpenAPI 3.1 specification. It can be accessed here: <https://auth0.com/docs/api/management/v2>\n3. Ensure your applications are resilient to a 404 Not Found response from the old endpoint path.\n\nIf the above does not address your needs or you have additional questions, contact us using the [Auth0 by Okta Support Center](https://support.auth0.com/) or [Auth0 by Okta Community](https://community.auth0.com).\n"
    },
    {
      "id": "6lX5ZCdAr45tFpf314tGj5",
      "date": "2025-08-12",
      "displayDate": "August 12, 2025",
      "version": "v202532",
      "type": "added",
      "title": "Actions - Transaction Metadata - EA",
      "description": "We are excited to announce that __Actions Transaction Metadata__ is now available in [__Early Access__](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#early-access \"Early Access\").\n\nThis feature allows you to set, share, and access, custom data between Actions run in the same `post-login` execution.\n\n__Early Access__ functionality includes:\n- __Accessing Transaction Metadata:__ A new `event.transaction.metadata` object within `post-login` Actions that contains the custom `key/value` pairs, which can be accessed through `key`.\n- __Setting Transaction Metadata:__ A new `api.transaction.setMetadata` function within `post-login` Actions that serves as interface to set the custom `key/value` pairs.\n- __Immediate Access:__ Values are available immediately after being set in the calling Action and subsequent Actions.\n- __Values Types:__ Values can be `boolean`, `number`, `string`, or `string` serialization of `object` and `array`.\n- __Docs:__\n  - New docs section at: [https://auth0.com/docs/customize/actions/transaction-metadata](https://auth0.com/docs/customize/actions/transaction-metadata \"Actions Transaction Metadata Docs\")\n  - Updated guidelines at: [https://auth0.com/docs/customize/actions/action-coding-guidelines#actions-basics](https://auth0.com/docs/customize/actions/action-coding-guidelines#actions-basics \"Actions Coding Guidelines\")"
    },
    {
      "id": "660dnzWXi5W2ivMLaAqF2R",
      "date": "2025-08-11",
      "displayDate": "August 11, 2025",
      "version": "v202531",
      "type": "updated",
      "title": "Multi-Resource Refresh Tokens (MRRT) is now in Early Access for all customers",
      "description": "We’re excited to announce that Multi-Resource Refresh Tokens (MRRT) is now in Early Access for all customers.\n\nThis feature allows applications to use a single refresh token to request access tokens for multiple resource servers (APIs), each with its own audience and scopes. MRRT simplifies token lifecycle management, enhances developer experience, and improves session continuity across distributed API architectures.\n\nWhat’s New?\n- Support for defining audience-specific refresh token policies per client\n- Use one refresh token to request tokens for multiple APIs — no re-authentication required\n- Compatible with rotating and expiring refresh tokens\n- First-party applications only \n- Management API support available today\n- iOS and Android SDKs support\n- Auth0 Deploy CLI and Terraform Support\n\n[Learn more\n](https://auth0.com/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token)\n"
    },
    {
      "id": "2JhbipJzZLVQdYcZC5FRwC",
      "date": "2025-08-11",
      "displayDate": "August 11, 2025",
      "version": null,
      "type": "added",
      "title": "Flexibility for Passwordless on Universal Login with Connection Switching",
      "description": "We're introducing a new feature that gives your end-users the flexibility to choose how they log in. Using Universal Login Custom Prompts, you can now add custom buttons to your login pages. This empowers your users to easily switch between a traditional database (password-based) connection and a passwordless (OTP-based) connection.\n\nThis update allows you to create a seamless experience where users can select their preferred authentication method directly from the login challenge screen.\n\n![ConnectionSwitcher](//images.ctfassets.net/kbkgmx9upatd/3UrpRNsTVx7devcvh1opBi/c8b6668a4ae85dc37b1ac54291961ebb/image__5_.png)\n\nFor full details on this new feature, check out our [documentation](https://auth0.com/docs/customize/login-pages/universal-login/customize-signup-and-login-prompts/connection-switching). To learn more about how to use custom prompts, see the custom prompts [documentation](https://auth0.com/docs/customize/login-pages/universal-login/customize-signup-and-login-prompts)."
    },
    {
      "id": "1zpjcO5jNSLo3hnTBMvwEj",
      "date": "2025-08-11",
      "displayDate": "August 11, 2025",
      "version": "v202531",
      "type": "updated",
      "title": "Native to Web SSO – Now in Early Access for all Enterprise customers",
      "description": "We’re excited to announce the __Early Access of Native to Web SSO is now available for all enterprise customers__.\n\nWith this release, developers can:\n\n- Implement SSO from native iOS or Android apps to browser-based web apps.\n- Securely issue and consume Session Transfer Tokens.\n- Leverage device binding enforcement (IP or ASN) for additional security.\n- Access Session Transfer Token support in Auth0 Actions.\n- Use the feature across the Auth0 CLI SDK, Terraform Provider, Deploy CLI, and native mobile SDKs (iOS and Android).\n- Integrate with WS-FED and SAML clients, and invoke Post Login Actions during token consumption.\n\n📘 To get started:\n\n[Read our documentation](https://auth0.com/docs/authenticate/single-sign-on/native-to-web)\n[Read the Quickstart](https://auth0.com/docs/authenticate/single-sign-on/native-to-web/configure-mobile-to-web-payment-flows)\n"
    },
    {
      "id": "5lghONKnKUNwHFCCUdoChL",
      "date": "2025-08-07",
      "displayDate": "August 7, 2025",
      "version": "v202531",
      "type": "updated",
      "title": "Enhanced Bot Detection Accuracy and Reduced Friction",
      "description": "We’ve improved our bot detection model to strike a better balance between **security and user experience**, with specific gains for tenants whose users frequently access resources via VPN.\n\n**Highlights of this update include:**\n\n* **Reduced false positives for VPN users:** The model now more effectively distinguishes between legitimate users and bots, even when traffic originates from shared IPs or anonymized networks.\n\n* **Improved user experience without compromising security:** These updates are designed to reduce unnecessary friction for valid users while maintaining strong defenses against automated threats.\n\nThis enhanced security capability is now available to all **Enterprise customers with the Attack Protection add-on**. The rollout is currently underway and will be completed over the coming weeks in alignment with individual customer release schedules.\n\nFor activation details or to learn more about protecting your applications, please refer to our [documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or contact your account team. We're committed to helping you stay secure in an evolving threat landscape."
    },
    {
      "id": "3lhCiLgLrJ7qnGsGgdO7uZ",
      "date": "2025-08-07",
      "displayDate": "August 7, 2025",
      "version": "v202530",
      "type": "updated",
      "title": "Brute‑Force Protection Notifications: Email Notifications Expanded to All Identifier Types",
      "description": "__What changed:__ When the user's email is available, Auth0 will now send an email notification for brute‑force blocks in all identifier scenarios (e.g., phone, username), supplementing existing delivery rules.\n\n__Why it matters:__ Ensures users receive blocking notifications consistently even when logging in via phone or username, improving visibility and response.\n\nTo learn more about Brute Force Protection read on online documentation [here](https://auth0.com/docs/secure/attack-protection/brute-force-protection)"
    },
    {
      "id": "5elqlIOCE1MjEkOzW7qI9k",
      "date": "2025-07-31",
      "displayDate": "July 31, 2025",
      "version": null,
      "type": "added",
      "title": "PII Obfuscation/Masking in Log Streaming",
      "description": "Introducing a new capability for log streaming: *__PII Masking__*.  \n\nThis feature allows customers to obfuscate (hash or mask) sensitive personal identifiable information (e.g., email address, phone number, username, etc.) within their log streams. This enhancement improves security and compliance for customers who stream their logs to data lakes or third-party tools.\n\nKey Features:\n- __Customizable PII Masking__: Customers can select specific PII data to be masked in their log streams.\n- __Enhanced Security and Compliance__: This capability helps customers meet stricter compliance requirements by providing greater control over sensitive data in their logs.\n- __Broad Applicability__: PII masking will be available for both new and existing log streams.\n\nThis update aligns with Auth0's commitment to improving customer data security and providing more customization in log stream outputs\n\nFor more information - [Log Streams](https://auth0.com/docs/customize/log-streams)\n"
    },
    {
      "id": "5Akxk5TamCZ4dPFIQqHVYq",
      "date": "2025-07-22",
      "displayDate": "July 22, 2025",
      "version": "v202528",
      "type": "updated",
      "title": "Cascade Token and Session Revocation for Native to Web SSO is Now Available",
      "description": "We’ve added support for **Cascade Revocation** in **Native to Web SSO**.\n\nWith this new capability, revoking the **original refresh token** used in a Native to Web flow will now **automatically revoke all dependent web sessions and their issued refresh tokens**.\n\nThis helps prevent stale or orphaned sessions and ensures that once the root token is no longer valid, all downstream access is properly revoked.\n\n---\n\n## What’s new:\n\n- **`enable_cascade_revocation`**  \n  When enabled, revoking a native app’s refresh token also revokes all web sessions and refresh tokens created via `session_transfer_token`.\n\n- **`enable_online_refresh_tokens`**  \n  When enabled, refresh tokens issued during a Native to Web SSO flow are tied to the lifetime of their associated session (i.e., online tokens).\n\n---\n\n## Default behavior:\n\nBoth of these settings are **enabled by default**, even when not explicitly configured.\n\nThis means:\n- All clients using Native to Web SSO today already benefit from **cascade revocation**.\n- Web-issued refresh tokens will **automatically expire** when their sessions expire.\n\nYou can manage or override these settings using the [Auth0 Management API](https://auth0.com/docs/api/management/v2#!/Clients/patch_clients_by_id).\n\n---\n\n## Why it matters:\n\nThis update provides stronger guarantees around **token lifecycle** and **session integrity** across platforms:\n\n- Prevents misuse of refresh tokens after logout or revocation  \n- Reduces risk from long-lived sessions in embedded web views  \n- Helps developers maintain a tighter, more secure cross-platform SSO experience\n\n---\n\nLearn more in our [Native to Web SSO documentation](https://auth0.com/docs/authenticate/single-sign-on/native-to-web/native-to-web-sso-and-sessions)\n"
    },
    {
      "id": "2hXW9DqsFSv28lmkedZqh4",
      "date": "2025-07-22",
      "displayDate": "July 22, 2025",
      "version": null,
      "type": "added",
      "title": "New Private Cloud Region in Mexico",
      "description": "Auth0 is delighted to introduce __Mexico__ as the latest AWS region for Private Cloud deployments.\n\nThis new region establishes our __first Private Cloud presence in Mexico__, directly addressing the needs of one of Latin America's largest and most dynamic digital economies. The addition of the Mexico region provides lower latency for customers throughout the country and helps meet local data residency and compliance requirements.\n\nWe remain committed to expanding our global footprint to serve our customers wherever they are in the world."
    },
    {
      "id": "5neKip9iIszAEun57u0QTu",
      "date": "2025-07-21",
      "displayDate": "July 21, 2025",
      "version": "v202526",
      "type": "added",
      "title": "Passkey Support for Custom Database Connections with Import Mode Off - Early Access",
      "description": "We are excited to introduce expanded passkey support for custom database connections! Now available without enabling import mode.\n\n__What’s New:__\n- You can now enable passkey-based authentication for custom database connections without importing or trickle-migrating users into Auth0 (i.e., with import mode turned off).\n- End users can easily enroll in passkeys after their first successful login, requiring no prior passkey credentials in your external identity store.\n- Passkey credentials are securely stored in Auth0, while your external identity store continues to handle all other authentication logic.\n\nThis enhancement unlocks frictionless, passkey-based login experiences for enterprises that manage user credentials outside of Auth0 - without requiring user migration or changes to existing identity architecture. \n\nTo enable the Limited Early Access release in your Auth0 tenant, contact your Technical Account Manager to request access. \n"
    },
    {
      "id": "3oEihfjPJchpLR2631pbZw",
      "date": "2025-07-15",
      "displayDate": "July 15, 2025",
      "version": "v202528",
      "type": "added",
      "title": "My Account API Explorer Now Available",
      "description": "My Account API Explorer is now available! Navigate to: https://auth0.com/docs/api/myaccount  to try it out and help navigate & build with the new My Account API (which is in Limited Early Availability).\n\nUsing My Account, customers can build self-service management experiences at scale, powered directly from their applications.\n\nTo learn more and request access to the My Account API feature, contact your Auth0 account manager. \n"
    },
    {
      "id": "2bCRhkF36ozattQPrybsU8",
      "date": "2025-07-15",
      "displayDate": "July 15, 2025",
      "version": "v202528",
      "type": "added",
      "title": "Multiple Custom Domains on an Auth0 tenant - Early Access",
      "description": "We're thrilled to announce __Multiple Custom Domains (MCD) support on a single Auth0 tenant__ bringing you simpler, more flexible branding and white-labeling. This powerful capability allows you to:\n- __Deliver tailored, branded experiences__ for your users, including customized login URLs and emails.\n- __Enhance security__ through consistent use of custom domains across end-user interactions.\n- __Scale B2B SaaS usage__ rapidly through MCD on a single tenant. \n\nThis feature is available to our __Enterprise customers__.\n\nWith Early Access, you'll gain robust capabilities across our Management APIs, Manage Dashboard, and our developer tools (SDKs, Terraform provider, and CLI) for MCD management. You'll find new ways to customize Email templates based on custom domain information. The solution scales effortlessly to meet rapid growth and demanding needs.\n\nPlease refer to Auth0 docs for details - [Multiple Custom Domains](https://auth0.com/docs/customize/custom-domains/multiple-custom-domains).\n\nInterested in participating in the Early Access program? Please send a request through the [Auth0 Support Center](https://support.auth0.com/)."
    },
    {
      "id": "5pyZYkRnpJEiJfd0aD9xXx",
      "date": "2025-07-10",
      "displayDate": "July 10, 2025",
      "version": "v202526",
      "type": "added",
      "title": "Early Access Launch of Right-to-Left Language Support for Universal Login!",
      "description": "Today, we're excited to announce the __Early Access release of Right-to-Left (RTL) Language Support for Universal Login__—with support for the Guardian Mobile Apps (iOS & Android) coming later this month. \n\n![RTL EA Changelog Banner](//images.ctfassets.net/kbkgmx9upatd/7qs9OXnfpfRyrSczKCAow6/d4474f6fd3c00626a759d15a33934aa8/RTL_Banner.jpg)\n\nThis update expands Auth0’s global accessibility by enabling seamless support for RTL languages, including __Arabic, Persian (Farsi), Hebrew, and Urdu__—helping you deliver more inclusive, intuitive login experiences in regions where these languages are the norm. Supporting RTL languages means you can reach new markets, localize experiences with greater precision, and improve accessibility for the nearly 1 billion people who rely on RTL scripts.\n\nEarly Access includes managing RTL languages in the Admin Dashboard and API as well as previewing and editing prompt translations. Guardian support (coming later this month) will bring RTL layout rendering to identity verification and MFA workflows.\n\nThis release marks a major step forward for Universal Login. As Auth0 continues to pursue our vision of a world where anyone can safely use any technology, powered by their Identity, we are proud to partner with our customers around the world in delivering secure, inclusive, and accessible authentication experiences. \n\nContact your Auth0 account manager or Auth0 Support to enable Early Access on your tenant."
    },
    {
      "id": "5fR5o2vYStclTcfkHpJM3R",
      "date": "2025-07-10",
      "displayDate": "July 10, 2025",
      "version": "v202527",
      "type": "updated",
      "title": "Advanced Customizations for Universal Login (Early Access) - Filtering, Page Templates, Dashboards and Consent screens.",
      "description": "We are excited to announce the next Early Access release of Advanced Customizations for Universal Login! This release adds a couple of highly requested enhancements as well as support for building custom versions of Universal Login’s Consent screens using the new ACUL SDK. \n\nAdvanced Customizations for Universal Login enables you to build custom, client-rendered interfaces for Universal Login screens, allowing you to control every pixel of your Universal Login experience. \n\nThis release includes:\n* A new Filters screen configuration object that allows you to set constraints around when the custom UI should be used based on the client and organization information.\n* A new screen configuration parameter that allows you to use your custom page template with ACUL\n* Support for building custom versions of the Consent screens\n  * Consent\n  * Customized Consent (used with HRI)\n* A shiny new Dashboard UI for configuring ACUL screens\n\n![ACUL Dashboard](//images.ctfassets.net/kbkgmx9upatd/8a24tKTrxfcv9Jcw0BATJ/61fc1885dc3facea0d92d0c90b4e3182/acul_dashboard.png)\n\n#### DX Updates\n\nThe latest versions of the ACUL SDK and Auth0’s CDT tooling include support for the new Filters and page template configurations as well as configuring the consent screens.\n* [Typescript SDK](https://github.com/auth0/universal-login/releases/tag/auth0-acul-js%400.1.0-beta.7)\n* [Auth0 CLI](https://github.com/auth0/auth0-cli/releases/tag/v1.15.0)\n* [Deploy CLI](https://github.com/auth0/auth0-deploy-cli/releases/tag/v8.10.0)\n* [Terraform Provider Auth0](https://github.com/auth0/terraform-provider-auth0/releases/tag/v1.23.1)\n\nWe are very close to supporting for everything that Universal Login currently supports out of the box. Checkout our [online documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations) to learn more about ACUL and stay tuned to the Auth0 Changelog for updates and announcements!"
    },
    {
      "id": "3x8aOrDhj5zKgYWA4e7EeD",
      "date": "2025-06-30",
      "displayDate": "June 30, 2025",
      "version": null,
      "type": "deprecated",
      "title": "Multiple Actions for Custom Phone and Email Provider Triggers",
      "description": "We are deprecating the ability to create more than one action per tenant for actions supporting custom phone or email providers and introducing a maximum limit of one action in the respective triggers:\n* `custom-phone-provider`\n* `custom-email-provider`\n\nThis limitation applies to the Management API [create an action endpoint](https://auth0.com/docs/api/management/v2/actions/post-action) (POST - `/api/v2/actions/actions`) and can impact integrations performing direct API calls and tools like the [Auth0 Deploy CLI](https://auth0.com/docs/deploy-monitor/deploy-cli-tool), the [Auth0 Terraform Provider](https://auth0.com/docs/deploy-monitor/auth0-terraform-provider), or the [Auth0 CLI](https://auth0.github.io/auth0-cli/).\n\nWe have provided additional information and timelines for enforcing this change across tenants through a dashboard and [support center notification](https://support.auth0.com/notifications/68503aec14369f07548fbb58).\n"
    },
    {
      "id": "5JtWi3Ihja6wOqMVMsCsGO",
      "date": "2025-06-27",
      "displayDate": "June 27, 2025",
      "version": "v202526",
      "type": "updated",
      "title": "Improved bot detection with reduced friction for legitimate users",
      "description": "We’ve upgraded our bot detection model to improve accuracy and reduce friction for legitimate users, particularly on mobile devices and evolving browser platforms.\n\n**Highlights of this update include:**\n\n* **Improved interpretation of user-agent signals**: The model now better handles previously unseen browser and OS versions, improving accuracy in distinguishing between legitimate users and malicious traffic.\n\n* **Reduced friction for mobile users**: We've updated the model to more accurately recognize native mobile app traffic, resulting in fewer unnecessary CAPTCHA challenges for real users.\n\n* **Improved user experience without compromising security**: These changes are designed to reduce false positives while maintaining robust bot detection coverage.\n\nThis enhanced security feature is available now to all **Enterprise customers with the Attack Protection add-on**. The rollout is currently underway and will be completed in the coming weeks, aligned with individual customer release schedules.\n\nFor activation details or to learn more about safeguarding your systems, please refer to our [documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or reach out to your account team. We are committed to supporting you in protecting your digital presence against evolving threats."
    },
    {
      "id": "pMgBP8Sp7RECZo9n2IIy9",
      "date": "2025-06-24",
      "displayDate": "June 24, 2025",
      "version": null,
      "type": "updated",
      "title": "Auth0 Guide Early Access Enhancement: Security Center Data Assistance",
      "description": "We’re excited to announce that the Okta AI-powered chatbot ([Guide](https://auth0.com/docs/get-started/auth0-guide)) Early Access offering has been enhanced with an additional data source - __Security Center Metric Data__. This additional capability is available only to Enterprise customers and can answer questions such as “do I have more sign up attacks this week compared to last week?”.\n\n### Availability\n\nGuide is available to tenants in the US Public Cloud region. Within that group, Security Center Metric Data is available only for Enterprise customers. Guide will be rolled out to all Public Cloud regions in the near future."
    },
    {
      "id": "46knYejnHFSYMc59ijmGjz",
      "date": "2025-06-23",
      "displayDate": "June 23, 2025",
      "version": "v202524",
      "type": "added",
      "title": "Multi-Resource Refresh Tokens (MRRT) Now Available in Early Access",
      "description": "We’re excited to announce that Multi-Resource Refresh Tokens (MRRT) is now in Early Access for Enterprise customers.\n\nThis feature allows applications to use a single refresh token to request access tokens for multiple resource servers (APIs), each with its own audience and scopes. MRRT simplifies token lifecycle management, enhances developer experience, and improves session continuity across distributed API architectures.\n\nWhat’s New?\n- Support for defining audience-specific refresh token policies per client\n- Use one refresh token to request tokens for multiple APIs — no re-authentication required\n- Compatible with rotating and expiring refresh tokens\n- First-party applications only \n- Management API support available today\n- iOS and Android SDKs support\n- Auth0 Deploy CLI and Terraform Support\n\n[Learn more\n](https://auth0.com/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token)\n"
    },
    {
      "id": "3Yn6M0dZUyYWRQXzEykK2W",
      "date": "2025-06-23",
      "displayDate": "June 23, 2025",
      "version": null,
      "type": "added",
      "title": "Private Key JWT Client Authentication for OIDC and Okta Enterprise Connections - Now in Early Access",
      "description": "We’re excited to announce the Early Access release of Private Key JWT Client Authentication for OIDC and Okta Enterprise Connections! Auth0 customers can now leverage a more secure and standards-based method of client authentication for their enterprise identity providers.\n\nUntil now, federated connections relied on long-lived client secrets for back-channel authentication. This feature enables signing with asymmetric keys on Okta and OIDC connections, reducing the risk of credential leakage and enabling secure key management and rotation.\n\nWhile Auth0 already supports Private Key JWT when acting as the Identity Provider, this release extends that security posture to outbound enterprise connections, allowing Auth0 to securely authenticate to upstream IdPs using signed JWTs instead of shared secrets.\n\nFor complete setup instructions and more, refer to our [documentation](https://auth0.com/docs/authenticate/enterprise-connections/private-key-jwt-client-auth).\n\nBy using Private Key JWT Client Authentication on your OIDC and Okta Enterprise Connections, you agree to the applicable Free Trial terms in Okta’s Master Subscription Agreement and [Okta’s Privacy Policy](https://www.okta.com/privacy-policy/) during use of the Early Access feature. The Free Trial terms can be found within the [Master Subscription Agreement](https://www.okta.com/agreements)."
    },
    {
      "id": "4PbsaXwpuayYFHiuPXr1SS",
      "date": "2025-06-18",
      "displayDate": "June 18, 2025",
      "version": null,
      "type": "deprecated",
      "title": "Real-time Webtasks Logs Extension Deprecation",
      "description": "#### What is changing?\nWe are deprecating the Real-time Webtask Logs extension with a planned end-of-life after (EOL) **September 16, 2025**. \n\nAs a replacement, we have published the [Actions Real-time Logs](https://auth0.com/docs/customize/actions/actions-real-time-logs) feature integrated within the Auth0 Dashboard. The extension will cease to be available for new installations, but tenants with the extension already installed will maintain access until the planned EOL.\n\n#### Why are we making this change?\nThe transition to the dashboard will improve the security posture and maintainability of the functionality, while simplifying future enhancements.\n\n#### How are you affected?\nFor active users of the Real-time Webtask Logs extension, its scheduled removal will affect you, as the transition from extension to a direct dashboard capability inherently implies some user experience differences.\n\n#### What action do you need to take?\nYou can start using the [Actions Real-time Logs](https://auth0.com/docs/customize/actions/actions-real-time-logs#how-to-use) feature by navigating to **Auth0 Dashboard** > **Monitoring** > **Actions Logs**. \n\nWe recommend that extension users familiarize themselves with the new user interface to avoid disruption once the extension becomes unavailable.\n"
    },
    {
      "id": "3FKFF7m36s3iNW64RA9xSP",
      "date": "2025-06-18",
      "displayDate": "June 18, 2025",
      "version": null,
      "type": "deprecated",
      "title": "Removal of Access to Specific Event Request Properties in Actions",
      "description": "#### What is changing?\nThe service will restrict access to additional property names within the `event.request.query` and `event.request.body` objects when executing actions for the `post-login` and `credentials-exchange` triggers. Tenants identified as using actions that may reference request properties planned for restriction will maintain access until **September 16, 2025**.\n\nThe service will restrict the following property names in the request-related objects:\n- `auth_session`\n- `authn_response`\n- `client_secret`\n- `client_assertion`\n- `refresh_token`\n\nPreviously, the implementation of an action could access the properties listed above in `event.request.query` and `event.request.body` to retrieve the value included in the corresponding network request. Once the planned restrictions become effective for a given tenant, all properties above will be undefined independently of the network request content.\n\nThe rollout of these additional restrictions is in progress for tenants where historical data did not show any actions using these property names. Tenants identified as potentially impacted by these restrictions will maintain existing behavior until the previously mentioned date.\n\n#### Why are we making this change?\nBy restricting access to these properties, we aim to prevent potential mishandling of sensitive data within the custom code implemented for `post-login` and `credentials-exchange` actions. For example, we reduce the risk of unintentionally logging sensitive data in log operations that may output the whole request object.\n\n#### How are you affected?\nIf any of your tenant's current actions no longer include any reference to one of the restricted property names or that despite having references to one of the names, it is not in the context of property access to `event.request.query` and `event.request.body` objects, then these changes should not impact your tenant.\n\nIf there are actual references to restricted request properties, the restriction of these properties may impact the action's logic. After the changes become effective, accessing those request properties will always return undefined. Without revising the actions' implementation, the respective authentication flows risk partial degradation or complete failure.\n\n#### What action do you need to take?\nIf your tenants currently have actions referencing one of the restricted properties of the `event.request.query` and `event.request.body` objects in their implementation. For applicable actions, you must update their implementation to stop relying on the restricted properties of the request objects.\n\nThe exact implementation changes you may need to perform will depend on your overall implementation of the actions and each restricted request property's usage scenario.\n\nFor example, for scenarios related to reusing secret information previously available from the request, the support for [secret management](https://auth0.com/docs/customize/actions/write-your-first-action#add-a-secret) (`event.secrets`) as part of actions may provide a potential alternative. If the requests include restricted property names, but the information sent within them is not considered sensitive, you may consider using a different parameter name in the request, or ideally, consider using [custom parameters](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow/authorization-code-flow-with-par#supported-parameters) as part of [pushed authorization requests](https://auth0.com/docs/get-started/applications/configure-par) to avoid disclosing/interception of the data by end-users in browser-based flows. If the data is static per client or connection, consider storing it as part of client or connection metadata."
    },
    {
      "id": "3DROEob65di707QvAZkySI",
      "date": "2025-06-18",
      "displayDate": "June 18, 2025",
      "version": null,
      "type": "added",
      "title": "Canadian French Language Support Added to Auth0 Dashboard and Docs",
      "description": "We’ve added a new language option-Canadian French-to help our users in Canada and beyond build secure identity solutions more easily. If your language preference is set to Canadian French in your browser settings, Auth0 will detect this and automatically serve the Dashboard and Documentation in Canadian French. You can manually override this setting in the Auth0 Dashboard and Docs via the language switcher in the top-right corner.\n"
    },
    {
      "id": "3w63SF53LMZmleSmDh2Fcw",
      "date": "2025-06-17",
      "displayDate": "June 17, 2025",
      "version": null,
      "type": "added",
      "title": "Resilience enhancement - Private Cloud Restoration General Availability",
      "description": "Auth0 is excited to announce the General Availability of Private Cloud Restoration resilience enhancement. This capability would come handy in the event of customer data loss or data corruption, and would assist customers in meeting regulatory requirements such as European Union’s Digital Operational Resilience Act (DORA).\n\nThis capability allows customers to request full restoration of their production Private Cloud environment from an Auth0 backup in the last 14 days. It also includes the option for one restoration test per year on a non-production Private Cloud environment. Please refer to [Operational policies documentation](https://auth0.com/docs/troubleshoot/customer-support/operational-policies#private-cloud-restoration \"Private Cloud Restoration\") for more."
    },
    {
      "id": "3EQxapnmbIRlkDlyIxGc6S",
      "date": "2025-06-13",
      "displayDate": "June 13, 2025",
      "version": "v202524",
      "type": "updated",
      "title": "Customize the Brute-Force Protection Unblock Page with Universal Login - Now Available",
      "description": "You can now customize the __Brute-Force Protection unblock page__ using Universal Login. This update allows for a fully branded experience when users are locked out due to repeated failed login attempts.\n\n__What’s New?__\n- __Branded unblock experience via Universal Login -__\n The brute-force protection unblock page is now part of Universal Login, giving you full control over its appearance and content. This ensures a seamless, branded experience throughout the recovery flow.\n\n- __Improved compatibility with email security scanners -__\n Account unblock now occurs when the unblock page loads rather than on clicking the unblock link. This helps prevent issues caused by email security scanners that pre-process links.\n\n__To enable these new features__\n\nNavigate to __Settings__ > __Advanced__ tab\nIn the __Migrations__ section, near the bottom of the page, disable the existing functionality with the toggle shown below\n\n![Brute Force Deprecation Toggle](//images.ctfassets.net/kbkgmx9upatd/aq1x1nHXvy3b9nEcvNyGE/8b4e39918582a1f4250f42c2efe43618/DeprecationScreenShot.png)\n\nThe existing __Brute-Force Protection unblock page and behavior__ will remain available for now. However, it is __planned for deprecation within the next 6 months__, giving you __ample time to transition__ to the __new and improved experience__ at your convenience.\n\nFor more information about our __Brute-Force Protection__ feature, see our online documentation [here](https://auth0.com/docs/secure/attack-protection/brute-force-protection)\n"
    },
    {
      "id": "3d5kXmsESlH8zy1LrCRuZL",
      "date": "2025-06-10",
      "displayDate": "June 10, 2025",
      "version": null,
      "type": "deprecated",
      "title": "Unrestricted offset pagination in Connections Management API",
      "description": "Starting October 27, 2025, the offset-based pagination available for the Management API [get all connections](https://auth0.com/docs/api/management/v2/connections/get-connections) endpoint will no longer support retrieving a paginated result beyond the first 1000 connections.\n\nUse checkpoint-based pagination to iterate beyond 1000 connections. Additional information about this upcoming change is available in a [dashboard and support center notification](https://support.auth0.com/notifications/68115c979be58b755a85b543)."
    },
    {
      "id": "eW4GjQ2zYshqK7593Z1LW",
      "date": "2025-06-05",
      "displayDate": "June 5, 2025",
      "version": "v202523",
      "type": "added",
      "title": "Native Passkey Enrollment With My Account",
      "description": "We’re very excited to announce the Limited Early Availability of Native Passkey Enrollment, the first capability on our new self-service API, My Account.  \n\nUsing My Account, customers can build self-service management experiences at scale, powered directly from their applications.\n\nNative Passkey Enrollment enables users to add a passkey to their account using APIs; applications can fully manage user onboarding of passkeys. This feature is the first of many capabilities being added to My Account.\n\nTo learn more and request access to the feature, contact your Auth0 account manager. "
    },
    {
      "id": "72JltARfrooqHBmkuTzb8d",
      "date": "2025-06-02",
      "displayDate": "June 2, 2025",
      "version": "v202520",
      "type": "added",
      "title": "Native to Web SSO – Now in Early Access",
      "description": "We’re excited to announce the Early Access release of Native to Web SSO — a new capability that enables session sharing between native mobile apps and web apps using a secure, standards-based approach. This helps create a seamless user experience where authentication in one platform (native or web) carries over to the other, without requiring a separate login.\n\nWith this release, developers can:\n\n- Implement SSO from native iOS or Android apps to browser-based web apps.\n- Securely issue and consume Session Transfer Tokens.\n- Leverage device binding enforcement (IP or ASN) for additional security.\n- Access Session Transfer Token support in Auth0 Actions.\n- Use the feature across the Auth0 CLI SDK, Terraform Provider, Deploy CLI, and native mobile SDKs (iOS and Android).\n- Integrate with WS-FED and SAML clients, and invoke Post Login Actions during token consumption.\n\n📘 To get started:\n\n[Read our documentation](https://auth0.com/docs/authenticate/single-sign-on/native-to-web)\n[Read the Quickstart](https://auth0.com/docs/authenticate/single-sign-on/native-to-web/configure-mobile-to-web-payment-flows)\n"
    },
    {
      "id": "2CLx9gZ1YB1nfO59QqH8po",
      "date": "2025-06-02",
      "displayDate": "June 2, 2025",
      "version": null,
      "type": "updated",
      "title": "Enhanced Bot Detection for Signups",
      "description": "We're excited to announce a significant upgrade to our bot **detection capabilities for signups**, delivering superior accuracy and staying ahead of evolving traffic patterns.\n\nThis latest model further improves our ability to distinguish legitimate new users from automated malicious activity. The result is a substantial reduction in unwanted signups, enhancing your user onboarding experience and overall platform security.\n\nBy enhancing our model training and deployment system, we can now accelerate model improvements, increase deployment frequency, and reduce detection latency, ensuring you always have the most advanced protection.\n\nThis enhanced security feature is available now to all **Enterprise customers with the Attack Protection add-on**. The rollout is currently underway and will be completed in the coming weeks, aligned with individual customer release schedules.\n\nFor activation details or to learn more about safeguarding your systems, please refer to our [documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or reach out to your account team. We are committed to supporting you in protecting your digital presence against evolving threats."
    },
    {
      "id": "5rwgKZhUbJ1HgnyiwhiTn7",
      "date": "2025-05-29",
      "displayDate": "May 29, 2025",
      "version": "v202521",
      "type": "updated",
      "title": "Actions - Name Edit",
      "description": "Action name editing is now available within the Auth0 Dashboard, providing developers the ability to rename existing Actions while ensuring unique names are maintained.\n\nTo rename an Action:\n1. Navigate to the specific Action Details page in the Auth0 Dashboard.\n2. At the Action Details page, click the edit button located next to the Action's name to make your changes.\n3. Enter the new name.\n4. Apply or cancel the changes.\n"
    },
    {
      "id": "3oV0iKjZW0TZs7SuLvE94L",
      "date": "2025-05-29",
      "displayDate": "May 29, 2025",
      "version": "v202519",
      "type": "added",
      "title": "Fine-Grained Machine-to-Machine Token Quotas now available in Early Access",
      "description": "We’ve excited to announce that Fine-Grained M2M Token Quotas is now in __Early Access for Enterprise customers__.\n\nThis feature allows __setting hourly and daily limits on M2M access tokens at the Application and Organization level__. __When a quota is reached, affected Applications receive 429 responses until the quota resets__. Customers can also enable or disable quotas in real time and monitor usage via tenant logs and HTTP headers.\n\n![M2M token quota error](//images.ctfassets.net/kbkgmx9upatd/4WFjgTHnAXtwxaw6FvVtUk/d79cad77dc6eed76196a5ff4c20c81e4/Screenshot_2025-05-29_at_11.11.41.png)\n\nThis gives customers granular control over token issuance, helping __prevent excessive consumption — especially important when APIs are exposed to Third-Party Apps__ or internal teams outside their direct control. It addresses common issues like missing token caching, which can lead to uncontrolled token usage, unexpected costs and imbalanced usage across Organizations.\n\nTo learn more, check out the [documentation](https://auth0.com/docs/fine-grained-m2m-token-quotas-early-access).\n\n__Reach out to you Auth0 contact to request access!__"
    },
    {
      "id": "28sbruPFNeulf3hP4Y3A6O",
      "date": "2025-05-27",
      "displayDate": "May 27, 2025",
      "version": "v202521",
      "type": "updated",
      "title": "Advanced Customizations for Universal Login (Early Access) - WebAuthn + Biometrics Authentication, and Logout!",
      "description": "We are excited to announce the next Early Access release of Advanced Customizations for Universal Login! This release adds support for building custom versions of Universal Login’s WebAuthn + Biometrics authentication and the matching MFA and Reset Password Challenge screens, as well as Logout and a few other odds and ends, all using the new ACUL SDK.\n\nAdvanced Customizations for Universal Login enables you to build custom, client-rendered interfaces for Universal Login screens, allowing you to control every pixel of your Universal Login experience. This release allows you to building custom versions of the following screens:\n\n- MFA WebAuthn Change Key Nickname\n- MFA WebAuthn Enrollment Success\n- MFA WebAuthn Error\n- MFA WebAuthn Platform Challenge\n- MFA WebAuthn Platform Enrollment\n- MFA WebAuthn Roaming Challenge\n- MFA WebAuthn Roaming Enrollment\n- Reset Password MFA WebAuthn Platform Challenge\n- Reset Password MFA WebAuthn Roaming Challenge\n- Logout\n- Logout Aborted\n- Logout Complete\n- MFA Recovery Code Challenge New Code\n- Email Verification Result\n- Login Email Verification\n\n#### DX Updates\n\nThe latest versions of the ACUL SDK and our CDT tooling all include support for these new screens.\n- [Typescript SDK](https://github.com/auth0/universal-login/releases/tag/auth0-acul-js%400.1.0-beta.5)\n- [Auth0 CLI](https://github.com/auth0/auth0-cli/releases/tag/v1.14.1)\n- [Deploy CLI](https://github.com/auth0/auth0-deploy-cli/releases/tag/v8.8.3)\n- [Terraform Provider Auth0](https://github.com/auth0/terraform-provider-auth0/releases/tag/v1.20.1)\n\nWe are well on our way to adding support for everything that Universal Login currently supports out of the box. Checkout our [online documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations) to learn more about ACUL and stay tuned to the Auth0 Changelog for updates and announcements!"
    },
    {
      "id": "3Bre3sPV6TKhcTXt8NOXan",
      "date": "2025-05-21",
      "displayDate": "May 21, 2025",
      "version": "v202520",
      "type": "added",
      "title": "Client-Initiated Backchannel Authentication (CIBA) flow is now Generally Available",
      "description": "Asynchronous authentication and authorisation using the Client-Initiated Backchannel Authentication (CIBA) flow is now Generally Available for our Enterprise plan customers. The CIBA flow works as an asynchronous, decoupled flow across two different devices: \n\n - Consumption device: initiates the authentication request.\n\n - Authentication device: handles end-user authentication, implemented as a custom mobile app which embeds the Guardian mobile SDK.\n\nThe flow supports the use of Rich Authorization Requests [RFC9396](https://www.rfc-editor.org/rfc/rfc9396.html) to provide contextual information to authenticating and/or authorizing users. This enables the CIBA flow to support a number of powerful use cases driven by backend client applications, such as: \n\n - Customer authentication by headless devices or devices/applications with limited interaction capabilities.\n\n - Customer authentication in call-centre scenarios.\n\n - Authorising sensitive operations on behalf of yourself or a third-party e.g. a customer service Agent, an autonomous AI Agent.\n\nFor more details, see the [product documentation](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-initiated-backchannel-authentication-flow)."
    },
    {
      "id": "AcAZ9992lD3DZjsYd1Wjt",
      "date": "2025-05-20",
      "displayDate": "May 20, 2025",
      "version": null,
      "type": "updated",
      "title": "Edit Tenant Member roles from within Auth0 Teams",
      "description": "We're excited to announce a significant enhancement to the Tenant Member Management feature within Auth0 Teams. All tenant member management tasks can now be completed centrally within the Auth0 Teams Dashboard.\n\nPreviously, we introduced tenant member management with support for inviting and assigning dashboard users to team tenants, followed by the ability to remove access from tenants directly within the Teams dashboard.\n\nWith this release, a team owner gains the comprehensive ability to perform all Create, Read, Update, and Delete (CRUD) tasks on tenant members directly from the Teams Dashboard. This streamlines administrative workflows and provides unparalleled control over user access across your tenants.\n\nNote: The Tenant Member Management feature is required for this functionality. This feature is on by default for all Self-Service customers and most Public Cloud Enterprise customers. It is configurable for some existing Public Cloud Enterprise customers and is coming soon to Private Cloud customers.\n\nPlease refer to the following documentation for more information.\n1. [How do you edit a Tenant Member role from Auth0 Teams Dashboard?](https://auth0.com/docs/get-started/auth0-teams/tenant-member-management#edit-tenants-membership-with-tenant-member-management \"Edit Tenant Member access.\")\n2. [I am a Public Cloud Customer; how do I verify that I have the suitable feature turned on to support tenant member management?](https://auth0.com/docs/get-started/auth0-teams/tenant-member-management#turn-on-tenant-member-management \"Turning on Tenant Member Management.\")\n\n![Teams Tenant Member Management Edit](//images.ctfassets.net/kbkgmx9upatd/5QwfkRVLTvsmQGBwZ1v8zO/03318f219868f3270908b9c8ea2607a8/Tenant_Member_Management_Edit.png)\n"
    },
    {
      "id": "4SmjmcbmVZgt1Zsn7JYF1V",
      "date": "2025-05-19",
      "displayDate": "May 19, 2025",
      "version": "v202520",
      "type": "updated",
      "title": "Event Streams for Auth0 Extensibility – Now in Early Access",
      "description": "Event Streams is now available for all customers who desire to discover completed changes to Auth0 Users and Organizations as they happen.  They can do this by:\n-  Creating an Event Stream in the Manage Dashboard or the Management API \n-  Configuring the Event Streams with the desired destination ([Webhook](https://auth0.com/docs/customize/events/create-an-event-stream#create-an-event-stream-webhooks- \"Create a Webhook\") or [Amazon EventBridge](https://auth0.com/docs/customize/events/create-an-event-stream#aws-eventbridge \"Create an Event Stream via Eventbridge\")) and selecting the events to receive\n\nSee the [Auth0 Docs](https://auth0.com/docs/customize/events) for further instructions."
    },
    {
      "id": "3WQbDHmA6C8FzGq0gpBDut",
      "date": "2025-05-13",
      "displayDate": "May 13, 2025",
      "version": null,
      "type": "deprecated",
      "title": "Allow Omitting Password on SMTP Email Provider Host-related Changes",
      "description": "Updating specific configuration fields for a tenant's SMTP Email Provider may require simultaneously specifying the password field used for SMTP client authentication.\n\nWe have provided additional information and timelines for enforcing this change across tenants through a dashboard and [support center notification](https://support.auth0.com/notifications/68236562d0bbf8eb81861392)."
    },
    {
      "id": "ineWqtT4tPcGouoxTe2mh",
      "date": "2025-05-07",
      "displayDate": "May 7, 2025",
      "version": null,
      "type": "added",
      "title": "Customizable notification text for IOS Guardian SDK ",
      "description": "Introducing the customizable notification text for IOS Guardian SDK. With this update, apps using the Guardian SDK on iOS can now fully customize the text of their push notifications—giving you greater control over your user experience and messaging."
    },
    {
      "id": "3baR4gwGez6GE1fbhylNKH",
      "date": "2025-05-07",
      "displayDate": "May 7, 2025",
      "version": null,
      "type": "added",
      "title": "Language Selection for End Users on Universal Login",
      "description": "Enable end users to choose a different language if the automatically selected language based on `ui_locales` or the browser language header is not preferred.  By leveraging Auth0 Custom Prompts you can use your own HTML to customize the look and feel for how end-users perform the language selection on Universal Login. [Learn more](https://auth0.com/docs/customize/login-pages/universal-login/customize-signup-and-login-prompts/language-selection)![Language Selection on Universal Login](//images.ctfassets.net/kbkgmx9upatd/XQRrvqf3JIB247VTSTXF7/65f189e104e8018be47badb0145ab862/LanguageSelection.png)"
    },
    {
      "id": "136bCyJY2tu8v2AoMbEuuc",
      "date": "2025-05-07",
      "displayDate": "May 7, 2025",
      "version": null,
      "type": "updated",
      "title": "Auth0 CLI Improvements",
      "description": "We're excited to announce the latest release of the Auth0 CLI! This update brings a host of improvements designed to streamline your development workflow, enhance security capabilities, and provide a more intuitive user experience.\n\n### Key Highlights:\n\n- __Improved Universal Login Customization Flow__: Customizing your Universal Login pages is now more straightforward and efficient. We've refined the command-line interface to provide a smoother experience when managing templates and branding, allowing for quicker iterations and deployments.\n- __Support for Blocking User Authentication__: Enhance your security posture with the new ability to directly block (and unblock) user authentication via the CLI. This feature provides a quick and effective way to manage access for suspicious or compromised accounts.\n- __Enhanced Logs and User Management Experience:__ We've significantly improved the experience for viewing and managing your Auth0 logs and users. Expect more intuitive commands, better filtering options, and clearer outputs, making it easier to find the information you need and perform administrative tasks.\n- __Better Tenant Settings Management:__ Managing your tenant settings is now more accessible and user-friendly. The CLI offers improved commands for viewing and updating various tenant configurations, simplifying your operational overhead.\n- __Extended test login Command to Support Organizations:__ Testing your login flow with Organizations is now easier than ever. The auth0 test login command has been extended to seamlessly incorporate organization-specific contexts, allowing for more comprehensive testing of your multi-tenant applications.\n- __Bug Fixes and Quality of Life Improvements:__ This release also includes a variety of bug fixes and other minor enhancements based on your feedback. These improvements contribute to a more stable, performant, and enjoyable experience with the Auth0 CLI.\n\nCheckout the reference documentation for more information: https://auth0.github.io/auth0-cli/"
    },
    {
      "id": "3R2MCinpGjcQN8r2HzyWrl",
      "date": "2025-05-05",
      "displayDate": "May 5, 2025",
      "version": null,
      "type": "added",
      "title": "Sign in with Google now available for Android Applications",
      "description": "Auth0 Developers can now easily and securely authenticate users on native applications by using the Android Credential Manager’s Sign in with Google.  This enables a secure and streamlined experience for end-users to login without being prompted for a password and by re-using their existing Google session on the device. [Learn more](https://auth0.com/docs/authenticate/identity-providers/social-identity-providers/google-native)\n![Native Sign in with Google](//images.ctfassets.net/kbkgmx9upatd/2kRfgCc6743tlYfdNMzqMo/f03da5e2194e2b1a317014bbe4d80458/NativeSigninWithGoogle.gif)"
    },
    {
      "id": "5qqdIZNejp2RrBR4CC5bf5",
      "date": "2025-04-28",
      "displayDate": "April 28, 2025",
      "version": "v202517",
      "type": "updated",
      "title": "Advanced Customizations for Universal Login (Early Access) - Device Authorization Flow and more MFA Factors!",
      "description": "We are excited to announce the next Early Access release of Advanced Customizations for Universal Login! This release adds support for building custom versions of Universal Login’s Device Authorization screens, the MFA voice, phone, and recovery code screens, and their matching Reset Password Challenge factors all using the new ACUL SDK.\n\nAdvanced Customizations for Universal Login enables you to build custom, client-rendered interfaces for Universal Login screens, allowing you to control every pixel of your Universal Login experience. This release allows you to building custom versions of the following screens:\n* Device Code Activation\n* Device Code Activation Allowed\n* Device Code Activation Denied\n* Device Code Confirmation\n* MFA Phone Challenge\n* MFA Phone Enrollment\n* MFA Voice Challenge\n* MFA Voice Enrollment\n* Reset Password MFA Phone Challenge\n* Reset Password MFA Voice Challenge\n* MFA Recovery Code Challenge\n* MFA Recovery Code Enrollment\n* Reset Password MFA Recovery Code Challenge\n* Redeem Ticket\n\n__DX Updates__\n\nThe latest versions of the ACUL SDK and our CDT tooling all include support for these new screens.\n* [Typescript SDK](https://github.com/auth0/universal-login/releases/tag/auth0-acul-js%400.1.0-beta.4)\n* [Auth0 CLI](https://github.com/auth0/auth0-cli/releases/tag/v1.12.0)\n* [Deploy CLI](https://github.com/auth0/auth0-deploy-cli/releases/tag/v8.8.1)\n* [Terraform Provider Auth0](https://github.com/auth0/terraform-provider-auth0/releases/tag/v1.18.0)\n\nWe are well on our way to adding support for everything that Universal Login currently supports out of the box. Checkout our [online documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations) to learn more about ACUL and stay tuned to the Auth0 Changelog for updates and announcements!"
    },
    {
      "id": "4y4YPwiEh3rr6oPp2Xg2xy",
      "date": "2025-04-28",
      "displayDate": "April 28, 2025",
      "version": null,
      "type": "added",
      "title": "Federated Logout for the Okta and OIDC Enterprise Connections in Limited Early Access",
      "description": "We are thrilled to introduce the Limited Early Access release of Federated Logout for Okta and OIDC enterprise connections! Auth0 customers now have a straightforward solution to ensure that an end user is logged out of both Auth0 and OIDC IdP sessions via the Auth0 logout endpoint. This feature is built upon the [OpenID Connect RP-initiated federated logout specification](https://openid.net/specs/openid-connect-rpinitiated-1_0.html), allowing customers to effectively mitigate security risks without the need to directly access IdP logout endpoints.\n\nFederated logout has already been supported for a some IdPs, [listed here](https://auth0.com/docs/authenticate/login/logout/log-users-out-of-idps), as well as through the dedicated Google and Microsoft Entra ID connectors. This features expands federated logout capabilities to all OIDC Identity Providers via the generic OIDC and Okta connectors. \n\nTo enable the Federated Logout Limited Early Access release in your Auth0 tenant, please contact your Technical Account Manager to request access."
    },
    {
      "id": "KzqGuyGjz30eYzqyO7hj9",
      "date": "2025-04-26",
      "displayDate": "April 26, 2025",
      "version": null,
      "type": "added",
      "title": "Guardian Mobile Enrollment for Mobile Devices ",
      "description": "Users can now enroll in Guardian Push directly from their mobile device—no QR code scanning required. Enrollment is supported in both the Guardian App and custom Guardian-powered apps, making setup faster and easier on mobile."
    },
    {
      "id": "5JS0K4l8w2u78iZqy80C9n",
      "date": "2025-04-22",
      "displayDate": "April 22, 2025",
      "version": "v202517",
      "type": "updated",
      "title": "Actions - Real-time Logs (GA)",
      "description": "This feature gives developers real-time output from Action, Custom Database Scripts, and Custom Social Connections code when executing console.log and other similar commands.\n\nTo use the feature, navigate to the *__Dashboard > Monitoring > Action Logs__*.\n\nWhat's new:\n- __Connection Status:__ New connectivity status indicator for easier visualization of connection state to server stream.\n- __Functionality:__ New functionalities for on demand connectivity, easier scrolling, and file downloading, which supplement the already existing ones.\n- __User Experience:__ Improved user experience regarding look and feel and performance.\n- __Docs:__ New docs section at: [https://auth0.com/docs/customize/actions/actions-real-time-logs](https://auth0.com/docs/customize/actions/actions-real-time-logs \"Actions Real-time Logs Docs\")\n"
    },
    {
      "id": "6ADAxkJiqhYXcCP1YspL7X",
      "date": "2025-04-16",
      "displayDate": "April 16, 2025",
      "version": null,
      "type": "added",
      "title": "Token Vault to unlock access to external APIs: Now in Early Access",
      "description": "We’re excited to introduce Token Vault, now available in Early Access. Token Vault enables your applications to securely access third-party APIs on behalf of your users—without requiring you to manage refresh tokens or create custom integrations for a broad range of external APIs and services.\n\nWith Token Vault, Auth0 handles storing and refreshing access tokens from identity providers like Google, Github, Microsoft, and more. Your applications can then seamlessly call downstream APIs—such as Google Calendar, GitHub repositories, Microsoft Word, etc.\n\nThis feature is currently only available for Public Cloud tenants. To enable the Early Access release for your Auth0 tenant, please connect with your Technical Account Manager. \n\nFor complete setup instructions and more, refer to the [Token Vault documentation](https://auth0.com/docs/secure/tokens/token-vault).\n\nTo learn about using Token Vault with Auth for GenAI, visit [Call Other's APIs on User's Behalf | Auth0](https://auth0.com/ai/docs/call-others-apis-on-users-behalf).\n\nLet the API access magic unfold!"
    },
    {
      "id": "4IKAziNmIfxw6JFvAhTnyX",
      "date": "2025-04-15",
      "displayDate": "April 15, 2025",
      "version": null,
      "type": "added",
      "title": "Announcing the Auth0 MCP Server",
      "description": "We're super excited to announce the developer beta of Auth0 MCP Server to make tenant management conversational, intuitive, and incredibly efficient for developers. Recently, Model Context Protocol (MCP) has been growing at a rapid pace and has enabled AI agents to communicate with external tools, resources, or remote services on behalf of users.\n\nAuth0 MCP Server lets developers interface with Auth0 using natural language instead of complex APIs or dashboard navigation, dramatically simplifying tenant management workflows. For instance, developers could simply ask Claude to create a new Auth0 app, deploy a new Action, or perform any other supported management operation.\n\n__This initial release includes:__\n- __Support for 20+ Auth0 Management operations:__ Create and manage applications, APIs, Actions, Logs, and Forms through simple, natural language conversations.\n- __Secure Authentication:__ Grant tenant access to your MCP clients via a secure auth flow with built-in support for scopes and session management.\n- __Multi-Step Management Workflows:__ Perform complex operations like \"create an application with specific permissions and deploy a security Action\" in a single conversation.\n- __Seamless Integrations:__ Native support for Claude Desktop, Windsurf, Cursor, and many other MCP clients.\n\nGet started with a simple command: `npx @auth0/auth0-mcp-server init`\n\nLearn more about the Auth0 MCP Server: [https://github.com/auth0/auth0-mcp-server/](https://github.com/auth0/auth0-mcp-server/ \"https://github.com/auth0/auth0-mcp-server/\")"
    },
    {
      "id": "53BivrYIYMipzAY0FnTvKh",
      "date": "2025-04-10",
      "displayDate": "April 10, 2025",
      "version": "v202511",
      "type": "updated",
      "title": "Auth0 Support Center - Now with Generative Answers (Beta) and Knowledge Articles in Search",
      "description": "[Auth0 Support Center](https://support.auth0.com/) Search now provides generative answers to search queries on Support Center. As part of this change, the answers/solutions in Support Center contain results from \"Knowledge Articles\" which are Auth0-created solutions to specific issues to help you troubleshoot better.\n\nTo try it out, navigate to: https://support.auth0.com/ and enter a query in the search box on the homepage. To filter results by the new Knowledge Articles, select \"Knowledge\" on the left-hand side."
    },
    {
      "id": "3gUQiLnGukpNaOw6p3ERH9",
      "date": "2025-04-08",
      "displayDate": "April 8, 2025",
      "version": null,
      "type": "added",
      "title": "Announcing Auth for GenAI: Developer Preview Is Live!",
      "description": "We’re excited to announce the __Developer Preview__ of __Auth for GenAI__, a new offering purpose-built for AI-native, agent-based applications.\n\n__Auth for GenAI__ helps developers securely integrate authentication, API access, and fine-grained authorization into GenAI-powered apps using industry standards all wrapped in developer-friendly SDKs.\n\nThis initial release includes:\n- __User Authentication__ via Universal Login (social, enterprise, passkeys, and more) with account linking\n- __Token Vault__ enabling AI agents to call APIs (Google, GitHub, Slack, etc.) on user's behalf\n- __Asynchronous Authorization__ to enable autonomous AI agents to asynchronously ask users for out-of-band authorization on sensitive actions via push notifications\n- __Authorization for RAG__ with resource-level access control powered by Auth0 FGA\n- SDK support for Next.js, Node.js, FastAPI, and popular AI frameworks like LangChain, Vercel AI SDK, and LlamaIndex\n- Sample apps, quickstarts, and ready-to-use templates\n\nExplore the Developer Preview at: [https://auth0.com/ai](https://auth0.com/ai)\n\nJoin the discussion at our community: [https://community.auth0.com/c/auth-gen-ai](https://community.auth0.com/c/auth-gen-ai)"
    },
    {
      "id": "275CgZQkgr43K85q2YKrjV",
      "date": "2025-04-07",
      "displayDate": "April 7, 2025",
      "version": "v202514",
      "type": "added",
      "title": "Tenant Access Control List is Now Available in Early Access!!",
      "description": "We’re excited to introduce __Tenant Access Control List (ACL)__, a powerful new security feature that allows you to control who can access your tenant.\n\nWith the __Tenant ACL__, you can define custom rules to __allow, block, or redirect requests__ based on predefined signals, helping you secure and optimize your environment with precision.\n\n__Benefits__\n\n✔ __Reduce Attack Surface__ – Block malicious traffic before it reaches your tenant.\n\n✔ __Enhance Security__ – Enforce custom access policies based on IPs, geolocation, user agents, and more.  \n\n✔ __Optimize Performance__ – Redirect traffic efficiently to improve user experience.  \n\n__Early Access Availability:__\n\n__Current Early Access:__ Available to all __Enterprise customers with the__ __Attack Protection add-on__ with the ability to create up to __10 access control list__.\n\n__Upcoming Limited Early Access:__ Rolling out to __all Enterprise customers__ in __Q2 2025__ with the ability to create up to one __access control list__.\n\nPlease view our online documentation [here](https://auth0.com/docs/secure/tenant-access-control-list) for additional details and to learn how to enable **Tenant Access Control Lists**.  \n"
    },
    {
      "id": "44rEHWw8XPzsjrCwNSpPtW",
      "date": "2025-04-02",
      "displayDate": "April 2, 2025",
      "version": null,
      "type": "added",
      "title": "Mobile Driver’s License Verification Service in Limited Early Access!",
      "description": "We’re excited to announce that the __Mobile Driver’s License Verification Service__ is now in __Limited Early Access__. \n\nAuth0’s Mobile Driver’s License (mDL) Verification Service enables customers to enrich user profiles with trusted information during signup and login flows as well as perform ad-hoc verification and validation checks. Additionally, utilizing a digital credential can streamline processes for businesses and financial institutions while allowing end-users more control over their information.\n\nWith this feature, customers can perform ad-hoc mDL verification requests or integrate them into their existing authorization flows with our Forms widget. This Early Access release only supports the [ISO/IEC TS 18013-7:2024](https://www.iso.org/standard/82772.html) standard and the REST API, also known as Web API, protocol.\n\nTo enable the Limited Early Access release in your Auth0 tenant, please review the available [documentation](https://auth0.com/docs/secure/mdl-verification) and if interested, please fill out [this](https://docs.google.com/forms/d/e/1FAIpQLScEZSizEo6prfnxg_8YvU3Pv0s6rwryEpjEZt_9X3vplQhXVQ/viewform) form to request access. We are limiting the number of customers for whom this will be enabled and will reach out to you with more details. If you have any feedback, give us a shout in our [community channel](https://community.auth0.com/)!"
    },
    {
      "id": "JSIvLDuIxl4Vvubx8g24r",
      "date": "2025-04-01",
      "displayDate": "April 1, 2025",
      "version": "v202512",
      "type": "added",
      "title": "Self-Service SSO - Domain Verification now in Early Access!",
      "description": "We’ve added Domain Verification to the Self-Service SSO workflow — making it easier and more secure for your customers to manage their SSO setup.\n\n__Simpified & Secure__\n\nYour customers can now verify domains directly within the Self-Service SSO wizard, reducing manual steps and ensuring only trusted domains are used for Home Realm Discovery (HRD). This strengthens security and eliminates the need for external verification workflows.\n\n__Flexible Configuration Options__\n\nAs a tenant admin, you have control over how domain verification is enforced when creating Self-Service SSO tickets:\n\n- Off – Domain verification is hidden from the wizard\n- Optional – Customers can choose to skip verification and still enable connections\n- Required – A domain must be verified before enabling the connection\n\nThis gives you the flexibility to balance user experience and security based on your customers' needs.\n\n![SS-SSO - Domain Verification](//images.ctfassets.net/kbkgmx9upatd/7ohB4piUd4mBs5P84ZfmPj/d2f8c2731e70ce06c884346fd9293d49/SS-DoVe.gif)\n\nLearn more about Self-Service SSO in the [product documentation](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO).\n\nBy using Self-Service SSO Domain Verification, you agree to the applicable Free Trial terms in  Okta’s Master Subscription Agreement and [Okta’s Privacy Policy](https://www.okta.com/privacy-policy/) during use of the Early Access feature. The Free Trial terms can be found within the Master Subscription Agreement at [https://www.okta.com/agreements](https://www.okta.com/agreements).\n"
    },
    {
      "id": "5APMrGt8hbiRvuDh6wJdKe",
      "date": "2025-04-01",
      "displayDate": "April 1, 2025",
      "version": null,
      "type": "added",
      "title": "New US Public Cloud Region (prod-us-5)",
      "description": "We are excited to announce that we are expanding our US public cloud offering with a brand new environment! prod-us-5 is a testament to our growth and provides a big capacity boost to onboard new Auth0 Public Cloud customers.\n\nThis new public cloud environment supports all the standard Auth0 Authentication and Management capabilities in a highly secure, resilient, and scalable deployment infrastructure. \n\nAll US Public Cloud customers who are using [IP allow list](https://auth0.com/docs/secure/security-guidance/data-security/allowlist \"IP Allowlist\") to permit outbound traffic from Auth0 are advised to update their firewall rules with the [latest info](https://auth0.com/docs/secure/security-guidance/data-security/allowlist#united-states \"Latest US IP Allowlist\") at their earliest convenience."
    },
    {
      "id": "3t61fp6lqBGWEWddiqCtwf",
      "date": "2025-04-01",
      "displayDate": "April 1, 2025",
      "version": "v202508",
      "type": "added",
      "title": "Self-Service SSO - UI Ticketing and Advanced SAML Configurations",
      "description": "Auth0 is excited to announce new enhancements to the Self-Service SSO experience:\n\n__Self-Service SSO Ticket Creation in the Dashboard__\n\nTenant admins can now generate SSO tickets directly from the Manage Dashboard, removing the need for API access. This update simplifies the process for all teams and makes it easier to experiment, configure, and roll out federated SSO integrations.\n\n__Enhanced SAML Configuration Options__\n\nTenant admins can now configure whether IdP-Initiated SSO is allowed at the time of ticket creation. Additionally, in the wizard, IT admins have the option to choose whether authentication requests should be signed, offering more flexibility and control to meet varying security and compliance needs.\n\n![SS-SSO Ticket Creation](//images.ctfassets.net/kbkgmx9upatd/6rDbZaEUdVhIFOVOVQ2Nfo/a928026562badbe95eec425d11835bc4/Ticket_UI.gif)\n\nThese updates enhance accessibility, security, and ease of use. Learn more about Self-Service SSO in the [product documentation](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO)."
    },
    {
      "id": "1wnn4u7KN4VNwN5fRYuHUc",
      "date": "2025-03-31",
      "displayDate": "March 31, 2025",
      "version": null,
      "type": "updated",
      "title": "Bot Detection Model Updated",
      "description": "We’ve updated our bot detection model to improve accuracy and keep up with evolving traffic patterns.\n\n- __Improved detection__: The new model is more effective at identifying and stopping bot activity.\n\n- __More computationally efficient__: Updated architecture enables more efficient decision-making.\n\n- __Trained on fresh data__: Reflects the latest trends in traffic to better spot malicious behavior.\n\nThis enhanced security capability is now available to all Enterprise customers with the __Attack Protection__ add-on. The rollout is currently underway and will be completed in the coming weeks, aligned with individual customer release schedules.\n\nFor details on activation or to learn more, please refer to our [documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or reach out to your account team. We are here to support you in protecting your systems against evolving threats."
    },
    {
      "id": "1at7TjSZUGT6hIJL8zTSn9",
      "date": "2025-03-31",
      "displayDate": "March 31, 2025",
      "version": "v202512",
      "type": "updated",
      "title": "Advanced Customizations for Universal Login (Early Access) - Organizations, and MFA TOTP and Password Reset Challenge, oh my!",
      "description": "We are excited to announce the next Early Access release of Advanced Customizations for Universal Login! This release adds support for building custom versions of Universal Login’s Organizations screens, the MFA TOTP screens, and the matching Reset Password Challenge factors all using the new ACUL SDK.\n\nAdvanced Customizations for Universal Login enables you to build custom, client-rendered interfaces for Universal Login screens, allowing you to control every pixel of your Universal Login experience. This release allows you to building custom versions of the following screens:\n* Accept Invitation\n* Organization Selection\n* Organization Picker\n* MFA OTP Enrollment QR\n* MFA OTP Enrollment Code\n* MFA OTP Challenge\n* Reset Password MFA OTP Challenge\n* Reset Password MFA Email Challenge\n* Reset Password MFA Push Challenge Push\n* Reset Password MFA SMS Challenge\n\n**DX Updates**\n\nThe latest versions of the ACUL SDK and our CDT tooling all include support for these new screens. \n* [Typescript SDK](https://github.com/auth0/universal-login/releases/tag/auth0-acul-js%400.1.0-beta.3) (includes a breaking change, see the [changelog](https://github.com/auth0/universal-login/blob/auth0-acul-js%400.1.0-beta.3/packages/auth0-acul-js/CHANGELOG.md#auth0-acul-js010-beta3-2024-03-28) for migration steps)\n* [Auth0 CLI](https://github.com/auth0/auth0-cli/releases/tag/v1.10.1)\n* [Deploy CLI](https://github.com/auth0/auth0-deploy-cli/releases/tag/v8.7.1)\n* [Terraform Provider Auth0](https://github.com/auth0/terraform-provider-auth0/releases/tag/v1.15.0)\n\nWe are well on our way to adding support for everything that Universal Login currently supports out of the box. Checkout our [online documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations) to learn more about ACUL and stay tuned to the Auth0 Changelog for updates and announcements!"
    },
    {
      "id": "3gR889G5ZwMqgn3r5UrmRA",
      "date": "2025-03-25",
      "displayDate": "March 25, 2025",
      "version": null,
      "type": "fixed",
      "title": "Improvements to the Reset Custom Provider Button Functionality",
      "description": "The Auth0 Dashboard allows customers to reset the code for a Custom Provider when they click the Reset button. Previously, this experience was different across Custom Email and Phone Provider in both the behavior of the button and the text displayed throughout the reset process. This behavior has been fixed, and now the reset functionality is consistent across both features. "
    },
    {
      "id": "3LCFto2kZe1vwS1j4NgUkq",
      "date": "2025-03-25",
      "displayDate": "March 25, 2025",
      "version": "v202511",
      "type": "added",
      "title": "Actions - Execution Error Logs",
      "description": "This feature gives developers better observability regarding Actions execution errors both at the Auth0 Dashboard and external Log Stream Platforms. \n\nHere's a summary of the key points:\n\n- __Execution Error Handling:__ The feature captures the unhandled Actions execution errors and facilitates them as Tenant logs.\n- __Event Log Type:__  There is a [new Event Log Type](https://auth0.com/docs/deploy-monitor/logs/log-event-type-codes \"actions_execution_failed\") regarding Actions execution errors that can be visualized at the Dashboard > Monitoring > Logs.\n- __Log Streams:__ The new event log type is also sent through Log Streams.\n- __Log Stream Filter:__ There is a [new Log Stream Filter](https://auth0.com/docs/customize/log-streams/event-filters#actions-event-filters \"Action Execution - Failure\") focused on Actions execution errors."
    },
    {
      "id": "1KZ2jueX8JSVlyGXCaWnB0",
      "date": "2025-03-25",
      "displayDate": "March 25, 2025",
      "version": null,
      "type": "updated",
      "title": "Event Streams for User Life Cycle Management -- Public Beta",
      "description": "Auth0 Customers have historically struggled to easily discover changes to the User Lifecycle (user create, updated or deleted), by relying on suboptimal solutions such as Actions or Logs.\n\nEvent Streams changes this: customers can now subscribe to [events](https://auth0.com/docs/deploy-monitor/events/event-types#user-event-types) that trigger each time there is a change in the User Lifecycle, regardless of the connection the customer was created, and route those events to either a [Webhook](https://auth0.com/docs/deploy-monitor/events/create-an-event-stream#webhooks) or [AWS EventBridge](https://auth0.com/docs/deploy-monitor/events/create-an-event-stream#aws-eventbridge).\n\nAuth0 is now accepting Beta Testers to this new feature.  See the [Auth0 Docs](https://auth0.com/docs/deploy-monitor/events) for further instructions."
    },
    {
      "id": "7jOPIpRJkZD6WIbD2rl9o1",
      "date": "2025-03-19",
      "displayDate": "March 19, 2025",
      "version": null,
      "type": "added",
      "title": "Japanese Language Support Added to Auth0 Dashboard and Docs",
      "description": "We’ve added a new language option-Japanese-to help our users in Japan and beyond build secure identity solutions more easily. If your language preference is set to Japanese in your browser settings, Auth0 will detect this and automatically serve the Dashboard and Documentation in Japanese. You can manually override this setting in the Auth0 Dashboard and Docs via the language switcher in the top-right corner."
    },
    {
      "id": "4zrZTaM42g4JonyoiSnllJ",
      "date": "2025-03-15",
      "displayDate": "March 15, 2025",
      "version": null,
      "type": "added",
      "title": "Swift Package Manger Support for Guardian SDK ",
      "description": "Integrating Auth0 Guardian into your iOS projects is now easier than ever with Swift Package Manager (SPM) support! With this update, you can seamlessly add Guardian authentication directly in Xcode—no manual setup required."
    },
    {
      "id": "1IOpDQG3mVWHqm0caRWaSo",
      "date": "2025-03-14",
      "displayDate": "March 14, 2025",
      "version": null,
      "type": "added",
      "title": "Credential Guard Now Available for Private Cloud on Azure Customers!",
      "description": " **Credential Guard** is now supported for Private Cloud on Azure customers! \n\n This enhancement brings:  \n\n- 🔍 **Proactive Threat Hunting** – A dedicated security team infiltrates criminal communities and gains access to breach data that isn’t otherwise available–enabling detection of compromised passwords within 12–36 hours instead of the traditional months\n- ⏱ **Faster Detection** – Detects breaches 250% faster than standard automated solutions \n- 🌍 **Expanded Coverage** – Automates breached password detection coverage in over **200+ countries and territories**, ensuring that users worldwide receive consistent, localized protection.  \n\nFor additional details and to learn how to enable **Credential Guard**, please view our online documentation [here](https://auth0.com/docs/secure/attack-protection/breached-password-detection#detect-breaches-faster-with-credential-guard).  "
    },
    {
      "id": "6WO1k5K2NkOOMAJfBzSicd",
      "date": "2025-03-13",
      "displayDate": "March 13, 2025",
      "version": "v202511",
      "type": "added",
      "title": "Custom Phone Providers and the Unified Phone Experience are now Generally Available!",
      "description": "We’re excited to announce that __Custom Phone Providers and the Unified Phone Experience__ are now Generally Available.\n\n__Custom Phone Providers__: With this feature, customers can configure custom phone providers and customize phone messages not only when leveraging phone number as an identifier, but also when using MFA and Passwordless! Auth0’s CI/CD tooling (Auth0 CLI, Deploy CLI, and Terraform Provider) now fully supports Custom Phone Providers. To access these new capabilities, upgrade to the latest versions of Auth0 CLI, Deploy CLI, and Terraform Provider.\n\nWe encourage you to get started with Custom Phone Providers today by checking out our [documentation](https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers/configure-a-custom-phone-provider) and if you have any feedback, give us a shout in our [community channel](https://community.auth0.com/)!\n\n__Unified Phone Experience__: The Unified Phone Experience offers a consolidated experience where you can configure a tenant-level phone provider that will be used for Phone as ID, MFA, and Passwordless flows. Additionally, the management of phone templates will be centralized on a single page. This unification aims to reduce redundancy across Auth0 features and present a more streamlined user experience. The unified experience will be the default for any new tenants created after this release, and existing tenants will have the ability to revert to the legacy experience if desired.\n\nWe encourage you to try out the new Unified Phone Experience and provide feedback and questions to us through our [community channel](https://community.auth0.com/). Information on how to migrate to the new experience can be found [here](https://auth0.com/docs/customize/phone-messages/unified-phone)."
    },
    {
      "id": "74c2uLl6e8lqQIxStziaLo",
      "date": "2025-03-11",
      "displayDate": "March 11, 2025",
      "version": null,
      "type": "added",
      "title": "Breached Password Detection for Password Reset Flows is Now Available!",
      "description": "We're improving both account security and user experience by extending **Breached Password Detection** to the **password reset flow**.  \n\n#### 🔹 What’s New?  \nPreviously, users could unknowingly reset their passwords to compromised credentials, creating security risks and potentially requiring another reset. \n\nWith this update, you can now prevent users from setting their password to a known breached credential during the reset flow -just like during sign-up and login.  \n\nAdditionally, with this rollout we have also **increased coverage** of Breached Password Detection on Sign-Up to cover the **Management API**!\n\n#### 🚀 Benefits  \n\n**Stronger security** – Protects against compromised credentials at every stage.\n\n **Better user experience** – Avoids unnecessary password resets by blocking breached passwords upfront.  \n\nThis update helps prevent your users from using known compromised credentials throughout their password lifecycle, giving your users stronger security on their accounts.   \n\nFor additional details and to learn how to enable **Breach Password Detection on Password Reset Flows**, please view our online documentation [here](https://auth0.com/docs/secure/attack-protection/breached-password-detection).  \n"
    },
    {
      "id": "5eI6NDpHUh2NMfJ1Qq9jJ3",
      "date": "2025-02-26",
      "displayDate": "February 26, 2025",
      "version": "v202508",
      "type": "added",
      "title": "Node Module Compatibility Check for Custom Database",
      "description": "This feature allows developers to ensure their custom database scripts are compatible with specific Node.js runtime versions. \n\nHere's a summary of the key points:\n\n- __Bulk Testing Compatibility:__ The feature can test the compatibility of custom database scripts with different supported Node.js runtime versions.\n- __Database Connections Limit:__ It is available if your tenant has 1 to 10 database connections with custom database scripts enabled.\n- __Navigation Path:__ The feature can be accessed by going to Tenant Settings → Advanced → Extensibility → Verify Custom DB Scripts.\n\n__Actions Based on Results:__ After testing, the results can be verified and corrective actions can be taken if any compatibility issues are identified.\n\nCheckout our online documentation to learn more about [Extensibility Tenant Settings](https://auth0.com/docs/get-started/tenant-settings#extensibility \"Extensibility Tenant Settings\")!\n"
    },
    {
      "id": "4AFBdU3hLHE0bL1pIUCFVQ",
      "date": "2025-02-24",
      "displayDate": "February 24, 2025",
      "version": "v202508",
      "type": "updated",
      "title": "Advanced Customizations for Universal Login (Early Access) now with MFA Support!",
      "description": "We are excited to announce the next Early Access release of Advanced Customizations for Universal Login! This release adds support for building custom versions of Universal Login’s MFA enrollment screens and 3 of our most common MFA factors using the new ACUL SDK. \n\nAdvanced Customizations for Universal Login enables you to build custom, client-rendered interfaces for Universal Login screens, allowing you to control every pixel of your Universal Login experience. This release allows you to building custom versions of the following screens:\n\n* MFA Detect Browser Capabilities\n* MFA Begin Enroll Options\n* MFA Enroll Result\n* MFA Login-options\n* MFA Email List\n* MFA Email Challenge\n* MFA Country Codes\n* MFA SMS Enrollment\n* MFA SMS List\n* MFA SMS Challenge\n* MFA Push Welcome\n* MFA Push Enrollment QR\n* MFA Push List\n* MFA Push Challenge Push\n\nWe are well on our way to adding support for everything that Universal Login currently supports out of the box. Checkout our [online documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations) to learn more about ACUL and stay tuned to the Auth0 Changelog for updates and announcements!"
    },
    {
      "id": "6y3ocHXDsxHZLQ5LN8xSgw",
      "date": "2025-02-19",
      "displayDate": "February 19, 2025",
      "version": null,
      "type": "deprecated",
      "title": "Node.js 12 and 16 Extensibility Runtimes",
      "description": "We have deprecated the Node.js 12 and 16 extensibility runtimes in all environments and recommend using the Node.js 22 runtime for your extensibility integrations (such as Actions, Rules, Hooks, Custom Database Connections, and Custom Social Connections).\n\nWe have provided additional information and timelines for removing the deprecated runtimes through a dashboard and support center notification."
    },
    {
      "id": "YNknZt7wie7qPAZBfehXu",
      "date": "2025-02-12",
      "displayDate": "February 12, 2025",
      "version": "v202507",
      "type": "deprecated",
      "title": "Unwarranted session removal after Management API user updates",
      "description": "We have deprecated the invalidation of user sessions when performing database connection user update (PATCH - `/api/v2/users/{id}`) requests where:\n* The `email` or `email_verified` attributes are set to an unchanged value;\n* The `email_verified` attribute is set to a `true` value.\n\nThese changes allow for consistent behavior between setting an email as verified through the Management API and the built-in email verification flows provided by the service. In addition, it improves the overall end-user experience by avoiding session invalidation in situations that do not require it, such as setting either the `email` or `email_verified` attributes to unchanged values.\n\nThe dashboard will be updated with a migration toggle to opt out of the deprecated behavior ahead of its future end-of-life; we have provided additional information and timelines for enforcing this change through a [dashboard and support center notification](https://manage.auth0.com/#/notifications/67ab8c121f5c740896fcfd19).\n"
    },
    {
      "id": "xAFUkGxOSC5aO3IoVBIyL",
      "date": "2025-02-11",
      "displayDate": "February 11, 2025",
      "version": "v202507",
      "type": "added",
      "title": "Usage Metrics Dashboard for Okta FGA",
      "description": "We are excited to introduce the Usage Metrics Dashboard in Okta Fine-Grained Authorization (FGA), providing customers with deeper visibility into their authorization usage. This new dashboard, available under the “Manage Account” section of the Okta FGA dashboard, helps teams monitor, analyze and manage their FGA consumption efficiently.\n\nWhat’s New? \n## \n- __Monitor Key Metrics__: Track Monthly Active Users (MAUs), Total Tuple Count, and Monthly Average Requests Per Second (RPS).\nTime Frame Selection: View trends over the Last Month or Last 3 Months, with the current month’s data always included for the latest insights.\n\n- __Granular Data Views__: Click on “View Table” option to see a detailed breakdown of usage by store and time period.\n- __Hourly Updates__: Data is refreshed hourly to help you make informed decisions.\n\nLearn More:\n## \nCheck out the [documentation](https://docs.fga.dev/intro/dashboard#usage-metrics-dashboard) for details on how to use the dashboard effectively."
    },
    {
      "id": "2znS0wuMXkUc6FpVWbzZN8",
      "date": "2025-02-11",
      "displayDate": "February 11, 2025",
      "version": null,
      "type": "added",
      "title": "Optimized TOTP Enrollment for Mobile Devices",
      "description": "End User TOTP enrollment for Native devices is now more intelligent! For end users enrolling into a TOTP factor on a mobile device, Auth0 skips the QR code and prompts for manual code entry with the QR code as a fall back option. Check out [Auth0 Temporary OTP](https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian#temporary-one-time-passwords) for more detail! "
    },
    {
      "id": "5wjT8AZCChc2zGWBC3UlMa",
      "date": "2025-02-10",
      "displayDate": "February 10, 2025",
      "version": "v202506",
      "type": "updated",
      "title": "Email OTP Verification is Now Generally Available",
      "description": "__Email OTP Verification__ is now __Generally Available (GA)__, minor improvements will continue to roll out over the next __1-4 weeks__ to enhance performance and usability.\n\nWith __Email OTP Verification__, users are required to enter a One-Time Password (OTP) sent to their email during the signup or password reset process. This ensures email verification happens __before__ account creation or password reset is completed, offering enhanced security and reducing the chances of mistyped or fake email accounts.\n\n__Key Highlights:__\n\n- __Synchronous Email Verification:__ Prevents account creation or password reset until users verify their email via OTP.\n- __Improved Security:__ Helps prevent fake accounts, ensures accurate email addresses, and discourages phishing through email links.\n- __Applicability:__ Available for both email verification during signup and password reset challenges.\n\n__Prerequisites:__\n\n- Must be using __Universal Login__.\n- Connection must have __Flexible Identifiers__ enabled.\n- Email OTP is only compatible when using the __Identifier First Authentication Profile__.\n\nTo enable this feature, navigate to the __Attributes__ tab on any connection and change the __Verification Method__ under the __Email__ attribute settings from __Verification Link__ to __OTP__."
    },
    {
      "id": "kR21qiOZkM2jAlFDaId7D",
      "date": "2025-02-06",
      "displayDate": "February 6, 2025",
      "version": "v202505",
      "type": "added",
      "title": "Advanced Customizations for Universal Login (Early Access) is launching today!",
      "description": "At Auth0, we understand that no two customer identity stories are the same.  Every company has a brand identity, a secret sauce, and a unique aesthetic vision. Today, we are very excited to introduce the next evolution in customization for Universal Login, **Advanced Customizations for Universal Login** (ACUL). ACUL enables your team to build custom, client-rendered versions of each Universal Login screen, allowing you to control every pixel of the Universal Login experience. \n\n![ACUL EA Changelog Banner](//images.ctfassets.net/kbkgmx9upatd/4V3J8NkWmXn3N2QEVAziPS/b5f9c49522471014ed26205bbf411c8b/ACUL-Changelog.jpg)\n\nThis Early Access release of ACUL is available to all paid customers. Public cloud customers can start using it today! Those on private cloud will be enabled as part of their regular release cycle. This initial EA release provides a new configuration API, CDT and SDK support, and allows you to build custom versions of the following screens:\n* Login\n* Login Id\n* Login Password\n* Login Passwordless Email Code\n* Login Passwordless SMS OTP\n* Signup\n* Signup Id\n* Signup Password\n* Passkey Enrollment\n* Passkey Enrollment Local\n* Phone Identifier Enrollment *(used for identity verification during Signup)*\n* Phone Identifier Challenge *(used for identity verification during Signup)*\n* Email Identifier Challenge *(used for identity verification during Signup)*\n* Interstitial Captcha\n* Reset Password\n* Reset Password Email\n* Reset Password Request\n* Reset Password Error\n* Reset Password Success\n\nThe following flows and capabilities are supported in ACUL EA:\n\n* Single step Signup & Login with password and social & enterprise connections\n* [ID First Signup/Login](https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first) using password, passwordless email/SMS OTP, passkeys, and social & enterprise connections\n* Basic Reset Password flow with and without Bot Detection\n* [Flexible Identifiers](https://auth0.com/docs/authenticate/database-connections/activate-and-configure-attributes-for-flexible-identifiers) with and without identity verification enabled during Signup\n* [Bot detection](https://auth0.com/docs/secure/attack-protection/bot-detection) with any of our 7 supported Captcha providers during the Signup, Login, and Reset Password flows\n* Capturing additional data during Signup and Login using [custom prompts](https://auth0.com/docs/customize/login-pages/universal-login/customize-signup-and-login-prompts)\n\nThis is just the beginning! In the coming months, we will be adding support for every screen and capability that Universal Login currently supports out of the box, a shiny new Dashboard UI for configuring ACUL, and lots more DX goodness!\n\nCheckout our [online documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations) to learn more about ACUL and stay tuned to the [Auth0 Changelog](https://auth0.com/changelog) for updates and announcements!"
    },
    {
      "id": "3vAOS1iFG0OAu7uRPmAvYd",
      "date": "2025-02-06",
      "displayDate": "February 6, 2025",
      "version": "v202506",
      "type": "added",
      "title": "Custom Token Exchange now available in Early Access",
      "description": "We are thrilled to announce the Early Access release of Custom Token Exchange. __Enterprise customers__ can now request access to use this feature.\n\nToken Exchange is an OAuth grant-type that enables the exchange of security tokens for other security tokens, typically access_tokens. Custom Token Exchange provides a flexible __solution using Actions that allows customers to provide their custom logic to control the exchange__ - i.e. effectively providing the means to implement custom authentication semantics using Actions.\n\n![Custom_Token_Exchange_EA_Action](https://cdn.auth0.com/blog/Custom_Token_Exchange_EA_Changelog.png)\n\nThis __added flexibility__ can be used by customers to tackle __advanced integration use cases__, such as:\n- Seamlessly migrating users to Auth0\n- Integrating external IDPs\n- Exchanging Auth0 tokens for a different audience\n- ... and other use cases where regular federation and/or OIDC flows are not an option\n\nTo learn more, read our [documentation](https://auth0.com/docs/custom-token-exchange-early-access).\n\nReach out to you Auth0 contact to request access!"
    },
    {
      "id": "5bDyvep4pSfmGPIqLbpiBF",
      "date": "2025-02-03",
      "displayDate": "February 3, 2025",
      "version": null,
      "type": "added",
      "title": "New Private Cloud Region in India",
      "description": "Auth0 is delighted to introduce __Hyderabad__ as the latest AWS region for Private Cloud deployments.\n\nHyderabad follows Mumbai as the __second AWS region for Auth0 Private Cloud available in India!__ This new addition unlocks reduced latency and increased flexibility for Auth0 deployments on AWS. We stand committed to meeting our customers’ data residency and resiliency needs in an ever expanding global market."
    },
    {
      "id": "77VW39HIqFeKgp8R3I97Q2",
      "date": "2025-01-31",
      "displayDate": "January 31, 2025",
      "version": null,
      "type": "added",
      "title": "New Access Controls for Okta FGA Using Per-Module Authorization",
      "description": "We are excited to introduce the Per-Module Authorization feature. This enables large organizations to securely share authorization models by specifying which application credentials can update data for specific modules.\n\nTeams that are responsible for their own separate services can now limit access to modification of authorization data on a per-module basis. Last year, we released [Modular Models](https://docs.fga.dev/modeling/modular-models), where a single model could be separated into modules across multiple files, allowing teams to use features in their source code management platforms (such as GitHub’s [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) feature) to enforce access on who can modify parts of a model.\n\nPer-Module Authorization builds on top of that work to further define permissions for applications. Workflows can be implemented where different teams maintain their portion of an FGA model independently and also ensure that the services and applications owned by the respective teams can only modify their own authorization data.\n\nFor more details, refer to Okta FGA’s [documentation](https://docs.fga.dev/intro/dashboard#grant-authorized-clients-access-to-write-specific-modules) on how to grant client credentials access to only specific modules.\n"
    },
    {
      "id": "5dsLx6mbN14AVGiiMq13CJ",
      "date": "2025-01-31",
      "displayDate": "January 31, 2025",
      "version": "v202505",
      "type": "added",
      "title": "Okta Universal Logout Integration Now Supported in Auth0",
      "description": "We’re thrilled to announce that Auth0 now supports Universal Logout integration with Okta Workforce Identity Cloud!\n\nOkta Universal Logout is based on the [Global Token Revocation](https://www.ietf.org/archive/id/draft-parecki-oauth-global-token-revocation-04.html) specification and allows security incident management tools [Okta Identity Threat Protection](https://www.okta.com/products/identity-threat-protection/) to send back-channel requests to revoke users' sessions and refresh tokens when they identify a change in risk.\n\nWith this feature, Auth0 customers federating with Okta Workforce Identity using the [Okta](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta), [SAML](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/saml), or [OpenID Connect](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/oidc) connection types no longer need to build a global token revocation endpoint. Instead, with minimal configuration required, they can provide the Okta admin with Auth0’s connection-specific endpoint URL.\n\nThis integration provides security benefits for apps that depend on refresh tokens and Auth0 sessions, as both are revoked when Auth0 receives a Universal Logout request for a user. This integration can also trigger Auth0's OIDC back-channel logout feature to terminate custom application sessions.\n\nTo learn more about Universal Logout support in Auth0, click [here](https://auth0.com/docs/authenticate/login/logout/universal-logout).\n\nThis feature will be rolled out to all public cloud environments over the next few days and to private cloud environments as per their release pipeline.\n"
    },
    {
      "id": "4ySJSSzRRpM4X46Wmw4xgl",
      "date": "2025-01-31",
      "displayDate": "January 31, 2025",
      "version": "v202505",
      "type": "added",
      "title": "Enhanced Rate Limit Reporting",
      "description": "Customers now have Enhanced Rate Limit Reporting via Logs, including:\n- Increased Rate Limit Log (api_limit) Publishing Frequency:  receive 1X per minute notifications indicating when you have exhausted a rate limit.\n- New Rate Limit Warning Log (api_limit_warning):  receive 1X per minutes notifiactions indicating when you have exhuasted 80% of your rate limit request token allocation.\n- Enhanced Logs Schema:  additional attributes of HTTP path and method and bucket size will be included to allow for easier mapping between Logs and API Rate Limit Configuration Docs.  https://auth0.com/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/rate-limit-configurations"
    },
    {
      "id": "67eu2QraEWdl35ncWI4juN",
      "date": "2025-01-30",
      "displayDate": "January 30, 2025",
      "version": null,
      "type": "updated",
      "title": "Introducing Next.js SDK v4 (GA)",
      "description": "We are excited to announce the next major version of Next.js SDK. With the introduction of [nextjs-auth0 v4](https://github.com/auth0/nextjs-auth0), we now support Next.js 15 and React 19, allowing developers to leverage the latest features and improvements in both frameworks. \nThis compatibility not only enhances the development experience but also ensures that applications can take full advantage of performance optimizations. This updated SDK features a simplified architecture and is edge-compatible by default, enhancing performance and flexibility for developers. \n\nWhat’s new: \n- __Middleware-Based Authentication:__ Improved compatibility and reduced maintenance by moving to middleware-based handlers.\n- __Enhanced Security:__ Switched to encrypted cookies and removed outdated cookie logic.\n- __Resolved State Mismatch Issues:__ Fixed long-standing issues reported by the community.\n- __Improved Session Management:__ Implemented rolling sessions and eliminated cookie chunking.\n- __Improved Hooks and Helpers:__ Introduced useUser(), getAccessToken(), and getSession() for easier data fetching and session handling.\n- __Stateful Sessions with Custom Databases:__ Support for \"Bring Your Own Database\" (BYODB).\n- Compatibility with __Next.js 15__, __Turbopack__, and __React 19__\n- __Simplified architecture__, API, and configuration options\n\nLearn More:\n- [Quickstart](https://auth0.com/docs/quickstart/webapp/nextjs/interactive)\n- [Migration Guide](https://github.com/auth0/nextjs-auth0/blob/v4/V4_MIGRATION_GUIDE.md)"
    },
    {
      "id": "12QGektcPla7VCIHBuPZbq",
      "date": "2025-01-28",
      "displayDate": "January 28, 2025",
      "version": null,
      "type": "updated",
      "title": "Update to Default From Email Address for Supported Email Providers!",
      "description": "__What’s Changing:__\nWe are improving the Dashboard configuration experience for email providers. The default From address field will be required when creating or updating email provider configuration through the Dashboard. Customers do not need to take immediate action, and the Management API will maintain the field as optional for backward compatibility.\n\n__Key Dashboard Updates:__\n\n1. __Configuring New Email Providers__: Customers must supply a default From address when configuring a new email provider.\n2. __Changing Existing Email Providers__: Customers must supply a default From address when updating an existing email provider. Existing configured email providers that do not have a From address configured will continue to work as before.\n\n__Why This Matters__: An email provider configured without a default From address may lead to a poor user experience because email template customizations are not supported when a customer-defined From address is unavailable. By requiring a default From address at the email provider level, email template customizations will be respected even if the email template does not have a template-specific From address.\n\n__Rollout Timing__: We plan to roll out this change in the coming days. After the rollout, customers can expect to see the enforcement of this required field on the Dashboard."
    },
    {
      "id": "uSkXYIKdBmyqPrVYGiy7O",
      "date": "2025-01-23",
      "displayDate": "January 23, 2025",
      "version": null,
      "type": "added",
      "title": "Custom Email Providers is now Generally Available!",
      "description": "We’re excited to announce that __Custom Email Providers__ is now __Generally Available__.\n\nWith this feature, customers can configure custom email providers and customize emails so they can have full control of the email delivery process. This feature utilizes the Actions framework and leverages the Actions Code Editor so you can more completely manage, monitor, and troubleshoot your email communications. Auth0’s CI/CD tooling (Auth0 CLI, Deploy CLI, and Terraform Provider) now fully supports Custom Email Providers. To access these new capabilities, upgrade to the latest versions of Auth0 CLI, Deploy CLI, and Terraform Provider.\n\nWe encourage you to get started with Custom Email Providers today by checking out our [documentation](https://auth0.com/docs/customize/email/configure-a-custom-email-provider) and if you have any feedback, give us a shout in our [community channel](https://community.auth0.com/)!"
    },
    {
      "id": "2IqqBG3BK3I106CUNaH67Z",
      "date": "2025-01-21",
      "displayDate": "January 21, 2025",
      "version": "v202504",
      "type": "added",
      "title": "Actions - Real-time Logs (Beta)",
      "description": "This Beta feature logs in real-time output form your custom Actions code. This includes all console.log output and exceptions.\n\nFor example, a custom Action code such as below:\n\n    console.log(\"Hello world!\");\n\nWill show up within Dashboard > Monitoring > Actions Logs as\n\n![Actions Real Time logs](//images.ctfassets.net/kbkgmx9upatd/6v7b2XDiOVFXJa1haVksyR/96d19473a46441c432e6997d5594a06f/Screenshot_2025-01-20_at_5.19.02_PM.png)\n\nYou can also use examples such as below to catch and log errors for making it easy to debug and troubleshoot your Actions.\n\n    try {\n      nonExistentFunction();\n    } catch (error) {\n      console.error(error);\n      // Expected output: ReferenceError: nonExistentFunction is not defined\n      // (Note: the exact output may be browser-dependent)\n    }\n\nThese logs are not stored and are only available within the dashboard when you are logged in and are on the Dashboard > Monitoring > Actions Logs tab within the browser. These logs are designed to help you troubleshoot as you write or modify your custom Actions code."
    },
    {
      "id": "3ZrVbbCnPj73zLAtsYJ2DT",
      "date": "2025-01-16",
      "displayDate": "January 16, 2025",
      "version": "v202503",
      "type": "added",
      "title": "Node 22 for Actions & other features",
      "description": "Node.js 22 is now generally available (GA) as a runtime for your extensibility integrations (such as Actions, Rules, Hooks, Custom Database Connections etc).\n\nNew Actions created will now default to Node 22 as the runtime. As part of this release, we have also split runtime selection for Legacy Extensibility (for Rules & Hooks) separate from the general Extensibility (for Custom Database Scripts & Custom Social Connections). These setting are available within [Tenant > Settings > Advanced](https://manage.auth0.com/#/tenant/advanced) and allows you to individually manage desired runtime configuration as required.\n\n![Extensibility Runtime](//images.ctfassets.net/kbkgmx9upatd/64aCyAYo4gSPYJmQ9pM3o0/c6952971e36570f1552b91283bb976c0/Screenshot_2025-01-10_at_12.32.07_PM.png)\n\nPlease [refer to our docs](https://auth0.com/docs/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-nodejs-22) for more details on how to migrate to Node 22.\n"
    },
    {
      "id": "6x1jrek8o6B0jawVrMf4Lz",
      "date": "2025-01-08",
      "displayDate": "January 8, 2025",
      "version": "v202451",
      "type": "added",
      "title": "Client-Initiated Backchannel Authentication (CIBA) flow is now available in Early Access",
      "description": "We are delighted to announce that support for the Client-Initiated Backchannel Authentication (CIBA) flow is now available in Early Access. \n\nThe CIBA flow works as a *decoupled authentication flow* across two different devices: \n- Consumption device: initiates the authentication request.\n- Authentication device: handles end-user authentication, implemented as a custom mobile app which embeds the Guardian mobile SDK.\n\nThe CIBA flow supports a number of powerful use cases driven by backend client applications, such as: \n\n- Customer authentication by headless devices or devices with limited interaction capabilities. \n- Customer authentication in call centre scenarios.\n- Authorising sensitive operations on behalf of yourself or a third-party e.g. a customer service agent.  \n\nTo evaluate CIBA for securing your sensitive customer interactions, contact your Technical Account Manager. For more details, check out our [product documentation](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-initiated-backchannel-authentication-flow)."
    },
    {
      "id": "3q3spQ0gy65bD3TfJ0H4Pk",
      "date": "2025-01-06",
      "displayDate": "January 6, 2025",
      "version": "v202451",
      "type": "updated",
      "title": "Organization ID is now available in \"Successfully revoked a refresh token\" logs",
      "description": "We’ve added the **Organization ID** to the [Auth0 Tenant Logs](https://auth0.com/docs/deploy-monitor/logs/log-event-type-codes) for the **Successfully revoked a refresh token (srrt)** event. This enhancement allows you to correlate the organization associated with the revoked refresh token for improved tracking and auditing.\n"
    },
    {
      "id": "6dU1z4kaQGtbpwBAREKPni",
      "date": "2024-12-24",
      "displayDate": "December 24, 2024",
      "version": "v202450",
      "type": "updated",
      "title": "Actions secret value length increased",
      "description": "We have increased the max secret value length from 2048 to 4096 to allow for larger secrets to be stored within Actions.\n\n![Actions Secrets](//images.ctfassets.net/kbkgmx9upatd/52TGNtKI3IvOndGaRrRZeE/8798f00f8f923d287cfcadd854e6f632/Screenshot_2024-12-20_at_12.09.07_PM.png)\n\nYou can [refer to our docs](https://auth0.com/docs/customize/actions/limitations) for further details on Actions limitations."
    },
    {
      "id": "vORFD5pVfw1XjRZJPrig7",
      "date": "2024-12-20",
      "displayDate": "December 20, 2024",
      "version": null,
      "type": "added",
      "title": "New high performance tier for Private Cloud on AWS",
      "description": "We're excited to introduce the new 10,000 RPS (100x) tier for Auth0 Private Cloud Performance offering on AWS. This enhanced tier supports a higher volume of authentication requests, complementing the existing 30x and 60x tiers for customers who need high performance thresholds.\n\nPlease see [Private Cloud documentation](https://auth0.com/docs/deploy-monitor/deploy-private-cloud/private-cloud-on-aws) to learn more."
    },
    {
      "id": "5oIM2qgfSDZaSno8B0mhri",
      "date": "2024-12-18",
      "displayDate": "December 18, 2024",
      "version": null,
      "type": "added",
      "title": "Bot Detection ML Model for Signup Attack Detection Now Available for Classic and Custom Login",
      "description": "The new Bot Detection ML model designed to detect signup attacks is now available for Classic Login and Custom Login implementations. \n\nFor customers using Classic or Custom login experiences, this enhancement leverages advanced machine learning to identify and block automated signup attacks effectively.\n\nFor those using New Universal Login, no configuration changes are required. This feature was rolled out for New Universal Login in September, as highlighted in the changelog [here](https://auth0.com/changelog#7o1YXe52Gl7jEYENzFikEn).\n\nBelow is the demo showcasing how to enable this feature in Auth0 for Classic and Custom Login experiences.\n\n![](https://cdn.auth0.com/blog/bot_detection_signup_classic.gif)\n\nThis enhanced security capability is now available to all Enterprise customers with the Attack Protection add-on. The rollout is underway and will be completed in the coming weeks, aligned with individual customer release schedules.\n\nFor details on activation or to learn more, visit our [documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or reach out to your account team. We’re here to support you in protecting your systems against evolving threats."
    },
    {
      "id": "4ho5yIJq5H1W4nzGbrqcgT",
      "date": "2024-12-18",
      "displayDate": "December 18, 2024",
      "version": null,
      "type": "added",
      "title": "Resilience enhancement - Private Cloud space restoration (Early Access)",
      "description": "Auth0 is pleased to announce the Early Access (EA) of enhanced support for customer data recovery. This resilience feature is available to a set of Private cloud customers during EA. It would come handy in the event of customer data loss or data corruption, and would assist customers in meeting regulatory requirements such as European Union’s Digital Operational Resilience Act (DORA).\n\nCustomer will be able to request restoration of their production Private Cloud space from a backup within the past 14 days. Please refer to [Operational policies](https://auth0.com/docs/troubleshoot/customer-support/operational-policies) documentation for details."
    },
    {
      "id": "1JYqRsMZrhOFfnkDOIwv6R",
      "date": "2024-12-18",
      "displayDate": "December 18, 2024",
      "version": null,
      "type": "added",
      "title": "Security Center Alerts for Thresholds - Early Access",
      "description": "Introducing a new capability within the Security Center Dashboard offering - __Security Center Alerts for Thresholds__ Early Access. This new feature expands on the Security Center metrics and Thresholds to allow Enterprise customers to not only monitor their tenant security but also receive notifications when a threat metric exceeds their predefined thresholds. \nCustomers can now configure __webhook alert notifications__ on security threat metrics and monitor when threats exceed the acceptable value.  \n\nTo learn more Alerts for Thresholds, click [here](https://auth0.com/docs/secure/security-center/security-alerts)"
    },
    {
      "id": "5vaUFTqeuw5MB3mYskvU45",
      "date": "2024-12-17",
      "displayDate": "December 17, 2024",
      "version": null,
      "type": "updated",
      "title": "Introducing Newly Styled Customizable Email Templates!",
      "description": "We’re excited to announce that all __Customizable Email Templates__ have been styled with a modern look and feel and are now __live__!\n\nNo verbiage or content has been changed on any of the emails and customers that have customized the email templates are unaffected.\n![email-changelog (1)](//images.ctfassets.net/kbkgmx9upatd/yf5zzwtlmroz8fJnwLjJ8/86ee375e78af87f9f8396c3a761ce23e/email-changelog__1_.png)"
    },
    {
      "id": "2bUwE7f6OMP2XZXGbnqrUf",
      "date": "2024-12-13",
      "displayDate": "December 13, 2024",
      "version": null,
      "type": "added",
      "title": "Auth0 Teams - Add SSO Connections (Beta)",
      "description": "Single Sign On (SSO) allows one set of credentials to access multiple resources through a centralized identity provider (IdP). Auth0 Teams security policies allows team owners to configure and implement authentication rules that adhere to their organization's IT security policies for access to infrastructure systems or applications.\n\nAnnouncing in beta the ability for team owners to self-configure and connect their IdP to provide SSO for dashboard administrators.\n![Teams SSO Add connection](//images.ctfassets.net/kbkgmx9upatd/3PuPyW9iDKrkP3SLUwLtoD/abba1c539a82e21f6c816181a7f5b7b5/Teams_SSO_Connection.png)\n\nAuth0 Teams Self-Service SSO beta is currently limited to Public Cloud Enterprise customers.\n\nInterested in the BETA? Reach out to your Technical Account Manager to enrol in our beta program."
    },
    {
      "id": "1Yusq2sGxZU8e0ek2VQKfK",
      "date": "2024-12-13",
      "displayDate": "December 13, 2024",
      "version": null,
      "type": "updated",
      "title": "Auth0 Dashboard Session Management - GA",
      "description": "Announcing General Availability of Auth0 Dashboard Login Session Management. A feature that allows Auth0 Dashboard admins to view and revoke active dashboard sessions for an added layer of security to the session idle timeout for both our Public and Private Cloud customers.\n![Login Sessions GA](//images.ctfassets.net/kbkgmx9upatd/4tUA2Mrw5apASWkV0tie9X/decdfc0e939b6bb95b7a4a7d84824379/Login_Sessions.png)\n\nClick [here](https://auth0.com/docs/get-started/dashboard-profile/auth0-dashboard-login-session-management) to learn more about Auth0 Dashboard Login Session Management."
    },
    {
      "id": "4cxBs6aYqPxuXS5BErj2SQ",
      "date": "2024-12-12",
      "displayDate": "December 12, 2024",
      "version": "v202450",
      "type": "added",
      "title": "Increased Organization Metadata Slots",
      "description": "We’re excited to announce that we’ve __increased the number of metadata slots for Organizations from 10 to 25__! This enhancement provides you with more flexibility to store and manage additional data within your organization, enabling a more customized and efficient approach to your workflows.\n\nTo learn more about Organizations, click [here](https://auth0.com/docs/manage-users/organizations)."
    },
    {
      "id": "166ZJIqF1s245oGxE0LbDX",
      "date": "2024-12-11",
      "displayDate": "December 11, 2024",
      "version": "v202450",
      "type": "added",
      "title": "Customer Managed Keys is now Generally Available",
      "description": "We are delighted to announce that Customer Managed Keys is now generally available. This solution within the Highly Regulated Identity solution suite enables organizations to comply with cryptographic key-related security policies for data protection. Customer Managed Keys provides customers with two options for key management: Control Your Own Key and Bring Your Own Key. \n\nWith Control Your Own Key, you can manage the lifecycle of the Tenant Master Key according to your security policy. Bring Your Own Key allows you to maintain ownership of the Root Key that protects the encryption key hierarchy. These features enable compliance with cryptographic key-related security policies for data protection.\n\n![](https://cdn.auth0.com/blog/cmk_byok.gif)\n\nYou can read more about this in our [product documentation](https://auth0.com/docs/secure/highly-regulated-identity/customer-managed-keys)."
    },
    {
      "id": "C6DchsoFTLQF1kDyuyKnD",
      "date": "2024-12-10",
      "displayDate": "December 10, 2024",
      "version": null,
      "type": "added",
      "title": "New API command within Password Reset / PostChallenge Action Trigger",
      "description": "We added a new API command available in the Password Reset / PostChallenge trigger.  This API allows Tenant Developers to specify the url to redirect a user to upon the completion of a password reset on Universal Login.  \n\nHere is an example of using the command to redirect the user to a sample url after a successful password reset: \n\n      exports.onExecutePostChallenge = async (event, api) => {\n        api.transaction.setResultUrl('https://yourapp.yourdomain.com/profile');\n      };\n\nYou can learn more in our [reference documentation.](https://auth0.com/docs/customize/actions/explore-triggers/password-reset-triggers/post-challenge-trigger/post-challenge-api-object)"
    },
    {
      "id": "4x71B72kxmb8KKeF7oBtHt",
      "date": "2024-12-10",
      "displayDate": "December 10, 2024",
      "version": null,
      "type": "added",
      "title": "New Batch Check API Endpoint for Okta FGA",
      "description": "We’ve introduced a new Batch Check endpoint to the Okta FGA API, allowing clients to batch multiple authorization checks into a single request. This enhancement reduces the network latency associated with previously needing to performing multiple Check API requests in parallel, resulting in faster and more efficient requests for applications with high authorization demands.\n\nFor more details, refer to the [Okta FGA Batch Check documentation](https://docs.fga.dev/integration/perform-check#03-calling-batch-check-api)."
    },
    {
      "id": "3d5bBhUBr9gq6l0OgMlIS",
      "date": "2024-12-09",
      "displayDate": "December 9, 2024",
      "version": "v202449",
      "type": "added",
      "title": "Bot Detection Enhanced with Additional Tenant-Level Signals",
      "description": "We’re thrilled to announce that our fourth-generation Bot Detection has been upgraded to incorporate additional aggregated tenant-level insights. This upgrade strengthens bot detection across both public and private cloud environments, providing a more precise and robust defense against malicious activity while ensuring a seamless and secure experience for all users. \n\nThis enhanced security capability is now available to all Enterprise customers with the Attack Protection add-on. The rollout is currently underway and will be completed in the coming weeks, aligned with individual customer release schedules. \n\nFor details on activation or to learn more, please refer to our [documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or reach out to your account team. We are here to support you in protecting your systems against evolving threats."
    },
    {
      "id": "44PDb6M3wb0Ah2S0lWaAzr",
      "date": "2024-11-28",
      "displayDate": "November 28, 2024",
      "version": "v202448",
      "type": "added",
      "title": "Self-Service SSO is now in General Availability (GA)",
      "description": "Auth0 is excited to announce that __Self-Service SSO__ is now in __General Availability__.\n\nOur Self-Service SSO feature is designed to simplify and streamline the administrative tasks that are essential for every B2B SaaS product. By equipping your business customers to configure their own Single Sign-On setups, we provide them with a seamless, intuitive experience—eliminating the need for complex IT involvement. This flexibility not only enhances security but also improves the overall user experience, giving businesses more control and agility while reducing overhead.\n\n![Self-Service SSO](//images.ctfassets.net/kbkgmx9upatd/1EJbNDGVayUGTvQ6ZAzmn3/5d703e2229d46a7ae70e5ce440961ee3/Self-Service_SSO_GA.gif)\n\nThis feature is available for B2B Professional, Enterprise and Enterprise Premium customers.\n\n[Click](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO) here to learn more. "
    },
    {
      "id": "2o4tKtDIj8rkVTLtPFVnMP",
      "date": "2024-11-18",
      "displayDate": "November 18, 2024",
      "version": null,
      "type": "updated",
      "title": "Announcing the Beta Release of nextjs-auth0 SDK v4 ",
      "description": "Hello everyone,\n\nWe're thrilled to announce the beta release of nextjs-auth0 SDK v4! This new version brings significant improvements, new features, and fixes to enhance your development experience.\n\n### Important Notice About v3\nAs we move forward, **we will not be updating v3 of the SDK to support Next.js 15**. This allows us to focus on v4, which offers a wealth of new features and improvements. This will also enable us to support future releases of Next.js faster and with more confidence. We understand this may pose challenges, and we're here to help.\n\nv3 will continue to receive critical security updates for 6 months after the GA of v4.\n\n### Highlights of v4 Beta\n- Middleware-Based Authentication: Improved compatibility and reduced maintenance by moving to middleware-based handlers.\n- Enhanced Security: Switched to encrypted cookies and removed outdated cookie logic.\n- Resolved State Mismatch Issues: Fixed long-standing issues reported by the community.\n- Improved Session Management: Implemented rolling sessions and eliminated cookie chunking.\n- Improved Hooks and Helpers: Introduced useUser(), getAccessToken(), and getSession() for easier data fetching and session handling.\n- Stateful Sessions with Custom Databases: Support for \"Bring Your Own Database\" (BYODB).\n- Compatibility with Next.js 15, Turbopack, and React 19\n- Simplified architecture, API, and configuration options\n\n### Try It Out and Provide Feedback\nWe invite you to explore the beta release and share your feedback to help us improve before the general availability release. We are currently targeting a general availability release by the end of December.\n\n**Beta Release:**[ v4.0.0-beta.3](https://github.com/auth0/nextjs-auth0/releases/tag/v4.0.0-beta.3)\n\n### Need Help with Migration?\nIf you encounter challenges migrating to v4, please don't hesitate to[ open an issue](https://github.com/auth0/nextjs-auth0/issues) and our team will assist you. We're committed to making the transition as smooth as possible.\n\nThank You for Your Support \n\nWe appreciate your understanding as we focus on making v4 the best it can be. Your feedback is invaluable, and we're here to support you every step of the way.\n\nHappy coding! 🚀\n\n— The Auth0 DX SDK Team"
    },
    {
      "id": "1xsQFhFAzHA8PAEUYO64H5",
      "date": "2024-11-18",
      "displayDate": "November 18, 2024",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Rules and Hooks are now read-only in Public Cloud",
      "description": "We have transitioned the Rules and Hooks features to a read-only mode in all public cloud environments as part of their [announced deprecation](https://auth0.com/docs/troubleshoot/product-lifecycle/deprecations-and-migrations#rules-and-hooks-deprecations) plan.\n\nYou can still disable, delete or re-enable an existing Rule or Hook. You can also add or remove Rules settings (for updating stored secrets) or Hook secrets but you will no longer be able to modify their script.\n\nIf this impacts you, our recommendation is to migrate to Actions. Refer to the following docs for more details:\n- [Migrate Rules to Actions](https://auth0.com/docs/customize/actions/migrate/migrate-from-rules-to-actions)\n- [Migrate Hooks to Actions](https://auth0.com/docs/customize/actions/migrate/migrate-from-hooks-to-actions) \n"
    },
    {
      "id": "fIOOykW0Bo8oGnweYsrpT",
      "date": "2024-11-14",
      "displayDate": "November 14, 2024",
      "version": "v202447",
      "type": "added",
      "title": "Self-Service SSO: Exciting Updates",
      "description": "Auth0 is excited to announce the following updates to Self-Service SSO:\n\n1. __Custom Introduction Text:__ You can now customize the welcome message on the wizard's landing screen, aligning the experience with your brand’s tone and engaging users right from the start.\n2. __PingFederate Support:__ We've expanded our list of supported Identity Providers (IdPs) to include PingFederate, giving you more flexibility in your authentication options.\n3. __Revoking SSO Access Tickets:__ Our [new API endpoint](https://auth0.com/docs/api/management/v2/self-service-profiles/post-revoke) lets you revoke SSO access tickets at any time.\n4. __Updated Ticket Expiration:__ Access tickets are now consumed only when a connection is created, enabled or edited — like when updating SAML or OIDC details — avoiding issues with scanners opening them prematurely.\n5. __Customized Login Experience:__ When creating a [ticket](https://auth0.com/docs/api/management/v2/self-service-profiles/post-sso-ticket), you can now define the login experience — adding optional parameters for Home Realm Discovery, Organization Auto-Membership, and more to tailor every step of the way.\n\nTo learn more, see the [Self-Service SSO documentation](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO)."
    },
    {
      "id": "2kb02dZ0aUVSeiXFCWh94l",
      "date": "2024-11-14",
      "displayDate": "November 14, 2024",
      "version": "v202446",
      "type": "added",
      "title": "Bot Detection Now Upgraded with User-Agent Signals",
      "description": "We are excited to announce that our fourth-generation Bot Detection has been upgraded with user-agent signals, and is now integrated into our proprietary machine learning model. This enhancement improves our capability to detect and thwart bot activity, further strengthening protection against malicious traffic without adding any additional friction for legitimate users.\n\nThis security feature is available to all Enterprise customers with the Attack Protection add-on. We are currently rolling out this enhancement and expect to complete the process within the next few weeks, aligned with your individual release schedules.\n\nFor activation details or further information, please check our [documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or reach out to your account team. We’re here to support you in safeguarding your systems against evolving threats.\n\nThank you for trusting us with your security needs."
    },
    {
      "id": "44gTuD39RuPAkscToASHXh",
      "date": "2024-11-13",
      "displayDate": "November 13, 2024",
      "version": "v202445",
      "type": "updated",
      "title": "Additional SAML methods available via Actions",
      "description": "Actions now supports the following APIs within the `post-login` trigger.\n\n- `api.samlResponse.setRelayState(relayState)`\n- `api.samlResponse.setIssuer(issuer)`\n\nYou can see all available API methods supported within the `post-login` trigger along with details on these methods [from this link](https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-api-object).\n"
    },
    {
      "id": "53Xa7DWGNjfp1xR0H3IJj7",
      "date": "2024-11-07",
      "displayDate": "November 7, 2024",
      "version": "v202445",
      "type": "added",
      "title": "Machine-to-Machine Access for Organizations is now in General Availability (GA)",
      "description": "The possibility to __scope machine-to-machine access to a specific organization is now Generally Available__. This feature allows you to define the organizations that a given application can access for each API via the [Client Credentials Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow). \n\n![M2M_for_Orgs_Image](https://cdn.auth0.com/blog/M2M_for_Orgs_changelog.png)\n\nYou can easily __define and enforce access to one, many, or all the organizations in your tenant and securely expand the reach of your SaaS APIs__ to more use cases and scenarios, making sure sensitive data and operations are only accessible to authorized parties. After configuring the access rights for your API, you simply have to inspect the `org_id` in access tokens of incoming requests, independently of whether they come from third-party applications or your own applications.\n\nThis feature is available for B2B Professional, Enterprise and Enterprise Premium customers.\n\nTo learn more, read the [reference documentation](https://auth0.com/docs/manage-users/organizations/organizations-for-m2m-applications)."
    },
    {
      "id": "1lm0834e2c4KIfUnzq832G",
      "date": "2024-10-25",
      "displayDate": "October 25, 2024",
      "version": null,
      "type": "added",
      "title": "High Capacity Private Cloud Burst Offerings (AWS)",
      "description": "Auth0 is delighted to launch __Private Performance Burst AWS - 30x (3000 RPS*) and 60x (6000 RPS)__ offerings for Private Cloud deployments on AWS.\n\nThese cost-effective Private Performance options scale the Authentication traffic up to 3000 RPS and 6000 RPS respectively for 80 hours a month, and allow usage up to 1500 RPS and 3000 RPS respectively for the remaining duration. \n\nThe elevated transaction capacity comes handy for planned and unplanned traffic spikes, e.g. during product launches, large media events, seasonal activities, and unpredictable usage peaks. \n\nThe Private Performance Burst offering is just another milestone in our commitment to providing the functionality and flexibility our beloved customers need. \n\nPlease refer to [Private Performance Burst documentation page](https://auth0.com/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy#private-performance-burst) for more information.\n\n*RPS: Requests Per Second\n"
    },
    {
      "id": "4GnZ402Djv8tv1uFfKE4XA",
      "date": "2024-10-23",
      "displayDate": "October 23, 2024",
      "version": null,
      "type": "added",
      "title": "Define Conditional Relationship Tuples in the Okta FGA Dashboard",
      "description": "The [Okta FGA](https://fga.dev) authorization modeling language allows defining conditions that can be used to express certain ABAC authorization policies. Previously, if you wanted to take advantage of that feature you needed to use the [Okta FGA API](https://docs.fga.dev/api/service) or the [FGA CLI](https://docs.fga.dev/getting-started/cli).\n\nNow, with the [Okta Fine Grained Authorization Dashboard](https://dashboard.fga.dev \"Okta FGA Dashboard\"), you can create conditional relationship tuples and specify context parameters in assertions, making it easier to fully define ABAC-like conditions directly within the dashboard.\n\nFor more details, refer to the  [Okta FGA dashboard documentation](https://docs.fga.dev/intro/dashboard#conditions).\n"
    },
    {
      "id": "HYcmSunb8QSkT16N1rFN5",
      "date": "2024-10-09",
      "displayDate": "October 9, 2024",
      "version": null,
      "type": "added",
      "title": "Extended group attributes now supported for Google Workspace Enterprise connections",
      "description": "The Google Workspace Enterprise connection now supports an **Extended Group Attribute Format** option. When selected, group memberships are written to the Auth0 user profile as an array of JSON objects containing the group unique ID, group name, and group email address for each group retrieved from Google. \n\nFor more information, see [Connect Your App to Google Workspace](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/google-apps).\n\nThis feature is immediately available in the public cloud and will be rolled out to private cloud environments in the next few weeks as per the release pipeline."
    },
    {
      "id": "3algyxnXQC2c5IaV1BEjuL",
      "date": "2024-10-07",
      "displayDate": "October 7, 2024",
      "version": "v202440",
      "type": "added",
      "title": "Self-Service SSO: IdP Selection, Keycloak Support and Miscellaneous Improvements",
      "description": "Auth0 is excited to introduce the following updates to Self-Service SSO:\n\n1. Tenant admins now have the ability to choose which IdPs to display when their customers are setting up an SSO profile through the set up wizard, making the entire process more efficient and customizable.  \n2. We've added support for Keycloak expanding the available IdPs.\n3. When no user attributes exist in the SSO profile, we skip the Claims Mapping instructions in the SSO wizard. \n4. When testing the connection, the JSON has been formatted to show on multiple lines. \n\nTo learn more, see the [Self-Service SSO documentation](https://auth0.com/docs/authenticate/enterprise-connections/self-service-SSO).\n"
    },
    {
      "id": "2ZTFNd9CQxFZEGuPcNBAvy",
      "date": "2024-10-02",
      "displayDate": "October 2, 2024",
      "version": "v202439",
      "type": "added",
      "title": "Custom Phone Providers in Early Access!",
      "description": "We’re excited to announce that __Custom Phone Providers__ in is now in __Early Access__.\n\nWith this feature, customers can configure custom phone providers and customize phone messages associated with using phone number as an identifier. Using a custom phone provider for MFA and passwordless phone messages is planned for a later release. \n\nThis early access release enables you to:\n- Configure your preferred phone provider for phone messages\n- Leverage various contexts for using different providers, including organization, client, user, and more\n\nWe encourage you to get started with Custom Phone Providers today by checking out our [documentation](https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers/configure-a-custom-phone-provider) and if you have any feedback, give us a shout in our [community channel](https://community.auth0.com/)!\n"
    },
    {
      "id": "26FQraKOkaff8RNS9KGsyN",
      "date": "2024-10-02",
      "displayDate": "October 2, 2024",
      "version": null,
      "type": "changed",
      "title": "Support Center Closed Tickets Older than 24 Months to be Deleted",
      "description": "In our continuing effort to improve our security posture, Auth0 will no longer retain closed support tickets older than 24 months. Closed support tickets older than 24 months will be deleted on October 16. To view your support tickets, you can navigate to [https://support.auth0.com/tickets](https://support.auth0.com/tickets) . For questions or issues on this change, please reach out to [Support](https://support.auth0.com/)."
    },
    {
      "id": "RwR20l4xOR2jB3pb0tEgq",
      "date": "2024-09-30",
      "displayDate": "September 30, 2024",
      "version": null,
      "type": "added",
      "title": "New Private Cloud Region in United Arab Emirates (UAE)",
      "description": "Auth0 is delighted to introduce the __United Arab Emirates (UAE)__ as the latest __AWS region for Private Cloud__ deployments. \n\nWe are committed to enhancing our presence in the Middle East. The UAE joins Bahrain as the second AWS region for Auth0 Private Cloud in this part of the world. This expansion opens up new possibilities in the UAE, where Private Cloud deployment is already supported on Azure.\n"
    },
    {
      "id": "tKdrsqdxsu6VXwxjtgAJv",
      "date": "2024-09-27",
      "displayDate": "September 27, 2024",
      "version": "v202439",
      "type": "fixed",
      "title": "Update to Session Termination Behavior when Adding Identifiers",
      "description": "**What’s Changing:**\n\nWe are improving the user experience when adding or updating identifiers (email, phone number, or username) in profiles.\n\n**Key Updates:**\n\n1. **New Identifier**: When a new identifier type (email, phone, or username) is added to a user profile where one **does not already exist**, the user’s session **will not be terminated**. This allows for a smoother **progressive profiling** experience, where users can add new identifiers without disruption.  \n2. **Changing Existing Identifier**: When an existing identifier is modified, the user’s session **will terminate**, and the user will have to re-authenticate. This ensures security best practices are followed when updating key account information.\n\n**Why This Matters:** Previously, any update to an identifier (whether adding or changing it) would terminate the user’s session. This could lead to a poor experience, especially during progressive profiling, where users are expected to update or add information without being logged out. With this update, customers can offer a seamless experience for users adding new identifiers while maintaining strict security for changes to existing identifiers.\n\n**Rollout Timing:** This change will be rolled out progressively over the next 1-4 weeks. Customers can expect to see the updated session handling behavior in their environments during this period.\n\n**Action Required:** No immediate action is required from customers, but it is recommended to review any user flows that involve the addition or modification of identifiers to ensure they align with this change."
    },
    {
      "id": "59iYsCKQa7DzLBhXbrkW3F",
      "date": "2024-09-27",
      "displayDate": "September 27, 2024",
      "version": "v202439",
      "type": "added",
      "title": "Email OTP Verification (Early Access)",
      "description": "We have introduced __Email OTP Verification__ as a new method for email verification, available in Early Access. Expect to see the feature in your environments within the next 1-4 weeks.\n\nWith __Email OTP Verification__, users are required to enter a One-Time Password (OTP) sent to their email during the signup or password reset process. This ensures email verification happens __before__ account creation or password reset is completed, offering enhanced security and reducing the chances of mistyped or fake email accounts.\n\n__Key Highlights:__\n\n- __Synchronous Email Verification:__ Prevents account creation or password reset until users verify their email via OTP.\n- __Improved Security:__ Helps prevent fake accounts, ensures accurate email addresses, and discourages phishing through email links.\n- __Applicability:__ Available for both email verification during signup and password reset challenges.\n\n__Prerequisites:__\n\n- Must be using __Universal Login__.\n- Connection must have __Flexible Identifiers__ enabled.\n- Email OTP is only compatible when using the __Identifier First Authentication Profile__.\n\nTo enable this feature, navigate to the __Attributes__ tab on any connection and change the __Verification Method__ under the __Email__ attribute settings from __Verification Link__ to __OTP__.\n\n![Email OTP Verification](https://cdn.auth0.com/blog/email_otp_verification.png)"
    },
    {
      "id": "3usfvu6YBZi85bkZKDxCJ0",
      "date": "2024-09-27",
      "displayDate": "September 27, 2024",
      "version": null,
      "type": "updated",
      "title": "EN 301 549 Compliance for Universal Login",
      "description": "Okta CIC is excited to announce that Universal Login now satisfies out of the box or provide configurability to satisfy the guidelines for the [EN 301 549](https://www.etsi.org/human-factors-accessibility/en-301-549-v3-the-harmonized-european-standard-for-ict-accessibility) standard. We have updated our VPAT to include this information and it is available on [Okta.com](https://www.okta.com/accessibility/). By ensuring that Universal Login is accessible to all users, we enable our customers to confidently secure their applications with accessible authentication. \n\nSee our [online documentation](https://auth0.com/docs/authenticate/login/auth0-universal-login#accessibility) for more details. "
    },
    {
      "id": "4VRbIKzoiaecSdBG9UG4bD",
      "date": "2024-09-25",
      "displayDate": "September 25, 2024",
      "version": "v202439",
      "type": "updated",
      "title": "Actions UI updated",
      "description": "Auth0 Actions dashboard experience & documentation has been updated to consolidate around the concept of \"Triggers\" (as opposed to our previous mix of Flows and Triggers). A trigger represent points in the Auth0 process where Actions can be added.\n\nWe believe this change will make it easier for you to identify available customization options (now simply labelled as [triggers](https://auth0.com/docs/customize/actions/explore-triggers)) and how they can be leveraged to personalize your identity needs.\n\n![Actions Triggers](//images.ctfassets.net/kbkgmx9upatd/38P4yCQzOavZSewcUVRTOt/f40c6a6df9e9713449d6a1cf74404419/Screenshot_2024-09-25_at_2.27.21_PM.png)\n\n*Please note that this change does not have any impact on the current functional behaviour of Actions within Auht0.*"
    },
    {
      "id": "381kyZEXvNtDDtmThhooDh",
      "date": "2024-09-25",
      "displayDate": "September 25, 2024",
      "version": "v202438",
      "type": "added",
      "title": "New endpoints on the Session Management APIs",
      "description": "We are happy to announce that we just added two new endpoints to our Session Management APIs:\n\n[POST  /api/v2/users/{id}/revoke-access](https://auth0.com/docs/api/management/v2/users/user-revoke-access) – This endpoint allows you to revoke sessions for a user and decide if you want to revoke the associated Refresh Tokens.\n\n[POST  /api/v2/sessions/{id}/revoke](https://auth0.com/docs/api/management/v2/sessions/revoke-session) – This endpoint will revoke the session and all its related Refresh Tokens.\n\nPlease refer to the [Auth0 Management API](https://auth0.com/docs/api/management/v2/introduction) for more information.\n"
    },
    {
      "id": "5AJRElXf1TTPEd4PhlPwC8",
      "date": "2024-09-24",
      "displayDate": "September 24, 2024",
      "version": "v202438",
      "type": "added",
      "title": "Continuous Session Protection now available for enterprise customers ",
      "description": "Continuous Session Protection is now generally available for enterprise customers, providing powerful tools to dynamically manage Sessions and Refresh Tokens within Auth0 Actions. This feature offers flexible options to configure expiration settings, access additional session and token data, and revoke sessions when necessary, enhancing security and control.\n\nKey benefits of Continuous Session Protection include:\n\n- Dynamic Session and Token Expiration: Configure custom absolute and idle timeouts for Sessions and Refresh Tokens using the new setExpiresAt(Date) and setIdleExpiresAt(Date) methods. These settings can be applied across users, organizations, or specific connections to meet your security and compliance needs.\n- Enhanced Security with Revocation: Revoke Sessions and Refresh Tokens programmatically using Actions, based on custom logic or risk assessments. This allows you to take immediate action when suspicious behavior is detected or when tokens no longer meet your security policies.\n- Comprehensive Session and Token Insights: Access additional session and refresh token attributes within Actions, enabling you to make more informed, data-driven decisions for managing user sessions.\n- These features allow enterprise customers to dynamically improve their security posture by customizing session behavior, enforcing shorter expiration times for high-risk roles (such as administrators), and revoking tokens when necessary to mitigate risks.\n\nTo learn more, visit the product documentation: [Continuous Session Protection](https://auth0.com/docs/secure/continuous-session-protection)\n\n![Continuous-Session-Protection-Action](https://cdn.auth0.com/blog/continuous_session_protection_action.png)"
    },
    {
      "id": "XI8fwHVlNCGzDvsAqDMvC",
      "date": "2024-09-19",
      "displayDate": "September 19, 2024",
      "version": null,
      "type": "added",
      "title": "SaaStart: Multi-tenant B2B SaaS Admin Dashboard in minutes",
      "description": "We're happy to announce SaaStart: a complete B2B SaaS reference application built using Next.js, Radix UI and Auth0 by Okta. Clone [the repo](https://github.com/auth0-developer-hub/auth0-b2b-saas-starter) to get a head start on the capabilities that you'll need to support enterprise customers of your SaaS app - like multi-tenant user management and access controls, security policies, self-service Single Sign-On configuration and more...\n\nGive us a holler in [the Auth0 community](https://community.auth0.com/t/saastart-b2b-saas-reference-app/136654) if you have any questions! \n\n![SaaStart](//images.ctfassets.net/kbkgmx9upatd/5AuSP8nvsE0bdFJJBMpkFy/72720e603b82c460d916c59553442686/Complicated__1_.png)"
    },
    {
      "id": "VGNKvp0wOwJrdIuK0BpWd",
      "date": "2024-09-19",
      "displayDate": "September 19, 2024",
      "version": "v202438",
      "type": "updated",
      "title": "Enhancements to Customize Signup and Login",
      "description": "**Passwordless Connection Support**\n\nUniversal Login now supports customizing the passwordless signup and login authentication flows, allowing customers to address their unique data capture, security, and compliance requirements when users authenticate with email and SMS one-time passwords. \n\nSee our [online documentation](https://auth0.com/docs/customize/login-pages/universal-login/customize-signup-and-login-prompts) for more information, instructions and examples.\n\n**Dev Tooling support for the Partials API**\n\nAuth0’s CI/CD tooling (Auth0 CLI, Deploy CLI, Terraform Provider) now fully supports the Partial API including the new Passwordless prompts. As a bonus, Partials can now also be edited using Auth0 CLI’s UL Customize interface. Run `auth0 ul customize` in your terminal to see it in action. To access these new capabilities, upgrade to the latest versions of Auth0 CLI, Deploy CLI, and Terraform Provider.\n\n![Auth0 CLI - Partials API Support](//images.ctfassets.net/kbkgmx9upatd/4aJB7oZYi1eXnqa8QBXURf/b9fc528de063fc07efdf405204ffba68/Screenshot_2024-09-17_at_10.53.42_AM.png)"
    },
    {
      "id": "5ib02GuRv9Smc2mOSqq7Ts",
      "date": "2024-09-18",
      "displayDate": "September 18, 2024",
      "version": "v202437",
      "type": "added",
      "title": "Test Custom DB scripts with a specific Node runtime version",
      "description": "You are now able to individually test a [Custom Database script](https://auth0.com/docs/authenticate/database-connections/custom-db) for a specific Node runtime version. \n\n![Test specific runtime version for Custom DB scripts](//images.ctfassets.net/kbkgmx9upatd/67AkIp89UvIo7HkA0sVDO8/a6f5781992d0336c6471ba0e0db65fbe/Screenshot_2024-09-09_at_2.25.32_PM.png)\n\nThis will help to validate script changes against a target runtime version before you modify the default global tenant configuration for [Extensibility runtime](https://auth0.com/docs/get-started/tenant-settings#extensibility).\n\nYou can read more about how to use this feature [in our documentation](https://auth0.com/docs/authenticate/database-connections/custom-db/custom-database-connections-scripts/environment#testing-a-specific-runtime-version)."
    },
    {
      "id": "sBMFPDMRYxo61vnu9G7oH",
      "date": "2024-09-17",
      "displayDate": "September 17, 2024",
      "version": "v202438",
      "type": "updated",
      "title": "Forms is now Generally Available (GA)",
      "description": "We’re excited to announce that Forms is now generally available in Okta Customer Identity Cloud!\n\nThis new feature allows you to extend your login and signup flows with additional steps and business logic.\n\n![Forms GA - Preview](//images.ctfassets.net/kbkgmx9upatd/6kZjPUb5ZyeLU8TMcA9u5q/34372ae2940652ee7e599e32db3e9863/forms-ga-overview.png)\n\nWhat's new:\n1. __Pass data between Forms and Actions:__ now you can easily [inject server-side data](https://auth0.com/docs/customize/forms/render#inject-custom-data-with-shared-variables-server-side-) from Actions to Forms, and [use the collected data](https://auth0.com/docs/customize/forms/render#fields-and-shared-variables-data-in-actions) in Forms in your Actions.\n2. __New form components:__ [custom fields components](https://auth0.com/docs/customize/forms/custom-field-components) to create your own fields UI with code, image block to personalize your form adding logos or images, and HTML block to customize it with code.\n3. __Organizations support:__ forms now inherit organization branding, and there is available [context data](https://auth0.com/docs/customize/forms/variables#available-variables) about the organization you're using.\n4. __Management API:__ create and manage forms using the Management API.\n5. __Other changes:__ added new templates, rich text editor improvements, and new masking options for your flows.\n\nLearn more:\n- [Product documentation.](https://auth0.com/docs/customize/forms)\n- [Templates.](https://developer.auth0.com/resources/templates)\n- [Blog Post.](https://auth0.com/blog/auth0-forms-go-ga/)"
    },
    {
      "id": "4ICbasDeZ41t3ER3LFYwXJ",
      "date": "2024-09-17",
      "displayDate": "September 17, 2024",
      "version": null,
      "type": "added",
      "title": "Support for Okta Universal Logout now available in Limited Early Access!",
      "description": "We’re excited to announce that support for [Okta Universal Logout](https://help.okta.com/oie/en-us/content/topics/itp/universal-logout.htm) in Okta Customer Identity Cloud is now in Limited Early Access!\n\nOkta Universal Logout is based on the [Global Token Revocation](https://www.ietf.org/archive/id/draft-parecki-oauth-global-token-revocation-02.html) specification and allows security incident management tools [Okta Identity Threat Protection](https://www.okta.com/products/identity-threat-protection/) to send back-channel requests to revoke application users' sessions and refresh tokens when they identify a change in risk.\n\nWith this feature, customers who use [Okta Workforce Connections](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta) in Auth0 no longer need to build their own Global Token Revocation endpoints to support Universal Logout. Simply enable it for your Okta Workforce connection and provide the endpoint URL to the Okta Workforce administrator. \n\nTo enable the Limited Early Access release in your Auth0 tenant, please contact your Technical Account Manager to request access."
    },
    {
      "id": "7dDom9KCNEKxCxeUa9gcPR",
      "date": "2024-09-16",
      "displayDate": "September 16, 2024",
      "version": "v202434",
      "type": "added",
      "title": "Self-Service SSO - Support for multiple self-service SSO profiles",
      "description": "We’re excited to announce the introduction of support for multiple Self-Service SSO profiles! This new feature allows you to customize Self-Service SSO profiles configurations to meet your diverse needs, including different required attributes and branding. With this update, you can now tailor SSO setups more precisely to fit your company's unique requirements.\n\nLearn more about Self-Service SSO in the [product documentation](https://auth0.com/docs/authenticate/single-sign-on/self-service-SSO \"product documentation\")."
    },
    {
      "id": "3ZqzIY4EVn7T0OiwbKoLxC",
      "date": "2024-09-12",
      "displayDate": "September 12, 2024",
      "version": "v202436",
      "type": "updated",
      "title": "Security Center Thresholds now in General Availability (GA)",
      "description": "Within the Security Center Dashboard offering, customers can now set [metric thresholds](https://auth0.com/docs/secure/security-center/security-alerts). This new feature provides Enterprise customers with an enhanced proactive capability around the various Security Center monitors they track. Customers can now configure thresholds on security threat metrics and monitor when threats exceed the acceptable value. \nThe feature is available in all Public cloud environments and rolling out to Private spaces throughout the next few weeks.\n"
    },
    {
      "id": "7o1YXe52Gl7jEYENzFikEn",
      "date": "2024-09-05",
      "displayDate": "September 5, 2024",
      "version": "v202434",
      "type": "added",
      "title": "Bot Detection Now Enhanced with ML Model for Signup Attack Detection",
      "description": "We are excited to announce that our Bot Detection feature has been upgraded with a new machine learning model specifically designed to detect and prevent signup attacks. This enhancement integrates advanced ML capabilities into our proprietary Bot Detection system, significantly improving the identification of fraudulent account creation attempts.\n\nThis feature is currently available in the New Universal Login experience, providing added security for customers utilizing our latest UI. For customers using the Classic Login or custom UI, we are evaluating options to extend these capabilities in the future.\n\nAs always, to activate Bot Detection or if you require more detailed information, please visit our [online documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or contact your account team. We are here to assist you in ensuring your systems remain secure against evolving threats."
    },
    {
      "id": "5qldEEHTfz5MVEIaY566ml",
      "date": "2024-08-30",
      "displayDate": "August 30, 2024",
      "version": null,
      "type": "added",
      "title": "New Query Consistency Options in Okta FGA ",
      "description": "We are pleased to announce that developers using Okta FGA now have a way to specify their required consistency level when querying Okta FGA.\n\nTo minimize latency, Okta FGA uses two levels of caching that can result on permissions changes not being reflected in authorization queries for up to 20 seconds. \n\nAll query APIs (Check, Read, ListObjects, ListUsers, Expand) now have an additional optional parameter with two possible values:\n\n- __MINIMIZE_LATENCY__ (default): Okta FGA will try to minimize latency (e.g. by making use of the cache)\n- __HIGHER_CONSISTENCY__: Okta FGA  will try to optimize for stronger consistency (e.g. by bypassing cache)\n\nWhen using HIGHER_CONSISTENCY, latency will be higher as Okta FGA will ready directly from the database. Developers need to make the trade off between consistency and latency depending on the use case.\n\nAll SDKs were updated with support for the new parameter.\n\nYou can learn more in the [Okta FGA documentation](http://docs.fga.dev/writing-data/consistency-modes)."
    },
    {
      "id": "1clbNR5RVLAleCElIbKHg1",
      "date": "2024-08-30",
      "displayDate": "August 30, 2024",
      "version": null,
      "type": "added",
      "title": "Security Center Thresholds in Early Access",
      "description": "Introducing a new capability within the Security Center Dashboard offering - [__Security Center Thresholds__](https://auth0.com/docs/secure/security-center/security-alerts) Early Access. This new feature provides Enterprise customers with an enhanced proactive capability around the various Security Center monitors they track. Customers can now configure thresholds on security threat metrics and monitor when threats exceed the acceptable value. The feature is available in all Public cloud spaces and will roll out to private spaces with the General Availability announcement."
    },
    {
      "id": "1aIc85FS2BgJO8S58hTWtL",
      "date": "2024-08-30",
      "displayDate": "August 30, 2024",
      "version": null,
      "type": "added",
      "title": "Private Cloud for Okta FGA is now Generally Available",
      "description": "Okta FGA has now two deployment options: public cloud and private cloud. The public cloud option is a multi-tenant SaaS service available in three geographies: the United States, Europe, and Australia, offering a highly available multi-region deployment. The private cloud option, on the other hand, is tailored for enterprises seeking dedicated resources. Okta FGA Private Cloud leverages the same architecture principles that have been battle-tested with Auth0 for over two years.\n\nPrivate Cloud for Okta FGA has the following benefits:\n\n- Higher RPS: Private cloud instances are optimized for high request-per-second (RPS) performance, scaling up to five times the average RPS based on your application’s needs. \n- High Availability: Okta FGA for Private Cloud is always deployed in two AWS regions with active-active data replication, minimizing the chances of being impacted by an AWS region outage.\n- Data Residency and Compliance: Deploy your Private Cloud environment in any AWS region to meet specific data residency and compliance requirements. Initial regions include the US, Germany, Ireland, UK, France, Japan, India, Singapore, Australia, and Brazil.\n- Reduced Latency: Choose the AWS region closest to your application servers, which will significantly reduce latency for faster access control checks.\n- Multi-Geography Deployments: Businesses can replicate the same authorization data across multiple regions worldwide, allowing them to maintain low-latency authorization services even for globally distributed applications. For example, a company can have the same data in the US, EU, and Australia, have their authorization data replicated across all regions, and have their applications routed to the closest region.\n- Automated, Hardened Release: Benefit from automated weekly releases that are previously validated in Okta’s public cloud deployments.\n- Centralized Management: Customers can manage both private and public cloud instances seamlessly from the Okta FGA dashboard.\n\nLearn more in the [product documentation.](http://docs.fga.dev/okta-fga-private-cloud)\n"
    },
    {
      "id": "13F3tuosUypzOI4FcOu9Yp",
      "date": "2024-08-30",
      "displayDate": "August 30, 2024",
      "version": "v202435",
      "type": "updated",
      "title": "Prioritized Log Streams now in General Availability (GA)",
      "description": "__[Prioritized Log Streams](https://auth0.com/docs/secure/security-center/prioritized-log-streams)__ is now Generally Available (GA) \n\nNow, Enterprise customers can stream a predefined set of security risk-related log events through a dedicated architecture with higher confidence. Customers can stream events to SIEM tools, monitor, and take action on Security events without interruption when there is an attack on the customer’s tenant or abnormally high user activity.\n\nThe feature is available in all Public cloud environments and rolling out to Private spaces throughout the next few weeks.\n"
    },
    {
      "id": "32BVhYejHO0i1NYhjrNNQS",
      "date": "2024-08-28",
      "displayDate": "August 28, 2024",
      "version": "v202435",
      "type": "added",
      "title": "Managing Session and Refresh Tokens expirations in Actions - Early Access",
      "description": "Following on the objective to improve the capabilities to dynamically manage Sessions and Refresh Tokens, we are happy to announce that we have added new methods to control the expiration of Sessions and Refresh Tokens using Actions.\n\nNow you can control the absolute and inactivity timeouts with the new `setExpiresAt(Date)` and `setIdleExpireAt(Date)` methods, available for post-login Action objects `api.session` and `api.refresh_token`.\n\nThey can be used in different use cases, for example, you can improve your security posture by enforcing shorter expiration times for administrators, specific Connections or Organizations.\n\nTo learn more, read our public docs: [Sessions with Actions](https://auth0.com/docs/manage-users/sessions/manage-sessions-actions) and [Refresh Tokens with Actions](https://auth0.com/docs/secure/tokens/refresh-tokens/manage-refresh-tokens-actions).\n\nThey are now available in Private Early Access. If you are an Enterprise customer, please reach out to your Technical Account Manager (TAM) to request access.\n\n![Session-setExpiration-Actions](https://cdn.auth0.com/blog/Session_setExpiration.png)\n"
    },
    {
      "id": "6yUU9XNKYCS1zzW9FMm9Xh",
      "date": "2024-08-27",
      "displayDate": "August 27, 2024",
      "version": "v202434",
      "type": "added",
      "title": "Self-Service SSO is now in Early Access",
      "description": "We’re excited to announce that __Self-Service SSO__ on Customer Identity Cloud, powered by Auth0 is now in __Early Access__. \n\nThis capability aims to streamline the administrative tasks that are critical for every B2B SaaS product. Our Self-Service SSO feature, provides our business customers' customer with a flexible, user-friendly experience for configuring their own single sign-on setups.\n\nThese capabilities are now available in Early Access. If you are a B2B Professional or Enterprise customer, please reach out to your Auth0 account contact to request access.\n\n![Self-Service SSO ](//images.ctfassets.net/kbkgmx9upatd/4WwCf47yQtDXhs4AVl8WwL/f9ad7d23e03d6f9e2c228b8198f6fe53/image1.gif)"
    },
    {
      "id": "Gl5Iau4ISLOSGuAUqmYe0",
      "date": "2024-08-23",
      "displayDate": "August 23, 2024",
      "version": null,
      "type": "deprecated",
      "title": "Deprecate opt-in to WCAG 2.2 AA Compliant UI for Universal Login",
      "description": "Starting __February 23rd, 2025__, Auth0 will begin removing the ability to use the legacy, non-compliant UI for Universal Login. The new WCAG compliant version ensures that end users, including those who rely on assistive technology, can access and engage with a customer’s product or service. Read our [Universal Login Accessibility documentation](https://auth0.com/docs/authenticate/login/auth0-universal-login#accessibility) for more information."
    },
    {
      "id": "43RTfzV8KvAG2lqBKoy8a9",
      "date": "2024-08-21",
      "displayDate": "August 21, 2024",
      "version": null,
      "type": "added",
      "title": "Introducing Guide: Your Okta AI Powered Auth0 Assistant",
      "description": "We're excited to announce the Early Access launch of Guide - an Okta AI powered chatbot here to answer your questions about the Auth0 platform.\n\n### What is Guide?\nGuide is your new go-to for quick answers on all things Auth0. It pulls information from our docs, blog, and community to provide summarized responses and relevant links. You can access Guide by clicking the \"Ask Guide\" button in the top-right of your Auth0 Dashboard. Just ask your question and let Guide do the work.\n\n### Availability\nGuide is available to tenants in the US Public Cloud region. Guide will be rolled out to all Public Cloud regions in the near future."
    },
    {
      "id": "eeLptIN0waOspIUZiLLx0",
      "date": "2024-08-20",
      "displayDate": "August 20, 2024",
      "version": "v202434",
      "type": "updated",
      "title": "Minimum Characters for Organization Names Lowered",
      "description": "Today, we've reduced the minimum character requirement for *Organization Name* and *Organization Display Name* from 3 to just 1 character. Plus, our Organization search has been updated to return exact matches for queries with fewer than 3 characters."
    },
    {
      "id": "6pWelAu6R7sfd50nzV8V8z",
      "date": "2024-08-20",
      "displayDate": "August 20, 2024",
      "version": null,
      "type": "updated",
      "title": "Introducing React Native SDK v4 (EA)",
      "description": "Okta CIC is happy to announce the next major version of the React Native SDK. With [react-native-auth0 v4](https://github.com/auth0/react-native-auth0 \"GitHub: react-native-auth0 v4\"), developers will be able to use advanced biometric authentication to obtain credentials. This new SDK version also makes it possible to switch between domains for authentication. We’re planning to release a GA version later in Q3 with major improvements to the SDK architecture and other new features.\n\n###### What’s new\n1. __Advanced Biometric Authentication:__ Use FaceID/Fingerprint to perform device authentication before obtaining credentials.\n2. __Domain Switching:__ Dynamically switch domain/clientID to offer a personalised and contextual authentication experience.\n\n###### Learn More\n1. [Migration Guide](https://github.com/auth0/react-native-auth0/blob/master/MIGRATION_GUIDE.md#upgrading-from-v3---v4 \"Migration Guide\")\n2. [Implementation Guide: Advanced Biometric Authentication](https://github.com/auth0/react-native-auth0/blob/master/README.md#requiring-authentication-before-obtaining-credentials \"Implementation Guide: Advanced Biometric Authentication\")\n3. [Implementation Guide: Domain Switching](https://github.com/auth0/react-native-auth0/blob/master/EXAMPLES.md#domain-switching \"Implementation Guide: Domain Switching\")\n"
    },
    {
      "id": "5baR8FpiDSxj3ERxR7YGC5",
      "date": "2024-08-20",
      "displayDate": "August 20, 2024",
      "version": null,
      "type": "updated",
      "title": "Introducing WCAG 2.2 AA Compliance for Universal Login - General Availability",
      "description": "Okta CIC is excited to announce that Universal Login now satisfies out of the box or provide configurability to satisfy the Web Content Accessibility Guidelines (WCAG) version 2.2 AA! We have published our VPAT and it is available on [Okta.com](https://www.okta.com/accessibility/). By ensuring that Universal Login satisfies the WCAG guidelines, we enable our customers to confidently secure their applications with accessible authentication. \n\nSee our [online documentation](https://auth0.com/docs/authenticate/login/auth0-universal-login#accessibility) for more details."
    },
    {
      "id": "2UjO2nIibCkbDsMdTsO6tT",
      "date": "2024-08-16",
      "displayDate": "August 16, 2024",
      "version": null,
      "type": "added",
      "title": "Prioritized Log Streams now in Early Access (EA)",
      "description": "Introducing a new Log Stream and Security capability, __[Prioritized Log Streams](https://auth0.com/docs/secure/security-center/prioritized-log-streams)__. \n\nNow, Enterprise customers can stream a predefined set of security risk-related log events through a dedicated architecture with higher confidence. Customers can stream events to SIEM tools, monitor, and take action on Security events without interruption when there is an attack on the customer’s tenant or abnormally high user activity.\n\nThis feature is rolling out to public cloud spaces throughout the next couple of weeks\n"
    },
    {
      "id": "1JeCJFwhIUGlWC0YCwyWJZ",
      "date": "2024-08-15",
      "displayDate": "August 15, 2024",
      "version": "v202433",
      "type": "updated",
      "title": "Auth0 Changelog Now Contains Release Version Numbers",
      "description": "The [Auth0 Changelog](https://auth0.com/changelog) now contains Release Version Numbers where applicable! \n\nNow, Private Cloud customers can view & filter for a specific version within the Changelog directly. Additionally, Private Cloud customers can view an environment's current version and next version from within the [Auth0 Support Center](https://support.auth0.com/) on the 'Private Instances' page and link directly to any feature releases in the Changelog that may be applicable to that version number.\n\nPublic Cloud customers are not impacted by this change and should continue to use the Auth0 Changelog as they normally do."
    },
    {
      "id": "74GRx5qrZTRZlTV7QuVphH",
      "date": "2024-08-12",
      "displayDate": "August 12, 2024",
      "version": null,
      "type": "added",
      "title": "Auth0 Dashboard Session Management - BETA",
      "description": "Have you ever wondered, as a user of the Auth0 platform, how many active sessions you have for the different Auth0 dashboard applications across your multiple devices?\nIntroducing Auth0 Dashboard Login Session Management, allowing Auth0 Dashboard admins to not only view all active dashboard sessions but also the ability to revoke them. This beta feature provides an added layer of security to session idle timeout for our Public Cloud customers.\n![Login Sessions Dashboard View](//images.ctfassets.net/kbkgmx9upatd/1lC20R7UkGWYPz43oTXa6y/b6dd5a3d1e0bbd76093aad45377859bf/Session_Management.png)"
    },
    {
      "id": "58tFj1QmAmWuR8JfbGaUjT",
      "date": "2024-08-08",
      "displayDate": "August 8, 2024",
      "version": "v202431",
      "type": "deprecated",
      "title": "Support Access Role Deprecation: Access to the \"Subscription Tickets\" Feature in Support Center now requires the new \"Elevated Support Access\" Role",
      "description": "#### What has changed?\nWe have deprecated the \"Support Access\" Role so that the only tenant member role that now has access to the [“Subscription Tickets”](https://auth0.com/docs/troubleshoot/customer-support/open-and-manage-support-tickets#manage-subscription-tickets-) feature within the Auth0 Support Center are those with the new [Elevated Support Access role](https://auth0.com/docs/get-started/manage-dashboard-access/feature-access-by-role) within the [Role Based Access Control (RBAC)](https://auth0.com/docs/get-started/manage-dashboard-access/add-dashboard-users) feature in the Auth0 Management Dashboard. The Subscription Tickets feature in [Support Center](https://support.auth0.com/) allows access to view and manage **all tickets created by all users across a tenant. The current ‘Support Access’ role is now deprecated.**\n\nTenant Administrators do not automatically inherit the new ‘Elevated Support Access’ role and will need to explicitly add themselves to the role via the Auth0 Management Dashboard to continue to have access to view and manage all tickets across their tenant(s) via the Subscription Tickets feature. **Tenant Administrators and all tenant members will still have access to the Auth0 Support Center to create and manage *their own tickets* without adding any additional roles.** \n\n#### Why did we make this change?\nIn order to increase the security of the Auth0 Support Center, the ‘Subscription Tickets’ feature will be tied specifically to the new **Elevated Support Access** role so that access is not automatically inherited by all Tenant Admin users. This prevents roles from being able to see tickets they did not create without explicitly granting them access to do so. \n\n#### How are you affected?\nTenant Administrators no longer have access to view and manage **all tickets** for your tenant on the ‘Subscription Tickets’ page in the Auth0 Support Center __unless__ the Elevated Support Access role is added to their user. **You will still be able to access the Auth0 Support Center and create & manage the support tickets you created.**\n\n#### What action do you need to take?\nIf you have a paid subscription, you can add yourself and any other users who need to see/manage all tickets (even those they did not create) across the tenant to the new **Elevated Support Access** role from the Auth0 Management Dashboard. __You should also review who__ __currently has the legacy ‘Support Access’ role assigned and determine if they should be removed and/or added to have the new Elevated Support Access role.__\n\nIf you are currently on a Free plan, there is no action required and this communication is to inform you that you will only be able to view and manage support tickets that you created.\n\n#### How can you get additional assistance?\nWe are here to help. Contact us by using the [Auth0 by Okta Support Center.](https://support.auth0.com/)\n"
    },
    {
      "id": "4UAHMdQqR7SvZyKBRMM90W",
      "date": "2024-08-02",
      "displayDate": "August 2, 2024",
      "version": null,
      "type": "updated",
      "title": "Remove Auth0 Team Members from all Tenants associated to the Team.",
      "description": "Deleting a Team Member from the Teams dashboard removes access to Teams and now deletes the team member from all team tenants they are a member of.\nHowever, if you just want to remove access to one or more tenants, you can now do so from the Team Member's details page.\n\nNote: Tenant Member Management feature is required. This feature is on by default for all Self Service customers but is configurable for Public Cloud customers and is coming soon for Private Cloud customers.\n\nPlease refer to the following documentation for more information.\n1. [How do you delete a Team Member from a Team and remove access to all tenants?](https://auth0.com/docs/get-started/auth0-teams/team-member-management#delete-an-existing-team-member \"Delete a Team Member\")\n2. [How do you delete a Team Member from one or more tenants?](https://auth0.com/docs/get-started/auth0-teams/tenant-member-management#delete-tenants-membership-with-tenant-member-management \"Revoke Tenant Access from Teams.\")\n3. [I am a Public Cloud Customer; how do I verify that I have the suitable feature turned on to support tenant member management?](https://auth0.com/docs/get-started/auth0-teams/tenant-member-management#turn-on-tenant-member-management \"Turning on Tenant Member Management.\")\n\nAuth0 Teams is getting more exciting new features, and we can't wait to share them with you."
    },
    {
      "id": "101raEEhNSlwx8qH1BQixn",
      "date": "2024-08-02",
      "displayDate": "August 2, 2024",
      "version": "v202431",
      "type": "added",
      "title": "Inbound SCIM for Enterprise Connections Log Stream Filter",
      "description": "The Log Stream filters have been updated with a new filter category. This category complements the [SCIM GA announcement](https://auth0.com/changelog#3iRVwR6TAFeSJhqIYwIWK2) and streams out only SCIM tenant logs when SCIM is enabled on the tenant. Through this capability, customers can monitor the full details of all the SCIM requests that Auth0 receives and get notified when a user is created, updated, or deleted using SCIM.\n\nThis feature is immediately available in the public cloud and will be rolled out to private cloud environments in the next few weeks as per the release pipeline.\n"
    },
    {
      "id": "3oBtz0qd2mJNzCFdvNJHUE",
      "date": "2024-07-25",
      "displayDate": "July 25, 2024",
      "version": "v202428",
      "type": "added",
      "title": "Bot Detection Now Upgraded with ASN Reputation Signals",
      "description": "We are excited to announce that our fourth-generation Bot Detection is now enhanced with ASN reputation signals and untrusted IP data. This upgrade integrates ASN and related IP reputation data into our proprietary Bot Detection ML model, specifically targeting scripted attacks where attackers frequently change their IP addresses. This enhancement further improves our ability to detect and thwart bot activities, thereby strengthening protection against malicious traffic.\n\nThis security feature is available to all our Enterprise customers with the Attack Protection add-on. We are currently rolling out this enhancement and expect to complete the process within the next few weeks, aligned with your individual release schedules.\n\nTo activate Bot Detection or if you require more detailed information, please visit our [online documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or contact your account team. We are here to assist you in ensuring your systems are secure against sophisticated threats.\n"
    },
    {
      "id": "6plwJQ1ijFgBuo5FeFAOGA",
      "date": "2024-07-24",
      "displayDate": "July 24, 2024",
      "version": null,
      "type": "added",
      "title": "Flexible Identifiers Now in General Availability (GA)",
      "description": "We are excited to announce that the Flexible Identifiers feature has transitioned to General Availability (GA). This update brings several key enhancements and improvements:\n\n**Key Updates:**\n\n- **Better Compatibility with Organizations:** We have improved the signup experience, particularly for users joining organizations via invitation links. The signup flow now collects the password after verifying the phone number, ensuring a smoother and more secure process.\n- **Username as Sole Identifier Improvements:** You can now allow self-service password reset with Username as the Sole Identifier, in order for this to work the end-user must have a valid email address on their account to receive a password reset email.\n- **Overall Increased Stability:** Comprehensive testing and refinements have enhanced the reliability and performance of the Flexible Identifiers feature, ensuring a smooth and dependable user experience.\n\n**Action Required:**\n\n- Conduct thorough testing in a development environment before [activating Flexible Identifiers](https://auth0.com/docs/authenticate/database-connections/activate-and-configure-attributes-for-flexible-identifiers) in your live environment.\n- Review the [Limitations Page](https://auth0.com/docs/authenticate/database-connections/flexible-identifiers-and-attributes) in our documentation for detailed information on feature constraints.\n\nThis rollout will be completed over the next 1-4 weeks. We encourage you to explore these new capabilities and enhance your authentication processes."
    },
    {
      "id": "N24DeD6TQlpaHmd0h7tvP",
      "date": "2024-07-23",
      "displayDate": "July 23, 2024",
      "version": null,
      "type": "updated",
      "title": "New Localization Languages for Universal Login",
      "description": "We are delighted to announce that we are adding **27 new languages** to Universal Login’s extensive list of localization options. CIC customers can now localize their authentication journeys with out of the box translations for **78 different languages**! To learn more see the [Support Center article](https://support.auth0.com/notifications/669fb3319c8957e823a343b6) \n\nTo see the full list of Universal Login localization options checkout our [online documentation](https://auth0.com/docs/customize/internationalization-and-localization/universal-login-internationalization)."
    },
    {
      "id": "42sqlV4Rzf8Kjr7HJthexv",
      "date": "2024-07-23",
      "displayDate": "July 23, 2024",
      "version": "v202430",
      "type": "added",
      "title": "RSS/ATOM Feed Subscription Now Available for Auth0 Private Cloud Status Page",
      "description": "We now offer the ability to subscribe via RSS/ATOM Feed for Auth0 Private Cloud Status Page on [status.auth0.com](https://status.auth0.com/).\n\nFor more information on how to access Private Cloud Status information and subscribe to updates via RSS/ATOM feed, see [this documentation](https://auth0.com/docs/deploy-monitor/monitor/check-auth0-status#check-auth0-status-for-private-cloud)."
    },
    {
      "id": "6m1vHmhTkAoQ8aiK2OK01r",
      "date": "2024-07-18",
      "displayDate": "July 18, 2024",
      "version": "v202427",
      "type": "added",
      "title": "User ID Attribute Mapper for Microsoft Azure AD Connections",
      "description": "A new User ID Attribute Type menu has been added to the [Microsoft Azure AD connection](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/azure-active-directory/v2) type, which allows developers to select which Azure AD user attribute is mapped to the Auth0 user_id attribute. The options correspond to the two supported ID types (sub and oid) described in [Microsoft’s ID token claims reference](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference#use-claims-to-reliably-identify-a-user).\n\nWhereas the Azure AD connection previously only supported the pairwise subject claim (sub), developers can now alternately choose the user object identifier claim (oid) which contains Azure AD’s immutable identifier for the user. When this option is selected, Auth0 writes the user_id value in the following format: waad|{connection-name}|{oid-value}\n\nThe \"oid\" option is recommended for all new single-tenant Azure AD integrations. It is also required to achieve full user lifecycle management using Auth0’s [Inbound SCIM](https://auth0.com/docs/authenticate/protocols/scim/configure-inbound-scim) feature with Azure AD. "
    },
    {
      "id": "3iRVwR6TAFeSJhqIYwIWK2",
      "date": "2024-07-18",
      "displayDate": "July 18, 2024",
      "version": "v202429",
      "type": "added",
      "title": "Inbound SCIM for Enterprise Connections is now Generally Available",
      "description": "We’re excited to announce that Inbound SCIM for Enterprise Connections is now generally available in Okta Customer Identity Cloud! \n\nThis initial release is tailored for B2B SaaS application developers who need to integrate with enterprise Identity providers that use SCIM 2.0 to manage user accounts in SaaS applications. This includes integrations with Okta Workforce Identity Cloud, Microsoft Entra ID, and other Enterprise identity providers that use SAML or OpenID Connect for user authentication.\n\nDevelopers can follow our configuration guide to see SCIM working in minutes. You can discover more by reading our documentation at [Configure Inbound SCIM](https://auth0.com/docs/authenticate/protocols/scim/configure-inbound-scim).\n\nThis feature is immediately available in the public cloud and will be rolled out to private cloud environments in the next few weeks as per the release pipeline.\n"
    },
    {
      "id": "2TeD0d5DAOmZQQDFIL3fiE",
      "date": "2024-07-17",
      "displayDate": "July 17, 2024",
      "version": null,
      "type": "added",
      "title": "Customer Managed Keys is now in Early Access",
      "description": "We are delighted to announce Early Access availability of Bring Your Own Key (BYOK) and Control Your Own Key (CYOK) as part of Highly Regulated Identity. \n\n- BYOK allows customers to upload and replace their Auth0 environment root key with their own customer provided root key in a secure process, known as a key ceremony.\n\n- CYOK allows customers to manage the lifecycle of their customer provided root key directly from the management API. It allows customers to rekey / rotate it according to their key management policies."
    },
    {
      "id": "2AEqpT39ykQYm2IvmvSxR1",
      "date": "2024-07-11",
      "displayDate": "July 11, 2024",
      "version": "v202428",
      "type": "added",
      "title": "Managing Session and Refresh Tokens in Actions - Early Access",
      "description": "Auth0 is happy to announce that we have released improved capabilities to manage sessions and refresh_tokens in Actions.\n\nNow you can get detailed information on both using event.session and event.refresh_token. Additionally, you can revoke them by using api.session.revoke() and api.refreshToken.revoke() methods.\n\nThese are powerful building blocks that can help you dynamically manage access for a wide variety of use cases, for example, you can improve your security posture by revoking sessions based on risk assessments.\n\nThese capabilities are now available in Private Early Access. If you are an Enterprise customer, please reach out to your Auth0 account contact to request access. Your account contact will provide documentation if you are approved for the Private Early Access program. \n\n![Session-Revoke-Actions](https://cdn.auth0.com/blog/Session_Ext_Session_Revoke.png)"
    },
    {
      "id": "3TRlLFRBWqfCHvO9fcuEow",
      "date": "2024-07-01",
      "displayDate": "July 1, 2024",
      "version": null,
      "type": "fixed",
      "title": "Machine to Machine Quota Reports",
      "description": "Machine to Machine Authentication usage [within Quota utilization reports](https://auth0.com/docs/troubleshoot/customer-support/manage-subscriptions/monitor-subscription-usage#quota-utilization \"Docs for Quota Utilization\") has been updated to improve accuracy with regards to not counting Auth0 Management API tokens. As a reminder, Machine to Machine tokens issued for Auth0 Management API are not counted against your Auth0 Subscription Machine to Machine quota limit.\n\nMajority of our users will not see any difference in their usage data while a small number of users will see slightly lower usage from before depending on how they had defined their own custom APIs.\n\nWe are here to help. Please contact us by using the [Auth0 by Okta Support Center](https://support.auth0.com) if you have any question.\n"
    },
    {
      "id": "4m6tiaRXghkzaisJP6ioyk",
      "date": "2024-06-29",
      "displayDate": "June 29, 2024",
      "version": null,
      "type": "added",
      "title": "Okta FGA ListUsers API is now Generally Available",
      "description": "Okta FGA now provides [a new API endpoint](https://docs.fga.dev/api/service#/Relationship%20Queries/ListUsers) that allows you to list all users who have a specific relationship with a specific resource. For example, you can list all users who can view a particular document.\n\nThis feature is useful for scenarios such as notifying users of changes to resources or reviewing permissions for auditing purposes.\n\nFor more information, refer to the [ListUsers API documentation](https://docs.fga.dev/integration/perform-list-users)."
    },
    {
      "id": "6TIsTCk8yfxx6q3697EcZg",
      "date": "2024-06-27",
      "displayDate": "June 27, 2024",
      "version": null,
      "type": "added",
      "title": "IETF JWT Profile for Access Tokens is now Generally Available",
      "description": "Auth0 is pleased to announce that __JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens - [RFC9068](https://datatracker.ietf.org/doc/rfc9068/) is now Generally Available for all customers__. You are now able to opt-in to use the new profile for your Access Tokens on a per-API basis.\n\nWith this release, we are adopting an Identity industry standard to maximize compatibility and interoperability with other solutions as well as reusability of community tools. \n\nRead our public documentation to learn about the [details of the new profile](https://auth0.com/docs/secure/tokens/access-tokens/access-token-profiles) and [how to activate it for the APIs in your tenant(s)](https://auth0.com/docs/get-started/apis/configure-access-token-profile).\n\n![RFC9068-token](https://cdn.auth0.com/blog/API_create_-_RFC9068_profile.png)"
    },
    {
      "id": "2es54tBIDe7Rd3DTiMen9o",
      "date": "2024-06-24",
      "displayDate": "June 24, 2024",
      "version": null,
      "type": "added",
      "title": "Public Cloud in Canada",
      "description": "Auth0 is thrilled to announce the General Availability of our latest __Public Cloud environment in Canada__. 🇨🇦🎉\n\nThe Public Cloud in Canada is our sixth Public Cloud region (besides US, EU, Japan, Australia, and UK) offering feature-rich, highly secure, resilient, and economical Auth0 solution in a multi-subscriber deployment. \n\nThis new region enables customers in Canada to utilize our starter Essentials, Professional, and Enterprise tiers while benefiting from lower latencies and meeting data-residency requirements.\n\nCustomers may choose this Public Cloud region during the tenant creation process. The newly created Auth0 tenant will have \"tenant\".ca.auth0.com domain name.\n\n![Public Cloud new tenant creation](//images.ctfassets.net/kbkgmx9upatd/15Tyvy0b1LH7WCo23xOQMA/985d58d9ad01e9aa529c4770991a459d/Public_Cloud_new_tenant_with_Canada.png)"
    },
    {
      "id": "6Er1jksRpvL6AwuvFgiUNR",
      "date": "2024-06-18",
      "displayDate": "June 18, 2024",
      "version": null,
      "type": "added",
      "title": "New Private Cloud Regions in Hong Kong and Canada",
      "description": "\nAuth0 is delighted to introduce two new AWS regions for Private Cloud deployments - Hong Kong and Calgary, Canada. This expansion clearly demonstrates our unwavering commitment to meet customers' needs for geographical availability, data residency, and resilience. \n\n__Hong Kong Region__: APAC is home to economies with a burgeoning demand for services. The Private Cloud (AWS) region in Hong Kong further enhances our existing extensive presence in APAC, which includes Private Cloud regions in Australia, India, Indonesia, Japan, Singapore, and South Korea as well as Public Cloud regions in Australia and Japan.\n\n__Calgary Region__: The Private Cloud (AWS) region in Calgary joins the Montreal AWS region to serve our Canadian customers better. This region offers the following deployment options:\n- __Primary region__ for new Private Cloud (AWS) deployments in Canada\n- __Failover region__ for Private Cloud (AWS) GeoHA deployments (e.g. with Montreal AWS region as the primary region, enabling a full GeoHA deployment within Canada)"
    },
    {
      "id": "2eNiXmFpBHnHMIhLpTTSAQ",
      "date": "2024-06-17",
      "displayDate": "June 17, 2024",
      "version": null,
      "type": "added",
      "title": "Refresh Tokens Management API is Now Generally Available",
      "description": "We are pleased to announce __General Availability__ of our __Refresh Tokens Management API__ to all our customers with an Enterprise plan.\n\nRefresh Tokens API endpoints extend your session management capabilities with access to your user's refresh tokens properties and administrative bulk or individual revocation endpoints. That is specially important for out-of-band session management in applications that do not rely solely on browser cookies. \n\nYou can learn more in our [product documentation](https://auth0.com/docs/secure/tokens/manage-refresh-tokens-with-auth0-management-api) and [management API](https://auth0.com/docs/api/management/v2) for details.\n"
    },
    {
      "id": "1HfyFroFNbwQ3KgCQ0j2mS",
      "date": "2024-06-14",
      "displayDate": "June 14, 2024",
      "version": null,
      "type": "added",
      "title": "Signup with Organization Membership for Database Connections",
      "description": "Today we released support to choose whether self-service Organization signup is supported for Database connections. \n\nYou can now navigate to Organizations -> “Your Organization” -> “Your Connection” and then select whether you want that database connection to support Organization Signup. \n\nNote, this new setting will outweigh the Application level setting for the Database connection. Meaning, you can disable signup support at the Application level, but enable it within the Organization, preventing the signup if an Organization is not present. \n\nAdditionally, passwordless connections will now support Organization Membership if the Application level has signups enabled and the organization supports just-in-time membership. \n\nTo learn more, check out the [documentation](https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-connections).\n"
    },
    {
      "id": "759cbR0hy2BnCFjQCbndjc",
      "date": "2024-06-11",
      "displayDate": "June 11, 2024",
      "version": null,
      "type": "added",
      "title": "Rules to Actions Migration Tooling ",
      "description": "We’ve made the migration from Rules to Actions easier for you! You can leverage the newly launched Actions migration tooling to transition from Rules to Actions leveraging QuickFix to covert Rules’ code to Actions syntax.\n\nIn most cases, you can simultaneously compare and review code between Rules and Actions, and quickly rewrite into a new Action. We also allow control of the execution sequence of old Rules and new Actions.\n\nYou can read more about this in our [product documentation](https://auth0.com/docs/customize/actions/migrate/migrate-a-rule-to-an-action).\n\n![migration tooling](//images.ctfassets.net/kbkgmx9upatd/4dCHzgJXnIxlmSKfmps2jj/ef0c249039751af17f94c85330bc700d/migration_tooling.png)"
    },
    {
      "id": "3l6Ew6cJanGZYzdnCwRsn8",
      "date": "2024-06-11",
      "displayDate": "June 11, 2024",
      "version": null,
      "type": "fixed",
      "title": "Delegated Admin Extension",
      "description": "We have implemented dynamic switching between a select dropdown and an input field in the user creation modal of the Delegated Admin Extension based on the number of connections per tenant.\n\nFor tenants with over 20,000 connections:\n\n- Instead of listing all connections in a select dropdown, a text input field is now displayed where the connection name can be manually typed.\n\nFor tenants with 20,000 or fewer connections:\n\n- No change. A select dropdown is displayed, listing all available connections.\n"
    },
    {
      "id": "4kZeRgU7H4DDvlokdxxcHK",
      "date": "2024-06-07",
      "displayDate": "June 7, 2024",
      "version": null,
      "type": "added",
      "title": "JetBrains IDE Integration for Okta FGA is now available",
      "description": "You can now enjoy syntax coloring and validation when editing Okta FGA models and [tests](https://docs.fga.dev/modeling/testing in any JetBrains IDE.\n\nInstall the JetBrains plugin [from the JetBrains Marketplace](https://plugins.jetbrains.com/plugin/24394-openfga) to get started.\n"
    },
    {
      "id": "4fPlmxhGlZBTuUtMtmVaC3",
      "date": "2024-06-07",
      "displayDate": "June 7, 2024",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Access to the Subscription Tickets feature in the Auth0 Support Center is Changing on August 5, 2024",
      "description": "\n# What is changing?\nStarting on **August 5, 2024**, the only tenant member role that will have access to the [“Subscription Tickets”](https://auth0.com/docs/troubleshoot/customer-support/open-and-manage-support-tickets#manage-subscription-tickets-) feature within the Auth0 Support Center will be those with the new [Elevated Support Access role](https://auth0.com/docs/get-started/manage-dashboard-access/feature-access-by-role) within the [Role Based Access Control (RBAC)](https://auth0.com/docs/get-started/manage-dashboard-access/add-dashboard-users) feature in the Auth0 Management Dashboard. The Subscription Tickets feature in [Support Center](https://support.auth0.com/) allows access to view and manage **all tickets created by all users across a tenant. The current ‘Support Access’ role will be deprecated.**\n\nTenant Administrators will not automatically inherit the new ‘Elevated Support Access’ role and will need to explicitly add themselves to the role via the Auth0 Management Dashboard to continue to have access to view and manage all tickets across their tenant(s) via the Subscription Tickets feature. **Tenant Administrators and all tenant members will still have access to the Auth0 Support Center to create and manage *their own tickets* without adding any additional roles.** \n\n#### Why are we making this change?\nIn order to increase the security of the Auth0 Support Center, the ‘Subscription Tickets’ feature will be tied specifically to the new **Elevated Support Access** role so that access is not automatically inherited by all Tenant Admin users. This prevents roles from being able to see tickets they did not create without explicitly granting them access to do so. \n\n#### How are you affected?\nTenant Administrators will lose access to view and manage **all tickets** for your tenant on the ‘Subscription Tickets’ page in the Auth0 Support Center on August 5, 2024. **You will still be able to access the Auth0 Support Center and create & manage the support tickets you created.**\n\n#### What action do you need to take?\nIf you have a paid subscription, you can add yourself and any other users who need to see/manage all tickets (even those they did not create) across the tenant to the new **Elevated Support Access** role from the Auth0 Management Dashboard. __You should also review who__ __currently has the legacy ‘Support Access’ role assigned and determine if they should be removed and/or added to have the new Elevated Support Access role.__\n\nIf you are currently on a Free plan, there is no action required and this communication is to inform you that you will only be able to view and manage support tickets that you created.\n\n#### How can you get additional assistance?\nWe are here to help. Contact us by using the [Auth0 by Okta Support Center.](https://support.auth0.com/)\n"
    },
    {
      "id": "HhQuxlz7b2e0SovyB3ZhG",
      "date": "2024-05-30",
      "displayDate": "May 30, 2024",
      "version": null,
      "type": "added",
      "title": "Custom Email Provider Action (Early Access)",
      "description": "We have added support to create a custom email provider connector via a new embedded Action in the Branding -> Email Provider section of the Dashboard. Check out how to get started by visiting: [Configuring a Custom Email Provider](https://auth0.com/docs/customize/email/configure-a-custom-email-provider). \n\nThis feature is in Open Early Access and we appreciate your feedback on it!"
    },
    {
      "id": "1H0HwoggTJh1GSwJH75Gjd",
      "date": "2024-05-30",
      "displayDate": "May 30, 2024",
      "version": null,
      "type": "added",
      "title": "Bot Detection is now available in the password reset flow",
      "description": "We are excited to announce that Bot Detection is now available in the password reset flow. This enhancement further fortifies your security posture, providing the same robust protection against bots and scripted attacks during account recovery as in the signup and login flows. \n\nThis feature is available to all our Enterprise customers with the Attack Protection add-on. To enable it, go to your Manage Dashboard and configure the “__Enforce CAPTCHA for the password reset flow__\" settings. You can choose to show a challenge Always, When Risky (based on our ML model detecting a bot), or Never (monitoring mode).\n\nTo activate Bot Detection or if you require more detailed information, please visit our [online documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or contact your account team. "
    },
    {
      "id": "6MUpL3RwMvmja3H6ydNzxn",
      "date": "2024-05-28",
      "displayDate": "May 28, 2024",
      "version": null,
      "type": "updated",
      "title": "Private Cloud Autonomous System Network Binding to Auth0 Dashboard Administrator Sessions",
      "description": "We have updated the Auth0 Dashboard for Private Cloud Environments to enforce Autonomous System Network (ASN) binding for Auth0 Dashboard Administrator sessions with release version v202422.31.0.\nPlease refer to our initial [change log](https://auth0.com/changelog#1fVhnQ1p8DBIGpeOYBtsRN) and [documentation](https://auth0.com/docs/troubleshoot/general-usage-and-operations-best-practices#asn-binding-optimization \"ASN Binding optimization\") for more information."
    },
    {
      "id": "3NQYYctLwW5zyZRXZuVEOF",
      "date": "2024-05-28",
      "displayDate": "May 28, 2024",
      "version": null,
      "type": "added",
      "title": "Highly Regulated Identity is now Generally Available",
      "description": "We are delighted to announce that Highly Regulated Identity (HRI) is now generally available. HRI incorporates a set of Financial Grade Identity™ features, defined by the OpenID FAPI Working Group and known as “FAPI v1 Advanced“ and including:\n- Mutual TLS (mTLS) for client authentication and token binding\n- PAR endpoint for submitting pushed authorization requests\n- JAR for signed JWT authorization requests\n- JWE for encrypted Access Tokens\n- RAR for rich authorization requests\n\nThis  enables customers to elevate the security of their identity solutions, protect user data and privacy, and comply with regulations for Strong Customer Authentication.\n\nYou can read more about this in our [product documentation](https://auth0.com/docs/secure/highly-regulated-identity)."
    },
    {
      "id": "2Le6BQdpCrgx2aUArXqvAp",
      "date": "2024-05-22",
      "displayDate": "May 22, 2024",
      "version": null,
      "type": "added",
      "title": "Flexible Identifiers Now Available in Open Early Access",
      "description": "We are pleased to announce the release of Flexible Identifiers, enhancing your ability to customize authentication processes. This feature allows the use of multiple attributes such as email, phone number, and username as unique identifiers, either individually or in combination, to authenticate users. Including the option to configure __Phone Number as a Sole Identifier!__\n\n![Flexible_Identifiers](https://cdn.auth0.com/blog/flex_id_screens.png)\n\n__Key Capabilities:__\n\n- Configure multiple identifiers for enhanced security and user experience. \n- Tailor login experiences to fit specific user and security requirements.\n\n__Please Note:__\n\n- Thorough testing in a development environment is recommended before deployment.\n- We’re Implementing this release in a staggered approach, it could take between 1-4 weeks for these changes to be visible in your dashboard\n- Review the [Limitations Page](https://auth0.com/docs/authenticate/database-connections/flexible-identifiers-and-attributes) in our documentation for detailed information on feature constraints.\n\nFlexible Identifiers are designed to provide a more adaptable, secure, and user-friendly authentication environment. Explore this new feature to enhance your platform's functionality and security."
    },
    {
      "id": "3kNk2HQJkWzX9iXWjGJtnh",
      "date": "2024-05-08",
      "displayDate": "May 8, 2024",
      "version": null,
      "type": "added",
      "title": "Auth Challenge Is Now Generally Available for Bot Detection!",
      "description": "Auth Challenge is the new default Bot Detection response that offers an invisible, frictionless alternative to CAPTCHA. \nAuth Challenge uses a series of non-intrusive challenges to make it tougher on bots but frictionless for users. \nRaising costs to attackers while keeping the user interaction as simple as clicking a checkbox!\n\nYou can read more about Auth Challenge enablement and  Bot Detection in our online documentation found [here](https://auth0.com/docs/secure/attack-protection/bot-detection)"
    },
    {
      "id": "mM8XQXK8NmraaCfV8T5UY",
      "date": "2024-05-07",
      "displayDate": "May 7, 2024",
      "version": null,
      "type": "added",
      "title": "Introducing Forms for Actions (Early Access)",
      "description": "Forms for Actions is a new visual editor that allows you to build custom forms that can be used to **extend your login and signup flows with additional steps and business logic.**\n\n![Forms for Actions editor](https://images.ctfassets.net/cdy7uua7fh8z/1wE620Q6gAlOXaUK66JDyx/f34ea9934aa916617def01bf7a7758b6/forms-conditional-logic.png)\n\nSome of the key capabilities of Form for Actions include:\n- **Pre-built components** with frontend and backend validations.\n- **Custom business logic** with out-of-the-box integrations with third parties.\n- **Controlled and secure experience** within your tenant's domain. Not required to redirect users to external sites.\n- **Consistent branding experience** with Universal Login.\n\nUsing Forms for Actions enables you to build use cases like progressive profiling, custom policies acceptance, custom signup or login steps... Personalization has never been easier.\n\nYou can read more about this new capability in our [Product Documentation](https://auth0.com/docs/customize/forms) and our [Blog Post.](https://auth0.com/blog/)"
    },
    {
      "id": "1CULQXuL5p0ZjnfvOXUJXn",
      "date": "2024-05-07",
      "displayDate": "May 7, 2024",
      "version": null,
      "type": "added",
      "title": "Introducing Fourth-generation Bot Detection with Third-Party Bot Score Integration",
      "description": "We’re excited to announce the launch of our fourth generation Bot Detection. This upgrade combines the capabilities of our CIC machine learning model with third-party bot scoring, significantly enhancing our ability to identify and thwart bots more effectively and safeguarding against malicious traffic.\n\nThe fourth generation Bot Detection includes a major update in our ML architecture that allows for faster model releases and a range of detection algorithms. Our testing indicates a potential increase in bot detection by up to 25%, all while maintaining minimal impact on legitimate user traffic.\n\nThis feature upgrade is available to all our Enterprise customers who subscribe to the Attack Protection add-on. We are currently rolling out this enhancement and expect to complete the process within the next few weeks, aligned with your individual release schedules.\n\nTo activate Bot Detection or if you require more detailed information, please visit our [online documentation](https://auth0.com/docs/secure/attack-protection/bot-detection) or contact your account team. We are here to assist you in ensuring your systems are secure against sophisticated threats."
    },
    {
      "id": "6By4AAKz0wNzBYXMbksCin",
      "date": "2024-05-03",
      "displayDate": "May 3, 2024",
      "version": null,
      "type": "added",
      "title": "Auth0 Teams: Team Activity Early Access",
      "description": "Auth0 Teams provides a platform to simplify viewing and management of environments, tenants and tenant members from a single pane of glass (Teams Dashboard).\n\nWe've updated the Teams Dashboard to include a new report called Team Activity under the *Reports* section of the Teams Dashboard.\n\nTeam Activity allows Team Owners to view and audit event logs generated by team members.\n![Team Activity](//images.ctfassets.net/kbkgmx9upatd/5MrBUwuqoUWtYKeTmMsd3Y/be28933605891883329fa32ccde3ddb0/Team_Activity.png)\n\nTeam owners now have visibility to events such as team member invitations, team member role changes, changes to the team security policies, and changes to the team settings.\n\nTeam Activity Early Access is now available on the Enterprise plan. Please refer to [Auth0 Teams Documentation](https://auth0.com/docs/get-started/auth0-teams/team-activity \"Team Activity Docs\") for more information.\n\nAuth0 Teams is getting more exciting new features, and we can't wait to share them with you."
    },
    {
      "id": "6INeHN6y2Im1P6KdOmurHC",
      "date": "2024-05-02",
      "displayDate": "May 2, 2024",
      "version": null,
      "type": "changed",
      "title": "Change in Team Member invite on Teams Dashboard",
      "description": "Starting May 2nd, 2024, Team Owners with accounts created using username and password would need to verify their email address before they are allowed to invite other members to the team from the Teams Dashboard.\n\n__Note__: Email verification only applies to team owner accounts created using username and password and does not apply to team owner accounts created using enterprise and social connections.\n![Teams Email Verification](//images.ctfassets.net/kbkgmx9upatd/2AdmDZGPMaQvEJ2yXDxdiP/2c6b9254c4806fa925f0c84b5f5e6eec/Email_Verification_Teams.png)"
    },
    {
      "id": "1ISFyhcuq7QF3z7yu7p43b",
      "date": "2024-04-30",
      "displayDate": "April 30, 2024",
      "version": null,
      "type": "added",
      "title": "IETF JWT Profile for Access Tokens is now available (Early Access)",
      "description": "Auth0 is happy to announce that __JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens - [RFC9068](https://datatracker.ietf.org/doc/rfc9068/) is now available in Early Access for all customers__. You will be able to opt-in to use the new profile for your Access Tokens on a per-API basis.\n\nWith this release, we are adopting an Identity industry standard to maximize compatibility and interoperability with other solutions as well as reusability of community tools. \n\nRead our public documentation to learn about the [details of the new profile](https://auth0.com/docs/secure/tokens/access-tokens/access-token-profiles) and [how to activate it for the APIs in your tenant(s)](https://auth0.com/docs/get-started/apis/configure-access-token-profile).\n\n![RFC9068-token](https://cdn.auth0.com/blog/RFC9068-token.png)"
    },
    {
      "id": "482KUXsuOA9LkKuLel7DgN",
      "date": "2024-04-24",
      "displayDate": "April 24, 2024",
      "version": null,
      "type": "added",
      "title": "Multiple Credentials Per Okta FGA Store",
      "description": "Developers need to manage how applications are able to interact with an Okta FGA store. Some applications need full permissions, others write permissions, read permissions, or only permissions to update the authorization model.\n\nYou can now create multiple credentials for an Okta FGA store with different sets of permissions. So whether your client-facing application only needs read access while your Continuous Integration deployment needs the ability to write an authorization model, you are in control of security from the Okta FGA dashboard.\n\nYou can learn more by following the [How To Get Your API Keys](https://docs.fga.dev/integration/getting-your-api-keys) tutorial to create a new credential. "
    },
    {
      "id": "3pNrp3jXN97SOmN8WFVgYl",
      "date": "2024-04-16",
      "displayDate": "April 16, 2024",
      "version": null,
      "type": "added",
      "title": "Privacy Manifests added for iOS Guardian App & SDK",
      "description": "Okta CIC has added a privacy manifest file to the iOS Guardian app & SDK – the privacy manifest file describes the data that apps & third-party SDKs collect and supplies the reasons required APIs that the app & SDK use. \n\nThe privacy manifest file is in support of the [requirements](https://developer.apple.com/support/third-party-SDK-requirements/) put forth by Apple to ensure transparency and allow users to make informed decisions about their privacy. The manifests include details on the types of data collected, how the data is used, and whether it is shared with third parties. Read more information about [Apple’s privacy manifests](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests) and the [required reason API](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)."
    },
    {
      "id": "2aMbsLlrjKyFrD4JYSY0d4",
      "date": "2024-04-16",
      "displayDate": "April 16, 2024",
      "version": null,
      "type": "updated",
      "title": "Updates to WCAG 2.2 AA Compliance for Universal Login (Early Access)",
      "description": "Okta CIC is proud to announce the next round of improvements to Universal Login as part of our efforts to reach WCAG 2.2 AA guideline conformance. This release includes the following improvements.\n* **Client-side validation of email addresses.** These validations follow the same formatting rules as the server-side validation\n* **Accessible Labels.**  We cleaned up the duplicate labels in the HTML and properly associated them with their respective input fields.\n* **Password Complexity Requirements.** These will now be properly announced by screen readers.\n* **Announce Inline Error Message.** We added the proper aria attributes to the Inline error messages so that they can be understood and properly announced by screen readers.\n* **Consistent Page Titles.** Every screen in our authorization flows now has a useful and distinct page title. \n*  **Visually Indicate Required Fields.** Required fields now include a visual indicator within the label.\n\nTo view all the changes and learn more see the [Support Center article](https://support.auth0.com/notifications/66106b9351d014c651b1fa45)"
    },
    {
      "id": "jZ2BzCnuCBpAjCzIm4sOl",
      "date": "2024-04-15",
      "displayDate": "April 15, 2024",
      "version": null,
      "type": "added",
      "title": "Modular Models for Okta FGA",
      "description": "Given authorization is application specific, the rules governing application authorization should be managed by the application team. \n\nOkta FGA now enables you to compose an authorization model from multiple modules. Each module lives in a different file, owned by each application team.\n\nFor example, if a company has 3 teams that own different components:\n\n- The core authorization entities that are shared across the organization\n- A wiki component\n- An issue tracking component\n\nEach team will be able to manage their own module in independent files whose ownership can be defined in your source control system (e.g. Github CODEOWNERS).\n\nThe modules will be combined in a single model when written to Okta FGA.\n\nLearn more about Modular Models in the [Okta FGA documentation](https://docs.fga.dev/modeling/modular-models \"Modular Models documentation\").\n"
    },
    {
      "id": "2ahSBp677KMor4j0VBwMyo",
      "date": "2024-04-15",
      "displayDate": "April 15, 2024",
      "version": null,
      "type": "added",
      "title": "Java Spring integration for Okta FGA",
      "description": "[Okta FGA](https://fga.dev) is now very easy to integrate with Java Spring Security, using the [OpenFGA Spring Boot Starter](https://github.com/openfga/spring-boot-starter).\n\nIn a nutshell, you can now use the @PreAuthorize Spring Security annotation with an `fga` bean that will require an authorization check to pass before executing a method:\n\n    // Method body will only execute if the FGA check returns true. 403 otherwise.\n    @PreAuthorize(\"@fga.check('document', #docId, 'reader', 'user', authentication?.name)\")\n    public Document getDocument(@PathVariable String docId) { \n       return repository.findById(id);\n    }\n\nYou can learn more in the [OpenFGA Spring Boot Starter](https://github.com/openfga/spring-boot-starter) repository."
    },
    {
      "id": "3UZn3VXSR4Ow1nv7zXoExm",
      "date": "2024-04-08",
      "displayDate": "April 8, 2024",
      "version": null,
      "type": "fixed",
      "title": "Introducing WCAG 2.2 AA Compliance for Universal Login (Early Access)",
      "description": "Okta CIC is proud to announce an opt-in, Early Access release of several accessibility improvements to Universal Login as part of our efforts to reach WCAG 2.2 AA guideline conformance. This release allows customer to opt-in to these and future improvements that we will be rolling out in the coming weeks. Once enabled, improvements will be automatically applied to Universal Login as they are released. To learn more see the [Support Center article](https://support.auth0.com/notifications/66106b9351d014c651b1fa45)\n\n![WCAG 2.2 AA Opt-in Toggle](//images.ctfassets.net/kbkgmx9upatd/6g95QCahKo6kzgqUq7uewt/a44d0a4c46b885b66e09ee7c8b88bdad/Screenshot_2024-04-05_at_3.31.39_PM_2.png)\n"
    },
    {
      "id": "3x31mnVb0t6IoMKDgoYXB9",
      "date": "2024-03-21",
      "displayDate": "March 21, 2024",
      "version": null,
      "type": "updated",
      "title": "Auth0 Public Cloud IP Allow List updates",
      "description": "Auth0 is excited to share an updated list of IP addresses for allow listing on Public Cloud regions, as follows. The updates include, but are not limited to, GeoHA enhancements to Australia and Japan Public Cloud regions. \n\nRequest your attention if IP allow list is being used or planned to be used for your deployment on Auth0 Public Cloud. Please refer to [Auth0 IP Addresses for Allow Lists](https://auth0.com/docs/secure/security-guidance/data-security/allowlist \"Auth0 IP Addresses for Allow Lists\") for further information on when IP allow list could be required. \n\n__United States__\n\n174.129.105.183 , 18.116.79.126 , 18.117.64.128 , 18.191.46.63 , 18.218.26.94 , 18.232.225.224 , 18.233.90.226 , 3.131.238.180 , 3.131.55.63 , 3.132.201.78 , 3.133.18.220 , 3.134.176.17 , 3.19.44.88 , 3.20.244.231 , 3.21.254.195 , 3.211.189.167 , 34.211.191.214 , 34.233.19.82 , 34.233.190.223 , 35.160.3.103 , 35.162.47.8 , 35.166.202.113 , 35.167.74.121 , 35.171.156.124 , 35.82.131.220 , 44.205.93.104 , 44.218.235.21 , 44.219.52.110 , 52.12.243.90 , 52.2.61.131 , 52.204.128.250 , 52.206.34.127 , 52.43.255.209 , 52.88.192.232 , 52.89.116.72 , 54.145.227.59 , 54.157.101.160 , 54.200.12.78 , 54.209.32.202 , 54.245.16.146 , 54.68.157.8 , 54.69.107.228\n\n__Europe__\n\n18.197.9.11 , 18.198.229.148 , 3.125.185.137 , 3.65.249.224 , 3.67.233.131 , 3.68.125.137 , 3.72.27.152 , 3.74.90.247 , 34.246.118.27 , 35.157.198.116 , 35.157.221.52 , 52.17.111.199 , 52.19.3.147 , 52.208.95.174 , 52.210.121.45 , 52.210.122.50 , 52.28.184.187 , 52.30.153.34 , 52.57.230.214 , 54.228.204.106 , 54.228.86.224 , 54.73.137.216 , 54.75.208.179 , 54.76.184.103\n\n__Australia__\n\n13.210.52.131 , 13.238.180.132 , 13.55.232.24 , 16.50.37.252 , 16.51.137.244 , 16.51.49.47 , 54.153.131.0 , 54.252.2.143 , 54.79.31.78\n\n__Japan__\n\n13.208.85.227 , 15.152.185.222 , 15.152.2.46 , 15.152.28.221 , 15.152.56.146 , 15.152.95.63 , 176.34.22.106 , 35.74.30.168 , 43.206.201.6 , 46.51.243.250 , 54.150.87.80 , 54.248.192.141\n\n__UK__\n\n18.135.40.36 , 3.10.89.10 , 3.8.59.62\n"
    },
    {
      "id": "4fpSey5rWQ4yUCKyONcTee",
      "date": "2024-03-19",
      "displayDate": "March 19, 2024",
      "version": null,
      "type": "added",
      "title": "Progressive Factor Enrollment is now available!",
      "description": "Using the post-login action, you can now easily customize your MFA flows to prompt users to enroll in specific factors. After a user enrolls in a factor, they can use that factor as a secondary method of authentication in future logins. Customer Identity Cloud (CIC) now includes two new commands in the post-login API object: enrollWith and enrollWithAny. \n\nThese commands, paired with our recent [Customize MFA Factor Selection](https://auth0.com/docs/secure/multi-factor-authentication/customize-mfa-selection-nul) feature release, allow you to specify precisely how to enroll and challenge the user with MFA factors based on contextual signals about the user, the organization, or the application they are logging into.\n\nThese changes provide greater flexibility with MFA to:\n- design an authentication flow that reduces friction\n- cater to your end-users’ preferences \n- align authentication with your organization's security policies\n\nYou can read more about this new capability in our [Product Documentation](https://auth0.com/docs/secure/multi-factor-authentication/customize-mfa-enrollments)."
    },
    {
      "id": "4B35QGExNzv6jtawLcj9tg",
      "date": "2024-03-13",
      "displayDate": "March 13, 2024",
      "version": null,
      "type": "updated",
      "title": "Guardian App and SDK now support OTP enrollment without requiring a QR code",
      "description": "End users can now enroll in One-time Password (OTP) Multi-factor Authentication (MFA) using the Guardian App or a custom app using the Guardian SDK on the same mobile device as the application. This allows users to complete OTP MFA enrollment flows using Guardian without having to scan a QR code.\n\n![Guardian Mobile Only Enrollment](//images.ctfassets.net/kbkgmx9upatd/1suDRbNWCiSxcpZj6Dg8bz/972df92ba094ed532bc0c4cfcf6a8fa2/guardian_mobile_enroll_ul_enrollcode.png)\n\nRead our documentation to [learn more](https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian)."
    },
    {
      "id": "6ibgLorpYKhoeqcyfdfnqF",
      "date": "2024-03-05",
      "displayDate": "March 5, 2024",
      "version": null,
      "type": "added",
      "title": "Okta Fine Grained Authorization is now Generally Available",
      "description": "Okta Fine Grained Authorization is generally available in the US, Europe and Australia regions. \n\nIt enables developers to implement authorization in a way that’s centralized, flexible, fast, scalable, and easy to use.\n\nIt's based on [OpenFGA](https://openfga.dev/), an open source project owned by the [Cloud Native Computing Foundation](https://cncf.io/) for which Okta is a core maintainer.\n\nTry it for free at https://dashboard.fga.dev/, or learn more about it on the [product documentation](https://docs.fga.dev/fga)."
    },
    {
      "id": "2BINmZe7n0jd9BkxuSYTFD",
      "date": "2024-02-28",
      "displayDate": "February 28, 2024",
      "version": null,
      "type": "added",
      "title": "New Sessions and Refresh Token Management APIs",
      "description": "As part of our commitment to protect users, we are giving developers remote control of their users' authentication status through additional management API endpoints. These endpoints enable developers to list, explore, and terminate all or individual __sessions and refresh tokens__. \n\nAccess to the [sessions via API](https://auth0.com/docs/manage-users/sessions/manage-user-sessions-with-auth0-management-api) endpoints is generally available to all customers with an Enterprise plan. Additionally, eligible customers have the opportunity to participate in the early access program for the [Refresh-Token API endpoints](https://auth0.com/docs/secure/tokens/manage-refresh-tokens-with-auth0-management-api). \n\nIt is important to note that the newly introduced session revocation methods will soon incorporate the corresponding session-deleted along with [previous initiators](https://auth0.com/docs/authenticate/login/logout/back-channel-logout/oidc-back-channel-logout-initiators), progressively becoming available in the coming days."
    },
    {
      "id": "xqTSjK07nnYsfdi2UJkmo",
      "date": "2024-02-26",
      "displayDate": "February 26, 2024",
      "version": null,
      "type": "updated",
      "title": "Customizations for Signup and Login are Generally Available in CIC!",
      "description": "Businesses using Customer Identity Cloud’s Universal Login can leverage a new pro-code option to customize signup and login flows to address their unique needs. This new capability is available to customers on Professional plans or higher and allows them to address unique data capture, security, and compliance (terms of service) requirements.\n\nInterested in learning more? See our [online documentation](https://auth0.com/docs/customize/universal-login-pages/customize-signup-and-login-prompts) for detailed instructions and examples."
    },
    {
      "id": "3xmuk9NXS049LqPzAXx9Is",
      "date": "2024-02-26",
      "displayDate": "February 26, 2024",
      "version": null,
      "type": "updated",
      "title": "New Log Event Schema Available",
      "description": "Okta Customer Identity Cloud (CIC) recently published CIC log schemas (V1). This repository contains schemas for Log events documented [here](https://auth0.com/docs/deploy-monitor/logs). \nFor more information please reference the [Github repository](https://github.com/auth0/auth0-log-schemas)"
    },
    {
      "id": "6y0r0SX4JEmtj8S4FeE5s9",
      "date": "2024-02-22",
      "displayDate": "February 22, 2024",
      "version": null,
      "type": "updated",
      "title": "Support for Cisco Duo Web SDK V4",
      "description": "Okta Customer Identity Cloud (CIC) now supports [Duo Web SDK V4 for MFA](https://auth0.com/docs/secure/multi-factor-authentication/configure-cisco-duo-for-mfa). \n\nIf you are currently using Duo Web SDK V2, additional information about this change was or will be sent to your tenant administrators, including detailed instructions and links to related documentation. See also: [Duo Web SDK V4](https://duo.com/docs/duoweb) and [Duo Universal Prompt Update Guide](https://duo.com/docs/universal-prompt-update-guide)."
    },
    {
      "id": "59mvGHHqPhE0PmfF2Ipz1A",
      "date": "2024-02-14",
      "displayDate": "February 14, 2024",
      "version": null,
      "type": "updated",
      "title": "Auth0 Teams General Availability",
      "description": "Auth0 Teams consolidates managing tenants, tenant members and your subscription in one central place. We are happy to announce Teams Environment and Tenant Management support for our Private Cloud customers.\n![Private Cloud Environment View](//images.ctfassets.net/kbkgmx9upatd/2ABjQkcbIP4xicCOXwTjAV/e9514011058a1342af3790346e46f659/Environment_List_Private_Cloud_crop.png)\n\n![Tenant List Private Cloud](//images.ctfassets.net/kbkgmx9upatd/6xRk4CsGOlLIJBS0UbOKtQ/173be8377bf1852f2e9c41fe459002ae/Tenant_List_Private_Cloud_crop.png)\n\nThe release of Teams General Availability marks another significant milestone, completing the support of all plan types on the Auth0 Teams architecture. Our enterprise customers can now view and manage environments and tenants that belong to both Private and Public Clouds.\n\nPlease refer to Auth0 Teams [Documentation](https://auth0.com/docs/get-started/auth0-teams \"Auth0 Teams\") for more information. Contact your Technical Account Manager or Auth0 Support to provision Auth0 Teams if you are an Enterprise customer and begin the journey of centralized visibility and control with us.\n\nMore exciting new features are coming to Auth0 Teams, and we can't wait to share them with you. Please continue to look for Auth0 Teams product announcements in the future."
    },
    {
      "id": "1bz694J9WGJJdmYOjGFL6v",
      "date": "2024-02-14",
      "displayDate": "February 14, 2024",
      "version": null,
      "type": "updated",
      "title": "Change in Tenant Member Invite on Auth0 Dashboard",
      "description": "Starting February 14th, 2024, Tenant admins with accounts created using username and password would need to verify their email address before they are allowed to invite other members to the tenant from the Auth0 Dashboard.\n\n__Note__: Email verification only applies to tenant admin accounts created using username and password and does not apply to tenant admin accounts created using enterprise and social connections.\n![Email Verification](//images.ctfassets.net/kbkgmx9upatd/3zHu4XPW8Rzbz9u2RYlS0v/2e60aa61dc296d14aa9fc237df876005/image__6_.png)"
    },
    {
      "id": "7ygUUKUXvkVWzgg1SwLJmo",
      "date": "2024-02-09",
      "displayDate": "February 9, 2024",
      "version": null,
      "type": "updated",
      "title": "New OIDC Back-Channel Logout Initiators Generally Available",
      "description": "__Initiators__ hook up to session termination events to request applications to log users out whenever that session is invalidated at Auth0. An initiator can be any cause of a session ending. This allows you to move from user-interactive single-logout to server-initiated distributed logout effortlessly on top of the __OIDC Back-Channel Logout__ specification.\n\nThis update includes __Account Deleted__ and __Email Changed__ in the existing list of logout initiators: __Password Changed__, __Session Expired__, and various __Logout__. Your applications can subscribe to individual or all initiators. For example, you can use Account Deleted to, in combination with OIDC Back-Channel Logout, remotely log the user out upon removing the account. \n\n![Back-Channel Logout Webhook Configuration](//images.ctfassets.net/kbkgmx9upatd/60MVtFT4Xkt6SMWVIJ8Ay0/2f0b4098952631886009795dc8b0e8f0/image.png)\n\nWant to know more? Check out our [public documentation](https://auth0.com/docs/authenticate/login/logout/back-channel-logout/oidc-back-channel-logout-initiators) and follow our updates as we incorporate more functionalities. "
    },
    {
      "id": "1fVhnQ1p8DBIGpeOYBtsRN",
      "date": "2024-02-09",
      "displayDate": "February 9, 2024",
      "version": null,
      "type": "updated",
      "title": "Autonomous System Network Binding to Auth0 Dashboard Administrators Sessions",
      "description": "At Okta, we take security seriously, so we made further updates as part of our continued efforts to help keep your Auth0 and Teams dashboard user accounts secure. Starting today, the session cookies of both Teams and Auth0 Dashboard dashboard users will now be bound to the originating Autonomous System Network (ASN) as part of the session creation.\n\nWhat does this mean? Suppose, in an unforeseen situation, the session cookies are compromised. In that case, existing sessions will be invalidated, and the user hijacking the session will be forced to log in again if they attempt to access from a different workstation outside of the ASN bound to the session cookie."
    },
    {
      "id": "6nM8ru8yXf1koT2j5Hgpsl",
      "date": "2024-02-07",
      "displayDate": "February 7, 2024",
      "version": null,
      "type": "added",
      "title": "Introducing Early Access for our new Bot Detection Response: Auth Challenge!",
      "description": "This invisible, frictionless captcha alternative uses a series of browser and device challenges to make it tougher on bots but frictionless for users. \n\nAuth Challenge raises costs to attackers while keeping the user interaction as simple as clicking a checkbox!\n\nCheck out the details on configuring Auth Challenge in our online documentation [here](https://auth0.com/docs/secure/attack-protection/bot-detection#configure-bot-detection)."
    },
    {
      "id": "2H5Pg6TpSi5OhIiSBQs8zg",
      "date": "2024-02-02",
      "displayDate": "February 2, 2024",
      "version": null,
      "type": "changed",
      "title": "MFA for Auth0 Dashboard Administrators",
      "description": "As part of our continued efforts to help keep your dashboard user accounts secure, we now require dashboard users that log in with either username and password or 3rd party social connection apps to enrol into MFA.\n\nNote: This change applies to your Auth0 account login and does not impact applications or websites you have configured with Auth0.\n\nRead our [documentation](https://auth0.com/docs/get-started/manage-dashboard-access/add-change-remove-mfa \"MFA for Dashboard Admins Documentation\"), and [community post](https://community.auth0.com/t/action-required-multifactor-authentication-mfa-for-auth0-by-okta-administrators/125827 \"MFA for Auth0 by Okta Community Post\") for more information.  \n\nReady to start using MFA as part of a more secure login flow? You can configure it in your [user profile](https://manage.auth0.com/#/profile \"Auth0 User Profile\"). \n\nRead more about how to [configure Multi-Factor Authentication](https://auth0.com/docs/get-started/manage-dashboard-access/add-change-remove-mfa/add-mfa \"Configure MFA for Dashboard Users\") for Dashboard Users.\n\nNeed to request an MFA reset? Review this [post](https://community.auth0.com/t/account-locked-mfa-resets-requests/22920 \"Locked MFA resets\")."
    },
    {
      "id": "3wNF2uOPTIJLGWvwoQGGsw",
      "date": "2024-02-01",
      "displayDate": "February 1, 2024",
      "version": null,
      "type": "updated",
      "title": "Session Timeout and Max Session Age Values Configurable for Private Cloud",
      "description": "Starting today, our Private Cloud customers can now request Session Timeout and Max Session Age value changes for their Auth0 Dashboard users (admins and non-admins). Please reach out to your Technical Account Manager for more information."
    },
    {
      "id": "1A1f1juj4J0EX0zYNvMUqj",
      "date": "2024-02-01",
      "displayDate": "February 1, 2024",
      "version": null,
      "type": "added",
      "title": "“Show as Button” for Organization associated Enterprise Connections",
      "description": "Today we released support to choose whether you show an Enterprise Connection during Organization based logins. Similar to how Enterprise Connections work at the Application level, you can now navigate to Organizations -> “Your Organization” -> Connections -> “Your Connection” and then select whether you want to display that connection as a button on the login screen. \n\nPaired with Home Realm Discovery, this gives you powerful options to utilize hidden enterprise connections to support multiple customers using a single organization login, or hiding a support staff login from a customer’s organization.\n\nTo learn more, check out the [documentation](https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-connections).\n"
    },
    {
      "id": "6j9n8myoTZfz5nvD5hnmFE",
      "date": "2024-01-31",
      "displayDate": "January 31, 2024",
      "version": null,
      "type": "added",
      "title": "Inbound SCIM is now in Limited Early Access",
      "description": "We’re excited to announce that Inbound SCIM for Okta Customer Identity Cloud is now in Early Access. Customers can now go live with their SCIM integrations if they choose. In addition, the EA supports SCIM for Enterprise identity providers integrated using all three of these connection types: SAML; Okta Workforce  (OpenID Connect); OpenID Connect"
    },
    {
      "id": "5GFvIFT7X0vwqoIQqEQC3R",
      "date": "2024-01-31",
      "displayDate": "January 31, 2024",
      "version": null,
      "type": "added",
      "title": "Highly Regulated Identity is now in Limited Early Access",
      "description": "We are happy to announce Limited Early Access availability of advanced identity security solutions for customers operating in highly regulated industries. These incorporate a set of Financial Grade Identity™ features, defined by the OpenID FAPI Working Group and known as __FAPI v1 Advanced__. This  enables customers to elevate the security of their identity solutions, protect user data and privacy, and comply with regulations for __Strong Customer Authentication__.\n\n![Strong Customer Authentication Example](https://cdn.auth0.com/blog/hri-sca-example.png)\n\nYou can read more about this in our [public documentation](https://auth0.com/docs/secure/highly-regulated-identity)."
    },
    {
      "id": "3CBET2mBWyqK0RS6poEJiC",
      "date": "2024-01-31",
      "displayDate": "January 31, 2024",
      "version": null,
      "type": "added",
      "title": "Passkeys are Generally Available",
      "description": "We’re excited to announce __passkeys are now Generally Available__ in the Okta Customer Identity Cloud to help businesses drive greater sign-up and sign-in conversion without compromising end-user security. \n\nThis release builds off our existing [Early Access implementation](https://www.okta.com/press-room/press-releases/okta-launches-passkey-support-to-help-enterprises-unlock-a-passwordless/) and makes it easier for larger enterprises with a [custom database](https://auth0.com/docs/manage-users/user-migration#automatic-migrations) to adopt passkeys using lazy migration and reduce their customer's reliance on passwords. We’ve also improved the developer experience by expanding our [SDK Libraries](https://auth0.com/docs/libraries) support.\n\nWith passkeys, Auth0 customers can transform their sign-in process, enjoying faster, easier, and more secure access to websites and applications. Passkeys are FIDO credentials that are discoverable by browsers or by security keys for passwordless authentication. Based on FIDO Alliance and World Wide Web Consortium (W3C) standards, passkeys replace the need for passwords by using cryptographic key pairs, ensuring robust protection against phishing and enhancing the overall user experience.\n\nThis feature will be gradually rolled out to all customers across all plans, starting Jan 31, 2024. Initially, it'll be available in the public cloud, followed by a rollout in private cloud environments a few weeks later as per the release pipeline.\n\nFor your existing users with passwords, we offer a seamless progressive enrollment process to add passkeys for subsequent logins, ensuring a smooth transition to enhanced security.\n\nBefore you get started, please note that there are certain prerequisites to enable passkeys. Make sure to review these requirements in our [documentation](https://auth0.com/docs/authenticate/database-connections/passkeys/configure-passkey-policy) to ensure a seamless setup process.\n\nReady to try out passkeys in your application? Check out this [implementation post](https://www.okta.com/blog/2023/10/adding-passkeys-to-your-apps-with-okta-cic-powered-by-auth0/) and our [online documentation](https://auth0.com/docs/authenticate/database-connections/passkeys) for step-by-step guidance on configuration."
    },
    {
      "id": "2GnLMTVYDtbQqbPirHvWG2",
      "date": "2024-01-31",
      "displayDate": "January 31, 2024",
      "version": null,
      "type": "added",
      "title": "Public Performance 2X (200 RPS) Add-on",
      "description": "Enterprise customers with Public Cloud-based tenants may now receive request rates in excess of 100 RPS.  Public Performance is an add-on to a Customer’s existing Public Cloud deployment allowing for request rates up to 200 RPS for 48 hours per month.  The add-on is intended to provide customers the ability to grow their traffic on Auth0 in more affordable Public Cloud environments before upgrading to Private Cloud.  \n\nFor more information, please see [Rate Limit Policy docs ](https://auth0.com/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy#public-performance)"
    },
    {
      "id": "5YcDgKlMJSnRP4QoeArrOm",
      "date": "2024-01-16",
      "displayDate": "January 16, 2024",
      "version": null,
      "type": "updated",
      "title": "New Mapped Claim Available for Google Connection Users",
      "description": "We have introduced a new claim mapping for the Google hd claim to Auth0 idp_tenant_domain.  This new claim, made available with Auth0 PostLogin Actions can be leveraged to validate the Google organization an end-user is authenticating with.  Check out [Auth0 PostLogin Action Object](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/event-object) for more information."
    },
    {
      "id": "3EDl94BrmvdZrGQGVEE1J8",
      "date": "2024-01-05",
      "displayDate": "January 5, 2024",
      "version": null,
      "type": "updated",
      "title": "WCAG Compliance 2.2 AA Updates",
      "description": "We are excited to announce our first round of accessibility fixes and updates to New Universal Login required for WCAG 2.2 AA compliance!\n\n###### This release focused on the MFA Country Code Selector\n\nUsers that rely on screen readers will now have a much easier time navigating the country code selector. We also added a shiny new search/filter input to make it possible for all users to efficiently find and select their country code. These changes are already in production for most environments!\n\n![Updated Country Code Selector](//images.ctfassets.net/kbkgmx9upatd/3BQYVjTiiTWrdy5l4adCBc/e4bd67548c5f0478b7dd8baf61319b59/Screenshot_2024-01-04_at_4.20.54_PM.png)"
    },
    {
      "id": "3T4PThJVkrL2JiH4aGmrr0",
      "date": "2023-12-18",
      "displayDate": "December 18, 2023",
      "version": null,
      "type": "updated",
      "title": "Teams: Administrator session timeout updated",
      "description": "We’ve reduced session timeout due to inactivity and also implemented a session age for administrator sessions on Teams dashboard to 12 hours.\n\nFor administrators working in Teams dashboard day to day, more frequent challenges to log after 12+ hours.\n\nWe’ve also reduced the session age for administrator sessions on Teams dashboard. After 12+ hours from last successful login inactivity, the Teams session will time out, and administrators will have to log back in."
    },
    {
      "id": "1rsiqUDNRVzQG9bLvGyaJU",
      "date": "2023-12-18",
      "displayDate": "December 18, 2023",
      "version": null,
      "type": "updated",
      "title": "Auth0 Dashboard session age",
      "description": "We’ve reduced the session timeout for the session age for administrator sessions on  Auth0 Dashboard down to 12 hours.\n\nFor administrators working within Auth0 Dashboard day to day, you will be prompted to re-authenticate after 12 hours from your last login activity.\nThis change does not affect any sessions configured for your end users interacting with your applications integrated with Auth0 identity services. The changes only apply to administrator sessions on Auth0 Dashboard.\n"
    },
    {
      "id": "2zJ27iP9uIvMwuKlwm14CJ",
      "date": "2023-12-15",
      "displayDate": "December 15, 2023",
      "version": null,
      "type": "added",
      "title": "Templates for Actions is now available ",
      "description": "Have you ever had challenges in writing an Action from scratch? Now, Templates for Actions help you jumpstart with pro-code Actions within seconds!\n\nHead over to Actions and choose \"build from Templates\" - We have offered a growing list of templates for Actions across different triggers and use cases. Start use Actions to __customize MFA setting__ and __verify access control__ by choosing relevant templates.\n\n![Template for Actions](//images.ctfassets.net/kbkgmx9upatd/6DxKmO8k52TMgYG16ZWgQv/e18f013cb3a69a7b6f236ced8ce48d82/Screenshot_2023-12-15_at_11.45.36_AM.png)\nYou can learn more about Templates for Actions from our [doc site](https://auth0.com/docs/customize/actions/actions-templates).\n"
    },
    {
      "id": "2WewEcX4t4UNAeRKP615c8",
      "date": "2023-12-14",
      "displayDate": "December 14, 2023",
      "version": null,
      "type": "added",
      "title": "Password Reset / Post Challenge Actions Trigger now Available",
      "description": "We are happy to announce a new Actions trigger for password reset flows is now generally available.  This new extensibility point allows developers to block specific password reset requests, customize the password reset flow to require MFA, leverage a redirect to complete additional validation by a third party, and leverage an Auth0 Marketplace integration in the password reset flow.  [Read more](https://auth0.com/docs/customize/actions/flows-and-triggers/password-reset)\n"
    },
    {
      "id": "5uF3zJptX3q0dbfKHaMT7q",
      "date": "2023-11-30",
      "displayDate": "November 30, 2023",
      "version": null,
      "type": "updated",
      "title": "Teams: Tenant Search",
      "description": "Do you sit and stir at the screen, scrolling through the tenant page filled with many tenants on the Teams dashboard? As your luck may have it, only to find the tenant on the last page?\nTeams Dashboard allows you to search quickly for a tenant that belongs to the team.\n![Tenant Search](//images.ctfassets.net/kbkgmx9upatd/7a2uqaIgPPzmpC2ILxxq3m/21b99b662184a5834e5f2bb871faece0/Tenant_Search.png)"
    },
    {
      "id": "5MMBWZVUyajeSt7gIr47Fq",
      "date": "2023-11-23",
      "displayDate": "November 23, 2023",
      "version": null,
      "type": "updated",
      "title": "HAR Files Are Now Sanitized Automatically in Support Center",
      "description": "\nNow, when attaching .HAR files within a ticket via Support.Auth0.com, the file is sanitized. To use:\n1. Navigate to the Auth0 Support Center\n2. Select Open Ticket\n3. To trigger the file sanitization, simply attach/upload the .HAR file to the existing ticket or new ticket.\n4. The file is sanitized at the client side before the file is uploaded to the portal.\n5. The original trace is not uploaded prior to sanitization.\n6. Filename after sanitization and upload: <file_name>_sanitized.har. You can download the sanitized file if you want to inspect it. \n\nDo not attempt to upload zipped or compressed HAR files because those files will not trigger the sanitization. Only .har files are processed.\n\n*While Okta will attempt to identify sensitive data for you, you acknowledge that it is your responsibility, and not Okta’s, to identify sensitive data in HAR files that you want to be redacted.*\n\nFor more information on generating HAR files, see [this documentation](https://auth0.com/docs/troubleshoot/troubleshooting-tools/generate-and-analyze-har-files)."
    },
    {
      "id": "kbkar0TirGjLItJx4tyzH",
      "date": "2023-11-21",
      "displayDate": "November 21, 2023",
      "version": null,
      "type": "fixed",
      "title": "Improved API Support for Language-Specific MFA Enrollment Tickets",
      "description": "Customers can now pass the `email_locale` parameter when invoking an MFA enrollment via API to generate MFA enrollment tickets and render Universal Login enrollment prompts in the specified language. This is a fix to a known issue where Universal Login enrollment prompts were defaulting back to English instead of rendering in the specified language. [Read more](https://support.auth0.com/notifications/655d1d67bf64915c7aff7514)."
    },
    {
      "id": "25VjKrwPSMiazLGuknlQWA",
      "date": "2023-11-17",
      "displayDate": "November 17, 2023",
      "version": null,
      "type": "added",
      "title": "New Private Cloud Region in Indonesia",
      "description": "On the heels of announcing the new Private Cloud regions in Australia and Japan, we're thrilled to launch Private Cloud deployments in a brand new country - Indonesia - leveraging Jakarta AWS region.\n\nThis region expands Auth0's geographical availability and addresses Indonesian customers' data residency needs. We stand committed to meeting our customers where they are, both figuratively and literally."
    },
    {
      "id": "1rxzWUkPuhorsM02h643yD",
      "date": "2023-11-16",
      "displayDate": "November 16, 2023",
      "version": null,
      "type": "added",
      "title": "Okta Access Gateway (OAG) integration is now Generally Available",
      "description": "[Okta Access Gateway (OAG)](https://help.okta.com/oag/en-us/content/topics/access-gateway/ag-main.htm) is a solution designed to extend modern identity to legacy on-prem applications to protect your hybrid cloud. Now, you can easily set up Okta Access Gateway to use Auth0 as the identity provider to authenticate users and have Single Sign-On (SSO) when accessing these on-prem applications. \n\nTo learn more, read [our documentation](https://auth0.com/docs/authenticate/single-sign-on/okta-access-gateway).\n\n![oag-auth0-integration](https://cdn.auth0.com/blog/oag-auth0-integration.png)"
    },
    {
      "id": "fXjVRjkGGmpkvFwMXlX21",
      "date": "2023-11-15",
      "displayDate": "November 15, 2023",
      "version": null,
      "type": "added",
      "title": "OIDC Back-Channel Logout new Initiators (Now in Early Access)",
      "description": "We are happy to share that we are expanding the use cases of OIDC Back-Channel Logout with new Logout Initiators (Early Access). \n\n__“Don't call us, we'll call you”__\n\nWhat is this feature? Initiators hook up to session termination events to request applications to log users out whenever that session is invalidated at Auth0. __An initiator can be any cause of a session ending__, like a Password Changed or a Session Expired. This allows you to move from user-interactive single-logout to server-initiated distributed logout effortlessly on top of the OIDC Back-Channel Logout specification. \n\n__Want to know more?__ Check out our [public documentation](https://auth0.com/docs/authenticate/login/logout/back-channel-logout/oidc-back-channel-logout-initiators) and follow our updates as we incorporate more functionalities. This functionally requires access to the [OIDC Back-Channel Logout](https://auth0.com/docs/authenticate/login/logout/back-channel-logout) functionality already generally available for enterprise plans."
    },
    {
      "id": "6VpF9qv9jeJmFUqONfxyTx",
      "date": "2023-11-09",
      "displayDate": "November 9, 2023",
      "version": null,
      "type": "added",
      "title": "New Private Cloud Regions in Australia and Japan",
      "description": "We are delighted to announce support for Private Cloud deployments in two new AWS regions - __Melbourne, Australia__ and __Osaka, Japan__ as part of continual geographical availability and reliability enhancements. \n\nEither of these regions could be used as:\n- Primary region for new Private Cloud deployments \n- Failover region for Private Cloud GeoHA deployments, which have primary region in the existing Sydney and Tokyo AWS regions respectively\n\nWith the introduction of these Private Cloud regions, customers with be able to satisfy GeoHA as well as Data residency requirements in Australia and Japan."
    },
    {
      "id": "T7JxXNT62qaPm9HNkDGjS",
      "date": "2023-11-08",
      "displayDate": "November 8, 2023",
      "version": null,
      "type": "added",
      "title": "Adaptive MFA Now Has Phone Assessment Data Available!",
      "description": "We have recently enhanced our Adaptive MFA risk assessment object to expose three additional phone attributes: line type, region, and provider!\n\nIn combination with Actions you can customize your Adaptive MFA flow to leverage and trigger challenges based on these new attributes in the risk assessment object.\n\nTo read more about the new phone attributes in the Adaptive MFA, you can check out our online documentation [here](https://auth0.com/docs/secure/multi-factor-authentication/adaptive-mfa/customize-adaptive-mfa#phonenumber-assessment).\n\nTo learn more on how to use Adaptive MFA with Actions, check out the following documentation [here](https://auth0.com/docs/secure/multi-factor-authentication/adaptive-mfa/customize-adaptive-mfa#action-templates)"
    },
    {
      "id": "1EDwbToxDlER3aEIJUkT5c",
      "date": "2023-11-08",
      "displayDate": "November 8, 2023",
      "version": null,
      "type": "added",
      "title": "Teams: Tenant Member Management Early Access",
      "description": "You asked, we listened and delivered! Introducing the much anticipated Teams feature, Tenant Member Management. Designed to help you centrally manage your onboarding and off-boarding workflow of tenant dashboard members. \n\nWe have received much feedback from our users, and this feature will significantly improve your experience with our product.\n\nHere are some key benefits of Teams Tenant Member Management:\n- Team Owners centrally grant dashboard users access to one or more tenants.\n- Assign Team Members more than one App at a time for Editor - Specific Apps role.\n- A new \"Contributor\" role for Team Members, to view and access specific tenants they are members from Teams Dashboard.\n- Just In Time, Team members' accounts are auto-created in Teams based on successful login using your enterprise IdP.\n\nWant to experience improved account management with friction-reducing Teams Tenant Member Management? Our [documentation](https://auth0.com/docs/get-started/tenant-settings/auth0-teams/tenant-member-management \"Tenant Member Management\") will guide you on how to turn on the feature.![Teams Member Management](//images.ctfassets.net/kbkgmx9upatd/4McC8XT1PfQ46OZ3L3kWXh/81e68b5693fe7f5cda3b2377191d8ff6/Team_Member_Details_Page.png)"
    },
    {
      "id": "6WA798mO9M49rPWAWZthBF",
      "date": "2023-11-07",
      "displayDate": "November 7, 2023",
      "version": null,
      "type": "added",
      "title": "Customize Factor Selection in New Universal Login",
      "description": "Using the post login action, you can now easily define which secondary factor, or sequence of factors, your end-users are challenged with for MFA in the login flow. Customer Identity Cloud (CIC) now includes two new commands in the post login API object: challengeWith and challengeWithAny. \n\nWith these commands, you can specify how to challenge the user with MFA factors based on contextual signals about the user, the organization, or the application they are logging into.\n\nThese changes provide greater flexibility with MFA to:\n- design an authentication flow that reduces friction\n- cater to your end-users’ preferences \n- align authentication with your organization's security policies\n\nYou can read more about this new capability in our [Product Documentation](https://auth0.com/docs/secure/multi-factor-authentication/customize-mfa-selection-nul)."
    },
    {
      "id": "58gm8En0BkixJkv6oq15lh",
      "date": "2023-11-03",
      "displayDate": "November 3, 2023",
      "version": null,
      "type": "updated",
      "title": "Updated Production Readiness Checks Experience",
      "description": "We have updated the experience for the Production Readiness Check tool in the Auth0 Management Dashboard.\n\nThe Production Readiness Check tool now provides:\n- The ability to 'dismiss' a check while keeping it available to restore at the bottom of the page\n- A progress gauge as a clear visual indicator of tenant production readiness\n- __Failed__ and __Passed__ expandable objects within a single page (replaced the former tabbed layout)\n- __Critical__ labels to denote that a check has security or end-user implications.\n\n*Note: The Production Readiness Check tool now _only_ lives in the Auth0 Management Dashboard. Previously, it also lived in [Auth0 Support Center](https://support.auth0.com/) but has now been centralized in the Dashboard.\n\nTo learn more about the Production Readiness Check tool, see [this documentation](https://auth0.com/docs/deploy-monitor/pre-deployment-checks/how-to-run-production-checks#production-check-results)\n"
    },
    {
      "id": "253rOZ9XTUHwewnejE0Ecx",
      "date": "2023-11-02",
      "displayDate": "November 2, 2023",
      "version": null,
      "type": "updated",
      "title": "Teams: Team Member search",
      "description": "Is Johnny part of the team? Teams Dashboard allows you quickly search for a team member either by name or email!\n![Tenant Member Search](//images.ctfassets.net/kbkgmx9upatd/3b3Nge6eDbL5MZ8VdcG7NP/a009d0f5e88ddd5f5b0999f01aed6496/Tenant_Member_Search.png)"
    },
    {
      "id": "T0iK5XLYExriK0qnsW4bY",
      "date": "2023-10-31",
      "displayDate": "October 31, 2023",
      "version": null,
      "type": "added",
      "title": "The Guardian App Adds 40+ Languages for Localization",
      "description": "We are excited to announce that the Guardian App now supports all 40+  languages to match the entire Universal Login localization language set. \n\nUsers can select the language in the app; the default is based on the user's registered device setting. See our [documentation](https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian#localization-options) for the full list of supported languages.\n\n![Guardian App Localization Image - Enter Pin new](//images.ctfassets.net/kbkgmx9upatd/3SUHisx7EL78k3dp7DGiUe/a66e948a9558d65b26689404da904c03/localization-enter-pin-smaller.png)\n\nThe Guardian app is an authenticator that delivers push notifications to a user’s pre-registered device (mobile phone or tablet). You can learn more about the Guardian App in our [product documentation](https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian).\n\nAdditional library updates and minor bug fixes are included with this release.\n"
    },
    {
      "id": "7hTumxd8msK9je2bP35CyW",
      "date": "2023-10-30",
      "displayDate": "October 30, 2023",
      "version": null,
      "type": "added",
      "title": "Account Linking is now in Actions",
      "description": "Starting today, we are rolling out Account Linking in Actions.  Developers can start linking user accounts from various identity providers. This allows a user to authenticate from any of their accounts and still be recognized by your app and associated with the same user profile.\n\nAccount Linking in Actions will be rolled out in stages to all customers in all environments. The Public Cloud on the Converged Platform will receive this feature in next coming weeks based on its release cycle.\n\nYou can leverage setPrimaryUser now in Actions and check our documentation to [learn more](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/api-object). "
    },
    {
      "id": "5Yd5O2D6lVI78RMa2fr2Pn",
      "date": "2023-10-23",
      "displayDate": "October 23, 2023",
      "version": null,
      "type": "added",
      "title": "Teams now comes in Dark Beta!",
      "description": "![Teams Now In Dark](//images.ctfassets.net/kbkgmx9upatd/10gy6IIh1uk1Aao7sq77HR/d41481f2e058f75780f61b4e0a6a7284/Teams_Dark_Mode.png)Did someone order up one Dark Mode Browser extra Hot! Feel free to dim the lights; Teams Dashboard now supports dark mode."
    },
    {
      "id": "1HJv22auCjVnSKU6yMiEZZ",
      "date": "2023-10-23",
      "displayDate": "October 23, 2023",
      "version": null,
      "type": "updated",
      "title": "LinkedIn Social Connection V3",
      "description": "A new version (V3) of the LinkedIn social connection is available in Customer Identity Cloud. Existing customers/connections are unaffected by this change. Customers creating new LinkedIn applications that require Sign in with LinkedIn using OpenID Connect will need to use this new connection strategy. [Read more](https://support.auth0.com/notifications/6532fe61cd1517b4fe7ed1d2)."
    },
    {
      "id": "3s8qItLqmSmMzoY7g6i23s",
      "date": "2023-10-20",
      "displayDate": "October 20, 2023",
      "version": null,
      "type": "added",
      "title": "Bot Detection Now Integrated with Arkose Labs!",
      "description": "__You can now seamlessly integrate with Arkose Labs through our Bot Detection product!__\n\nArkose Labs is a bot management provider that helps deter and defeat bots by leveraging AI and unique context-based 3D captchas.\n\nWith this new integration, you can combine the power of Auth0 attack protection and seamlessly integrate Arkose Labs detection and response into your authentication flows!\n\nTo learn more about our Bot Detection Integrations, please refer to our [online documentation](https://auth0.com/docs/secure/attack-protection/bot-detection#configure-bot-detection).\n"
    },
    {
      "id": "2wsZtgXkbEjKc72Np3YzHv",
      "date": "2023-10-16",
      "displayDate": "October 16, 2023",
      "version": null,
      "type": "deprecated",
      "title": "Rules and Hooks are Removed from All New Tenants Starting Oct 16",
      "description": "Starting Oct 16, We are removing Rules and Hooks from new customers onboarded on/after Oct 16, as our first step of the [Rules and Hooks Deprecation Plan](https://auth0.com/blog/preparing-for-rules-and-hooks-end-of-life/). \n\nThis has no impact on existing customers and tenants, but we encourage all customers to migrate their Rules and Actions before Nov 18, 2024, the end of life for Rules and Hooks.  We have provided a [Migration Guide](https://auth0.com/extensibility/movetoactions) to help our customers get started.  \n\nYou can contact your Technical Account Manager or Auth0 Support for retroactive access for very limited use cases."
    },
    {
      "id": "3z3NKt4HFEvDO233Yaf9y6",
      "date": "2023-10-05",
      "displayDate": "October 5, 2023",
      "version": null,
      "type": "added",
      "title": "Okta Workflows for Customer Identity Cloud (Auth0 by Okta)",
      "description": "Okta Workflows is a no-code automation platform for Identity. To help developers extend and customize Customer Identity with custom logic, Auth0 (CIC) now has an Actions Integration with Workflows and Workflows now has a connector with Auth0.\n\n![Auth0 Flow runs an Okta Workflow](//images.ctfassets.net/kbkgmx9upatd/7Ec25PGaXPtcTyCWtf6l5x/31e0a6c2aa3174444fcac255d6882e1c/auth0_flow_run_workflow.png)\n\nYou can check out the details and [read more here](https://www.okta.com/blog/2023/10/workflows-for-customer-identity-cloud/)."
    },
    {
      "id": "5dxJrHmWj5sMrhDLMcdFMR",
      "date": "2023-10-03",
      "displayDate": "October 3, 2023",
      "version": null,
      "type": "updated",
      "title": "OpenID Connect Back-Channel Logout is now available for all enterprise plans",
      "description": "[OpenID Connect Back-Channel Logout](https://openid.net/specs/openid-connect-backchannel-1_0.html) allows you to implement end-users single-logout through direct communication between the identity provider (IdP) and an application backend. When configured, any Single Sign-On (SSO) application can leverage the session identifier (sid) included in ID Tokens to react to the session termination events received in OIDC Back-Channel Logout Tokens.\n\nBack-channel communication is a reliable mechanism to coordinate application logout and avoid limitations imposed by the need for an active browser or third-party content browser restrictions.\n[OIDC Back-Channel Logout in our public documentation](https://auth0.com/docs/authenticate/login/logout/back-channel-logout)\nThis capability is a practical solution for applications with a backend that can keep and manage the state of a user session. Learn more about . The feature will be gradually rolled out to all customers on one of our enterprise plans."
    },
    {
      "id": "3t7fmeBfsAUatYW3sdx4hc",
      "date": "2023-10-03",
      "displayDate": "October 3, 2023",
      "version": null,
      "type": "updated",
      "title": "Private Cloud Environment Information Added to Private Instances Page in Support Center",
      "description": "We've updated the Private Instances page in the [Auth0 Support Center](https://support.auth0.com/) to display Failover Region (where applicable) and Deployment Window schedule information."
    },
    {
      "id": "2gkLdsDVhVx6den46RSBX6",
      "date": "2023-10-02",
      "displayDate": "October 2, 2023",
      "version": null,
      "type": "updated",
      "title": "Auth0 YouTube Added to Auth0 Support Center as a Knowledge Source",
      "description": "The [Auth0 Community Response Series YouTube Playlist](https://www.youtube.com/playlist?list=PLshTZo9V1-aHJ7qT5mvgQ1gdLEk1pBNeK) is now integrated as a source of knowledge when searching for solutions on https://support.auth0.com/. Content from this YouTube source may also appear as a 'Recommended Article' if it matches with the ticket Request Summary during the ticket creation flow in order to surface helpful knowledge while troubleshooting."
    },
    {
      "id": "78X6urpiHJK6SY0fUw4zyh",
      "date": "2023-09-29",
      "displayDate": "September 29, 2023",
      "version": null,
      "type": "added",
      "title": "Organizations: Get Members with Roles",
      "description": "We're making it easier for you to build multi-tenant administrative dashboards in your SaaS application by optionally including organization members’ RBAC roles in the Auth0 Management API [GET Organization Members](https://auth0.com/docs/api/management/v2/organizations/get-members) response.\n\nThis will allow you to show your customers' administrators a list of the end-users on their team, along with their access levels, using a single API request. \n\n[Click here to learn more](https://auth0.com/docs/manage-users/organizations/organizations-overview) about how Organizations can help with authentication and authorization for your B2B & SaaS applications."
    },
    {
      "id": "515sGCwZW2u6bD06rzS1uC",
      "date": "2023-09-22",
      "displayDate": "September 22, 2023",
      "version": null,
      "type": "updated",
      "title": "Auth0 Terraform Provider V1 - GA",
      "description": "Announcing the general availability release of Auth0 Terraform Provider v1! This milestone release introduces a plethora of new features, enhancements, and bug fixes that make managing your Auth0 infrastructure with Terraform more efficient and reliable than ever.\n\n__What's New in v1:__\n- __Data Sources for Resources:__ Fetch and reference data from existing Auth0 resources effortlessly. Retrieve specific details or configuration settings from Auth0 entities and use them within your Terraform code.\n- __Resource Relationships:__ Establish and manage relationships between Auth0 resources with ease. Whether it's 1:1 or 1:many relationships, v1 provides the flexibility to model connections and dependencies accurately.\n- __Zero Downtime Client Secret Rotation:__ Rotate client secrets without causing disruptions to your applications or users. This version includes built-in support for zero downtime during client secret rotation.\n- __Bug Fixes and Stability Enhancements:__ We've focused on improving the stability and reliability of the Auth0 Terraform Provider. This release includes numerous bug fixes and enhancements to meet the diverse needs of the developer community.\n\nTo get started with Auth0 Terraform Provider v1, visit the official [Terraform Registry](https://registry.terraform.io/providers/auth0/auth0/latest). If you're migrating from a previous v0 build, please consult the [migration guide](https://github.com/auth0/terraform-provider-auth0/blob/main/MIGRATION_GUIDE.md) as this release includes breaking changes."
    },
    {
      "id": "49VX9RVprIV8rKkhmxZZSI",
      "date": "2023-09-22",
      "displayDate": "September 22, 2023",
      "version": null,
      "type": "updated",
      "title": "Private Cloud Quota Reports Updated",
      "description": "We have updated [Quota Utilization Reports](https://auth0.com/docs/troubleshoot/customer-support/manage-subscriptions/monitor-subscription-usage#quota-utilization) to include the Private Cloud Environment name within the 'Environment' column of these reports instead of the previously inferred values of \"Production or Development\".\n\nNow you can leverage the actual names for the Private Cloud environment to have a better understanding of your subscription usage."
    },
    {
      "id": "291fGarNAc3O7NI0p7UFMD",
      "date": "2023-09-15",
      "displayDate": "September 15, 2023",
      "version": null,
      "type": "updated",
      "title": "Teams: Updates to Auth0 Teams Login",
      "description": "After a successful authentication to the Teams URL [https://accounts.auth0.com](https://accounts.auth0.com \"Teams Login\"), you will be automatically redirected to your Teams dashboard without the need to enter either your Team name or Team permalink."
    },
    {
      "id": "4sntWkfdI2Vbm8fgvFYsdn",
      "date": "2023-09-14",
      "displayDate": "September 14, 2023",
      "version": null,
      "type": "added",
      "title": "Node-auth0 v4 now in General Availability",
      "description": "Annoucning the general availability of node-auth0 v4. This release brings a wealth of exciting new features and improvements including:\n\n- Rewritten from the ground up in TypeScript\n- Full up-to-date Types for methods, request parameters, bodies, errors, and responses.\n- Support for Edge runtimes\n- A customizable modern network stack and more!\n\nTo get started with the node-auth0 v4 SDK, check out the repo on [GitHub](https://github.com/auth0/node-auth0/releases/tag/v4.0.0 \"GitHub\"). If you're coming from a previous version, please check out the [migration guide](https://github.com/auth0/node-auth0/blob/beta/v4_MIGRATION_GUIDE.md \"Migration guide\") as this release includes breaking changes."
    },
    {
      "id": "4E9tfp9EUXErvm4p2C5H93",
      "date": "2023-09-14",
      "displayDate": "September 14, 2023",
      "version": null,
      "type": "updated",
      "title": "Recommended Articles Integrated into Auth0 Support Center",
      "description": "We are excited to share that the [Auth0 Support Center](https://support.auth0.com/) has been updated to integrate Auth0 'Recommended Articles' within the Ticket Creation Flow. Now, as you enter in a summary of your request or issue in a ticket, you'll be presented with matched recommended articles to help troubleshoot your request or issue.\n\nLearn more about Auth0 Support Tickets [here](https://auth0.com/docs/troubleshoot/customer-support/open-and-manage-support-tickets)."
    },
    {
      "id": "5PRVOusE11BaslGb4Xpruw",
      "date": "2023-09-08",
      "displayDate": "September 8, 2023",
      "version": null,
      "type": "added",
      "title": "New Security settings on the iOS Guardian App",
      "description": "With our recent release, the Guardian App now supports both passcodes and biometrics as a layer of security for the app on iOS. You can add a passcode, touch ID or face ID from within the app settings. This is a safeguard to ensure the information you manage within the app is protected if you lose your phone or if it is stolen – any easy measure to take to protect yourself!\n\n*Note: this feature was previously released on Android and is already supported on that app.*"
    },
    {
      "id": "3xsCH9WF2UFDdWdQ7wclSB",
      "date": "2023-09-07",
      "displayDate": "September 7, 2023",
      "version": null,
      "type": "added",
      "title": "Introducing Passkeys: Enhance Your Sign-In Experience with Early Access",
      "description": "We're excited to introduce passkeys, a cutting-edge feature now available in **Early Access**! With passkeys, Auth0 customers can transform their sign-in process, enjoying faster, easier, and more secure access to websites and applications. Passkeys are FIDO credentials that are discoverable by browsers or security keys for passwordless authentication. Based on FIDO Alliance and World Wide Web Consortium (W3C) standards, passkeys replace the need for passwords by using cryptographic key pairs, ensuring robust protection against phishing and enhancing the overall user experience.\n\nFor your existing users with passwords, we offer a seamless progressive enrollment process to add passkeys for subsequent logins, ensuring a smooth transition to enhanced security.\n\nBefore you get started, please note that there are certain prerequisites to enable passkeys. Make sure to review these requirements in our [documentation](https://auth0.com/docs/authenticate/database-connections/passkeys) to ensure a seamless setup process.\n\nWith **Early Access**, this feature will be gradually rolled out to all customers across all plans, starting September 7th, 2023 . Initially, it'll be available in the public cloud, followed by a rollout in private cloud environments a few weeks later as per our release pipeline. For our valued Private Cloud customers, enabling passkeys is as simple as reaching out to your account team for assistance. To learn more about our release stages, please refer to [Product Release Stages](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages).\n\nCurious about setting up passkeys? Explore our [online documentation](https://auth0.com/docs/authenticate/database-connections/passkeys) for step-by-step guidance on configuration."
    },
    {
      "id": "1sxx3HiTr2PG9t7V9ES5md",
      "date": "2023-09-06",
      "displayDate": "September 6, 2023",
      "version": null,
      "type": "added",
      "title": "Dark mode is available for Auth0 docs!",
      "description": "Users now have the option to choose a dark theme when viewing Auth0 [docs](https://auth0.com/docs).  Anyone wanting to try it can toggle the theme using the button on the top right corner of the screen.\n"
    },
    {
      "id": "1L7C6vTeVNRvABCRGVVHUM",
      "date": "2023-09-05",
      "displayDate": "September 5, 2023",
      "version": null,
      "type": "updated",
      "title": "Readiness Checks Tool: New Production Readiness Checks Added",
      "description": "We are excited to share that we have added new production readiness checks to our [Readiness Check](https://auth0.com/docs/deploy-monitor/pre-deployment-checks/how-to-run-production-checks) tool in the Auth0 Management Dashboard. The Readiness Check tool helps Tenant Administrators review configuration issues for a specified tenant to ensure optimal setup before going live. \n\n__‘Required’ Readiness Checks Added:__\n- All Actions are running a recommended version of NodeJS\n- Hooks are being deprecated and must be migrated to Actions\n- Rules are being deprecated and must be migrated to Actions\n- Tenant is set to use a recommended default NodeJS version\n- Use Custom Domain in Branded Email Templates\n\nLearn more about 'Required' Checks [here](https://auth0.com/docs/deploy-monitor/pre-deployment-checks/production-check-required-fixes).\n\n__‘Recommended’ Readiness Checks Added:__\n- Configure Log Streaming\n- Enable New Universal Login\n- Set Application Login URI\n- Set Tenant Login URI\n- Set Tenant Allowed Logout URLs\n\nLearn more about 'Recommended' Checks [here](https://auth0.com/docs/deploy-monitor/pre-deployment-checks/production-check-recommended-fixes). \n"
    },
    {
      "id": "2HEw7agYNQzf75tUrcrQQi",
      "date": "2023-08-31",
      "displayDate": "August 31, 2023",
      "version": null,
      "type": "added",
      "title": "Dark Mode is available on the Guardian App!",
      "description": "Give your eyes a break or just switch it up for a bit of a change. Whether it’s for higher contrast, glare reduction or if it just comes down to your personal preference, check out Dark Mode on the Guardian App. \n\nThe Guardian App now supports both dark and light themes. From the Settings menu, users can now select the display theme: light, dark, or system default.\n"
    },
    {
      "id": "7ehzhKPxJV6jvEgk83Y9to",
      "date": "2023-08-30",
      "displayDate": "August 30, 2023",
      "version": null,
      "type": "added",
      "title": "New capabilities are now in Actions",
      "description": "Starting today, we are rolling out advanced capabilities of SAML Mapping, Root-Level User Attributes, and Access Token Scope to Actions. Developers can effectively leverage these newly added capabilities in Actions to unblock unique use cases and complete migrations from legacy Rules and Hooks. \n\n__Key Highlights__\n\n__SAML Mapping and Configuration__: Developers can effectively use SAML mapping to map user attributes and claims from SAML assertion assertions to user profiles with Actions when creating and customizing the login and user registration flow.\n\n__Access Token Scope__: Developers can freely add or remove claims scopes with newly created custom API with security enhancement.\n\n__Root-Level User Attributes:__ Developers can start using standard properties such as user.roles, user.groups, user.permissions to understand more customer profiles and help protect user interests,\n\nTo learn more about the feature you can go through our supporting resource below:\n\n[Blog Post](https://auth0.com/blog/unlock-deeper-customization-in-actions-with-three-new-capabilities/) | [Documentation](https://auth0.com/docs/customize/actions/limitations) | [Migration Guide](https://auth0.com/extensibility/movetoactions)"
    },
    {
      "id": "2lS4FuDfCNZwa5wSqWBlfA",
      "date": "2023-08-15",
      "displayDate": "August 15, 2023",
      "version": null,
      "type": "added",
      "title": "React-native-auth0 V3 now in General Availability",
      "description": "We are thrilled to announce the general availability of react-native-auth0 v3! This release is a significant transformation in our React Native SDK, aligning with the latest developments in the React Native framework.\n\n__Key Highlights__\n- __Strong Typing with TypeScript:__ Migrated to TypeScript for native type support and enhanced development support.\n- __Hooked on Hooks:__ Full support of SDK through Hooks, including Authentication APIs.\n- __Dynamic User Object:__ Real-time updates and improved credentials management through Hooks.\n- __Single Line Expo Integration:__ Seamless integration with just one line of configuration.\n- __Android 12 Support:__ Compatibility with the latest Android version.\n\nTo get started with the react-native-auth0 v3 SDK, check out the repo on [GitHub](https://github.com/auth0/react-native-auth0 \"react-native-auth0\"). If you are coming from a previous version, please check out the [migration guide](https://github.com/auth0/react-native-auth0/blob/v3.0.0/MIGRATION_GUIDE.md \"Migration guide\") as this release includes breaking changes."
    },
    {
      "id": "1mdFXzOHtZlQTvaHPKWYwT",
      "date": "2023-08-09",
      "displayDate": "August 9, 2023",
      "version": null,
      "type": "added",
      "title": "Organization Name support for launching Login flows",
      "description": "To make Organizations easier to use, Auth0 now supports using the Organization Name to launch login flows via the [Authentication API](https://auth0.com/docs/api/authentication). More specifically, the [/authorize](https://auth0.com/docs/api/authentication#authorize-application) and [/samlp (SAML)](https://auth0.com/docs/api/authentication#saml) endpoints have now the option to accept Organization Names instead of Organization IDs.\n\nTo learn more about how to activate and use this feature, as well as the security implications to bear in mind, [read more details in Auth0 docs](https://auth0.com/docs/manage-users/organizations/configure-organizations/use-org-name-authentication-api).\n\n![Allow-org-names-toggle](//images.ctfassets.net/kbkgmx9upatd/1IP0IQKDsU86UdwniiIjH5/b4080afcf32f81610a93b1aebc84887b/Org_name_in_authorize_toogle.png)"
    },
    {
      "id": "2MhZkQbh7vrKVSSpufxZVg",
      "date": "2023-08-03",
      "displayDate": "August 3, 2023",
      "version": null,
      "type": "added",
      "title": "Bot Detection is Now Integrated with Friendly Captcha and hCaptcha!",
      "description": "We have expanded our captcha response providers in our Bot Detection product. Now, you can seamlessly integrate with Friendly Captcha and hCaptcha.\n\nFriendly Captcha is a proof of work captcha. Not only does it provide a frictionless user experience, but it also imposes significant computational costs on attackers, making it highly effective against malicious activities.\n\nIn addition, we’ve added hCaptcha as an alternative to reCAPTCHA Enterprise. hCaptcha offers a similar user experience while offering different stances on privacy and data collection. It also provides wider regional availability, ensuring that our customers can benefit from comprehensive bot detection regardless of their location.\n\nTo learn more about our Bot Detection solution, please refer to our [online documentation](https://auth0.com/docs/secure/attack-protection/bot-detection#configure-bot-detection).\n"
    },
    {
      "id": "7brExNHNLtHshVHvayBm6L",
      "date": "2023-07-27",
      "displayDate": "July 27, 2023",
      "version": null,
      "type": "added",
      "title": "Custom Domains in Guardian SDKs",
      "description": "The Guardian iOS and Andriod SDKs support custom domains!\n\nWith a custom domain, your users feel confident that they are providing their credentials to the right party. Authentication happens within the context of your brand which helps you build brand loyalty. Users are not redirected to a third-party site that breaks the branding context. This prevents users from becoming confused about whether they are still making a transaction or operation with you.\n\nContaining your authentication services in one place makes your application architecture more maintainable. Applications gain only the access they need and authentication services scale easily. Other security benefits of using a custom domain include:\n- Some browsers, by default, make it difficult to communicate in an iFrame if you don't have a shared domain.\n- It's harder to phish your domain if you have a vanity URL because the phisher must create a vanity URL to mimic yours. For example, with a custom domain, you can use your own certificate to get an Extended Validation, making phishing harder.\n"
    },
    {
      "id": "4iDjG2MjcjSymJYEg7b1Ln",
      "date": "2023-07-27",
      "displayDate": "July 27, 2023",
      "version": null,
      "type": "added",
      "title": "Bot Detection Slider for Bot Detection ",
      "description": "Now announcing the Bot Detection Slider for Bot Detection!\n\nWe have added the ability to adjust the level of friction of the “When Risky” setting on our Bot Detection model.\n\nThere are three settings to choose from __Low__, __Medium__, and __High__.\n\n__Low__ - a more relaxed security stance, resulting in less friction for users.\n\n__Medium__ - a balanced and recommended setting for a balanced experience of security and user friction\n\n__High__ -  will take a more strict security approach, increasing user friction but applying a more assertive security stance.\n\nWith this new addition, the ability to adjust your detection to match your business needs and risk tolerance is just a setting away!\n\nSee the online documentation [here](https://auth0.com/docs/secure/attack-protection/bot-detection#use-bot-detection-slider),  for additional information on bot detection and on how to use the bot detection slider."
    },
    {
      "id": "6fSfJa7wuvlNdCcyeyeny3",
      "date": "2023-07-26",
      "displayDate": "July 26, 2023",
      "version": null,
      "type": "added",
      "title": "Teams: Security Policies - SSO Enforcement Early Access",
      "description": "Security policies allow team owners to configure and implement access rules that adhere to your organization's IT security policies for access to their Auth0 accounts.\nSSO Enforcement as one of the security policies gives you the option to mandate login to Teams and Manage Dashboard through the organization's enterprise IdP.\n\nFollow the link to learn more.\n[Configure Security Policies](https://auth0.com/docs/get-started/tenant-settings/auth0-teams#configure-security-policies \"Configure Security Policies\")\n\n![Security Policies SSO Enforcement](//images.ctfassets.net/kbkgmx9upatd/4MaUiHxpTJbCu5rLPPlYqm/76b5f6a33c2ff96b99821eb19947e061/Enforce_SSO.png)"
    },
    {
      "id": "1EibN7f8rd3lDLN5bvXQnk",
      "date": "2023-07-17",
      "displayDate": "July 17, 2023",
      "version": null,
      "type": "added",
      "title": "Added Editor - Organizations Role to Auth0 Management Dashboard",
      "description": "We have added a new Auth0 Management Dashboard Role: __Editor - Organizations__. Now, we’ve created a way for you to provide more specific Organizations Administration access in order to allow other tenant members to create, configure, and maintain your Organizations. To learn more about the role and what plans have access, see our [Dashboard Access by Role](https://auth0.com/docs/get-started/manage-dashboard-access/feature-access-by-role \"Dashboard Access by Role\") documentation \n"
    },
    {
      "id": "3yVUYwYINRo7edOw8tP7kG",
      "date": "2023-07-13",
      "displayDate": "July 13, 2023",
      "version": null,
      "type": "added",
      "title": "Added email support for Microsoft 365 Modern Auth and Azure Communications",
      "description": "Auth0 now supports Microsoft 365 Modern Authentication and Azure Communications Services for outbound email services. Customers can use Outlook on Microsoft 365 or the recently released Azure Communication Services as preferred authentication methods. To learn more, read [Configure Microsoft 365 Exchange Online as External SMTP Email Provider](https://auth0.com/docs/customize/email/smtp-email-providers/configure-365-exchange-as-smtp-email-provider) or [Configure Azure Communication Services as External SMTP Email Provider](https://auth0.com/docs/customize/email/smtp-email-providers/configure-azure-comm-service-as-smtp-email-provider)."
    },
    {
      "id": "1MrocxqJSmq8ry2HLjdve3",
      "date": "2023-07-12",
      "displayDate": "July 12, 2023",
      "version": null,
      "type": "added",
      "title": "PKCE and attribute mapping available on OIDC and Okta Workforce Connections",
      "description": "OIDC and Okta Workforce connections now support PKCE and attribute mapping.  PKCE enables you to build more secure connections between Auth0 and your connected identity provider.  With attribute mapping you can sync more attributes from your IdP into your Auth0 tenant.  This enables you to ensure your tenant is leveraging the latest user information from the connected IdP.  To learn more about both of these improvements check out our [documentation](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/configure-pkce-claim-mapping-for-oidc)."
    },
    {
      "id": "2xzzvhZDXiRbThfc7XsfO",
      "date": "2023-07-11",
      "displayDate": "July 11, 2023",
      "version": null,
      "type": "added",
      "title": "Node 18 now available for Actions, Rules and Hooks",
      "description": "Node.js 18 is now generally available (GA) for Actions, Rules and Hooks. Starting today, all tenants in public cloud will receive Node 18 support. Customers on Converged private cloud platform will receive Node 18 in the following weeks subject to your private cloud release schedule.  \n\nTo adhere to best code security practices, we strongly encourage customers to update to Node 18, before September 11th, 2023 when Node 16 long-term support ends.\n\nCustomer can start using Node 18 in their tenants setting and/or when creating new Actions in the Auth0 Manage Dashboard.\n\n![Actions on Node 18](//images.ctfassets.net/kbkgmx9upatd/58RyA1YF3keQdUUtLqSfIb/473c09b1a18df17884aca13124a94027/Screenshot_2023-07-11_at_2.16.39_PM.png)"
    },
    {
      "id": "6mJnzbmRSkCJnTXf4aRccE",
      "date": "2023-07-07",
      "displayDate": "July 7, 2023",
      "version": null,
      "type": "updated",
      "title": "Improved Production Readiness Checks Experience",
      "description": "We have updated the [CIC Production Readiness Checks](https://auth0.com/docs/deploy-monitor/pre-deployment-checks/how-to-run-production-checks \"Run Production Readiness Checks\") tool found in the Auth0 Management Dashboard. Documentation links have been updated and \"Configure\" navigation has been improved to allow for easier use of the *Production Readiness Checks* tool. "
    },
    {
      "id": "2xlU4xGJmvpTJ7kQ3ENARy",
      "date": "2023-07-07",
      "displayDate": "July 7, 2023",
      "version": null,
      "type": "updated",
      "title": "Teams: Editing of Team name now supported",
      "description": "You requested the ability to change team names, and we have successfully delivered. To change the team name, go to the Teams dashboard, click the Settings icon, and update the Team Name in the Team information section.\nSee the online [documentation](https://auth0.com/docs/get-started/tenant-settings/auth0-teams#update-team-name \"Update Team Name\") for additional information on changing team name or Teams in general.\n![Teams Team Information ](//images.ctfassets.net/kbkgmx9upatd/22uhv78GtZtQGUOjHxwPEc/3c98ea79a4f74edd655c5a0b86cc6d73/Team_Name_-_Dashboard_Setting.png)"
    },
    {
      "id": "1V8kf4hfJkoKHp0qonJtuQ",
      "date": "2023-06-28",
      "displayDate": "June 28, 2023",
      "version": null,
      "type": "added",
      "title": "Improved Login Flow for SaaS Users",
      "description": "Today we’ve released upgrades to how login flows work for applications using Organizations to build [multi-tenant SaaS apps](https://auth0.com/docs/get-started/auth0-overview/create-tenants/multi-tenant-apps-best-practices). We’ve created options for tying identifier first [Home Realm Discovery](https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first#define-home-realm-discovery-identity-providers) to Connections with IdP domains associated with Organizations. We’ve also released a New Universal Login Prompt that displays when configured for end users with multiple organization memberships. Those users can now select which Organization they want to login with after authenticating.\n\n![Org Login Flow](//images.ctfassets.net/kbkgmx9upatd/4ToPLQe1uxCySeEQMPFN4R/ac3b3ff9e3a6afc3735fd4670f2b0243/Screenshot_2023-06-28_at_3.02.50_PM.png)\n\nYou can find out more about how these new flows work in [the online documentation](https://auth0.com/docs/manage-users/organizations/login-flows-for-organizations)."
    },
    {
      "id": "6GcHJVMeEAxUhcTDY3zX1C",
      "date": "2023-06-01",
      "displayDate": "June 1, 2023",
      "version": null,
      "type": "added",
      "title": "Back-Channel Logout Early Access",
      "description": "Auth0 Enterprise plans can now use OIDC Back-Channel Logout capabilities for Session Management in their production tenants. This allows you to implement responsive single-logout experiences for end-users, avoiding limitations imposed by third-party cookie browser restrictions and setting the foundation for remote logout capabilities. \n\nWhen configured, any SSO application can leverage the session identifier (sid) included in ID Tokens to react to the session termination events received in OIDC Back-Channel Logout Tokens. \n\nThe feature is available upon opt-in request to all enterprise plans and will be automatically enabled by default soon after. \n\nYou can learn more about it in our [online documentation](https://auth0.com/docs/authenticate/login/logout/back-channel-logout)"
    },
    {
      "id": "2bXDqwJ2QqDjhR0opj9WVW",
      "date": "2023-05-23",
      "displayDate": "May 23, 2023",
      "version": null,
      "type": "updated",
      "title": "Universal Login: New Language Support",
      "description": "Six new languages are now available as supported translations for Universal Login:\n\n- Basque: `eu-ES`\n- Catalan: `ca-ES`\n- Galician: `gl-ES`\n- Norwegian: `no`\n- Norwegian Nynorsk: `nn`\n- Welsh: `cy`\n\nFor additional information on languages and localization, see the [online documentation](https://auth0.com/docs/customize/internationalization-and-localization/universal-login-internationalization)."
    },
    {
      "id": "34aHLhUlH4SRtwgjIHlTKQ",
      "date": "2023-05-18",
      "displayDate": "May 18, 2023",
      "version": null,
      "type": "updated",
      "title": "Guardian App Localization",
      "description": "We are excited to announce that the Guardian App supports localization. The app is available, as an authenticator, to deliver push notifications to a user’s pre-registered device (mobile phone or tablet). In addition to English - US (en-us), we support French - Canada (fr-ca), French - France (fr), Portuguese - Brazil (pt-br), and Spanish - Argentina (es-ar). Users can select the language in the app setting; the default is based on the user's registered device setting.![Guardian App Localization es-ar](//images.ctfassets.net/kbkgmx9upatd/3Mc70diB7V6JfZyK8NKH2w/a7b04bc335202f0e900b5dc686302606/Guardian-es-3.jpg)\n\nYou can learn more about the Guardian App in our [public docs](https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian)."
    },
    {
      "id": "3DJe2PkyGYZMZfQg2nApxe",
      "date": "2023-05-16",
      "displayDate": "May 16, 2023",
      "version": null,
      "type": "deprecated",
      "title": "Rules & Hooks Deprecation - November 2024 End of Life",
      "description": "Beginning __October 16th, 2023__, Rules & Hooks will no longer be available to new tenants. Actions is our offering which unifies all the extensibility of Rules and Hooks and more. For existing users of Rules & Hooks, these features will no longer be available as of __November 18th, 2024__.\n\nTo learn more about migrating to Auth0 Actions, read this [migration guide](https://auth0.com/extensibility/movetoactions).\n"
    },
    {
      "id": "i4uEafyS6aD1Q79ugYzwO",
      "date": "2023-05-04",
      "displayDate": "May 4, 2023",
      "version": null,
      "type": "updated",
      "title": "Security Center Now Available on Converged Platform",
      "description": "Auth0 Enterprise customers on Converged Platform can now use Security Center, a new security feature that provides real time monitoring of potential security events. It provides a more proactive approach to our customers on understanding and tweaking their attack protection program, and further strengthen the security posture with real-time monitoring capability of common attack types and metrics on the current attack protection features.\n\nThe feature will be rolled out in stages to all Enterprise customers using Private and Public Cloud on the Converged Platform beginning on May 4, 2023.\n\nSecurity Center includes trends on common threat behaviors- including credential stuffing attacks, sign up attacks, and MFA bypass attacks. It also provides threat monitoring capability on our current attack protection program - including Bot Detection, Brute-force Protection, Suspicious IP Throttling and Breached Password Detection. The threat monitoring tool helps our customers understand the current attack trends on their tenant traffic, and then implement countermeasures by enabling and tweaking the Auth0 Attack Protection feature sets.\n\nTo learn more, please refer [Security Center](https://auth0.com/docs/secure/security-center) in the Auth0 Docs.\n"
    },
    {
      "id": "1l61da62tGtdazcsruvtOg",
      "date": "2023-05-04",
      "displayDate": "May 4, 2023",
      "version": null,
      "type": "added",
      "title": "Private Key JWT is now in General Availability",
      "description": "Auth0 now supports **Private Key JWT in [General Availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability), a more secure and flexible way to authenticate your Auth0 Apps**:  \n* Enhance security by generating **asymmetric public/private key pairs** for use as credentials. Once you register the public key with Auth0, you use the private key to sign the request sent to the Authentication API for a more secure experience.\n* Renew credentials seamlessly with **key rotation**. Have two keys active simultaneously for **zero downtime**.\n\n![Private Key JWT in Credentials tab](//images.ctfassets.net/kbkgmx9upatd/1aOnERRxJFEZ8QPkeFwAaF/01e96d4822ebc7e030a579c8ff7f7556/PKJWT_announcement.png)\n\nPrivate Key JWT is our first protocol capability shipped to enable **[FAPI](https://openid.net/wg/fapi/) compliance** for Financial Grade APIs and other Highly Regulated Identity scenarios. Stay tuned for further updates!\n\nPrivate Key JWT is available to customers on the Enterprise subscription plan. To activate, visit the new Credentials tab within the Auth0 Dashboard or the Management API. The main Auth0 SDK also support this new App Authentication Method. Read our [Auth0 Docs](https://auth0.com/docs/secure/application-credentials) to learn more. "
    },
    {
      "id": "2PZvNAYnf5vyzD1pqP7D6",
      "date": "2023-04-27",
      "displayDate": "April 27, 2023",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "auth0-cordova, angular-auth0, and express-oauth2-bearer Repo Deprecations",
      "description": "The Auth0 Developer Experience team is in the process of deprecating the following repos:\n* [express-oauth2-bearer](https://github.com/auth0/express-oauth2-bearer) | [migration guide](https://github.com/auth0/express-oauth2-bearer/blob/master/MIGRATION_GUIDE.md) \n* [angular-auth0](https://github.com/auth0/angular-auth0) | [migration guide](https://github.com/auth0/angular-auth0/blob/master/MIGRATION_GUIDE.md)\n* [auth0-cordova](https://github.com/auth0/auth0-cordova) | [migration guide](https://github.com/auth0/auth0-cordova/blob/master/MIGRATION_GUIDE.md)\n\nThese libraries will no longer be supported after their end of life date. For express-oauth2-bearer, the EOL date is June 30, 2023. For angular-auth0 and auth0-cordova, the EOL date is October 31, 2023. Please make plans to remove these libraries from any active projects before these dates. For each repo we have also provided a migration guide to further assist you.\n\nIf you have any questions or concerns, please reach out to us on GitHub."
    },
    {
      "id": "5aqto9RzGFwTRC9dAI1CMG",
      "date": "2023-04-20",
      "displayDate": "April 20, 2023",
      "version": null,
      "type": "updated",
      "title": "Auth0 Support Center Enhanced Search",
      "description": "Auth0 is excited to announce the release of an enhanced search experience on the [Auth0 Support Center](https://support.auth0.com/). Now you can search and filter across Auth0 Docs, Auth0 Community, and Auth0 Blog in a single place without leaving Support Center. "
    },
    {
      "id": "2pP4vSZ2dWqiGSJqbNidXJ",
      "date": "2023-04-18",
      "displayDate": "April 18, 2023",
      "version": null,
      "type": "added",
      "title": "Adaptive MFA Risk Ratings is Available in Actions",
      "description": "We've added Adaptive MFA Risk Ratings Score in Actions to all environments!\n\nDevelopers today can effectively use __event.authentication.riskAssessment__ for adaptive MFA risk score and leverage the details about risk assessments obtained during the login flow in PostLogin@v3 trigger.\n\nTo learn more about this feature, visit our [doc site](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/event-object). As we are adding values to Actions, we encourage all customers to move from Rules/Hooks to Actions [starting today](https://auth0.com/extensibility/movetoactions)."
    },
    {
      "id": "EFcog970d7PKZjOB7ZzBf",
      "date": "2023-04-17",
      "displayDate": "April 17, 2023",
      "version": null,
      "type": "updated",
      "title": "Auth0 CLI v1 is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability \"General Availability Description\") release of Auth0 CLI v1, a significant milestone moving Auth0 CLI from an experimental build to an officially supported tool, offering a range of powerful features and enhancements tailored to streamline your Auth0 development process. Key highlights include an improved authentication process, allowing you to authenticate as a user via device flow or as a machine with client credentials; the new 'api' command for making authenticated HTTP requests to the Management API directly; and over 70 other improvements, feature enhancements and bug fixes.\n\nTo learn more and start building with Auth0 CLI, check out our [Release Notes](https://github.com/auth0/auth0-cli/releases/tag/v1.0.0 \"Auth0 CLI v1 Release Notes\") on GitHub. If you are coming from a previous version of Auth0 CLI, please refer to the [v1 Migration Guide](https://github.com/auth0/auth0-cli/blob/v1.0.0/MIGRATION_GUIDE.md \"v1 Migration Guide\") as this release includes breaking changes."
    },
    {
      "id": "7cFL1GpbYmlfOjIu4ekZmT",
      "date": "2023-04-12",
      "displayDate": "April 12, 2023",
      "version": null,
      "type": "added",
      "title": "Organization Membership added to User Search",
      "description": "### Organization Membership added to User Search 🕵️‍♀️\n\nIn order to support our customers with multi-tenant applications, we’ve updated [User Search](https://auth0.com/docs/manage-users/user-search) to support the `organization_id` parameter so that you can search for and filter users based on their [Organization](https://auth0.com/docs/manage-users/organizations) membership. This is available in the Manage Dashboard for your support teams as well as via the [Management API](https://auth0.com/docs/api/management/v2#!/Users/get_users) so that you can enable your business customers' team members to search for users in their Organization from within your application.\n\nDetails and examples can be found [here](https://auth0.com/docs/manage-users/organizations/configure-organizations/search-organization-members)."
    },
    {
      "id": "FWzxQiCjIZaojg7XlSxkT",
      "date": "2023-04-04",
      "displayDate": "April 4, 2023",
      "version": null,
      "type": "added",
      "title": "General Availability of UK Public Cloud region",
      "description": "We're delighted to announce General Availability of the latest Public Cloud environment in United Kingdom (UK)!\n\nAuth0 strives to offer the best CIAM solution in all aspects. The addition of this region (to Public Cloud environments available globally) enables low-latency IAM experience and addreses data residency requirements for UK customers.\n\nThe UK region has been available in Beta mode, and thousands of customers have experienced it successfully since November 2022.\n\nAuth0 customers are now able to choose the UK region during tenant creation process. The newly created Auth0 tenant will have [tenant].uk.auth0.com domain name.\n![Tenant creation - UK region selected](//images.ctfassets.net/kbkgmx9upatd/6VieREIBbenVg15iGEwmFc/2219e160b68c14fda3ffaf44194ce96a/Public_Cloud_regions_latest.png)"
    },
    {
      "id": "76LhY0Ts0zVpEJgZdKaQpS",
      "date": "2023-04-04",
      "displayDate": "April 4, 2023",
      "version": null,
      "type": "updated",
      "title": "The New Activity Page is Generally Available to all customers",
      "description": "The Dashboard Activity page has been reimagined and now provides dashboard admins with access to visualized metrics that give them a high-level understanding of their tenant application signup and login data.\n\nInitially, Tenants will be able to track metrics over time, such as Active Users, Sign-ups, and Retention, in addition to Failed logins. Auth0 will consistently add additional functionality and features to improve the user experience.\n\nThis feature is now available to all customers.\n\nYou can learn more in our [public docs](https://auth0.com/docs/get-started/auth0-overview/dashboard/activity).\n"
    },
    {
      "id": "3Zrrx3Dnrzul1DnnZe4wVf",
      "date": "2023-04-04",
      "displayDate": "April 4, 2023",
      "version": null,
      "type": "updated",
      "title": "General Availability of Passwordless Connections on New Universal Login",
      "description": "Announcing General Availability of SMS and Email based passwordless authentication on New Universal Login. Previously, these passwordless flows were only available on Classic Universal Login. Now, you can use passwordless with many of the existing features of New Universal Login such as [No Code Customization tools](https://auth0.com/docs/customize/universal-login-pages/customize-new-universal-login-with-the-no-code-editor) and the [Custom Text Editor](https://auth0.com/docs/customize/universal-login-pages/customize-login-text-prompts).\n\nTo learn more about the feature you can go through our documentation [here](https://auth0.com/docs/authenticate/passwordless/passwordless-with-new-universal-login).\n"
    },
    {
      "id": "5cAGziNyUpvsI4Bav3Dz6O",
      "date": "2023-03-10",
      "displayDate": "March 10, 2023",
      "version": null,
      "type": "added",
      "title": "Factor Enrollment Selection Prompt in New Universal Login",
      "description": "A new configuration option is available for factor enrollment flows for end-users on New Universal Login.  With this new setting, Administrators have the ability to configure their tenants to prompt end-users to select their preferred factor instead of relying on the factor being automatically selected as default by Auth0.  \n\nYou can learn more about this new setting, __Show Multi-factor Authentication Options__, in our documentation [here](https://auth0.com/docs/secure/multi-factor-authentication/enable-mfa \"here\")."
    },
    {
      "id": "2g6Tjx3nEzcbpOCalZpdXF",
      "date": "2023-02-24",
      "displayDate": "February 24, 2023",
      "version": null,
      "type": "added",
      "title": "auth0-java v2 is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability) release of auth0-java v2, the latest release of our authentication and management SDK for Java applications. This release brings a variety of exciting new features and improvements, including:\n\n- A new pluggable HTTP component with a configurable default implementation, making it easier to handle simple and complex use cases.\n- HTTP request configuration enabled for all requests, eliminating the need to downcast and simplifying our internal request class hierarchy.\n- HTTP response information is returned for all API calls, making it easier to retrieve important information, such as response headers, without having to inspect logs.\n- Improvements to the Authentication API client, like no longer requiring a client secret, allowing callers of APIs that don't need a secret to use the client.\n\nTo learn more and start building with our latest Java SDK, check out the repo on [GitHub](https://github.com/auth0/auth0-java). And for developers upgrading from previous versions you can check out our migration guide [here](https://github.com/auth0/auth0-java/blob/2.0.0/MIGRATION_GUIDE.md)."
    },
    {
      "id": "7uylYRiCCUuHV0caazvBkf",
      "date": "2023-02-14",
      "displayDate": "February 14, 2023",
      "version": null,
      "type": "added",
      "title": "Higher performance tiers now available for Private Cloud",
      "description": "Customers interested in private cloud deployments can now opt for even greater performance thresholds to support their high volume authentication requirements.\nWe’ve rolled out support for two new Private Cloud tiers supporting up to 180,000 and 360,000 requests per minute (or 3,000 and 6,000 requests per second, respectively). These new tiers are currently available for Private Cloud deployments on AWS.\n\nTo learn more, visit the following Private Cloud [documentation page](https://auth0.com/docs/deploy-monitor/deploy-private-cloud/private-cloud-on-aws)."
    },
    {
      "id": "EIiBQRnX8dbZf1Mcg1PDo",
      "date": "2023-02-10",
      "displayDate": "February 10, 2023",
      "version": null,
      "type": "updated",
      "title": "Private Cloud Instances Page: Environment Information Added",
      "description": "We've updated the Private Instances page in the [Auth0 Support Center](https://support.auth0.com/) to display environment name, version, deployment type, and cloud provider.\n"
    },
    {
      "id": "1FoU1VjMcPvAR4Za1IgKI4",
      "date": "2023-02-10",
      "displayDate": "February 10, 2023",
      "version": null,
      "type": "added",
      "title": "Subscription usage reports now have enterprise connections and private cloud feature usage",
      "description": "We've updated the [subscription quota reports](https://support.auth0.com/reports/quota) to also show Active Enterprise Connections usage. This is Generally Available for both Private and Public Cloud customers.\n\n![Subscription quota reports](//images.ctfassets.net/kbkgmx9upatd/1pI3FtCu04Q91A9aSpT2r4/74226cf4597a327eef0b9a51a70c0a40/Screenshot_2023-02-10_at_4.25.43_PM.png)\n\nAdditionally Auth0 Private Cloud customers can now view their feature usage (eg. Machine to Machine Auth, MFA), for their respective private instances.\n\nFor more information on subscription usage, please see the documentation [here](https://auth0.com/docs/troubleshoot/customer-support/manage-subscriptions/monitor-subscription-usage)."
    },
    {
      "id": "4Uq02f7ehg0CROR7nM59Kx",
      "date": "2023-02-07",
      "displayDate": "February 7, 2023",
      "version": null,
      "type": "added",
      "title": "Passwordless on New Universal Login Early Access",
      "description": "Announcing Early Access of SMS and Email based passwordless authentication on New Universal Login.  Previously, these passwordless flows were only available on Classic Universal Login.  Now, you can use passwordless with many of the existing features of New Universal Login such as [Organizations](https://auth0.com/docs/manage-users/organizations/organizations-overview) and our [No Code Customization tools](https://auth0.com/docs/customize/universal-login-pages/customize-new-universal-login-with-the-no-code-editor).\n\nTo learn more about the feature you can go through our documentation [here](https://auth0.com/docs/authenticate/passwordless/passwordless-with-new-universal-login)."
    },
    {
      "id": "3GeWJqJAg3stXy1Sjuwl7p",
      "date": "2023-02-07",
      "displayDate": "February 7, 2023",
      "version": null,
      "type": "added",
      "title": "Security Center now available in Early Access for customers on Converged private cloud platform",
      "description": "Auth0 has released Security Center, a new security feature to provide our customers with real-time monitoring of potential security events as they happen. It provides a more proactive approach to our customers on understanding and tweaking their attack protection program, and further strengthen the security posture  with real-time monitoring capability of common attack types and metrics on the current attack protection features.\n\nThis feature is in Early Access and will initially be rolled out in stages to all Enterprise customers using Private Cloud on the Converged Platform beginning on February 7, 2023. To learn more about our release stages, read [Product Release Stages](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages). The feature can be accessed from [Auth0 Dashboard](https://manage.auth0.com/#/security/center).\n\nSecurity Center in Early Access includes trends on common threat behaviours- including credential stuffing attacks, sign up attacks, and MFA bypass attacks. It also provides threat monitoring capability on our current attack protection program - including Bot Detection, Brute-force Protection, Suspicious IP Throttling and Breached Password Detection. The threat monitoring tool helps our customers understand the current attack trends on their tenant traffic, and then implement countermeasures by enabling and tweaking the Auth0 Attack Protection feature sets.\n\nTo learn more, read [Security Center](https://auth0.com/docs/secure/security-center) in the Auth0 Docs."
    },
    {
      "id": "uxd0IF8ufYS6F1dzIffg5",
      "date": "2023-01-20",
      "displayDate": "January 20, 2023",
      "version": null,
      "type": "added",
      "title": "Auth0-angular, auth0-react, and auth0-vue v2 are now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability) release of auth0-angular, auth0-react, and auth0-vue v2, the latest update to our family of single page application SDKs. With the v2 releases, we've introudced all of the improvements that were released as part of [Auth0-SPA-JS v2](https://github.com/auth0/auth0-spa-js/releases/tag/v2.0.0) and more! \n\nTo learn more about the latest release of each SDK and get started building, checkout our Quickstarts and SDKs on GitHub.\n\n- Quickstarts: [Angular](https://auth0.com/docs/quickstart/spa/angular/interactive) | [React](https://auth0.com/docs/quickstart/spa/react/interactive) | [Vue](https://auth0.com/docs/quickstart/spa/vuejs/interactive)\n\n- GitHub: [Angular](https://github.com/auth0/auth0-angular/releases/tag/v2.0.0) | [React](https://github.com/auth0/auth0-react/releases/tag/v2.0.0) | [Vue](https://github.com/auth0/auth0-vue/releases/tag/v2.0.0)"
    },
    {
      "id": "5RQbyeSRAKiEgbMScSA8Ym",
      "date": "2023-01-18",
      "displayDate": "January 18, 2023",
      "version": null,
      "type": "added",
      "title": "Bot Detection For Passwordless Flows",
      "description": "We have expanded our Bot Detection to now protect passwordless flows!\n\nWith Bot Detection for your Passwordless Flows, you can further protect your users and tenants from abuse. When enabled, Bot Detection for Passwordless can block suspected bot traffic by requiring CAPTCHA. Deferring the bot and helping reduce the excess cost of sending emails and SMS to your users.\n\nFor more information on enabling bot protection on your passwordless flows, please see the documentation [here](https://auth0.com/docs/secure/attack-protection/bot-detection/bot-detection-passwordless-flows)."
    },
    {
      "id": "inaEqKeQUPa8tfeVHZO3d",
      "date": "2023-01-11",
      "displayDate": "January 11, 2023",
      "version": null,
      "type": "updated",
      "title": "The New Activity Page is Now Available in all Public Cloud Environments",
      "description": "The Dashboard Activity page has been reimagined and now provides tenants with access to data and charts that give them a high-level understanding of their tenant data.\n\nInitially, Tenants will be able to track metrics over time such as Active Users, Sign-ups, and Retention in addition to Failed logins. Auth0 will consistently add additional functionality and features to improve the user experience.\n\nThis feature is now available to all public cloud tenants.\n\nYou can learn more in our [public docs](https://auth0.com/docs/get-started/dashboard/activity).\n"
    },
    {
      "id": "2nR2J49BkF9vfpAhnnQE0d",
      "date": "2023-01-09",
      "displayDate": "January 9, 2023",
      "version": null,
      "type": "added",
      "title": "No-Code Text Customization for New Universal Login",
      "description": "__No-Code Text customization is now available__\n\nWe are expanding our No-Code toolset with the release of Text Customization. With our new text customization editor, customers can quickly and easily change all the text fields of the login box with zero coding required. This will make it easy for our application builders to use our platform and enable non-technical teams to implement changes.  This also includes the ability to customize text per language for any language supported by New Universal Login. Changes will show in the editor with a visual prompt preview. In addition, a JSON editor is available alongside the visual editor.\n\nFor more information see the documentation here: [Documentation for No Code Custom Text Editor](https://auth0.com/docs/customize/universal-login-pages/customize-login-text-prompts \"Documentation for No Code Custom Text Editor\")"
    },
    {
      "id": "3kxYB1m3O6wySflmKXxNXS",
      "date": "2023-01-06",
      "displayDate": "January 6, 2023",
      "version": null,
      "type": "updated",
      "title": "Retaining Dashboard Context When Switching Tenants",
      "description": "We have changed the behaviour of the Manage Dashboard to retain a user’s place in the Manage application when they switch tenants.  This will save users the trouble of navigating through the Manage application when they want to make a common set of changes to more than one tenant."
    },
    {
      "id": "1I9j2hApFGCAagfDvqWcUP",
      "date": "2023-01-06",
      "displayDate": "January 6, 2023",
      "version": null,
      "type": "added",
      "title": "Dark Theme Beta",
      "description": "Feel free to dim the lights; dark mode is now available as a beta feature in the Manage dashboard!  If you wish to try it out, you can enable this feature under your user profile.\n"
    },
    {
      "id": "1E3Gjq0X8ydC7xAdNqvpIp",
      "date": "2023-01-05",
      "displayDate": "January 5, 2023",
      "version": null,
      "type": "added",
      "title": "Organizations support for SAML IDP Initiated Login",
      "description": "SAML IDP Initiated Login now supports Organizations. When using a SAML Enterprise Connection within Organizations, the Organizations ID will be appended so that the end user is directed to the current Organization.\n\nWhen using IdP-Initiated SSO, make sure to include the connection parameter in the post-back URL: https://YOUR_DOMAIN/login/callback?connection={yourConnectionName}\nIf you are using the Organizations feature you can also optionally include an organization parameter containing the organization id of the desired organization:\nhttps://YOUR_DOMAIN/login/callback?connection={yourConnectionName}&organization={yourCustomersOrganizationId}\n\nFor more information, please see the documentaton [here](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/identity-provider-initiated-single-sign-on#post-back-url \"Configuring IDP Initiated SAML for Organizations\")."
    },
    {
      "id": "7fpLosoYnDTVsukvkQPqIl",
      "date": "2022-12-05",
      "displayDate": "December 5, 2022",
      "version": null,
      "type": "added",
      "title": "Status Page Support for Private Cloud",
      "description": "Announcing the launch of Status Page support for our Private Cloud offering for customers on the Converged Platform. To check the status of Private Cloud Environments, navigate to Status.Auth0.com and authenticate via “Private Cloud Login” using the same account credentials used to access the CIC (Auth0) Support Center. To go back to the Auth0 Public Cloud Status page, select Auth0 Public Cloud Status from the top-right navigation. For more information see: [Check Auth0 Status](https://auth0.com/docs/deploy-monitor/monitor/check-auth0-status \"Check Auth0 Status\")![Private Cloud Status Page Experience](//images.ctfassets.net/kbkgmx9upatd/3xVfmnv2lHN3sAMJQUpmfQ/333cac66b9b9602d7312404712c220dc/Screen_Shot_2022-12-02_at_1.21.42_PM.png)"
    },
    {
      "id": "4jTfmUFSKfnva4jY70lcLq",
      "date": "2022-12-02",
      "displayDate": "December 2, 2022",
      "version": null,
      "type": "added",
      "title": "nextjs-auth0 v2 is now in General Availability ",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability) release of nextjs-auth0 v2, our latest update for adding authentication to NextJS applications. In v2 of nextjs-auth0 we added new middleware support that runs on the Next.js Edge Runtime for consolidating route declarations, a new declarative routing API greatly that simplifies route handler creation, and improved testing support that makes testing authentication in your app a breeze.\n\nTo learn more and get started building with our latest NextJS SDK, checkout our [Quickstart](https://auth0.com/docs/quickstart/webapp/nextjs/interactive), and SDK on [GitHub](https://github.com/auth0/nextjs-auth0)."
    },
    {
      "id": "5rzvPzPiQyycQSzWxLISDj",
      "date": "2022-11-29",
      "displayDate": "November 29, 2022",
      "version": null,
      "type": "added",
      "title": "Actions Caching Is Now Available",
      "description": "We are bringing caching in Actions to the public cloud. Available immediately, customers can use *api.cache* to store and retrieve data that persists across executions.\n\nRequesting and storing tokens over time for external services or machine-to-machine exchanges can drive up overhead costs and further cause latency issues. So we created Actions caching, a means to minimize the number of machine-to-machine access tokens generated to authenticate with Auth0 APIs. \n\nCheck out our detailed guidance on [Auth0 Docs](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/api-object), and visit [Move to Actions](http://auth0.com/extensibility/movetoactions) today to start using Auth0's flagship extensibility product, Actions.\n\n![Action Caching ](//images.ctfassets.net/kbkgmx9upatd/QS0QbwCV234NBWT2fNf6U/145e4ba2e78fd6d734829e6dff1c3d77/Screen_Shot_2022-11-29_at_10.37.48_AM.png)"
    },
    {
      "id": "EkZIprTrs1yOPqeOqfQlZ",
      "date": "2022-11-15",
      "displayDate": "November 15, 2022",
      "version": null,
      "type": "updated",
      "title": "Dashboard users MFA options update",
      "description": "SMS as an MFA option for loging into Auth0 Dashboard is now only available for  users on a paid subscription.\n\n__What happens with free tenants with SMS as an MFA option enabled before the change?__ Already enrolled users will continue to receive SMS-generated OTP. However, SMS as an MFA will no longer be presented on a free tenant if the dashboard user disables it. The tenant will need to be added to a paid subscription to continue using the feature after disabling it.\n![SMS MFA warning](//images.ctfassets.net/kbkgmx9upatd/2Tim3HNFG7rW6LoE5dmWLq/704896bb10ee659b36c6a2f2fe893e56/SMS_MFA.png)"
    },
    {
      "id": "gOayNIj6dWjjyfO28MLb5",
      "date": "2022-11-09",
      "displayDate": "November 9, 2022",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Deprecation of Checkpoint Pagination on Get Role Users Endpoint - May 2023 End of Life",
      "description": "Beginning May 9th, 2023, the [Get Role Users Management API endpoint](https://auth0.com/docs/api/management/v2#!/Roles/get_role_user) will only return greater than 1,000 total results if the checkpoint pagination method is used. This pagination method is optimized to support large quantities of results. The offset pagination method will be capped at 1,000 results.\n\nSee the [Get Role Users Management API Documentation](https://auth0.com/docs/api/management/v2#!/Roles/get_role_user) for implementation details on the two pagination methods."
    },
    {
      "id": "5w7n7goEjW3j6s4RnewxMU",
      "date": "2022-11-09",
      "displayDate": "November 9, 2022",
      "version": null,
      "type": "added",
      "title": "Public Cloud Environment in the United Kingdom as a Beta",
      "description": "Auth0 is excited to announce the launch of a new public cloud environment in the United Kingdom (UK) as a Beta. This new environment joins previously available environments in the United States, Australia, Japan, and the European Union, as we continue to support our customer's needs to offer low-latency login experiences while complying with data locality regulations. \n\nAuth0 customers can specify their preferred location by simply choosing the United Kingdom region during the tenant creation process. The new Auth0 tenant created will have the `[tenant].uk.auth0.com` domain name and will adhere to amended terms of service and SLA during the Beta period.\n\n![uk-beta-tenant](//images.ctfassets.net/kbkgmx9upatd/2cF334ru4tCQHMv90QJtZr/a90e3e3fffd6bef396b1251728ab5795/beta-tenant-uk.png)"
    },
    {
      "id": "2O39FMeE2YuQzh5pdiE6yK",
      "date": "2022-11-03",
      "displayDate": "November 3, 2022",
      "version": null,
      "type": "added",
      "title": "Custom Database Support for Organizations",
      "description": "In order to support our customer’s growing SaaS businesses, we are excited to announce support for Organizations context in custom database scripts.  This will make it easier to migrate users from your existing B2B applications to Auth0. \n\nCustomers can now enable the additional custom database parameter __Context object in database scripts__.  \n![enable context ](//images.ctfassets.net/kbkgmx9upatd/poRt588AegOTIvy41Zvu0/fab666841dce27ae977404024ee8a007/enable_context.png)\nOnce enabled, the custom database action script will be passed an extra parameter, `context`, that contains information about the Organization that an end-user is interacting with.\n![orgs json](//images.ctfassets.net/kbkgmx9upatd/53VqbkIFY5SrM6Zi6Y59ge/5560df6e2f977569adbf0999979405cb/orgs_json.jpg)\n\nTo learn more about custom database support for Organizations, read [here](https://auth0.com/docs/authenticate/database-connections/custom-db/create-db-connection#create-database-action-scripts).\n"
    },
    {
      "id": "2aHrDdPgVCtFhgsvsz7gVI",
      "date": "2022-10-31",
      "displayDate": "October 31, 2022",
      "version": null,
      "type": "added",
      "title": "Okta Workforce Enterprise Connection",
      "description": "Starting October 31, we are rolling out a new Okta Workforce Enterprise Connection.\n\nThe Okta Workforce Enterprise Connection makes it easy for business customers to offer your product to their employees through their Okta dashboard, with seamless integration to Okta Workforce Identity Cloud. This enterprise connection is now free for all Okta B2B and Enterprise customers, and easier to discover and configure in Auth0.\n\nTo learn more, visit [Connect Your Auth0 Application with Okta Workforce Enterprise Connection](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta \"Connect Your Auth0 Application with Okta Workforce Enterprise Connection\")"
    },
    {
      "id": "7Fr56BLkhQrcHtAuJvg20J",
      "date": "2022-10-22",
      "displayDate": "October 22, 2022",
      "version": null,
      "type": "updated",
      "title": "Manage session inactivity timeout reduced",
      "description": "We’ve reduced session timeout due to inactivity – for administrator sessions on manage.auth0.com – to 12 hours. This is another routine step in our continuous improvements in the security of our services.\n\nFor many of our customer’s administrators, there will be no noticeable effect. For those administrators working in manage.auth0.com day to day, additional or more frequent challenges to log in — if you’ve been inactive for 12+ hours — will be the only effect.\n\nThis change does not affect any sessions configured for your users and your applications as integrated with Auth0 identity services. The only changes are for administrator sessions on manage.auth0.com."
    },
    {
      "id": "YKt6jJumBQEa40qMygX1t",
      "date": "2022-10-14",
      "displayDate": "October 14, 2022",
      "version": null,
      "type": "updated",
      "title": "Viewer-Users and Editor-Users Manage Dashboard access roles log updates",
      "description": "We have expanded the list of [log event types](https://auth0.com/docs/deploy-monitor/logs/log-event-type-codes) visible for `Viewer-Users` and `Editor-Users` management dashboard roles to now also include the following:\n\n```\n    fce, fcoa, fcpn, dcu, feccft, \n    feoobft, feotpft, fepft,  \n    fepotpft, fercft,fi, fs, fui,\n    sce, scpn, scu, sdu, seacft, \n    sede, sens,seoobft, seotpft,\n    sepft, si, sv, svr\n```\n\nA complete list of `Viewer-Users` and `Editor-Users` log event type codes can be found [here](https://auth0.com/docs/get-started/manage-dashboard-access/feature-access-by-role#log-events-available-to-user-roles-)."
    },
    {
      "id": "KgAGtmyRpjq1i5qbgzfey",
      "date": "2022-10-10",
      "displayDate": "October 10, 2022",
      "version": null,
      "type": "added",
      "title": "Allowlist for Bot Detection",
      "description": "##### The Bot Detection Allowlist is now available!\n\nIn the bot detection dashboard we have now added an allowlist. This can be used to add a list of trusted IPs and/or CIDRs in order to by pass Bot Protection. \n\nYou can read more about bot detection and the addition of the allowlist [here](https://auth0.com/docs/secure/attack-protection/bot-detection#let-trusted-ip-addresses-bypass-bot-detection \"Bot Detection Documentation\") "
    },
    {
      "id": "ANtDQ5HlXvmC2jhm63jd4",
      "date": "2022-09-28",
      "displayDate": "September 28, 2022",
      "version": null,
      "type": "changed",
      "title": "Support Access Role in Dashboard",
      "description": "The Support Access Role within the Dashboard has been updated to allow for any user with Support Access granted to view and comment on Support tickets in the \"Subscription Tickets\" section of Support Center. Previously, users with Support Access only had access to \"My Tickets\" in Support Center. With this change, the Support Access Role allows for users to now see and update \"Subscription Tickets\" as well. For more information on feature access by role, see: [Dashboard Access by Role Documentation here](https://auth0.com/docs/get-started/manage-dashboard-access/feature-access-by-role)."
    },
    {
      "id": "65ZAZ374rdWzPhYfeHOsl9",
      "date": "2022-09-22",
      "displayDate": "September 22, 2022",
      "version": null,
      "type": "updated",
      "title": "Auth0 Teams [First Availability] - View all tenant members",
      "description": "Auth0 Teams initially allowed viewing only tenant administrators for the selected tenant from the Teams Dashboard. You can now view all members, including non-administrator roles, using Teams.\n\n[Follow the link to learn more.](https://auth0.com/docs/get-started/tenant-settings/auth0-teams \"Single point of visibility.\")"
    },
    {
      "id": "5wlkOCmXYBZmdlUpmYIGVl",
      "date": "2022-09-21",
      "displayDate": "September 21, 2022",
      "version": null,
      "type": "added",
      "title": "Breached Password Detection On Sign-Up Now Available!",
      "description": "#### __Now announcing the ability to block breached credentials on sign-up with Breach Password Detection!__\n\nWith the previous version of  Breached Password Detection, we have the ability to block log-ins when a set of known breached credentials are used for a user's account. We have now added the ability to enable the same functionality with the signup process.\n\nWithin the Breach Password Detection dashboard, there is now a toggle to turn on Breached Password Detection for account creation. Once on, the user, upon trying to create an account with a set of known breached credentials, will receive a prompt informing them that a combination of credentials was detected in a public breach and to use a different password.\n\nTo learn more about Breached Password Detection,  read [here](https://auth0.com/docs/secure/attack-protection/breached-password-detection \"Breached Password Detection Documentation\") "
    },
    {
      "id": "1CwJ3Ynqk6vLNVNnttqo2l",
      "date": "2022-09-19",
      "displayDate": "September 19, 2022",
      "version": null,
      "type": "added",
      "title": "Send Custom Guardian App Push Notifications using FCM and APNs",
      "description": "Developers can now configure their custom Guardian SDK based applications to have push notifications sent directly to the device platform providers, iOS and Android.  Within the Auth0 dashboard, developers can configure each device platform by providing the key or certificate for FCM and APNs.  AWS SNS remains fully supported as this feature is intended to provide more flexibility to best fit your needs.  Documentation available here for [FCM](https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa#configure-push-notifications-for-android-using-fcm) and [APNs](https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa#configure-push-notifications-for-apple-using-apn-)."
    },
    {
      "id": "3MoE84lVFILO2jzAPmotX3",
      "date": "2022-09-14",
      "displayDate": "September 14, 2022",
      "version": null,
      "type": "updated",
      "title": "Actions Post-login Trigger v3 Update ",
      "description": "We are excited to bring a new version (v3) of Post-login Trigger in Actions to our customers. This backwards-compatible version update effectively enhances the security safeguard and brings new features to Actions. You can read the summary below and find out more information in our release [docs](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/releases).\n\n### Breaking Changes\n\n__*api.redirect.canRedirect()*__ marked as deprecated.\n\n__*api.redirect.sendUserTo()*__ will no longer skip redirecting when in a non-interactive flow. This means that calls to api.redirect.sendUserTo() should first check if the redirect is needed before issuing the redirect.\n\n### New Features\n\n__*event.authentication.methods()*__ may now also contain custom methods completed by users within that session and recorded using api.authentication.recordMethod() from the onContinuePostLogin handler.\n\n__*api.authentication.recordMethod()*__ is added as a way to store a record for the completion of a custom method in the user’s session. These APIs allow you to strictly require custom factors for certain scenarios.\n\nTo learn more about v1 and v2 updates, follow [Actions releases notes](https://auth0.com/docs/customize/actions/releases)."
    },
    {
      "id": "joGTkS6YW0DoI59trHMiJ",
      "date": "2022-09-09",
      "displayDate": "September 9, 2022",
      "version": null,
      "type": "added",
      "title": "Auth0 Notifications Available in the Manage Dashboard",
      "description": "All of the alerts and notifications that are currently published in the [Auth0 Support Center](https://support.auth0.com/) are now also available to read inside the [Manage](https://manage.auth0.com/) dashboard.  With this change, the options under the bell icon on the right side of the Manage banner no longer redirect to the Auth0 Support Center, but rather allow you to check your notifications without leaving the dashboard."
    },
    {
      "id": "5c12pmIHZw4DtAj1kiM4vb",
      "date": "2022-08-29",
      "displayDate": "August 29, 2022",
      "version": null,
      "type": "added",
      "title": "auth0-flutter is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability) release of auth0-flutter, our brand new SDK for adding authentication to Flutter applications. With auth0-flutter, developers now have native Auth0 support to implement web auth login and logout, automatic storage and renewal of user credentials, custom credentials manager, and key Authentication API methods.\n\nTo learn more and get started building with Flutter and Auth0, checkout our recent [blog post](https://auth0.com/blog/introducing-the-auth0-flutter-sdk/), [Quickstart](https://auth0.com/docs/quickstart/native/flutter/interactive), SDK on [GitHub](https://github.com/auth0/auth0-flutter)."
    },
    {
      "id": "66pB4SVZ8HGZoxDL8sIePi",
      "date": "2022-08-15",
      "displayDate": "August 15, 2022",
      "version": null,
      "type": "added",
      "title": "Support for Mixpanel and Twilio Segment for Log Streaming",
      "description": "Auth0 has released native integrations for Mixpanel and Twilio Segment via our [Log Streaming feature](https://auth0.com/docs/customize/log-streams).\n"
    },
    {
      "id": "6bxBzXiltwj6YjhkhQLo8M",
      "date": "2022-08-12",
      "displayDate": "August 12, 2022",
      "version": null,
      "type": "added",
      "title": "Actions Integrations Now Available in Private Cloud",
      "description": "Auth0 is excited to announce a newly expanded offering for our new [private cloud platform](https://auth0.com/blog/a-technical-primer-of-auth0-s-new-private-cloud-platform/) customers - Actions Integrations are now available from the Auth0 Marketplace. What that means is all Auth0 customers that utilize our new private cloud platform have access to all the offerings on the Auth0 Marketplace - SSO, Social Connections, Log Streaming Integrations and now, Actions Integrations.\n\nActions Integrations will start to appear in the Development/Staging space now and will be ready in the Production environment in the coming weeks dependent on various release cadences.\n\nMake sure to visit the [Auth0 Marketplace](https://marketplace.auth0.com/) to see if there is an integration that optimizes your customer’s identity experience. To find out more about becoming a [Private Cloud](https://auth0.com/docs/deploy-monitor/deploy-private-cloud) customer, please [send an inquiry](https://auth0.com/get-started?place=documentation%20post&type=link&text=contact%20auth0%20sales) and someone from Auth0 will contact you about whether it’s a good fit for your business. \n\nRead more about the changes and improvements [here](https://auth0.com/blog/actions-integrations-now-available-in-private-cloud/).\n"
    },
    {
      "id": "3mjEgs4sOUw0CJQLNp5miV",
      "date": "2022-08-11",
      "displayDate": "August 11, 2022",
      "version": null,
      "type": "added",
      "title": "Auth0 Teams - First Availability",
      "description": "Auth0 Teams provides a single point of visibility and control over your enterprise tenants. Teams [First Availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages) is opened to customers with Enterprise tenants in Auth0's Public Cloud. The following features are available as part of Auth0 teams:\n- Visibility into tenants and tenant administrators.\n- Visibility and control of Team members.\n- Ability to restrict tenant creation.\n\nPlease refer to [Auth0 Teams Documentation](https://auth0.com/docs/get-started/tenant-settings/auth0-teams) for more information.\nContact your Technical Account Manager or Auth0 Support to enable Auth0 Teams and begin the journey of centralized visibility and control with us. More exciting new features are coming to Auth0 Teams, and we can't wait to share them with you. Please continue to look for Auth0 Teams product announcements in the future.\n"
    },
    {
      "id": "0ZPVo3bYdwehxqIXz0pZ8",
      "date": "2022-07-28",
      "displayDate": "July 28, 2022",
      "version": null,
      "type": "added",
      "title": "Ability to set Non-Namespaced Custom Claims is now generally available",
      "description": "Auth0 already supported adding custom claims to tokens via extensibility (Hooks / Rules / Actions), however, until today it **restricted the usage of custom claims to public namespaced custom claims**. This caused limitations for some onboarding scenarios and for implementing some standards that require private non-namespaced custom claims (such as FHIR for health care).\nToday, these barriers are gone! **Customers can add non-namespaced custom claims to Access and ID Tokens in OIDC flows**. \n\n``` \n// an Auth0 action\nexports.onExecutePostLogin = async (event, api) => {\n  // this was restricted, this is now allowed !\n  api.accessToken.setCustomClaim('favourite_color', 'blue');\n  api.idToken.setCustomClaim('favourite_star_wars_droid', 'n2c2');\n}\n```\n\n- **Non-namespaced custom claims set on ID Tokens will be returned in the `/userinfo` endpoint**.\n- **New restrictions apply**:\n  - Token size is capped to 100KB in all OIDC flows.\n  - A list of claims (standard and auth0 internal) will be restricted and customers won’t be able overwrite them.\n  - Creation of non-namespaced custom claims on tokens with Auth0 audiences are restricted to avoid collision with Auth0 internal services.\n\nTo learn more, read [JSON Web Token Claims](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims) and [Create Custom Claims](https://auth0.com/docs/secure/tokens/json-web-tokens/create-custom-claims) in the Auth0 Docs.\n\nIf you were already using a previous, non-generally available mechanism to set non-namespaced custom claims, please read our [Migration Guide](https://auth0.com/docs/troubleshoot/product-lifecycle/deprecations-and-migrations/custom-claims-migration)."
    },
    {
      "id": "2LvoTI3FwmPYVToW997QPH",
      "date": "2022-07-27",
      "displayDate": "July 27, 2022",
      "version": null,
      "type": "changed",
      "title": "Support Center user invites",
      "description": "Starting today, July 27th 2022, you can no longer invite users directly to Auth0 Support Center. Access to Support Center can be added via roles available within [Auth0 Dashboard](https://auth0.com/docs/get-started/manage-dashboard-access/feature-access-by-role).\n\nExisting [Support Center users](https://auth0.com/docs/get-started/manage-dashboard-access/support-center-users) can still login to Support Center until Oct 3 2022."
    },
    {
      "id": "1GzYZnb8IGRM9jvd8X5SKJ",
      "date": "2022-07-27",
      "displayDate": "July 27, 2022",
      "version": null,
      "type": "added",
      "title": "Support Access role in Dashboard",
      "description": "Announcing the release of a new Dashboard [role called Support Access](https://auth0.com/docs/get-started/manage-dashboard-access/feature-access-by-role). This role provides users access to Auth0 Support Center and a limited view of aggregated dashboard metrics (Activity Page). \n\nSpecifically, the Support Access role has access to:\n- Metrics-Only Activity Stats in the Auth0 Dashboard\n- Create and manage support tickets in Auth0 Support Center\n- Usage Reports in Auth0 Support Center\n- Compliance docs in Auth0 Support Center"
    },
    {
      "id": "2iBKVDB9rUYEAGxevaVQ1s",
      "date": "2022-07-26",
      "displayDate": "July 26, 2022",
      "version": null,
      "type": "added",
      "title": "auth0-flutter is now in First Availability",
      "description": "Announcing the [first availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#first-availability \"first availability\") release of auth0-flutter, our brand new SDK for adding authentication to Flutter applications. With auth0-flutter, developers now have native Auth0 support to implement web auth login and logout, automatic storage and renewal of user credentials, custom credentials manager, and key Authentication API methods.\n\nTo learn more and get started building with Flutter and Auth0, checkout the [Quickstart](https://auth0.com/docs/quickstart/native/flutter) and SDK on [GitHub](https://github.com/auth0/auth0-flutter/tree/first-availability/auth0_flutter).\n"
    },
    {
      "id": "3EY4G2GnIKqvpwnRoJAO9I",
      "date": "2022-07-21",
      "displayDate": "July 21, 2022",
      "version": null,
      "type": "added",
      "title": "SimpleKeychain v1 and JWTDecode.swift v3 is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability \"General Availability Product Lifecycle\") release of SimpleKeychain v1 and JWTDecode.swift v3, our utility libraries for storing user credentials in iCloud Keychain and decoding JWTs in iOS, macOS, tvOS, and watchOS apps. Both releases aim to modernize the libraries, dropping support for Objective-C, older versions of Swift, and outdated platform versions.\n\nTo get started building with SimpleKeychain and JWTDecode.swift, you can view the latest release notes and migration guides on GitHub.\n- [SimpleKeychain](https://github.com/auth0/SimpleKeychain/releases/tag/1.0.0)\n- [JWTDecode.swift](https://github.com/auth0/JWTDecode.swift/releases/tag/3.0.0)\n\nLooking to extend this functionality and easily integrate Auth0 into iOS and Mac apps? Check out our [Auth0.swift](https://github.com/auth0/Auth0.swift \"Auth0.swift SDK\") SDK which supports SimpleKeychain, JWTDecode, and more."
    },
    {
      "id": "5cMwTi7ZIU42ebgT8w28a3",
      "date": "2022-07-19",
      "displayDate": "July 19, 2022",
      "version": null,
      "type": "updated",
      "title": "Node 16 is coming to Rules and Hooks",
      "description": "Starting Jul 25, 2022 we are rolling out Node 16 to support Auth0 Rules and Hooks, and we recommend our developer customers [update the tenant global setting](https://auth0.com/docs/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-to-nodejs-16) to Node.js 16, or [migrate Legacy Rules/Hooks](https://auth0.com/docs/customize/actions/migrate/migrate-from-rules-to-actions) to Actions.\n\nNode.js 12 [is no longer supported](https://nodejs.org/en/about/releases/) and has exited Long Term Support (LTS), but it will remain available for Rules and Hooks for the time being. We encourage you to migrate your Rules and Hooks to Node.js 16 at a minimum. Ultimately we strongly encourage our developer community to migrate your Rules & Hooks to Auth0 Actions for [a greatly improved developer experience](https://auth0.com/blog/introducing-auth0-actions/). We plan to support every current and long-term supported Node version in the future through Actions exclusively.\n\nTo take advantage of Node 16 for Rules and Hooks, simply select Node 16 for your tenants' Extensibility, Runtime setting (under Advanced Settings in the tenant dashboard). Your existing Rules and Hooks will then default to Node 16, so we recommend testing in a non-production tenant first. If you need to revert your Rules and Hooks to a previous version, you can revert back to Node 12 as well. We'll release more information about the Node 16 upgrade in our Docs shortly, and will update this Changelog when done.\n\nFor customers using our flagship extensibility product Auth0 Actions, there will be no changes. Our long-term strategy is to unify all extensibility under Actions. We also encourage you to explore Actions Integrations - a modern approach to extensibility without Node version disruption. All Actions Integrations will run on Node 16 at launch, and will be maintained by Auth0 and our Marketplace Partners.\n\nWe want to hear from you. Please share any feedback on your experience with our extensibility tools and Actions in [our Developer Community](https://community.auth0.com/c/actions/91)."
    },
    {
      "id": "PjB6nLl6zb1wjCEhG5zu4",
      "date": "2022-06-29",
      "displayDate": "June 29, 2022",
      "version": null,
      "type": "added",
      "title": "Sign in With Apple -  Supporting User Delete Requirement",
      "description": "Starting June 30, 2022 applications using __Sign in With Apple (SIWA)__ for account creation must also let users initiate deletion of their account from within the app. Apple offers the following guidance at [https://developer.apple.com/support/offering-account-deletion-in-your-app](https://developer.apple.com/support/offering-account-deletion-in-your-app) :\n\n* Make the account deletion option easy to find in your app. Typically, it’s included in the app’s account settings.\n* Offer to delete the entire account record, along with associated personal data. You may include additional options, but only offering to temporarily deactivate or disable an account is insufficient.\n* If people need to visit a website to finish deleting their account, include a link directly to the page on your website where they can complete the process.\n* Keep users informed. If the deletion request will take additional time to complete, let them know. If your app supports in-app purchases, help people understand how billing and cancellations will be handled.\n\nFor Auth0 customers this can be done by a call to the Management API v2 endpoint \n\n__DELETE/users/%user_id% __\n\nIn addition, Apple now requires token revocation for the deleted user to remove the authorization from the list of applications on the user Apple account. In order to provide a complete solution, we have made an update to our SIWA integration. Auth0 will store and then revoke the Apple token on a user that has been created via SIWA on behalf of our customers. So no further action is necessary beyond user deletion to satisfy the new Apple requirement."
    },
    {
      "id": "3GNWzif1wgxxRd6CWmzH75",
      "date": "2022-06-03",
      "displayDate": "June 3, 2022",
      "version": null,
      "type": "added",
      "title": "Organizations – Enterprise Scalability Improvements",
      "description": "In order to support our customers' growing SaaS businesses, we have introduced some scalability improvements for Auth0 Organizations. \n\nCustomers can now Search for Organizations in the Manage Dashboard, and those on our Enterprise subscription plan can request increased entity limits for Organizations and Organization Members. Both can now be raised up to 2M (2,000,000) on a per-tenant basis.\n\n![Organization Search](//images.ctfassets.net/kbkgmx9upatd/12PIvXNMTpxCritlyOxcey/3cce4b34dd2a71e3479283009fdd7a6f/orgs-search__1_.png)\n\nTo request an entity limit increase, please connect with your technical account manager or create a support ticket in your Enterprise subscription which includes the following:\n\n- Description of your use-case and the reason for needing an increase\n- Which limit needs the increase (number of Organizations, or number of Organization members per-organization)\n- The name and region of the Auth0 tenants that need the increase applied\n"
    },
    {
      "id": "6invvrzCcIJSaFfislHyMW",
      "date": "2022-06-01",
      "displayDate": "June 1, 2022",
      "version": null,
      "type": "added",
      "title": "New Universal Login No-Code Editor",
      "description": "The New Universal Login No-Code Customization Editor allows you to quickly design and configure your login experience with no coding or technical skills required. This can help to get your own customized, branded login experience running in just minutes. You can easily apply your own logo, change colors, apply fonts, customize borders, and change backgrounds for a look and feel that’s all your own.\n\nSee your changes in real time using the large preview window. The preview allows you to zoom in on certain sections and move around your page for detailed inspection. You can interact with your new design with our “Try” feature. And you can save and publish your changes to your application in a single click.\n\nTo learn more about the New Universal Login No-Code Customization Editor see the [No-Code Editor Documentation](https://auth0.com/docs/customize/universal-login-pages/customize-new-universal-login-with-the-no-code-editor)"
    },
    {
      "id": "QQxnUi1v9hAKQgDHLBenq",
      "date": "2022-05-31",
      "displayDate": "May 31, 2022",
      "version": null,
      "type": "added",
      "title": "Bot Detection Upgraded with Machine Learning to Reduce Bot Attacks by 79%",
      "description": "Auth0 Bot Detection in public cloud is now upgraded with a new machine learning engine to help reduce bot attacks by 79%, with minimal impact on user experience. \n\nPart of the Auth0 Attack Protection add-on, Bot Detection now pairs machine learning with one of the world’s largest consumer identity platforms to screen more bots in nearly 90% of attacks compared to the previous iteration. The impact on user experience remains unchanged, as even during attacks, fewer than 1% of challenges are shown to humans. Better security shouldn’t mean more friction.\n\nTo learn more about bot detection, see the [Auth0 Bot Detection documentation](https://auth0.com/docs/secure/attack-protection/bot-detection).\n"
    },
    {
      "id": "7eReKl6cIecsBzNvhOc8u2",
      "date": "2022-05-11",
      "displayDate": "May 11, 2022",
      "version": null,
      "type": "changed",
      "title": "Changes to the Details key in the APIv2 logs Endpoint ",
      "description": "On Apr 3, 2022 Auth0 limited the ability to search nested fields in the details key of the /api/v2/logs endpoint. Only the most commonly used fields within the details key are searchable through the endpoint and throughout the Auth0 dashboard. All the data in the details key will still be returned to customers by the Management API and Log Streaming."
    },
    {
      "id": "1uSq2TFMlabQdziQ5Bq0Eh",
      "date": "2022-05-05",
      "displayDate": "May 5, 2022",
      "version": null,
      "type": "removed",
      "title": "Device Credentials API: Remove unused response field",
      "description": "The device credentials management API ([Auth0 Management API v2](https://auth0.com/docs/api/management/v2#!/Device_Credentials/get_device_credentials)) was returning an undocumented field `last_used`.  This field has now been removed from the API response."
    },
    {
      "id": "6EsFX1mPOP9fPVnrzR6YLb",
      "date": "2022-05-04",
      "displayDate": "May 4, 2022",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Log Extension Deprecation - November 2022 End of Life",
      "description": "Beginning May 4th, 2022, the capability to install certain log extensions will no longer be supported. In order to achieve consistency across all Auth0 offerings and to focus on enhancing the Auth0 Log Streaming feature, we are discontinuing the support of the following Log Extensions (Installed) as of November 2, 2022. The relevant Log Extensions are:\n\n- Auth0 Authentication API Webhooks\n- Auth0 Management API Webhooks\n- Logs to Cloudwatch\n- Logs to Logentries\n- Logs to Loggly\n- Logs to Logstash\n- Logs to Papertrail\n- Logs to Splunk\n- Logs to Sumo Logic\n- Logs to Logentries\n\nTo learn more about migration to Auth0 Log Streams, read this [migration guide](https://auth0.com/docs/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-from-log-extensions).\n"
    },
    {
      "id": "6BBzbWOwkhEZdzauu2s0Bg",
      "date": "2022-04-21",
      "displayDate": "April 21, 2022",
      "version": null,
      "type": "updated",
      "title": "Organizations: Miscellaneous Improvements",
      "description": "We recently released a few updates to the Organizations feature:\n\n1. Organization names can now be modified after creation. They still must be unique in the Auth0 tenant.\n2. Organization parameters now show up when [debugging email templates](https://auth0.com/docs/customize/email/email-templates#debug-liquid-template-variables). \n3. Enabled connections can now be included when creating an Organization via the [POST Organization endpoint](https://auth0.com/docs/api/management/v2#!/Organizations/post_organizations).\n4. Fixed an issue where duplicates could be returned from the [GET Organization Members endpoint](https://auth0.com/docs/api/management/v2#!/Organizations/get_members).\n"
    },
    {
      "id": "25CSs4pq46tpAL3oLZ0HJR",
      "date": "2022-04-13",
      "displayDate": "April 13, 2022",
      "version": null,
      "type": "updated",
      "title": "Bulk User Exports: Updated User-Export CSV data format",
      "description": "The Bulk User Export will now escape string data types in the CSV export file.  This is in conformance with OWASP standards for CSV injection mitigation.  To ensure the content is read as text:\n\n- Double quote characters are prepended with a double quote character.\n- Each string is prepended with a single quote character.\n- Each string is wrapped in double quotes.\n\nThis does not apply to dates in ISO 8601 format.\n\nCheck out our [technical documentation](https://auth0.com/docs/users/import-and-export-users/bulk-user-exports#find-export-data \"Link to Bulk Export Documentation\") to learn more about bulk user exports."
    },
    {
      "id": "2Rt4k094u233k2cpLaPNnu",
      "date": "2022-04-05",
      "displayDate": "April 5, 2022",
      "version": null,
      "type": "added",
      "title": "Auth0 adds refresh token limit of 200 per user per application",
      "description": "Announcing an improvement to Auth0’s security and performance with refresh token limits. We are limiting the amount of refresh tokens to 200 active tokens per user per application. Our service will periodically scan for client applications that keep an excess of active user refresh tokens and remove the excess on an older-first basis.\n\nLimiting the amount of refresh tokens helps prevent accidental creation and accumulation of unnecessary or forgotten tokens while also preventing performance side-effects and signaling anomalous authentication flows via [Refresh token excess warning](https://auth0.com/docs/deploy-monitor/logs/log-event-type-codes) in [tenant logs](https://auth0.com/docs/deploy-monitor/logs/view-log-events).\n\nYou can read more on our [Refresh Token](https://auth0.com/docs/secure/tokens/refresh-tokens) page and follow-up with our [Token Best Practices](https://auth0.com/docs/secure/tokens/token-best-practices)."
    },
    {
      "id": "7dLWN7NMdiz6PG1z8rLMjz",
      "date": "2022-03-22",
      "displayDate": "March 22, 2022",
      "version": null,
      "type": "updated",
      "title": "Laravel-auth0 v7 is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability) release of [laravel-auth0](https://github.com/auth0/laravel-auth0) v7, our SDK for integrating Auth0 in Laravel applications. The v7 release of laravel-auth0 is a huge overhaul from v6 adding a wealth of developer experience improvements. Updates include support for Laravel 9, new plug and play controllers making it even easier to add authentication to Laravel apps, full integration with the recently updated Auth0-PHP v8 SDK, and more. \n\nTo get started building with Laravel and Auth0, check out the latest release on [GitHub](https://github.com/auth0/laravel-auth0) or the [migration guide](https://github.com/auth0/laravel-auth0/blob/main/UPGRADE.md) if you are upgrading from previous versions."
    },
    {
      "id": "2TOkVvGVzuClhnS4AahD13",
      "date": "2022-03-17",
      "displayDate": "March 17, 2022",
      "version": null,
      "type": "updated",
      "title": "Tenant members with Viewer-Users or Editor-Users roles can see Organizations in the Dashboard",
      "description": "The Viewer - Users and Editor - Users roles has now read access to the Organizations list and Organization Members in the Dashboard. Editor - Users can see Organization Invitations in addition.\n\nWith this improvement, the Viewer - Users and Editor - Users Dashboard roles have a complete user visualization experience when the Organizations feature is being used. \n\nRead more about Dashboard roles in our [docs](https://auth0.com/docs/get-started/manage-dashboard-access/feature-access-by-role).\n"
    },
    {
      "id": "2Hfl0c7pK6bTWKwYIy9px4",
      "date": "2022-03-15",
      "displayDate": "March 15, 2022",
      "version": null,
      "type": "updated",
      "title": "Auth0-vue v1 is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability) release of [auth0-vue](https://github.com/auth0/auth0-vue) v1, our brand new SDK for adding authentication to Vue applications. With auth0-vue, developers can integrate Auth0 into Vue 3 apps faster and easier than ever before. The new SDK is built on top of our [SDK for Single Page Applications](https://github.com/auth0/auth0-spa-js) providing all the same functionality wrapped in a native experience for Vue developers. \n\nTo get started building with Vue and Auth0, check out the [Quickstart](https://auth0.com/docs/quickstart/spa/vuejs) and SDK on [GitHub](https://github.com/auth0/auth0-vue)."
    },
    {
      "id": "5ZQfnWwfdPG23C1dTIPE2N",
      "date": "2022-03-14",
      "displayDate": "March 14, 2022",
      "version": null,
      "type": "added",
      "title": "Auth0.swift v2 is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability \"general availability\") release of [Auth0.swift](https://github.com/auth0/Auth0.swift \"Auth0.swift v2\") v2. Our Swift SDK lets you communicate efficiently with many Auth0 API endpoints and seamlessly integrates the Auth0 login.\n\nWith this new major release, we’ve added support for async/await and Combine, more customization points like custom headers and custom credentials storage as well as removing the complexity of dealing with concurrent refresh grants with our thread-safe token renewals. We’ve also greatly improved the docs, the secure by default configuration, and error handling.\n\nTo get started experimenting with the latest release, check out our updated [migration guide](https://github.com/auth0/Auth0.swift/blob/beta/V2_MIGRATION_GUIDE.md)."
    },
    {
      "id": "BbVlKEFZtZJhMFezaJa0F",
      "date": "2022-03-09",
      "displayDate": "March 9, 2022",
      "version": null,
      "type": "updated",
      "title": "Auth0 Terraform provider is now Verified",
      "description": "The Auth0 Terraform provider has been updated in the HashiCorp Terraform Registry and is now Verified by HashiCorp, and supported by Auth0 🎉\n\nYou can find the [Auth0 provider](https://registry.terraform.io/providers/auth0/auth0/latest \"Auth0 Terraform provider, latest version overview\") and [read the Docs](https://registry.terraform.io/providers/auth0/auth0/latest/docs \"Auth0 Terraform provider, latest version docs\") in the Terraform Registry directly.\n\nYou can find the source code for the [Auth0 Terraform provider in GitHub](https://github.com/auth0/terraform-provider-auth0 \"Public GitHub repo for Auth0 Terraform provider\").\n\n![Auth0 Verified Terraform provider listing](//images.ctfassets.net/kbkgmx9upatd/6bYTl9luWA2jPBWpLxFgVv/b95e8bcc4637766c0a88c17e1275f877/auth0-terraform-verified-provider.png)"
    },
    {
      "id": "45sQCb7UFO4TPOu5v8ATLz",
      "date": "2022-02-23",
      "displayDate": "February 23, 2022",
      "version": null,
      "type": "added",
      "title": "Attack Protection Now Included in Auth0 Management API and SDKs",
      "description": "Auth0 customers can now use the Auth0 Management API and SDKs to configure these attack protection features:\n\n* Breached password detection\n* Brute force protection\n* Suspicious IP throttling\n\nTo learn about Management APIs, see the [Auth0 Management API explorer](https://auth0.com/docs/api/management/v2#!/Attack_Protection/get_breached_password_detection).\n\nTo learn more about SDKs, see the [Auth0 SDK Libraries documentation](https://auth0.com/docs/libraries#mgmt)."
    },
    {
      "id": "yIxPEYVyNZ6Taphreez08",
      "date": "2022-02-08",
      "displayDate": "February 8, 2022",
      "version": null,
      "type": "updated",
      "title": "Auth0 Status Page now also supports RSS",
      "description": "We have updated [Status Page](https://status.auth0.com/) to allow users to also subscribe to a RSS feed for status notifications related to their tenant.\n\n![status page RSS feed](//images.ctfassets.net/kbkgmx9upatd/2NnRYFTlWD6qFpu1xtn1Xb/6970eb1c072dde85d21c9f74a1640042/Screen_Shot_2022-02-08_at_1.21.15_PM.png)"
    },
    {
      "id": "6BUDmwdDG205rYvsxHfMvf",
      "date": "2022-02-07",
      "displayDate": "February 7, 2022",
      "version": null,
      "type": "added",
      "title": "Credential Guard Now Available",
      "description": "Auth0 has released Credential Guard, a new security feature that protects your users and your enterprise from password theft. Credential Guard augments Auth0’s automated breached password detection feature, mitigating worldwide data breaches sooner, often before they’re made public. The new Enterprise add-on reduces the risk of data breaches to your application by up to 80%.\n\nBreached password detection relies on public announcements of large-scale data breaches. If your user’s credentials (based on their email address) have been exposed in a public data breach, Auth0 can automatically alert your users, challenge them with an additional authentication factor, or block access until they reset their password. \n\nWith the Credential Guard add-on, a dedicated team of security professionals infiltrates criminal communities and gains access to exposed data as soon as breaches occur, often many months before any public announcement. With this advantage, you can better protect your users and secure your applications by resetting stolen passwords sooner.\n\nCredential Guard protects your enterprise from data breaches across more than 35 languages and 200 countries and territories. It helps you eliminate the costs associated with account takeovers, while also protecting your users' accounts.\n\nCredential Guard:\n* Exposes more than ten times the data breaches\n* Reveals breached credentials more quickly\n* Increases global coverage by adding data feeds for passwords in non-Roman characters\n\nEnterprise plan customers can add Credential Guard to their Auth0 agreement and then enable it from the [Auth0 Dashboard](https://manage.auth0.com/#/security/attack-protection/breached-password)\n\nIf you have the Attack Protection add-on, you already have access to this feature. You can enable Credential Guard from the [Auth0 Dashboard](https://manage.auth0.com/#/security/attack-protection/breached-password): locate **Breached Password Detection method**, select **As soon as possible, with Credential Guard, and** select **Save**.\n\nTo learn more, read [Breached Password Detection](https://auth0.com/docs/secure/attack-protection/breached-password-detection) in the Auth0 Docs."
    },
    {
      "id": "5VjDRDd4KmxZUqordJV5O4",
      "date": "2022-02-02",
      "displayDate": "February 2, 2022",
      "version": null,
      "type": "updated",
      "title": "Updated Information Architecture in Auth0 Docs",
      "description": "We have again updated the [Auth0 Docs](https://auth0.com/docs \"Auth0 Docs\") experience 🤓\n\n- we improved the article navigation by categorizing articles into job-focused topics, and\n- we've added a Table of Contents to complex or longer articles on the right side of the article view\n\n![Auth0 Docs IA New Nav](//images.ctfassets.net/kbkgmx9upatd/78PoCyS80MVe0ZFGgqSxGJ/a80c67ae57736b83e63e881f441a5ea0/Nav.png)\n\n![Auth0 Docs New ToC](//images.ctfassets.net/kbkgmx9upatd/4T3BPBPSZ9IDftf71bkP0N/e4bfe307bb7eb6fc4adbb224cae97bd2/ToC.png)"
    },
    {
      "id": "tua9exNm5Nkw6nUNL5ogu",
      "date": "2022-01-24",
      "displayDate": "January 24, 2022",
      "version": null,
      "type": "updated",
      "title": "Go-jwt-middleware V2 is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/troubleshoot/product-lifecycle/product-release-stages#general-availability) release of [go-jwt-middleware](https://github.com/auth0/go-jwt-middleware) V2, our SDK for checking and validating JWTs in Go applications. The V2 release of our go-jwt-middleware is a giant leap forward from our V1 implementation. Updates include simplifying the JWT library interface, support for JWKS, and much more. Please note, this update contains breaking changes. \n\nTo get started experimenting with the latest release, check out our updated [migration guide](https://github.com/auth0/go-jwt-middleware/blob/v2.0.0-beta/MIGRATION_GUIDE.md). "
    },
    {
      "id": "3QXBzKOb11U3sn2GzoGr0u",
      "date": "2021-12-13",
      "displayDate": "December 13, 2021",
      "version": null,
      "type": "changed",
      "title": "Auth0 expands caching for common Authentication API requests",
      "description": "Auth0 has implemented a cache of additional entities stored in our databases which see low change rates but high number of requests.  \n\nThis cache will apply to endpoints of the Authentication API and will not impact the Management API.\n\nThe following will be cached and updated every thirty (30) seconds:\n- General and advanced tenant configuration\n- UL Configuration including branding \n\nThough the behavior changes will be minimal, a follow-on effort will be made to reduce the impacts caching may have on the tenant administration experience. \n"
    },
    {
      "id": "4y7zELP92RSvZ2IWkhQC57",
      "date": "2021-11-17",
      "displayDate": "November 17, 2021",
      "version": null,
      "type": "added",
      "title": "Auth0 Identity Platform on Microsoft Azure is now in General Availability",
      "description": "We’re excited to announce general availability of Auth0 Identity Platform as a private cloud deployment option on Microsoft Azure. This unlocks a secure cloud deployment option for organizations seeking a strategic fit with their technology stack, support for regional data residency capabilities and higher control over customer's data. You can learn more about deploying Auth0 Identity Platform on Azure in our [documentation](https://auth0.com/docs/deploy/private-cloud-on-azure).\n"
    },
    {
      "id": "2qR5fO6H0Aac4IiMqj3Jve",
      "date": "2021-11-08",
      "displayDate": "November 8, 2021",
      "version": null,
      "type": "added",
      "title": "Express-oauth2-jwt-bearer is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/product-lifecycle/product-release-stages#first-availability) release of express-oauth2-jwt-bearer, our new SDK for Express API’s. express-oauth2-jwt-bearer greatly simplifies the process of protecting your Express APIs with Bearer Token JWTs using a combination of the well established [OAuth2 Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750) spec and the recently published specification of [JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens](https://datatracker.ietf.org/doc/html/rfc9068).\n\nTo learn more about the Auth0 express-oauth2-jwt-bearer SDK and try it yourself, check out our [Quickstar](https://auth0.com/docs/quickstart/backend/nodejs)t, and repo on [GitHub](https://github.com/auth0/node-oauth2-jwt-bearer/tree/main/packages/express-oauth2-jwt-bearer)."
    },
    {
      "id": "60kp5QdqZ4DByeY0p8Ygno",
      "date": "2021-11-03",
      "displayDate": "November 3, 2021",
      "version": null,
      "type": "updated",
      "title": "Refreshed visual experience in Auth0 Docs",
      "description": "We have updated the [Auth0 Docs](https://www.auth0.com/docs \"Auth0 Docs\") experience to reflect the new [Auth0 brand](https://auth0.design/ \"Auth0 Design\").\n![New Docs Brand](//images.contentful.com/kbkgmx9upatd/1yFT3pP4RttMEbMdMqRx1m/ef422675a6553e5fd9ca7c9c31faf655/changelog_image.png)"
    },
    {
      "id": "1OgnYdl2SShJYaftwC8ky5",
      "date": "2021-11-02",
      "displayDate": "November 2, 2021",
      "version": null,
      "type": "changed",
      "title": "Auth0 adds caching for common Authentication API requests",
      "description": "Auth0 has implemented a cache of entities stored in our databases which see low change rates but high number of requests.  \n\nThis cache will apply to specific endpoints of the Authentication API and will not impact the Management API.\n\nThe following will be cached and updated every thirty (30)  seconds:\n- Connections\n- Applications \n\nThough the behavior changes will be minimal, a follow-on effort will be made to reduce the impacts caching may have on the tenant administration experience. \n"
    },
    {
      "id": "2gX7nYfhAOTFeiqgt1tt2R",
      "date": "2021-10-22",
      "displayDate": "October 22, 2021",
      "version": null,
      "type": "added",
      "title": "ASP.NET Core SDK is now in General Availability",
      "description": "Announcing the [general availability](https://auth0.com/docs/product-lifecycle/product-release-stages#first-availability \"General Availability\") release of Auth0.AspNetCore.Authentication, our new SDK for ASP.NET Core applications. Integrating Microsoft's OpenID Connect middleware, we’ve supercharged our .NET developer experience by making it even easier to integrate Auth0 in ASP.NET Core applications like MVC, Razor Pages, and Blazor.\n\nTo learn more about the Auth0 ASP.NET Core SDK and try it yourself, check out our [blogpost](https://auth0.com/blog/exploring-auth0-aspnet-core-authentication-sdk/ \"Auth0 ASP.NET Core SDK Blog\"), [Quickstart](https://auth0.com/docs/quickstart/webapp/aspnet-core \"Auth0 ASP.NET Core SDK Quickstart\"), and repo on [GitHub](https://github.com/auth0/auth0-aspnetcore-authentication \"Auth0 ASP.NET Core SDK - GitHub\").\n"
    },
    {
      "id": "5aysPPs2uXhefRQv9c2RwG",
      "date": "2021-10-05",
      "displayDate": "October 5, 2021",
      "version": null,
      "type": "added",
      "title": "Auth0 Identity Platform on Microsoft Azure is now in First Availability",
      "description": "We’re excited to announce first availability of Auth0 Identity Platform as a private cloud deployment option on Microsoft Azure. This unlocks a secure cloud deployment option for organizations seeking a strategic fit with their technology stack, support for regional data residency capabilities and higher control over customer's data. \n\nDuring [First Availability](https://auth0.com/docs/product-lifecycle/product-release-stages#first-availability \"First Availability\"), private cloud deployments on Azure will be available for select customers. You can learn more about deploying Auth0 Identity Platform on Azure in our [documentation](https://auth0.com/docs/deploy/private-cloud-on-azure \"Auth0 Private Cloud on Azure\")."
    },
    {
      "id": "7lw4mv99tpbiuXScyeaRM3",
      "date": "2021-09-29",
      "displayDate": "September 29, 2021",
      "version": null,
      "type": "added",
      "title": "Threshold Manager for Suspicious IP throttling now Generally Available",
      "description": "Auth0 has released Threshold Manager for Suspicious IP throttling.\n\nAuth0 users can now use Threshold Manager to set their preferred thresholds for Suspicious IP throttling. With a self-serve capability, users can now modify the default threshold for Suspicious IP throttling, giving them more flexibility and reducing any delays in implementing security policies.\n\nYou can enable it in the [Auth0 Dashboard](https://manage.auth0.com/#/security/attack-protection/suspicious-ip-throttling).\n\nYou can learn more in our [public docs](https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling)"
    },
    {
      "id": "48xUu7iNshIi7nVJrfKfCV",
      "date": "2021-09-29",
      "displayDate": "September 29, 2021",
      "version": null,
      "type": "added",
      "title": "Log Stream Flexibility is now in General Availability",
      "description": "Log Stream Flexibility, after a successful beta, is now in general availability (GA). \nThis allows both the ability to start a new log stream from a certain point in time and to filter logs based on specific log type categories.\n\nLearn more in our [public docs](https://auth0.com/docs/logs/streams/event-filters)"
    },
    {
      "id": "6Oj8MlpNyy66dIvqVR3vMg",
      "date": "2021-09-23",
      "displayDate": "September 23, 2021",
      "version": null,
      "type": "added",
      "title": "Additional Audit Event Tracking Access to Client Secrets",
      "description": "We added a new audit event (mgmt_api_read). This event will indicate when a client secret is present in the response of a successful management API read request. \nYou can learn more in our [public docs](https://auth0.com/docs/monitor-auth0/logs/log-event-type-codes)\n"
    },
    {
      "id": "3Y44p9cjFfosYIR3YylcrP",
      "date": "2021-09-23",
      "displayDate": "September 23, 2021",
      "version": null,
      "type": "updated",
      "title": "Heroku Add-on: Tokyo private space",
      "description": "Heroku private space users in Tokyo now get a tenant in Auth0's Japan region when adding the Auth0 add-on.\n\nCheck out [the add-on overview](https://elements.heroku.com/addons/auth0#region-map) to learn more about supported Heroku regions by Auth0."
    },
    {
      "id": "3ccn4pizNvPIpS1Tezl6IZ",
      "date": "2021-09-15",
      "displayDate": "September 15, 2021",
      "version": null,
      "type": "updated",
      "title": "Bulk User Exports: Updated Export Location URI Format",
      "description": "The Bulk Users Export API upload now uses AWS S3 pre-signed URLs for the one-time downloads. The URL changed from `user-exports.[region].auth0.com` to `[environment]-auth0-export-users-[aws-region].s3.[aws-region].amazonaws.com`\n\nCheck out our [technical documentation](https://auth0.com/docs/users/import-and-export-users/bulk-user-exports#find-export-data \"Link to Bulk Export Documentation\") to learn more about bulk user exports."
    },
    {
      "id": "2eQlap4J3TZ2vUVVuPklCy",
      "date": "2021-08-18",
      "displayDate": "August 18, 2021",
      "version": null,
      "type": "updated",
      "title": "Organizations: Support for SAML Apps",
      "description": "\nApplications that authenticate users via SAML can now use [Auth0 Organizations](https://auth0.com/docs/organizations) to support their business customers and partners.\n\nWhen [Auth0 is acting as a SAML IdP](https://auth0.com/docs/protocols/saml-protocol#saml-identity-providers), applications can now send users to Auth0 along with an organization ID, and they will be prompted to log-in in the context of that Organization. If no organization is provided, and the application is configured to require one, the user will be prompted to enter the name of the organization they’d like to authenticate with. After logging in, the SAML response will contain the associated Organization ID.\n\nNote that Organizations already supports federating users from your business customers’ organizations into your applications via SAML, by creating [SAML Enterprise Connections](https://auth0.com/docs/connections/enterprise/saml) and [enabling them for your organizations](https://auth0.com/docs/organizations/enable-connections). This update allows applications to trigger Organization login flows using SAML Authentication requests.\n\nCheck out [our technical documentation](https://auth0.com/docs/organizations) to learn more about Organizations features and how they can be used to support SaaS and business-to-business applications.\n\nYou can learn more about Auth0 support for SAML in [this blog post](https://auth0.com/blog/how-saml-authentication-works/). \n\n![Auth0 Organization Login Prompts](//images.contentful.com/kbkgmx9upatd/364HpKQshDSZ8KobbHsRP9/d5fbdcfb4c3986e7fdcf39e05615f668/asset-blog-2-APPROVED.png)\n"
    },
    {
      "id": "5w7DAAJd9hAI6piM46mVDr",
      "date": "2021-08-09",
      "displayDate": "August 9, 2021",
      "version": null,
      "type": "added",
      "title": "Additional Languages Available for New Universal Login",
      "description": "We added Bosnian, Bulgarian, Croatian, Serbian, Slovenian, Icelandic, Ukrainian, Estonian, Lithuanian and Latvian language options to the New Universal Login flow.\n"
    },
    {
      "id": "6CiwMVSHe0aWjZQl5mNFay",
      "date": "2021-07-14",
      "displayDate": "July 14, 2021",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Private Cloud Custom Domains",
      "description": "In order to achieve consistency across all Auth0 deployments and to focus on enhancing the Auth0 Custom Domain feature, we are discontinuing the Private Cloud Custom Domain capability as of December 20, 2021. This consistency enables us to enhance the feature and fix reliability issues faster, improving operational efficiency and enabling customers to get value out of custom domains quicker. To learn more about migration to Auth0 Custom Domains, read [this migration guide](https://auth0.com/docs/deploy/private-cloud/private-cloud-migrations/migrate-private-cloud-custom-domains)."
    },
    {
      "id": "2qvS200PF7LMVBgiP32OjA",
      "date": "2021-07-14",
      "displayDate": "July 14, 2021",
      "version": null,
      "type": "added",
      "title": "Improved Page Templates Authoring Experience through Auth0 CLI",
      "description": "The [Auth0 CLI](https://github.com/auth0/auth0-cli) lets you build, test, troubleshoot and manage your Auth0 tenants directly from the command line.\n\nIf you are using the New Universal Login experience, you can take advantage of the CLI to easily customize the page templates.\n\nWhen you run:\n\n    auth0 branding templates update\n\nThe CLI will open two windows:\n\n- A browser window with a Storybook that shows the login page with the page template applied:\n\n![Page Templates Storybook](//images.contentful.com/kbkgmx9upatd/p7KM9w5fPQ5R7CatmXxXF/d435cfc7bf4150747819dff160696d34/templates-storybook.png)\n\n- Your default editor, with the page template code:\n\n![Page Templates Code Editor](//images.contentful.com/kbkgmx9upatd/sBwKJKoetCyKqR1FT29Jg/e2ed3f03c0bc1af63586384576f70eae/templates-vs-code.png)\n\nYou can now change the page template code, and you will be able to preview the changes in the browser window.\n\nOnce you close the window, you’ll be asked if you want to save the template. If you answer Yes, the template will be uploaded to your tenant.\n"
    },
    {
      "id": "1MTAk7krZlhgCkNWLoMme7",
      "date": "2021-07-06",
      "displayDate": "July 6, 2021",
      "version": null,
      "type": "added",
      "title": "Threshold Manager for Brute-force Protection now Generally Available",
      "description": "Auth0 has released Threshold Manager for Brute-force Protection.\n\nAuth0 users can now use Threshold Manager to set their preferred threshold for Brute-force protection. With a self-serve capability, users can now modify the default threshold for Brute-force protection, giving them more flexibility and reducing any delays in implementing security policies.\n\nYou can enable it in the [Auth0 Dashboard](https://manage.auth0.com/#/security/attack-protection/brute-force).\n\nYou can learn more in our [public docs](https://auth0.com/docs/attack-protection/brute-force-protection)."
    },
    {
      "id": "17N4kAmBQPLlBNrvKZfyKD",
      "date": "2021-07-06",
      "displayDate": "July 6, 2021",
      "version": null,
      "type": "added",
      "title": "Adaptive MFA Risk Assessors now Generally Available",
      "description": "Auth0 has released Adaptive MFA Risk Assessors.\n\nAuth0 users can now enable Adaptive MFA Risk Assessors to assess and monitor risk signals for the login transactions without forcing an adaptive MFA flow. Though Adaptive MFA Risk Assessment is required for enabling the Adaptive MFA policy, it can also be used to implement custom MFA policies using Rules without Adaptive MFA in the flow.\n\nYou can enable it in the [Auth0 Dashboard](https://manage.auth0.com/#/security/mfa).\n\nYou can learn more in our [public docs](https://auth0.com/docs/mfa/enable-mfa)."
    },
    {
      "id": "3vj2v0nwvuzybqyHWgePz7",
      "date": "2021-07-05",
      "displayDate": "July 5, 2021",
      "version": null,
      "type": "updated",
      "title": "New Universal Login Accessibility Improvements",
      "description": "As part of our continuing work to improve compliance of the New Universal Login flow with accessibility standards, we have made a few improvements in the UI.\n\n### Error Messages\nError messages were not properly communicated to assistive technology users, resulting in users being unable to identify them. To address this issue, we have enhanced our forms to link the error messages with the field that has the error:\n\nIn the previous version, we displayed all errors in the form together, below the fields. In order to connect each message to a specific field, we are linking the label to the affected field and updating the visual style:\n![signup](https://cdn.auth0.com/blog/dashboard-notifications/eye.png)\n\n ### Focus Improvements\nThe focus indicators for Links were also difficult to detect. We updated the style to make it more visible:\n![focus](https://cdn.auth0.com/blog/dashboard-notifications/focus.png)\n\nAdditionally, it was not possible to set the focus on the ‘Show Password' icon by using the keyboard. We have changed that functionality and it is now possible, with an updated focus style:\n![eye](https://cdn.auth0.com/blog/dashboard-notifications/eye.png)\n\n### Link Styles\nSince everyone does not have the same abilities to distinguish between colors, color should not be used as the sole visual means of conveying information. In order to make links more accessible, we have increased the font weight in addition to changing the link text color:\n![links](https://cdn.auth0.com/blog/dashboard-notifications/links.png)\n"
    },
    {
      "id": "12zfx82rLjIpo64mfoguu6",
      "date": "2021-06-24",
      "displayDate": "June 24, 2021",
      "version": null,
      "type": "updated",
      "title": "Tenant members with Viewer-Config role can see Organizations in the Dashboard",
      "description": "The Viewer - Config role has now read acccess to the Organizations list, overview and enabled connections in the Dashboard.\n\nRead more about Dashboard roles in our [docs](https://auth0.com/docs/dashboard-access/feature-access-by-role \"docs\")."
    },
    {
      "id": "1O21odHOtp8kn17Mosewdp",
      "date": "2021-06-23",
      "displayDate": "June 23, 2021",
      "version": null,
      "type": "added",
      "title": "Google reCAPTCHA Enterprise for Bot Detection now Generally Available",
      "description": "Auth0 users can now enable reCAPTCHA Enterprise to block bot and scripted attacks. This has expanded Auth0 CAPTCHA offerings to include Google’s enterprise version for reCAPTCHA which does not have a monthly limit on the number of assessments.\n\nYou can enable it in the [Auth0 Dashboard](https://manage.auth0.com/#/security/attack-protection/bot-detection)\n\nYou can learn more in our [public docs](https://auth0.com/docs/attack-protection/bot-detection)"
    },
    {
      "id": "pLK3EZETNYbZwpvMU2z1P",
      "date": "2021-06-14",
      "displayDate": "June 14, 2021",
      "version": null,
      "type": "added",
      "title": "WebAuthn for accessing the Auth0 Dashboard with MFA",
      "description": "WebAuthn with Security Keys and WebAuthn with Device Biometrics are supported as new multi-factor authentication methods to log in to our management Dashboard, in addition to the existing Guardian, OTP, and SMS factors. \n\nWebAuthn combines maximum security with a low-friction user experience. We encourage you to add another layer of protection to your account by enabling them in your [Account Settings page](https://manage.auth0.com/#/profile). \n\nYou can read more in our [public docs](https://auth0.com/docs/dashboard-access/add-change-remove-mfa)."
    },
    {
      "id": "4JFgBMu0dzYcJ94o7Zd8jM",
      "date": "2021-06-14",
      "displayDate": "June 14, 2021",
      "version": null,
      "type": "updated",
      "title": "Auth0 Deploy CLI 7.0.0 is now released",
      "description": "\nAuth0 supports continuous integration and deployment (CI/CD) of Auth0 Tenants and integration into existing CI/CD pipelines by using the auth0-deploy-cli tool, which supports the importing and exporting of Auth0 Tenant configuration data.\n\nThe [auth0-deploy-cli 7.0.0](https://github.com/auth0/auth0-deploy-cli/releases/tag/v7.0.0) update has now been released.\n\nAdded\n- MFA Support Recovery Codes\n- Support for Organizations\n- Prompt link to Auth0 Docs upon insufficient scope\n\nRemoved\n- Node.js 8 \n- Various unneeded dependencies\n\nFor migration documentation, see [https://github.com/auth0/auth0-deploy-cli/wiki/Migrating#v5-to-v7](https://github.com/auth0/auth0-deploy-cli/wiki/Migrating#v5-to-v7)\n\nFor a full list of Auth0 Management API resources now supported by the auth0-deploy-cli tool, and for links to documentation and usage examples, see the project [README.md](https://github.com/auth0/auth0-deploy-cli)."
    },
    {
      "id": "oY3TzltuHkonTVXVnqCsD",
      "date": "2021-06-07",
      "displayDate": "June 7, 2021",
      "version": null,
      "type": "updated",
      "title": "Recovery Codes can now be disabled for Multi-factor Authentication",
      "description": "To allow users continued access to their account in the event that they lose access to their primary multi-factor authentication (MFA) method, Auth0 provides a *Recovery Code* flow that is presented after the user enrolls in MFA.\n\nDepending on the application and how tech savvy end-users are, this adds significant friction. It also does not resolve the issue since most users often do not have access to those recovery codes, when they need them most.\n\nTo simplify MFA adoption for applications, Auth0 now treats Recovery Codes as any other authentication method, which can be enabled or disabled. When disabled, end users will not be asked to enroll a Recovery Code, and will not be able to authenticate with one.\n\nRecovery Codes will be enabled for existing tenants that are using MFA but will be disabled, by default, in new tenants. Tenant admins can change this option in the [Multi-factor Authentication configuration screen](https://manage.auth0.com/#/security/mfa).\n\nYou can learn more about this in [our documentation](https://auth0.com/docs/mfa/configure-recovery-codes-for-mfa)."
    },
    {
      "id": "52mmSMAvveZLeCQWEGYEnq",
      "date": "2021-06-02",
      "displayDate": "June 2, 2021",
      "version": null,
      "type": "added",
      "title": "New and refreshed Activity page in Auth0’s dashboard for First Availability in the US ",
      "description": "The Dashboard Activity page has been reimagined and now provides tenants with access to data and charts that give them a high-level understanding of their tenant data.\n\nInitially, Tenants will be able to track metrics over time such as Active Users, Sign-ups, and Retention in addition to Failed logins. Auth0 will consistently add additional functionality and features to improve the user experience.\n\nThis feature will be available to all US tenants gradually as part of a First Availability rollout. We plan on rolling the update out to the remaining regions over the coming months. Customers will receive a notification when it becomes available in their particular region.\n\nYou can learn more in our [public docs](https://auth0.com/docs/get-started/dashboard/activity).\n\n![image](https://cdn.auth0.com/blog/activity/metrics.png)"
    },
    {
      "id": "5erRPemTfs6SHFuReJgP5L",
      "date": "2021-05-28",
      "displayDate": "May 28, 2021",
      "version": null,
      "type": "updated",
      "title": "Passwordless with WebAuthn Biometrics is Generally Available",
      "description": "Auth0 now supports using WebAuthn with Device Biometrics as the first authentication factor. You can enable it from a new Authentication Profile (https://manage.auth0.com/#/authentication-profiles) page in the Auth0 dashboard.\n\nOnce enabled, users will be given the option to enroll with WebAuthn after entering their password, if they are logging in from a [WebAuthn-capable device](https://webauthn.me/browser-support). The image below shows the flow for iOS 14+:\n\n![enrollment](https://cdn.auth0.com/blog/dashboard-notifications/passwordless-webauthn-enrollment.png)\n\nThe next time they login from that device, they will be asked to use their device biometrics by default:\n\n![challenge](https://cdn.auth0.com/blog/dashboard-notifications/passwordless-webauthn-challenge.png)\n\nUsers will go through this flow each time they login for the first time in a new device. We call this feature Progressive Enrollment, and it will help many consumers and corporate employees which already possess devices with built-in biometrics for identification, to get a more convenient login experience while improving security at the same time.\n\nLearn more about how to configure it [here](https://auth0.com/docs/universal-login/configure-universal-login-with-passwordless/webauthn-device-biometrics).\n"
    },
    {
      "id": "2K6x8w9GEQC0b7WQAVdNdM",
      "date": "2021-05-27",
      "displayDate": "May 27, 2021",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Sharelock - August 2021 End of Life and shut down",
      "description": "Important Notice: although it is not a supported Auth0 product, we are publishing guidance about Sharelock End of Life as a public service announcement.\n\n[Sharelock.io](http://sharelock.io/) service is being ended and the site will be shut down August 1st, 2021. After this date Sharelock will no longer be available, and you will not be able to retrieve any shared secrets that are stored only in Sharelock.\n\n- If you are creating a new shared secret via Sharelock you should plan to move to other alternatives such as [1Password](https://1password.com) and [SendSafely](https://sendsafely.com/) immediately. Creation of Sharelock secrets will no longer be available after June 9th, 2021.\n- If you’re retrieving a secret shared with you via Sharelock, you should store this secret in another secure location so you do not lose access to it after August 1st, 2021."
    },
    {
      "id": "7h8Zqe2iWT3wq3tAHsSs16",
      "date": "2021-05-24",
      "displayDate": "May 24, 2021",
      "version": null,
      "type": "updated",
      "title": "New Brand in the Auth0 Dashboard",
      "description": "We have updated the Auth0 Dashboard experience to reflect the new [Auth0 brand](https://auth0.design/ \"Auth0 Design\").\n![New Dashboard](//images.ctfassets.net/kbkgmx9upatd/5mMaRg8mQuW3fX7lZMbQvn/aa32afb9a8a42342e858162f0aa70d57/changelog-new-dashboard-db.png)"
    },
    {
      "id": "5gIg8jrsPaznqfou0CLCkC",
      "date": "2021-05-11",
      "displayDate": "May 11, 2021",
      "version": null,
      "type": "upcoming-deprecation",
      "title": "Community Repo Deprecations - September 2021 End of Life",
      "description": "The Auth0 Community is in the process of deprecating the following Github repos:\n\n- [ember-simple-auth-auth0](https://github.com/auth0-community/ember-simple-auth-auth0)\n- [auth0-socketio-jwt](https://github.com/auth0-community/auth0-socketio-jwt)\n- [auth0-joomla](https://github.com/auth0-community/auth0-joomla)\n\nThese repositories will no longer be available on Github after the end-of-life date, __September 30, 2021__. Please make plans to find a suitable replacement or remove these libraries from any active projects before the end-of-life date. Please reply to the [Community announcement](https://community.auth0.com/t/community-repo-deprecations-september-2021-eol/60380) if you have any questions or concerns."
    },
    {
      "id": "5dZGxNOmmfSopkDyvK4crB",
      "date": "2021-05-11",
      "displayDate": "May 11, 2021",
      "version": null,
      "type": "updated",
      "title": "Assign Tenant Tags from the Manage Dashboard",
      "description": "We've added the option to assign Tenant Environment tags from the context of the Manage Dashboard. Tenant Environment tags allows your team to easily identify development, staging and production tenants.\nRead the updated documentation [here](https://auth0.com/docs/dev-lifecycle/set-up-multiple-environments \"Set Up Multiple Environments\")."
    },
    {
      "id": "5W05fVQ7pS46vgyd38KQ3b",
      "date": "2021-05-11",
      "displayDate": "May 11, 2021",
      "version": null,
      "type": "updated",
      "title": "Actions is now in General Availability",
      "description": "Actions, after a successful beta, is now in general availability (GA).  Actions includes functionality from our legacy product Rules and Hooks under a unified developer focused experience. We brought many of the developer focused features in Actions Beta forward to the GA product including:\n\n- An easy to use Flow Editor to better visualize your custom logic in our pipeline\n- Draft Mode\n- Version Control\n- Testing before deploying to prod\n- Improved secret management\n- Expanded list of supported NPM modules to over 1MM\n- Unified programming model across all triggers\n- Improved logging\n\nWe encourage you to get started with Actions today and provide feedback and questions to us through our [community channel](https://community.auth0.com/c/actions/91). We will continuously build new functionality and extending new elements of the Auth0 pipeline through Actions. We have also updated our [documentation pages](http://www.auth0.com/docs/actions/triggers) to help building and migrating to Actions easy."
    },
    {
      "id": "5lFSAdLbE1BSA2faMf72gP",
      "date": "2021-05-04",
      "displayDate": "May 4, 2021",
      "version": null,
      "type": "changed",
      "title": "Actions Programming Model Updates and More",
      "description": "### Updated Actions Programming Model\nWe’ve updated the Actions programming model with improvements including consistency between different triggers. This update affects how you write your Actions code going forward. Your existing Actions will continue to execute without any changes. New Actions you create will use the updated version of the programming model. \n\n### New Features to Actions\nWe’ve also made improvements to the public API, allowing you to better discover the data model for triggers and we have improved the logging experience for Action executions. You can reference our [documentation](http://www.auth0.com/docs/actions/triggers) for more details about the changes we’ve made, and find sample code for common use cases."
    },
    {
      "id": "BEFj0aa6aSySNoKhmAuFa",
      "date": "2021-04-21",
      "displayDate": "April 21, 2021",
      "version": null,
      "type": "updated",
      "title": "Storing Google Workspace Refresh Tokens in User Profiles",
      "description": "When you authenticate with Google Workspace, Google always returns an access_token. \n\nIf you add `access_type=offline&approval_prompt=force` to the authentication request, Auth0 forwards those parameters to Google, and Google also returns an refresh_token. \n\nWe always stored the access_token in the user’s identity, which customers could use to all Google’s APIs. However, we did not store the refresh_token. We changed the behavior and also store the refresh_token when returned by Google.\n"
    },
    {
      "id": "3ks0rPxzumRAmCfIjcFQYW",
      "date": "2021-04-13",
      "displayDate": "April 13, 2021",
      "version": null,
      "type": "added",
      "title": "Log Stream Flexibility Public Beta",
      "description": "Auth0 has released a public beta of Log Stream Flexibility Enhancements.\nThis allows both the ability to start a new log stream from a certain point in time and to filter logs based on specific log type categories.\n\nYou can enable the new feature in the [Auth0 Dashboard](https://manage.auth0.com/dashboard) and learn more in our [public docs](https://auth0.com/docs/logs/streams/event-filters)\n"
    },
    {
      "id": "4h0CGdumXDwQ554anvGFPK",
      "date": "2021-04-08",
      "displayDate": "April 8, 2021",
      "version": null,
      "type": "added",
      "title": "Additional Languages Available for New Universal Login",
      "description": "We added Thai, Turkish, Indonesian, Greek and Vietnamese language options to the New Universal Login flow.\n"
    },
    {
      "id": "5677bFxmh27MNT5cXSol2A",
      "date": "2021-04-07",
      "displayDate": "April 7, 2021",
      "version": null,
      "type": "added",
      "title": "Organizations",
      "description": "Organizations is a broad update to the Auth0 platform that improves support for Auth0 customers that build and maintain business-to-business and software-as-a-service applications. \n\n![Organizations Overview Image](//images.ctfassets.net/kbkgmx9upatd/4KUJY7hphYT0L82RJraHja/17041ad50218a941bd92c417cb559b56/asset-community-variant-2-rounded.png)\n\nAuth0 customers on our Enterprise and Startup subscription plans can now:\n\n- Represent the teams, business customers, and partners that use their applications as _organizations_ in Auth0\n- Set up branded, federated login flows for each organization\n- Manage organization members in a variety of ways, including just-in-time membership and email invitations\n- Define roles to represent what end-users can do in their applications and assign those roles to organization members, so they can have different roles in different orgs\n- Build administration capabilities into their products so that administrators in those organizations can manage their own membership and access levels\n\nTo learn more, have a look at the [announcement blog post](https://auth0.com/blog/introducing-auth0-organizations/) and [technical documentation](https://www.auth0.com/docs/organizations).\n"
    },
    {
      "id": "3FfE1blPq9tLxTYMINq2Cl",
      "date": "2021-04-01",
      "displayDate": "April 1, 2021",
      "version": null,
      "type": "added",
      "title": "Account Lockout mode for Brute-force Protection is Generally Available",
      "description": "Brute-force Protection now supports Account Lockout mode which will block an account after too many consecutive failed login attempts.  \n\nYou can enable it in the [Auth0 Dashboard](https://manage.auth0.com/dashboard)\n\nYou can learn more in our [public docs](https://auth0.com/docs/attack-protection/brute-force-protection)"
    },
    {
      "id": "oIERWkWLNUvmPpvEKVIwh",
      "date": "2021-03-31",
      "displayDate": "March 31, 2021",
      "version": null,
      "type": "added",
      "title": "WebAuthn with FIDO Device Biometrics for MFA General Availability",
      "description": "WebAuthn with Device Biometrics for Multi-factor Authentication is now generally available.\n\nThis enables users to use their WebAuthn-capable devices to complete MFA with their device's biometrics authenticators.\n\nYou can enable it in the [Auth0 Dashboard](https://manage.auth0.com/#/security/mfa)\n\nYou can learn more in our [public docs](https://auth0.com/docs/mfa/configure-webauthn-device-biometrics-for-mfa)."
    },
    {
      "id": "5PlrjKuURKUaRccsiORpNz",
      "date": "2021-03-31",
      "displayDate": "March 31, 2021",
      "version": null,
      "type": "added",
      "title": "Non-Persistent Sessions",
      "description": "Auth0 now enables you to enhance your tenant’s security to provide your users with secure access to your applications from public and shared devices.\n\nWhen configured to create non-persistent sessions, the feature automatically terminates the session cookies when the user closes the browser. The session lifetime configuration at the tenant level controls the life of the server sessions.\n\nFor more information take a look at our [public document](https://auth0.com/docs/sessions/non-persistent-sessions)\n"
    },
    {
      "id": "6RLEMLb77gHvlbEknjjbcE",
      "date": "2021-03-30",
      "displayDate": "March 30, 2021",
      "version": null,
      "type": "deprecated",
      "title": "Deprecated: Application Admin Dashboard Role",
      "description": "We've released a new user experience for managing tenant members, and a set of new [dashboard roles](https://auth0.com/docs/dashboard-access/feature-access-by-role) (available to enterprise plans) that cover a wider range of collaboration use cases.\n\nAs part of this initiative, Auth0 is removing the Application Admin dashboard role, that allowed Admins to invite collaborators to the Auth0 dashboard with access to selected applications, as well as users and connections. \n\nThe Application Admin role is no longer available for inviting new tenant members. Existing Application Admins will be able to keep their role until **September 30, 2021**. Refer to the [migration guide](https://auth0.com/docs/product-lifecycle/deprecations-and-migrations/migrate-tenant-member-roles) for more details."
    },
    {
      "id": "3rPCQithaMDPkuzKXzZGsg",
      "date": "2021-03-25",
      "displayDate": "March 25, 2021",
      "version": null,
      "type": "added",
      "title": "Always CAPTCHA option for Bot Detection now Generally Available",
      "description": "Auth0 has released Always CAPTCHA option for Bot Detection\n\nThis enables users to have more control over when CAPTCHA is presented on the login and sign-up flows. CAPTCHA can be used as an incident response method \n\nIt is also possible to enable the Bot Detection risk assessors to gather information about bot traffic without challenging users with CAPTCHA.\n\nYou can enable it in the [Auth0 Dashboard](https://manage.auth0.com/#/security/attack-protection/bot-detection)\n\nYou can learn more in our [public docs](https://auth0.com/docs/attack-protection/set-attack-protection-preferences)"
    },
    {
      "id": "3Lk1BJBpBqVC0AQvzbTKDE",
      "date": "2021-03-22",
      "displayDate": "March 22, 2021",
      "version": null,
      "type": "updated",
      "title": "Updated Management Dashboard Navigation Experience",
      "description": "Today we're releasing the new version of our Management Dashboard navigation and layout after 3 months available as an opt-in experience. This experience improves our side and top navigation and takes advantage of our customer's screen real estate by adding a flexible layout and a collapsible sidebar.  \n\nThe experience will be enabled as the default experience for all new tenants and existing tenants that didn't explicitly opted out in the past. \nTenant admins will be able to switch back to the legacy experience until May 2021 via the Feature Previews section in Tenant Settings.\n\nRead more about the changes and improvements [here](https://auth0.com/docs/get-started/dashboard/upcoming-dashboard-changes \"Upcoming Dashboard Changes\")."
    },
    {
      "id": "3rkombBZtMtikTAlxhz1of",
      "date": "2021-03-04",
      "displayDate": "March 4, 2021",
      "version": null,
      "type": "deprecated",
      "title": "Legacy TLS Deprecation in Public Cloud",
      "description": "Beginning 10 May 2021, the public cloud Auth0 network edge will no longer accept TLS 1.0 or TLS 1.1 traffic.  These legacy protocols are insecure, with well-known weaknesses and vulnerabilities within the industry.  For maximum security, all Auth0 clients must upgrade to TLS 1.2 or later. The exact details and steps required will vary, depending on your application. For further details, see [Upgrade to TLS 1.2, what action to take?](https://community.auth0.com/t/upgrade-to-tls-1-2-what-actions-to-take/56547) posted in Auth0 Community.\n"
    },
    {
      "id": "5p3tldtALhHezKhkm4SDqK",
      "date": "2021-03-03",
      "displayDate": "March 3, 2021",
      "version": null,
      "type": "added",
      "title": "Announcing updated 99.99% Availability SLA",
      "description": "We understand how critical Auth0’s services are for the success of your business. To support that and ensure end-users always have the ability to access your applications, we are excited to announce that we have updated our availability SLA to 99.99% across all Auth0 environments.\n\nThe 99.99% availability guarantee applies to all enterprise production Auth0 tenants which means you can expect no more than 4 minutes of downtime for them per month. This is a significant improvement over our previous Public Cloud availability SLA of 99.90% which allowed for nearly 44 minutes of downtime per month. More details on the updated SLA can be reviewed in Auth0’s Service Level Description published at [https://auth0.com/legal](https://auth0.com/legal).\n\nWe continue to invest in improving the resilience of its platform and the reliability of its application services. Visit [https://status.auth0.com/](https://status.auth0.com/) at any time to check the status of our platform."
    },
    {
      "id": "1Eee2MQt0uQsfKCL27aDi5",
      "date": "2021-02-25",
      "displayDate": "February 25, 2021",
      "version": null,
      "type": "changed",
      "title": "Changes to our Deploy Extensions",
      "description": "Starting this week, the following Extensions will no longer be available in the extension gallery:\n\n- Auth0 Deploy CLI Extension\n- Gitlab Deployments\n- Bitbucket Deployments\n- Github Deployments\n- Azure/Visual Studio Team Services Deployments\n\nWe are replacing our deploy extensions with improved guides for a better developer  experience. Deploy extensions were built at a time before automated code deployment services from web-based DevOps tools. With the advent of Gitlab Pipelines, Github Actions, Bitbucket Pipelines, and Azure Pipelines, the extensions we provide through the Auth0 Extensions Gallery are now obsolete in a world of automated CI/CD pipelines provided by SaaS partners.\n\nFor developers who have already installed and configured these extensions, the services and solutions provided by these extensions will continue to work. For developers looking to employ the functionality previously provided through these extensions, we have created a series of guides available in the Auth0 Marketplace that provide a more custom and improved experience than the extensions provided.\n\n[GitLab Pipelines](https://marketplace.auth0.com/integrations/gitlab-pipeline \"Auth0 Marketplace Gitlab Pipeline\")\n\n[Github Actions](https://marketplace.auth0.com/integrations/github-actions \"Auth0 Marketplace Github Actions\")\n\n[Bitbucket Pipelines](https://marketplace.auth0.com/integrations/bitbucket-pipeline \"Auth0 Marketplace Bitbucket Pipeline\")\n\n[Microsoft Azure Pipelines](https://marketplace.auth0.com/integrations/azure-pipeline \"Auth0 Marketplace Microsoft Azure Pipelines\")\n\nWith the Deploy CLI Extension, we received feedback from many customers that as our product evolved, the extension provided unnecessary additional friction to use the Deploy CLI. The Deploy Extension was intended to be a quick solution to creating an application in your dashboard to quickly connect your external Deploy CLI with your Auth0 instance, however, as the Deploy CLI evolved, so did the need for more customization in how the service connected. The functionality formerly found through the extension will now be served through the [Deploy CLI installation guide](https://auth0.com/docs/extensions/deploy-cli-tool/create-and-configure-the-deploy-cli-application-manually \"Auth0 Deploy CLI Guide\"). As always, be sure to regularly check the Auth0 Marketplace for all the ways you can use integrations to improve your Auth0 experience."
    },
    {
      "id": "1sDyHsVk1cxQb3fYXPoXte",
      "date": "2021-02-10",
      "displayDate": "February 10, 2021",
      "version": null,
      "type": "added",
      "title": "WebAuthn with FIDO Security Keys is Generally Available",
      "description": "Auth0 has released WebAuthn with Security Keys for Multi-factor Authentication.\n\nThis enables users to use with FIDO Security Keys to increase the security of their accounts. \n\nIt is available for customers that have the Enterprise MFA add-on enabled.\n\nYou can learn more in our [public docs](https://auth0.com/docs/mfa/configure-webauthn-with-security-keys-for-mfa)."
    },
    {
      "id": "2OU3ML07gY9r4GeTVa9gn4",
      "date": "2021-02-09",
      "displayDate": "February 9, 2021",
      "version": null,
      "type": "updated",
      "title": "New Branding on Auth0’s Login Page",
      "description": "We have updated our login page to use the New Universal Login experience and to reflect the new [Auth0 Brand](https://auth0.design/).\n"
    },
    {
      "id": "5KBVZGSsk6zZB39kNXXZOe",
      "date": "2021-02-08",
      "displayDate": "February 8, 2021",
      "version": null,
      "type": "added",
      "title": "Brute-force Protection IP AllowList - General Availability",
      "description": "Brute-force Protection now supports an AllowList to permit IP addressed of both v4 and v6 to bypass Brute-force blocking behavior. \n\nYou can learn more in our [public docs](https://auth0.com/docs/attack-protection/brute-force-protection)."
    },
    {
      "id": "7ouzdL7Xno6rW0Ych0Zir0",
      "date": "2021-02-05",
      "displayDate": "February 5, 2021",
      "version": null,
      "type": "added",
      "title": "Decouple Grant Revocation from Refresh Token Revocation",
      "description": "A grant provides an application access to a resource on another entity without exposing user credentials. Tokens are issued in the context of a grant, and when a grant is revoked, so do all tokens issued in the context of that grant. When, on the other hand, a token is revoked, this does not necessarily mean that the grant is revoked.\n\nThis feature allows the customer to decouple the revocation of refresh token from the revocation of the grant. When this feature is turned on, a refresh token revocation will result in the revocation of the grant that the token is associated with. If, on the other hand, the feature is turned off, then a refresh token revocation will keep the grant intact. \n\nFor existing tenants, this feature is turned on by default to preserve the existing behavior. For new tenants, this feature is turned off by default to make sure that a revocation of a refresh token will not revoke the grant. If a grant revocation is needed, a separate request must be sent using an existing grant revocation endpoint.\n\nFor more information, refer to the following documentation: [Refresh token and grants](https://auth0.com/docs/tokens/refresh-tokens/revoke-refresh-tokens#refresh-tokens-and-grants)\n"
    },
    {
      "id": "6wJMBOrmzwk180ybvipCs1",
      "date": "2021-02-05",
      "displayDate": "February 5, 2021",
      "version": null,
      "type": "fixed",
      "title": "Improvements on the user.multifactor property behavior",
      "description": "Auth0's user profile has a property called `user.multifactor`, which was supposed to let you know if the user was enrolled in MFA or not.\n\nIn the past, we only set the property the first time the user completed the MFA challenge, but not when the user enrolled or when MFA was reset.\n\nThis behavior was fixed, and now the property is always up to date. You can reliably use it to know of the user is enrolled in MFA."
    },
    {
      "id": "6fyzyMcU9pWYpgSsKDpdP0",
      "date": "2021-02-03",
      "displayDate": "February 3, 2021",
      "version": null,
      "type": "added",
      "title": "Improved Dashboard's Role Based Access Control",
      "description": "New built-in roles for dashboard members with limited privileges are generally available under enterprise plans, for improved access control. \n\nThe new roles include:\n\n- __Admin__: Read and write access to all resources in the dashboard.\n- __Editor - Specific Apps__: Read and write access to specific applications only.\n- __Editor - Connections__: Read, write, and create access to all types of connections.\n- __Editor - Users__: User Management operations (create, delete, block, unblock, reset MFA, reset password, update metadata, assign roles, etc.) and access to logs.\n- __Viewer - Users__: Read-only access to users and logs\n- __Viewer - Config__: Read-only access to all configuration settings (applications, APIs, rules, security settings, etc.), except for sensitive information such as secrets, billings, users, and logs.\n\nTenant members with limited privileges will see only the dashboard’s sections and actions that their respective roles support. They won't be able to see the tenant members section nor invite other members. \n\nYou can read more about the specific permissions for each role in the [Auth0 documentation](https://auth0.com/docs/dashboard-access/dashboard-roles/feature-access-by-role)."
    },
    {
      "id": "36DBSU1FawvAXs9PWiENJ1",
      "date": "2021-01-26",
      "displayDate": "January 26, 2021",
      "version": null,
      "type": "updated",
      "title": "Enhanced Protection for Connections and MFA Secrets",
      "description": "In order to improve security and prevent leaks, we have stopped displaying connections and MFA secrets in the Auth0 Dashboard after the configuration is saved. \n\nThis change includes secrets from:\n\n- Enterprise connections\n- Social connections\n- Passwordless connections \n- Multi-factor authentication providers"
    },
    {
      "id": "7nHuUO9bBkMFoDL0kYYjzR",
      "date": "2021-01-14",
      "displayDate": "January 14, 2021",
      "version": null,
      "type": "added",
      "title": "Home Realm Discovery with Identifier First for the New Universal Login Experience",
      "description": "You can now configure the New Universal Login Experience to use an identifier-first flow, which supports Home Realm Discovery for enterprise connections. \n\nYou can enable the new behavior in the [Universal Login section](https://manage.auth0.com/#/login_settings) of the Auth0 Dashboard.\n\nYou can learn more in our [public documentation](https://auth0.com/docs/universal-login/identifier-first)."
    },
    {
      "id": "2CVjMxa2SLFfbRMdCuj9Ke",
      "date": "2021-01-14",
      "displayDate": "January 14, 2021",
      "version": null,
      "type": "added",
      "title": "Application Redirect in Password Change Tickets for New Universal Login",
      "description": "# Update to POST/api/v2/tickets/password-change \nWith a optional `client_id` parameter, you can now generate password reset tickets to enable a \"Back to <app name>\" button with application specific redirect behaviors using New Universal Login.\n\n  ![Client ID in password reset tickets for new universal login](//images.ctfassets.net/kbkgmx9upatd/4zh7kjbJvr6cj1XSQIJ6LZ/405fad4eabf2cf4ccaecf464b1831656/Client_id_redirect_for_password_change_tickets.png)\n\n[POST/api/v2/tickets/password-change](https://auth0.com/docs/api/management/v2/#!/Tickets/post_password_change)\n\n`client_id` is an optional parameter that is the ID of the application. If provided for tenants using New Universal Login experience, the user will be prompted to redirect to the default login route of the corresponding application once the ticket is used. See [Configuring Default Login Routes for more details](https://auth0.com/docs/universal-login/configure-default-login-routes#completing-the-password-reset-flow).\n"
    },
    {
      "id": "hDbp73otKHcHlLU6LNyic",
      "date": "2020-12-18",
      "displayDate": "December 18, 2020",
      "version": null,
      "type": "updated",
      "title": "Changes in the Signup link position in New Universal Login",
      "description": "We changed the layout of the Login page for the New Universal Login Experience. \n\nThe Sign Up link is now rendered below the Continue button, instead of at the bottom of the page. The image below shows the previous an the current default login page:\n\n![Footer Changes](//images.ctfassets.net/kbkgmx9upatd/7kWHV3nEkwrOKHgXraLhNa/a14d412691b389d8c7cd048bf2dfdb46/footers-changes-v2.png)\n\nTo keep the rest of the pages consistent, we removed the footer section in all of them, and the links that were displayed in that section are now below the rest of the content.\n"
    },
    {
      "id": "3CvlbwuCnBSRVuN2GPbmxS",
      "date": "2020-12-18",
      "displayDate": "December 18, 2020",
      "version": null,
      "type": "updated",
      "title": "Hiding or changing the Logo in the New Universal Login page",
      "description": "You can now use CSS to hide or change the New Universal Login page logo from Page Templates.\n\nThis enables scenarios like changing the logo depending on the application.\n\nYou can learn more in [our docs](https://auth0.com/docs/auth0-email-services/manage-email-flow#css-customization)."
    },
    {
      "id": "2kjYN1ei9IcKiJ4pqpWU9a",
      "date": "2020-12-16",
      "displayDate": "December 16, 2020",
      "version": null,
      "type": "added",
      "title": "Public Cloud Environment in Japan",
      "description": "Auth0 is excited to announce general availability of a new public cloud environment in Japan. The Auth0 Japan environment joins the US, EU and Australia environments previously available, enabling our customers to offer lower login latencies to their users within Japan and in neighboring countries. \n\nAuth0 customers can specify their preferred location by simply choosing the Japan region during the tenant creation process. The new Auth0 tenant created will have the `<tenant>.jp.auth0.com` domain name, and will enable customers to comply with legislation governing data regulation, privacy and consumer law.\n![Japan tenant creation](//images.ctfassets.net/kbkgmx9upatd/4gpH1oKzsnWBtca9pmSaTD/e9c135bbec4571cbfb1adebea2c0ede7/jpn.png)"
    },
    {
      "id": "MpHHZKh4BIbMsnWT8lf5S",
      "date": "2020-12-15",
      "displayDate": "December 15, 2020",
      "version": null,
      "type": "added",
      "title": "Refresh Token Expiration",
      "description": "Auth0 is proud to introduce Refresh Token Expiration, which includes two methods of expiring Refresh Tokens to balance security with usability: Absolute Expiration, and Inactivity Expiration. \n\nAbsolute Expiration: When enabled, you can configure the absolute lifetime for refresh tokens, after which, the end-user must re-authenticate before being issued a new refresh token. When disabled, the absolute lifetime will be indefinite.\n\nInactivity Expiration: When enabled, you can configure the inactivity lifetime for refresh tokens, which expires the refresh token if the user is not active in the application during the inactivity lifetime period.\n\nUsing a combination of Inactivity Expiration with Absolute Expiration, you can easily configure shorter lifetimes for more secure applications, or create an experience for end-users whereby they have seemingly indefinite sessions as long as they are active regularly in your application.\n\nIn addition, updated default settings for Refresh Tokens are applied to all new applications. To learn more about this capability, see our product documentation: https://auth0.com/docs/tokens/refresh-tokens/configure-refresh-token-expiration."
    },
    {
      "id": "1dzOI95EyKJkn1dILMdKUz",
      "date": "2020-12-14",
      "displayDate": "December 14, 2020",
      "version": null,
      "type": "added",
      "title": "Multi-factor Authentication now supports Adaptive MFA ",
      "description": "Auth0 has released [Adaptive MFA](https://auth0.com/docs/mfa/adaptive-mfa \"Adaptive MFA Documentation\"), a new feature within the Multi-factor Authentication offering.   Adaptive MFA allows customers to trigger Multi-factor Authentication based on a series of contextual risk scores, such as whether the user is signing in from an unknown device, or whether the user login is evidencing an impossible travel situation, or whether the user login happens from a risky IP.   The feature also allows customers to access risk assessments in rules, which can be used to write custom business logic to trigger MFA."
    },
    {
      "id": "4n4xnXvj7moD2YiNZP8164",
      "date": "2020-12-09",
      "displayDate": "December 9, 2020",
      "version": null,
      "type": "updated",
      "title": "Improved experience for configuring Security settings in our Dashboard",
      "description": "We’re introducing improvements to the user experience of configuring Security related features in our Management Dashboard. Read more [here](https://auth0.com/blog/improving-the-way-you-configure-security-settings-in-the-dashboard/)\n\n__What changed?__\n\n- Anomaly Detection section has been renamed to Attack Protection\n\n- Multi-factor Authentication and Attack Protection (Previously Anomaly Detection) have been moved under the new Security section\n\n- Attack Protection (Previously Anomaly Detection) and Multi-Factor Authentication features now present a refreshed and simpler configuration experience\n\n- Guides for crafting Security dashboards using our Log Streaming functionality are available under the Monitoring section\n"
    },
    {
      "id": "6Po2xQtd26bP7heOhiE3Mp",
      "date": "2020-12-03",
      "displayDate": "December 3, 2020",
      "version": null,
      "type": "added",
      "title": "Correlation-ID support for Management API",
      "description": "Correlation-ID support for Management API is now Generally Available. This feature allows for adding a unique identifier in management API calls related to changes to the Auth0 account. The same identifier is then available in event logs, allowing for an audit trail for such changes.\n\nYou can see an example of how to use this feature in our [Management API docs](https://auth0.com/docs/api/management/v2)."
    },
    {
      "id": "9bD90svQix7ZRFXY6nccg",
      "date": "2020-11-19",
      "displayDate": "November 19, 2020",
      "version": null,
      "type": "updated",
      "title": "We now expose IPv6 in our public endpoints",
      "description": "Starting November 19th, 2020 we now expose IPv6 addresses in our public endpoints e.g. acme.us.auth0.com. If a client request arrives at this endpoint from a machine which supports IPv6, then context.request.ip will show an IPv6 address. If you're currently perdforming ip address manipulation or checking manually, we encourage you to use [`ipaddr.js@1.9.0`](https://www.npmjs.com/package/ipaddr.js/v/1.1.0) which is already available by default in Rules, Hooks, and the Actions Beta."
    },
    {
      "id": "1dwdgvf6ItYZAo5wBs71lm",
      "date": "2020-11-17",
      "displayDate": "November 17, 2020",
      "version": null,
      "type": "added",
      "title": "Added: Sumo Logic support for Log Streaming",
      "description": "Auth0 has released a native integration for [streaming event to Sumo Logic](https://auth0.com/docs/logs/streams/stream-logs-to-sumo-logic) via our Log Streaming feature.\n\nYou can also use our [Sumo Logic App](https://auth0.com/docs/logs/streams/sumo-logic-dashboard) to get started with visualizing Auth0 event logs without any development effort."
    },
    {
      "id": "4ta957VymfD7OFE8YS1qP5",
      "date": "2020-11-09",
      "displayDate": "November 9, 2020",
      "version": null,
      "type": "added",
      "title": "WebAuthn with FIDO Security Keys for MFA Public Beta",
      "description": "Auth0 has released public beta of WebAuthn with Security Keys for Multi-factor Authentication.\n\nThis enables users to use with FIDO Security Keys to increase the security of their accounts.\n\nYou can learn more in our [public docs](https://auth0.com/docs/mfa/configure-webauthn-with-security-keys-for-mfa)."
    },
    {
      "id": "4jN5PNx7R0hVDS0H4C2wd",
      "date": "2020-11-09",
      "displayDate": "November 9, 2020",
      "version": null,
      "type": "added",
      "title": "WebAuthn with FIDO Device Biometrics for MFA Public Beta",
      "description": "Auth0 has released public beta of WebAuthn with Device Biometrics for Multi-factor Authentication.\n\nThis enables users to use their WebAuthn-capable devices to complete MFA by using their device's biometrics authenticators.\n\nYou can enable it in the [Auth0 Dashboard](https://manage.auth0.com/#/mfa)\n\nYou can learn more in our [public docs](https://auth0.com/docs/mfa/configure-webauthn-device-biometrics-for-mfa)."
    },
    {
      "id": "3DS4qkgx1j6PZ8MuOXMOLn",
      "date": "2020-10-28",
      "displayDate": "October 28, 2020",
      "version": null,
      "type": "updated",
      "title": "MFA Enrollment Tickets for New Universal Login",
      "description": "Auth0 provides an API to [generate MFA Enrollment Tickets](https://auth0.com/docs/mfa/auth0-guardian/create-custom-enrollment-tickets). The API generates a URL, which can be sent to end-users by email. Once users navigate to the URL, they are asked to enroll to MFA.\n\nIn the past, the MFA enrollment page was rendered using the [Classic Universal Login Experience](https://auth0.com/docs/universal-login/classic-experience) even if [New Universal Login Experience](https://auth0.com/docs/universal-login/new-experience) was enabled. The behavior was changed, and the enrollment page will be displayed with the selected login experience. \n"
    },
    {
      "id": "1YYV67SdttjtG2k2Xm5uOb",
      "date": "2020-09-21",
      "displayDate": "September 21, 2020",
      "version": null,
      "type": "added",
      "title": "Announcing the Auth0 Marketplace",
      "description": "On September 21st, 2020 we launched the [Auth0 Marketplace](https://marketplace.auth0.com/), a new way to discover our growing catalog of solutions and integrations.\n\nAuth0 Marketplace makes it easier and faster to extend and customize your Auth0 solution.\n\n🤞 Trusted — All of the integrations you find in the Marketplace are pre-validated by Auth0, so you know you can trust them.\n\n🔎 Searchable — Not only can you easily search for an integration you want, but the Marketplace also makes it easy to browse for integrations that you may not even know you need! Browse through our trusted catalog of partner and third-party integrations to see how you can take your Auth0 solution to the next level with just a couple clicks.\n\n👥 Open — We want the Marketplace to work for you. Do you have an integration in mind that's missing from the Marketplace? We'd love to hear from you! You can request an integration in our Community forum, or even submit your own! All submissions will be tested and vetted by Auth0 so that you can feel safe using the Marketplace.\n\nKeep following as we are adding new integrations to the Marketplace regularly.\n\nYou can find the Marketplace at [https://marketplace.auth0.com/](https://marketplace.auth0.com/)\n\nFor more information about the launch, check out our blog post: [Introducing the Auth0 Marketplace](https://auth0.com/blog/introducing-auth0-marketplace/)."
    },
    {
      "id": "naWypVemCUWr6OEvFAADq",
      "date": "2020-09-15",
      "displayDate": "September 15, 2020",
      "version": null,
      "type": "updated",
      "title": "Logs",
      "description": "Auth0 has released a native integration for [streaming tenant event logs to Splunk](https://auth0.com/docs/logs/export-log-events-with-log-streaming/stream-logs-to-splunk) via our Log Streaming feature. \n\nYou can also use our [Splunkbase App](https://splunkbase.splunk.com/app/5193/) to [get started](https://auth0.com/docs/logs/export-log-events-with-log-streaming/splunk-dashboard) with visualizing Auth0 event logs without any development effort.\n"
    },
    {
      "id": "5MZjPso6rrnKncEVcjMBV7",
      "date": "2020-09-14",
      "displayDate": "September 14, 2020",
      "version": null,
      "type": "updated",
      "title": "Dashboard",
      "description": "Dashboard Admins that opt-in to enable MFA for accessing the Auth0 Dashboard with an extra layer of security can now enroll additional factors as well as regenerate recovery codes to prevent being locked out of their account in case they lose their primary device.\n\nThe MFA settins for Dashboard users can be configured in the [Profile Page](https://manage.auth0.com/#/profile). Learn more by reading our [docs](https://auth0.com/docs/get-started/dashboard/manage-dashboard-users#add-change-or-remove-mfa).\n\nAdding one or two phone numbers for SMS in addition to Push or OTP factors, as well as storing the backup code, is strongly recommended to prevent losing access to your account.\n"
    },
    {
      "id": "3aofaHb6jzjbcKKFZ3IyEK",
      "date": "2020-09-10",
      "displayDate": "September 10, 2020",
      "version": null,
      "type": "updated",
      "title": "Management APIv2 now supports email verification on all connection types",
      "description": "Auth0’s Management APIv2 now provides a means to validate emails from users logging in _using any connection_.\n\n**What changed?**\n\nWe added the option to specify a user identity when calling the following endpoints:\n\n**POST /api/v2/jobs/verification-email**\n\n[https://auth0.com/docs/api/management/v2#!/Jobs/post_verification_email](https://auth0.com/docs/api/management/v2#!/Jobs/post_verification_email)\n\nThis jobs endpoint can be used when you want to leverage Auth0’s email templates to initiate an email verification flow. A new (optional) **identity** field can be specified in the payload. When specified, this will allow an email job to be created for a specific user identity within a user. The **identity** must include a **provider** and **user_id**.\n\n**POST /api/v2/tickets/email-verification**\n\n[https://auth0.com/docs/api/management/v2#!/Tickets/post_email_verification](https://auth0.com/docs/api/management/v2#!/Tickets/post_email_verification)\n\nIf you prefer to leverage your own email capabilities, you can use this tickets endpoint to generate an email verification link to use in your custom flows. A new (optional) **identity** object field can be added to the payload. When specified, this will allow a ticket to be created for a specific user identity within a user. The **identity** must include a provider and **user_id**.\n\nBy doing this, you can select a secondary, federated, or passwordless-email identity to be verified. Once the user verifies their email using Auth0, the `email_verified` flag associated with the provided identity will be set to `true`. Subsequent logins using a federated identity will not overwrite this value. If the identity being verified happens to be the primary identity of the user, the `email_verified` at the root of the user profile will also be set to true.\n\n**How does this affect me?**\n\nYou can take advantage of this capability right away. If you choose not to specify an identity when initiating an email verification flow, no behavior will change. We will continue to only allow for verification of the primary identity of users belonging to the Auth0 IDP. \n\n**To explore these new capabilities, get started at: [Email Verified Usage](https://auth0.com/docs/users/guides/email-verified) or explore the [APIs ](https://auth0.com/docs/api/management/v2)**"
    },
    {
      "id": "1dYhS9Sb8yYgbfZ4tlbldl",
      "date": "2020-09-05",
      "displayDate": "September 5, 2020",
      "version": null,
      "type": "added",
      "title": "Page Templates for New Universal Login",
      "description": "You can now use a [Liquid Templates](https://shopify.github.io/liquid/) to customize the HTML content for the New Universal Login pages. \n\nThis will allow you to:\n\n- Customize the background with gradients or background images\n- Change the page layout\n- Add a header or footer \n- Provide different content depending on the application or the universal login page\n\nLearn more in our [documentation](https://auth0.com/docs/universal-login/new-experience/universal-login-page-templates).\n"
    },
    {
      "id": "3FxiiWLhaFtjBEgUWDpiRe",
      "date": "2020-08-25",
      "displayDate": "August 25, 2020",
      "version": null,
      "type": "updated",
      "title": "Wildcard Support in Allowed Web Origins",
      "description": "Auth0 added limited support for wildcard use in Allowed Web Origins application URLs to make it easier for subscribers to test applications in CI/CD scenarios. Auth0 does not recommend using wildcards in application URLs for production applications; the [OAuth BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-14#page-11)  states that exact URL matching is the safest approach. Read more in [Auth0 Support Center](https://support.auth0.com/notifications/5f456b8f619a29000ae23f25)."
    },
    {
      "id": "5dbOPV9MWZWRkUrvB47Wwk",
      "date": "2020-07-30",
      "displayDate": "July 30, 2020",
      "version": null,
      "type": "added",
      "title": "Use Voice Messages for Multi-factor Authentication",
      "description": "You can now provide end-users the option to get multi-factor authentication one-time codes using SMS or Voice calls.\n\nYou can read more in our public [docs](https://auth0.com/docs/mfa/guides/configure-phone)."
    },
    {
      "id": "4OcuGQYJi9SCsdUkZxTuvq",
      "date": "2020-07-30",
      "displayDate": "July 30, 2020",
      "version": null,
      "type": "added",
      "title": "Additional Languages Available for New Universal Login",
      "description": "We added Czech, French (Canada), Hungarian, Polish, Romanian, and Slovak language options to the New Universal Login flow."
    },
    {
      "id": "5EKgGx9kzwBcmHjDXxfJzq",
      "date": "2020-05-28",
      "displayDate": "May 28, 2020",
      "version": null,
      "type": "added",
      "title": "Native Facebook Login",
      "description": "You can now add support for authenticating users with Facebook using the [Facebook SDK](https://developers.facebook.com/docs/apis-and-sdks/) in native applications.\n\nThis improves the user experience, and allows your applications to comply with [Facebook's Platform Policies](https://developers.facebook.com/policy/).\n\nYou can learn more in our [docs](https://auth0.com/docs/connections/nativesocial/facebook), the [iOS Quickstart](https://auth0.com/docs/quickstart/native/ios-swift-facebook-login) and the [Android Quickstart](https://auth0.com/docs/quickstart/native/android-facebook-login).\n"
    },
    {
      "id": "kmI6Hj7XhoYfS3gZXUVTY",
      "date": "2020-05-19",
      "displayDate": "May 19, 2020",
      "version": null,
      "type": "added",
      "title": "Import MFA enrollments with automatic and bulk user imports",
      "description": "User MFA enrollments can be imported using either the [automatic migration](https://auth0.com/docs/users/guides/configure-automatic-migration) or the [bulk user imports](https://auth0.com/docs/users/guides/bulk-user-imports) method, allowing flexibility and control over the import process.\n\nThe supported enrollment types are:\n\n\n- __Email:__ for [email](https://auth0.com/docs/mfa/concepts/mfa-factors#email-notifications) verification\n- __ Phone:__ for [SMS](https://auth0.com/docs/mfa/concepts/mfa-factors#sms-notifications) verification\n- __TOTP:__ for [One-Time Passwords (OTP)](https://auth0.com/docs/mfa/concepts/mfa-factors#one-time-passwords) used with authenticator applications, such as Google Authenticator, Microsoft Authenticator, Authy, Duo, etc.\n\nGet started by reading  [Import Multi-Factor Authenticators](https://auth0.com/docs/mfa/guides/import-user-mfa)\n"
    },
    {
      "id": "b3GHxvKx4x5WweaDYMPtt",
      "date": "2020-05-11",
      "displayDate": "May 11, 2020",
      "version": null,
      "type": "added",
      "title": "Logs",
      "description": "Auth0 now supports integrating Log Streams with Datadog, and can stream your tenant's log events directly to your Datadog account in near real-time.\n\n"
    },
    {
      "id": "6QUVSMNnQdUv1gNhdVL0zH",
      "date": "2020-05-11",
      "displayDate": "May 11, 2020",
      "version": null,
      "type": "updated",
      "title": "Logs",
      "description": "Log streaming is now GA. You can now stream events to AWS Eventbridge, Datadog, and other targets using the Webhook.  \nAdditionally, we provide more visibility into stream health to help debug potential issues during stream setup."
    },
    {
      "id": "5N261JdhKfd0nadgoohDv2",
      "date": "2020-04-23",
      "displayDate": "April 23, 2020",
      "version": null,
      "type": "added",
      "title": "Signing Key Rotation",
      "description": "Auth0 subscribers can now rotate and revoke the Signing Keys that are used to sign assertions sent to their clients, via the Manage Dashboard or API.\n\nRead more in our [docs](https://auth0.com/docs/tokens/guides/manage-signing-keys)."
    },
    {
      "id": "1y97YcPS5OScQScEvISnsx",
      "date": "2020-04-23",
      "displayDate": "April 23, 2020",
      "version": null,
      "type": "added",
      "title": "Custom SMS Provider for Multi-factor Authentication",
      "description": "Auth0 now offers a way use any SMS Provider to deliver SMSs with a new extensibility Hook.\n\nRead more in our [docs](https://auth0.com/docs/hooks/extensibility-points/send-phone-message)."
    },
    {
      "id": "7D76SCkOsvaTIYTFI28sV4",
      "date": "2020-04-15",
      "displayDate": "April 15, 2020",
      "version": null,
      "type": "added",
      "title": "Announcing Refresh Token Rotation with Reuse Detection",
      "description": "Auth0 now offers Refresh Token Rotation (RTR) with Reuse Detection, which provides a secure method for using refresh tokens in SPAs while providing end-users with seamless access to resources without the disruption in UX caused by browser privacy technology like ITP. RTR is available to all customers in public cloud as of April 15, 2020, and is scheduled to be available in Private Cloud in May. Read more about this on [our blog](https://auth0.com/blog/securing-single-page-applications-with-refresh-token-rotation/)."
    },
    {
      "id": "2aRGMm0GTgAatY8SLgm1Rd",
      "date": "2020-02-27",
      "displayDate": "February 27, 2020",
      "version": null,
      "type": "added",
      "title": "Expanded Support for Importing Password Hashes",
      "description": "Accelerate user migration with an enhanced bulk user import with expanded support for common password hashes.\n\nAuth0 enhanced bulk user import with expanded support for common password hashes.  Auth0 now supports importing user passwords hashed with the following algorithms: Argon2, bcrypt (now supports custom number of salt rounds), HMAC, MD4, LDAP, MD5, PBKDF2, SHA1, SHA256, and SHA512. \n\nThis enables you to import users to Auth0 from legacy systems without requiring end-users to reset their passwords. The new custom password object supports a wide array of parameters as well as the ability to upsert (or update) for subsequent import jobs. \n\nTo get started go to [Bulk User Imports](https://auth0.com/docs/users/guides/bulk-user-imports). Want to check if we support the hashing algorithm you use? Go to [Bulk User Import Database Schema and Example](https://auth0.com/docs/users/references/bulk-import-database-schema-examples) for details on the specific hash algorithms, parameters, and encodings we support. \n\n"
    },
    {
      "id": "7nNUzLkkXqQPXNVuHCTfTA",
      "date": "2020-02-18",
      "displayDate": "February 18, 2020",
      "version": null,
      "type": "added",
      "title": "Universal Login",
      "description": "We've added support for directing users to the signup page in the New Universal Login Experience. Read [more](https://auth0.com/docs/universal-login/new#signup)."
    },
    {
      "id": "5myG4r2zCgNwA6SFR1Wo9P",
      "date": "2020-01-31",
      "displayDate": "January 31, 2020",
      "version": null,
      "type": "added",
      "title": "Logs",
      "description": "We now support Webhooks (Beta) for your log events! Auth0 can stream events to your callback URL in near real-time.\n\n"
    },
    {
      "id": "5vbuePrdACZckUgrMe8eNc",
      "date": "2020-01-30",
      "displayDate": "January 30, 2020",
      "version": null,
      "type": "added",
      "title": "Hooks",
      "description": "We've added support for creating and managing Auth0 hooks via the management API, the Node.js SDK, and the deploy-CLI tool. Read the [API Documentation](https://auth0.com/docs/api/management/v2#!/Hooks/get_hooks) and the [Deploy-CLI README](https://github.com/auth0/auth0-deploy-cli) for more details."
    },
    {
      "id": "2DfALYdboJlzUWEDXm62PF",
      "date": "2020-01-06",
      "displayDate": "January 6, 2020",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "We've added support for embedding passwordless login in Native and Regular Web Apps. Read [more](https://auth0.com/docs/connections/passwordless/guides/embedded-login).\n"
    },
    {
      "id": "7os8qbleRMt2lbFCM9aXr2",
      "date": "2019-12-17",
      "displayDate": "December 17, 2019",
      "version": null,
      "type": "added",
      "title": "Hooks",
      "description": "We’ve added a new extensibility hook: Post-Change Password Hook BETA\nCustomers using [Database Connections](https://auth0.com/docs/connections/database), can implement custom actions that execute after an end-user changes their password or after a tenant admin updates an end-user’s password. For example, you can trigger an email to confirm a password change.\n\nGet started by checking out the documentation on hooks [here](https://auth0.com/docs/hooks). Or, if you are already familiar with hooks, browse the docs and code samples for the new [post-change password hook](https://auth0.com/docs/hooks/guides/post-change-password).\n"
    },
    {
      "id": "eZplzJ9WKjYGaZMcZnz8b",
      "date": "2019-12-04",
      "displayDate": "December 4, 2019",
      "version": null,
      "type": "added",
      "title": "Universal Login",
      "description": "We've localized the New Universal Login Experience to [Hindi](https://auth0.com/docs/universal-login/i18n).\n"
    },
    {
      "id": "46nfBhzPBGirhBhWo5Pzyh",
      "date": "2019-12-04",
      "displayDate": "December 4, 2019",
      "version": null,
      "type": "added",
      "title": "Universal Login",
      "description": "We've added a [Text Customization API](https://auth0.com/docs/universal-login/text-customization) for the New Universal Login Experience.\n"
    },
    {
      "id": "2sdWh5YkVuxZCFPw3XBfO6",
      "date": "2019-12-03",
      "displayDate": "December 3, 2019",
      "version": null,
      "type": "added",
      "title": "Integration",
      "description": "Auth0 integration with [Amazon EventBridge](https://aws.amazon.com/eventbridge/) was announced, a serverless event bus. This new integration connects Auth0 event logs to a variety of AWS services in near real time, unlocking a variety of new use cases that support [event-driven](https://aws.amazon.com/event-driven-architecture/) and [microservices](https://aws.amazon.com/microservices/) application architectures. Learn more [here](https://auth0.com/docs/integrations/aws-eventbridge).\n"
    },
    {
      "id": "6nqzlU5EpBPqqWp5AfZau5",
      "date": "2019-11-05",
      "displayDate": "November 5, 2019",
      "version": null,
      "type": "added",
      "title": "Email Providers",
      "description": "We added email provider support for SparkPost EU version. This release enables tenants to use SparkPost’s email service hosted in EU region for localized data protection and transiting, and to be in full compliance with GDPR for emails. Learn more [here](https://auth0.com/docs/email/providers#configure-sparkpost).\n"
    },
    {
      "id": "7JeZWYsdWKdICFRzqe6St9",
      "date": "2019-11-04",
      "displayDate": "November 4, 2019",
      "version": null,
      "type": "added",
      "title": "Management APIv2",
      "description": "Requests to Auth0 Management API v2 using access tokens issued for a Single Page Application (SPA) now have a dedicated rate limit of 10 requests per minute per user. To learn more about access tokens for SPAs go [here](https://auth0.com/docs/api/management/v2/get-access-tokens-for-spas) and to learn more about Auth0’s rate limit policy go [here](https://auth0.com/docs/policies/rate-limits).\n"
    },
    {
      "id": "2CQE6WhHT9WYex8WTf8ifO",
      "date": "2019-10-31",
      "displayDate": "October 31, 2019",
      "version": null,
      "type": "changed",
      "title": "Dashboard",
      "description": "In order to make the Dashboard Administrators invite flow more secure and to avoid confusions, we are now enforcing that the email address of the user that logged in or signed up to accept the invite matches the email address that the invitation was sent to.\n"
    },
    {
      "id": "70wXwpjN8SBU3j2yyLpOpa",
      "date": "2019-10-30",
      "displayDate": "October 30, 2019",
      "version": null,
      "type": "added",
      "title": "Connections: Passwordless",
      "description": "Auth0 has made the following security enhancements to one-time-passcodes (OTP) for  passwordless connections:   \n\n \n -  We will only accept the most current unused one-time password (or link) issued; any previous OTPs will expire once a new OTP is issued. - Users have three attempts to input the correct one-time password; any additional attempts will require a new OTP request. - OTPs for new passwordless connections are valid (by default) for three minutes before expiration. This time can be altered in the connection settings in the [dashboard](https://manage.auth0.com/).\n  Read more about [passwordless connections](https://auth0.com/docs/connections/passwordless) or learn how to [troubleshoot passwordless connections](https://auth0.com/docs/connections/passwordless/reference/troubleshoot)."
    },
    {
      "id": "5puTw5r1vFGdWeegwiZO7",
      "date": "2019-10-15",
      "displayDate": "October 15, 2019",
      "version": null,
      "type": "added",
      "title": "Logs",
      "description": "We've added a calendar picker on the [Logs page in the dashboard](https://manage.auth0.com/#/logs)."
    },
    {
      "id": "6SaP3lnWiK0GI2y69YqFzh",
      "date": "2019-09-26",
      "displayDate": "September 26, 2019",
      "version": null,
      "type": "added",
      "title": "Connections",
      "description": "Auth0 now enables application developers to easily integrate Sign in with Apple on both Native Apps and Web applications. SIWA for native applications is a new capability that uses an entirely native flow (the user is not required to log in using a browser; the entire exchange takes place natively) that includes an updated iOS SDK for iOS13, a [new QuickStart](https://auth0.com/docs/quickstart/native/ios-swift-siwa), configuration via the Auth0 Admin, and [updated documentation](https://auth0.com/docs/connections/social/apple). With this new capability, you can offer users a consistent login experience across all your applications using SIWA as a social identity provider. Support for SIWA is available to all customers effective today. Read more [here](https://auth0.com/blog/learn-how-to-implement-sign-in-with-apple-easily/)."
    },
    {
      "id": "5jjvGOGjVJty8Hcmn9Cldm",
      "date": "2019-08-23",
      "displayDate": "August 23, 2019",
      "version": null,
      "type": "added",
      "title": "Connections",
      "description": "Our OIDC Enterprise Connection is out of beta. Please check the [documentation](https://auth0.com/docs/connections/enterprise/oidc) for more information."
    },
    {
      "id": "24ydAgLZrgTdd5OjHHAuGi",
      "date": "2019-08-23",
      "displayDate": "August 23, 2019",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "We've added a support for using DUO with Custom Domains  \n\n."
    },
    {
      "id": "RXwVeocIu1QzfyyKtAwOd",
      "date": "2019-08-22",
      "displayDate": "August 22, 2019",
      "version": null,
      "type": "added",
      "title": "Dashboard",
      "description": "Subscription plans in the [dashboard](https://manage.auth0.com) were updated with new pricing.  \n\n\nQuota reports for External Active Users were added in the [Support Center](https://support.auth0.com/reports/quota)"
    },
    {
      "id": "37QjJkhJX9S9PZY9OEU6kd",
      "date": "2019-08-14",
      "displayDate": "August 14, 2019",
      "version": null,
      "type": "added",
      "title": "Connections",
      "description": "We've added a new Social connection for LINE . Please check the [documentation](https://auth0.com/docs/connections/social/line) for more information."
    },
    {
      "id": "1CTbodQAmJiCHP2K9NonvQ",
      "date": "2019-08-14",
      "displayDate": "August 14, 2019",
      "version": null,
      "type": "added",
      "title": "Connections",
      "description": "We've improved our beta OIDC Connection, by adding support for the Authorization Code flow. Please check the [documentation](https://auth0.com/docs/connections/enterprise/oidc) for more information."
    },
    {
      "id": "3mhf3NFyE2XdnZs36AbLka",
      "date": "2019-07-30",
      "displayDate": "July 30, 2019",
      "version": null,
      "type": "added",
      "title": "User Management",
      "description": "Auth0 enhanced [Bulk User Import](https://auth0.com/docs/users/guides/bulk-user-imports) to support bulk updating [select user attributes](https://auth0.com/docs/users/references/user-profile-structure#user-profile-attributes) using the upsert parameter. The upsert parameter can be either set to “true” or “false” during bulk user import and it impacts “pre-existing” users in Auth0. When using bulk user import for the first time you would not bother with upsert since it is only meant to update existing records. However, if you want to run an import again on existing users (by appending more users or upserting fields on existing users), the upsert parameter may be useful. You can use this to do things like update name values from marital status changes or add pictures.  \n\n\nIf upsert parameter is set to `false (default value)` during a bulk user import, pre-existing users that match on email address will not be updated. When set to `true`, pre-existing users that match on email address will be updated, but only with upsertable attributes. *Note: Prior to this release, if you used the upsert parameter and did not specify values for app_metadata, user_metadata or email_verified, those attributes would be replaced with null values.* With this update, upsert will not replace those attributes will null values and you can now more efficiently implement bulk user imports for the following select attributes.  \n\n\n\n\n- app_metadata\n- email_verified\n- given_name\n- family_name\n- name\n- nickname\n- picture\n- user_metadata\n\n\nThere is no action required by you and you can start taking better advantage of the Bulk User Import capability today. To get started check out the [Bulk User Imports](https://auth0.com/docs/users/guides/bulk-user-imports)  documentation and to see a full list of attributes supported see our [User Profile Attributes](https://auth0.com/docs/users/references/user-profile-structure#user-profile-attributes).  \n\n\nAs with many other changes to our product, this improvement came from feedback from our valued community. So, if you have feedback on how we can continue to make our product better, please let us know through [this form](https://auth0.com/feedback). We're always listening and it is super easy!"
    },
    {
      "id": "1NqFITlAuUBMl9WZKE5H4b",
      "date": "2019-07-23",
      "displayDate": "July 23, 2019",
      "version": null,
      "type": "added",
      "title": "User Management",
      "description": "Prior to this release when managing users via [Database Connection](https://auth0.com/docs/connections/database), [Bulk User Import](https://auth0.com/docs/users/guides/bulk-user-imports), or [Management API v2](https://auth0.com/docs/api/management/v2) the username field was restricted to alphanumeric characters, “+”, “.”, “_” and “-”. Auth0 added support for “!”, “#”, “$”, “'”, “^”, “`”, “~”, and “@”. In addition, [Auth0 Universal Login](https://auth0.com/docs/universal-login) supports these characters upon username registration to a Database Connection.  \n\n\nThis enhancement simplifies user migration from systems like Microsoft Azure Active Directory or custom databases, where usernames often contain special characters. At Auth0 we are always looking for ways to simplify onboarding and get started faster.  \n\n\nThere are no immediate changes you need to make to your existing setup and you can start taking advantage of this right away. To learn more, please visit our [Adding Username for Database Connections](https://auth0.com/docs/connections/database/require-username) documentation.  \n\n\nThis improvement came by way of feedback from people like you. We’d love to hear from you on how we can further improve the product. It is super easy and we’re always listening. Welcome you to contribute product feedback [here](https://auth0.com/feedback)."
    },
    {
      "id": "4ijQSDfJzfVZsQkfu9f8Fz",
      "date": "2019-07-15",
      "displayDate": "July 15, 2019",
      "version": null,
      "type": "added",
      "title": "Dashboard",
      "description": "We enhanced security with a new option in [advanced tenant settings](https://manage.auth0.com/#/tenant) to prevent exposure of registered user information  \n\n Auth0 has released a security enhancement in your [advanced tenant settings](https://manage.auth0.com/#/tenant) that will help protect against exposure of registered user information. Bad actors may attempt to guess registered usernames or email addresses by reading error response codes such as `user_exists` in the public signup API.  \n ![Image](https://cdn.auth0.com/blog/generic_response_pref/Generic-response-in-public-signup-API.png)\n  \n You can set this option in your [advanced tenant settings](https://manage.auth0.com/#/tenant) in the Auth0 dashboard or via the [Management API v2](https://auth0.com/docs/api/management/v2). New tenants will have this option enabled by default. We highly recommend that you take advantage of this option to prevent exposure of personal information.  \n To learn more, please visit our [Tenant Settings in the Auth0 Dashboard documentation](https://auth0.com/docs/dashboard/dashboard-tenant-settings)."
    },
    {
      "id": "6tBLj3Q3ArcowLV9wdM8ZF",
      "date": "2019-07-09",
      "displayDate": "July 9, 2019",
      "version": null,
      "type": "added",
      "title": "Logs",
      "description": "We've added a dropdown to filter logs by type on the [Logs page in the dashboard](https://manage.auth0.com/#/logs)."
    },
    {
      "id": "1cpnNfvxn6YASiYANM4gkd",
      "date": "2019-06-24",
      "displayDate": "June 24, 2019",
      "version": null,
      "type": "added",
      "title": "Connections",
      "description": "We've shipped a beta version of an OIDC Connection, that makes it simple to federate to OIDC Identity Providers. Please see the [documentation](https://auth0.com/docs/connections/enterprise/oidc) for more information."
    },
    {
      "id": "6f5Kw6h60vLEH7KVDFmQO",
      "date": "2019-06-19",
      "displayDate": "June 19, 2019",
      "version": null,
      "type": "added",
      "title": "Universal Login",
      "description": "The new Universal Login Experience is [Generally Available](https://auth0.com/blog/introducing-the-new-auth0-universal-login-experience/). Try it now to benefit from a reimagined login flow, a with a fresh UX design and lightweight pages."
    },
    {
      "id": "2lONpDSrpmKRRgFzUDNaaC",
      "date": "2019-06-19",
      "displayDate": "June 19, 2019",
      "version": null,
      "type": "added",
      "title": "Protocols",
      "description": "We've enhanced the platform by adding support for the OAuth 2.0 Device Authorization Grant (Device Flow). Device flow enables end-users to authorize input-constrained devices with Internet connectivity (http) to access protected resources such as streaming media, online services, or account information. Examples of input constrained devices include, but are not limited to Smart TVs, Media Players (AppleTV, Roku), some consumer IoT devices, and CLI applications with no access to a browser or graphical shell. For detailed information, please see the [documentation](https://auth0.com/docs/flows/concepts/device-auth) and the [tutorial](https://auth0.com/docs/flows/guides/device-auth/call-api-device-auth). You can also have a hands-on experience using the [Device Flow Playground](https://auth0.github.io/device-flow-playground), which enables you to experience the flow using your own tenant without having to write any code."
    },
    {
      "id": "7GOZuz4WMXeM4PrUFrHsQP",
      "date": "2019-06-17",
      "displayDate": "June 17, 2019",
      "version": null,
      "type": "added",
      "title": "Social Connections: Apple",
      "description": "We've added [beta support](https://auth0.com/blog/try-sign-in-with-apple-in-your-auth0-apps-today/) for 'Sign in With Apple'."
    },
    {
      "id": "5JP8EDX3hTL4h017okwrEw",
      "date": "2019-06-12",
      "displayDate": "June 12, 2019",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "We've added support for using [Email as an MFA factor](https://auth0.com/docs/multifactor-authentication/factors/email) in the New Universal Login Experience."
    },
    {
      "id": "54ZTN6xIzZNLxWpsyqR9Vp",
      "date": "2019-06-12",
      "displayDate": "June 12, 2019",
      "version": null,
      "type": "added",
      "title": "Universal Login",
      "description": "We've [localized](https://auth0.com/docs/universal-login/i18n) the New Universal Login Experience."
    },
    {
      "id": "4KlI5qPOIcacyqbQQTTEpu",
      "date": "2019-05-23",
      "displayDate": "May 23, 2019",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "We've added a way to [enable clickjacking protection](https://auth0.com/docs/migrations/guides/clickjacking-protection) in Classic Universal Login."
    },
    {
      "id": "3vDiJUpCJ4yQeJV7jd7rof",
      "date": "2019-05-23",
      "displayDate": "May 23, 2019",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "We've added a way to [enable clickjacking protection](https://auth0.com/docs/migrations/guides/clickjacking-protection) in Classic Universal Login."
    },
    {
      "id": "5cTMFOH2aHTI7KNrrEoF2A",
      "date": "2019-05-07",
      "displayDate": "May 7, 2019",
      "version": null,
      "type": "updated",
      "title": "Management Dashboard",
      "description": "We've added support to configure the default tenant login URI and the Application Login URI in the dashboard.[Learn more](https://auth0.com/docs/universal-login/default-login-url)."
    },
    {
      "id": "3DZYVnbGnD2Kn4RsfstRfm",
      "date": "2019-05-07",
      "displayDate": "May 7, 2019",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "We've added a [new API endpoint](https://auth0.com/docs/api/management/v2#!/Users/post_invalidate_remember_browser) to let you force MFA the next time a specific user logs in."
    },
    {
      "id": "13T0Rel2rhBOSOaNbZ22YE",
      "date": "2019-05-07",
      "displayDate": "May 7, 2019",
      "version": null,
      "type": "added",
      "title": "User Management",
      "description": "Select user profile attributes may now be updated, thereby eliminating reliance on user_metadata for those fields. In addition, we've made importing users easier by allowing hashed passwords, user ID, and blocked status to be imported. For additional information, you can read more in the User Documentation for [Updatable Profile Attributes](https://auth0.com/docs/users/normalized/auth0/update-root-attributes) and [Bulk Import](https://auth0.com/docs/users/guides/bulk-user-imports)."
    },
    {
      "id": "le2UeKIG85ysUhhexnRV8",
      "date": "2019-04-23",
      "displayDate": "April 23, 2019",
      "version": null,
      "type": "updated",
      "title": "Extensions",
      "description": "We've added support for custom domain names to the Delegated Admininistration extension and the SSO Dashboard extension.  \n\nYou can take advantage of custom domain support by upgrading your extensions via the Auth0 Dashboard. For more information on how to utilize custom domain names, please see the extension documentation:  \n\n\n- [SSO Dashboard](https://auth0.com/docs/extensions/sso-dashboard#install-the-extension)- [Delegated Administration](https://auth0.com/docs/extensions/delegated-admin/v3#install-and-configure-the-extension)"
    },
    {
      "id": "lDCMsA2bY1FXSoOfNltOH",
      "date": "2019-04-23",
      "displayDate": "April 23, 2019",
      "version": null,
      "type": "updated",
      "title": "Extensions",
      "description": "We've added encrypted secrets support to the Bitbucket Deployments extension, Github Deployments Extension, the Gitlab Deployments extension, and the Visual Studio Team Services Deployments extension.  \n\nYou can take advantage of encrypted secrets support by upgrading your extensions via the Auth0 Dashboard. For more information on how to utilize encrypted secrets, please see the extension documentation:  \n\n\n- [Bitbucket Deployments Extension](https://auth0.com/docs/extensions/bitbucket-deploy#encrypt-secrets)- [Github Deployments Extension](https://auth0.com/docs/extensions/github-deploy#encrypt-secrets)- [Gitlab Deployments Extension](https://auth0.com/docs/extensions/gitlab-deploy#encrypt-secrets)- [Visual Studio Team Services Deployments Extension](https://auth0.com/docs/extensions/visual-studio-team-services-deploy#encrypt-secrets)"
    },
    {
      "id": "5VDhvslAWfpvK8593SmWRn",
      "date": "2019-04-23",
      "displayDate": "April 23, 2019",
      "version": null,
      "type": "updated",
      "title": "Rules",
      "description": "We've added ES9 linting support to the Rules editor.  \n\nThe Rules web editor now supports linting in ECMAScript 9 syntax when used with Node.js 8."
    },
    {
      "id": "7JnJ5wz2k42g9cHhxhCx4p",
      "date": "2019-04-08",
      "displayDate": "April 8, 2019",
      "version": null,
      "type": "added",
      "title": "Support Center",
      "description": "We've added more granularity to the M2M reports.  \n\nNow a daily view of calls per application, for the last 7 days in Machine to Machine quota reports is available.  \n\nThis is reflected in the Support Center's [quota](https://support.auth0.com/reports/quota) reports."
    },
    {
      "id": "1LoIe7Uy6W6QjmNXXyBOGE",
      "date": "2019-03-19",
      "displayDate": "March 19, 2019",
      "version": null,
      "type": "updated",
      "title": "Social Connections: Microsoft",
      "description": "We've added support to use Azure AD + MS Graph for Microsoft Social connections. [Learn more](https://auth0.com/docs/migrations/guides/liveid-api-deprecation)."
    },
    {
      "id": "5iYlUVVSOGcCiIsrAvW0N4",
      "date": "2019-03-18",
      "displayDate": "March 18, 2019",
      "version": null,
      "type": "added",
      "title": "Authorization",
      "description": "We've have added roles and permissions to the core capabilities of Auth0.  In authorization, a user or application is granted access to an API after the API determines the extent of the permissions that it should assign. Usually, authorization occurs after identity is successfully validated through authentication so that the API has some idea of what sort of access it should grant.  \n\nMore information is available in the updated [documentation](https://auth0.com/docs/authorization)."
    },
    {
      "id": "JcKp1uMUV3hpDWP88mHyz",
      "date": "2019-03-12",
      "displayDate": "March 12, 2019",
      "version": null,
      "type": "updated",
      "title": "Rules",
      "description": "We've enhanced Auth0 rules so that they can now leverage the MFA context stored in the user session to trigger or suppress MFA prompts in conjunction with silent authentication.  \n\nMany organizations want to use silent authentication in conjunction with MFA whereby the end-user is prompted for MFA during the initial authentication, but not prompted for MFA when renewing tokens during the session lifetime. With MFA context now available in rules, you can check to see if MFA was previously completed (and when), thereby enabling a superior and secure MFA + silent authentication experience for end-users.  \n\nMore information is available in the updated [documentation](https://auth0.com/docs/rules/references/context-object), the sample rule available in the [Auth0 dashboard](https://manage.auth0.com/#/rules/create), and in the [Auth0 Support Center](https://support.auth0.com/notifications/5c88930bb69adf000bded51c)"
    },
    {
      "id": "mdwP6lKiEUEt99vaK2Yzk",
      "date": "2019-02-27",
      "displayDate": "February 27, 2019",
      "version": null,
      "type": "updated",
      "title": "Session Limits",
      "description": "We've extended Auth0 session limits for Enterprise subscribers.  \n\nEnterprise subscribers are now able to set longer session limits with up to 100 days for Inactivity Timeout (idle_session_lifetime) and 365 days for Forced Logout (session_lifetime).  \n\nMore information is available in the updated [documentation](https://auth0.com/docs/sso/current/configure-session-lifetime-limits) and in the [Support Center](https://support.auth0.com/)</>"
    },
    {
      "id": "7HII1tcM2i8b5A6W4orv1d",
      "date": "2019-02-25",
      "displayDate": "February 25, 2019",
      "version": null,
      "type": "fixed",
      "title": "Dashboard",
      "description": "Fixed error handling in Dashboard’s Logs Search. Also fixed search hint and added link to [Query Syntax doc](https://docs.auth0.com/logs/query-syntax)."
    },
    {
      "id": "2hHMzJjVKLrW4ITTXMW8Br",
      "date": "2019-02-15",
      "displayDate": "February 15, 2019",
      "version": null,
      "type": "updated",
      "title": "Social Connections: LinkedIn",
      "description": "We've added support to use LinkedIn API v2 to authenticate. [Learn more](https://auth0.com/docs/migrations/guides/linkedin-api-deprecation)."
    },
    {
      "id": "33FfuYdPecepTeBFdxaM4q",
      "date": "2019-01-24",
      "displayDate": "January 24, 2019",
      "version": null,
      "type": "updated",
      "title": "Support Center",
      "description": "Fixed quota utilization report for Private SaaS Employees in Support Center.  \n\nPreviously employees were included on the Enterprise or Regular active users reports, with this fix the Private SaaS employees usage will be accessible on the Employees report as expected.  \n\nThis is reflected in the Support Center's [quota](https://support.auth0.com/reports/quota) reports and will provide usage for appliances that are upgraded to version 1901"
    },
    {
      "id": "7h50tfy1d017GEIXpIGdzh",
      "date": "2019-01-03",
      "displayDate": "January 3, 2019",
      "version": null,
      "type": "updated",
      "title": "Management API",
      "description": "We added a way to specify the default login URL for applications and tenants. Auth0 will use when it needs to redirect to them. More details in the [docs](https://auth0.com/docs/hosted-pages/default-login-url)."
    },
    {
      "id": "4XtTy4P6vTUL8YQODK8fUT",
      "date": "2018-12-03",
      "displayDate": "December 3, 2018",
      "version": null,
      "type": "updated",
      "title": "Dashboard",
      "description": "We've updated the Multi-factor Authentication section in the Dashboard. For more details check [our post in Auth0 Community](https://community.auth0.com/t/improvements-in-the-dashboard-mfa-section/18398), and [our public Docs](https://auth0.com/docs/multifactor-authentication)."
    },
    {
      "id": "wgb4j21tc8Kr8whnCZ6uw",
      "date": "2018-10-26",
      "displayDate": "October 26, 2018",
      "version": null,
      "type": "updated",
      "title": "Extensions",
      "description": "Version 2 of the Deploy CLI has been released! For complete details please see the [Deploy CLI README](https://github.com/auth0/auth0-deploy-cli#whats-new-in-version-2). You can upgrade to this version by installing via npm: `npm i -g auth0-deploy-cli@2`.  \n\nThe Deploy CLI tool and Deployment Extensions were updated to provided the following functionality.\n- Added YAML support- Added support for export (deprecation of separate auth0 dump tool)- Delete support - The tool will, if configured via `AUTH0_ALLOW_DELETE`, delete objects if they do not exist within the deploy configuration.- Support for additional Auth0 objects\n   - Connections including Social, Enterprise and Passwordless configurations.   - Improved support for database connections and associated configuration.   - Email Templates   - Email Provider   - Client Grants   - Rule Configs   - Better support for pages   - Tenant level settings\n- Added support to be called programmatically- Improved logging- To simplify the tool the slack hook was removed. You can invoke the tool programmatically to support calling your own hooks- Support referencing clients by their name vs client_id (automatic mapping during export/import)- Simplified to support future Auth0 object types"
    },
    {
      "id": "7ixY8bdnUPN8aeZ1vh1Nb6",
      "date": "2018-10-24",
      "displayDate": "October 24, 2018",
      "version": null,
      "type": "updated",
      "title": "Support Center",
      "description": "We’ve updated our ticketing backend system in order to provide a better support experience to our customers. Although this is an internal migration, you may notice some minor changes in [Support Center](https://support.auth0.com):\n- We've changed the numbering scheme of the support tickets and they are now 8 digits long.- We assigned new IDs to the existing tickets, which may affect any email notification related to your open tickets. You will still be able to find your existing tickets by their original ID in the Support Center's [Tickets List](https://support.auth0.com/tickets) page.- Any link to an existing ticket in Support Center will continue to work and will redirect you to the new URL.- We’ve renamed the `open` ticket status to `in progress`.- We’ve renamed the `solved` ticket status to `resolved`.- We’ve renamed the `hold` ticket status to `customer hold`.- We’ve added a new `with sustainment` status to provide visibility whenever the Auth0 Sustainment Engineering team is working on your case.- The attachments that you may add to tickets and comments will be effectively uploaded **after** you submit the ticket or comment. Any error that may occur during the upload will require you to retry the upload by submitting a new comment.- When selecting a file to upload we now validate its size is less than 15Mb, it doesn’t contain invalid characters in its name and it has at least one of the following extensions: `bmp, csv, doc, docx, gz, gif, har, jpg, jpeg, json, mp4, mov, pages, pdf, png, ppt, pptx, rar, tar, tiff, tif, txt, xls, xlsx, xml, zip, htm, html`.- We now show **Auth0 Developer Support** as signature of any comment coming from the Auth0 Support Team, instead of showing the agent's name.\n  \n\nIf you have any feedback, it will be welcomed in our [Feedback page](https://auth0.com/feedback)."
    },
    {
      "id": "2qi9OnhmxZ8iGAX3vbMmaU",
      "date": "2018-10-03",
      "displayDate": "October 3, 2018",
      "version": null,
      "type": "updated",
      "title": "Password Policy",
      "description": "We've made password policies more flexible by enabling the minimum length (number of required characters) to be set independently from other complexity options.  \n\nPassword policies can now require a greater number of characters (from 1-128) without requiring special or mixed-case characters. A common use-case is implementing pass phrases that have no special character requirements, where end-users can provide a series of words that are easy for them to remember, but difficult for hackers to guess. The National Institute of Standards and Technology (NIST) recommends that [password length is a greater indicator of over-all strength](https://auth0.com/blog/dont-pass-on-the-new-nist-password-guidelines/) than requiring numbers and special characters. Using the new minimum password length option, password policies can be configured to leverage extremely strong, high-entropy pass phrases that are easier for end-users to remember.  \n\nMore information is available in the updated [documentation](https://auth0.com/docs/connections/database/password-strength) and in the [Support Center](https://support.auth0.com/notifications/5bb51faa6d4855000abbd6ca)</>"
    },
    {
      "id": "AYZMDUG90WEKRlLDoXsyd",
      "date": "2018-09-04",
      "displayDate": "September 4, 2018",
      "version": null,
      "type": "updated",
      "title": "Rules",
      "description": "Additional connection information available in rule's context.  \n\nPreviously only connection name and strategy were available in the rule’s context object. Now it is also possible to access **connectionID**, **connectionMetadata** and two of the **connectionOptions**, **tenant_domain** and **domain_aliases**, *without* calling Management API to get the connection details. More details on the context schema can be found in the [Rules docs](https://auth0.com/docs/rules/current/context).  \n\nWe've also updated the [Check user email domain matches domains configured in connection](https://github.com/auth0/rules/blob/master/src/rules/check-domains-against-connection-aliases.js) rule template to make use of these enhancements.</>"
    },
    {
      "id": "67MtexJLgngCzy2SrIsDe4",
      "date": "2018-08-23",
      "displayDate": "August 23, 2018",
      "version": null,
      "type": "updated",
      "title": "SSO",
      "description": "Simplified SSO and provided additional configuration  \n\nAdded Seamless Single Sign-On support by eliminating the unnecessary confirmation dialog for people with an active session.  In addition, we've added control over the Inactivity timeout length and consolidated all of the SSO session controls on the advanced tenant settings page. More details in the [SSO docs](https://auth0.com/docs/sso/current)."
    },
    {
      "id": "5V2bx4WCCvVOMTucYnh1xH",
      "date": "2018-08-15",
      "displayDate": "August 15, 2018",
      "version": null,
      "type": "updated",
      "title": "Support Center",
      "description": "Changed the ticket categorization on the ticket creation form.  \n\nFor the purpose of improving the way we capture the information on the ticket we have made some changes to the ticket creation form. You can view the new changes in the [open ticket page](https://support.auth0.com/tickets/new)."
    },
    {
      "id": "UEbEbmQEYQN8AWO4ipoel",
      "date": "2018-08-13",
      "displayDate": "August 13, 2018",
      "version": null,
      "type": "updated",
      "title": "Support Center",
      "description": "Changed how we count active users.  \n\nPreviously we counted each Active User that logged into each client/application in a tenant. If your tenant had App A and App B, and one user logged into both apps, that would count as two Active Users.  \n\nMoving forward we will count per Active User within a tenant and no longer count per client/application. If your tenant has App A and App B and one user logs into both apps, they will be counted as one Active User.  \n\nThis is reflected in the Support Center's [quota](https://support.auth0.com/reports/quota) and [usage](https://support.auth0.com/reports/usage) reports, in the [Auth0 Pricing Page](https://auth0.com/pricing) and the [Management Dashboard Subscriptions Section](https://manage.auth0.com/#/tenant/billing/subscription).  \n\nMore info can be found on our [docs](https://auth0.com/docs/policies/billing)."
    },
    {
      "id": "4IGN6WFUkuvTa91k5gtoiL",
      "date": "2018-07-12",
      "displayDate": "July 12, 2018",
      "version": null,
      "type": "updated",
      "title": "Extensions",
      "description": "Version 3 of the Delegated Administration Extension was released. For complete details please see the [Delegated Admin docs](https://auth0.com/docs/extensions/delegated-admin/v3). You can upgrade to this version by visiting the Extensions section in the Manage Dashboard. No configuration changes are anticipated to be required for the upgrade."
    },
    {
      "id": "69wIkaMWvuUJZXbHJcURWK",
      "date": "2018-06-28",
      "displayDate": "June 28, 2018",
      "version": null,
      "type": "updated",
      "title": "Management Dashboard",
      "description": "Improved Dashboard UX for Machine to Machine Applications. More details in the [Machine to Machine docs](https://auth0.com/docs//applications/machine-to-machine)."
    },
    {
      "id": "1mnaZBip1Iqjmzwqet7Quf",
      "date": "2018-06-22",
      "displayDate": "June 22, 2018",
      "version": null,
      "type": "updated",
      "title": "Quickstarts",
      "description": "Improved Quickstarts Download Page."
    },
    {
      "id": "5vLweKGmLC9aKtYnsceVxm",
      "date": "2018-05-23",
      "displayDate": "May 23, 2018",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "Implemented a new MFA API. Embed Multi-Factor Authentication using push notifications, SMS, or TOTP anywhere, taking full control of the experience. More details in the blog: [https://auth0.com/blog/introducing-the-mfa-api](https://auth0.com/blog/introducing-the-mfa-api/)."
    },
    {
      "id": "5nYBZFH48s77U0ImTsn5ZH",
      "date": "2018-05-11",
      "displayDate": "May 11, 2018",
      "version": null,
      "type": "added",
      "title": "Management Dashboard",
      "description": "Implemented support for Passwordless connections, AP/LDAP connections and WS-Fed clients in Custom Domains. Here is the [list of features supported by Custom Domains>](https://auth0.com/docs/custom-domains#features-supporting-use-of-custom-domains)"
    },
    {
      "id": "t7Pmf8AfC2XNgVnjPDBVg",
      "date": "2018-05-02",
      "displayDate": "May 2, 2018",
      "version": null,
      "type": "added",
      "title": "Management Dashboard",
      "description": "Enabled self-service customers to pay for Machine to Machine applications. Previously it was a feature only available to Enterprise users. This is reflected in the [Auth0 Pricing Pages](https://auth0.com/pricing) and in the [Management Dashboard Subscriptions Sections](https://manage.auth0.com/#/tenant/billing/subscription)."
    },
    {
      "id": "6suJjfJrDuEGQ0mtdAHJsY",
      "date": "2018-04-13",
      "displayDate": "April 13, 2018",
      "version": null,
      "type": "added",
      "title": "Management Dashboard",
      "description": "Renamed the term Clients to Applications. This change is reflected throughout the Dashboard and documentation only and does not require any changes on your part."
    },
    {
      "id": "NT7GUOVDVl1lAESSsYxCy",
      "date": "2018-03-22",
      "displayDate": "March 22, 2018",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "Added the ability to define Custom Domains for your Auth0 tenant. More details in the blog [https://auth0.com/blog/introducing-custom-domains-preview-with-auth0](https://auth0.com/blog/introducing-custom-domains-preview-with-auth0)."
    },
    {
      "id": "1F2XpkdqMYnHbeMgzul3HX",
      "date": "2018-01-26",
      "displayDate": "January 26, 2018",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "A new Auth0 Spring Security API SDK is now available to help you secure your API using JSON Web Tokens. See the [changelog entry](https://github.com/auth0/auth0-spring-security-api/blob/master/CHANGELOG.md#100-2018-01-26) for more information."
    },
    {
      "id": "1Biw6FkwNRMjXaqcUAZ9Q3",
      "date": "2018-01-18",
      "displayDate": "January 18, 2018",
      "version": null,
      "type": "fixed",
      "title": "SDKs",
      "description": "wp-auth0 - Updated to support Lock 11 and RS256 JWT. See the [changelog entry](https://github.com/auth0/wp-auth0/blob/master/CHANGELOG.md#340-2018-01-08) for more information."
    },
    {
      "id": "7iyikO99Wty0VGPh7pyXbb",
      "date": "2018-01-05",
      "displayDate": "January 5, 2018",
      "version": null,
      "type": "added",
      "title": "SDKs - Auth0.swift",
      "description": "Improved Credentials Manager, deprecated touch method and replaced with bio authentication method for clarity. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#1100-2018-01-05) for more information."
    },
    {
      "id": "4mybnPqKkGlkHyXg4SuO5",
      "date": "2017-12-21",
      "displayDate": "December 21, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - Lock Web",
      "description": "Updated to use auth0.js v9.0.0 and the new API endpoints. Changed the default `scope` to be `openid profile email`. Removed `oidcConformant` flag (Lock won't use legacy endpoints anymore). `getProfile` now uses an access_token instead of an id_token. **Lock v11 is not supported in centralized login scenarios (i.e. Hosted Login Pages).** See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v1100-2017-12-21) for more information."
    },
    {
      "id": "24MQOTmA33MN69ICcfbkcE",
      "date": "2017-12-21",
      "displayDate": "December 21, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - auth0.js",
      "description": "Auth0.js v9 uses our latest embedded login API. This version removes API calls to `usernamepassword/login` and `user/ssodata` and is not supported in centralized login scenarios (i.e. Hosted Login Pages). Some methods now use a mix of Cross Origin Authentication and `WebAuth.checkSession` (with Web Origins response mode). Read more about Cross Origin Authentication and how to enable Web Origins [here](https://auth0.com/docs/cross-origin-authentication). See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v900-2017-12-21) for more information."
    },
    {
      "id": "2bizZamCMDOQyjZPxtct5t",
      "date": "2017-11-30",
      "displayDate": "November 30, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0-Java SDK adds support for the new users-by-email endpoint. It also allows to set a custom user id when creating a new user using the Management API, and includes a change in the Authentication API Sign Up methods' returned value that someone might find breaking. This change was required in order to return the just created user's information. See the [changelog entry](https://github.com/auth0/auth0-java/blob/master/CHANGELOG.md#140-2017-11-30) for more information."
    },
    {
      "id": "6TIEfQEAdOSFIW083FCZJY",
      "date": "2017-11-17",
      "displayDate": "November 17, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK adds support for TLS 1.2. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#1120-2017-11-17) for more information."
    },
    {
      "id": "21NNzGiGjMPdXHBcjkwnpg",
      "date": "2017-11-13",
      "displayDate": "November 13, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - Lock Web",
      "description": "Updated to use auth0.js v8.11. Updated to use auth0.js token validation functions. See the [changelog entry](https://github.com/auth0/lock/blob/v10/CHANGELOG.md#v10240-2017-11-08) for more information."
    },
    {
      "id": "ALKAPhR4voiCnDTdYIfsS",
      "date": "2017-11-10",
      "displayDate": "November 10, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Version 0.3.0 of jwks-rsa-java has been released, where JWKs parameters 'key_ops' and 'alg' are now parsed according to the [specification](https://tools.ietf.org/html/rfc7517)."
    },
    {
      "id": "7p1f2ZBZHQPh6o9xnlrQvI",
      "date": "2017-11-09",
      "displayDate": "November 9, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - auth0.js",
      "description": "Security Improvements: \n- Fixed an issue where state would not be automatically checked in some scenarios- Forced id_token validation for RS256-signed id_tokens- Use /userinfo to get id_token payload for HS256-signed id_tokens\n See the [changelog entry](https://github.com/auth0/auth0.js/blob/v8/CHANGELOG.md#v8110-2017-11-07) for more information."
    },
    {
      "id": "3uKX5Jvab84ogFxrmmKhPT",
      "date": "2017-11-06",
      "displayDate": "November 6, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Java-JWT SDK fixes an issue affecting the length and format of the signatures produced by the Elliptic Curve Digital Signature Algorithm. See the [changelog entry](https://github.com/auth0/java-jwt/blob/master/CHANGELOG.md#330-2017-11-06) for more information."
    },
    {
      "id": "6bdrVZzbi4CXijH341zb2F",
      "date": "2017-10-19",
      "displayDate": "October 19, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Lock for Android fixes navigation issues on non-touchscreen devices and adds support for right-to-left languages. See the [changelog entry](https://github.com/auth0/Lock.Android/blob/master/CHANGELOG.md#280-2017-10-19) for more information."
    },
    {
      "id": "4mkc6mu2MGXqfwCxaGs4uf",
      "date": "2017-10-19",
      "displayDate": "October 19, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added SFAuthenticationSession support for iOS 11. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#190-2017-10-19) for more information."
    },
    {
      "id": "79W9RYRMadDbOIH7dpO8CB",
      "date": "2017-10-18",
      "displayDate": "October 18, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK adds a new and more secure Credential Manager implementation that uses encryption, available for devices running Android Lollipop and above. This release also allows users to customize the Custom Tabs UI by changing the toolbar color and page title visibility from the WebAuthProvider builder. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/1.11.0/CHANGELOG.md#1110-2017-10-17) for more information."
    },
    {
      "id": "596Gi4SzHlUVrVsZ6NuxMv",
      "date": "2017-10-05",
      "displayDate": "October 5, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs",
      "description": "wp-auth0 - Fixed implicit mode in auto login and improved handling of auto login configuration. Added translation support for more user facing exception messages. See the [changelog entry](https://github.com/auth0/wp-auth0/blob/master/CHANGELOG.md#332-2017-10-05) for more information."
    },
    {
      "id": "57h516YpUjt0E1mW6BtN4",
      "date": "2017-10-05",
      "displayDate": "October 5, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK fixes a few bugs in the authentication flow and activity state when using Chrome Custom Tabs. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/1.11.0/CHANGELOG.md#1101-2017-10-05) for more information."
    },
    {
      "id": "2vD6qgXX5Xeo5oSzyThfzw",
      "date": "2017-09-27",
      "displayDate": "September 27, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "JWTDecode.swift - Added Xcode 9 compatibility. See the [changelog entry](https://github.com/auth0/JWTDecode.swift/blob/master/CHANGELOG.md#210-2017-09-27) for more information."
    },
    {
      "id": "5OhPzat5WTdkswpcRnZSoQ",
      "date": "2017-09-26",
      "displayDate": "September 26, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - Lock Web",
      "description": "Adding support for OIDC Conformant clients using Cross Origin Authentication. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10220-2017-09-26) for more information."
    },
    {
      "id": "J6gFiBNEvpBvqetV6aMSc",
      "date": "2017-09-21",
      "displayDate": "September 21, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Small UI fixes and improvements with the `connectionResolver` feature. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10210-2017-09-21) for more information."
    },
    {
      "id": "VKA0eerBIuqFm9hCY7Dky",
      "date": "2017-09-20",
      "displayDate": "September 20, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Lock.swift - Added Xcode 9 compatibility, various fixes to the database SignUp process. See the [changelog entry](https://github.com/auth0/Lock.swift/blob/master/CHANGELOG.md#240-2017-09-20) for more information."
    },
    {
      "id": "7xvGwtVE0jx4mRpJnmW9CP",
      "date": "2017-09-18",
      "displayDate": "September 18, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - auth0.js",
      "description": "Fixed tenant override in popup mode. Also fixed the timeout override when using the `renewAuth` method. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v8100-2017-09-18) for more information."
    },
    {
      "id": "5lEtFVeQW0nosF3VO4YvrL",
      "date": "2017-09-18",
      "displayDate": "September 18, 2017",
      "version": null,
      "type": "added",
      "title": "Management API",
      "description": "Added the ability to set the user_id during user creation using the User Management API. For more information, check [our documentation](https://auth0.com/docs/api/management/v2#!/Users/post_users)."
    },
    {
      "id": "6DcNKvTnO6JBK1dg8A499I",
      "date": "2017-09-15",
      "displayDate": "September 15, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added Xcode 9 support. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#180-2017-09-15) for more information."
    },
    {
      "id": "6HnBVu2BEK0Zmx99qGdWJL",
      "date": "2017-09-08",
      "displayDate": "September 8, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0-Java SDK adds support for the Management API Grants entity. See the [changelog entry](https://github.com/auth0/auth0-java/blob/master/CHANGELOG.md#130-2017-09-08) for more information."
    },
    {
      "id": "5S2Y9FHduTrjy9QwXrHCtc",
      "date": "2017-08-23",
      "displayDate": "August 23, 2017",
      "version": null,
      "type": "updated",
      "title": "Management Dashboard",
      "description": "New clients created in the dashboard will default to OIDC Conformant. The full list of changes this implies can be found [here](https://auth0.com/docs/api-auth/tutorials/adoption/oidc-conformant)."
    },
    {
      "id": "6RFNGVrOZQwySXGIAfPWOA",
      "date": "2017-08-11",
      "displayDate": "August 11, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Fixed allowed Regular Expression for usernames. Also fixed custom themes for custom connections along with some UI improvements. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10200-2017-08-11) for more information."
    },
    {
      "id": "3flSCjO0grdGedIeC2noJB",
      "date": "2017-08-10",
      "displayDate": "August 10, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - auth0.js",
      "description": "Fixed snake casing `app_metadata` and `user_metadata` on sign up. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v890-2017-08-10) for more information."
    },
    {
      "id": "2cX9Sl009oRbmTAXkmBGvp",
      "date": "2017-08-10",
      "displayDate": "August 10, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - auth0.js",
      "description": "Added Cross Origin Authentication support to Passwordless connections. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v890-2017-08-10) for more information."
    },
    {
      "id": "7qTtVJovUuyi0yheOwuxZu",
      "date": "2017-08-08",
      "displayDate": "August 8, 2017",
      "version": null,
      "type": "added",
      "title": "Authentication API",
      "description": "Added the ability to set the primary user in rules using `context.primaryUser`. Check [our documentation](https://auth0.com/docs/link-accounts#automatic-account-linking) for more information."
    },
    {
      "id": "DtYoxMKjuEN8ICawhllEi",
      "date": "2017-08-01",
      "displayDate": "August 1, 2017",
      "version": null,
      "type": "updated",
      "title": "Management API",
      "description": "The [DELETE client grants endpoint](https://auth0.com/docs/api/management/v2#!/Grants/delete_grants_by_id) now allows to delete all grants for a given user by specifing the query string parameter `user_id`."
    },
    {
      "id": "1XndI3VjF7uy47RGQc6jpu",
      "date": "2017-07-20",
      "displayDate": "July 20, 2017",
      "version": null,
      "type": "updated",
      "title": "Management Dashboard",
      "description": "Now the 'Use Auth0 for SSO' flag under Client Settings is disabled for OIDC Conformant clients."
    },
    {
      "id": "5tjr67hMDsa1vepgmwRmQs",
      "date": "2017-07-19",
      "displayDate": "July 19, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK now makes use of 'Android Manifest Placeholders' to define the Domain and Scheme values required to automatically capture a Web Authentication result. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#1100-2017-07-19) for more information."
    },
    {
      "id": "1eohyo5HZP5DcwdQ7mxR3s",
      "date": "2017-07-19",
      "displayDate": "July 19, 2017",
      "version": null,
      "type": "added",
      "title": "Lock",
      "description": "Lock for Android now makes use of 'Android Manifest Placeholders' to define the Domain and Scheme values required to automatically capture a Web Authentication result, like logging in using the Facebook connection. See the [changelog entry](https://github.com/auth0/Lock.Android/blob/master/CHANGELOG.md#270-2017-07-19) for more information."
    },
    {
      "id": "wqWdstcnDUAHzM2Dr0Dr9",
      "date": "2017-07-18",
      "displayDate": "July 18, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - Lock Web",
      "description": "Added a new option called `connectionResolver`, which is used to resolve the desired connection on the fly instead of setting it beforehand. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10190-2017-07-18) for more information."
    },
    {
      "id": "2E5PFxT0FRQO7zZ2IeRN1g",
      "date": "2017-07-18",
      "displayDate": "July 18, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Fixed an issue with the HRD input when using the back button. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10190-2017-07-18) for more information."
    },
    {
      "id": "1ZQvYWcqz35NY9QXpBr4XC",
      "date": "2017-07-12",
      "displayDate": "July 12, 2017",
      "version": null,
      "type": "added",
      "title": "Lock",
      "description": "Lock for Android now features a 'show password' toggle button on the Password fields. See the [changelog entry](https://github.com/auth0/Lock.Android/blob/master/CHANGELOG.md#260-2017-07-12) for more information."
    },
    {
      "id": "3hPQcqMEvfb4Efln6bkdX5",
      "date": "2017-07-10",
      "displayDate": "July 10, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK will try to use Chrome Custom Tabs when possible. A helper class is included to easily manage Credentials. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#190-2017-07-10) for more information."
    },
    {
      "id": "41hlf8GmrAi0uUJKAjEt6V",
      "date": "2017-07-05",
      "displayDate": "July 5, 2017",
      "version": null,
      "type": "fixed",
      "title": "MFA",
      "description": "Fixed an issue where the ACR value was not being properly set when in a SAML context."
    },
    {
      "id": "5zxQlUHUbChZF9nkKxBdX1",
      "date": "2017-06-30",
      "displayDate": "June 30, 2017",
      "version": null,
      "type": "fixed",
      "title": "MFA",
      "description": "MFA no longer incorrectly preventing brute-force anomaly detection count resets."
    },
    {
      "id": "8b2pmuJILTRo9csGjDPML",
      "date": "2017-06-26",
      "displayDate": "June 26, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added OIDC conformant UserInfo class and API method, added Touch ID validation for renewing credentials and added iOS 11 (Beta) support. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#170-2017-06-26) for more information."
    },
    {
      "id": "7zi0IhKMF8KmzNCQwLh0fZ",
      "date": "2017-06-23",
      "displayDate": "June 23, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - Lock Web",
      "description": "Added more analytics events and also added a new option that enables a button that shows or obfuscates the password. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10180-2017-06-23) for more information."
    },
    {
      "id": "5jKU8RiPAB7yN3wlGW2L61",
      "date": "2017-06-23",
      "displayDate": "June 23, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Fixed an issue with Internet Explorer 11's autocomplete. Also fixed `connection_scope` not being passed to the authorize page. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10180-2017-06-23) for more information."
    },
    {
      "id": "6e3UdJdxm3iQabI0mgefsw",
      "date": "2017-06-22",
      "displayDate": "June 22, 2017",
      "version": null,
      "type": "fixed",
      "title": "MFA",
      "description": "Fixed an issue where the user was being asked to perform MFA despite having clicked the 'Remember Me' checkbox."
    },
    {
      "id": "36VsXRPJQ5nW9shYon0sqe",
      "date": "2017-06-20",
      "displayDate": "June 20, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - auth0.js",
      "description": "Fixed an issue with Passwordless connection inside the Hosted Login Page. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v880-2017-06-20) for more information."
    },
    {
      "id": "2IJmLDLa70ssvclrwoQWo2",
      "date": "2017-06-18",
      "displayDate": "June 18, 2017",
      "version": null,
      "type": "updated",
      "title": "Management API",
      "description": "The [GET client grants endpoint](https://auth0.com/docs/api/management/v2#!/Grants/get_grants) now allows filtering by client id using the query string parameter `client_id`."
    },
    {
      "id": "53DUBvrS7zC4acRI7ykpIB",
      "date": "2017-06-14",
      "displayDate": "June 14, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Started emiting an `authorization_error` when username / password fails. Also fixed a few UI issues on mobile and some options overrides not being passed to auth0.js. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10170-2017-06-14) for more information."
    },
    {
      "id": "30vhxIeStoGKpQvJbVsl2H",
      "date": "2017-06-14",
      "displayDate": "June 14, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Added support for html formatting when using the `flashMessage` option. Also added a new option `allowAutoComplete` that enables the `autocomplete` html5 attribute in the username input. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10170-2017-06-14) for more information."
    },
    {
      "id": "fE33HOiVduVFj7GfHiiTp",
      "date": "2017-06-06",
      "displayDate": "June 6, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added Credentials Manager utility for secure management of tokens. Updated compatibility for Xcode 8.3 See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#160-2017-06-06) for more information."
    },
    {
      "id": "LpowqoIITizk8oVU9Xdkd",
      "date": "2017-06-06",
      "displayDate": "June 6, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Lock.swift - Added 1Password support for database connections. Greatly expanded Lock customization options. See the [changelog entry](https://github.com/auth0/Lock.swift/blob/master/CHANGELOG.md#230-2017-06-06) for more information."
    },
    {
      "id": "6PRsfS65aAvwLE7pOIVbgc",
      "date": "2017-06-06",
      "displayDate": "June 6, 2017",
      "version": null,
      "type": "added",
      "title": "Authentication API",
      "description": "Added a new `client.grant_types` property to Auth0 Clients. With this change, Auth0 will restrict authentication and authorization flows based on the grant types associated with each client. All existing clients have been updated with all grant types for backward compatibility. New clients will be created with certain default grant types based on whether it is a public or confidential client (based on the `token_endpoint_auth_method` property). See [our documentation](https://auth0.com/docs/clients/client-grant-types) for more information."
    },
    {
      "id": "76fGNciFXvD7KLCxjz2nXn",
      "date": "2017-05-29",
      "displayDate": "May 29, 2017",
      "version": null,
      "type": "changed",
      "title": "Management API",
      "description": "Removed `client.resource_servers` from documented sample response."
    },
    {
      "id": "2x39hgCgyRO1ehIznoPFju",
      "date": "2017-05-29",
      "displayDate": "May 29, 2017",
      "version": null,
      "type": "added",
      "title": "Management API",
      "description": "- Added support to query by identifier on `PATCH / GET / DELETE api/v2/resource-servers` endpoints.- Added pagination to `GET api/v2/clients` endpoint."
    },
    {
      "id": "7nw4z5nCHK3SYWzcRmnnYj",
      "date": "2017-05-24",
      "displayDate": "May 24, 2017",
      "version": null,
      "type": "deprecated",
      "title": "SDKs",
      "description": "The Java [Servlet](https://github.com/auth0/auth0-servlet) SDK has been deprecated and will no longer be maintained. Development will continue on the [auth0-java-mvc-common](https://github.com/auth0/auth0-java-mvc-common) SDK."
    },
    {
      "id": "7L2CIew8XPwjWC7UBFvLxp",
      "date": "2017-05-24",
      "displayDate": "May 24, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - auth0.js",
      "description": "Added option `postMessageType` to filter iframe events in order to prevent incorrect events triggering the `renewAuth` callback. Also added support for Cross Origin Authentication. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v870-2017-05-24) for more information."
    },
    {
      "id": "3waYN2OiErE48BpXMe760z",
      "date": "2017-05-24",
      "displayDate": "May 24, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Published new SDK for Java ([auth0-java-mvc-common](https://github.com/auth0/auth0-java-mvc-common)) to simplify the web authentication from Java MVC applications using either Code Grant or Implicit Grant. Supports HS256, and RS256 algorithms with optional Public Key Rotation. See the [changelog entry](https://github.com/auth0/auth0-java-mvc-common/blob/master/CHANGELOG.md#100-2017-05-24) for more information."
    },
    {
      "id": "2ur1TVtITXgVBBgXvz0GXv",
      "date": "2017-05-24",
      "displayDate": "May 24, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - auth0.js",
      "description": "Fixed some overriden options not being applied. Also fixed decoding babse64 strings with special characters. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v870-2017-05-24) for more information."
    },
    {
      "id": "2m9MVoIfgnhHTzKOYEMMmD",
      "date": "2017-05-24",
      "displayDate": "May 24, 2017",
      "version": null,
      "type": "deprecated",
      "title": "SDKs",
      "description": "The Java [Spring MVC](https://github.com/auth0/auth0-spring-mvc) SDK has been deprecated and will no longer be maintained. Development will continue on the [auth0-java-mvc-common](https://github.com/auth0/auth0-java-mvc-common) SDK."
    },
    {
      "id": "14sqxyvF1iuplVRCT0K5X9",
      "date": "2017-05-24",
      "displayDate": "May 24, 2017",
      "version": null,
      "type": "deprecated",
      "title": "SDKs",
      "description": "The Java [Spring Security MVC](https://github.com/auth0/auth0-spring-security-mvc) SDK has been deprecated and will no longer be maintained. Development will continue on the [auth0-java-mvc-common](https://github.com/auth0/auth0-java-mvc-common) SDK."
    },
    {
      "id": "4zfM1fDsGZmAkS7g7heIhB",
      "date": "2017-05-23",
      "displayDate": "May 23, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0-Java SDK adds support for the new OAuth 2.0 Renew and Revoke Token endpoints. The Guardian entity has also been improved. See the [changelog entry](https://github.com/auth0/auth0-java/blob/master/CHANGELOG.md#110-2017-05-23) for more information."
    },
    {
      "id": "436SSlqe3tmC4OX8CDEYco",
      "date": "2017-05-11",
      "displayDate": "May 11, 2017",
      "version": null,
      "type": "fixed",
      "title": "Management Dashboard",
      "description": "- Officially dropped support for Microsoft’s Internet Explorer 10.- Fixed issue in the APIs section’s Test tab: changing languages in the code viewers now change the language properly.- Fixed visual issue with code editors backgrounds in the User Details section when using Chrome in Windows 10.- Fixed overflowing of text when users have huge strings without spaces or breaks in their External Attributes Object.- Fixed issue with Delete Account prompt showing a default domain name instead of the correct domain for that account.- Fixed issue with positioning for SAML connections list pagination controls.- Fixed issue when uploading custom logo in Tenant Settings section would crash the browser.- Fixed issue with users with special characters in their IDs that could not be seen in the dashboard.- Improved UI for User Identities in User Details: replaced the old JSON viewer for a better-looking code editor.- Fixed SAMLP default mappings example to avoid getting parsing errors by default.- Now the API section is displayed by default."
    },
    {
      "id": "2OcNkUwwpUNvKdhVjD0EDV",
      "date": "2017-05-09",
      "displayDate": "May 9, 2017",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "New connection for PayPal Sandbox applications, it can be found in [Social Connections in dashboard](https://manage.auth0.com/#/connections/social)"
    },
    {
      "id": "HQbvgay115lniXMYgogXH",
      "date": "2017-05-08",
      "displayDate": "May 8, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Fixed a few UI issues with long titles and error messages. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10160-2017-05-08) for more information."
    },
    {
      "id": "2eQLEzzaMTtF4himCghKma",
      "date": "2017-05-08",
      "displayDate": "May 8, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - auth0.js",
      "description": "The `postMessage` handler now supports parsing objects as well. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v861-2017-05-08) for more information."
    },
    {
      "id": "AvhhUSQNoxWE5ygTJ3xZB",
      "date": "2017-05-04",
      "displayDate": "May 4, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Java-JWT SDK adds a 'Key Provider' interface to support dynamic RSA or ECDSA Keys, making easier the use of JWKs files for token verification. Long claims are also supported. From this release on, the JWT#decode static method will return a DecodedJWT object instead of a JWT object. See the [changelog entry](https://github.com/auth0/java-jwt/blob/master/CHANGELOG.md#320-2017-05-04) for more information."
    },
    {
      "id": "5ONrCFAwERXuJ46qdl1Uyn",
      "date": "2017-04-27",
      "displayDate": "April 27, 2017",
      "version": null,
      "type": "added",
      "title": "Lock",
      "description": "Lock for Android adds Paypal connection support and displays a Retry screen if it fails to load the Client settings. See the [changelog entry](https://github.com/auth0/Lock.Android/blob/master/CHANGELOG.md#250-2017-04-27) for more information."
    },
    {
      "id": "1Aebdt7gk7D3ByyiCXGuTD",
      "date": "2017-04-27",
      "displayDate": "April 27, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK allows to revoke refresh_tokens. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#180-2017-04-27) for more information."
    },
    {
      "id": "2vTwLQCP18NkdbW7ducRsA",
      "date": "2017-04-25",
      "displayDate": "April 25, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Lock.swift - Added Passwordless SMS/Email connection support, paypal-sandbox connection support. See the [changelog entry](https://github.com/auth0/Lock.swift/blob/master/CHANGELOG.md#220-2017-04-25) for more information."
    },
    {
      "id": "SSjklontVNgpudXu9IoxO",
      "date": "2017-04-24",
      "displayDate": "April 24, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - Lock Web",
      "description": "Added support for the paypal-sandbox strategy. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10150-2017-04-24) for more information."
    },
    {
      "id": "5o3af4qfmRZYMJKuBuSiJe",
      "date": "2017-04-24",
      "displayDate": "April 24, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Fixed a few UI issues with mobile in landscape mode. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10150-2017-04-24) for more information."
    },
    {
      "id": "0QfavkfjsKvzljx1yp62U",
      "date": "2017-04-24",
      "displayDate": "April 24, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - auth0.js",
      "description": "Fixed an issue with `nonce` verification in the `renewAuth` method. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v860-2017-04-24) for more information."
    },
    {
      "id": "bJTX0xF2lHARhfa5qpUWu",
      "date": "2017-04-12",
      "displayDate": "April 12, 2017",
      "version": null,
      "type": "added",
      "title": "API Authorization",
      "description": "Server-side resource-owner password flows that use brute-force detection can now prevent erroneous blocking scenarios by utilizing the 'auth0-forwarded-for' header. See the [documentation](https://auth0.com/docs/api-auth/tutorials/using-resource-owner-password-from-server-side) for more details."
    },
    {
      "id": "4c8eDC5ZTiooCwpcRGCOCH",
      "date": "2017-04-06",
      "displayDate": "April 6, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK on the event of a Rule error while trying to authenticate will parse any rule-defined custom error message. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#170-2017-04-06) for more information."
    },
    {
      "id": "7pq08bmoKMXEA08qzBAXFO",
      "date": "2017-04-05",
      "displayDate": "April 5, 2017",
      "version": null,
      "type": "added",
      "title": "API Authorization",
      "description": "Added multifactor authentication capabilities to the oauth/token endpoint. See the [documentation](https://auth0.com/docs/api-auth/tutorials/multifactor-resource-owner-password) for more details."
    },
    {
      "id": "5rEtxm7Dy4hMov4PEgJLBD",
      "date": "2017-04-05",
      "displayDate": "April 5, 2017",
      "version": null,
      "type": "fixed",
      "title": "Management Dashboard",
      "description": "- Fixed outdated link in Sharepoint SSO Integration tutorial page.- Improved error message in the [Email Templates section](https://manage.auth0.com/#/emails) when the `from` field is not properly filled.- Fixed UI for form validations so they don’t linger after a successful submission of the form.- Added `read:user_idp_tokens` to available scopes for the [Management API](https://manage.auth0.com/#/apis/management/scopes)."
    },
    {
      "id": "4eDyBwS9bsunWX2BwAvgf0",
      "date": "2017-03-27",
      "displayDate": "March 27, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - auth0.js",
      "description": "Fixed an issue with the error handling callback. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v850-2017-03-27) for more information."
    },
    {
      "id": "24jn51hjOLblsPm3xxBL0L",
      "date": "2017-03-27",
      "displayDate": "March 27, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Fixed a few UI inconsistencies with the username input. Also started disabling social buttons when terms were not accepted on sign up. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10140-2017-03-27) for more information."
    },
    {
      "id": "1ozHL7GQLzlsqmxLWNp3AI",
      "date": "2017-03-27",
      "displayDate": "March 27, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added method to check native authentication availability for IdP on device. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#150-2017-03-27) for more information."
    },
    {
      "id": "1Ept09hs6IcN4YQxdu7Rvc",
      "date": "2017-03-16",
      "displayDate": "March 16, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added scope support to the `renew` method. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#140-2017-03-16) for more information."
    },
    {
      "id": "63VHFHoHiPoU1dpy3SQuOB",
      "date": "2017-03-14",
      "displayDate": "March 14, 2017",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "`user.last_password_reset` will now be set immediately when the user changes their password, instead of waiting for the next login."
    },
    {
      "id": "7fVCt4QiOr6OGPPKxUVu0C",
      "date": "2017-03-13",
      "displayDate": "March 13, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - auth0.js",
      "description": "Fixed the error `Nonce does not match` when `state` option contains special characters. Also fixed popup authentication not being called with all the options. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v840-2017-03-13) for more information."
    },
    {
      "id": "3QdsqvP6nIPWYh1ZzyReae",
      "date": "2017-03-13",
      "displayDate": "March 13, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Lock.swift - Added connection scope support for OAuth2 connections and added native authentication handler support. See the [changelog entry](https://github.com/auth0/Lock.swift/blob/master/CHANGELOG.md#210-2017-03-13) for more information."
    },
    {
      "id": "2zEKbRo2tiZWEGTJEqYcbC",
      "date": "2017-03-13",
      "displayDate": "March 13, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - Lock Web",
      "description": "Added Evernote strategy. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10130-2017-03-13) for more information."
    },
    {
      "id": "1x2T9bkfSlsLU0vNg0rugF",
      "date": "2017-03-13",
      "displayDate": "March 13, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added Connection Scopes to webAuth and creation of webAuth instances from authentication instances. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#130-2017-03-13) for more information."
    },
    {
      "id": "1Bg2PILcFmcdjf1T0okVo8",
      "date": "2017-03-13",
      "displayDate": "March 13, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Fixed an issue when parsing a url fragment and the `state` had special characters. Also fixed an issue with incorrect error messages. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10130-2017-03-13) for more information."
    },
    {
      "id": "4ygEjKWitbOd6kaOZtUkzi",
      "date": "2017-03-10",
      "displayDate": "March 10, 2017",
      "version": null,
      "type": "fixed",
      "title": "Management Dashboard",
      "description": "- Added functionality to filter-as-you-type the tenant list in the tenant dropdown for tenant lists with more than 10 tenants in them.- Updated UI for the <app_metadata> and <user_metadata> properties, in the User Details section, to feature a full-featured editor with code folding.- Renamed the “Setup” button in SAMLP connections list to “Setup Instructions”.- Fixed a series of issues with dashboard invitees:\n   - Prevent non-owners from entering the “create SSO Integrations” route.   - Prevent non-owners from entering the Logs section.   - Prevent non-owners from entering the account sub-sections (Admins, Payment, etc.).\n- Updated UI for Dashboard Admins to fix XSS vulnerability when deleting dashboard admins and relocated the row to add an admin to always be on top of the list to avoid scrolling in long lists.- Updated UI for User Details to account for long <name> and <username> properties by truncating them.- Added the possibility to save Sharepoint SSO Integrations <external URLs> as a comma-separated list to set multiple of them."
    },
    {
      "id": "5IDLA0wTW2KMtCUYmucC8H",
      "date": "2017-03-08",
      "displayDate": "March 8, 2017",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "Added support for `read:user` scope when using Github social connections"
    },
    {
      "id": "3Z9CBBBLwUXUAAGcYrbpKN",
      "date": "2017-03-06",
      "displayDate": "March 6, 2017",
      "version": null,
      "type": "added",
      "title": "Lock",
      "description": "Lock for Android Passwordless flow can now remember the identity of the last person who successfully signed in. See the [changelog entry](https://github.com/auth0/Lock.Android/blob/master/CHANGELOG.md#240-2017-03-06) for more information."
    },
    {
      "id": "3oHkuqDO7Lzpws1ataQMEi",
      "date": "2017-03-03",
      "displayDate": "March 3, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Started sending `owp` param in popup mode. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10122-2017-03-03) for more information."
    },
    {
      "id": "5gJQpmEhouExlFfrw5bjzM",
      "date": "2017-03-02",
      "displayDate": "March 2, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK adds the Management API's GET User Profile endpoint. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#160-2017-03-02) for more information."
    },
    {
      "id": "3GtY5uyrhXGxgjBBo6shbz",
      "date": "2017-03-02",
      "displayDate": "March 2, 2017",
      "version": null,
      "type": "fixed",
      "title": "SDKs - Lock Web",
      "description": "Fixed a few UI issues. Started filtering parameters send to the /authorize endpoint. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10120-2017-03-02) for more information."
    },
    {
      "id": "30lJyxFFOmH4l57LBAQCJP",
      "date": "2017-03-02",
      "displayDate": "March 2, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - Lock Web",
      "description": "Added checkbox as a custom input type for the option `additionalSignUpFields`. See the [changelog entry](https://github.com/auth0/lock/blob/master/CHANGELOG.md#v10120-2017-03-02) for more information."
    },
    {
      "id": "7jOF9cBpfhifSnpffPt3bg",
      "date": "2017-03-01",
      "displayDate": "March 1, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs - auth0.js",
      "description": "Added flag `_idTokenVerification` to disable `id_token` verification for legacy clients. See the [changelog entry](https://github.com/auth0/auth0.js/blob/master/CHANGELOG.md#v830-2017-03-01) for more information."
    },
    {
      "id": "6ZV7r4UoAVYssLLJh8F7Zg",
      "date": "2017-02-25",
      "displayDate": "February 25, 2017",
      "version": null,
      "type": "added",
      "title": "Management API",
      "description": "Updated the UI for the [API Explorer tab](https://manage.auth0.com/#/apis/management/explorer) to be able to configure the token expiration for the Management API."
    },
    {
      "id": "2grhzfLAGKmZsm0pHghsZ4",
      "date": "2017-02-23",
      "displayDate": "February 23, 2017",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "Rules will now run when calling `oauth/token` with `grant_type: password` or `grant_type: refresh_token`. For more information, check out [our documentation](https://auth0.com/docs/migrations#password-and-refresh-token-exchange-rules-migration-notice)."
    },
    {
      "id": "6yK1ShzEk9ZC2j1krnRwO2",
      "date": "2017-02-22",
      "displayDate": "February 22, 2017",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "Guardian Authenticator for Android is now capable of scanning and managing any generic TOTP key."
    },
    {
      "id": "5T6eRPCt0zoHhE76PE0L6H",
      "date": "2017-02-22",
      "displayDate": "February 22, 2017",
      "version": null,
      "type": "added",
      "title": "Clients",
      "description": "Added a new property <description> for Clients, a free-text field to describe the client’s purpose."
    },
    {
      "id": "1uP3D8gNpzlCthFkpqeWFP",
      "date": "2017-02-16",
      "displayDate": "February 16, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Released new [Lock for iOS](https://github.com/auth0/Lock.swift) version written in Swift and [migration guide](https://github.com/auth0/Lock.swift/blob/master/MIGRATION.md) to help the transition."
    },
    {
      "id": "yvl65jKqw4r2AmIsPrhau",
      "date": "2017-02-06",
      "displayDate": "February 6, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added Native Authentication support and fixed support for OIDC conformant profiles. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#120-2017-02-06) for more information."
    },
    {
      "id": "4IMGDfh8hWnT6BOrwXPYDN",
      "date": "2017-01-30",
      "displayDate": "January 30, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Published new SDK for Java ([auth0-java](https://github.com/auth0/auth0-java)) that supports Authentication API OAuth 2.0 endpoints and most of the Management API entities. See the [changelog entry](https://github.com/auth0/auth0-java/blob/master/CHANGELOG.md#100-2017-01-30) for more information."
    },
    {
      "id": "1LvgsytzNl5xPC2wEic0aX",
      "date": "2017-01-16",
      "displayDate": "January 16, 2017",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "Added enhancements to SAML Single Logout to conform to the Single Logout Profile specification. With these enhancements, all SAML Service Providers you have configured for logout will be sent a `LogoutRequest` to the `logout.callback` URL you have configured in the SAML Add-on. If your Service Provider does not support Single Logout, you can set `logout.slo_enabled: false` in your SAML Add-on configuration. For more information, check out our [Logout documentation](https://auth0.com/docs/logout#saml-logout) and [SAML configuration documentation](https://auth0.com/docs/protocols/saml/saml-configuration#logout)."
    },
    {
      "id": "5hCphzOLOLqQSWm2TZfZJL",
      "date": "2017-01-04",
      "displayDate": "January 4, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Java-JWT SDK can now handle Array claims and return the Payload claims as a Map<String, Claim>. See the [changelog entry](https://github.com/auth0/java-jwt/blob/master/CHANGELOG.md#310-2017-01-04) for more information."
    },
    {
      "id": "17f1Hzm81eCz8OVSppUpu5",
      "date": "2017-01-03",
      "displayDate": "January 3, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Published [auth0.js v8](https://github.com/auth0/auth0.js/releases/tag/v8.0.0) and [migration guide](https://auth0.com/docs/libraries/auth0js/migration-guide) to help the transition."
    },
    {
      "id": "6sFIAw92LzgjmwGsNbN7j2",
      "date": "2017-01-02",
      "displayDate": "January 2, 2017",
      "version": null,
      "type": "added",
      "title": "Lock",
      "description": "Lock for Android now supports the use of custom URL schemes for Web Authentication. The Implicit Grant has been deprecated. See the [changelog entry](https://github.com/auth0/Lock.Android/blob/master/CHANGELOG.md#230-2017-01-02) for more information."
    },
    {
      "id": "6kIpGwbUIoxoEpxmnQs0an",
      "date": "2017-01-02",
      "displayDate": "January 2, 2017",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK adds a flag to decide if the API calls should be made using Open ID Connect conformant or Legacy endpoints. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#140-2017-01-02) for more information."
    },
    {
      "id": "2hdJapu2VDbbQ8HZL8vORZ",
      "date": "2016-12-26",
      "displayDate": "December 26, 2016",
      "version": null,
      "type": "changed",
      "title": "Anomaly Detection",
      "description": "Consolidated brute-force detection into a single Shield."
    },
    {
      "id": "56Ojb44IQPGefGl4Hdx4zT",
      "date": "2016-12-16",
      "displayDate": "December 16, 2016",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Auth0.swift - Added support for `password-realm.grant_types` and `refresh_token.grant_types`. Additional smaller changes have been made to support OIDC. See the [changelog entry](https://github.com/auth0/Auth0.swift/blob/master/CHANGELOG.md#110-2016-12-16) for more information."
    },
    {
      "id": "5wXK1SXhNrsLLLKycjyxot",
      "date": "2016-12-12",
      "displayDate": "December 12, 2016",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK now supports sending audience value on Web Authentication. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#130-2016-12-12) for more information."
    },
    {
      "id": "3qdBLmJlyEoscNMOdk9owA",
      "date": "2016-12-05",
      "displayDate": "December 5, 2016",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Published new Java SDK ([java-jwt](https://github.com/auth0/java-jwt)) for Json Web Tokens verification and signing. Supports HMAC, RSA and ECDSA algorithms. See the [changelog entry](https://github.com/auth0/java-jwt/blob/master/CHANGELOG.md#300-2016-12-05) for more information."
    },
    {
      "id": "58vzTCYqbDRMXXPB8D0tt4",
      "date": "2016-12-02",
      "displayDate": "December 2, 2016",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "Added client flag to disable SSO (`sso_disabled`) which can be set using the Management API. When this flag is set to `true`, an Auth0 session will not be created for any authentication using that client."
    },
    {
      "id": "4oCMfFgpgxTLZAZjyKQRSf",
      "date": "2016-12-02",
      "displayDate": "December 2, 2016",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "It is now possible to pre-enroll users into Guardian via an enrollment email. See [here](https://auth0.com/docs/multifactor-authentication/administrator/guardian-enrollment-email) for more information."
    },
    {
      "id": "7gwjvtgcH4SvLosTA7qCNK",
      "date": "2016-12-01",
      "displayDate": "December 1, 2016",
      "version": null,
      "type": "added",
      "title": "API Authorization",
      "description": "Added `expires_in` to oauth/token endpoint"
    },
    {
      "id": "19uyqbTn32jzx5eEiH3aTA",
      "date": "2016-12-01",
      "displayDate": "December 1, 2016",
      "version": null,
      "type": "changed",
      "title": "Authentication",
      "description": "Upgraded Auth0 hosted login page to Lock 10.7."
    },
    {
      "id": "3Rr4G1fOLT7HbOAfWTmH2N",
      "date": "2016-11-30",
      "displayDate": "November 30, 2016",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "The Auth0.Android SDK prepares to conform with Open ID Connect and adds the /userinfo and /oauth/token endpoints. Multiple response_type values are supported as well. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#120-2016-11-30) for more information."
    },
    {
      "id": "31DkhC1sqqAtVJ7D3RI6gg",
      "date": "2016-11-25",
      "displayDate": "November 25, 2016",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "Published new mobile SDKs for iOS ([Guardian.swift](https://github.com/auth0/Guardian.swift)) and Android ([Guardian.Android](https://github.com/auth0/Guardian.Android)) to make it simple to build custom Guardian mobile applications."
    },
    {
      "id": "7nOvbGELOGSXR4hqS4yRyC",
      "date": "2016-11-21",
      "displayDate": "November 21, 2016",
      "version": null,
      "type": "added",
      "title": "Lock",
      "description": "Lock for Android now allows to specify a custom Scope. See the [changelog entry](https://github.com/auth0/Lock.Android/blob/master/CHANGELOG.md#220-2016-11-21) for more information."
    },
    {
      "id": "3GXyUQoW9RqIdN3kZodJiO",
      "date": "2016-11-18",
      "displayDate": "November 18, 2016",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "nonce parameter is now mandatory if you are using implicit grant flow"
    },
    {
      "id": "6TC3i2wfXg7XLhdZe24TJb",
      "date": "2016-11-02",
      "displayDate": "November 2, 2016",
      "version": null,
      "type": "added",
      "title": "Lock",
      "description": "Released new version of Lock for Web with several bugfixes and improvements including support for custom OAuth2 connections. See [Lock's changelog](https://github.com/auth0/lock/blob/master/CHANGELOG.md) for more information."
    },
    {
      "id": "pKRGNsgWFC0m48cTAIpqj",
      "date": "2016-10-31",
      "displayDate": "October 31, 2016",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "Release of the UI-less client libraries for Guardian, allowing users to build custom Guardian widgets. See the library [here](https://github.com/auth0/auth0-guardian.js) for more information"
    },
    {
      "id": "Rb1ISvdmcLKkVXYDZ0sfH",
      "date": "2016-10-26",
      "displayDate": "October 26, 2016",
      "version": null,
      "type": "added",
      "title": "Settings",
      "description": "Added new Tenant settings for:\n- `default_audience` - Specifies the audience that clients will receive as a default if one isn't explicitly requested- `default_directory` - Specifies a default directory connection to use when using `password grant` flow"
    },
    {
      "id": "3ovL86b9QsLWW3pWvEAjID",
      "date": "2016-10-26",
      "displayDate": "October 26, 2016",
      "version": null,
      "type": "fixed",
      "title": "Authentication",
      "description": "Double quotes in assertions caused invalid SAML signature."
    },
    {
      "id": "64aLCYqeTH6YiQTQBwo5J5",
      "date": "2016-10-25",
      "displayDate": "October 25, 2016",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Published new Android focused SDK ([JWTDecode.Android](https://github.com/auth0/JWTDecode.Android)) for decoding Json Web Tokens (JWT). See the [changelog entry](https://github.com/auth0/JWTDecode.Android/blob/master/CHANGELOG.md#100-2016-10-25) for more information."
    },
    {
      "id": "6RV78uXnkIo8CEEbX81B8C",
      "date": "2016-10-24",
      "displayDate": "October 24, 2016",
      "version": null,
      "type": "fixed",
      "title": "Connections",
      "description": "Verification email does not display given_name attribute for custom DB."
    },
    {
      "id": "2XgSQJ3D2ULN4Bq9P3ufbA",
      "date": "2016-10-24",
      "displayDate": "October 24, 2016",
      "version": null,
      "type": "changed",
      "title": "Lock",
      "description": "Lock for Android now uses Browser instead of WebView by default for authentication. See the [changelog entry](https://github.com/auth0/Lock.Android/blob/master/CHANGELOG.md#210-2016-10-24) for more information."
    },
    {
      "id": "7EKHUUeutKg8AcHKD6pqm6",
      "date": "2016-10-15",
      "displayDate": "October 15, 2016",
      "version": null,
      "type": "added",
      "title": "Connections",
      "description": "Added paging to Database Connctions page to support large volume of connections"
    },
    {
      "id": "5qtcf0rNLcanQ5QAtiHwTX",
      "date": "2016-10-06",
      "displayDate": "October 6, 2016",
      "version": null,
      "type": "added",
      "title": "SDKs",
      "description": "Published new mobile SDKs for iOS ([Auth0.swift](https://github.com/auth0/Auth0.swift)) and Android ([Auth0.Android](https://github.com/auth0/Auth0.Android)) to make it simple to build custom login screens using Auth0."
    },
    {
      "id": "7vYKVLKnSRl46EAJh3WR64",
      "date": "2016-10-05",
      "displayDate": "October 5, 2016",
      "version": null,
      "type": "added",
      "title": "API",
      "description": "It is now possible to disable automatic SMS and email notifications during Passwordless user creation. See the [docs](https://auth0.com/docs/api/management/v2#!/Users/post_users) for more information."
    },
    {
      "id": "4QRMmRWZb464ZHpOylk8TX",
      "date": "2016-10-05",
      "displayDate": "October 5, 2016",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "Auth0 Guardian now allows users to choose to 'remember this browser' and not be prompted for MFA for 30 days from a known system."
    },
    {
      "id": "6y5MWDLiUabHgtRQqpGUan",
      "date": "2016-09-26",
      "displayDate": "September 26, 2016",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "When a user hits the rate limit for the `delegation` endpoint, log entries will now be visible in the tenant logs."
    },
    {
      "id": "3S846eirFpC5pcZ5WGLsTM",
      "date": "2016-09-22",
      "displayDate": "September 22, 2016",
      "version": null,
      "type": "added",
      "title": "SSO",
      "description": "SSO Session Timeout can be customized in Tenant Settings > Advanced. This allows you to specify how long the SSO Cookie is valid."
    },
    {
      "id": "6HhYeiyZUGilqDsUUM8zam",
      "date": "2016-09-21",
      "displayDate": "September 21, 2016",
      "version": null,
      "type": "added",
      "title": "Lock",
      "description": "Released new major version of Lock for Android with redesigned UI and new features like custom OAuth2 connections support, password policy, etc. See the [docs](https://auth0.com/docs/libraries/lock-android) for more information."
    },
    {
      "id": "5j2r5cb5PSnwEoV8pyBV9T",
      "date": "2016-09-21",
      "displayDate": "September 21, 2016",
      "version": null,
      "type": "added",
      "title": "OAuth2",
      "description": "You can now opt-in to preview the new OAuth2aaS pipeline in Account Settings > Advanced. This enables support for Advanced API Authorization scenarios including user consent."
    },
    {
      "id": "4ek6qQFq7SGUo5at0p36i8",
      "date": "2016-09-21",
      "displayDate": "September 21, 2016",
      "version": null,
      "type": "fixed",
      "title": "Authentication",
      "description": "Fixed error when custom DB scripts are set to `null`"
    },
    {
      "id": "5dc2z2zOPeBJTrdFv1f6rI",
      "date": "2016-09-19",
      "displayDate": "September 19, 2016",
      "version": null,
      "type": "added",
      "title": "Connections",
      "description": "Database Connections now allow customizing the minimum and maximum length for usernames, up to 128 characters. This only applies if `Require Username` is on.  \n\n![username length](https://cdn2.auth0.com/website/changelog/username-length.png)"
    },
    {
      "id": "6A9lfSu8KhDbHOMykCBZuX",
      "date": "2016-09-13",
      "displayDate": "September 13, 2016",
      "version": null,
      "type": "changed",
      "title": "API",
      "description": "Renamed the Delete All Users endpoint from `DELETE /api/v2/users` to `DELETE /api/v2/allusers` to avoid accidental deletion of users."
    },
    {
      "id": "38L3n6MarI9UHNxzWIfpgt",
      "date": "2016-09-07",
      "displayDate": "September 7, 2016",
      "version": null,
      "type": "added",
      "title": "Enterprise Connections",
      "description": "Add `oid` claim to Azure AD user profiles"
    },
    {
      "id": "5slrMBajjHMr7zDgP0Sbhi",
      "date": "2016-09-05",
      "displayDate": "September 5, 2016",
      "version": null,
      "type": "added",
      "title": "API",
      "description": "Update response from Device Credentials endpoint to include `type` and `user_id`."
    },
    {
      "id": "1KOTwD1kMQGWMy0vI6wzyB",
      "date": "2016-09-02",
      "displayDate": "September 2, 2016",
      "version": null,
      "type": "added",
      "title": "Logs",
      "description": "SAML Response is now displayed in Tenant Logs when Debug Mode is enabled in the SAML Connection."
    },
    {
      "id": "37IU9UtC4MZB4YVYqtoJUo",
      "date": "2016-08-29",
      "displayDate": "August 29, 2016",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "Added the ability to regenerate Guardian recovery codes. Please visit our [documentation](https://auth0.com/docs/api/management/v2#!/Users/post_recovery_code_regeneration) for details."
    },
    {
      "id": "1cOlGOuMUtZylxUWFWARjW",
      "date": "2016-08-25",
      "displayDate": "August 25, 2016",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "Auth0 Guardian is now officially released -- a new and convenient way to perform multifactor authentication for logins. Guardian features 'push-notifications' as well as other standard authentication flows. See our full announcement [here](https://auth0.com/blog/announcing-Auth0-Guardian-a-new-way-to-login)."
    },
    {
      "id": "7y67FPjaq7s7ofSSCVRX7g",
      "date": "2016-08-24",
      "displayDate": "August 24, 2016",
      "version": null,
      "type": "added",
      "title": "API",
      "description": "Added ability to specify Client Logo on the client API"
    },
    {
      "id": "1040yUgFOM0LE4gb6JDUwD",
      "date": "2016-08-24",
      "displayDate": "August 24, 2016",
      "version": null,
      "type": "added",
      "title": "Password Breach Detection",
      "description": "Releasing password breach detection, which protects Auth0 users in case their password is leaked via a breach at a different provider. Auth0 monitors announcments of breaches from other providers, and checks Auth0 users against the list of leaked accounts. In case of a match, the user will be prevented from logging in until their password is reset."
    },
    {
      "id": "3ZsbI2OiYBksWluO3NXOoG",
      "date": "2016-08-17",
      "displayDate": "August 17, 2016",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "Guardian template is now customizable via the Hosted Pages section."
    },
    {
      "id": "3myYMrcWWMlKuAPawKGAGQ",
      "date": "2016-08-09",
      "displayDate": "August 9, 2016",
      "version": null,
      "type": "fixed",
      "title": "Logs",
      "description": "Fixed issue with Account Un-Linking where the secondary account would not show up in the Users list after being Un-Liked. Now, when Un-Linking two linked accounts, the secondary account will be restored and visible in Users."
    },
    {
      "id": "4d7KuTgMnjMbhbc5CvRIqM",
      "date": "2016-08-05",
      "displayDate": "August 5, 2016",
      "version": null,
      "type": "added",
      "title": "MFA",
      "description": "The API now has the ability to manage Guardian configuration. Please visit our [documentation](https://auth0.com/docs/api/management/v2#!/Guardian/) for full details."
    },
    {
      "id": "3jY0IA8EC2Kth4N2aE0cd0",
      "date": "2016-08-05",
      "displayDate": "August 5, 2016",
      "version": null,
      "type": "added",
      "title": "Bulk Import",
      "description": "Bulk Import API has been upgraded with the following changes: \n - Added option to specify if the operation should should insert or upsert - Added `external_id` parameter. The value is user defined and is returned with Job status; can be used for correlating multiple jobs. - Job Status shows summary totals of successful/failed/inserted/updated - Added ability to retrieve failed entries via API call to `GET /api/v2/jobs/{id}/errors` - Job Status is added to Tenant Logs which allows a custom WebHook to be trigged using the WebHook Logs Extension"
    },
    {
      "id": "2r7GOYk0mS1TCL7KM0ttYI",
      "date": "2016-08-01",
      "displayDate": "August 1, 2016",
      "version": null,
      "type": "added",
      "title": "Extensions",
      "description": "The Bitbucket Deployments extension allows you to deploy rules and database connection scripts from Bitbucket to Auth0. You can configure a Bitbucket repository, keep all your rules and database connection scripts there, and have them automatically deployed to Auth0 each time you push to your repository. ![extensions](https://cdn2.auth0.com/content/img/bitbucket-ext.png)"
    },
    {
      "id": "9UwTbb4SDGOi543pGKFlx",
      "date": "2016-07-22",
      "displayDate": "July 22, 2016",
      "version": null,
      "type": "added",
      "title": "Authentication",
      "description": "The `/authorize` endpoint now supports `response_mode=form_post` when the response_type is either `id_token` or `code token`.  \n\n For example:  \n `/authorize?response_mode=form_post&client_id=…&redirect_uri=…&response_type=id_token`"
    },
    {
      "id": "6wy0yLTv3LZAsffFd6Y7eK",
      "date": "2016-07-15",
      "displayDate": "July 15, 2016",
      "version": null,
      "type": "added",
      "title": "Password Policy",
      "description": "Added password policy support for Password Dictionary and Password Personal Data.  \n\n **Password Dictionary**, when enabled, prevents the use of common passwords and allows for setting a custom dictionary with up to 200 entries.  \n\n**Password Personal Data**, when enabled, prevents using personal data in the password, such as the user's name, parts of the email address, etc..."
    },
    {
      "id": "5Pc77EYigYDWDgzNzaMGj0",
      "date": "2016-07-15",
      "displayDate": "July 15, 2016",
      "version": null,
      "type": "added",
      "title": "Connections: Passwordless",
      "description": "Added ability to change Email for users in Passwordless connections."
    },
    {
      "id": "1sDThFzNwhAUKvf3qJF9c7",
      "date": "2016-07-15",
      "displayDate": "July 15, 2016",
      "version": null,
      "type": "added",
      "title": "API Authorization",
      "description": "Auth0 now supports full Client Credentials flow for API Authorizations. This allows server to server authorization for things like scripts, backend services, daemons, or any app that does not need to operate as a user.  \n\n Enabling the API section can be done via Account Settings or by adding a new **Non Interactive** Client.  \n\n The **Application** section in the Auth0 Dashboard has been renamed to **Clients** to clarify the distinction between APIs and Clients.  \n\n This is the first step we are taking towards more complex API authorization scenarios. Other flows, such as User Consent, will be added in the near future. Please visit our full [documentation](https://auth0.com/docs/api-auth) for detailed information about API Authorization."
    },
    {
      "id": "1Eplf90aeFfgOX7gDRAW0P",
      "date": "2016-07-14",
      "displayDate": "July 14, 2016",
      "version": null,
      "type": "added",
      "title": "Connections: Passwordless",
      "description": "Added support for Twillio Copilot in Passwordless Connections."
    },
    {
      "id": "5ZgfWmZXyPfoAeldX0mySh",
      "date": "2016-07-12",
      "displayDate": "July 12, 2016",
      "version": null,
      "type": "changed",
      "title": "Social Connections: Fitbit",
      "description": "Support for Fitbit OAuth2 apps. Added an upgrade mechanism for OAuth1 (deprecated) connections."
    },
    {
      "id": "4ZjI9JF1L1Zwrfa9r8HN1",
      "date": "2016-07-02",
      "displayDate": "July 2, 2016",
      "version": null,
      "type": "changed",
      "title": "Passwordless",
      "description": "If a user requests multiple passwordless links/codes, emails may not arrive or be displayed in the correct order. Up till now, only the last code issued was valid, causing issues when opening the wrong email. This change allows the last 5 codes sent to be valid, but once one is used, the rest are invalidated."
    },
    {
      "id": "7FYl9jskNepvpvCLkQF6Sy",
      "date": "2016-06-29",
      "displayDate": "June 29, 2016",
      "version": null,
      "type": "added",
      "title": "Extensions",
      "description": "The GitHub Deployments extension allows you to deploy rules and database connection scripts from GitHub to Auth0. You can configure a GitHub repository, keep all your rules and database connection scripts there, and have them automatically deployed to Auth0 each time you push to your repository. ![extensions](https://cdn2.auth0.com/content/img/github-ext.png)"
    },
    {
      "id": "5n16ZP6ir1RoJWnNkdjeAv",
      "date": "2016-06-21",
      "displayDate": "June 21, 2016",
      "version": null,
      "type": "added",
      "title": "Password Policy",
      "description": "Added Password History support to Database Connections' password policies."
    },
    {
      "id": "3QMPOVmhNXDHoC68QcFTnc",
      "date": "2016-05-28",
      "displayDate": "May 28, 2016",
      "version": null,
      "type": "added",
      "title": "Social Connections",
      "description": "Added support for the new Firebase SDK v3."
    },
    {
      "id": "6sXlrKXAS01nxLHecR2KRz",
      "date": "2016-05-25",
      "displayDate": "May 25, 2016",
      "version": null,
      "type": "added",
      "title": "Tenant Settings",
      "description": "Introduced a new tenant settings flag `enable_client_connections` that will allow customers to switch between 2 flows when creating clients (Applications): \n - When creating a new client, create and enable existing connections (current flow, default) - When creating a new client, create but don't enable my existing connections (new flow) \n   \n\n This setting can be turned off in  Account Settings > Advanced > Settings > Enable Client Connections or via the API using the `GET /api/v2/tenants/settings` endpoint."
    },
    {
      "id": "1WbcIZVN2Mv6tJ9siv7Oaj",
      "date": "2016-05-16",
      "displayDate": "May 16, 2016",
      "version": null,
      "type": "added",
      "title": "Extensions",
      "description": "Extensions gallery now supports documentation. From now on, you will be able to check documetion before and after installing an extension.  \n\n\n![extensions](https://cdn2.auth0.com/content/img/extensions-docs.png)\n ![extensions](https://cdn2.auth0.com/content/img/extensions-docs4.png)"
    },
    {
      "id": "3DfSn5JkSVSJxEw0IjIt4b",
      "date": "2016-05-12",
      "displayDate": "May 12, 2016",
      "version": null,
      "type": "added",
      "title": "Social Connections: Bitbucket, Social Connections: Dropbox",
      "description": "Added support for **Bitbucket** and **Dropbox** social connections.  \n\nIf you are using **Lock**, please upgrade to **v9.2.0**."
    },
    {
      "id": "3BH6RxedtOob3zGOwGnsz3",
      "date": "2016-05-12",
      "displayDate": "May 12, 2016",
      "version": null,
      "type": "added",
      "title": "Passwordless emails",
      "description": "Provided access to the language in passwordless email templates"
    },
    {
      "id": "24UAugVThEV9x2iUluT9X2",
      "date": "2016-05-10",
      "displayDate": "May 10, 2016",
      "version": null,
      "type": "removed",
      "title": "API",
      "description": "Remove support for JSONP on the `/ssodata` endpoint. The *\"Last time you logged in with\"* feature will no longer be supported on IE 9."
    },
    {
      "id": "4k3kfOarWqtXxxrKpyFFW8",
      "date": "2016-05-09",
      "displayDate": "May 9, 2016",
      "version": null,
      "type": "added",
      "title": "Rules",
      "description": "Integrate Rules Debugging with Real-time Logs extension   \n\n\n![extensions](https://cdn2.auth0.com/content/img/rule-debug.gif)"
    },
    {
      "id": "7e8Mf4pNBGyzT7KEJE2W7Y",
      "date": "2016-05-08",
      "displayDate": "May 8, 2016",
      "version": null,
      "type": "added",
      "title": "Extensions",
      "description": "We shipped 7 new logging extensions. You can now export Auth0 logs to one of the following external systems:   \n\n\n\n- Auth0 Logs to Papertrail- Auth0 Logs to Sumologic- Auth0 Logs to Splunk- Auth0 Logs to Logstash- Auth0 Logs to Mixpanel- Auth0 Logs to Logentries\n   \n\nExport operation executes at configurable intervals to ensure you always have access to recent logs.  \n\n ![extensions](https://cdn2.auth0.com/content/img/logs-ext.png)"
    },
    {
      "id": "3Lf458RFGf7PiVRy9Qnqld",
      "date": "2016-05-02",
      "displayDate": "May 2, 2016",
      "version": null,
      "type": "added",
      "title": "Extensions",
      "description": "New Extension: Real-time Webtask Logs   \n\n\nThis extension gives you the possibility to access to Webtask Logs in real-time. ![extensions](https://cdn2.auth0.com/content/img/real-time-logs-1.png)\n ![extensions](https://cdn2.auth0.com/content/img/real-time-logs-2.png)"
    },
    {
      "id": "2yerGMjswxEk8W5uBThxxp",
      "date": "2016-04-22",
      "displayDate": "April 22, 2016",
      "version": null,
      "type": "added",
      "title": "Server",
      "description": "Added logout `returnTo` URL validation. If the `returnTo` URL is not in the Allowed Logout URLs list, the request will be rejected. See the [docs](https://auth0.com/docs/logout#setting-allowed-logout-urls-at-the-account-level) for more information."
    },
    {
      "id": "1oxo1pHWCRtArJ217CM2eB",
      "date": "2016-04-08",
      "displayDate": "April 8, 2016",
      "version": null,
      "type": "added",
      "title": "Extensions",
      "description": "New Extension: Authorization Dashboard   \n\n\nThis extension gives you the possibility to manage group memberships for your users.  \n\n\n##### Group Management\nAllows you to create groups with a name and a description. Users can be added and removed from groups. This can happen by opening the group and managing users from there, or by opening the user and manage the user's group memberships from there.  \n\n![extensions](https://cdn2.auth0.com/content/img/authz-groups-ext.png)\n  \n\n\n\n##### User Management\nBesides managing everything from the group point of view you can also open a user and manage his/her group memberships there but also see the \"calculated\" group memberships for that user.  \n\n![extensions](https://cdn2.auth0.com/content/img/authz-apps-ext.png)\n  \n\n\n\n##### Application Access\nIn Auth0 the application access is very coarse grained. All users in a connection that is enabled for the application are able to access the application. With this extension you are now able to take this a step further. You are able to define that only groups \"Fabrikam Management\" and \"Fabrikam Finance\" are able to access the \"Reporting App\" containing reports about the company's financials.  \n\n![extensions](https://cdn2.auth0.com/content/img/authz-users-ext.png)"
    },
    {
      "id": "7cN3vI0Tu0OvP2g5qLT8o5",
      "date": "2016-04-07",
      "displayDate": "April 7, 2016",
      "version": null,
      "type": "added",
      "title": "Management API",
      "description": "Added a new property on the **client** entity to allow users to specify how the client is going to perform authentication with the token endpoint. Values are `none`, `client_secret_post` and `client_secret_basic`. The `none` option is introduced for native applications which can’t store secrets and use **PKCE** (see [https://tools.ietf.org/html/rfc7636](https://tools.ietf.org/html/rfc7636))"
    },
    {
      "id": "6nahr8swxKUGFPpqRML0Ax",
      "date": "2016-04-06",
      "displayDate": "April 6, 2016",
      "version": null,
      "type": "changed",
      "title": "Connections: Database",
      "description": "Suppressed the error message in the change password flow in order to prevent user enumeration within the message. The API now returns HTTP 200."
    },
    {
      "id": "1lvXf203Fn85plbbf4TaEK",
      "date": "2016-04-06",
      "displayDate": "April 6, 2016",
      "version": null,
      "type": "fixed",
      "title": "Authentication API",
      "description": "We included an extra validation in the `/tokeninfo` endpoint to verify that the account name in the URL matches the account for which the token was issued. Any call to the tokeninfo with a token from another account will return Unauthorized."
    },
    {
      "id": "1qL64jGfnLpUMkavRaUoJ7",
      "date": "2016-04-05",
      "displayDate": "April 5, 2016",
      "version": null,
      "type": "deprecated",
      "title": "APIv2",
      "description": "We deprecated the `current_user_device_credentials` scopes in the `/api/v2/device-credentials` endpoint for `POST` and `DELETE` methods. To use this endpoint we enabled **Basic authentication** with username and password from a database connection."
    },
    {
      "id": "2FMkbF447VuaYj1M1mbMSY",
      "date": "2016-03-15",
      "displayDate": "March 15, 2016",
      "version": null,
      "type": "added",
      "title": "Enterprise Connections",
      "description": "Added new `ext_nested_groups` option to `waad` connection strategy. When both `ext_groups` and `ext_nested_groups` are enabled we return all the groups that the user is a member of instead of only returning the ones that the user is direct member (for more information see this [MSDN article](https://msdn.microsoft.com/Library/Azure/Ad/Graph/api/users-operations#UserFunctions))"
    },
    {
      "id": "1A9GOFNkmOOb1ApYKbHj6b",
      "date": "2016-03-15",
      "displayDate": "March 15, 2016",
      "version": null,
      "type": "added",
      "title": "Dashboard / Management API",
      "description": "Users can now specify a list of URLs that are valid to redirect to after logging out from Auth0. The update can be done either from the [Dashboard](https://manage.auth0.com/#/account/advanced) or using the  [Management API](https://auth0.com/docs/api/v2#!/Tenants/patch_settings)."
    },
    {
      "id": "4g1VSIfJf6nWTc81XCRTg8",
      "date": "2016-03-14",
      "displayDate": "March 14, 2016",
      "version": null,
      "type": "added",
      "title": "Management API",
      "description": "The `device-credentials` endpoint now supports basic authentication to perform `GET`, `POST`, and `DELETE` requests."
    },
    {
      "id": "5Cg5Ua5FEckWRdaK7NjRfv",
      "date": "2016-03-11",
      "displayDate": "March 11, 2016",
      "version": null,
      "type": "added",
      "title": "Extensions Gallery",
      "description": "Extensions Gallery updated!   \n\n\nThis new version allows you to create your own extensions. ![extensions](https://cdn2.auth0.com/content/img/extensions-custom.gif)"
    },
    {
      "id": "6YBtYVQ9kfQzaLv4FmOMuW",
      "date": "2016-03-01",
      "displayDate": "March 1, 2016",
      "version": null,
      "type": "changed",
      "title": "Auth0 Lock v9",
      "description": "The flow to reset a password has been updated.   \n\n\nIn this new flow, users enter their username or email address and receive an email with instructions to choose a new password. The old flow which required users to enter their new password and then confirm the change via email is still available but has been deprecated: it is no longer available for new tenants and existing tenants are recommended to disable it."
    },
    {
      "id": "3b1qlOUhIyMW0ww0cKYAk8",
      "date": "2016-03-01",
      "displayDate": "March 1, 2016",
      "version": null,
      "type": "changed",
      "title": "Auth0 Lock v9",
      "description": "The flow to reset a password has been updated.   \n\n\nIn this new flow, users enter their username or email address and receive an email with instructions to choose a new password. The old flow which required users to enter their new password and then confirm the change via email is still available but has been deprecated: it is no longer available for new tenants and existing tenants are recommended to disable it."
    },
    {
      "id": "xEqyjgb1Mz9512Tqt89UV",
      "date": "2016-02-29",
      "displayDate": "February 29, 2016",
      "version": null,
      "type": "added",
      "title": "extensions",
      "description": "Extensions Gallery updated.  \n\n\nThis new version gives users the possibility to search for an extension, easily check which ones are installed and access to more information about an extension before installing it. Also, includes new extensions such as `Auth0 logs to Loggly`, `Auth0 logs to Azure blob storage`, `Auth0 logs to Application Insights`, `Auth0 AD/LDAP Connector Health Monitor` and `Auth0 Authentication API webhooks` ![extensions](https://cdn2.auth0.com/content/img/extensions-new-design.png)"
    },
    {
      "id": "32IpKaSUdYEnIEAiOBXS1c",
      "date": "2016-02-26",
      "displayDate": "February 26, 2016",
      "version": null,
      "type": "added",
      "title": "Management API",
      "description": "Users can query logs using the **Management API v2**.   \n\n\nYou can use the new `logs` endpoints to query logs. This is the new recommended way to query logs. The **API v1** logs endpoints will still be functional. See more info in the [docs](https://auth0.com/docs/api/v2#!/Logs/get_logs)."
    },
    {
      "id": "3Lypw1nw4jKbasrnypsBTm",
      "date": "2015-11-21",
      "displayDate": "November 21, 2015",
      "version": null,
      "type": "deprecated",
      "title": "SDKs",
      "description": "The Auth0.Android SDK has deprecated the usage of the WebView for authentication. All web authentication should be done using the Browser. See the [changelog entry](https://github.com/auth0/Auth0.Android/blob/master/CHANGELOG.md#111-2015-11-21) for more information."
    }
  ];

  const TAG_META = {
    added: { label: "Added" },
    updated: { label: "Updated" },
  };
  const TAG_PILL_CLASS =
    "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400";
  const ALL_TAGS = Object.keys(TAG_META);
  const MONTH_PAGE_SIZE = 3;

  const norm = (s) => s.normalize("NFKD").toLowerCase().trim();

  const ordinal = (n) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  const formatEntryDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${ordinal(d.getDate())} ${d.toLocaleDateString("en-US", { month: "long" })}`;
  };

  const useQueryParamState = (key, initial = "") => {
    const [value, setValue] = useState(() => {
      if (typeof window === "undefined") return initial;
      const url = new URL(window.location.href);
      return url.searchParams.get(key) ?? initial;
    });

    useEffect(() => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
      window.history.replaceState({}, "", url.toString());
    }, [key, value]);

    return [value, setValue];
  };

  const highlight = (text, query) => {
    if (!query) return text;
    const i = norm(text).indexOf(norm(query));
    if (i < 0) return text;
    const end = i + query.length;
    return (
      <>
        {text.slice(0, i)}
        <mark>{text.slice(i, end)}</mark>
        {text.slice(end)}
      </>
    );
  };

  const INLINE_RE = /(\*\*[^*]+\*\*|`[^`]+`|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g;

  const parseInline = (text, keyPrefix) => {
    return text
      .split(INLINE_RE)
      .filter((part) => part)
      .map((part, i) => {
        const key = `${keyPrefix}-${i}`;
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          return <strong key={key}>{part.slice(2, -2)}</strong>;
        }
        if (/^`[^`]+`$/.test(part)) {
          return <code key={key}>{part.slice(1, -1)}</code>;
        }
        const imgMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgMatch) {
          return (
            <img
              key={key}
              src={imgMatch[2]}
              alt={imgMatch[1]}
              className="my-3 max-w-full rounded-lg border border-gray-200 dark:border-gray-800"
            />
          );
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return (
            <a
              key={key}
              href={linkMatch[2]}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 underline hover:no-underline dark:text-indigo-300"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return part;
      });
  };

  const renderDescription = (text) => {
    const blocks = text
      .split(/\n\n+/)
      .map((b) => b.trim())
      .filter(Boolean);

    return blocks.map((block, bi) => {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));

      if (isList) {
        return (
          <ul key={bi} className="my-2 list-disc space-y-1 pl-5">
            {lines.map((l, li) => (
              <li key={li}>{parseInline(l.slice(2), `${bi}-${li}`)}</li>
            ))}
          </ul>
        );
      }

      if (/^!\[[^\]]*\]\([^)]+\)$/.test(block)) {
        return <div key={bi}>{parseInline(block, `${bi}`)}</div>;
      }

      return (
        <p key={bi} className="my-2">
          {parseInline(lines.join(" "), `${bi}`)}
        </p>
      );
    });
  };

  const [term, setTerm] = useQueryParamState("term", "");
  const [activeTag, setActiveTag] = useState("all");
  const [visibleCount, setVisibleCount] = useState(MONTH_PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = norm(term);
    return CHANGELOG.filter((entry) => {
      if (!ALL_TAGS.includes(entry.type)) return false;
      if (activeTag !== "all" && entry.type !== activeTag) return false;
      if (!q) return true;
      return (
        norm(entry.title).includes(q) ||
        norm(entry.description).includes(q) ||
        (entry.version && norm(entry.version).includes(q))
      );
    });
  }, [term, activeTag]);

  const [showVersionSuggestions, setShowVersionSuggestions] = useState(false);

  const versionSuggestions = useMemo(() => {
    const q = norm(term);
    if (!q) return [];
    return CHANGELOG.filter(
      (entry) =>
        entry.version &&
        ALL_TAGS.includes(entry.type) &&
        (activeTag === "all" || entry.type === activeTag) &&
        norm(entry.version).includes(q)
    ).slice(0, 8);
  }, [term, activeTag]);

  useEffect(() => {
    setVisibleCount(MONTH_PAGE_SIZE);
  }, [term, activeTag]);

  const monthGroups = useMemo(() => {
    const map = new Map();
    for (const entry of filtered) {
      const d = new Date(entry.date || entry.displayDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!map.has(key)) {
        map.set(key, { key, label: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }), items: [] });
      }
      map.get(key).items.push(entry);
    }
    return Array.from(map.values());
  }, [filtered]);

  const visibleMonths = monthGroups.slice(0, visibleCount);

  return (
    <div className="pb-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl">
        {/* Info banner — subscribe / status / support / social links */}
        <div className="mt-2 mb-4 flex gap-3 overflow-hidden rounded-2xl border border-sky-500/20 bg-sky-500/10 px-5 py-4">
          <div className="mt-0.5 w-4 flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-sky-500"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="8" y1="13" x2="16" y2="13"></line>
              <line x1="8" y1="17" x2="16" y2="17"></line>
            </svg>
          </div>
          <div className="min-w-0 w-full text-sm leading-relaxed text-sky-800 dark:text-sky-300">
            <p className="m-0">
              Stay up to date — subscribe via{" "}
              <a
                href="https://auth0.com/changelog/atom.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-current underline hover:no-underline"
              >
                Atom
              </a>{" "}
              or{" "}
              <a
                href="https://auth0.com/changelog/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-current underline hover:no-underline"
              >
                RSS
              </a>
              , check the{" "}
              <a
                href="https://status.auth0.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-current underline hover:no-underline"
              >
                Auth0 Status Page
              </a>
              , visit{" "}
              <a
                href="https://support.auth0.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-current underline hover:no-underline"
              >
                Auth0 Support
              </a>
              , or follow{" "}
              <a
                href="https://twitter.com/auth0"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-current underline hover:no-underline"
              >
                @auth0 on Twitter
              </a>
              .
            </p>
          </div>
        </div>

        {/* Tag filters + search, single row */}
        <div className="mb-8 flex flex-nowrap items-end gap-2">
          <button
            onClick={() => setActiveTag("all")}
            className={`flex-shrink-0 rounded-xl border px-3 py-1.5 text-sm font-medium transition ${
              activeTag === "all"
                ? "border-transparent bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                : "border-gray-300 bg-transparent text-gray-500 dark:border-gray-700 dark:text-gray-400"
            }`}
          >
            All
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex-shrink-0 rounded-xl border px-3 py-1.5 text-sm font-medium transition ${
                activeTag === tag
                  ? "border-transparent bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                  : "border-gray-300 bg-transparent text-gray-500 dark:border-gray-700 dark:text-gray-400"
              }`}
            >
              {TAG_META[tag].label}
            </button>
          ))}
          <div className="relative ml-auto min-w-[160px] max-w-xs flex-1">
            <div className="flex h-9 items-center rounded-lg border border-gray-300 bg-white pl-3 pr-3 focus-within:border-indigo-500 dark:border-gray-700 dark:bg-black dark:focus-within:border-indigo-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="pointer-events-none flex-shrink-0 text-gray-500 dark:text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search the changelog"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onFocus={() => setShowVersionSuggestions(true)}
                onBlur={() => setTimeout(() => setShowVersionSuggestions(false), 150)}
                className="h-full w-full border-0 bg-transparent pl-2 text-sm text-gray-900 outline-none dark:text-gray-100"
              />
            </div>
            {showVersionSuggestions && versionSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
                {versionSuggestions.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => {
                      setTerm(entry.version);
                      setShowVersionSuggestions(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <span className="font-medium">{entry.version}</span>
                    <span className="ml-2 truncate text-xs text-gray-500 dark:text-gray-400">{entry.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Changelog list, grouped by month */}
        {visibleMonths.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No changelog entries match your filters.</p>
        )}
        {visibleMonths.map((month) => (
          <section key={month.key}>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {month.items.map((entry) => (
                <div key={entry.id} className="flex gap-4 py-5">
                  <div className="w-40 flex-shrink-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {formatEntryDate(entry.date)}
                      </span>
                      <span className={TAG_PILL_CLASS}>{TAG_META[entry.type].label}</span>
                    </div>
                    {entry.version && (
                      <div className="text-xs text-gray-400 dark:text-gray-500">{entry.version}</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="m-0 text-base font-semibold">{highlight(entry.title, term)}</h3>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {renderDescription(entry.description)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {visibleCount < monthGroups.length && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + MONTH_PAGE_SIZE)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
