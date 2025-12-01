export const GitHubPrereqs = ({
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
          Create and configure a{" "}
          <a
            href="https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub App
          </a>
          .
        </>
      }
    />,
    <Step
      title={
        <>
          Configure a{" "}
          <a
            href="https://marketplace.auth0.com/integrations/github-social-connection"
            target="_blank"
            rel="noopener noreferrer"
          >
            Social Connection for GitHub in Auth0
          </a>
        </>
      }
    >
      <ul>
        <li>
          Under the Purpose section, make sure to enable{" "}
          <code>Use for Authentication</code> and{" "}
          <code>Use for Connected Accounts with Token Vault</code> toggles.
        </li>
        <li>
          Under the Permissions section, enable the <code>Offline Access</code>{" "}
          scope.
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
        external API access token (e.g., GitHub API).
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
