export const IntegrationInfoBlock = ({ providerName }) => {
  return (
    <Callout icon="file-lines" color="#0EA5E9" iconType="regular">
      Ce guide vous explique comment configurer la connexion <strong>{providerName}</strong> dans Auth0. 
      Pour un exemple complet montrant comment configurer votre application afin d’appeler des API tierces au nom de l’utilisateur 
      à l’aide d’une telle connexion, consultez le guide de démarrage rapide{' '}
      <a href="/ai/docs/get-started/call-third-party-apis-on-users-behalf">
        Appeler des API tierces au nom de l’utilisateur
      </a>.
    </Callout>
  );
};