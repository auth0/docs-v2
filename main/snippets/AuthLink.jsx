export const AuthLink = ({
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  children,
}) => {
  const [processedHref, setProcessedHref] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    function init() {
      unsubscribe = window.autorun(() => {
        let processedHref = href;
        for (const [
          key,
          value,
        ] of window.rootStore.variableStore.values.entries()) {
          processedHref = processedHref.replace(new RegExp(key, "g"), value);
        }

        // Only update state if the processed href has changed
        // This helps in rendering anchor tag only when we have a valid href
        if (processedHref !== href) {
          setProcessedHref(processedHref);
        }
      });
    }

    if (window.rootStore) {
      init();
    } else {
      window.addEventListener("adu:storeReady", init);
    }

    return () => {
      window.removeEventListener("adu:storeReady", init);
      unsubscribe?.();
    };
  }, [href]);

  if (!processedHref) {
    return <code>{href}</code>;
  }

  return (
    <a className="link" href={processedHref} target={target} rel={rel}>
      {children}
    </a>
  );
};
