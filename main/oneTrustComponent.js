function loadOneTrustScript(domainId) {
  // load one-trust-script
  const script = document.createElement("script");
  script.src = `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`;
  script.id = "cookie-consent-script";
  script.setAttribute("data-domain-script", domainId);
  script.type = "text/javascript";
  script.async = true;
  document.body.append(script);
}
if (!optanonConsent) {
  loadOneTrustScript("96e22fd8-d619-4cdd-a3c6-d51529d21faf-test");
}

document.addEventListener("readystatechange", () => {
   loadOneTrustScript("96e22fd8-d619-4cdd-a3c6-d51529d21faf-test");

});