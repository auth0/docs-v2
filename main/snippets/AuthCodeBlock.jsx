export const AuthCodeBlock = ({
  filename,
  icon,
  language,
  highlight,
  children,
}) => {
  const [processedChildren, setProcessedChildren] = useState(children);

  useEffect(() => {
    let unsubscribe = null;

    function init() {
      unsubscribe = window.autorun(() => {
        let processedChildren = children;
        for (const [
          key,
          value,
        ] of window.rootStore.variableStore.values.entries()) {
          const escapedKey = key.replaceAll(
            /[.*+?^${}()|[\]\\]/g,
            String.raw`\$&`
          );
          processedChildren = processedChildren.replaceAll(
            new RegExp(escapedKey, "g"),
            value
          );
        }
        setProcessedChildren(processedChildren);
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
  }, [children]);

  return (
    <CodeBlock
      filename={filename}
      icon={icon}
      language={language}
      lines
      highlight={highlight}
    >
      {processedChildren}
    </CodeBlock>
  );
};
