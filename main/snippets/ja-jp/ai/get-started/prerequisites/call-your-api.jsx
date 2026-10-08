import { AccountAndAppSteps } from "/snippets/ai/get-started/prerequisites/account-app-steps.jsx";
export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  createAuth0ApiStep = undefined,
}) => {
  const steps = AccountAndAppSteps({ callbackUrl, logoutUrl });

  if (createAuth0ApiStep) {
    steps.push(
      <Step key="auth0-api" title="Auth0 API を作成">
        <ul>
          <li>
            Auth0 Dashboard で{" "}
            <strong>Applications &gt; APIs</strong>に移動します。
          </li>
          <li>識別子（オーディエンス）を指定して、新しい API を作成します。</li>
          <li>
            API を作成したら、APIs の{" "}
            <strong>Settings &gt; Access Settings</strong>に移動し、{" "}
            <strong>Allow Offline Access</strong>を有効にします。
          </li>
          <li>環境変数に使用する API 識別子を控えておきます。</li>
        </ul>
        Auth0 API について詳しくは、{" "}
        <a
          href="/docs/get-started/auth0-overview/set-up-apis"
          target="_blank"
        >
          API
        </a>
        を参照してください。
      </Step>
    );
  }

  steps.push(
    <Step title="OpenAI Platform">
      {" "}
      <a
        href="https://platform.openai.com/docs/libraries#create-and-export-an-api-key"
        target="_blank"
      >
        OpenAI アカウントと API キー
      </a>
      をセットアップします。
    </Step>
  );

  return (
    <>
      <Heading level={3} id="prerequisites">
        前提条件
      </Heading>
      開始する前に、次の手順を完了していることを確認してください。
      <Steps>{steps}</Steps>
    </>
  );
};