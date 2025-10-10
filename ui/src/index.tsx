import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { NavActions } from './components/nav-actions';
import { initOneTrust } from './lib/one-trust';
import { AppStoreProvider } from './components/ui/app-store-provider';

function main() {
  const root = document.createElement('div');
  root.id = 'adu-root';
  document.body.appendChild(root);

  // initialize one-trust for cookie-consent management
  initOneTrust();
  
  createRoot(root).render(
    <StrictMode>
      <AppStoreProvider>
        <NavActions />
      </AppStoreProvider>
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
