export const IntegrationInfoBlock = ({ providerName }) => {
  return (
    <Callout icon="file-lines" color="#0EA5E9" iconType="regular">
      This guide walks you through setting up the <strong>{providerName}</strong> connection in Auth0. 
      For an end-to-end example that shows how to set up your app to call third-party APIs on the user's behalf 
      using a connection like this, read the{' '}
      <a href="/get-started/call-others-apis-on-users-behalf">
        Call third-party APIs on user's behalf quickstart
      </a>.
    </Callout>
  );
};
