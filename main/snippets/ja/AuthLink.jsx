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

        // 処理後の href が変更された場合にのみ state を更新する
        // これにより、有効な href がある場合にのみアンカータグをレンダリングできる
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