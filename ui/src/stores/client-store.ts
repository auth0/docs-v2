import { action, makeAutoObservable } from 'mobx';

import { getClients, type Client } from '@/lib/api';

import type { RootStore } from './root-store';

export class ClientStore {
  rootStore: RootStore;

  clients: Client[] = [];
  selectedClientId: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      init: action,
      reset: action,
      setSelectedClient: action,
    });
    this.rootStore = rootStore;
  }

  async init() {
    try {
      this.clients = await getClients();
    } catch (error) {
      console.error('Failed to initialize ClientStore:', error);
      // Reset to empty state on error
      this.reset();
    }
  }

  reset() {
    this.clients = [];
    this.selectedClientId = null;
  }

  setSelectedClient(clientId: string | null) {
    this.selectedClientId = clientId;
    const { variableStore } = this.rootStore;
    if (clientId) {
      variableStore.setValue('{yourClientId}', clientId);
    } else {
      variableStore.resetKey('{yourClientId}');
    }
  }

  get selectedClient() {
    return (
      this.clients.find(
        (client) => client.client_id === this.selectedClientId,
      ) || null
    );
  }
}
