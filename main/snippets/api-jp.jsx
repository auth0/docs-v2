export const AuthenticationApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
            Authentication APIは、Auth0とサポート対象アイデンティティプロトコル（OpenID Connect、OAuth、SAMLなど）にID機能を提供します。
        </p>
        <p className="mt-3">
            通常、このAPIは、{" "}
            <a href="/docs/libraries/auth0js">Auth0.js</a>などのAuth0 SDKや<a href="/docs/libraries/lock">Lock</a>などのライブラリ経由で使用する必要があります。
            ただし、認証UIを手動で作成している場合は、Authentication APIを直接呼び出す必要があります。
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>タスク例をいくつか挙げます。</p>
        <ul className="space-y-2 !mt-0">
          <li>
            認証中に<a href="/docs/secure/tokens">トークン</a>を取得する
          </li>
          <li>
            <a href="/docs/secure/tokens/access-tokens">アクセストークン</a>を使用して、ユーザーのプロファイルをリクエストする
          </li>
          <li>
            <a href="/docs/secure/tokens/refresh-tokens">リフレッシュトークン</a>を新しいアクセストークンと交換する
          </li>
          <li>
            {" "}
            <a href="/docs/secure/multi-factor-authentication">多要素認証（MFA）</a>のチャレンジをリクエストする
          </li>
        </ul>
      </div>
    </div>
  );
};

export const ManagementApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          Management APIを使うと、Auth0アカウントをプログラムで管理できるため、お使いの環境の設定を自動化
          することができます。Auth0 Management Dashboardで行えるほとんどのタスクは、このAPIを使用することで
          プログラムで実行できます。
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>タスク例をいくつか挙げます。</p>
        <ul className="space-y-2 !mt-0">
          <li>お使いのアプリケーションやAPIをAuth0に登録する</li>
          <li>
            ユーザーが認証できる<a href="/docs/connections">接続</a>を設定する
          </li>
          <li>
            <a href="/docs/manage-users">ユーザーを管理する</a>
          </li>
          <li>
            <a href="/docs/manage-users/user-accounts/user-account-linking/link-user-accounts">ユーザーアカウントをリンクさせる</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const MyAccountApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          Auth0 My Account APIは、ユーザーが自分のアカウント情報を管理するための専用エンドポイントを提供します。
          これらのAPIを使用して、アプリケーション内でセルフサービスエクスペリエンスを構築したり、ユーザーアカウントに
          詳細情報を段階的に追加したりすることができます。
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>タスク例をいくつか挙げます。</p>
        <ul className="space-y-2 !mt-0">
          <li>エンドユーザーが自身の要素を管理できるようにする</li>
          <li>認証方法の詳細を更新する</li>
          <li>使用可能な認証方法を把握する</li>
        </ul>
      </div>
    </div>
  );
};

export const MyOrganizationApiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
      {/* Left column */}
      <div>
        <p>
          Auth0 My Organization API は、安全でOrganization範囲に対応したインターフェイスを提供し、
          ビジネス顧客が自身のOrganizationをAuth0テナント内で管理できるようにします。このAPIは、
          組み込み型委任管理やAPI優先統合の技術的な基盤として機能します。
          詳細については、<a href="/docs/manage-users/my-organization-api">こちらのドキュメント</a>をご覧ください。
        </p>
      </div>

      {/* Right column */}
      <div>
        <p>例を挙げます。</p>
        <ul className="space-y-2 !mt-0">
          <li>Auth0 Organizationの詳細（名前、ブランディング、表示名）</li>
          <li>Organization固有の構成、所有権、関係</li>
          <li>IDプロバイダー（IdP）およびSCIMプロビジョニング</li>
          <li>ドメインおよびホームレルムディスカバリー（HRD）の設定</li>
        </ul>
      </div>
    </div>
  );
}
