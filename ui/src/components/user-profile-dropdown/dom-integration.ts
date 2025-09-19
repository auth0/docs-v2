import React from 'react';
import ReactDOM from 'react-dom/client';
import { reaction } from 'mobx';
import { UserProfileDropdown } from './user-profile-dropdown';
import { authStore, domStore } from '../../stores';

export interface IntegrationOptions {
  enableSPARouting?: boolean;
}

export class DocsUIIntegration {
  private static instance: DocsUIIntegration;
  private roots: Map<HTMLElement, ReactDOM.Root> = new Map();
  private isInitialized = false;
  private disposers: Array<() => void> = [];
  private mutationTimeout: NodeJS.Timeout | null = null;

  constructor(_options: IntegrationOptions = {}) {
    // Set up MobX-based reactive initialization
    this.setupReactiveInitialization();
  }

  static getInstance(options?: IntegrationOptions): DocsUIIntegration {
    if (!DocsUIIntegration.instance) {
      DocsUIIntegration.instance = new DocsUIIntegration(options);
    }
    return DocsUIIntegration.instance;
  }

  /**
   * Initialize the UserProfileDropdown in the documentation app
   */
  async initializeUserProfileDropdown(): Promise<void> {
    try {

      // Update authenticated class regardless of auth status
      this.updateAuthenticatedClass();

      // Always initialize the dropdown structure, regardless of auth status
      // The component itself will render login button or user profile based on auth state
      await this.initializeWithinNavbarStructure();
    } catch (error) {
      console.error('Failed to initialize UserProfileDropdown:', error);
    }
  }

  /**
   * Update the authenticated class on the navbar/body
   */
  private updateAuthenticatedClass(): void {
    // Add authenticated class to body when user is authenticated
    if (authStore.isAuthenticated) {
      document.body.classList.add('authenticated');
    } else {
      document.body.classList.remove('authenticated');
    }
  }

