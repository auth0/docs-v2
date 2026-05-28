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

          // Para mostrar: enmascarar el Secreto del cliente si no es el marcador de posición
          let displayValue = value;
          if (key === "{yourClientSecret}" && value !== "{yourClientSecret}") {
            displayValue = value.substring(0, 3) + "*****ENMASCARADO*****";
          }

          processedChildrenForDisplay = processedChildrenForDisplay.replaceAll(
            new RegExp(escapedKey, "g"),
            displayValue
          );

          // Para copiar: usar el valor real (sin enmascarar)
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

  // Sobrescribir la escritura del portapapeles para copiar texto sin enmascarar
  useEffect(() => {
    if (!wrapperRef.current) return;

    const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
    let isOverriding = false;

    const handleClick = (e) => {
      const button = e.target.closest('[data-testid="copy-code-button"]');
      if (!button || !wrapperRef.current.contains(button)) return;

      // Establecer una marca para sobrescribir la siguiente escritura en el portapapeles
      isOverriding = true;

      // Sobrescribir writeText temporalmente
      navigator.clipboard.writeText = (text) => {
        
        if (isOverriding) {
          isOverriding = false;
          // Restaurar el original de inmediato
          navigator.clipboard.writeText = originalWriteText;
          // Escribir copyText en su lugar
          return originalWriteText(copyText);
        }
        return originalWriteText(text);
      };

      // Restablecerlo tras una breve espera por si la escritura no se realiza
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
      // Restaurar el original si sigue sobrescrito
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