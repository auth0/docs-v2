export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  allowedWebOrigins,
  applicationType = "Regular Web",
  refreshTokenGrantStep = false,
  refreshTokenGrantStepApplicationName = 'Auth0 Application',
  createAuth0ApiStep = false,
  createResourceServerClientStep = false,
  tokenExchangeGrantStepApplicationName = 'Auth0 Application',
}) => {
  // Build steps array dynamically based on conditions
  const steps = [];

  // Always include these steps
  steps.push(
    <Step key="auth0-account" title="Create an Auth0 Account and a Dev Tenant">
      To continue with this quickstart, you need an{" "}
      <a
        href="https://auth0.com/signup?onboard_app=genai&ocid=7014z000001NyoxAAC-aPA4z0000008OZeGAM"
        target="_blank"
      >
        Auth0 account
      </a>{" "}
      and a Developer Tenant.
    </Step>
  );

  steps.push(
    <Step key="auth0-application" title="Create an Auth0 Application">
      <a href="https://manage.auth0.com/dashboard" target="_blank">
        Create and configure an Auth0 Application
      </a>{" "}
      with the following properties:
      <ul>
        <li>
          Type: <code>{applicationType}</code>
        </li>
        <li>
          Allowed Callback URLs: <code>{callbackUrl}</code>
        </li>
        <li>
          Allowed Logout URLs: <code>{logoutUrl}</code>
        </li>
        {allowedWebOrigins && (
          <li>
            Allowed Web Origins: <code>{allowedWebOrigins}</code>
          </li>
        )}
      </ul>
      To learn more about Auth0 applications, read{" "}
      <a
        href="https://auth0.com/docs/get-started/applications"
        target="_blank"
      >
        Applications
      </a>
      .
    </Step>
  );

  // Conditionally add steps
  if (refreshTokenGrantStep) {
    steps.push(
      <Step key="refresh-token" title="Enable Refresh Token Grant">
        Enable the Refresh Token Grant for your {refreshTokenGrantStepApplicationName}. Go to{" "}
        <strong>
          Applications &gt; [Your Application] &gt; Settings &gt; Advanced
          &gt; Grant Types
        </strong>{" "}
        and enable the <strong>Refresh Token</strong> grant type.
      </Step>
    );
  }

  if (createAuth0ApiStep) {
    steps.push(
      <Step key="auth0-api" title="Create an Auth0 API">
        Create an Auth0 API:
        <ul>
          <li>
            In your Auth0 Dashboard, go to APIs
          </li>
          <li>
            Create a new API with an identifier (audience)
          </li>
          <li>
            Make sure to "Allow Offline Access" in Access Settings
          </li>
          <li>
            Note down the API identifier for your environment variables
          </li>
        </ul>
        To learn more about Auth0 APIs, read{" "}
        <a
          href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis"
          target="_blank"
        >
          APIs
        </a>
        .
      </Step>
    );
  }

  if (createResourceServerClientStep) {
    steps.push(
      <Step key="resource-server" title="Create a Resource Server Client">
        This is a special client that allows your API server to perform token exchanges using <b><i>access tokens</i></b> instead of <b><i>refresh tokens</i></b>. This client enables Token Vault to exchange an access token for an external API access token (e.g., Google Calendar API).
        <br /><br/>
        Create this client programmatically via the Auth0 Management API:
        <pre>
          <code>
{`curl -L 'https://{tenant}.auth0.com/api/v2/clients' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'Authorization: Bearer {MANAGEMENT_API_TOKEN}' \\
-d '{
  "name": "Calendar API Resource Server Client",
  "app_type": "resource_server",
  "grant_types": ["urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token"],
  "resource_server_identifier": "YOUR_API_IDENTIFIER"
}'`}
          </code>
        </pre>
        <ul>
          <li>
            Note that your <code>MANAGEMENT_API_TOKEN</code> above must have the <code>create:clients</code> scope in order to create a new client. One way you can create a new token with this access is by doing the following:
            <ul>
              <li>
                Navigate to APIs {'->'} Auth0 Management API {'->'} API Explorer tab in your tenant
              </li>
              <li>
                Hit the "Create & Authorize Test Application" button
              </li>
              <li>
                Copy the jwt access token shown and provide it as the <code>MANAGEMENT_API_TOKEN</code>
              </li>
            </ul>
          </li>
          <li>
            Note down the <code>client_id</code> and <code>client_secret</code> returned for your environment variables after running curl successfully.
          </li>
        </ul>
      </Step>
    );
  }

  // Always include these final steps
  steps.push(
    <Step key="token-exchange" title="Enable Token Exchange Grant">
      Enable the Token Exchange Grant for your {tokenExchangeGrantStepApplicationName}. Go to{" "}
      <strong>
        Applications &gt; [Your Application] &gt; Settings &gt; Advanced
        &gt; Grant Types
      </strong>{" "}
      and enable the <strong>Token Exchange</strong> grant type.
    </Step>
  );

  steps.push(
    <Step key="google-connection" title="Configure Google Social Connection">
      Set up a Google developer account that allows for third-party API
      calls following the{" "}
      <a href="/guides/google-sign-in-and-auth">
        Google Sign-in and Authorization
      </a>{" "}
      instructions.
    </Step>
  );

  steps.push(
    <Step key="openai" title="OpenAI Platform">
      Set up an{" "}
      <a
        href="https://platform.openai.com/docs/libraries#create-and-export-an-api-key"
        target="_blank"
      >
        OpenAI account and API key
      </a>
      .
    </Step>
  );

  return (
    <>
      <Heading level={3} id="prerequisites">
        Prerequisites
      </Heading>
      Before getting started, make sure you have completed the following steps:
      <Steps>
        {steps}
      </Steps>
    </>
  );
};
