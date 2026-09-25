export const SlackPrereqs = ({
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
      />
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
          Configurez une{" "}
          <a
            href="https://marketplace.auth0.com/integrations/sign-in-with-slack"
            target="_blank"
            rel="noopener noreferrer"
          >
            connexion sociale pour Slack dans Auth0
          </a>
        </>
      }
    >
      <ul>
        <li>
          Dans la section <strong>Objectif</strong>, assurez-vous d’activer le{" "}
          <code>Utiliser pour les comptes connectés avec Token Vault</code>.
        </li>
      </ul>
    </Step>,
  ];

  if (createCustomApiClientStep) {
    const step = CustomApiClient({ apiName: "Slack API" });
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