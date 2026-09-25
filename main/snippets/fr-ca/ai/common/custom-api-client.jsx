export const CustomApiClient = ({
  apiName = "l’API externe"
}) => {
  return (
    <Step title="Créer un client d’API personnalisé dans Auth0">
      Le client d’API personnalisé permet à votre serveur d’API d’effectuer des échanges de jetons
      à l’aide de{" "}
      <strong>
        <i>jetons d’accès</i>
      </strong>{" "}
      plutôt que de{" "}
      <strong>
        <i>jetons d’actualisation</i>
      </strong>
      . Ce client permet à Token Vault d’échanger un jeton d’accès contre un
      jeton d’accès pour une API externe (p. ex., {apiName}).
      <br />
      <ul>
        <li>
          Accédez à <strong>Applications &gt; API</strong>
        </li>
        <li>
          Cliquez sur le bouton <strong>Créer une API</strong> pour créer une nouvelle API
          personnalisée.
        </li>
        <li>
          Accédez à l’API personnalisée que vous avez créée et cliquez sur le bouton{" "}
          <strong>Ajouter une application</strong> dans le coin supérieur droit.
        </li>
        <li>
          Une fois l’API ajoutée comme application, cliquez sur le bouton <strong>Configurer l’application</strong>
          dans le coin supérieur droit.
        </li>
        <li>
          Notez les valeurs de <code>client id</code> et <code>client secret</code>{" "}
          pour vos variables d’environnement.
        </li>
      </ul>
    </Step>
  );
};