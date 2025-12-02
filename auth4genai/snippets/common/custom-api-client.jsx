export const CustomApiClient = ({
  apiName = "the external API"
}) => {
  return (
    <Step title="Create a Custom API Client in Auth0">
      The Custom API Client allows your API server to perform token exchanges
      using{" "}
      <strong>
        <i>access tokens</i>
      </strong>{" "}
      instead of{" "}
      <strong>
        <i>refresh tokens</i>
      </strong>
      . This client enables Token Vault to exchange an access token for an
      external API access token (e.g., {apiName}).
      <br />
      <ul>
        <li>
          Navigate to <strong>Applications &gt; APIs</strong>
        </li>
        <li>
          Click the <strong>Create API</strong> button to create a new Custom
          API.
        </li>
        <li>
          Go to the Custom API you created and click the{" "}
          <strong>Add Application</strong> button in the right top corner.
        </li>
        <li>
          Once you've added the API as an application, click the <strong>Configure Application</strong> button
          in the right top corner.
        </li>
        <li>
          Note down the <code>client id</code> and <code>client secret</code>{" "}
          for your environment variables.
        </li>
      </ul>
    </Step>
  );
};


