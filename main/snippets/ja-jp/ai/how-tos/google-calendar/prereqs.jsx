export const GoogleCalendarPrereqs = ({
  lang,
  createCustomApiClientStep = false,
}) => {
  const languageSteps = [];

  if (lang === "js") {
    languageSteps.push(
      <Step
        title={
          <>
            Node.js 20+ と <code>npm</code> をインストール
          </>
        }
      />,
    );
  } else if (lang === "python") {
    languageSteps.push(
      <Step
        title={
          <>
            Python 3.11+ と <code>pip</code> をインストール
          </>
        }
      />
    );
  }

  const commonSteps = [
    <Step
      title={
        <>
          <a href="/ai/docs/get-started/user-authentication">
            ユーザー認証クイックスタート
          </a>
          を完了し、Auth0 と統合したアプリケーションを作成します。
        </>
      }
    />,
    <Step
      title={
        <>
          <a
            href="https://platform.openai.com/docs/quickstart?api-mode=chat"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI API キーをセットアップする
          </a>
          。
        </>
      }
    />,
    <Step title="Google Cloud プロジェクトをセットアップして構成する">
      <ul>
        <li>
          <a
            href="https://console.cloud.google.com/apis/library/calendar-json.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Calendar API
          </a>
          を有効にします。
        </li>
        <li>
          適切なリダイレクト URI を使用して OAuth 2.0 credentials（Web アプリケーション）を作成します。
        </li>
      </ul>
    </Step>,
    <Step
      title={
        <>
          Auth0 で Google 用の{" "}
          <a
            href="https://marketplace.auth0.com/integrations/google-social-connection"
            target="_blank"
            rel="noopener noreferrer"
          >
            Social Connection を構成
          </a>
        </>
      }
    >
      <ul>
        <li>
          <strong>Purpose</strong> セクションで、{" "}
          <code>Use for Connected Accounts with Token Vault</code> トグルが有効になっていることを確認します。
        </li>
        <li>
          <strong>Permissions</strong> セクションで、<code>Offline Access</code>{" "}
          スコープを有効にします。
        </li>
      </ul>
    </Step>,
  ];

  if (createCustomApiClientStep) {
    const step = CustomApiClient({ apiName: "Google Calendar API" });
    commonSteps.push(step);
  }

  return (
    <>
      <Heading level={3} id="prerequisites">
        前提条件
      </Heading>
      始める前に、以下の手順を完了していることを確認してください。
      <Steps>{[...languageSteps, ...commonSteps]}</Steps>
    </>
  );
};