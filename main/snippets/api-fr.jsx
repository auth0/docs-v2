export const AuthenticationApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          La Authentication API expose les fonctionnalités d'identité pour Auth0 et les protocoles d'identité pris en charge (notamment
          OpenID Connect, OAuth, et SAML).
        </p>
        <p className="mt-3">
          Typiquement, vous devriez consommer cette API à travers l'une des trousses SDK Auth0, telles que{" "}
          <a href="/docs/libraries/auth0js">Auth0.js</a>, ou une librairie comme <a href="/docs/libraries/lock">Lock</a>.
          Toutefois, si vous créez votre interface graphique d'authentification manuellement, vous devrez appeler l'Authentication API 
          directement.
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>Quelques exemples de tâches comprennent :</p>
        <ul className="space-y-2 !mt-0">
          <li>
            Obtenir des <a href="/docs/secure/tokens">jetonss</a> pendant l'authentification
          </li>
          <li>
            Demander le profil d'un utilisateur en utilisant un <a href="/docs/secure/tokens/access-tokens">Jeton d'accès</a>
          </li>
          <li>
            Échanger des <a href="/docs/secure/tokens/refresh-tokens">jetons d'actualisation</a> contre de nouveau jetons d'accès
          </li>
          <li>
            Demander un défi d'authentification pour{" "}
            <a href="/docs/secure/multi-factor-authentication">l'authentification multifacteur (MFA)</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const ManagementApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          La Management API vous permet de gérer votre compte Auth0 par programmation, ce qui vous permet d'automatiser la configuration
          de votre environnement. La plupart des tâches que vous pouvez effectuer dans le Auth0 Dashboard peuvent également être effectuées
          programmatiquement en utilisant l'API.
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>Quelques exemples de tâches incluent :</p>
        <ul className="space-y-2 !mt-0">
          <li>Enregistrez vos applications et API auprès d’Auth0</li>
          <li>
            Configurer des <a href="/docs/connections">connexions</a> avec lesquelles vos utilisateus peuvent s’authentifier
          </li>
          <li>
            <a href="/docs/manage-users">Gérer les utilisateurs</a>
          </li>
          <li>
            <a href="/docs/manage-users/user-accounts/user-account-linking/link-user-accounts">Lier les comptes utilisateurs</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const MyAccountApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          Le service Auth0 My Account API fournit un ensemble de points de terminaison dédiés permettant aux utilisateurs de gérer leurs informations de compte.
          Vous pouvez utiliser ces API pour créer des interfaces en libre-service dans vos applications ou ajouter progressivement des informations à un compte 
          utilisateur.
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>Quelques exemples de tâches comprennent :</p>
        <ul className="space-y-2 !mt-0">
          <li>Permettre à l'utilisateur final de gérer ses propres facteurs</li>
          <li>Mettre à jour une méthode d'authentification</li>
          <li>Savoir quelles méthodes d'authentification sont disponibles</li>
        </ul>
      </div>
    </div>
  );
};

export const MyOrganizationApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          L’API My Organization d’Auth0 offre une interface sécurisée, limitée à l’organization, qui permet 
          à vos clients professionnels de gérer leurs propres organizations au sein de votre locataire Auth0. 
          Cette API constitue la base technique de l’administration déléguée intégrée et des intégrations API-first. 
          Pour plus d’informations, consultez la documentation <a href="/docs/manage-users/my-organization-api">ici</a>.
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>Voici quelques exemples :</p>
        <ul className="space-y-2 !mt-0">
          <li>Détails de l’Organization Auth0 (nom, image de marque, nom d’affichage)</li>
          <li>Configuration, propriété, et relations propres à l’organization</li>
          <li>Fournisseurs d’identité (IdP) et fourniture SCIM</li>
          <li>Configuration des domaines et découverte du domaine d’origine (HRD)</li>
        </ul>
      </div>
    </div>
  );
}
