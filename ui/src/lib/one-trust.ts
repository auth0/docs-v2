import { loadHeapScript } from './analytics';
import { config } from './config';
import { getCookies } from './cookies';

declare global {
  interface Window {
    OneTrust: {
      IsAlertBoxClosedAndValid: () => boolean;
    };
    OptanonWrapper: () => void;
    OnetrustActiveGroups: string;
  }
}

export function initOneTrust(): void {
  if (typeof window === 'undefined') return;

  // check if one-trust is enabled
  if (!config.oneTrust.enabled || !config.oneTrust.domainId) return;

  // load one-trust-script
  const script = document.createElement('script');
  script.src = `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`;
  script.id = 'cookie-consent-script';
  script.setAttribute('data-domain-script', config.oneTrust.domainId);
  script.type = 'text/javascript';
  script.async = true;

  // Set the OneTrust callback to handle consent changes
  window.OptanonWrapper = () => {
    if (window.OnetrustActiveGroups) {
      const consents = window.OnetrustActiveGroups.split(',').filter((c) => c);
      // load allowed scripts based on consents
      loadAllowedScripts(new Set(consents.map((group) => `C000${group}`)));
    }
  };

  // append to body tag
  document.body.append(script);

  // load analytics scripts content with type text/plain
  loadHeapScript();

  const consentsMap = parseConsentCookie();

  if (!consentsMap) {
    // No consent cookie found, wait for user consent
    return;
  }

  loadAllowedScripts(consentsMap);
}

function parseConsentCookie() {
  const optanonConsent = getCookies('OptanonConsent');

  // If no OptanonConsent cookie is found, we cannot preload analytics
  // once the user gives consent, the OneTrust callback will handle loading
  if (!optanonConsent) {
    return null;
  }

  // groups will be => 'groups=1%3A1%2C2%3A0%2C3%3A0%2C4%3A0'
  const groups = optanonConsent
    .replace('OptanonConsent=', '')
    .split('&')
    .find((s) => s.includes('groups='));

  if (!groups) {
    return null;
  }

  const allowedGroups = new Set<string>();

  decodeURIComponent(groups.replace('groups=', ''))
    .split(',') // ['1:1', '2:0', '3:0', '4:0']
    .forEach((c) => {
      if (!c) return false;
      const [_group, value] = c.split(':');
      if (value === '1') {
        allowedGroups.add(`C000${_group}`);
      }
    });

  return allowedGroups;
}

function loadAllowedScripts(consents: Set<string>) {
  // Only query scripts with type "text/plain" to avoid reinjecting the same script twice
  const scripts = document.querySelectorAll(
    'script[class^="consent-required"][type="text/plain"]',
  );

  if (scripts.length === 0) {
    // No scripts to load
    return;
  }

  const scriptsWithConsent = Array.from(scripts).filter((s) => {
    // a script can have multiple consents required, e.g. consent-required:C0002-C0003
    // we need to check if all required consents are given
    const consentsRequired = s.className
      .replace('consent-required:', '')
      .split('-');

      return consentsRequired.every((cr) => consents.has(cr));
  });

  // Re-inject scripts now with js type
  scriptsWithConsent.forEach((s) => {
    s.remove(); // remove the text/plain script tag
    s.setAttribute('type', 'text/javascript');
    document.head.appendChild(s); // re-append to head to execute
  });
}
