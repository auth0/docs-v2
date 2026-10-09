export const GitHubPrereqs = ({
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
          </a>{" "}
          を完了し、Auth0 と統合するアプリケーションを作成します。
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
            OpenAI API キーをセットアップ
          </a>
          します。
        </>
      }
    />,
    <Step
      title={
        <>
          <a
            href="https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub App
          </a>
          を作成して設定します。
        </>
      }
    />,
    <Step
      title={
        <>
          <a
            href="https://marketplace.auth0.com/integrations/github-social-connection"
            target="_blank"
            rel="noopener noreferrer"
          >
            Auth0 で GitHub 用のソーシャル接続を設定
          </a>
        </>
      }
    >
      <ul>
        <li>
          <strong>Purpose</strong> セクションで、<code>Use for Connected Accounts with Token Vault</code> トグルを有効にします。
        </li>
        <li>
          <strong>Permissions</strong> セクションで、<code>Offline Access</code>{" "}
          スコープを有効にします。
        </li>
      </ul>
    </Step>,
  ];

  if (createCustomApiClientStep) {
    const step = CustomApiClient({ apiName: "Github API" });
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