import { action, makeAutoObservable } from 'mobx';

import {
  getClients,
  createClient as createClientApi,
  type Client,
} from '@/lib/api';

import type { RootStore } from './root-store';

export class ClientStore {
  rootStore: RootStore;

  clients: Client[] = [];
  selectedClientId: string | null = null;
  selectedClientSecret: string | undefined = undefined;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      init: action,
      reset: action,
      setSelectedClient: action,
      createClient: action,
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

  async createClient(clientData: {
    name: string;
    app_type?: string;
    callbacks?: string[];
    allowed_logout_urls?: string[];
    web_origins?: string[];
    client_metadata?: { [key: string]: any };
  }) {
    try {
      const newClient = await createClientApi(clientData);
      this.clients.push(newClient);
      // Set the newly created client as selected
      this.setSelectedClient(newClient.client_id);
      this.setSelectedClientSecret(newClient.client_secret);
      return newClient;
    } catch (error) {
      console.error('Failed to create client:', error);
      throw error;
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

  setSelectedClientSecret(clientSecret: string | undefined) {
    this.selectedClientSecret = clientSecret;
    const { variableStore } = this.rootStore;
    if (clientSecret) {
      variableStore.setValue('{yourClientSecret}', clientSecret);
    } else {
      variableStore.resetKey('{yourClientSecret}');
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
