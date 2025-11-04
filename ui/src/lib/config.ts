interface EnvConfig {
  apiBaseUrl: string;
  dashboardBaseUrl: string;
  heapAnalytics: {
    appId: string;
    enabled: boolean;
  };
  sentry: {
    dsn: string;
    enabled: boolean;
  };
  oneTrust: {
    enabled: boolean;
    domainId: string;
  };
}

type Env = 'prod' | 'staging' | 'dev' | 'local';

const env: { [key in Env]: EnvConfig } = {
  prod: {
    apiBaseUrl: 'https://auth0.com/docs/v2',
    dashboardBaseUrl: 'https://manage.auth0.com',
    heapAnalytics: {
      enabled: true,
      appId: '1279799279',
    },
    sentry: {
      enabled: true,
      dsn: 'https://d433d747a8af0820757f35be62ee08be@o27592.ingest.us.sentry.io/4509985515241472',
    },
    oneTrust: {
      enabled: true,
      domainId: '96e22fd8-d619-4cdd-a3c6-d51529d21faf',
    },
  },
  staging: {
    apiBaseUrl: 'https://sus.auth0.com/docs/v2',
    dashboardBaseUrl: 'https://manage.sus.auth0.com',
    heapAnalytics: {
      enabled: true,
      appId: '2269341915',
    },
    sentry: {
      enabled: true,
      dsn: 'https://0fe11b3e3241a0986fc2755ca26fbe79@o27592.ingest.us.sentry.io/4510008371970048',
    },
    oneTrust: {
      enabled: true,
      domainId: '96e22fd8-d619-4cdd-a3c6-d51529d21faf',
    },
  },
  dev: {
    apiBaseUrl: 'https://tus.auth0.com/docs/v2',
    dashboardBaseUrl: 'https://manage.tus.auth0.com',
    heapAnalytics: {
      enabled: true,
      appId: '2269341915',
    },
    sentry: {
      enabled: true,
      dsn: 'https://8eae506d264532942aace9ecc223a526@o27592.ingest.us.sentry.io/4510008367972352',
    },
    oneTrust: {
      enabled: true,
      domainId: '96e22fd8-d619-4cdd-a3c6-d51529d21faf-test',
    },
  },
  local: {
    apiBaseUrl: 'http://localhost:7200/docs/v2',
    dashboardBaseUrl: 'https://manage.local.dev.auth0.com',
    heapAnalytics: {
      enabled: true,
      appId: '2269341915',
    },
    sentry: {
      enabled: true,
      dsn: 'https://8eae506d264532942aace9ecc223a526@o27592.ingest.us.sentry.io/4510008367972352',
    },
    oneTrust: {
      enabled: true,
      domainId: '96e22fd8-d619-4cdd-a3c6-d51529d21faf-test',
    },
  },
};

const hostEnvMap: { [key: string]: Env } = {
  'auth0.com': 'prod',
  'auth0.auth0-mintlify.app': 'prod',

  'sus.auth0.com': 'staging',
  'docs-staging.mintlify.app': 'staging',

  'tus.auth0.com': 'dev',
  'docs-dev.mintlify.app': 'dev',

  localhost: 'local',
  '127.0.0.1': 'local',
};

const getEnv = (): EnvConfig => {
  const host = window.location.hostname;
  const envKey = hostEnvMap[host] || 'prod';
  return env[envKey];
};

export const config = getEnv();
