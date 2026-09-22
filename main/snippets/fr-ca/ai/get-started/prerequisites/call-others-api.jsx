import { AccountAndAppSteps } from "/snippets/ai/get-started/prerequisites/account-app-steps.jsx";

export const Prerequisites = ({
  createAuth0ApplicationStep = {
    applicationType: "Regular Web Applications",
    callbackUrl: "http://localhost:3000/auth/callback",
    logoutUrl: "http://localhost:3000",
    allowedWebOrigins: undefined,
    enableTokenVaultGrant: undefined,
    enableRefreshTokenGrant: undefined,
    enableAllowRefreshTokenRotation: undefined
  },
  createAuth0ApiStep = undefined,
  createResourceServerClientStep = undefined
}) => {
  // Build steps array dynamically based on conditions
  const steps = []

  steps.push(
    ...AccountAndAppSteps({
      applicationType: createAuth0ApplicationStep.applicationType,
      callbackUrl: createAuth0ApplicationStep.callbackUrl,
      logoutUrl: createAuth0ApplicationStep.logoutUrl,
      appCreation: !!createAuth0ApplicationStep,
      allowedWebOrigins: createAuth0ApplicationStep.allowedWebOrigins,
      enableTokenVaultGrant: createAuth0ApplicationStep.enableTokenVaultGrant,
      enableRefreshTokenGrant: createAuth0ApplicationStep.enableRefreshTokenGrant,
      enableAllowRefreshTokenRotation: createAuth0ApplicationStep.enableAllowRefreshTokenRotation
    })
  )

  if (createAuth0ApiStep) {
    steps.push(
      <Step key="auth0-api" title="Créer une API personnalisée">
        Une API personnalisée est une API que vous possédez et que vous souhaitez sécuriser à l'aide d'Auth0.
        <ul>
          <li>
            Dans votre Auth0 Dashboard, accédez à{" "}
            <a href="https://manage.auth0.com/#/apis" target="_blank">
              <strong>Applications &gt; API</strong>
            </a>
            .
          </li>
          <li>
            Créez une nouvelle API avec un identifiant (public), par exemple, <code>https://my-custom-api.com</code>.
          </li>
          <li>
            Une fois l'API créée, accédez aux <strong>Paramètres &gt; Paramètres d'accès</strong> de l'API et activez <strong>Autoriser l'accès hors ligne</strong>.
          </li>
          <li>
            Notez l'identifiant de l'API pour vos variables d'environnement. Vous utiliserez l'identifiant de l'API comme paramètre public dans les requêtes de jeton (<code>AUTH0_AUDIENCE</code>).
          </li>
        </ul>
      </Step>
    )
  }

  if (createResourceServerClientStep) {
    steps.push(
      <Step key="resource-server" title="Créer un client d'API personnalisé">
        Le client d'API personnalisé permet à votre serveur d'API d'effectuer des échanges de jetons en utilisant des{" "}
        <strong>
          <i>jetons d'accès</i>
        </strong>{" "}
        au lieu de{" "}
        <strong>
          <i>jetons d'actualisation</i>
        </strong>
        . Ce client permet au coffre-fort de jetons d'échanger un jeton d'accès contre un jeton d'accès d'API externe (par exemple, l'API Google Calendar).
        <br />
        <ul>
          <li>
            À partir de la page <strong>Paramètres</strong> de l'API que vous venez de créer, cliquez sur le bouton <strong>Ajouter une application</strong> dans le coin supérieur droit. Cela ouvrira une fenêtre modale pour créer un nouveau
            client d'API personnalisé.
          </li>
          <li>
            Donnez un nom à votre client d'API personnalisé dans le champ Nom de l'application et cliquez sur le bouton <strong>Ajouter</strong> pour créer un nouveau client d'API personnalisé.
          </li>
          <li>
            Une fois la création réussie, vous devriez être redirigé vers la page des paramètres de votre nouvelle application client d'API personnalisée. Notez le <code>client id</code> et le{" "}
            <code>client secret</code> pour vos variables d'environnement.
          </li>
        </ul>
      </Step>
    )
  }
  // Always include these final steps

  steps.push(
    <Step key="my-account-api" title="Configurer l'API My Account">
      Le flux Connected Accounts utilise l'{" "}
      <a href="/docs/manage-users/my-account-api" target="_blank">
        API My Account
      </a>{" "}
      pour créer et gérer les comptes connectés d'un utilisateur auprès des fournisseurs externes pris en charge.
      <br />
      <br />
      Dans le Auth0 Dashboard, configurez l'API My Account :
      <ul>
        <li>
          Accédez à{" "}
          <a href="https://manage.auth0.com/#/apis" target="_blank">
            <strong>Applications &gt; API</strong>
          </a>
          , localisez la bannière de l'API My Account et sélectionnez <strong>Activer</strong> pour activer l'API My Account d'Auth0.
        </li>
        <li>
          Une fois activée, sélectionnez <strong>Auth0 My Account API</strong>, puis sélectionnez l'onglet <strong>Accès à l'application</strong>.
          <ul>
            <li>
              Trouvez votre application client et sélectionnez <strong>Modifier</strong> pour configurer ses{" "}
              <a href="/docs/get-started/apis/api-access-policies-for-applications" target="_blank">
                politiques d'accès à l'application
              </a>
              .
            </li>
            <li>
              Sélectionnez <strong>Accès utilisateur</strong> et sous <strong>Autorisation</strong>, sélectionnez <strong>Autorisé</strong>.
            </li>
            <li>
              Pour les permissions, sélectionnez <strong>Toutes</strong> les{" "}
              <a href="/docs/manage-users/my-account-api#scope" target="_blank">
                permissions Connected Accounts
              </a>{" "}
              pour l'application.
            </li>
            <li>
              Sélectionnez <strong>Enregistrer</strong>. Cela crée un{" "}
              <a href="/docs/get-started/applications/application-access-to-apis-client-grants" target="_blank">
                octroi de client
              </a>{" "}
              qui permet à votre application client d'accéder à l'API My Account avec les permissions Connected Accounts au nom de l'utilisateur.
            </li>
          </ul>
        </li>
        <li>
          Ensuite, accédez à l'onglet <strong>Paramètres</strong>. Sous <strong>Paramètres d'accès</strong>, sélectionnez <strong>Autoriser l'omission du consentement de l'utilisateur</strong>.
        </li>
      </ul>
    </Step>
  )

  steps.push(
    <Step key="mrrt-policy" title="Définir une politique de jeton d'actualisation multi-ressources pour votre application">
      Une fois que votre application Web a obtenu l'accès à l'API My Account, vous devrez également tirer parti de la fonctionnalité de{" "}
      <a href="/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token" target="_blank">
        jeton d'actualisation multi-ressources
      </a>{" "}
      qui permet au jeton d'actualisation fourni à votre application d'obtenir également un jeton d'accès pour appeler l'API My Account. <br />
      <br />
      Vous pouvez rapidement définir une{" "}
      <a href="/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token/configure-and-implement-multi-resource-refresh-token" target="_blank">
        politique de jeton d'actualisation
      </a>{" "}
      à utiliser par votre application lors de la demande de jetons d'accès pour l'API My Account en procédant comme suit :
      <ul>
        <li>
          Accédez à{" "}
          <a href="https://manage.auth0.com/#/applications" target="_blank">
            <strong>Applications &gt; Applications</strong>
          </a>{" "}
          et sélectionnez votre application client.
        </li>
        <li>
          Dans l'onglet <strong>Paramètres</strong>, faites défiler jusqu'à la section <strong>Jeton d'actualisation multi-ressources</strong>.
        </li>
        <li>
          Sélectionnez <strong>Modifier la configuration</strong>, puis activez le commutateur MRRT pour l'<strong>API My Account d'Auth0</strong>.
        </li>
      </ul>
    </Step>
  )

  steps.push(
    <Step key="google-connection" title="Configurer l'intégration sociale Google">
      Configurez un compte Google Cloud qui autorise les appels d'API externes en suivant les instructions de l'<a href="/ai/docs/connections/google">Intégration sociale Google</a>.
    </Step>
  )

  steps.push(
    <Step key="openai" title="Plateforme OpenAI">
      Configurez un{" "}
      <a href="https://platform.openai.com/docs/libraries#create-and-export-an-api-key" target="_blank">
        compte et une clé d'API OpenAI
      </a>
      .
    </Step>
  )

  return (
    <>
      <Heading level={3} id="prerequisites">
        Informations requises
      </Heading>
      Avant de commencer, assurez-vous d'avoir terminé les étapes suivantes :
      <Steps>{steps}</Steps>
    </>
  )
}