import { AccountAndAppSteps } from "/snippets/get-started/prerequisites/account-app-steps.jsx";

export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  createAuth0ApiStep = undefined,
}) => {
  const steps = AccountAndAppSteps({ callbackUrl, logoutUrl });

  if (createAuth0ApiStep) {
    steps.push(
      <Step key="auth0-api" title="Create an Auth0 API">
        <ul>
          <li>
            In your Auth0 Dashboard, go to{" "}
            <strong>Applications &gt; APIs</strong>.
          </li>
          <li>Create a new API with an identifier (audience).</li>
          <li>
            Once API is created, go to the APIs{" "}
            <strong>Settings &gt; Access Settings</strong> and enable{" "}
            <strong>Allow Offline Access</strong>.
          </li>
          <li>Note down the API identifier for your environment variables.</li>
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

  steps.push(
    <Step title="Enable CIBA Grant">
      Enable the CIBA Grant for your Auth0 Application. Go to{" "}
      <strong>
        Applications &gt; [Your Application] &gt; Settings &gt; Advanced &gt;
        Grant Types
      </strong>{" "}
      and enable the{" "}
      <strong>Client Initiated Backchannel Authentication (CIBA)</strong> grant
      type.
    </Step>,

    <Step title="Enable Guardian Push">
      Enable Mutli-factor authentication (MFA) with Guardian Push Notifications
      for your Auth0 tenant. To learn more about MFA with Guardian, read the{" "}
      <a
        href="https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian"
        target="_blank"
      >
        Auth0 Guardian documentation
      </a>
      .
    </Step>,

    <Step title="Enroll your user to use Auth0 Guardian">
      To initiate a CIBA push request, the authorizing user must be enrolled in
      MFA using push notifications. To verify if the authorizing user is
      enrolled for MFA push notifications in the{" "}
      <a href="http://manage.auth0.com/" target="_blank">
        Auth0 Dashboard
      </a>
      , navigate to <strong>User Management &gt; Users</strong> and click on the
      user. Under <strong>Multi-Factor Authentication</strong>, Auth0 lists the
      factors the user is enrolled in:
      <Frame>
        <img
          src="/ai/docs/img/user_enrolled_in_auth0_guardian.png"
          alt="User Enrolled in Auth0 Guardian"
        />
      </Frame>
      If the user is not enrolled, you can send an enrollment request by email:
      <Frame>
        <img
          src="/ai/docs/enroll_user_in_auth0_guardian.png"
          alt="Enable Guardian Push Screenshot"
        />
      </Frame>
    </Step>,

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
