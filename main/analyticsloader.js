const canUseDOM = () =>
  !!(typeof window !== 'undefined' && window.document && (window.env ? window.env.NODE_ENV !== 'test' : true));
/**
 * Consent-based analytics script loader
 */

const OneTrustStatus = { 
  WaitingForConsent: "WAITING_FOR_CONSENT",
  ExpressedConsent: "EXPRESSED_CONSENT",
}; 


export function AnalyticsConsentLoader() {
  //create state 
  const [consent, setConsent] = React.useState(window.OnetrustActiveGroups);
  
  useEffect(() => {
    const handleConsentChange = (e) => {
    if (e.data === OneTrustStatus.WaitingForConsent) {
      // eslint-disable-next-line new-cap
      window.OneTrust.OnConsentChanged(() =>
        setConsentLevel(window.OnetrustActiveGroups),
      );
    }  else if (
      e.data === OneTrustStatus.ExpressedConsent, &&
      window.OnetrustActiveGroups !== consentLevel
    ) {
      setConsentLevel(window.OnetrustActiveGroups);
    }
  };
    window.addEventListener('message', handleConsentChange, false);
    return () => window.removeEventListener('message', handleConsentChange);
  });
}

//Why doesn't OneTrust need "consent-required"?

// The OneTrust script is always loaded so it can display the consent banner and manage user choices.
// It is not subject to consent; it is the mechanism by which consent is managed.
// If OneTrust itself required consent, there would be no way for users to express their preferences, creating a paradox.
// Summary:
// All other analytics scripts require consent and use the "consent-required" class so OneTrust can control their loading. 
// The OneTrust banner script itself must always be loaded and is exempt from consent gating, so it does not include the "consent-required" class.