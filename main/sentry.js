// Dynamically load Sentry browser SDK

(function () {
  // Define your config for each environment
  const SENTRY_CONFIGS = {
    tus: {
      dsn: "https://8eae506d264532942aace9ecc223a526@o27592.ingest.us.sentry.io/4510008367972352",
      release: "docs-v2-tus",
      environment: "tus",
    },
    sus: {
      dsn: "https://0fe11b3e3241a0986fc2755ca26fbe79@o27592.ingest.us.sentry.io/4510008371970048",
      release: "docs-v2-sus",
      environment: "sus",
    },
    prod: {
      dsn: "https://d433d747a8af0820757f35be62ee08be@o27592.ingest.us.sentry.io/4509985515241472",
      release: "docs-v2",
      environment: "prod",
    },
  };

  const AUTH0_DOCS_ENV = window.AUTH0_DOCS_ENV || "prod"; 
  const config = SENTRY_CONFIGS[AUTH0_DOCS_ENV];

  var script = document.createElement('script');
  script.src = 'https://js.sentry-cdn.com/66b846e0c465bc5aa1b02a23463be6f5.min.js';
  script.crossOrigin = 'anonymous';
  script.async = true;
  script.onload = function () {
    window.Sentry.init({
      dsn: config.dsn,
      sendDefaultPii: true,
      release: config.release,
      environment: config.environment,
      integrations: [
        // Add integrations here if needed
      ],
    });
  };
  document.head.appendChild(script);
})();
