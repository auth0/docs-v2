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

          // Pour l'affichage : masquer le secret client s'il ne s'agit pas de la valeur d'espace réservé
          let displayValue = value;
          if (key === "{yourClientSecret}" && value !== "{yourClientSecret}") {
            displayValue = value.substring(0, 3) + "*****MASQUÉ*****";
          }

          processedChildrenForDisplay = processedChildrenForDisplay.replaceAll(
            new RegExp(escapedKey, "g"),
            displayValue
          );

          // Pour la copie : utiliser la valeur réelle (non masquée)
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

  // Intercepter l'écriture dans le presse-papiers pour copier le texte non masqué
  useEffect(() => {
    if (!wrapperRef.current) return;

    const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
    let isOverriding = false;

    const handleClick = (e) => {
      const button = e.target.closest('[data-testid="copy-code-button"]');
      if (!button || !wrapperRef.current.contains(button)) return;

      // Activer l'indicateur pour remplacer la prochaine écriture dans le presse-papiers
      isOverriding = true;

      // Remplacer writeText temporairement
      navigator.clipboard.writeText = (text) => {
        
        if (isOverriding) {
          isOverriding = false;
          // Rétablir la fonction d'origine immédiatement
          navigator.clipboard.writeText = originalWriteText;
          // Écrire copyText à la place
          return originalWriteText(copyText);
        }
        return originalWriteText(text);
      };

      // Réinitialiser après un court délai au cas où l'écriture ne se produirait pas
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
      // Rétablir la fonction d'origine si elle est toujours remplacée
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