  /**
   * Set up MobX-based reactive initialization
   */
  private setupReactiveInitialization(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // React to auth state changes
    const authReaction = reaction(
      () => authStore.isAuthenticated,
      (isAuthenticated) => {
        console.log('Auth state changed:', isAuthenticated);
        this.updateAuthenticatedClass();
        this.reinitializeIfNeeded();
      },
    );
    this.disposers.push(authReaction);

    // React to viewport changes (mobile/desktop switching)
    const viewportReaction = reaction(
      () => domStore.isMobileViewport,
      () => {
        console.log('Viewport changed, reinitializing layout');
        this.cleanupExistingDropdowns();
        this.initializeWithinNavbarStructure();
      },
    );
    this.disposers.push(viewportReaction);

    // React to URL changes (Next.js client-side routing)
    const urlReaction = reaction(
      () => domStore.currentUrl,
      (newUrl, previousUrl) => {
        console.log('URL changed from', previousUrl, 'to', newUrl);

        // In Next.js, the navbar might be re-rendered during navigation
        // We need to wait for the DOM to stabilize and then check/reinitialize
        setTimeout(() => {
          const existingDropdown = document.querySelector(
            '.user-profile-dropdown',
          );
          const navbar = document.querySelector(
            'nav, .navbar, .navigation, [role="navigation"]',
          );

          if (!existingDropdown || !navbar) {
            console.log(
              'Dropdown or navbar missing after Next.js navigation, reinitializing',
            );
            this.reinitializeIfNeeded();
          } else {
            // Check if our dropdown is properly connected to React
            const hasReactProps =
              existingDropdown.hasAttribute('data-reactroot') ||
              existingDropdown.querySelector('[data-reactroot]') ||
              (existingDropdown as any)._reactInternalFiber ||
              (existingDropdown as any)._reactInternalInstance;

            if (!hasReactProps) {
              console.log(
                'Dropdown exists but React component is disconnected, reinitializing',
              );
              this.reinitializeIfNeeded();
            } else {
              console.log(
                'Dropdown exists and React is connected, refreshing auth status only',
              );
              this.updateAuthenticatedClass();
            }
          }
        }, 100); // Small delay to let Next.js finish DOM updates
      },
    );
    this.disposers.push(urlReaction);

    // React to DOM structure changes (important for Next.js)
    const domStructureReaction = reaction(
      () => [
        domStore.isDocumentReady,
        domStore.windowWidth,
        domStore.windowHeight,
      ],
      () => {
        // Use a longer delay to let Next.js finish any DOM manipulation
        setTimeout(() => {
          const existingDropdown = document.querySelector(
            '.user-profile-dropdown',
          );
          const navbar = document.querySelector(
            'nav, .navbar, .navigation, [role="navigation"]',
          );

          if (navbar && !existingDropdown) {
            console.log('Navbar exists but dropdown missing, initializing');
            this.initializeUserProfileDropdown();
          }
        }, 200);
      },
    );
    this.disposers.push(domStructureReaction);

    // React to document ready state
    const documentReaction = reaction(
      () => domStore.isDocumentReady,
      (isReady) => {
        if (isReady) {
          console.log('Document ready, initializing');
          this.initializeUserProfileDropdown();
        }
      },
    );
    this.disposers.push(documentReaction);

    // React to focus changes
    const focusReaction = reaction(
      () => domStore.lastFocusTime,
      () => {
        console.log('Window focused, checking initialization');
        this.reinitializeIfNeeded();
      },
    );
    this.disposers.push(focusReaction);

    // React to orientation changes
    const orientationReaction = reaction(
      () => domStore.orientationAngle,
      () => {
        console.log('Orientation changed, reinitializing');
        this.cleanupExistingDropdowns();
        this.initializeWithinNavbarStructure();
      },
    );
    this.disposers.push(orientationReaction);

    // Trigger initial initialization if document is already ready
    if (domStore.isDocumentReady) {
      console.log('Document already ready, initializing immediately');
      // Use setTimeout to avoid blocking the constructor
      setTimeout(() => this.initializeUserProfileDropdown(), 0);
    } else {
      // Also trigger initialization after a short delay as a fallback
      console.log('Document not ready yet, setting up fallback initialization');
      setTimeout(() => {
        console.log('Fallback initialization trigger');
        this.initializeUserProfileDropdown();
      }, 1000);
    }

    // Set up MutationObserver for Next.js DOM changes
    this.setupNavbarMutationObserver();
  }

