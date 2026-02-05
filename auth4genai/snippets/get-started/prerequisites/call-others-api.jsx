import { AccountAndAppSteps } from "/snippets/get-started/prerequisites/account-app-steps.jsx";

/**
 * Prerequisites for call-others-api quickstarts.
 * @param {Object} props - The props object
 *
 * @param {Object|undefined} [props.createAuth0ApplicationStep] - Configuration for Auth0 application creation step
 * @param {string} [props.createAuth0ApplicationStep.applicationType] - Type of Auth0 application (e.g., "Regular Web")
 * @param {string} [props.createAuth0ApplicationStep.callbackUrl] - Allowed callback URL for the application
 * @param {string} [props.createAuth0ApplicationStep.logoutUrl] - Allowed logout URL for the application
 * @param {string|undefined} [props.createAuth0ApplicationStep.allowedWebOrigins] - Allowed web origins for the application
 * @param {boolean} [props.createAuth0ApplicationStep.enableTokenVaultGrant] - Enable Token Vault Grant for the application
 * @param {boolean} [props.createAuth0ApplicationStep.enableRefreshTokenGrant] - Enable Refresh Token Grant for the application
 * @param {boolean|undefined} [props.createAuth0ApplicationStep.enableAllowRefreshTokenRotation] - Enable or Disable Allow Refresh Token Rotation for the application (omitted if undefined)
 *
 * @param {Object|undefined} [props.createAuth0ApiStep] - Configuration for Auth0 API creation step
 *
 * @param {Object|undefined} [props.createResourceServerClientStep] - Configuration for resource server client creation step
 *
 * @returns {JSX.Element} A React component containing prerequisite steps
 */

