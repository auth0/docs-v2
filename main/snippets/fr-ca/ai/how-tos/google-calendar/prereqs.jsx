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
    <Step title="Configurez un projet Google Cloud">
      <ul>
        <li>
          Activez l’{" "}
          <a
            href="https://console.cloud.google.com/apis/library/calendar-json.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Google Calendar
          </a>
          .
        </li>
        <li>
          Créez des informations d’identification OAuth 2.0 (application Web) avec les URI de redirection appropriés.
        </li>
      </ul>
    </Step>,
    <Step
      title={
        <>
          Configurez une{" "}
          <a
            href="https://marketplace.auth0.com/integrations/google-social-connection"
            target="_blank"
            rel="noopener noreferrer"
          >
            connexion sociale Google dans Auth0
          </a>
        </>
      }
    >
      <ul>
        <li>
          Dans la section <strong>Objectif</strong>, assurez-vous d’activer le commutateur{" "}
          <code>Use for Connected Accounts with Token Vault</code>.
        </li>
        <li>
          Dans la section <strong>Autorisations</strong>, activez la permission <code>Offline Access</code>.
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
        Informations requises
      </Heading>
      Avant de commencer, assurez-vous d’avoir effectué les étapes suivantes :
      <Steps>{[...languageSteps, ...commonSteps]}</Steps>
    </>
  );
};