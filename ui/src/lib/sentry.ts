import { config } from './config';

declare global {
  interface Window {
    Sentry: {
      init: (options: {
        dsn: string;
        sendDefaultPii: boolean;
        release: string;
        environment: string;
        integrations?: unknown[];
      }) => void;
    };
  }
}

export function initSentry(): void {
  if (typeof window === 'undefined') return;

  // check if Sentry is enabled
  if (!config.sentry.enabled || !config.sentry.loaderScript) return;

  // load Sentry script
  const script = document.createElement('script');
  script.src = config.sentry.loaderScript;
  script.crossOrigin = 'anonymous';
  script.async = true;
  script.onload = function () {
    window.Sentry.init({
      dsn: config.sentry.dsn,
      sendDefaultPii: true,
      release: config.sentry.release,
      environment: config.sentry.environment,
      integrations: [
        // Add integrations here if needed
      ],
    });
  };
  document.head.appendChild(script);
}
