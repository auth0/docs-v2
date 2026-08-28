export function addResizeObserver() {
  // Dispatches resize event to window
  const triggerResize = () => {
    setTimeout(() => window.dispatchEvent(new Event('resize')));
  };

  const chatSheet = document.getElementById('chat-assistant-sheet');
  if (!chatSheet) return;

  let previousWidth = chatSheet.getBoundingClientRect().width;
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const newWidth = entry.contentRect.width;
      if (newWidth !== previousWidth) {
        previousWidth = newWidth;
        triggerResize();
      }
    }
  });
  observer.observe(chatSheet);
}
