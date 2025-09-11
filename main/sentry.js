// Dynamically load Sentry browser SDK
(function () {
  var script = document.createElement('script');
  script.src = 'https://js.sentry-cdn.com/66b846e0c465bc5aa1b02a23463be6f5.min.js';
  script.crossOrigin = 'anonymous';
  script.async = true;
  script.onload = function () {
    window.Sentry.init({
      dsn: "https://d433d747a8af0820757f35be62ee08be@o27592.ingest.us.sentry.io/4509985515241472",
      sendDefaultPii: true,
      release: "docs-v2",
      integrations: [
        // Add integrations here if needed
      ],
    });
  };
  document.head.appendChild(script);
})();