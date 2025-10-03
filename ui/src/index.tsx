import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { NavActions } from './components/nav-actions';
import type { TenantData } from './components';

const mockTenants: TenantData[] = [
  {
    name: 'dev-o4cdyn0v3v74dgx2',
    flag: 'us',
    locality: 'US-4',
  },
  {
    name: 'product-design-test-1',
    flag: 'uk',
    locality: 'UK-1',
  },
  {
    name: 'test-canada-tenant-2',
    flag: 'canada',
    locality: 'CA-1',
  },
  {
    name: 'product-design-test-3',
    flag: 'uk',
    locality: 'UK-1',
  },
  {
    name: 'test-canada-tenant-4',
    flag: 'canada',
    locality: 'CA-1',
  },
  {
    name: 'product-design-test-5',
    flag: 'uk',
    locality: 'UK-1',
  },
  {
    name: 'test-canada-tenant-6',
    flag: 'canada',
    locality: 'CA-1',
  },
  {
    name: 'product-design-test-7',
    flag: 'uk',
    locality: 'UK-1',
  },
  {
    name: 'test-canada-tenant-8',
    flag: 'canada',
    locality: 'CA-1',
  },
  {
    name: 'product-design-test-9',
    flag: 'uk',
    locality: 'UK-1',
  },
  {
    name: 'test-canada-tenant-10',
    flag: 'canada',
    locality: 'CA-1',
  },
  {
    name: 'product-design-test-11',
    flag: 'uk',
    locality: 'UK-1',
  },
  {
    name: 'test-canada-tenant-12',
    flag: 'canada',
    locality: 'CA-1',
  },
];

const mockUser = {
  name: 'Vishnu Singh',
  profileUrl: 'https://auth0.com',
};

function main() {
  const root = document.createElement('div');
  root.id = 'adu-root';
  document.body.appendChild(root);

  createRoot(root).render(
    <StrictMode>
      <NavActions user={mockUser} tenants={mockTenants} />
    </StrictMode>,
  );
}

main();

export {
  Button,
  ContentText,
  DisplayText,
  FlagIcon,
  SvgIcon,
  AuthMenu,
  type TenantData,
} from './components';
