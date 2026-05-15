import { useEffect, useRef } from 'react';

export const JsonLd = () => {
  const scriptRef = useRef(null);

  useEffect(() => {
    if (scriptRef.current) {
      const data = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
      };
      scriptRef.current.text = JSON.stringify(data).replace(/</g, '\\u003c');
    }
  }, []);

  return <script type="application/ld+json" ref={scriptRef} />;
};
