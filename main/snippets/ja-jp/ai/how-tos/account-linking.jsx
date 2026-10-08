export const AccountLinking = ({ connectionLabel = "任意のIDプロバイダー" }) => (
  <>
    <h2>アカウントリンク</h2>
    <p>
      {connectionLabel} と統合していて、ユーザーが別の
      方法（ユーザー名とパスワード、または別の外部プロバイダーなど）でサインインできるようにするには、これらの
      ID を1つのユーザーアカウントにリンクする必要があります。Auth0 では、このプロセスを{" "}
      <a href="/docs/manage-users/user-accounts/user-account-linking">
        アカウントリンク
      </a>
      と呼びます。
    </p>
    <p>
      アカウントリンクは、以下とは別の機能です。{" "}
      <a href="/docs/secure/call-apis-on-users-behalf/token-vault/connected-accounts-for-token-vault">
        Token Vault の接続済みアカウント
      </a>
      ：
    </p>
    <ul>
      <li>アカウントリンクでは、複数の Auth0 ID をサインイン用の1つのユーザープロファイルに統合します。</li>
      <li>
        Token Vault の接続済みアカウントでは、サインイン中のユーザーが外部
        プロバイダーを認可できるため、Auth0 はそのプロバイダーのトークンを Token Vault に保存できます。
      </li>
    </ul>
    <p>
      アプリケーションで{" "}
      <a href="/docs/manage-users/organizations">Organizations</a> を使用している場合は、接続済みアカウントのフローを開始する前に、
      対象の Organization でユーザーを認証してください。Organizations
      はセッションコンテキストを定義しますが、Organization 用の共有外部アカウントを作成するものではありません。
    </p>
    <p>
      アカウントリンクのロジックと処理は、アプリまたはエージェントによって異なります。
      実装例は{" "} <a href="https://github.com/auth0-lab/market0/blob/main/app/api/auth/%5Bauth0%5D/route.ts#L43">Next.js チャットボットアプリ</a>で確認できます
      。質問がある場合やベストプラクティスをお探しの場合は、{" "}
      <a href="http://discord.gg/XbQpZSF2Ys">Discord に参加</a>し、{" "}
      <code>#auth0-for-gen-ai</code> チャンネルで質問してください。
    </p>
  </>
);