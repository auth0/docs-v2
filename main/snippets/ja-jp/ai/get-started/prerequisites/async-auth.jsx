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
          APIs
        </a>
        を参照してください。
      </Step>
    );
  }

  steps.push(
    <Step title="CIBA 付与を有効にする">
      Auth0 アプリケーションで CIBA 付与を有効にします。{" "}
      <strong>
        Applications &gt; [ご利用のアプリケーション] &gt; Settings &gt; Advanced &gt;
        Grant Types
      </strong>{" "}
      に移動し、{" "}
      <strong>Client Initiated Backchannel Authentication (CIBA)</strong> の付与タイプを有効にします。
    </Step>,

    <Step title="通知チャネルを設定する">
      Auth0 アプリケーションの通知チャネル（メールやプッシュ通知など）を設定します。{" "}
      <strong>
        Applications &gt; [ご利用のアプリケーション] &gt; Settings &gt; Client-Initiated Backchannel Authentication (CIBA) section &gt;
      </strong>{" "}
      に移動し、このアプリケーションの非同期認可リクエストで使用する通知チャネルを有効にします。

      <strong>通知チャネルの設定</strong>と<strong>要求された有効期限</strong>設定の使用方法について詳しくは、{" "}
      <a
        href="/ai/docs/intro/asynchronous-authorization#user-consent-and-notification-channel-selection"
        target="_self"
      >
        非同期認可
      </a>
      {" "}のドキュメントを参照してください。
    </Step>,
    <Step title="Guardian Push を有効にする">
      Auth0 テナントで Guardian プッシュ通知を使用した多要素認証（MFA）を有効にします。
      Guardian を使用した MFA の詳細については、{" "}
      <a
        href="/docs/secure/multi-factor-authentication/auth0-guardian"
        target="_blank"
      >
        Auth0 Guardian のドキュメント
      </a>
      を参照してください。
    </Step>,

    <Step title="Auth0 Guardian を使用するユーザーを登録する">
      CIBA プッシュリクエストを開始するには、認可を行うユーザーがプッシュ通知を使用する
      MFA に登録されている必要があります。認可を行うユーザーが
      MFA プッシュ通知に登録されているかを{" "}
      <a href="http://manage.auth0.com/" target="_blank">
        Auth0 Dashboard
      </a>
      で確認するには、<strong>User Management &gt; Users</strong> に移動し、
      ユーザーをクリックします。<strong>Multi-Factor Authentication</strong> に、
      ユーザーが登録している認証要素が一覧表示されます。
      <Frame>
        <img
          src="/docs/images/ai/user_enrolled_in_auth0_guardian.png"
          alt="Auth0 Guardian に登録されたユーザー"
        />
      </Frame>
      ユーザーが登録されていない場合は、メールで登録リクエストを送信できます。
      <Frame>
        <img
          src="/docs/images/ai/enroll_user_in_auth0_guardian.png"
          alt="Guardian Push を有効にするスクリーンショット"
        />
      </Frame>
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
      開始する前に、次の手順を完了していることを確認してください。
      <Steps>{steps}</Steps>
    </>
  );
};