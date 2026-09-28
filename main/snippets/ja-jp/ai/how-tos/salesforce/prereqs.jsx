export const SalesforcePrereqs = ({
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
          </a>{" "}
          を完了し、Auth0 と統合されたアプリケーションを作成する
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
          Salesforce インスタンスをセットアップして構成し、{" "}
          <a
            href="https://help.salesforce.com/s/articleView?id=xcloud.external_client_apps.htm&type=5"
            target="_blank"
            rel="noopener noreferrer"
          >
            External Client App
          </a>
          を作成する
        </>
      }
    />,
    <Step
      title={
        <>
          <code>.env</code>{" "}
          ファイルで <code>SALESFORCE_INSTANCE_URL</code> を設定する
        </>
      }
    >
      <pre>
        <code>
          SALESFORCE_INSTANCE_URL=https://your-instance.salesforce.com
        </code>
      </pre>
    </Step>,
    <Step
      title={
        <>
          Auth0 で{" "}
          <a
            href="/docs/authenticate/identity-providers/enterprise-identity-providers/oidc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Salesforce OIDC 接続を構成する
          </a>
          。
        </>
      }
    >
      <ul>
        <li>
          <strong>General</strong> セクションで、以下の{" "}
          <strong>スコープ</strong>が設定されていることを確認します。
          <ul>
            <li>
              <code>openid</code>
            </li>
            <li>
              <code>api</code>
            </li>
            <li>
              <code>refresh_token</code>
            </li>
            <li>
              <code>offline_access</code>
            </li>
          </ul>
        </li>
        <li>
          <strong>Purpose</strong> セクションで、{" "}
          <code>Use for Connected Accounts with Token Vault</code> トグルを有効にします。
        </li>
      </ul>
    </Step>,
  ];

  if (createCustomApiClientStep) {
    const step = CustomApiClient({ apiName: "Salesforce API" });
    commonSteps.push(step);
  }

  return (
    <>
      <Heading level={3} id="prerequisites">
        前提条件
      </Heading>
      開始する前に、以下の手順を完了していることを確認してください。
      <Steps>{[...languageSteps, ...commonSteps]}</Steps>
    </>
  );
};