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

export interface AuthServiceConfig {
  baseUrl?: string;
}

export class AuthService {
  private config: AuthServiceConfig;
  private authStatusCache: {
    data: { isAuthenticated: boolean; user: User | null } | null;
    timestamp: number;
    ttl: number;
  } = {
    data: null,
    timestamp: 0,
    ttl: 5000, // 5 seconds cache
  };

  constructor(config: AuthServiceConfig = {}) {
    this.config = {
      baseUrl: 'http://localhost:7200/docs/v2',
      ...config,
    };
  }

  async getAuthStatus(): Promise<{
    isAuthenticated: boolean;
    user: User | null;
  }> {
    // Check cache first
    const now = Date.now();
    if (
      this.authStatusCache.data &&
      now - this.authStatusCache.timestamp < this.authStatusCache.ttl
    ) {
      return this.authStatusCache.data;
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/users/current`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let result: { isAuthenticated: boolean; user: User | null };

      if (response.ok) {
        const userData: UserCurrentResponse = await response.json();

        if (userData.is_authenticated) {
          result = {
            isAuthenticated: true,
            user: {
              user_name: userData.account.user_name,
              email: userData.profile?.email,
              name: userData.account.user_name,
              picture: userData.profile?.picture,
            },
          };
        } else {
          result = {
            isAuthenticated: false,
            user: null,
          };
        }
      } else if (response.status === 401) {
        // User is not authenticated
        result = {
          isAuthenticated: false,
          user: null,
        };
      } else {
        throw new Error(
          `Failed to check auth status: ${response.status} ${response.statusText}`,
        );
      }

      // Cache the result
      this.authStatusCache.data = result;
      this.authStatusCache.timestamp = now;

      return result;
    } catch (error) {
      console.error('Failed to get auth status:', error);
      // Default to not authenticated on error
      const result = {
        isAuthenticated: false,
        user: null,
      };
      
      // Cache the error result for a shorter time
      this.authStatusCache.data = result;
      this.authStatusCache.timestamp = now;
      this.authStatusCache.ttl = 1000; // 1 second cache for errors
      
      return result;
    }
  }

  async login(): Promise<void> {
    try {
      const currentUrl = window.location.href;
      const loginUrl = new URL(`${this.config.baseUrl}/auth/user/login`);
      loginUrl.searchParams.set('returnTo', currentUrl);

      window.location.href = loginUrl.toString();
    } catch (error) {
      console.error('Failed to initiate login:', error);
      throw error;
    }
  }

  async getTenants(): Promise<Tenant[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/tenants`, {
        method: 'GET',
        credentials: 'include', // Include cookies for session-based auth
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch tenants: ${response.status} ${response.statusText}`,
        );
      }

      const tenants: Tenant[] = await response.json();
      return tenants;
    } catch (error) {
      console.error('Failed to get tenants:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear auth cache before logout
      this.clearAuthCache();
      
      // Create return URL with clearAuth parameter
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('clearAuth', 'true');
      const returnToUrl = currentUrl.toString();

      // Redirect to logout endpoint
      const logoutUrl = new URL(`${this.config.baseUrl}/auth/user/logout`);
      logoutUrl.searchParams.set('returnTo', returnToUrl);

      window.location.href = logoutUrl.toString();
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  }

  openDashboard(): void {
    window.open('https://manage.auth0.com', '_blank');
  }

  // Clear auth status cache (useful after login/logout)
  clearAuthCache(): void {
    this.authStatusCache.data = null;
    this.authStatusCache.timestamp = 0;
    this.authStatusCache.ttl = 5000; // Reset to default TTL
  }
}

// Create a singleton instance
export const authService = new AuthService();
