import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { NavActions } from '@/components';
import { initFeedbackListeners } from '@/lib/feedback';
import { overrideHistoryMethods } from '@/lib/history';
import { initOneTrust } from '@/lib/one-trust';
import { initRootStore } from '@/stores';

function mountApp(root: HTMLElement) {
  createRoot(root).render(
    <StrictMode>
      <NavActions />
    </StrictMode>,
  );
}

async function main() {
  const root = document.createElement('div');
  root.id = 'adu-root';
  document.body.appendChild(root);

  // Override history methods to dispatch events on route changes
  overrideHistoryMethods();

  // Initialize the MobX store before rendering
  await initRootStore();

  const path = window.location.pathname;
  if (path.includes('/_minimal/')) {
    // Minimal mode is active, do not mount the custom UI changes
    return;
  }

  // Initialize one-trust for cookie-consent management
  initOneTrust();

  // Initialize feedback listeners for Mintlify documentation pages
  initFeedbackListeners();

  // Mount the main application
  mountApp(root);
}

main();

// exports to expose following components and utilities to mintlify app
// via `window.Auth0DocsUI`

export * from '@/components';
export { initRootStore, rootStore } from '@/stores';
export { autorun, observe, reaction } from 'mobx';
export { observer } from 'mobx-react-lite';
export { getSample, postSample, postFeedback } from '@/lib/api';
