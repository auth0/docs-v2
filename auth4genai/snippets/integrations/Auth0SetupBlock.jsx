export const Auth0SetupBlock = ({
  providerName,
  clientIDName = "Client ID",
  clientSecretName = "Client Secret",
  scopesName = "Permissions",
  allowFreeFormScopes = false,
}) => {
  return (
    <>
      <ol>
        <li>
          In the <a href="https://manage.auth0.com">Auth0 Dashboard</a>, go to{" "}
          <b>Authentication &gt; Social</b>.
        </li>
        <li>
          Select <b>Create Connection</b>, then choose <b>{providerName}</b>.
        </li>
        <li>Click <b>Continue</b>.</li>
        <li>
          In <b>General</b>:
          <ol type="A">
            <li>
              Enter the <b>{clientIDName}</b> and <b>{clientSecretName}</b> from
              your {providerName} OAuth app.
            </li>
            <li>
              Under <b>{scopesName}</b>, select the scope(s) required for your
              application. These determine what permissions your application can
              request from {providerName}, whether for authentication (such as
              accessing basic profile details) or for API access (such as
              connecting to the provider's APIs).<br/><br/>For a Dropbox and Google social
              connection, you must select <b>Offline Access</b> in the Auth0 Dashboard, enabling
              the client application to obtain an Auth0 refresh token.
            </li>
            {allowFreeFormScopes && (
              <li>
                Add any additional scopes your application requires in the{" "}
                <b>Additional Scopes</b> field.
              </li>
            )}
          </ol>
        </li>
        <li>
          In <b>Purpose</b>, toggle on <b>Use for Connected Accounts for Token Vault</b>. This lets the
          connection retrieve and securely store access tokens for external
          APIs. Learn more in{" "}
          <a href="https://auth0.com/docs/secure/tokens/token-vault/connected-accounts-for-token-vault">
            Connected Accounts for Token Vault
          </a>.
        </li>
        <li>Click <b>Create</b>.</li>
        <li>
          After creation, you are redirected to the <b>Applications</b> page.
          Select the application(s) to enable this connection for.
          <br />
          Note: In a new Auth0 tenant, you can select the <b>Default App</b>.
        </li>
        <li>
          Once you have created your {providerName} social connection, <a href="https://auth0.com/docs/authenticate/identity-providers/test-connections">test your connection</a> to ensure the setup is working correctly before using it in your application.
        </li>
      </ol>
    </>
  );
};
