export const AccountAndAppSteps = ({
  applicationType = "通常の Web アプリケーション",
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  appCreation = true,
  allowedWebOrigins,
  copyDomain,
  enableTokenVaultGrant = false,
  enableRefreshTokenGrant = false,
  enableAllowRefreshTokenRotation = undefined,
}) => {
  const steps = [
    <Step title="Auth0 アカウントを作成">
      このクイックスタートを続行するには、{" "}
      <a
        href="https://auth0.com/signup?onboard_app=auth_for_aa&ocid=701KZ000000cXXxYAM-aPA4z0000008OZeGAM"
        target="_blank"
      >
        Auth0 アカウント
      </a>
      が必要です。
    </Step>,
  ];
  if (appCreation) {
    steps.push(
      <Step title="Auth0 アプリケーションを作成">
        {" "}
        <a href="https://manage.auth0.com/dashboard" target="_blank">
          Auth0 Dashboard
        </a>{" "}
        で新しい Auth0 アプリケーションを作成します。
        <ul>
          <li>
            左側のサイドバーで <a href="https://manage.auth0.com/#/applications" target="_blank"><strong>アプリケーション {">"} アプリケーション</strong></a> を
            開きます。
          </li>
          <li>
            右上にある <strong>アプリケーションを作成</strong> ボタンをクリック
            します。
          </li>
          <li>
            ポップアップで <strong>{applicationType}</strong> を選択し、{" "}
            <strong>作成</strong> をクリックします。
          </li>
          <li>
            アプリケーションを作成したら、{" "}
            <strong>設定</strong> タブに切り替えます。
          </li>
          {copyDomain && (
            <li>
              {" "}
              <strong>基本情報</strong> セクションの <strong>ドメイン</strong> を{" "}
              クリップボードにコピーします。
            </li>
          )}
          <li>
            <strong>アプリケーション URI</strong> セクションまで下にスクロールします。
          </li>
          <li>
            許可する Callback URL を次の値に設定します：<code>{callbackUrl}</code>
          </li>
          {logoutUrl && (
            <li>
              許可するログアウト URL を次の値に設定します：<code>{logoutUrl}</code>
            </li>
          )}
          {allowedWebOrigins && (
            <li>
              許可する Web オリジンを次の値に設定します：<code>{allowedWebOrigins}</code>
            </li>
          )}
          {enableAllowRefreshTokenRotation !== undefined && (
            <li>
              <strong>リフレッシュトークンのローテーション</strong> セクションまで下にスクロールし、<strong>リフレッシュトークンのローテーションを許可</strong> オプションを {enableAllowRefreshTokenRotation === true ? "有効化" : "無効化"} します。
            </li>
          )}
          {enableTokenVaultGrant && !enableRefreshTokenGrant && (
            <li>
              下にスクロールして <strong>詳細設定</strong> セクションを展開します。<strong>付与タイプ</strong> タブに切り替え、<strong>Token Vault</strong> 付与タイプを有効にします。
            </li>
          )}
          {enableTokenVaultGrant && enableRefreshTokenGrant && (
            <li>
              下にスクロールして <strong>詳細設定</strong> セクションを展開します。<strong>付与タイプ</strong> タブに切り替え、<strong>Token Vault</strong> と <strong>リフレッシュトークン</strong> の付与タイプを有効にします。
            </li>
          )}
          <li>
            右下の <strong>保存</strong> をクリックして変更を
            保存します。
          </li>
        </ul>
        Auth0 アプリケーションの詳細については、{" "}
        <a
          href="/docs/get-started/applications"
          target="_blank"
        >
          アプリケーション
        </a>
        をお読みください。
      </Step>
    );
  }
  return steps;
};