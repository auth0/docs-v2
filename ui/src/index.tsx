import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { NavActions, OptOutBanner } from '@/components';
import { patchRolloutConsent } from '@/lib/api';
import { initOneTrust } from '@/lib/one-trust';
import { initRootStore } from '@/stores';

async function main() {
  const root = document.createElement('div');
  root.id = 'adu-root';
  document.body.appendChild(root);

  // Initialize the MobX store before rendering
  await initRootStore();

  // Initialize one-trust for cookie-consent management
  initOneTrust();

  createRoot(root).render(
    <StrictMode>
      <OptOutBanner
        onOptOut={async () => {
          await patchRolloutConsent({ choice: 'opt_out' });
          window.heap.track('docs-v2:opt_out');
          window.location.reload();
        }}
      />
      <NavActions />
    </StrictMode>,
  );
}

main();

// exports to expose following components and utilities to mintlify app
// via `window.Auth0DocsUI`

export * from '@/components';
export { rootStore, initRootStore } from '@/stores';
export { autorun, reaction, observe } from 'mobx';
export { observer } from 'mobx-react-lite';
