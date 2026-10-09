export const Auth0SetupBlock = ({
  providerName,
  clientIDName = "ID client",
  clientSecretName = "Secret client",
  scopesName = "Permissions",
  allowFreeFormScopes = false,
  allowOfflineAccess = false,
}) => {
  return (
    <>
      <ol>
        <li>
          Dans <a href="https://manage.auth0.com">Auth0 Dashboard</a>, accédez à{" "}
          <b>Authentification &gt; Social</b>.
        </li>
        <li>
          Sélectionnez <b>Créer une connexion</b>, puis choisissez <b>{providerName}</b>.
        </li>
        <li>Sélectionnez <b>Continuer</b>.</li>
        <li>
          Dans <b>Général</b> :
          <ol type="A">
            <li>
              Saisissez le <b>{clientIDName}</b> et le <b>{clientSecretName}</b> de
              votre application OAuth {providerName}.
            </li>
            <li>
              Sous <b>{scopesName}</b>, sélectionnez les permissions requises pour votre
              application. Elles déterminent les permissions que votre application peut
              demander à {providerName}, que ce soit pour l'authentification (comme
              l'accès aux informations de profil de base) ou l'accès aux API (comme
              la connexion aux API du fournisseur).<br/><br/>Pour une connexion sociale Dropbox ou Google,
              vous devez sélectionner <b>Accès hors ligne</b> dans Auth0 Dashboard, ce qui permet
              à l'application cliente d'obtenir un jeton d'actualisation Auth0.
            </li>
            {allowOfflineAccess && (
              <li>
                Sous <b>{scopesName}</b>, activez <b>Accès hors ligne</b> pour la connexion.
                Auth0 exige cette option pour obtenir un jeton d'actualisation de {providerName}.
              </li>
            )}
            {allowFreeFormScopes && (
              <li>
                Ajoutez toute permission supplémentaire requise par votre application dans le champ{" "}
                <b>Permissions supplémentaires</b>.
              </li>
            )}
          </ol>
        </li>
        <li>
          Dans <b>Objectif</b>, activez <b>Comptes connectés pour le coffre-fort de jetons</b>. Cela permet à cette
          connexion de récupérer et de stocker de façon sécuritaire des jetons d'accès pour des
          API externes. Pour en apprendre davantage, consultez{" "}
          <a href="/docs/secure/call-apis-on-users-behalf/token-vault/connected-accounts-for-token-vault">
            Comptes connectés pour le coffre-fort de jetons
          </a>.
        </li>
        <li>Sélectionnez <b>Créer</b>.</li>
        <li>
          Après sa création, vous êtes redirigé vers la page <b>Applications</b>.
          Sélectionnez les applications pour lesquelles vous souhaitez activer cette connexion.
          <br />
          <Callout icon="file-lines" color="#0EA5E9" iconType="regular">Dans un nouveau locataire Auth0, vous pouvez sélectionner l'<b>application par défaut</b>.</Callout>
        </li>
        <li>
          Une fois votre connexion sociale {providerName} créée, <a href="/docs/authenticate/identity-providers/test-connections">testez votre connexion</a> pour vous assurer que la configuration fonctionne correctement avant de l'utiliser dans votre application.
        </li>
      </ol>
    </>
  );
};