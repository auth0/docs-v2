import { useState, useEffect, type ReactNode } from 'react';

import { AppStoreContext } from '@/lib/app-store';
import type { AppStore, AppStoreData, SessionData } from '@/lib/app-store';
import { toTenantData, toUserData } from '@/lib/helpers';

import type { Client, ResourceServer } from '../../lib/api';
import { getCurrentUser, getTenants, patchUserSession } from '../../lib/api';
import type { TenantData } from './tenant';

export async function getAppStoreData(): Promise<AppStoreData> {
  const currentUser = await getCurrentUser();

  if (!currentUser.is_authenticated) {
    const session: SessionData = {
      isAuthenticated: currentUser.is_authenticated,
      user: null,
      selectedTenant: null,
      selectedClient: null,
      selectedApi: null,
    };

    return {
      session,
      tenants: [],
      clients: [],
      resourceServers: [],
    };
  }

  const profile = currentUser.profile!;
  const tenants = await getTenants();
  const selectedTenant =
    tenants.find((t) => t.name === currentUser.account.tenant) || null;

  return {
    session: {
      isAuthenticated: currentUser.is_authenticated,
      user: toUserData(profile),
      selectedTenant: selectedTenant ? toTenantData(selectedTenant) : null,
      selectedClient: currentUser.user_resources.selected_client_id || null,
      selectedApi: currentUser.user_resources.selected_api_id || null,
    },
    tenants: tenants.map((tenant) => toTenantData(tenant)),
    // clients and resource will be fetched later on quickstarts page
    clients: [],
    resourceServers: [],
  };
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionData>({
    isAuthenticated: false,
    selectedTenant: null,
    user: null,
    selectedClient: null,
    selectedApi: null,
  });
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [resourceServers, setResourceServers] = useState<ResourceServer[]>([]);

  useEffect(() => {
    let canSetState = true;

    getAppStoreData()
      .then(({ session, tenants, clients, resourceServers }) => {
        if (!canSetState) return;
        setSession(session);
        setTenants(tenants);
        setClients(clients);
        setResourceServers(resourceServers);
      })
      .catch((err) => {
        if (!canSetState) return;
        console.error('Failed to fetch app store data:', err);
        setSession({
          isAuthenticated: false,
          selectedTenant: null,
          user: null,
          selectedClient: null,
          selectedApi: null,
        });
        setTenants([]);
        setClients([]);
        setResourceServers([]);
      });

    return () => {
      canSetState = false;
    };
  }, []);

  const value: AppStore = {
    session,
    tenants,
    clients,
    resourceServers,
    setSession,
    setTenants,
    setClients,
    setResourceServers,
    updateSessionData: patchUserSession,
  };

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}
