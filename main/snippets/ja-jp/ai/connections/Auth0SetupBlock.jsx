export const Auth0SetupBlock = ({
  providerName,
  clientIDName = "クライアント ID",
  clientSecretName = "クライアントシークレット",
  scopesName = "権限",
  allowFreeFormScopes = false,
  allowOfflineAccess = false,
}) => {
  return (
    <>
      <ol>
        <li>
          <a href="https://manage.auth0.com">Auth0 Dashboard</a> で{" "}
          <b>認証 &gt; ソーシャル</b>に移動します。
        </li>
        <li>
          <b>接続を作成</b>を選択し、<b>{providerName}</b>を選択します。
        </li>
        <li><b>続行</b>を選択します。</li>
        <li>
          <b>一般</b>で、次の操作を行います。
          <ol type="A">
            <li>
              {providerName} OAuth アプリの<b>{clientIDName}</b>と<b>{clientSecretName}</b>を入力します。
            </li>
            <li>
              <b>{scopesName}</b>で、アプリケーションに必要なスコープを選択します。
              これにより、認証（基本的なプロフィール情報へのアクセスなど）や API アクセス（プロバイダーの API への接続など）の際に、アプリケーションが {providerName} に要求できる権限が決まります。<br/><br/>Dropbox または Google のソーシャル
              接続では、Auth0 Dashboard で<b>オフラインアクセス</b>を選択し、
              クライアントアプリケーションが Auth0 のリフレッシュトークンを取得できるようにする必要があります。
            </li>
            {allowOfflineAccess && (
              <li>
                <b>{scopesName}</b>で、接続に対して<b>オフラインアクセス</b>を有効にします。
                これは、Auth0 が {providerName} からリフレッシュトークンを取得するために必要です。
              </li>
            )}
            {allowFreeFormScopes && (
              <li>
                アプリケーションに必要な追加のスコープを{" "}
                <b>追加のスコープ</b>フィールドに追加します。
              </li>
            )}
          </ol>
        </li>
        <li>
          <b>目的</b>で、<b>Token Vault の接続済みアカウント</b>をオンにします。これにより、
          接続で外部 API のアクセストークンを取得し、安全に保存できます。詳細については{" "}
          <a href="/docs/secure/call-apis-on-users-behalf/token-vault/connected-accounts-for-token-vault">
            Token Vault の接続済みアカウント
          </a>を参照してください。
        </li>
        <li><b>作成</b>を選択します。</li>
        <li>
          作成後、<b>アプリケーション</b>ページにリダイレクトされます。
          この接続を有効にするアプリケーションを選択します。
          <br />
          <Callout icon="file-lines" color="#0EA5E9" iconType="regular">新しい Auth0 テナントでは、<b>デフォルトアプリ</b>を選択できます。</Callout>
        </li>
        <li>
          {providerName} のソーシャル接続を作成したら、アプリケーションで使用する前に、<a href="/docs/authenticate/identity-providers/test-connections">接続をテスト</a>して設定が正しく機能することを確認してください。
        </li>
      </ol>
    </>
  );
};