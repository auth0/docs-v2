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

        // Met à jour l’état seulement si le href traité a changé
        // Cela permet d’afficher la balise d’ancrage uniquement lorsque nous avons un href valide
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