import { createContext } from 'react';
import type { Client, patchUserSession, ResourceServer } from './api';
import type { TenantData } from '@/components';

export interface UserData {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  // /dashboard/us/dev-abc123/profile/general
  profileUrl: string;
}

export interface SessionData {
  isAuthenticated: boolean;
  user: UserData | null;
  selectedTenant: TenantData | null;
  selectedClient: string | null;
  selectedApi: string | null;
}

export interface AppStoreData {
  session: SessionData;
  tenants: TenantData[];
  clients: Client[];
  resourceServers: ResourceServer[];
}

export interface AppStore extends AppStoreData {
  setSession: (session: SessionData) => void;
  setTenants: (tenants: TenantData[]) => void;
  setClients: (clients: Client[]) => void;
  setResourceServers: (resourceServers: ResourceServer[]) => void;
  updateSessionData: typeof patchUserSession;
}

export const AppStoreContext = createContext<AppStore | undefined>(undefined);
