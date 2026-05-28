export const AuthCodeBlock = ({
  filename,
  icon,
  language,
  highlight,
  children,
}) => {
  const [displayText, setDisplayText] = useState(children);
  const [copyText, setCopyText] = useState(children);
  const wrapperRef = React.useRef(null);

  useEffect(() => {
    let unsubscribe = null;

    function init() {
      if (!window.autorun || !window.rootStore) {
        return;
      }

      unsubscribe = window.autorun(() => {
        let processedChildrenForDisplay = children;
        let processedChildrenForCopy = children;

        for (const [
          key,
          value,
        ] of window.rootStore.variableStore.values.entries()) {
          const escapedKey = key.replaceAll(
            /[.*+?^${}()|[\]\\]/g,
            String.raw`\$&`
          );

          // 表示用: プレースホルダーでない場合はクライアントシークレットをマスク
          let displayValue = value;
          if (key === "{yourClientSecret}" && value !== "{yourClientSecret}") {
            displayValue = value.substring(0, 3) + "*****マスク済み*****";
          }

          processedChildrenForDisplay = processedChildrenForDisplay.replaceAll(
            new RegExp(escapedKey, "g"),
            displayValue
          );

          // コピー用: 実際の値をそのまま使用する（マスクしない）
          processedChildrenForCopy = processedChildrenForCopy.replaceAll(
            new RegExp(escapedKey, "g"),
            value
          );
        }

        setDisplayText(processedChildrenForDisplay);
        setCopyText(processedChildrenForCopy);
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

  // マスクされていないテキストをコピーできるよう、クリップボードへの書き込みを上書き
  useEffect(() => {
    if (!wrapperRef.current) return;

    const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
    let isOverriding = false;

    const handleClick = (e) => {
      const button = e.target.closest('[data-testid="copy-code-button"]');
      if (!button || !wrapperRef.current.contains(button)) return;

      // 次回のクリップボード書き込みを上書きするためのフラグを設定
      isOverriding = true;

      // writeText を一時的に上書き
      navigator.clipboard.writeText = (text) => {
        
        if (isOverriding) {
          isOverriding = false;
          // すぐに元へ戻す
          navigator.clipboard.writeText = originalWriteText;
          // 代わりに copyText を書き込む
          return originalWriteText(copyText);
        }
        return originalWriteText(text);
      };

      // 書き込みが行われなかった場合に備えて、少し待ってからリセット
      setTimeout(() => {
        if (isOverriding) {
          isOverriding = false;
          navigator.clipboard.writeText = originalWriteText;
        }
      }, 100);
    };

    const wrapper = wrapperRef.current;
    wrapper.addEventListener('click', handleClick, true);

    return () => {
      wrapper.removeEventListener('click', handleClick, true);
      // まだ上書きされたままなら元へ戻す
      if (navigator.clipboard.writeText !== originalWriteText) {
        navigator.clipboard.writeText = originalWriteText;
      }
    };
  }, [copyText]);

  return (
    <div ref={wrapperRef}>
      <CodeBlock
        filename={filename}
        icon={icon}
        language={language}
        lines
        highlight={highlight}
      >
        {displayText}
      </CodeBlock>
    </div>
  );
};