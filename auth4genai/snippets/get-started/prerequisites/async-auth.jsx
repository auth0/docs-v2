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
        <Step title="Create an Auth0 Application" className="hidden">
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
        <Step title="Enable CIBA Grant">
          Enable the Token Exchange Grant for your Auth0 Application. Go to{" "}
          <strong>
            Applications &gt; [Your Application] &gt; Settings &gt; Advanced
            &gt; Grant Types
          </strong>{" "}
          and enable the{" "}
          <strong>Client Initiated Backchannel Authentication (CIBA)</strong>{" "}
          grant type.
        </Step>

        <Step title="Enable Guardian Push">
          Enable Mutli-factor authentication (MFA) with Guardian Push
          Notifications for your Auth0 tenant. To learn more about MFA with
          Guardian, read the{" "}
          <a
            href="https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian"
            target="_blank"
          >
            Auth0 Guardian documentation
          </a>
          .
        </Step>

        <Step title="Enroll your user to use Auth0 Guardian">
          To initiate a CIBA push request, the authorizing user must be enrolled
          in MFA using push notifications. To verify if the authorizing user is
          enrolled for MFA push notifications in the{" "}
          <a href="http://manage.auth0.com/" target="_blank">
            Auth0 Dashboard
          </a>
          , navigate to <strong>User Management &gt; Users</strong> and click on
          the user. Under <strong>Multi-Factor Authentication</strong>, Auth0
          lists the factors the user is enrolled in:
          <Frame>
            <img
              src="/ai/docs/img/user_enrolled_in_auth0_guardian.png"
              alt="User Enrolled in Auth0 Guardian"
            />
          </Frame>
          If the user is not enrolled, you can send an enrollment request by
          email:
          <Frame>
            <img
              src="/ai/docs/img/enroll_user_in_auth0_guardian.png"
              alt="Enable Guardian Push Screenshot"
            />
          </Frame>
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