  /**
   * Set up MutationObserver to detect Next.js navbar changes
   */
  private setupNavbarMutationObserver(): void {
    if (typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver((mutations) => {
      let shouldReinitialize = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if any navbar-related elements were added/removed
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);

          const isNavbarChange = [...addedNodes, ...removedNodes].some(
            (node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                return (
                  element.matches(
                    'nav, .navbar, .navigation, [role="navigation"]',
                  ) ||
                  element.querySelector(
                    'nav, .navbar, .navigation, [role="navigation"]',
                  ) ||
                  element.classList.contains('user-profile-dropdown')
                );
              }
              return false;
            },
          );

          if (isNavbarChange) {
            shouldReinitialize = true;
          }
        }
      });

      if (shouldReinitialize) {
        console.log(
          'Navbar DOM structure changed (Next.js navigation), reinitializing...',
        );
        // Debounce reinitializations
        if (this.mutationTimeout) {
          clearTimeout(this.mutationTimeout);
        }
        this.mutationTimeout = setTimeout(() => {
          this.reinitializeIfNeeded();
        }, 150);
      }
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    this.disposers.push(() => observer.disconnect());
  }

  /**
   * Initialize dropdown by working within the existing navbar structure
   */
  private async initializeWithinNavbarStructure(): Promise<void> {
    // Short delay to let any DOM changes settle
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Clean up any existing dropdowns first
    this.cleanupExistingDropdowns();

    // Determine if we should use mobile or desktop layout using MobX store
    const useMobileLayout =
      domStore.isMobileViewport || this.shouldUseMobileLayout();

    if (useMobileLayout) {
      this.initializeMobileDropdown();
      return;
    }

    // Desktop layout initialization
    // Find the navbar link container with multiple fallback strategies
    let navbarLink = document.querySelector('.navbar-link') as HTMLElement;
    let navbar = navbarLink?.parentElement;

    if (!navbarLink || !navbar) {
      console.log(
        'Standard .navbar-link not found, trying fallback selectors...',
      );

      // Try common navbar selectors
      const navbarSelectors = [
        'nav ul',
        '.navbar ul',
        '.navigation ul',
        '.nav ul',
        '.topbar ul',
        '.header ul',
        '[role="navigation"] ul',
        'header nav ul',
        '.navbar-nav',
        '.nav-menu',
      ];

      for (const selector of navbarSelectors) {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          console.log(`Found navbar using selector: ${selector}`);
          navbar = element;
          navbarLink = (element.querySelector('li') as HTMLElement) || element; // Get first li or use the ul itself
          break;
        }
      }
    }

    if (!navbar) {
      console.warn(
        'No suitable navbar structure found for dropdown integration',
      );
      return;
    }

    console.log('Found navbar structure:', navbar);

    // Check if our dropdown already exists
    const existingDropdown = navbar.querySelector('.user-profile-dropdown');
    if (existingDropdown) {
      this.createUserProfileDropdown(existingDropdown as HTMLElement, {
        isMobile: false,
        className: 'navbar-integrated-dropdown',
      });
      return;
    }

    // Replace the "Login" link with dropdown
    const loginLink = Array.from(navbar.querySelectorAll('a')).find((link) => {
      const text = link.textContent?.toLowerCase() || '';
      const href = link.href || '';
      return text.includes('login') || href.includes('/login');
    });

    if (loginLink && loginLink.parentElement) {
      const loginContainer = loginLink.parentElement;

      // Convert the existing login container to our dropdown container
      loginContainer.className = 'user-profile-dropdown navbar-link';
      loginContainer.innerHTML = ''; // Clear existing content

      // Initialize React component within this existing structure
      this.createUserProfileDropdown(loginContainer as HTMLElement, {
        isMobile: false,
        className: 'navbar-integrated-dropdown',
      });
      return;
    }

    // Fallback: Create a new dropdown container
    const dropdownContainer = document.createElement('li');
    dropdownContainer.className = 'user-profile-dropdown navbar-link';

    // Insert it in the right place - before the CTA button
    const topbarCtaButton = navbar.querySelector('#topbar-cta-button');
    if (topbarCtaButton) {
      navbar.insertBefore(dropdownContainer, topbarCtaButton);
    } else {
      navbar.appendChild(dropdownContainer);
    }

    // Initialize React component within this structure
    this.createUserProfileDropdown(dropdownContainer, {
      isMobile: false,
      className: 'navbar-integrated-dropdown',
    });
  }

  /**
   * Check if we should show mobile layout based on DOM structure (fallback check)
   */
  private shouldUseMobileLayout(): boolean {
    // Check if mobile navigation is visible (common mobile menu indicators)
    const mobileIndicators = [
      '.mobile-nav',
      '.mobile-menu',
      '[data-mobile-nav]',
      '.hamburger-menu',
      '.menu-toggle',
      '.nav-toggle',
      '.mobile-menu-button',
    ];

    // Tailwind responsive selectors (with proper escaping and error handling)
    const tailwindSelectors = [
      '[class*="md:hidden"]',
      '[class*="sm:hidden"]',
      '[class*="lg:hidden"]',
    ];

    const checkSelectors = (selectors: string[]) => {
      return selectors.some((selector) => {
        try {
          const element = document.querySelector(selector);
          return element && this.isElementVisible(element);
        } catch (e) {
          // Skip invalid selectors silently
          console.debug(`Skipping invalid selector: ${selector}`);
          return false;
        }
      });
    };

    return (
      checkSelectors(mobileIndicators) || checkSelectors(tailwindSelectors)
    );
  }

  /**
   * Reinitialize if needed (simplified version for MobX reactions)
   */
  private async reinitializeIfNeeded(): Promise<void> {
    try {
      // No need to manually refresh auth status - observables handle this
      // Just update authenticated class and reinitialize structure
      this.updateAuthenticatedClass();

      // Reinitialize the dropdown structure
      await this.initializeWithinNavbarStructure();
    } catch (error) {
      console.error('Error during reinitialization:', error);
    }
  }

  /**
   * Clean up existing dropdowns to prevent duplicates
   */
  private cleanupExistingDropdowns(): void {
    // Remove our integrated dropdowns
    document.querySelectorAll('.user-profile-dropdown').forEach((el) => {
      const htmlEl = el as HTMLElement;
      const root = this.roots.get(htmlEl);
      if (root) {
        root.unmount();
        this.roots.delete(htmlEl);
      }
      // Only remove if it has our React component classes
      if (
        htmlEl.querySelector(
          '.navbar-integrated-dropdown, .portal-user-dropdown, .floating-user-dropdown',
        )
      ) {
        htmlEl.remove();
      }
    });

    // Remove portal containers (legacy)
    document.querySelectorAll('#auth0-portal-container').forEach((el) => {
      const htmlEl = el as HTMLElement;
      const dropdown = htmlEl.querySelector('.user-profile-dropdown');
      if (dropdown) {
        const root = this.roots.get(dropdown as HTMLElement);
        if (root) {
          root.unmount();
          this.roots.delete(dropdown as HTMLElement);
        }
      }
      htmlEl.remove();
    });

    // Remove floating dropdowns (legacy)
    document.querySelectorAll('.auth0-floating-dropdown').forEach((el) => {
      const htmlEl = el as HTMLElement;
      const dropdown = htmlEl.querySelector('.user-profile-dropdown');
      if (dropdown) {
        const root = this.roots.get(dropdown as HTMLElement);
        if (root) {
          root.unmount();
          this.roots.delete(dropdown as HTMLElement);
        }
      }
      htmlEl.remove();
    });

    // Remove other legacy containers
    document.querySelectorAll('.auth0-user-dropdown-wrapper').forEach((el) => {
      el.remove();
    });

    document.querySelectorAll('.mobile-user-dropdown').forEach((el) => {
      const htmlEl = el as HTMLElement;
      const root = this.roots.get(htmlEl);
      if (root) {
        root.unmount();
        this.roots.delete(htmlEl);
      }
      htmlEl.remove();
    });
  }

  /**
   * Check if an element is visible
   */
  private isElementVisible(element: Element): boolean {
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      element.getBoundingClientRect().width > 0 &&
      element.getBoundingClientRect().height > 0
    );
  }

  /**
   * Initialize mobile dropdown
   */
  private initializeMobileDropdown(): void {
    // Look for mobile navigation containers with modern selectors
    const mobileContainerSelectors = [
      // Standard mobile nav selectors
      "[data-mobile-nav]:not([style*='display: none'])",
      ".mobile-nav:not([style*='display: none'])",
      ".mobile-menu:not([style*='display: none'])",
      "#mobile-navigation:not([style*='display: none'])",

      // Mintlify specific selectors
      '.mintlify-sidebar',
      '.sidebar-mobile',

      // Common responsive framework selectors
      '.navbar-mobile',
      '.nav-mobile',
      '.mobile-navbar',

      // Tailwind responsive classes
      '.block.md\\:hidden',
      '.md\\:hidden:not(.hidden)',

      // Generic mobile containers that are visible
      ".mobile:not([style*='display: none'])",
      "[class*='mobile']:not([style*='display: none'])",
    ];

    let mobileContainer = null;
    for (const selector of mobileContainerSelectors) {
      try {
        const element = document.querySelector(selector);
        if (element && this.isElementVisible(element)) {
          mobileContainer = element;
          break;
        }
      } catch (e) {
        // Skip invalid selectors (like escaped CSS classes)
        continue;
      }
    }

    // Fallback: create mobile container if viewport is mobile but no container found
    if (!mobileContainer && this.shouldUseMobileLayout()) {
      const navbar = document.querySelector(
        'nav, .navbar, .navigation, [role="navigation"]',
      );
      if (navbar) {
        mobileContainer = navbar;
      }
    }

    if (!mobileContainer) {
      return;
    }

    // Check if dropdown already exists
    if (mobileContainer.querySelector('.mobile-user-dropdown')) {
      return;
    }

    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'mobile-user-dropdown';

    // Smart insertion logic
    const insertionPoint = this.findBestMobileInsertionPoint(mobileContainer);
    if (insertionPoint.parent && insertionPoint.reference) {
      insertionPoint.parent.insertBefore(
        dropdownContainer,
        insertionPoint.reference,
      );
    } else if (insertionPoint.parent) {
      insertionPoint.parent.appendChild(dropdownContainer);
    } else {
      // Fallback: insert at the beginning
      mobileContainer.insertBefore(
        dropdownContainer,
        mobileContainer.firstChild,
      );
    }

    // Initialize React component for mobile
    this.createUserProfileDropdown(dropdownContainer, {
      isMobile: true,
      className: 'mobile-user-dropdown-component',
    });
  }

  /**
   * Find the best insertion point for mobile dropdown
   */
  private findBestMobileInsertionPoint(container: Element): {
    parent: Element | null;
    reference: Node | null;
  } {
    // Look for common mobile menu items to insert before
    const insertBeforeSelectors = [
      '.mobile-menu-item:last-child',
      '.nav-item:last-child',
      '.menu-item:last-child',
      '.sidebar-item:last-child',
      'a[href*="login"]:last-of-type',
      'a[href*="signup"]:last-of-type',
      '.cta-button',
      '.sign-up-button',
    ];

    for (const selector of insertBeforeSelectors) {
      const element = container.querySelector(selector);
      if (element && element.parentElement) {
        return {
          parent: element.parentElement,
          reference: element.nextSibling,
        };
      }
    }

    // Default to end of container
    return { parent: container, reference: null };
  }

  /**
   * Create and mount a UserProfileDropdown React component
   */
  createUserProfileDropdown(container: HTMLElement, props: any = {}): void {
    try {
      // Clean up existing root if it exists
      const existingRoot = this.roots.get(container);
      if (existingRoot) {
        existingRoot.unmount();
        this.roots.delete(container);
      }

      // Create new React root and render component
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(UserProfileDropdown, props));
      this.roots.set(container, root);
    } catch (error) {
      console.error('Failed to create UserProfileDropdown:', error);
      if (error instanceof Error) {
        console.error('Error stack:', error.stack);
      }
    }
  }

  /**
   * Clean up a specific dropdown instance
   */
  cleanupDropdown(container: HTMLElement): void {
    const root = this.roots.get(container);
    if (root) {
      root.unmount();
      this.roots.delete(container);
    }
    container.remove();
  }

  /**
   * Clean up all dropdown instances
   */
  cleanupAll(): void {
    this.roots.forEach((root) => {
      root.unmount();
    });
    this.roots.clear();
  }

  /**
   * Initialize the integration system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('DocsUI integration already initialized');
      return;
    }

    try {
      console.log('Initializing DocsUI integration...');

      // Initialize user profile dropdown
      await this.initializeUserProfileDropdown();

      this.isInitialized = true;
      console.log('DocsUI integration initialized successfully');
    } catch (error) {
      console.error('Failed to initialize DocsUI integration:', error);
      // Don't set isInitialized to true on error so we can retry
    }
  }

  /**
   * Reinitialize dropdowns (useful for manual triggering)
   */
  async reinitialize(): Promise<void> {
    this.cleanupAll();
    this.isInitialized = false;
    await this.initialize();
  }

  /**
   * Dispose of all resources and reactions
   */
  dispose(): void {
    this.disposers.forEach((dispose) => dispose());
    this.disposers = [];
    this.cleanupAll();
    domStore.dispose();
  }
}

// Global utility functions for external access
export const createUserProfileDropdown = (
  container: HTMLElement,
  props: any = {},
) => {
  const integration = DocsUIIntegration.getInstance();
  integration.createUserProfileDropdown(container, props);
};

export const reinitializeUserDropdown = async () => {
  const integration = DocsUIIntegration.getInstance();
  await integration.reinitialize();
};

export const initializeDocsUI = async (options?: IntegrationOptions) => {
  const integration = DocsUIIntegration.getInstance(options);
  await integration.initialize();
};
