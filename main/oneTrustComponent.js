function attachOneTrustBanner() {
  const oneTrustBanner = document.createElement("div");
  oneTrustBanner.innerHTML = `<div
   style="
      position: fixed;
      right: 24px;
      bottom: 24px;
      width: 340px;
      height: 100px;
      background: #222;
      color: #fff;
      padding: 32px 48px;
      border-radius: 4px
      box-shadow: 0 -2px 16px rgba(0,0,0,0.15);
      z-index: 9999;
      font-size: 12px;
      max-width: 100vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "  >
   <span>
      This site uses cookies for analytics and personalization.
    </span>
    <button
      id="onetrust-consent-link"
      style="background: #90f; color: #fff; border: none; border-radius: 4px; padding: 4px 12px; font-size: 12px; margin-left: 24px; cursor: pointer;"
    >
      Manage preferences
    </button>
  </div>`;
  document.body.append(oneTrustBanner);

  const consentLink = document.getElementById("onetrust-consent-link");
  if (consentLink) {
    consentLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("OneTrust consent link clicked");
      if (window.OneTrust && window.OneTrust.ToggleInfoDisplay) {
        window.OneTrust.ToggleInfoDisplay();
      }
          // Close (remove) the custom banner immediately when clicked
    const banner = consentLink.closest("div");
    if (banner && banner.parentElement) {
      banner.parentElement.remove();
    }
    });
  }
}

function loadOneTrustScript(domainId) {
  console.log("OneTrustBanner", { domainId });

  // load one-trust-script
  const script = document.createElement("script");
  script.src = `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`;
  script.id = "cookie-consent-script";
  script.setAttribute("data-domain-script", domainId);
  script.type = "text/javascript";
  script.async = true;
  script.onload = attachOneTrustBanner;
  document.body.appendChild(script);
}

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    console.log("Document is fully loaded");
    loadOneTrustScript("96e22fd8-d619-4cdd-a3c6-d51529d21faf-test");
  }
});