export const AccountLinking = ({ connectionLabel = "any Identity Provider" }) => (
  <>
    <h2>Account Linking</h2>
    <p>
      If you're integrating with {connectionLabel}, but users in your app or agent can sign in using
      other methods (e.g., a username and password or another social provider), you'll need to link
      these identities into a single user account. Auth0 refers to this process as{" "}
      <a href="https://auth0.com/docs/manage-users/user-accounts/user-account-linking">
        Account Linking
      </a>
      .
    </p>
    <p>
      Account Linking is separate from{" "}
      <a href="https://auth0.com/docs/secure/tokens/token-vault/connected-accounts-for-token-vault">
        Connected Accounts for Token Vault
      </a>
      :
    </p>
    <ul>
      <li>Account Linking merges multiple Auth0 identities into one user profile for sign-in.</li>
      <li>
        Connected Accounts for Token Vault allows that signed-in user to authorize an external
        provider so Auth0 can store the provider's tokens in Token Vault.
      </li>
    </ul>
    <p>
      If your application uses{" "}
      <a href="https://auth0.com/docs/manage-users/organizations">Organizations</a>, authenticate the
      user with the target organization before initiating the Connected Accounts flow. Organizations
      define the session context; they do not create a shared external account for the organization.
    </p>
    <p>
      <strong>Account Linking</strong> logic and handling will vary depending on your app or agent.
      You can find an example of how to implement it in a Next.js chatbot app{" "}
      <a href="https://github.com/auth0-lab/market0/blob/main/app/api/auth/%5Bauth0%5D/route.ts#L43">
        here
      </a>
      . If you have questions or are looking for best practices,{" "}
      <a href="http://discord.gg/XbQpZSF2Ys">join our Discord</a> and ask in the{" "}
      <code>#auth0-for-gen-ai</code> channel.
    </p>
  </>
);
