import { action, makeAutoObservable } from 'mobx';

import {
  getCurrentUser,
  userLogin,
  userLogout,
  patchUserSession,
} from '@/lib/api';
import { config } from '@/lib/config';

import type { RootStore } from './root-store';

export interface UserData {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  // /dashboard/<locality>/<tenant-name>/profile/general
  profileUrl: string;
}

export class SessionStore {
  rootStore: RootStore;

  isAuthenticated = false;
  selectedTenantName: string | null = null;
  domain: string | null = null;

  #user: UserData | null = null;

  get selectedTenant() {
    if (!this.selectedTenantName) return null;
    const tenant = this.rootStore.tenantStore.tenants.find(
      (t) => t.name === this.selectedTenantName,
    );
    return tenant ?? null;
  }

  get user(): UserData | null {
    if (!this.#user) return null;

    return {
      ...this.#user,
      profileUrl: this.selectedTenant
        ? `${config.dashboardBaseUrl}/dashboard/${this.selectedTenant.locality}/${this.selectedTenant.name}/profile/general`
        : '#',
    };
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      init: action,
      reset: action,
      setSelectedTenant: action,
      updateSessionData: action,
    });
    this.rootStore = rootStore;
  }

  async init() {
    try {
      const response = await getCurrentUser();
      this.isAuthenticated = response.is_authenticated;

      if (!response.is_authenticated || !response.profile) {
        this.reset();
        return;
      }

      this.domain = this.selectedTenant?.domain ?? '#';
      this.selectedTenantName = response.account.tenant;
      this.#user = {
        id: response.profile.sub ?? '',
        email: response.profile.email ?? 'guest@example.com',
        name: response.profile.name ?? 'Guest',
        profilePicture: response.profile.picture ?? '',
        profileUrl: this.selectedTenant
          ? `${config.dashboardBaseUrl}/dashboard/${this.selectedTenant.locality}/${this.selectedTenant.name}/profile/general`
          : '#',
      };

      // Set initial selected client
      if (response.account?.client_id) {
        this.rootStore.clientStore.setSelectedClient(
          response.account.client_id,
        );
      }

      // Set initial selected api
      if (response.api_id) {
        this.rootStore.resourceServerStore.setSelectedApi(response.api_id);
      }
    } catch (error) {
      console.error('Failed to initialize SessionStore:', error);
      this.reset();
    }
  }

  reset() {
    this.isAuthenticated = false;
    this.#user = null;
    this.selectedTenantName = null;
  }

  setSelectedTenant(tenantName: string | null) {
    this.selectedTenantName = tenantName;
  }

  async updateSessionData(data: {
    selected_client_id?: string;
    selected_api_id?: string;
  }) {
    try {
      await patchUserSession(data);

      if (data.selected_client_id !== undefined) {
        this.rootStore.clientStore.setSelectedClient(data.selected_client_id);
      }
      if (data.selected_api_id !== undefined) {
        this.rootStore.resourceServerStore.setSelectedApi(data.selected_api_id);
      }
    } catch (error) {
      console.error('Failed to update session data:', error);
      throw error;
    }
  }

  async login(returnTo?: string) {
    userLogin(returnTo ?? window.location.href);
  }

  async logout(returnTo?: string) {
    userLogout(returnTo ?? window.location.href);
  }
}
