/**
 * Fix Radix popper positioning in Mintlify
 * Mintlify's layout breaks Radix's transform-based positioning
 */
export function setupPopperFix() {
  console.log("popper fix initialized");

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        if (
          node instanceof HTMLElement &&
          node.hasAttribute("data-radix-popper-content-wrapper")
        ) {
          // Small delay to ensure Radix has positioned the element
          requestAnimationFrame(() => {
            const menuContent = node.querySelector("[data-radix-menu-content]");
            const id = menuContent?.id;
            const trigger =
              id && document.querySelector(`[aria-controls="${id}"]`);

            if (trigger) {
              const rect = trigger.getBoundingClientRect();
              Object.assign(node.style, {
                position: "fixed",
                top: `${rect.bottom + 4}px`,
                left: `${rect.left}px`,
                transform: "none",
                zIndex: "9999",
              });
            }
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
}

/**
 * Detect Mintlify theme mode i.e. light or dark
 * @returns colorScheme
 */
export function detectColorScheme(): string {
  const htmlElement = document.documentElement;
  const colorScheme =
    htmlElement.style.colorScheme ||
    getComputedStyle(htmlElement).colorScheme ||
    "light";
  return colorScheme === "dark" ? "dark" : "light";
}
