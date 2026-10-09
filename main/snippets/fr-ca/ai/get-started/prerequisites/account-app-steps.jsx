export const AccountAndAppSteps = ({
  applicationType = "Applications Web régulières",
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  appCreation = true,
  allowedWebOrigins,
  copyDomain,
  enableTokenVaultGrant = false,
  enableRefreshTokenGrant = false,
  enableAllowRefreshTokenRotation = undefined,
}) => {
  const steps = [
    <Step title="Créer un compte Auth0">
      Pour suivre ce guide de démarrage rapide, vous devez disposer d’un{" "}
      <a
        href="https://auth0.com/signup?onboard_app=auth_for_aa&ocid=701KZ000000cXXxYAM-aPA4z0000008OZeGAM"
        target="_blank"
      >
        compte Auth0.
      </a>
    </Step>,
  ];
  if (appCreation) {
    steps.push(
      <Step title="Créer une application Auth0">
        Accédez à votre{" "}
        <a href="https://manage.auth0.com/dashboard" target="_blank">
          Auth0 Dashboard
        </a>{" "}
        pour créer une application Auth0.
        <ul>
          <li>
            Dans la barre latérale gauche, accédez à <a href="https://manage.auth0.com/#/applications" target="_blank"><strong>Applications {">"} Applications</strong></a>.
          </li>
          <li>
            Cliquez sur le bouton <strong>Créer une application</strong> en haut à
            droite.
          </li>
          <li>
            Dans la fenêtre contextuelle, sélectionnez <strong>{applicationType}</strong> et cliquez sur{" "}
            <strong>Créer</strong>.
          </li>
          <li>
            Une fois l’application créée, passez à l’onglet{" "}
            <strong>Paramètres</strong>.
          </li>
          {copyDomain && (
            <li>
              Copiez le <strong>domaine</strong> de la section{" "}
              <strong>Informations de base</strong> dans votre presse-papiers.
            </li>
          )}
          <li>
            Faites défiler jusqu’à la section <strong>URI d’application</strong>.
          </li>
          <li>
            Définissez les URL de rappel autorisées comme suit : <code>{callbackUrl}</code>
          </li>
          {logoutUrl && (
            <li>
              Définissez les URL de déconnexion autorisées comme suit : <code>{logoutUrl}</code>
            </li>
          )}
          {allowedWebOrigins && (
            <li>
              Définissez les origines Web autorisées comme suit : <code>{allowedWebOrigins}</code>
            </li>
          )}
          {enableAllowRefreshTokenRotation !== undefined && (
            <li>
              Faites défiler jusqu’à la section <strong>Rotation des jetons d’actualisation</strong> et {enableAllowRefreshTokenRotation === true ? "activez" : "désactivez"} l’option <strong>Autoriser la rotation des jetons d’actualisation</strong>.
            </li>
          )}
          {enableTokenVaultGrant && !enableRefreshTokenGrant && (
            <li>
              Faites défiler vers le bas et développez la section <strong>Avancé</strong>. Passez à l’onglet <strong>Types d’autorisation</strong> et activez le type d’autorisation <strong>Coffre-fort de jetons</strong>.
            </li>
          )}
          {enableTokenVaultGrant && enableRefreshTokenGrant && (
            <li>
              Faites défiler vers le bas et développez la section <strong>Avancé</strong>. Passez à l’onglet <strong>Types d’autorisation</strong> et activez les types d’autorisation <strong>Coffre-fort de jetons</strong> et <strong>Jeton d’actualisation</strong>.
            </li>
          )}
          <li>
            Cliquez sur <strong>Enregistrer</strong> en bas à droite pour enregistrer vos
            modifications.
          </li>
        </ul>
        Pour en apprendre davantage sur les applications Auth0, consultez{" "}
        <a
          href="/docs/get-started/applications"
          target="_blank"
        >
          Applications
        </a>
        .
      </Step>
    );
  }
  return steps;
};