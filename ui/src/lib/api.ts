import { config } from './config';
import { request } from './request';

interface Account {
  /** The authenticated user's name */
  user_name: string;
  /** The application name from the selected client */
  app_name: string;
  /** The tenant name */
  tenant: string;
  /** The tenant domain/namespace */
  namespace: string;
  /** The selected client ID */
  client_id: string;
  /** The selected client secret */
  client_secret: string;
  /** The callback URL for the selected client */
  callback: string;
}

export interface ProfileData {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export interface GetCurrentUserResponse {
  /** Whether the user is currently authenticated */
  is_authenticated: boolean;
  account: Account;
  /** The connection name being used */
  connection_name: string;
  /** The selected API ID */
  api_id: string;
  /** The selected API identifier */
  api_identifier: string;
  /** The Auth0 management dashboard URL */
  manage_url: string;
  /** User profile information */
  profile: Record<string, never> | ProfileData;
}

// Tenant Interfaces
export interface TenantEnvironment {
  id: string;
  apex: string;
  short_name: string;
  tag: 'development' | 'staging' | 'production';
  enabled: boolean;
  aliases: string[];
}

export interface Tenant {
  name: string;
  login_url: string;
  override_subdomain?: string;
  access_token?: string;
  environment: TenantEnvironment;
}

// Client Interfaces
export interface Client {
  tenant: string;
  name: string;
  client_id: string;
  client_secret?: string;
  callbacks?: string[];
  app_type?: string;
  logo_uri?: string;
  description?: string;
}

interface CreateClientRequest {
  name: string;
  [key: string]: unknown;
}

interface ClientUpdateRequest {
  name?: string;
  app_type?: string;
  callbacks?: string[];
  logo_uri?: string;
  description?: string;
}

// Resource Server Interfaces
export interface ResourceServerScope {
  value: string;
  description?: string;
}

export interface ResourceServer {
  id: string;
  name: string;
  identifier: string;
}

interface CreateResourceServerRequest {
  name: string;
  identifier: string;
  scopes?: ResourceServerScope[];
  signing_alg?: string;
  token_lifetime?: number;
}

// User Session Interfaces
interface UpdateUserSessionRequest {
  /** At least one of selected_client_id or selected_api_id must be provided */
  selected_client_id?: string;
  selected_api_id?: string;
}

// Rollout Interfaces
interface RolloutConsentRequest {
  choice: 'opt_in' | 'opt_out';
}

interface RolloutConsentResponse {
  status: 'opted_in' | 'opted_out';
  version: 'v1' | 'v2';
  bucket?: 'v1' | 'v2' | 'opted_out';
  rollout_id: string;
}

// Auth Methods (these return void as they redirect)
export function userLogin(returnTo?: string) {
  const params = new URLSearchParams();
  if (returnTo) params.append('returnTo', returnTo);
  const url = `${config.apiBaseUrl}/auth/user/login${params.toString() ? '?' + params.toString() : ''}`;
  window.location.href = url;
}

export function tenantLogin(returnTo?: string, tenant?: string) {
  const params = new URLSearchParams();
  if (returnTo) params.append('returnTo', returnTo);
  if (tenant) params.append('tenant', tenant);
  const url = `${config.apiBaseUrl}/auth/tenant/login${params.toString() ? '?' + params.toString() : ''}`;
  window.location.href = url;
}

export function userLogout(returnTo?: string) {
  const params = new URLSearchParams();
  if (returnTo) params.append('returnTo', returnTo);
  const url = `${config.apiBaseUrl}/auth/user/logout${params.toString() ? '?' + params.toString() : ''}`;
  window.location.href = url;
}

// Tenant Methods
export async function getTenants() {
  return request<Tenant[]>(`${config.apiBaseUrl}/tenants`);
}

export async function getTenant(tenantName: string, environment: string) {
  const params = new URLSearchParams();
  params.append('environment', environment);
  return request<Tenant>(
    `${config.apiBaseUrl}/tenants/${encodeURIComponent(tenantName)}?${params.toString()}`,
  );
}

// Client Methods
export async function getClients(page: number = 0, per_page: number = 100) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', per_page.toString());
  return request<Client[]>(`${config.apiBaseUrl}/clients?${params.toString()}`);
}

export async function createClient(clientData: CreateClientRequest) {
  return request<Client>(`${config.apiBaseUrl}/clients`, {
    method: 'POST',
    body: JSON.stringify(clientData),
  });
}

export async function patchClient(
  clientId: string,
  updates: ClientUpdateRequest,
) {
  return request<Client>(
    `${config.apiBaseUrl}/clients/${encodeURIComponent(clientId)}`,
    {
      method: 'PATCH',
      body: JSON.stringify(updates),
    },
  );
}

// Resource Server Methods
export async function getResourceServers(
  page: number = 0,
  per_page: number = 100,
) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', per_page.toString());
  return request<ResourceServer[]>(
    `${config.apiBaseUrl}/resource-servers?${params.toString()}`,
  );
}

export async function postResourceServers(
  resourceServerData: CreateResourceServerRequest,
) {
  return request<ResourceServer>(`${config.apiBaseUrl}/resource-servers`, {
    method: 'POST',
    body: JSON.stringify(resourceServerData),
  });
}

// User Methods
export async function getCurrentUser() {
  const { profile, ...session } = await request<GetCurrentUserResponse>(
    `${config.apiBaseUrl}/users/current`,
  );

  if (!profile?.sub) {
    return {
      ...session,
      profile: null,
    };
  }

  return {
    ...session,
    profile: {
      sub: profile.sub,
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
    },
  };
}

export async function patchUserSession(sessionData: UpdateUserSessionRequest) {
  return request<GetCurrentUserResponse>(`${config.apiBaseUrl}/users/session`, {
    method: 'PATCH',
    body: JSON.stringify(sessionData),
  });
}

// Rollout Methods
export async function patchRolloutConsent(consentData: RolloutConsentRequest) {
  return request<RolloutConsentResponse>(
    `${config.apiBaseUrl}/rollout/consent`,
    {
      method: 'PATCH',
      body: JSON.stringify(consentData),
    },
  );
}

export function user() {}
