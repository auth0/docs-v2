// Dynamically load Sentry browser SDK

(function () {
  // Define your config for each environment
  const SENTRY_CONFIGS = {
    tus: {
      dsn: "https://d433d747a8af0820757f35be62ee08be@o27592.ingest.us.sentry.io/4509985515241472",
      release: "docs-v2-tus",
      environment: "tus",
    },
    sus: {
      dsn: "https://d433d747a8af0820757f35be62ee08be@o27592.ingest.us.sentry.io/4509985515241472",
      release: "docs-v2-sus",
      environment: "sus",
    },
    prod: {
      dsn: "https://d433d747a8af0820757f35be62ee08be@o27592.ingest.us.sentry.io/4509985515241472",
      release: "docs-v2",
      environment: "prod",
    },
  };

  const ENV = window.ENV || "prod"; 
  const config = SENTRY_CONFIGS[ENV];

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