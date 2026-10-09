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
            Une fois l’API créée, accédez à{" "}
            <strong>Settings &gt; Access Settings</strong> dans la section APIs et activez{" "}
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
    <Step title="Activer le type d’autorisation CIBA">
      Activez le type d’autorisation CIBA pour votre application Auth0. Accédez à{" "}
      <strong>
        Applications &gt; [Votre application] &gt; Settings &gt; Advanced &gt;
        Grant Types
      </strong>{" "}
      et activez le type d’autorisation{" "}
      <strong>Client Initiated Backchannel Authentication (CIBA)</strong>.
    </Step>,

    <Step title="Configurer les paramètres des canaux de notification">
      Configurez les canaux de notification (comme les courriels ou les notifications push) pour votre application Auth0. Accédez à{" "}
      <strong>
        Applications &gt; [Votre application] &gt; Settings &gt; Client-Initiated Backchannel Authentication (CIBA) section &gt;
      </strong>{" "}
      et activez le ou les canaux de notification à utiliser avec les demandes d’autorisation asynchrones de cette application.

      Pour en apprendre davantage sur la <strong>configuration des canaux de notification</strong> et l’utilisation du paramètre <strong>d’expiration demandée</strong>, consultez la documentation sur l’{" "}
      <a
        href="/ai/docs/intro/asynchronous-authorization#user-consent-and-notification-channel-selection"
        target="_self"
      >
        autorisation asynchrone
      </a>
      {" "}.
    </Step>,
    <Step title="Activer Guardian Push">
      Activez l’authentification multifacteur (MFA) avec les notifications Guardian Push
      pour votre locataire Auth0. Pour en apprendre davantage sur MFA avec Guardian, consultez la{" "}
      <a
        href="/docs/secure/multi-factor-authentication/auth0-guardian"
        target="_blank"
      >
        documentation Auth0 Guardian
      </a>
      .
    </Step>,

    <Step title="Inscrire votre utilisateur à Auth0 Guardian">
      Pour lancer une demande push CIBA, l’utilisateur qui autorise doit être inscrit à
      MFA à l’aide de notifications push. Pour vérifier si l’utilisateur qui autorise est
      inscrit aux notifications push MFA dans l’{" "}
      <a href="http://manage.auth0.com/" target="_blank">
        Auth0 Dashboard
      </a>
      , accédez à <strong>User Management &gt; Users</strong> et cliquez sur
      l’utilisateur. Sous <strong>Multi-Factor Authentication</strong>, Auth0 affiche les
      facteurs auxquels l’utilisateur est inscrit :
      <Frame>
        <img
          src="/docs/images/ai/user_enrolled_in_auth0_guardian.png"
          alt="Utilisateur inscrit à Auth0 Guardian"
        />
      </Frame>
      Si l’utilisateur n’est pas inscrit, vous pouvez lui envoyer une demande d’inscription par courriel :
      <Frame>
        <img
          src="/docs/images/ai/enroll_user_in_auth0_guardian.png"
          alt="Capture d’écran d’activation de Guardian Push"
        />
      </Frame>
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
      Avant de commencer, assurez-vous d’avoir effectué les étapes suivantes :
      <Steps>{steps}</Steps>
    </>
  );
};