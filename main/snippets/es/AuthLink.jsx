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
          const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          processedHref = processedHref.replace(new RegExp(escapedKey, "g"), value);
        }

        // Actualiza el estado solo si el href procesado cambió
        // Esto ayuda a renderizar la etiqueta de anclaje solo cuando tenemos un href válido
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