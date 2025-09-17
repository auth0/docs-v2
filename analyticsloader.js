import React, { useEffect, useState } from "react";
import { State, loadScriptsWithConsent, getCookie, optanonWrapper } from "./src/services/utils";
import { getCookie } from "./src/services/utils";

/**
 * Consent-based analytics script loader
 */
export function AnalyticsConsentLoader() {
  //create state
  const [consents, setConsents] = useState([]);

  // Initialize analytics scripts state
  useEffect(() => {
    window.analyticsScripts = {
      heap: State.NotLoaded,
      optimizely: State.NotLoaded,
      pendo: State.NotLoaded,
      qualtrics: State.NotLoaded,
      usabilla: State.NotLoaded,
      ...window.analyticsScripts,
    };
  }, []);

  
  // Effect to load scripts when consents change
  useEffect(() => {
    if (consents.length > 0) {
      loadScriptsWithConsent(consents);
    }
  }, [consents]);

  // Effect to parse initial consent and set up OneTrust callback
  useEffect(() => {
    function updateConsentsFromCookie() {
      const optanonConsent = getCookie("OptanonConsent");
      const groups = optanonConsent
        ?.replace("OptanonConsent=", "")
        .split("&")
        .find((s) => s.includes("groups="));
      if (groups) {
        const parsedConsents = decodeURIComponent(groups.replace("groups=", ""))
          .split(",")
          .map((s) => {
            const [group, value] = s.split(":");
            return value === "1" ? group : null;
          })
          .filter(Boolean);
        setConsents(parsedConsents);
      }
    }

    // Initial load
    updateConsentsFromCookie();

    // OneTrust callback for consent changes
    window.optanonWrapper = function () {
      if (window.OnetrustActiveGroups) {
        const parsedConsents = window.OnetrustActiveGroups.split(",").slice(1, -1);
        setConsents(parsedConsents);
      }
    };
  }, []);

  return null; // This component does not render anything
}