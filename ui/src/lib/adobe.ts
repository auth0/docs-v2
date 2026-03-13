import { config } from './config';

export function initAdobe(source: string): void {
  // load adobe tag manager script
  const script = document.createElement('script');
  script.src = source;
  script.async = true;
  script.type = 'text/javascript';

  // append to body tag
  document.head.appendChild(script);
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
