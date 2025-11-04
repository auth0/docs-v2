import { action, makeAutoObservable } from 'mobx';

import { getResourceServers, type ResourceServer } from '@/lib/api';

import type { RootStore } from './root-store';

export class ResourceServerStore {
  rootStore: RootStore;

  resourceServers: ResourceServer[] = [];
  selectedApiId: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      init: action,
      reset: action,
      setSelectedApi: action,
    });
    this.rootStore = rootStore;
  }

  async init() {
    try {
      this.resourceServers = await getResourceServers();
    } catch (error) {
      console.error('Failed to initialize ResourceServerStore:', error);
      // Reset to empty state on error
      this.reset();
    }
  }

  reset() {
    this.resourceServers = [];
    this.selectedApiId = null;
  }

  setSelectedApi(apiId: string | null) {
    this.selectedApiId = apiId;
  }

  get selectedApi() {
    return (
      this.resourceServers.find((api) => api.id === this.selectedApiId) || null
    );
  }
}
