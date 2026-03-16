import { config } from './config';

export function initAdobe(source: string): void {
  // load adobe tag manager script
  const script = document.createElement('script');
  script.id = 'adobe-script';
  script.src = source;
  script.async = true;
  // Important: Set type to 'text/plain' to prevent immediate execution
  // The actual execution will be controlled by OneTrust based on user consent
  script.type = 'text/plain';
  script.classList.add('consent-required:C0002'); // needed for one-trust
  script.crossOrigin = 'anonymous';

  // append to body tag
  document.body.append(script);
}

export function loadAdobeScript(): void {
  if (typeof window === 'undefined') return;

  // check if adobe tag manager is enabled
  if (!config.adobeTagManager.enabled || !config.adobeTagManager.loaderScript) {
    console.log('Adobe Tag Manager is disabled or script source is missing.');
    return;
  }

  initAdobe(config.adobeTagManager.loaderScript);
}
