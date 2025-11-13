export const AuthLink = ({ href, target = "_blank", rel = "noopener noreferrer", children }) => {
  const [processedHref, setProcessedHref] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let unsubscribe = null;

    const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const compute = () => {
      try {
        let next = href;

        // Support Map, { values: Map }, or plain object
        const vs = window.rootStore?.variableStore;
        const entries =
          (vs?.values?.entries && Array.from(vs.values.entries())) ||
          (vs?.entries && Array.from(vs.entries())) ||
          (vs && typeof vs === "object" ? Object.entries(vs) : []);

        for (const [rawKey, rawVal] of entries) {
          const key = String(rawKey ?? "");
          if (!key) continue;
          const val = String(rawVal ?? "");
          next = next.replace(new RegExp(escapeRegExp(key), "g"), val);
        }

        if (next !== href) setProcessedHref(next);
      } catch {
        // swallow errors so inline usage doesn't crash the MDX tree
      }
    };

    const init = () => {
      // re-check at call time (event may fire early)
      if (!window.rootStore) {
        compute(); // compute once anyway; keeps behavior if nothing changes
        return;
      }

      const run =
        typeof window.autorun === "function"
          ? window.autorun
          : (fn) => {
              fn();
              return () => {};
            }; // no-op reactive fallback

      unsubscribe = run(compute);
    };

    // If store already there, init now; else wait once for readiness
    if (window.rootStore) {
      init();
    } else {
      window.addEventListener("adu:storeReady", init, { once: true });
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
