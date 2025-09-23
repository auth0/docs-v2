import PropTypes from 'prop-types';
import Script from 'next/script';

export const cookieLevels = {
  NECESSARY: 1,
  PERFORMANCE: 2,
  FUNCTIONAL: 3,
  ADVERTISING: 4,
};

export const status = {
  WAITING_FOR_CONSENT: 'waitingForConsent',
  EXPRESSED_CONSENT: 'expressedConsent',
};

const OneTrustScript = ({ id }) => (
  <>
    <Script
      src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
      type="text/javascript"
      charSet="UTF-8"
      data-domain-script={id}
      id="consent-script"
    />
    <Script
      id="consent-wrapper"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
    function OptanonWrapper() {
      const consentStatus = document.getElementById("onetrust-accept-btn-handler") ? '${status.WAITING_FOR_CONSENT}' : '${status.EXPRESSED_CONSENT}';
      window.top.postMessage(consentStatus, '*');
    }
  `,
      }}
    />
  </>
);

OneTrustScript.propTypes = {
  id: PropTypes.string.isRequired,
};

export default OneTrustScript;