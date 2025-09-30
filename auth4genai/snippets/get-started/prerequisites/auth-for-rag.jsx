import { AccountAndAppSteps } from "/snippets/get-started/prerequisites/account-app-steps.jsx";

export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  appCreation = true,
  createAuth0ApiStep = undefined,
}) => {
  const steps = [];

  if (appCreation) {
    steps.push(...AccountAndAppSteps({ callbackUrl, logoutUrl, appCreation }));
  }

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
    <Step title="Create an Auth0 FGA account">
      You need an{" "}
      <a href="https://dashboard.fga.dev/" target="_blank">
        Auth0 FGA account
      </a>{" "}
      to complete this quickstart.
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
      Before getting started, make sure you:
      <Steps>{steps}</Steps>
    </>
  );
};
