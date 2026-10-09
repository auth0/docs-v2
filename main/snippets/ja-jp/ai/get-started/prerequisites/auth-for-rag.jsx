import { AccountAndAppSteps } from "/snippets/ai/get-started/prerequisites/account-app-steps.jsx";
export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  appCreation = true,
  createAuth0ApiStep = undefined,
}) => {
  const steps = [];

  if (appCreation) {
    steps.push(...AccountAndAppSteps({ callbackUrl, logoutUrl, appCreation }));
  }

  if (createAuth0ApiStep) {
    steps.push(
      <Step key="auth0-api" title="Auth0 API を作成">
        <ul>
          <li>
            Auth0 Dashboard で{" "}
            <strong>Applications &gt; APIs</strong> に移動します。
          </li>
          <li>識別子（オーディエンス）を指定して新しい API を作成します。</li>
          <li>
            API を作成したら、APIs の{" "}
            <strong>Settings &gt; Access Settings</strong> に移動し、{" "}
            <strong>Allow Offline Access</strong> を有効にします。
          </li>
          <li>環境変数に設定する API 識別子を控えておきます。</li>
        </ul>
        Auth0 API の詳細については、{" "}
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
    <Step title="Auth0 FGA アカウントを作成">
      このクイックスタートを完了するには、{" "}
      <a href="https://dashboard.fga.dev/" target="_blank">
        Auth0 FGA アカウント
      </a>{" "}
      が必要です。
    </Step>,
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
      始める前に、以下を確認してください。
      <Steps>{steps}</Steps>
    </>
  );
};