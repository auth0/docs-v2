// State constants
const State = {
  NotLoaded: "not_loaded",
  Loading: "loading",
  Loaded: "loaded",
  Failed: "failed",
  Timeout: "timeout",
};

const HEAP_CONFIGS = {
  sus: {
    ID: "",
    release: "docs-v2-sus",
    environment: "sus",
  },
  prod: {
    ID: "",
    release: "docs-v2",
    environment: "prod",
  },
    };
    //windows in binding here
const AUTH0_DOCS_ENV = window.AUTH0_DOCS_ENV || "prod"; 
const config = HEAP_CONFIGS[AUTH0_DOCS_ENV];

const ANALYTICS_EVENTS = "ANALYTICS_EVENTS";
const TIMEOUT_DELAY = 15000;
let timeoutStarted = false;

//currently working
const getCookies = (name) => {
    const cookieParts = document.cookie.split("; ");
  return cookieParts.find((s) => s.includes(`${name}=`));
};


function heap(heapId) {
    console.log("Loading Heap with ID:", heapId);
  // load one-trust-script
  const script = document.createElement("script");
  script.innerHTML = `window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],
  heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},
  window.heap.clientConfig.shouldFetchServerConfig=!1;
  var a=document.createElement("script");
  a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";
  var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);
  var n=["init",
  "startTracking",
  "stopTracking",
  "track","resetIdentity",
  "identify","identifyHashed",
  "getSessionId","getUserId","getIdentity",
  "addUserProperties","addEventProperties",
  "removeEventProperty","clearEventProperties",
  "addAccountProperties",
  "addAdapter",
  "addTransformer",
  "addTransformerFn",
  "onReady",
  "addPageviewProperties",
  "removePageviewProperty",
  "clearPageviewProperties",
  "trackPageview"],
  i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);
  window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};
  for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};
  heap.load(${heapId});`
  script.id = "heap-script";
  script.type = "text/plain";
  console.log("Adding consent-required class to Heap script");
  script.classList.add('consent-required:C0002');  
  script.async = true;
  document.body.append(script);
  console.log("Heap script added to the document");
}

// Consent check and Heap script loader
const optanonConsent = getCookies("OptanonConsent");
let hasConsent = false;
let hasDeniedConsent = false;

const loadConsentScripts = (consents) => {
  // Necessary consents will always be present, no need to load any scripts.
  // Otherwise none
  console.log("Current consents:", consents);
  if (consents.length <= 1) {
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
  heap("2269341915");
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
      heap("2269341915");
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
 if (optanonConsent) {
    console.log("OptanonConsent cookie found on preload:", optanonConsent);
  const groups = optanonConsent
    .replace("OptanonConsent=", "")
    .split("&")
    .find((s) => s.includes("groups="));
  if (groups) {
    console.log("Consent groups found on preload:", groups);
    const consents = decodeURIComponent(groups.replace("groups=", ""))
      .split(",")
      .map((s) => {
        const [group, value] = s.split(":");
        return value === "1" ? group : value === "0" ? "denied" : null;
      })
      .filter(Boolean);
    hasConsent = consents.some((c) => c !== "denied");
    hasDeniedConsent = consents.every((c) => c === "denied");
    console.log("Parsed consents on preload:", consents);
    console.log("Has consent:", hasConsent, "Has denied consent:", hasDeniedConsent);
    if (hasConsent) {
      heap("2269341915");
      console.log("Heap loaded on preload because consent is present");
    }
  }
   else {
    console.log("No consent groups found in OptanonConsent cookie on preload");
  }
}
   // Set OneTrust callback to check again after consent changes
    window.OptanonWrapper = optanonWrapper;
  } catch (e) {
    console.warn("Error loading analytics scripts from cookie", e);
  }
};

analyticsLoader();