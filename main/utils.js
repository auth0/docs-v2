const State = {
  NotLoaded: "not_loaded",
  Loading: "loading",
  Loaded: "loaded",
  Failed: "failed",
  Timeout: "timeout",
};

const ANALYTICS_EVENTS = "ANALYTICS_EVENTS";

// Analytics timeout logic
function startAnalyticsTimeout() {
  const TIMEOUT_DELAY = 15000;
  if (!window.__analyticsTimeoutStarted) {
    window.__analyticsTimeoutStarted = true;
    setTimeout(() => {
      const timeoutEvent = new CustomEvent(ANALYTICS_EVENTS, {
        detail: { state: State.Timeout },
      });
      window.dispatchEvent(timeoutEvent);
    }, TIMEOUT_DELAY);
  }
}

// Helper to load scripts based on consent
function injectConsentScript(consents) {
  if (consents.length <= 1) {
    if (
      window.OneTrust?.IsAlertBoxClosedAndValid() ||
      !!getCookie("OptanonAlertBoxClosed")
    ) {
      startAnalyticsTimeout();
    }
    return;
  }
  const scripts = document.querySelectorAll('script[class^="consent-required"][type="text/plain"]');
  if (scripts.length === 0) {
    return;
  }
  const consentsGiven = consents.map((c) => "C000" + c);
  const scriptsWithConsent = Array.from(scripts).filter((s) => {
    const consentsRequired = s.className.replace("consent-required:", "").split("-");
    return consentsRequired.every((cr) => consentsGiven.includes(cr));
  });
  scriptsWithConsent.forEach((s) => {
    const [service] = s.id.split("-");
    window.analyticsScripts = { ...window.analyticsScripts, [service]: State.Loading };
    s.remove();
    s.setAttribute("type", "text/javascript");
    document.head.appendChild(s);
  });
  startAnalyticsTimeout();
}

export function handleOptanonConsent() {
  try {
    if (window.OnetrustActiveGroups) {
      const consents = window.OnetrustActiveGroups.split(",").slice(1, -1);
      injectConsentScript(consents);
    }
  } catch (e) {
    console.warn("Error loading analytics scripts from wrapper", e);
  }
}

export function getCookie(name) {
  const cookieParts = document.cookie.split("; ");
  return cookieParts.find((s) => s.includes(`${name}=`));
}

export {
  State,
  ANALYTICS_EVENTS,
  handleOptanonConsent,
  injectConsentScript,
  getCookie
};