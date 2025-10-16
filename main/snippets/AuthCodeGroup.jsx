export const AuthCodeGroup = ({ children, dropdown }) => {
  const [processedChildren, setProcessedChildren] = useState(children);

  useEffect(() => {
    let unsubscribe = null;

    function init() {
      unsubscribe = window.autorun(() => {
        const processChildren = (node) => {
          if (typeof node === "string") {
            let processedNode = node;
            for (const [
              key,
              value,
            ] of window.rootStore.variableStore.values.entries()) {
              processedNode = processedNode.replace(
                new RegExp(key, "g"),
                value
              );
            }
            return processedNode;
          } else if (Array.isArray(node)) {
            return node.map(processChildren);
          } else if (node && node.props && node.props.children) {
            return {
              ...node,
              props: {
                ...node.props,
                children: processChildren(node.props.children),
              },
            };
          }
          return node;
        };

        setProcessedChildren(processChildren(children));
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

  return <CodeGroup dropdown={dropdown}>{processedChildren}</CodeGroup>;
};
