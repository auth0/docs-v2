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
            Installez Node.js 20+ et <code>npm</code>
          </>
        }
      />,
    );
  } else if (lang === "python") {
    languageSteps.push(
      <Step
        title={
          <>
            Installez Python 3.11+ et <code>pip</code>
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
            guide de démarrage rapide sur l’authentification des utilisateurs
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
          Créez et configurez une{" "}
          <a
            href="https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            application GitHub
          </a>
          .
        </>
      }
    />,
    <Step
      title={
        <>
          Configurez une{" "}
          <a
            href="https://marketplace.auth0.com/integrations/github-social-connection"
            target="_blank"
            rel="noopener noreferrer"
          >
            connexion sociale GitHub dans Auth0
          </a>
        </>
      }
    >
      <ul>
        <li>
          Dans la section <strong>Objectif</strong>, assurez-vous d’activer le bouton bascule{" "}
          <code>Use for Connected Accounts with Token Vault</code>.
        </li>
        <li>
          Dans la section <strong>Permissions</strong>, activez la permission <code>Offline Access</code>.
        </li>
      </ul>
    </Step>,
  ];

  if (createCustomApiClientStep) {
    const step = CustomApiClient({ apiName: "Github API" });
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