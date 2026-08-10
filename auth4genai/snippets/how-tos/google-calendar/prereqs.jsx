export const GoogleCalendarPrereqs = ({
  lang,
  createCustomApiClientStep = false,
}) => {
  const languageSteps = [];

  if (lang === "js") {
    languageSteps.push(
      <Step
        title={
          <>
            Install Node.js 20+ and <code>npm</code>
          </>
        }
      />,
    );
  } else if (lang === "python") {
    languageSteps.push(
      <Step
        title={
          <>
            Install Python 3.11+ and <code>pip</code>
          </>
        }
      />
    );
  }

  const commonSteps = [
    <Step
      title={
        <>
          Complete the{" "}
          <a href="/get-started/user-authentication">
            User authentication quickstart
          </a>{" "}
          to create an application integrated with Auth0.
        </>
      }
    />,
    <Step
      title={
        <>
          <a
            href="https://platform.openai.com/docs/quickstart?api-mode=chat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Set up an OpenAI API key
          </a>
          .
        </>
      }
    />,
    <Step title="Set up and configure a Google Cloud project">
      <ul>
        <li>
          Enable the{" "}
          <a
            href="https://console.cloud.google.com/apis/library/calendar-json.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Calendar API
          </a>
          .
        </li>
        <li>
          Create OAuth 2.0 credentials (Web Application) with proper redirect
          URIs.
        </li>
      </ul>
    </Step>,
    <Step
      title={
        <>
          Configure a{" "}
          <a
            href="https://marketplace.auth0.com/integrations/google-social-connection"
            target="_blank"
            rel="noopener noreferrer"
          >
            Social Connection for Google in Auth0
          </a>
        </>
      }
    >
      <ul>
        <li>
          Under the <strong>Purpose</strong> section, make sure to enable the{" "}
          <code>Use for Connected Accounts with Token Vault</code> toggle.
        </li>
        <li>
          Under the <strong>Permissions</strong> section, enable the <code>Offline Access</code>{" "}
          scope.
        </li>
      </ul>
    </Step>,
  ];

  if (createCustomApiClientStep) {
    const step = CustomApiClient({ apiName: "Google Calendar API" });
    commonSteps.push(step);
  }

  return (
    <>
      <Heading level={3} id="prerequisites">
        Prerequisites
      </Heading>
      Before getting started, make sure you have completed the following steps:
      <Steps>{[...languageSteps, ...commonSteps]}</Steps>
    </>
  );
};
