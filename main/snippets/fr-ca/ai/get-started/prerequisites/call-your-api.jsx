import { AccountAndAppSteps } from "/snippets/ai/get-started/prerequisites/account-app-steps.jsx";
export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  createAuth0ApiStep = undefined,
}) => {
  const steps = AccountAndAppSteps({ callbackUrl, logoutUrl });

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
            Une fois l’API créée, accédez aux{" "}
            <strong>Settings &gt; Access Settings</strong> de l’API et activez{" "}
            <strong>Allow Offline Access</strong>.
          </li>
          <li>Notez l’identifiant de l’API pour vos variables d’environnement.</li>
        </ul>
        Pour en apprendre davantage sur les API Auth0, consultez{" "}
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
      Avant de commencer, assurez-vous d’avoir effectué les étapes suivantes :
      <Steps>{steps}</Steps>
    </>
  );
};