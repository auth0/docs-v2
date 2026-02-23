function main() {
  const buttonSelector = '[data-testid="try-it-button"]';
  const callback = function (mutationsList, observer) {
    if (
      window.location.pathname.startsWith("/docs/api") &&
      !window.location.pathname.startsWith("/docs/api/management/")
    ) {
      const buttonToRemove = document.querySelector(buttonSelector);
      if (buttonToRemove) {
        buttonToRemove.parentNode.removeChild(buttonToRemove);
      }
    }
    observer.disconnect();
  };
  if ("navigation" in window) {
    window.navigation.addEventListener("navigate", function (event) {
      const destinationUrl = new URL(event.destination.url);
      if (
        destinationUrl.pathname.startsWith("/docs/api/") &&
        !destinationUrl.pathname.startsWith("/docs/api/management/")
      ) {
        const observer = new MutationObserver(callback);
        observer.observe(document.body, { childList: true, subtree: true });
      }
    });
  }
  if (
    window.location.pathname.startsWith("/docs/api/") &&
    !window.location.pathname.startsWith("/docs/api/management/")
  ) {
    const initialAttemptButton = document.querySelector(buttonSelector);
    if (initialAttemptButton) {
      initialAttemptButton.parentNode.removeChild(initialAttemptButton);
    }
  }
}
main();
