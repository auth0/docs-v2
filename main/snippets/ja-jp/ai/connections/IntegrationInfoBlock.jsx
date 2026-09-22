export const IntegrationInfoBlock = ({ providerName }) => {
  return (
    <Callout icon="file-lines" color="#0EA5E9" iconType="regular">
      このガイドでは、Auth0 で <strong>{providerName}</strong> 接続をセットアップする手順を説明します。 
      このような接続を使用して、ユーザーに代わってアプリから第三者 API を呼び出す方法を一連の流れで示す例については、{' '}
      <a href="/ai/docs/get-started/call-third-party-apis-on-users-behalf">
        ユーザーに代わって第三者 API を呼び出すクイックスタート
      </a>をお読みください。
    </Callout>
  );
};