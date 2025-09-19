import { makeAutoObservable, runInAction } from 'mobx';
import { authService } from '../services/auth-service';
import { User, Tenant } from '../types';
import { config } from '../config';

class AuthStore {
  // Observable state
  isAuthenticated = false;
  user: User | null = null;
  tenants: Tenant[] = [];
  selectedTenant: Tenant | null = null;
  isLoading = false;
  isFetchingTenants = false;
  isInitialized = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);

    // Auto-initialize when store is created
    this.initialize();
  }

  // Computed values
  get hasMultipleTenants(): boolean {
    return this.tenants.length > 1;
  }

  get userDisplayName(): string {
    if (!this.user) return '';
    return this.user.name || this.user.user_name || '';
  }

  get userInitials(): string {
    if (!this.user) return '';
    const displayName = this.userDisplayName;
    if (displayName.includes(' ')) {
      const parts = displayName.split(' ');
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return displayName.slice(0, 2).toUpperCase();
  }

  get currentTenantDisplayName(): string {
    return this.selectedTenant?.name || '';
  }

  get currentTenantRegion(): string {
    if (!this.selectedTenant) return '';
    return `${this.selectedTenant.environment.shortName || 'US'}-${this.selectedTenant.environment.id}`;
  }

  // Actions that update state
  private setAuthStatus(isAuthenticated: boolean, user: User | null) {
    this.isAuthenticated = isAuthenticated;
    this.user = user;
    this.error = null;
  }

  private setTenants(tenants: Tenant[]) {
    this.tenants = tenants;
    // Auto-select first tenant if none selected
    if (tenants.length > 0 && !this.selectedTenant) {
      this.selectedTenant = tenants[0];
    }
  }

  private setSelectedTenant(tenant: Tenant | null) {
    this.selectedTenant = tenant;
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

  // Get dashboard URL for current tenant
  get dashboardUrl(): string {
    if (!this.selectedTenant) {
      return config.dashboardBaseUrl;
    }

    // Use tenant-specific dashboard URL if available
    const tenantDomain =
      this.selectedTenant.loginUrl || config.dashboardBaseUrl;
    return tenantDomain;
  }

  // Get user profile URL
  get userProfileUrl(): string {
    return `${config.dashboardBaseUrl}/dashboard/account/profile`;
  }

  // Initialize auth store with environment-specific logic
  async initialize() {
    if (this.isInitialized) {
      return;
    }

    // Log initialization in debug mode
    if (config.isDevelopment || config.isLocal) {
      console.log(
        '🔐 Initializing AuthStore in',
        config.environment,
        'environment',
      );
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
      // Enhanced error handling with Sentry in production
      if (config.sentry.enabled && config.sentry.dsn) {
        // TODO: Send to Sentry
        console.error('Auth initialization failed:', error);
      }

      runInAction(() => {
        this.setError(
          error instanceof Error ? error.message : 'Authentication failed',
        );
        this.setAuthStatus(false, null);
        this.setInitialized(true);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  // Fetch tenants for authenticated user
  async fetchTenants() {
    if (!this.isAuthenticated) {
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
        this.setError(
          error instanceof Error ? error.message : 'Failed to fetch tenants',
        );
      });
    } finally {
      runInAction(() => {
        this.setFetchingTenants(false);
      });
    }
  }

  // Switch to a different tenant
  async switchTenant(tenant: Tenant) {
    if (!this.isAuthenticated) {
      throw new Error('Not authenticated');
    }

    runInAction(() => {
      this.setLoading(true);
      this.setError(null);
    });

    try {
      await authService.switchTenant(tenant.name);
      // Note: switchTenant typically redirects, so this might not be reached
      runInAction(() => {
        this.setSelectedTenant(tenant);
      });
    } catch (error) {
      runInAction(() => {
        this.setError(
          error instanceof Error ? error.message : 'Failed to switch tenant',
        );
      });
      throw error;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  // Logout current user
  async logout() {
    if (!this.isAuthenticated) {
      return;
    }

    runInAction(() => {
      this.setLoading(true);
      this.setError(null);
    });

    try {
      await authService.logout();

      runInAction(() => {
        this.setAuthStatus(false, null);
        this.setTenants([]);
        this.setSelectedTenant(null);
      });

      // Refresh page to reflect logout state
      window.location.reload();
    } catch (error) {
      runInAction(() => {
        this.setError(
          error instanceof Error ? error.message : 'Failed to logout',
        );
      });
      throw error;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  // Clear error state
  clearError() {
    this.setError(null);
  }

  // Force refresh auth state
  async refresh() {
    runInAction(() => {
      this.setInitialized(false);
    });
    await this.initialize();
  }
}

// Export singleton instance
export const authStore = new AuthStore();