export const Prerequisites = ({
  createAuth0ApplicationStep = {
    applicationType: "Regular Web Applications",
    callbackUrl: "http://localhost:3000/auth/callback",
    logoutUrl: "http://localhost:3000",
    allowedWebOrigins: undefined,
    enableTokenVaultGrant: undefined,
    enableRefreshTokenGrant: undefined,
    enableAllowRefreshTokenRotation: undefined,
  },
  createAuth0ApiStep = undefined,
  createResourceServerClientStep = undefined,
}) => {
  // Build steps array dynamically based on conditions
  const steps = [];

  steps.push(
    ...AccountAndAppSteps({
      applicationType: createAuth0ApplicationStep.applicationType,
      callbackUrl: createAuth0ApplicationStep.callbackUrl,
      logoutUrl: createAuth0ApplicationStep.logoutUrl,
      appCreation: !!createAuth0ApplicationStep,
      allowedWebOrigins: createAuth0ApplicationStep.allowedWebOrigins,
      enableTokenVaultGrant: createAuth0ApplicationStep.enableTokenVaultGrant,
      enableRefreshTokenGrant: createAuth0ApplicationStep.enableRefreshTokenGrant,
      enableAllowRefreshTokenRotation: createAuth0ApplicationStep.enableAllowRefreshTokenRotation,
    })
  );

  if (createAuth0ApiStep) {
    steps.push(
      <Step key="auth0-api" title="Create a Custom API">
        A Custom API is an API you own that you want to secure using Auth0.
        <ul>
          <li>
            In your Auth0 Dashboard, go to{" "}
            <a href="https://manage.auth0.com/#/apis" target="_blank"><strong>Applications &gt; APIs</strong></a>.
          </li>
          <li>Create a new API with an identifier (audience), for example, <code>https://my-custom-api.com</code>.</li>
          <li>
            Once API is created, go to the APIs{" "}
            <strong>Settings &gt; Access Settings</strong> and enable{" "}
            <strong>Allow Offline Access</strong>.
          </li>
          <li>Note down the API identifier for your environment variables. You will use the API identifier as the audience parameter in token requests (<code>AUTH0_AUDIENCE</code>).</li>
        </ul>
      </Step>
    );
  }

  if (createResourceServerClientStep) {
    steps.push(
      <Step key="resource-server" title="Create a Custom API Client">
        The Custom API Client allows your API server to perform token
        exchanges using{" "}
        <strong>
          <i>access tokens</i>
        </strong>{" "}
        instead of{" "}
        <strong>
          <i>refresh tokens</i>
        </strong>
        . This client enables Token Vault to exchange an access token for an
        external API access token (e.g., Google Calendar API).
        <br />
        <ul>
              <li>
               From the <strong>Settings</strong> page of the API that you just created, click the <strong>Add Application</strong> button in the right top corner. This will open a modal to create a new Custom API Client.
              </li>
              <li>
                Give your Custom API Client a name in the Application Name field and click the <strong>Add</strong> button to create a new Custom API Client.
              </li>
          <li>
            After creation is successful, you should be redirected to the settings page for your newly created Custom API Client application. Note down the <code>client id</code> and <code>client secret</code>{" "}for your environment variables.
          </li>
        </ul>
      </Step>
    );
  }
  // Always include these final steps

  steps.push(
    <Step key="my-account-api" title="Configure My Account API">
      The Connected Accounts flow uses the <a href="https://auth0.com/docs/manage-users/my-account-api" target="_blank">My Account API</a> to create and manage connected accounts for a user across supported external providers.<br/><br/>
      In the Auth0 Dashboard, configure the My Account API:
      <ul>
        <li>Navigate to <a href="https://manage.auth0.com/#/apis" target="_blank"><strong>Applications &gt; APIs</strong></a>, locate the My Account API banner, and select <strong>Activate</strong> to activate the Auth0 My Account API.</li>
        <li>Once activated, select <strong>Auth0 My Account API</strong> and then select the <strong>Application Access</strong> tab.
          <ul>
            <li>Find your client application and select <strong>Edit</strong> to configure its <a href="https://www.auth0.com//docs/get-started/apis/api-access-policies-for-applications" target="_blank">application access policies</a>.</li>
            <li>Select <strong>User Access</strong> and under <strong>Authorization</strong>, select <strong>Authorized</strong>.</li>
            <li>For the permissions, select <strong>All</strong> the <a href="https://www.auth0.com/docs/manage-users/my-account-api#scope" target="_blank">Connected Accounts scopes</a> for the application.</li>
            <li>Select <strong>Save</strong>. This creates a <a href="https://www.auth0.com/docs/get-started/applications/application-access-to-apis-client-grants" target="_blank">client grant</a> that allows your client application to access the My Account API with the Connected Accounts scopes on the user’s behalf.</li>
          </ul>
        </li>
        <li>Next, navigate to the <strong>Settings</strong> tab. Under <strong>Access Settings</strong>, select <strong>Allow Skipping User Consent</strong>.</li>
      </ul>
    </Step>
  );

  steps.push(<Step key="mrrt-policy" title="Define a Multi-Resource Refresh Token policy for your Application">
      After your web application has been granted access to the My Account API, you will also need to leverage the <a href="https://auth0.com/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token" target="_blank">Multi-Resource Refresh Token</a> feature, which enables the refresh token delivered to your application to also obtain an access token to call the My Account API. <br/><br/>
      You can quickly define a <a href="https://auth0.com/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token/configure-and-implement-multi-resource-refresh-token" target="_blank">refresh token policy</a> for your application to use when requesting access tokens for the My Account API by doing the following:
      <ul>
        <li>Navigate to <a href="https://manage.auth0.com/#/applications" target="_blank"><strong>Applications &gt; Applications</strong></a> and select your client application.</li>
        <li>On the <strong>Settings</strong> tab, scroll down to the <strong>Multi-Resource Refresh Token</strong> section.</li>
        <li>Select <strong>Edit Configuration</strong> and then enable the MRRT toggle for the <strong>Auth0 My Account API</strong>.</li>
      </ul>
  </Step>)

  steps.push(
    <Step key="google-connection" title="Configure Google Social Integration">
      Set up a Google developer account that allows for external API calls by
      following the <a href="/integrations/google">Google Social Integration</a>{" "}
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
      <Steps>{steps}</Steps>
    </>
  );
};
