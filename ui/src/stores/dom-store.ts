import { observable, computed, action } from 'mobx';

export interface DOMState {
  windowWidth: number;
  windowHeight: number;
  currentUrl: string;
  isDocumentReady: boolean;
  lastFocusTime: number;
  orientationAngle: number;
}

class DOMStore {
  @observable windowWidth: number = window.innerWidth;
  @observable windowHeight: number = window.innerHeight;
  @observable currentUrl: string = window.location.href;
  @observable isDocumentReady: boolean = document.readyState === 'complete';
  @observable lastFocusTime: number = Date.now();
  @observable orientationAngle: number = window.screen?.orientation?.angle || 0;

  private disposers: Array<() => void> = [];

  constructor() {
    this.setupEventListeners();
  }

  @computed get isMobileViewport(): boolean {
    return this.windowWidth <= 768;
  }

  @computed get hasUrlChanged(): boolean {
    return this.currentUrl !== window.location.href;
  }

  @computed get shouldReinitialize(): boolean {
    // Reactive trigger for reinitialization based on state changes
    return Boolean(
      this.hasUrlChanged || this.isDocumentReady || this.lastFocusTime, // This changes when window gains focus
    );
  }

  @action private updateWindowSize = (): void => {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  };

  @action private updateUrl = (): void => {
    this.currentUrl = window.location.href;
  };

  @action private updateDocumentReady = (): void => {
    this.isDocumentReady = document.readyState === 'complete';
  };

  @action private updateLastFocus = (): void => {
    this.lastFocusTime = Date.now();
  };

  @action private updateOrientation = (): void => {
    this.orientationAngle = window.screen?.orientation?.angle || 0;
  };

  private setupEventListeners(): void {
    // Window resize
    window.addEventListener('resize', this.updateWindowSize);
    this.disposers.push(() =>
      window.removeEventListener('resize', this.updateWindowSize),
    );

    // Window focus
    window.addEventListener('focus', this.updateLastFocus);
    this.disposers.push(() =>
      window.removeEventListener('focus', this.updateLastFocus),
    );

    // Document ready state
    const checkDocumentReady = () => {
      if (document.readyState === 'complete') {
        this.updateDocumentReady();
      }
    };
    document.addEventListener('readystatechange', checkDocumentReady);
    this.disposers.push(() =>
      document.removeEventListener('readystatechange', checkDocumentReady),
    );

    // Orientation change
    window.addEventListener('orientationchange', this.updateOrientation);
    this.disposers.push(() =>
      window.removeEventListener('orientationchange', this.updateOrientation),
    );

    // URL changes (popstate, hashchange)
    window.addEventListener('popstate', this.updateUrl);
    window.addEventListener('hashchange', this.updateUrl);
    this.disposers.push(() =>
      window.removeEventListener('popstate', this.updateUrl),
    );
    this.disposers.push(() =>
      window.removeEventListener('hashchange', this.updateUrl),
    );

    // History API overrides (for Next.js client-side navigation)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      // Add a small delay for Next.js to complete navigation
      setTimeout(() => this.updateUrl(), 50);
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      // Add a small delay for Next.js to complete navigation
      setTimeout(() => this.updateUrl(), 50);
    };

    this.disposers.push(() => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    });

    // Listen for Next.js router events if available
    if (typeof window !== 'undefined' && (window as any).next) {
      const router = (window as any).next.router;
      if (router && router.events) {
        const handleRouteChange = () => {
          setTimeout(() => this.updateUrl(), 100);
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        router.events.on('hashChangeComplete', handleRouteChange);

        this.disposers.push(() => {
          router.events.off('routeChangeComplete', handleRouteChange);
          router.events.off('hashChangeComplete', handleRouteChange);
        });
      }
    }
  }

  dispose(): void {
    this.disposers.forEach((dispose) => dispose());
    this.disposers = [];
  }
}

export const domStore = new DOMStore();
