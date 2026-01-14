import { autorun, reaction } from 'mobx';
import { RootStore } from './root-store';

declare global {
  interface Window {
    rootStore: RootStore;
    autorun: typeof autorun;
    reaction: typeof reaction;
    flags: Record<string, boolean>;
  }
}

export const rootStore = new RootStore();

export async function initRootStore() {
  await rootStore.init();

  // Make store available globally (useful for debugging)
  if (typeof window !== 'undefined') {
    window.rootStore = rootStore;
    window.autorun = autorun;
    window.reaction = reaction;

    // Expose feature flags on window.flags for easy access by any JS code
    window.flags = rootStore.featureFlagStore.getAllFlags();

    // Keep window.flags in sync with the store using autorun
    autorun(() => {
      window.flags = rootStore.featureFlagStore.getAllFlags();
    });
  }

  // broadcast store ready event
  const storeReadyEvent = new CustomEvent('adu:storeReady', {
    bubbles: true,
    cancelable: false,
  });
  window.dispatchEvent(storeReadyEvent);

  return rootStore;
}

// Export stores and types
export { RootStore } from './root-store';
export { SessionStore, type UserData } from './session-store';
export { TenantStore } from './tenant-store';
export { ClientStore } from './client-store';
export { ResourceServerStore } from './resource-server-store';
export { VariableStore } from './variable-store';
export { FeatureFlagStore } from './feature-flag-store';
export type { FeatureFlags } from '@/lib/api';
