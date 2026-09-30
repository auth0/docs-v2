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
            Installez Node.js 20+ et <code>npm</code>
          </>
        }
      />
    );
  } else if (lang === "python") {
    languageSteps.push(
      <Step
        title={
          <>
            Installez Python 3.11+ et <code>pip</code>
          </>
        }
      />
    );
  }

  const commonSteps = [
    <Step
      title={
        <>
          Suivez le{" "}
          <a href="/ai/docs/get-started/user-authentication">
            guide de démarrage rapide de l’authentification des utilisateurs
          </a>{" "}
          pour créer une application intégrée à Auth0.
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
            Configurez une clé API OpenAI
          </a>
          .
        </>
      }
    />,
    <Step
      title={
        <>
          Configurez une instance Salesforce avec une{" "}
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
          Définissez <code>SALESFORCE_INSTANCE_URL</code> dans votre fichier <code>.env</code>{" "}
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
            href="/docs/authenticate/identity-providers/enterprise-identity-providers/oidc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Configurez une connexion OIDC Salesforce
          </a>{" "}
          dans Auth0.
        </>
      }
    >
      <ul>
        <li>
          Dans la section <strong>General</strong>, assurez-vous d’activer les{" "}
          <strong>Scopes</strong> suivants :
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
          Dans la section <strong>Purpose</strong>, assurez-vous d’activer l’option{" "}
          <code>Use for Connected Accounts with Token Vault</code>.
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
        Informations requises
      </Heading>
      Avant de commencer, assurez-vous d’avoir effectué les étapes suivantes :
      <Steps>{[...languageSteps, ...commonSteps]}</Steps>
    </>
  );
};