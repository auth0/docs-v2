export function addAssistantEventListeners() {
  // Dispatches resize event to window
  const triggerResize = () => {
    setTimeout(() => window.dispatchEvent(new Event('resize')));
  };

  // Add triggerResize function to all ways of opening/closing assistant screen
  const askAiButton = document.getElementById('assistant-entry');
  const askAiFullscreenButton = document.querySelector(
    '[aria-label="Minimize assistant panel"]',
  );
  const askAiCloseButton = document.querySelector(
    '[aria-label="Close assistant panel"]',
  );
  askAiButton?.addEventListener('click', triggerResize);
  askAiFullscreenButton?.addEventListener('click', triggerResize);
  askAiCloseButton?.addEventListener('click', triggerResize);
  window.addEventListener('keydown', (event) => {
    if (event.metaKey && event.code === 'KeyI') {
      triggerResize();
    }
  });
}
