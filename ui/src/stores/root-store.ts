import { autorun, makeAutoObservable, type IReactionDisposer } from 'mobx';

import { SessionStore } from './session-store';
import { TenantStore } from './tenant-store';
import { ClientStore } from './client-store';
import { ResourceServerStore } from './resource-server-store';
import { VariableStore } from './variable-store';
import { FeatureFlagStore } from './feature-flag-store';
import { config, type EnvConfig } from '@/lib/config';

export class RootStore {
  sessionStore: SessionStore;
  tenantStore: TenantStore;
  clientStore: ClientStore;
  resourceServerStore: ResourceServerStore;
  variableStore: VariableStore;
  featureFlagStore: FeatureFlagStore;
  config: EnvConfig;

  #disposer: IReactionDisposer | null = null;

  constructor() {
    makeAutoObservable(this);
    this.sessionStore = new SessionStore(this);
    this.tenantStore = new TenantStore(this);
    this.clientStore = new ClientStore(this);
    this.resourceServerStore = new ResourceServerStore(this);
    this.variableStore = new VariableStore(this);
    this.featureFlagStore = new FeatureFlagStore(this);
    this.config = config;
  }

  async init() {
    // dispose previously subscribed listener
    this.#disposer?.();

    // Initialize feature flags early (not dependent on auth)
    await this.featureFlagStore.init();

    await this.sessionStore.init();

    this.#disposer = autorun(async () => {
      if (!this.sessionStore.isAuthenticated) {
        this.tenantStore.reset();
        this.clientStore.reset();
        this.resourceServerStore.reset();
        this.variableStore.reset();
        return;
      }

      await this.tenantStore.init();
      await Promise.all([
        this.clientStore.init(),
        this.resourceServerStore.init(),
      ]);
      this.variableStore.init();
    });
  }

  reset() {
    this.sessionStore.reset();
    this.tenantStore.reset();
    this.clientStore.reset();
    this.resourceServerStore.reset();
    this.variableStore.reset();
    this.featureFlagStore.reset();
  }
}
