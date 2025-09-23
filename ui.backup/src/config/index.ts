export type Environment = 'production' | 'staging' | 'development' | 'local';

export interface EnvironmentConfig {
  environment: Environment;
  baseUrl: string;
  apiBaseUrl: string;
  dashboardBaseUrl: string;
  ontrust: {
    domainId: string;
  };
  heap: {
    appId: string;
    enabled: boolean;
  };
  sentry: {
    dsn: string;
    enabled: boolean;
  };
}

export interface AppConfig extends EnvironmentConfig {
  isProduction: boolean;
  isStaging: boolean;
  isDevelopment: boolean;
  isLocal: boolean;
}

/**
 * Environment-specific configurations
 */
const environmentConfigs: Record<Environment, EnvironmentConfig> = {
  production: {
    environment: 'production',
    baseUrl: 'https://auth0.com',
    apiBaseUrl: 'https://auth0.com/docs/v2',
    dashboardBaseUrl: 'https://manage.auth0.com',
    ontrust: {
      domainId: 'auth0-prod-domain-id',
    },
    heap: {
      appId: 'auth0-heap-prod-id',
      enabled: true,
    },
    sentry: {
      dsn: 'https://your-sentry-dsn@sentry.io/production',
      enabled: true,
    },
  },
  staging: {
    environment: 'staging',
    baseUrl: 'https://sus.auth0.com',
    apiBaseUrl: 'https://sus.auth0.com/docs/v2',
    dashboardBaseUrl: 'https://manage-staging.auth0.com',
    ontrust: {
      domainId: 'auth0-staging-domain-id',
    },
    heap: {
      appId: 'auth0-heap-staging-id',
      enabled: true,
    },
    sentry: {
      dsn: 'https://your-sentry-dsn@sentry.io/staging',
      enabled: true,
    },
  },
  development: {
    environment: 'development',
    baseUrl: 'https://tus.auth0.com',
    apiBaseUrl: 'https://tus.auth0.com/docs/v2',
    dashboardBaseUrl: 'https://manage.tus.auth0.com',
    ontrust: {
      domainId: 'auth0-dev-domain-id',
    },
    heap: {
      appId: 'auth0-heap-dev-id',
      enabled: false,
    },
    sentry: {
      dsn: 'https://your-sentry-dsn@sentry.io/development',
      enabled: true,
    },
  },
  local: {
    environment: 'local',
    baseUrl: 'http://localhost:3000',
    apiBaseUrl: 'http://localhost:7200/docs/v2',
    dashboardBaseUrl: 'http://localhost:3002',
    ontrust: {
      domainId: 'auth0-local-domain-id',
    },
    heap: {
      appId: '',
      enabled: false,
    },
    sentry: {
      dsn: '',
      enabled: false,
    },
  },
};

/**
 * Detect the current environment based on hostname
 */
export function detectEnvironment(): Environment {
  if (typeof window === 'undefined') {
    // Server-side rendering or Node.js environment
    return 'development';
  }

  const hostname = window.location.hostname;

  switch (hostname) {
    case 'auth0.com':
      return 'production';
    case 'sus.auth0.com':
      return 'staging';
    case 'localhost':
    case '127.0.0.1':
      return 'local';
    default:
      return 'development';
  }
}

/**
 * Get configuration for a specific environment
 */
export function getEnvironmentConfig(
  environment: Environment,
): EnvironmentConfig {
  return environmentConfigs[environment];
}

/**
 * Get the current application configuration
 */
export function getAppConfig(): AppConfig {
  const currentEnvironment = detectEnvironment();
  const envConfig = getEnvironmentConfig(currentEnvironment);

  return {
    ...envConfig,
    isProduction: currentEnvironment === 'production',
    isStaging: currentEnvironment === 'staging',
    isDevelopment: currentEnvironment === 'development',
    isLocal: currentEnvironment === 'local',
  };
}

/**
 * Current application configuration instance
 */
export const config = getAppConfig();
