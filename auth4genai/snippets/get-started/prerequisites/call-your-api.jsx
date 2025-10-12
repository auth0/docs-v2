import { AccountAndAppSteps } from "/snippets/get-started/prerequisites/account-app-steps.jsx";

export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
}) => {
  const steps = AccountAndAppSteps({ callbackUrl, logoutUrl });

  steps.push(
    <Step title="OpenAI Platform">
      Set up an{" "}
      <a
        href="https://platform.openai.com/docs/libraries#create-and-export-an-api-key"
        target="_blank"
      >
        OpenAI account and API key
      </a>
      .
    </Step>
  );
  return (
    <>
      <Accordion title="Before you start">
          Before getting started, make sure you have completed the following steps:

          <Steps>{steps}</Steps>
      </Accordion>
    </>
  );
};
