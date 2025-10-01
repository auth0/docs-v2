export const TokenVaultConfigBlock = ({
  connectionName = "connection-name",
  providerName = "Provider",
  scopes = ["scope1", "scope2"],
}) => {
  const formatScopes = (scopes) => {
    return scopes.map(scope => `"${scope}"`).join(", ");
  };

  const jsVariableName = `with${providerName.replace(/\s+/g, '')}Connection`;
  const pythonVariableName = `with_${connectionName.replace(/-/g, '_')}_connection`;

  return (
    <>
      <Tabs>
        <Tab title="JavaScript" icon="js">
          <CodeBlock language="javascript" wrap="true" lines="true">
{`const auth0AI = new Auth0AI();

export const ${jsVariableName} = auth0AI.withTokenVault({
  connection: "${connectionName}",
  scopes: [${formatScopes(scopes)}, ...],
  refreshToken: getAuth0RefreshToken(),
});`}
          </CodeBlock>
        </Tab>
        <Tab title="Python" icon="python">
          <CodeBlock language="python" wrap="true" lines="true">
{`auth0_ai = Auth0AI()

${pythonVariableName} = auth0_ai.with_token_vault(
    connection="${connectionName}",
    scopes=[${formatScopes(scopes)}, ...],
    refresh_token=get_auth0_refresh_token,
)`}
          </CodeBlock>
        </Tab>
      </Tabs>
    </>
  );
};
