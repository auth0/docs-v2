import { useEffect, useRef } from 'react';

export const JsonLd = ({ data }) => {
  const scriptRef = useRef(null);

  useEffect(() => {
    if (scriptRef.current) {
      const safeJson = JSON.stringify(data).replace(/</g, '\\u003c');
      scriptRef.current.text = safeJson;
    }
  }, [data]);

  return <script type="application/ld+json" ref={scriptRef} />;
};
