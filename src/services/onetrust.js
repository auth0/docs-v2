import { ANALYTICS_EVENTS, State } from "./utils";

// Give 15s for scripts to load after consent is given
const TIMEOUT_DELAY = 15000;
let timeoutStarted = false;

const getCookies = (name) => {
  const cookieParts = document.cookie.split("; ");
  return cookieParts.find((s) => s.includes(`${name}=`));
};

const loadConsentScripts = (consents) => {
  // Necessary consents will always be present, no need to load any scripts
  if (consents.length <= 1) {
    // If consent was given manually start timeout to prevent dead ends
    if (window.OneTrust?.IsAlertBoxClosedAndValid() || !!getCookies("OptanonAlertBoxClosed")) {
      startTimeout();
    }
    return;
  }
  // Only query scripts with type "text/plain" to avoid reinjecting the same script twice
  const scripts = document.querySelectorAll('script[class^="consent-required"][type="text/plain"]');
  if (scripts.length === 0) {
    return;
  }
  const consentsGiven = consents.map((c) => "C000" + c);
  const scriptsWithConsent = Array.from(scripts).filter((s) => {
    const consentsRequired = s.className.replace("consent-required:", "").split("-");
    return consentsRequired.every((cr) => consentsGiven.includes(cr));
  });
  // Re-inject scripts now with js type
  scriptsWithConsent.forEach((s) => {
    const [service] = s.id.split("-");
    window.analyticsScripts = { ...window.analyticsScripts, [service]: State.Loading };
    s.remove();
    s.setAttribute("type", "text/javascript");
    document.head.appendChild(s);
  });
  // Start timeout for scripts loading
  startTimeout();
};

const startTimeout = () => {
  if (!timeoutStarted) {
    timeoutStarted = true;
    setTimeout(() => {
      const timeoutEvent = new CustomEvent(ANALYTICS_EVENTS, {
        detail: { state: State.Timeout },
      });
      window.dispatchEvent(timeoutEvent);
    }, TIMEOUT_DELAY);
  }
};

const optanonWrapper = () => {
  try {
    if (window.OnetrustActiveGroups) {
      const consents = window.OnetrustActiveGroups.split(",").slice(1, -1);
      loadConsentScripts(consents);
    }
  } catch (e) {
    console.warn("Error loading analytics scripts from wrapper", e);
  }
};

/**
 * OneTrust will get the cookie consents from the users,
 * based on that consent analytics scripts will be conditionally loaded
 */
const analyticsLoader = () => {
  try {
    // Initialize scripts state
    window.analyticsScripts = {
      heap: State.NotLoaded,
      optimizely: State.NotLoaded,
      pendo: State.NotLoaded,
      qualtrics: State.NotLoaded,
      usabilla: State.NotLoaded,
      ...window.analyticsScripts,
    };

    // Try to get consents from the OptanonConsent cookie
    const optanonConsent = getCookies("OptanonConsent");
    const groups = optanonConsent
      ?.replace("OptanonConsent=", "")
      .split("&")
      .find((s) => s.includes("groups="));

    if (groups) {
      const consents = decodeURIComponent(groups.replace("groups=", ""))
        .split(",")
        .map((s) => {
          const [group, value] = s.split(":");
          return value === "1" ? group : null;
        })
        .filter(Boolean);
      loadConsentScripts(consents);
    }

    // Set OneTrust callback to check again after consent changes
    window.OptanonWrapper = optanonWrapper;
  } catch (e) {
    console.warn("Error loading analytics scripts from cookie", e);
  }
};

analyticsLoader();