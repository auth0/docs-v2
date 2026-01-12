export const AccountAndAppSteps = ({
  applicationType = "Regular Web Applications",
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  appCreation = true,
  allowedWebOrigins,
  copyDomain,
  enableTokenVaultGrant = false,
  enableRefreshTokenGrant = false,
  enableAllowRefreshTokenRotation = undefined,
}) => {
  const steps = [
    <Step title="Create an Auth0 Account">
      To continue with this quickstart, you need to have an{" "}
      <a
        href="https://auth0.com/signup?onboard_app=auth_for_aa&ocid=701KZ000000cXXxYAM-aPA4z0000008OZeGAM"
        target="_blank"
      >
        Auth0 account.
      </a>
    </Step>,
  ];
  if (appCreation) {
    steps.push(
      <Step title="Create an Auth0 Application">
        Go to your{" "}
        <a href="https://manage.auth0.com/dashboard" target="_blank">
          Auth0 Dashboard
        </a>{" "}
        to create a new Auth0 Application.
        <ul>
          <li>
            Navigate to <a href="https://manage.auth0.com/#/applications" target="_blank"><strong>Applications {">"} Applications</strong></a> in the
            left sidebar.
          </li>
          <li>
            Click the <strong>Create Application</strong> button in the top
            right.
          </li>
          <li>
            In the pop-up select <strong>{applicationType}</strong> and click{" "}
            <strong>Create</strong>.
          </li>
          <li>
            Once the Application is created, switch to the{" "}
            <strong>Settings</strong> tab.
          </li>
          {copyDomain && (
            <li>
              Copy the <strong>Domain</strong> from the{" "}
              <strong>Basic Information</strong> section to your clipboard.
            </li>
          )}
          <li>
            Scroll down to the <strong>Application URIs</strong> section.
          </li>
          <li>
            Set Allowed Callback URLs as: <code>{callbackUrl}</code>
          </li>
          {logoutUrl && (
            <li>
              Set Allowed Logout URLs as: <code>{logoutUrl}</code>
            </li>
          )}
          {allowedWebOrigins && (
            <li>
              Set Allowed Web Origins as: <code>{allowedWebOrigins}</code>
            </li>
          )}
          {enableAllowRefreshTokenRotation !== undefined && (
            <li>
              Scroll down to the <strong>Refresh Token Rotation</strong> section and {enableAllowRefreshTokenRotation === true ? "enable" : "disable"} the <strong>Allow Refresh Token Rotation</strong> option.
            </li>
          )}
          {enableTokenVaultGrant && !enableRefreshTokenGrant && (
            <li>
              Scroll down and expand the <strong>Advanced</strong> section. Switch to the <strong>Grant Types</strong> tab and enable the <strong>Token Vault</strong> grant type.
            </li>
          )}
          {enableTokenVaultGrant && enableRefreshTokenGrant && (
            <li>
              Scroll down and expand the <strong>Advanced</strong> section. Switch to the <strong>Grant Types</strong> tab and enable the <strong>Token Vault</strong> and <strong>Refresh Token</strong> grant types.
            </li>
          )}
          <li>
            Click <strong>Save</strong> in the bottom right to save your
            changes.
          </li>
        </ul>
        To learn more about Auth0 applications, read{" "}
        <a
          href="https://auth0.com/docs/get-started/applications"
          target="_blank"
        >
          Applications
        </a>
        .
      </Step>
    );
  }
  return steps;
};
