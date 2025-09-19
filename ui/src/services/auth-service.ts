import { User, Tenant } from '../types';
import { config } from '../config';

// API response interfaces based on OpenAPI spec
interface UserCurrentResponse {
  is_authenticated: boolean;
  account: {
    user_name: string;
    app_name: string;
    tenant: string;
    namespace: string;
    client_id: string;
    client_secret: string;
    callback: string;
  };
  connection_name: string;
  api_identifier: string;
  manage_url: string;
  user_resources: {
    selected_client_id: string;
    selected_api_id: string;
  };
  profile: {
    email?: string;
    picture?: string;
    [key: string]: any;
  };
}

interface TenantsResponse {
  tenants: Array<{
    name: string;
    login_url: string;
    override_subdomain?: string;
    access_token?: string;
    environment: {
      id: string;
      apex: string;
      short_name: string;
      tag: 'development' | 'staging' | 'production';
      enabled: boolean;
      aliases: string[];
    };
  }>;
}

export interface AuthServiceConfig {
  baseUrl?: string;
  endpoints?: {
    userCurrent?: string;
    tenants?: string;
    logout?: string;
  };
}

class AuthService {
  private config: Required<AuthServiceConfig>;

  constructor(serviceConfig: AuthServiceConfig = {}) {
    this.config = {
      baseUrl: serviceConfig.baseUrl || config.apiBaseUrl,
      endpoints: {
        userCurrent: '/users/current',
        tenants: '/tenants',
        logout: '/auth/logout',
        ...serviceConfig.endpoints,
      },
    };
  }

  /**
   * Get current authentication status and user info
   */
  async getAuthStatus(): Promise<{
    isAuthenticated: boolean;
    user: User | null;
  }> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}${this.config.endpoints.userCurrent}`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          return { isAuthenticated: false, user: null };
        }
        throw new Error(`Failed to get auth status: ${response.statusText}`);
      }

      const data: UserCurrentResponse = await response.json();

      if (!data.is_authenticated) {
        return { isAuthenticated: false, user: null };
      }

      const user: User = {
        user_name: data.account.user_name,
        email: data.profile.email,
        name:
          data.profile.name || data.profile.nickname || data.account.user_name,
        picture: data.profile.picture,
      };

      return { isAuthenticated: true, user };
    } catch (error) {
      console.error('Error getting auth status:', error);
      throw error;
    }
  }

  /**
   * Fetch available tenants for the authenticated user
   */
  async getTenants(): Promise<Tenant[]> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}${this.config.endpoints.tenants}`,
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to get tenants: ${response.statusText}`);
      }

      const data: TenantsResponse = await response.json();

      return data.tenants.map((tenant) => ({
        name: tenant.name,
        loginUrl: tenant.login_url,
        overrideSubdomain: tenant.override_subdomain,
        accessToken: tenant.access_token,
        environment: {
          id: tenant.environment.id,
          apex: tenant.environment.apex,
          shortName: tenant.environment.short_name,
          tag: tenant.environment.tag,
          enabled: tenant.environment.enabled,
          aliases: tenant.environment.aliases,
        },
      }));
    } catch (error) {
      console.error('Error getting tenants:', error);
      throw error;
    }
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}${this.config.endpoints.logout}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to logout: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  /**
   * Switch to a different tenant
   */
  async switchTenant(tenantName: string): Promise<void> {
    try {
      // This would typically involve redirecting to the tenant's login URL
      // For now, we'll just redirect to the tenant login URL
      const tenants = await this.getTenants();
      const targetTenant = tenants.find((t) => t.name === tenantName);

      if (!targetTenant) {
        throw new Error(`Tenant ${tenantName} not found`);
      }

      // Redirect to tenant login URL
      window.location.href = targetTenant.loginUrl;
    } catch (error) {
      console.error('Error switching tenant:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
