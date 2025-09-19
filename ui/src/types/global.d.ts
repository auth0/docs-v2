// Type definitions for Auth0DocsUI global namespace
import { FC } from 'react';

export interface IntegrationOptions {
  enablePeriodicCheck?: boolean;
  checkInterval?: number;
  enableSPARouting?: boolean;
}

export interface UserProfileDropdownProps {
  tenant?: string;
  theme?: 'light' | 'dark';
}

export interface AuthStore {
  isAuthenticated: boolean;
  currentTenant: string | null;
  availableTenants: string[];
  login: () => Promise<void>;
  logout: () => void;
  switchTenant: (tenant: string) => Promise<void>;
}

export interface DocsUIIntegrationClass {
  new (): DocsUIIntegrationClass;
  initialize: (options?: IntegrationOptions) => Promise<void>;
  destroy: () => void;
}

declare global {
  interface Window {
    Auth0DocsUI: {
      authStore: AuthStore;
      utils: {
        version: string;
        isProduction: () => boolean;
        isDevelopment: () => boolean;
      };
      UserProfileDropdown: {
        Component: FC<UserProfileDropdownProps>;
        create: (
          container: HTMLElement,
          props?: UserProfileDropdownProps,
        ) => void;
        reinitialize: () => Promise<void>;
        init: (options?: IntegrationOptions) => Promise<void>;
        DocsUIIntegration: DocsUIIntegrationClass;
      };
    };
    Auth0DocsLoader: {
      load: () => Promise<typeof window.Auth0DocsUI>;
      initialize: () => void;
      version: string;
    };
    reinitializeUserDropdown: () => Promise<void>;
  }
}

export {};
