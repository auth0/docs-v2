import React from 'react';
import { UserProfileDropdown } from './user-profile-dropdown';
import { authStore } from '../../stores/auth-store';
import {
  DocsUIIntegration,
  createUserProfileDropdown,
  reinitializeUserDropdown,
  initializeDocsUI,
} from './dom-integration';

// Expose the component and utilities globally for integration
declare global {
  interface Window {
    Auth0DocsUI: {
      UserProfileDropdown: React.ComponentType<any>;
      authStore: typeof authStore;
      createUserProfileDropdown: typeof createUserProfileDropdown;
      reinitializeUserDropdown: typeof reinitializeUserDropdown;
      initializeDocsUI: typeof initializeDocsUI;
      DocsUIIntegration: typeof DocsUIIntegration;
    };
  }
}

// Global API
window.Auth0DocsUI = {
  ...window.Auth0DocsUI,
  UserProfileDropdown,
  authStore,
  createUserProfileDropdown,
  reinitializeUserDropdown,
  initializeDocsUI,
  DocsUIIntegration,
};

export { UserProfileDropdown } from './user-profile-dropdown';
export type { UserProfileDropdownProps } from './user-profile-dropdown';
