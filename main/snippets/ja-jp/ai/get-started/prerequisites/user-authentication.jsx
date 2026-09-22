import { AccountAndAppSteps } from "/snippets/ai/get-started/prerequisites/account-app-steps.jsx";
export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
}) => {
  return (
    <>
      <Heading level={3} id="prerequisites">
        前提条件
      </Heading>
      始める前に、次の手順が完了していることを確認してください。
      <Steps>{AccountAndAppSteps({ callbackUrl, logoutUrl })}</Steps>
    </>
  );
};