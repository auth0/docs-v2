export const IntegrationInfoBlock = ({ providerName }) => {
  return (
    <Note>
      This guide walks you through setting up the <strong>{providerName}</strong> connection in Auth0. 
      For an end-to-end example that shows how to set up your app to call third-party APIs on the user's behalf 
      using a connection like this, read the{' '}
      <a href="/get-started/call-others-apis-on-users-behalf">
        Call Other's APIs on User's Behalf Quickstart
      </a>.
    </Note>
  );
};
