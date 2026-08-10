import { action, makeAutoObservable } from 'mobx';

import { getTenants } from '@/lib/api';
import { toTenantData } from '@/lib/helpers';
import type { TenantData } from '@/components';

import type { RootStore } from './root-store';

export class TenantStore {
  rootStore: RootStore;

  tenants: TenantData[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      init: action,
      reset: action,
    });
    this.rootStore = rootStore;
  }

  async init() {
    try {
      const rawTenants = await getTenants();
      this.tenants = rawTenants.map((tenant) => toTenantData(tenant));
    } catch (error) {
      console.error('Failed to initialize TenantStore:', error);
      this.reset();
    }
  }

  reset() {
    this.tenants = [];
  }
}
