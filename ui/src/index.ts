// Main entry point for Auth0 Docs UI components
import './index.css';
import './components/user-profile-dropdown/user-profile-dropdown.css';
import { authStore } from './stores/auth-store';
import { domStore } from './stores/dom-store';
import { UserProfileDropdown } from './components/user-profile-dropdown/user-profile-dropdown';
import {
  createUserProfileDropdown,
  reinitializeUserDropdown,
  initializeDocsUI,
  DocsUIIntegration,
} from './components/user-profile-dropdown/dom-integration';

// Common utilities
const utils = {
  // Add common utilities here as needed
  version: '1.0.0', // Will be replaced during build
  isProduction: () => (typeof window !== 'undefined' ? false : true), // Default to production
  isDevelopment: () =>
    typeof window !== 'undefined'
      ? window.location.hostname === 'localhost'
      : false,
};

// Main Auth0DocsUI namespace
export const Auth0DocsUI = {
  authStore,
  domStore,
  utils,
  UserProfileDropdown: {
    Component: UserProfileDropdown,
    create: createUserProfileDropdown,
    reinitialize: reinitializeUserDropdown,
    init: initializeDocsUI,
    DocsUIIntegration,
  },
};

// Auto-initialize when loaded in browser
if (typeof window !== 'undefined') {
  (window as any).Auth0DocsUI = Auth0DocsUI;

  // Initialize the reactive system immediately
  // The MobX stores will start reacting to DOM changes automatically
  let isInitializing = false;

  const startReactiveInitialization = async () => {
    if (isInitializing) {
      console.log('Auth0 Docs UI initialization already in progress');
      return;
    }
    isInitializing = true;

    try {
      console.log('Starting Auth0 Docs UI reactive initialization...');

      // Initialize the DocsUI integration which sets up MobX reactions
      await initializeDocsUI();

      console.log('✅ Auth0 Docs UI reactive system initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Auth0 Docs UI:', error);
      isInitializing = false; // Reset flag so we can try again
    }
  };

  // Start initialization based on document state
  if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', startReactiveInitialization);
  } else {
    // DOM is already ready, start immediately
    console.log(
      'Document already ready, starting initialization immediately...',
    );
    startReactiveInitialization();
  }

  // Failsafe: if initialization hasn't happened after some time, try again
  setTimeout(() => {
    if (!isInitializing) {
      console.log('Failsafe: attempting initialization after timeout...');
      startReactiveInitialization();
    }
  }, 2000);
}

// Export for ES module usage
export { Auth0DocsUI as default };

// Named exports for tree-shaking
export { authStore };
export { domStore };
export { UserProfileDropdown };
export {
  createUserProfileDropdown,
  reinitializeUserDropdown,
  initializeDocsUI,
  DocsUIIntegration,
};
export { utils };
