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

          // 表示用: プレースホルダー以外のクライアントシークレットはマスクする
          let displayValue = value;
          if (key === "{yourClientSecret}" && value !== "{yourClientSecret}") {
            displayValue = value.substring(0, 3) + "*****MASKED*****";
          }

          processedChildrenForDisplay = processedChildrenForDisplay.replaceAll(
            new RegExp(escapedKey, "g"),
            displayValue
          );

          // コピー用: 実際の値を使用する（マスクなし）
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

  // マスクされていないテキストをコピーするため、クリップボードへの書き込みを上書きする
  useEffect(() => {
    if (!wrapperRef.current) return;

    const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
    let isOverriding = false;

    const handleClick = (e) => {
      const button = e.target.closest('[data-testid="copy-code-button"]');
      if (!button || !wrapperRef.current.contains(button)) return;

      // 次のクリップボードへの書き込みを上書きするフラグを設定する
      isOverriding = true;

      // writeText を一時的に上書きする
      navigator.clipboard.writeText = (text) => {
        
        if (isOverriding) {
          isOverriding = false;
          // すぐに元の関数を復元する
          navigator.clipboard.writeText = originalWriteText;
          // copyText を書き込む
          return originalWriteText(copyText);
        }
        return originalWriteText(text);
      };

      // 書き込みが行われなかった場合に備え、少し待ってからリセットする
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
      // まだ上書きされている場合は元に戻す
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