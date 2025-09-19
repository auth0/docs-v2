import { makeAutoObservable, runInAction } from 'mobx';
import { authService } from '../services/auth-service';

export interface User {
  user_name: string;
  email?: string;
  name?: string;
  picture?: string;
}

export interface Tenant {
  name: string;
  loginUrl: string;
  overrideSubdomain?: string;
  accessToken?: string;
  environment: {
    id: string;
    apex: string;
    shortName: string;
    tag: 'development' | 'staging' | 'production';
    enabled: boolean;
    aliases: string[];
  };
}

class AuthStore {
  // Observable state
  isAuthenticated = false;
  user: User | null = null;
  tenants: Tenant[] = [];
  isLoading = false;
  isFetchingTenants = false;
  isInitialized = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    
    // Auto-initialize when store is created
    this.initialize();
  }

  // Actions that update state
  private setAuthStatus(isAuthenticated: boolean, user: User | null) {
    this.isAuthenticated = isAuthenticated;
    this.user = user;
    this.error = null;
  }

  private setTenants(tenants: Tenant[]) {
    this.tenants = tenants;
  }

  private setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  private setFetchingTenants(fetching: boolean) {
    this.isFetchingTenants = fetching;
  }

  private setError(error: string | null) {
    this.error = error;
  }

  private setInitialized(initialized: boolean) {
    this.isInitialized = initialized;
  }

  // Public action to initialize auth state
  async initialize() {
    if (this.isInitialized) {
      return;
    }

    runInAction(() => {
      this.setLoading(true);
      this.setError(null);
    });

    try {
      const status = await authService.getAuthStatus();
      
      runInAction(() => {
        this.setAuthStatus(status.isAuthenticated, status.user);
        this.setInitialized(true);
      });

      // Auto-fetch tenants if authenticated
      if (status.isAuthenticated) {
        await this.fetchTenants();
      }
    } catch (error) {
      runInAction(() => {
        this.setError(error instanceof Error ? error.message : 'Authentication failed');
        this.setAuthStatus(false, null);
        this.setInitialized(true);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  // Public action to refresh auth status
  async refreshAuthStatus() {
    runInAction(() => {
      this.setLoading(true);
      this.setError(null);
    });

    try {
      const status = await authService.getAuthStatus();
      
      runInAction(() => {
        this.setAuthStatus(status.isAuthenticated, status.user);
      });

      // Auto-fetch tenants if authenticated and not already loaded
      if (status.isAuthenticated && this.tenants.length === 0) {
        await this.fetchTenants();
      }
    } catch (error) {
      runInAction(() => {
        this.setError(error instanceof Error ? error.message : 'Authentication refresh failed');
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  // Public action to fetch tenants
  async fetchTenants() {
    if (this.isFetchingTenants || !this.isAuthenticated) {
      return;
    }

    runInAction(() => {
      this.setFetchingTenants(true);
      this.setError(null);
    });

    try {
      const tenants = await authService.getTenants();
      
      runInAction(() => {
        this.setTenants(tenants);
      });
    } catch (error) {
      runInAction(() => {
        this.setError(error instanceof Error ? error.message : 'Failed to fetch tenants');
      });
    } finally {
      runInAction(() => {
        this.setFetchingTenants(false);
      });
    }
  }

  // Public action to initiate login
  async login() {
    try {
      await authService.login();
      // Note: After login redirect, the page will reload and state will be fresh
    } catch (error) {
      runInAction(() => {
        this.setError(error instanceof Error ? error.message : 'Login failed');
      });
      throw error;
    }
  }

  // Public action to logout
  async logout() {
    try {
      // Clear state immediately
      runInAction(() => {
        this.setAuthStatus(false, null);
        this.setTenants([]);
        this.setInitialized(false);
        this.setError(null);
      });

      await authService.logout();
      // Note: After logout redirect, the page will reload
    } catch (error) {
      runInAction(() => {
        this.setError(error instanceof Error ? error.message : 'Logout failed');
      });
      throw error;
    }
  }

  // Public action to switch tenant
  async switchTenant(tenantName: string) {
    try {
      // Find the tenant to switch to
      const tenant = this.tenants.find((t) => t.name === tenantName);
      if (!tenant) {
        throw new Error(`Tenant not found: ${tenantName}`);
      }

      // In a real implementation, this would make an API call to switch tenant
      // For now, we'll just log the switch
      console.log(`Switched to tenant: ${tenantName}`);
    } catch (error) {
      runInAction(() => {
        this.setError(error instanceof Error ? error.message : 'Tenant switch failed');
      });
      throw error;
    }
  }

  // Public action to open dashboard
  openDashboard() {
    authService.openDashboard();
  }

  // Development helper methods (should only be used in dev/test)
  setAuthenticated(isAuthenticated: boolean) {
    if (process.env.NODE_ENV === 'development') {
      this.isAuthenticated = isAuthenticated;
    }
  }

  setUser(user: User | null) {
    if (process.env.NODE_ENV === 'development') {
      this.user = user;
    }
  }

  // Computed getters for derived state
  get hasError() {
    return this.error !== null;
  }

  get isReady() {
    return this.isInitialized && !this.isLoading;
  }

  get hasTenants() {
    return this.tenants.length > 0;
  }
}

export const authStore = new AuthStore();
