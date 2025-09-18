export const AuthenticationApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          The Authentication API exposes identity functionality for Auth0 and supported identity protocols (including
          OpenID Connect, OAuth, and SAML).
        </p>
        <p className="mt-3">
          Typically, you should consume this API through one of the Auth0 SDKs, such as{" "}
          <a href="/docs/libraries/auth0js">Auth0.js</a>, or a library like <a href="/docs/libraries/lock">Lock</a>.
          However, if you are building your authentication UI manually, you will need to call the Authentication API
          directly.
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>Some example tasks include:</p>
        <ul className="space-y-2 !mt-0">
          <li>
            Get <a href="/docs/secure/tokens">tokens</a> during authentication
          </li>
          <li>
            Request a user's profile using an <a href="/docs/secure/tokens/access-tokens">Access Token</a>
          </li>
          <li>
            Exchange <a href="/docs/secure/tokens/refresh-tokens">Refresh Tokens</a> for new Access Tokens
          </li>
          <li>
            Request a challenge for{" "}
            <a href="/docs/secure/multi-factor-authentication">multi-factor authentication (MFA)</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const ManagementApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          The Management API allows you to manage your Auth0 account programmatically, so you can automate configuration
          of your environment. Most of the tasks you can perform in the Auth0 Management Dashboard can also be performed
          programmatically by using this API.
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>Some example tasks include:</p>
        <ul className="space-y-2 !mt-0">
          <li>Register your applications and APIs with Auth0</li>
          <li>
            Set up <a href="/docs/connections">connections</a> with which your users can authenticate
          </li>
          <li>
            <a href="/docs/manage-users">Manage users</a>
          </li>
          <li>
            <a href="/docs/manage-users/user-accounts/user-account-linking/link-user-accounts">Link user accounts</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const MyAccountApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          The Auth0 My Account API provides a dedicated set of endpoints for users to manage their own account
          information. You can use these APIs to build self-service experiences in your applications or progressively
          add details to a user account.
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>Some example tasks include:</p>
        <ul className="space-y-2 !mt-0">
          <li>Allow end-user to manage their own factors</li>
          <li>Update details of an authentication method</li>
          <li>Know what authentication methods are available</li>
        </ul>
      </div>
    </div>
  );
};
