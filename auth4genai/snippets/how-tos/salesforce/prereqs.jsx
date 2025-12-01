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
          in Auth0 with the following scopes
        </>
      }
    >
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
    </Step>,
  ];

  if (createCustomApiClientStep) {
    commonSteps.push(
      <Step title="Create a Custom API Client in Auth0">
        The Custom API Client allows your API server to perform token exchanges
        using{" "}
        <strong>
          <i>access tokens</i>
        </strong>{" "}
        instead of{" "}
        <strong>
          <i>refresh tokens</i>
        </strong>
        . This client enables Token Vault to exchange an access token for an
        external API access token (e.g., Salesforce API).
        <br />
        <ul>
          <li>
            Navigate to <strong>Applications &gt; APIs</strong>
          </li>
          <li>
            Click the <strong>Create API</strong> button to create a new Custom
            API.
          </li>
          <li>
            Go to the Custom API you created and click the{" "}
            <strong>Add Application</strong> button in the right top corner.
          </li>
          <li>
            After that click the <strong>Configure Application</strong> button
            in the right top corner.
          </li>
          <li>
            Note down the <code>client id</code> and <code>client secret</code>{" "}
            for your environment variables.
          </li>
        </ul>
      </Step>
    );
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
