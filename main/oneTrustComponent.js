function attachOneTrustBanner() {
  const oneTrustBanner = document.createElement("div");
  oneTrustBanner.id = "custom-onetrust-banner";

  function renderBanner() {
    // Attach the button event listener after rendering
    console.log("Rendering OneTrust Banner");
    const consentLink = oneTrustBanner.querySelector("#onetrust-consent-link");
    if (consentLink) {
      consentLink.onclick = function(e) {
        e.preventDefault();
        if (window.OneTrust && window.OneTrust.ToggleInfoDisplay) {
          window.OneTrust.ToggleInfoDisplay();
          if (window.OneTrust.OnConsentChanged) {
            window.OneTrust.OnConsentChanged(function() {
              const banner = document.getElementById("custom-onetrust-banner");
              // if (banner) banner.remove();
            });
          }
        }
      };
    }
  }

  renderBanner();
  document.body.append(oneTrustBanner);
}

function loadOneTrustScript(domainId) {
  console.log("OneTrustBanner", { domainId });

  // load one-trust-script
  const script = document.createElement("script");
  script.src = `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`;
  script.setAttribute('data-ot-ignore', '');
  script.id = "cookie-consent-script";
  script.setAttribute("data-domain-script", domainId);
  script.type = "text/javascript";
  script.async = true;
  script.onload = attachOneTrustBanner;
  document.body.append(script);
}

document.addEventListener("readystatechange", () => {
    console.log("Document is fully loaded");
    loadOneTrustScript("96e22fd8-d619-4cdd-a3c6-d51529d21faf-test");

});