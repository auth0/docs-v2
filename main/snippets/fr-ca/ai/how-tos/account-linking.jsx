export const AccountLinking = ({ connectionLabel = "n'importe quel fournisseur d'identité" }) => (
  <>
    <h2>Liaison de comptes</h2>
    <p>
      Si vous intégrez {connectionLabel} et souhaitez permettre aux utilisateurs de se connecter au moyen d'une autre
      méthode (p. ex., un nom d'utilisateur et un mot de passe ou un autre fournisseur externe), vous devez associer
      ces identités à un même compte utilisateur. Auth0 appelle ce processus{" "}
      <a href="/docs/manage-users/user-accounts/user-account-linking">
        Liaison de comptes
      </a>
      .
    </p>
    <p>
      La liaison de comptes est distincte des{" "}
      <a href="/docs/secure/call-apis-on-users-behalf/token-vault/connected-accounts-for-token-vault">
        Comptes connectés pour le coffre-fort de jetons
      </a>
      :
    </p>
    <ul>
      <li>La liaison de comptes regroupe plusieurs identités Auth0 dans un seul profil utilisateur pour la connexion.</li>
      <li>
        Les comptes connectés pour le coffre-fort de jetons permettent à l'utilisateur connecté d'autoriser un fournisseur externe
        afin qu'Auth0 puisse stocker les jetons du fournisseur dans le coffre-fort de jetons.
      </li>
    </ul>
    <p>
      Si votre application utilise{" "}
      <a href="/docs/manage-users/organizations">Organizations</a>, authentifiez
      l'utilisateur auprès de l'organisation cible avant de lancer le flux des comptes connectés. Les Organizations
      définissent le contexte de la session ; elles ne créent pas de compte externe partagé pour l'organisation.
    </p>
    <p>
      La logique et la gestion de la liaison de comptes varient selon votre application ou agent.
      Vous trouverez un exemple d'implémentation dans une{" "} <a href="https://github.com/auth0-lab/market0/blob/main/app/api/auth/%5Bauth0%5D/route.ts#L43">application de robot conversationnel Next.js</a>
      . Si vous avez des questions ou recherchez des pratiques exemplaires,{" "}
      <a href="http://discord.gg/XbQpZSF2Ys">joignez notre Discord</a> et posez vos questions dans le canal{" "}
      <code>#auth0-for-gen-ai</code>.
    </p>
  </>
);