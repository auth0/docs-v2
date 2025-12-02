export const SalesforcePrereqs = ({
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
      />
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
    <Step
      title={
        <>
          Set up and configure a Salesforce instance with an{" "}
          <a
            href="https://help.salesforce.com/s/articleView?id=xcloud.external_client_apps.htm&type=5"
            target="_blank"
            rel="noopener noreferrer"
          >
            External Client App
          </a>
          .
        </>
      }
    />,
    <Step
      title={
        <>
          Set the <code>SALESFORCE_INSTANCE_URL</code> in your <code>.env</code>{" "}
          file
        </>
      }
    >
      <pre>
        <code>
          SALESFORCE_INSTANCE_URL=https://your-instance.salesforce.com
        </code>
      </pre>
    </Step>,
    <Step
      title={
        <>
          <a
            href="https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/oidc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Configure a Salesforce OIDC connection
          </a>{" "}
          in Auth0.
        </>
      }
    >
      <ul>
        <li>
          Under the <strong>General</strong> section, ensure the following{" "}
          <strong>Scopes</strong>:
          <ul>
            <li>
              <code>openid</code>
            </li>
            <li>
              <code>api</code>
            </li>
            <li>
              <code>refresh_token</code>
            </li>
            <li>
              <code>offline_access</code>
            </li>
          </ul>
        </li>
        <li>
          Under the <strong>Purpose</strong> section, make sure to enable the{" "}
          <code>Use for Connected Accounts with Token Vault</code> toggle.
        </li>
      </ul>
    </Step>,
  ];

  if (createCustomApiClientStep) {
    const step = CustomApiClient({ apiName: "Salesforce API" });
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
