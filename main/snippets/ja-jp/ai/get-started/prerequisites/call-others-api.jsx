import { AccountAndAppSteps } from "/snippets/ai/get-started/prerequisites/account-app-steps.jsx";

export const Prerequisites = ({
  createAuth0ApplicationStep = {
    applicationType: "Regular Web Applications",
    callbackUrl: "http://localhost:3000/auth/callback",
    logoutUrl: "http://localhost:3000",
    allowedWebOrigins: undefined,
    enableTokenVaultGrant: undefined,
    enableRefreshTokenGrant: undefined,
    enableAllowRefreshTokenRotation: undefined
  },
  createAuth0ApiStep = undefined,
  createResourceServerClientStep = undefined
}) => {
  // Build steps array dynamically based on conditions
  const steps = []

  steps.push(
    ...AccountAndAppSteps({
      applicationType: createAuth0ApplicationStep.applicationType,
      callbackUrl: createAuth0ApplicationStep.callbackUrl,
      logoutUrl: createAuth0ApplicationStep.logoutUrl,
      appCreation: !!createAuth0ApplicationStep,
      allowedWebOrigins: createAuth0ApplicationStep.allowedWebOrigins,
      enableTokenVaultGrant: createAuth0ApplicationStep.enableTokenVaultGrant,
      enableRefreshTokenGrant: createAuth0ApplicationStep.enableRefreshTokenGrant,
      enableAllowRefreshTokenRotation: createAuth0ApplicationStep.enableAllowRefreshTokenRotation
    })
  )

  if (createAuth0ApiStep) {
    steps.push(
      <Step key="auth0-api" title="カスタムAPIを作成する">
        カスタムAPIとは、Auth0を使用して保護したい、ご自身が所有するAPIです。
        <ul>
          <li>
            Auth0 Dashboardで、{" "}
            <a href="https://manage.auth0.com/#/apis" target="_blank">
              <strong>［アプリケーション］＞［API］</strong>
            </a>
            に移動します。
          </li>
          <li>
            識別子（オーディエンス）を指定して新しいAPIを作成します。たとえば、<code>https://my-custom-api.com</code>のようにします。
          </li>
          <li>
            APIを作成したら、そのAPIの<strong>［設定］＞［アクセス設定］</strong>に移動し、<strong>［オフラインアクセスを許可］</strong>を有効にします。
          </li>
          <li>
            環境変数用にAPI識別子を控えておきます。このAPI識別子は、トークンリクエストのオーディエンスパラメーター（<code>AUTH0_AUDIENCE</code>）として使用します。
          </li>
        </ul>
      </Step>
    )
  }

  if (createResourceServerClientStep) {
    steps.push(
      <Step key="resource-server" title="カスタムAPIクライアントを作成する">
        カスタムAPIクライアントを使用すると、APIサーバーは{" "}
        <strong>
          <i>リフレッシュトークン</i>
        </strong>{" "}
        ではなく{" "}
        <strong>
          <i>アクセストークン</i>
        </strong>
        を使用してトークン交換を実行できます。このクライアントにより、Token Vaultはアクセストークンを外部APIのアクセストークン（例：Google Calendar API）と交換できるようになります。
        <br />
        <ul>
          <li>
            作成したAPIの<strong>［設定］</strong>ページで、右上隅にある<strong>［アプリケーションを追加］</strong>ボタンをクリックします。新しいカスタムAPIクライアントを作成するためのモーダルが開きます。
          </li>
          <li>
            ［アプリケーション名］フィールドにカスタムAPIクライアントの名前を入力し、<strong>［追加］</strong>ボタンをクリックして新しいカスタムAPIクライアントを作成します。
          </li>
          <li>
            作成が完了すると、新しく作成したカスタムAPIクライアントアプリケーションの設定ページにリダイレクトされます。環境変数用に<code>client id</code>と{" "}
            <code>client secret</code>を控えておきます。
          </li>
        </ul>
      </Step>
    )
  }
  // Always include these final steps

  steps.push(
    <Step key="my-account-api" title="My Account APIを構成する">
      連携済みアカウントのフローでは、{" "}
      <a href="/docs/manage-users/my-account-api" target="_blank">
        My Account API
      </a>{" "}
      を使用して、サポートされている外部プロバイダー全体でユーザーの連携済みアカウントを作成・管理します。
      <br />
      <br />
      Auth0 Dashboardで、My Account APIを次のように構成します。
      <ul>
        <li>
          <a href="https://manage.auth0.com/#/apis" target="_blank">
            <strong>［アプリケーション］＞［API］</strong>
          </a>
          に移動し、My Account APIのバナーを見つけて<strong>［有効にする］</strong>を選択し、Auth0 My Account APIを有効にします。
        </li>
        <li>
          有効にしたら、<strong>［Auth0 My Account API］</strong>を選択し、<strong>［アプリケーションアクセス］</strong>タブを選択します。
          <ul>
            <li>
              対象のクライアントアプリケーションを見つけて<strong>［編集］</strong>を選択し、その{" "}
              <a href="/docs/get-started/apis/api-access-policies-for-applications" target="_blank">
                アプリケーションのアクセスポリシー
              </a>
              を構成します。
            </li>
            <li>
              <strong>［ユーザーアクセス］</strong>を選択し、<strong>［認可］</strong>で<strong>［認可済み］</strong>を選択します。
            </li>
            <li>
              アクセス許可については、アプリケーション用に{" "}
              <a href="/docs/manage-users/my-account-api#scope" target="_blank">
                連携済みアカウントのスコープ
              </a>{" "}
を<strong>［すべて］</strong>選択します。
            </li>
            <li>
              <strong>［保存］</strong>を選択します。これにより、{" "}
              <a href="/docs/get-started/applications/application-access-to-apis-client-grants" target="_blank">
                クライアント許可
              </a>{" "}
              が作成され、クライアントアプリケーションがユーザーに代わって、連携済みアカウントのスコープでMy Account APIにアクセスできるようになります。
            </li>
          </ul>
        </li>
        <li>
          次に、<strong>［設定］</strong>タブに移動します。<strong>［アクセス設定］</strong>で、<strong>［ユーザーの同意のスキップを許可］</strong>を選択します。
        </li>
      </ul>
    </Step>
  )

  steps.push(
    <Step key="mrrt-policy" title="アプリケーション向けにマルチリソースリフレッシュトークンのポリシーを定義する">
      Webアプリケーションに対してMy Account APIへのアクセスが許可された後は、{" "}
      <a href="/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token" target="_blank">
        マルチリソースリフレッシュトークン
      </a>{" "}
      機能も活用する必要があります。この機能により、アプリケーションに配布されたリフレッシュトークンで、My Account APIを呼び出すためのアクセストークンも取得できるようになります。<br />
      <br />
      次の手順で、My Account API用のアクセストークンをリクエストする際にアプリケーションが使用する{" "}
      <a href="/docs/secure/tokens/refresh-tokens/multi-resource-refresh-token/configure-and-implement-multi-resource-refresh-token" target="_blank">
        リフレッシュトークンのポリシー
      </a>{" "}
      を手早く定義できます。
      <ul>
        <li>
          <a href="https://manage.auth0.com/#/applications" target="_blank">
            <strong>［アプリケーション］＞［アプリケーション］</strong>
          </a>{" "}
          に移動し、対象のクライアントアプリケーションを選択します。
        </li>
        <li>
          <strong>［設定］</strong>タブで、<strong>［マルチリソースリフレッシュトークン］</strong>セクションまでスクロールします。
        </li>
        <li>
          <strong>［構成を編集］</strong>を選択し、<strong>［Auth0 My Account API］</strong>のMRRTのトグルを有効にします。
        </li>
      </ul>
    </Step>
  )

  steps.push(
    <Step key="google-connection" title="Googleのソーシャル統合を構成する">
      <a href="/ai/docs/connections/google">Googleのソーシャル統合</a>の手順に従って、外部API呼び出しが可能なGoogle Cloudアカウントをセットアップします。
    </Step>
  )

  steps.push(
    <Step key="openai" title="OpenAI Platform">
      {" "}
      <a href="https://platform.openai.com/docs/libraries#create-and-export-an-api-key" target="_blank">
        OpenAIのアカウントとAPIキー
      </a>
      をセットアップします。
    </Step>
  )

  return (
    <>
      <Heading level={3} id="prerequisites">
        前提条件
      </Heading>
      始める前に、次の手順を完了しておいてください。
      <Steps>{steps}</Steps>
    </>
  )
}