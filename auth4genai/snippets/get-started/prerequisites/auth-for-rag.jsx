export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  appCreation = true,
}) => {
  const steps = [
    <Step title="Create an Auth0 FGA account">
      You need an{" "}
      <a href="https://dashboard.fga.dev/" target="_blank">
        Auth0 FGA account
      </a>{" "}
      to complete this quickstart.
    </Step>,
  ];

  if (appCreation) {
    steps.push(
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
    );
    steps.push(
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
    );
  }

  steps.push(
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
      <h3>Prerequisites</h3>
      Before getting started, make sure you:
      <Steps>{steps}</Steps>
    </>
  );
};
