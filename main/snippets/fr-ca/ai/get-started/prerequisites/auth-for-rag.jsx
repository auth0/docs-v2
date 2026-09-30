import { AccountAndAppSteps } from "/snippets/ai/get-started/prerequisites/account-app-steps.jsx";
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
      <Step key="auth0-api" title="Créer une API Auth0">
        <ul>
          <li>
            Dans votre Auth0 Dashboard, accédez à{" "}
            <strong>Applications &gt; APIs</strong>.
          </li>
          <li>Créez une API avec un identifiant (public).</li>
          <li>
            Une fois l’API créée, accédez à <strong>Settings &gt; Access Settings</strong>{" "}
            dans la section APIs et activez <strong>Allow Offline Access</strong>.
          </li>
          <li>Notez l’identifiant de l’API pour vos variables d’environnement.</li>
        </ul>
        Pour en savoir plus sur les API Auth0, consultez{" "}
        <a
          href="/docs/get-started/auth0-overview/set-up-apis"
          target="_blank"
        >
          APIs
        </a>
        .
      </Step>
    );
  }

  steps.push(
    <Step title="Créer un compte Auth0 FGA">
      Vous avez besoin d’un{" "}
      <a href="https://dashboard.fga.dev/" target="_blank">
        compte Auth0 FGA
      </a>{" "}
      pour suivre ce guide de démarrage rapide.
    </Step>,
    <Step title="Plateforme OpenAI">
      Configurez un{" "}
      <a
        href="https://platform.openai.com/docs/libraries#create-and-export-an-api-key"
        target="_blank"
      >
        compte OpenAI et une clé API
      </a>
      .
    </Step>
  );

  return (
    <>
      <Heading level={3} id="prerequisites">
        Informations requises
      </Heading>
      Avant de commencer, assurez-vous de :
      <Steps>{steps}</Steps>
    </>
  );
};