export const SlackPrereqs = ({
  lang,
  createCustomApiClientStep = false,
}) => {
  const languageSteps = [];

  if (lang === "js") {
    languageSteps.push(
      <Step
        title={
          <>
            Node.js 20+ と <code>npm</code> をインストールする
          </>
        }
      />
    );
  } else if (lang === "python") {
    languageSteps.push(
      <Step
        title={
          <>
            Python 3.11+ と <code>pip</code> をインストールする
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
          を完了して、Auth0 と統合されたアプリケーションを作成します。
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
    <Step
      title={
        <>
          <a
            href="https://marketplace.auth0.com/integrations/sign-in-with-slack"
            target="_blank"
            rel="noopener noreferrer"
          >
            Auth0 で Slack のソーシャル接続を設定する
          </a>
        </>
      }
    >
      <ul>
        <li>
          <strong>目的</strong>セクションで、{" "}
          <code>Use for Connected Accounts with Token Vault</code> トグルを有効にしてください。
        </li>
      </ul>
    </Step>,
  ];

  if (createCustomApiClientStep) {
    const step = CustomApiClient({ apiName: "Slack API" });
    commonSteps.push(step);
  }

  return (
    <>
      <Heading level={3} id="prerequisites">
        前提条件
      </Heading>
      開始する前に、次の手順を完了していることを確認してください。
      <Steps>{[...languageSteps, ...commonSteps]}</Steps>
    </>
  );
};