import './index.css';

import { createRoot } from 'react-dom/client';

const mockTenants = [
  {
    name: 'login0',
    loginUrl:
      'http://localhost:7200/docs/v2/auth/tenant/login?tenant=login0%40dev-local-1',
    environment: {
      id: 'dev-local-1',
      apex: 'local.dev.auth0.com',
      shortName: 'DEV-V',
      tag: 'development' as const,
      enabled: true,
      aliases: ['default'],
    },
  },
  {
    name: 'test',
    loginUrl:
      'http://localhost:7200/docs/v2/auth/tenant/login?tenant=test%40dev-local-1',
    environment: {
      id: 'dev-local-1',
      apex: 'local.dev.auth0.com',
      shortName: 'DEV-V',
      tag: 'development' as const,
      enabled: true,
      aliases: ['default'],
    },
  },
  {
    name: 'test-tenant-admin-sdk',
    loginUrl:
      'http://localhost:7200/docs/v2/auth/tenant/login?tenant=test-tenant-admin-sdk%40dev-local-1',
    environment: {
      id: 'dev-local-1',
      apex: 'local.dev.auth0.com',
      shortName: 'DEV-V',
      tag: 'production' as const,
      enabled: true,
      aliases: ['default'],
    },
  },
];

function main() {
  const root = document.createElement('div');
  root.id = 'adu-nav-overlay';

  document.body.append(root);
  // createRoot(root).render(<TenantList tenants={mockTenants} />);
}

// export { Avatar, TenantList };
