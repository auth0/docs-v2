export function overrideHistoryMethods() {
  // Store the original history methods
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  // Create a custom event for route changes
  const createRouteChangeEvent = (
    data: unknown,
    unused: string,
    url?: string | URL | null,
  ) =>
    new CustomEvent('nextjs:routeChange', {
      detail: { data, unused, url },
    });

  // Override pushState
  history.pushState = function (
    ...args: [data: unknown, unused: string, url?: string | URL | null]
  ) {
    originalPushState.apply(this, args);
    window.dispatchEvent(createRouteChangeEvent(...args));
  };

  // Override replaceState
  history.replaceState = function (
    ...args: [data: unknown, unused: string, url?: string | URL | null]
  ) {
    originalReplaceState.apply(this, args);
    window.dispatchEvent(createRouteChangeEvent(...args));
  };
}

export function addRouteChangeListener(callback: () => void) {
  window.addEventListener('nextjs:routeChange', callback);
  window.addEventListener('popstate', callback);
}

export function removeRouteChangeListener(callback: () => void) {
  window.removeEventListener('nextjs:routeChange', callback);
  window.removeEventListener('popstate', callback);
}
