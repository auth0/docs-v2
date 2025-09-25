// State constants
const State = {
  NotLoaded: "not_loaded",
  Loading: "loading",
  Loaded: "loaded",
  Failed: "failed",
  Timeout: "timeout",
};

const ANALYTICS_EVENTS = "ANALYTICS_EVENTS";
// Give 15s for scripts to load after consent is given
const TIMEOUT_DELAY = 15000;
let timeoutStarted = false;

// Helper to search for specific cookie by name
const getCookies = (name) => {
    console.log("Searching for cookie:", name);
    const cookieParts = document.cookie.split("; ");
  //return matching cookie if found
  //mighh be expected
  //if the coookie doesn't exist, it doens't load the scirpts because there aren't any cookies yet
  //so if the optanonconsent cookie doesn't exist, it won't load any scripts
  console.log("Current cookies:", document.cookie);
  return cookieParts.find((s) => s.includes(`${name}=`));
};

const loadConsentScripts = (consents) => {
  // Necessary consents will always be present, no need to load any scripts.
  // Otherwise none
  console.log("Current consents:", consents);
  if (consents.length <= 1) {
    // If consent was given manually start timeout to prevent dead ends
    //returns early
    console.log("No consents given, checking for manual consent");
    if (window.OneTrust?.IsAlertBoxClosedAndValid() || !!getCookies("OptanonAlertBoxClosed")) {
      startTimeout();
      console.log("Manual consent given, starting timeout");
    }
    return;
  }
  // Only query scripts with type "text/plain" to avoid reinjecting the same script twice
  const scripts = document.querySelectorAll('script[class^="consent-required"][type="text/plain"]');
  if (scripts.length === 0) {
    console.log("No consent-required scripts found");
    return;
  }
  const consentsGiven = consents.map((c) => "C000" + c);
  const scriptsWithConsent = Array.from(scripts).filter((s) => {
    const consentsRequired = s.className.replace("consent-required:", "").split("-");
    console.log(`Script ${s.id} requires consents:`, consentsRequired);
    return consentsRequired.every((cr) => consentsGiven.includes(cr));
  });
  // Re-inject scripts now with js type

  scriptsWithConsent.forEach((s) => {
    const [service] = s.id.split("-");
    window.analyticsScripts = { ...window.analyticsScripts, [service]: State.Loading };
    s.remove();
    s.setAttribute("type", "text/javascript");
    console.log(`Loading script ${s.id} with consents:`, consentsGiven);
    document.head.appendChild(s);
  });
  // Start timeout for scripts loading
  startTimeout();
};

const startTimeout = () => {
    console.log("Starting timeout for analytics scripts");
  if (!timeoutStarted) {
    timeoutStarted = true;
    console.log("Timeout started, will trigger in", TIMEOUT_DELAY, "ms");
    setTimeout(() => {
      const timeoutEvent = new CustomEvent(ANALYTICS_EVENTS, {
        detail: { state: State.Timeout },
      });
      console.log("Timeout reached, dispatching event:", timeoutEvent); 
      window.dispatchEvent(timeoutEvent);
    }, TIMEOUT_DELAY);
  }
};

const optanonWrapper = () => {
  try {
    if (window.OnetrustActiveGroups) {
      const consents = window.OnetrustActiveGroups.split(",").slice(1, -1);
      loadConsentScripts(consents);
      console.log("OnetrustActiveGroups found, loading consent scripts:", consents);
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
    console.log("OptanonConsent cookie:", optanonConsent);
    const groups = optanonConsent
      ?.replace("OptanonConsent=", "")
      .split("&")
      .find((s) => s.includes("groups="));
    console.log("OptanonConsent cookie found:", groups);
    if (groups) {
      const consents = decodeURIComponent(groups.replace("groups=", ""))
        .split(",")
        .map((s) => {
          const [group, value] = s.split(":");
          return value === "1" ? group : null;
        })
        .filter(Boolean);
      loadConsentScripts(consents);
      console.log("Consents found in OptanonConsent cookie, loading consent scripts:", consents);
    }

    // Set OneTrust callback to check again after consent changes
    window.OptanonWrapper = optanonWrapper;
  } catch (e) {
    console.warn("Error loading analytics scripts from cookie", e);
  }
};

analyticsLoader();