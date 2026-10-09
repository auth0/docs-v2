export const CustomApiClient = ({
  apiName = "外部 API"
}) => {
  return (
    <Step title="Auth0 でカスタム API クライアントを作成する">
      カスタム API クライアントを使用すると、API サーバーでアクセストークンを使用した
      トークン交換を実行できます{" "}
      <strong>
        <i>アクセストークン</i>
      </strong>{" "}
      の代わりに{" "}
      <strong>
        <i>リフレッシュトークン</i>
      </strong>
      。このクライアントにより、Token Vault はアクセストークンを
      外部 API のアクセストークン（例: {apiName}）と交換できます。
      <br />
      <ul>
        <li>
          <strong>Applications &gt; APIs</strong> に移動します。
        </li>
        <li>
          <strong>Create API</strong> ボタンをクリックして、新しいカスタム
          API を作成します。
        </li>
        <li>
          作成したカスタム API に移動し、右上隅にある{" "}
          <strong>Add Application</strong> ボタンをクリックします。
        </li>
        <li>
          API をアプリケーションとして追加したら、右上隅にある <strong>Configure Application</strong> ボタンをクリックします。
        </li>
        <li>
          環境変数用に <code>client id</code> と <code>client secret</code>{" "}
          を控えておきます。
        </li>
      </ul>
    </Step>
  );
};