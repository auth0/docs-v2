import React from "react";

export function OneTrustBanner({ domainId, enabled }) {
  if (!enabled || !domainId) return null;

  return (
    <>
      {/* OneTrust cookie consent banner */}
      <script
        id="cookie-consent-script"
        charSet="UTF-8"
        type="text/javascript"
        data-domain-script={window.ONETRUST_DOMAIN_ID}
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
      ></script>
      {/* End OneTrust cookie consent banner */}
    </>
  );
}