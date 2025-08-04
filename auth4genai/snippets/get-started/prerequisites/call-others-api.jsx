export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
}) => {
  return (
    <>
      <h3>Prerequisites</h3>
      Before getting started, make sure you have completed the following steps:
      <Steps>
        <Step title="Create an Auth0 Account and a Dev Tenant">
          To continue with this quickstart, you need an{" "}
          <a
            href="https://auth0.com/signup?onboard_app=genai&ocid=7014z000001NyoxAAC-aPA4z0000008OZeGAM"
            target="_blank"
          >
            Auth0 account
          </a>{" "}
          and a Developer Tenant.
        </Step>
        <Step title="Create an Auth0 Application">
          <a href="https://manage.auth0.com/dashboard" target="_blank">
            Create and configure an Auth0 Application
          </a>{" "}
          with the following properties:
          <ul>
            <li>
              Type: <code>Regular Web</code>
            </li>
            <li>
              Allowed Callback URLs: <code>{callbackUrl}</code>
            </li>
            <li>
              Allowed Logout URLs: <code>{logoutUrl}</code>
            </li>
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
        <Step title="Enable Token Exchange Grant">
          Enable the Token Exchange Grant for your Auth0 Application. Go to{" "}
          <strong>
            Applications &gt; [Your Application] &gt; Settings &gt; Advanced
            &gt; Grant Types
          </strong>{" "}
          and enable the <strong>Token Exchange</strong> grant type.
        </Step>

        <Step title="Configure Google Social Connection">
          Set up a Google developer account that allows for third-party API
          calls following the{" "}
          <a href="/ai/docs/guides/google-sign-in-and-auth">
            Google Sign-in and Authorization
          </a>{" "}
          instructions.
        </Step>

        <Step title="OpenAI Platform">
          Set up an{" "}
          <a
            href="https://platform.openai.com/docs/libraries#create-and-export-an-api-key"
            target="_blank"
          >
            OpenAI account and API key
          </a>
          .
        </Step>
      </Steps>
    </>
  );
};
