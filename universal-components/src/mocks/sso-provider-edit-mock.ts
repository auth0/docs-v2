/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

const mockProvider = {
  id: 'test-provider-id',
  name: 'Provider Name',
  is_enabled: true,
  strategy: 'waad' as const,
  options: {},
};

const mockProvisioningConfig = {
  scim_url: 'https://scim.example.com',
  scim_token: 'mock-scim-token',
  status: 'active',
  last_synced: '2024-06-01T12:00:00Z',
};

const initialScimTokens = [
  { id: 'token-1', value: 'scim-token-1', created_at: '2024-06-01T12:00:00Z' },
  { id: 'token-2', value: 'scim-token-2', created_at: '2024-06-02T12:00:00Z' },
];

const emptyStrategy = { provisioning_methods: [], enabled_features: [] };

/**
 * Mock for `SsoProviderEditView`.
 */
export const getSsoProviderEditMock = () => {
  const [provider, setProvider] = useState(mockProvider);
  const [provisioningConfig, setProvisioningConfig] = useState<any>(
    mockProvisioningConfig,
  );
  const [scimTokens, setScimTokens] = useState(initialScimTokens);
  const [tokenSeq, setTokenSeq] = useState(initialScimTokens.length);

  return {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    customMessages: {},
    schema: undefined,
    readOnly: true,
    providerId: 'mock-provider-id',
    domains: undefined,
    hideHeader: false,
    hideProvisioningTab: false,
    hideDeleteProvider: false,
    hideRemoveFromOrganization: false,
    hideAttributeMappings: false,
    backButton: undefined,
    enableProviderAction: undefined,

    provider,
    organization: {
      name: 'Org',
      branding: {
        colors: { primary: '', page_background: '' },
        logo_url: undefined,
      },
    },
    provisioningConfig,
    idpConfig: {
      organization: {
        can_set_show_as_button: false,
        can_set_assign_membership_on_login: false,
      },
      strategies: {
        waad: emptyStrategy,
        adfs: emptyStrategy,
        'google-apps': emptyStrategy,
        oidc: emptyStrategy,
        samlp: emptyStrategy,
        okta: emptyStrategy,
        pingfederate: emptyStrategy,
      },
    },

    isLoading: false,
    isUpdating: false,
    isEnabling: false,
    isDeleting: false,
    isRemoving: false,
    isProvisioningUpdating: false,
    isProvisioningDeleting: false,
    isProvisioningLoading: false,
    isScimTokensLoading: false,
    isScimTokenCreating: false,
    isScimTokenDeleting: false,
    isSsoAttributesSyncing: false,
    isProvisioningAttributesSyncing: false,
    hasSsoAttributeSyncWarning: false,
    hasProvisioningAttributeSyncWarning: false,
    shouldAllowDeletion: true,
    isLoadingConfig: false,
    isLoadingIdpConfig: false,
    showProvisioningTab: true,

    fetchProvider: async () => provider,
    fetchOrganizationDetails: async () => {},
    fetchProvisioning: async () => {
      setProvisioningConfig(mockProvisioningConfig);
      return mockProvisioningConfig;
    },
    updateProvider: async () => {},
    enableProvider: async () => {},
    createProvisioning: async () =>
      setProvisioningConfig(mockProvisioningConfig),
    deleteProvisioning: async () => setProvisioningConfig(null),
    listScimTokens: async () => scimTokens,
    createScimToken: async () => {
      const next = tokenSeq + 1;
      const token = {
        id: `token-${next}`,
        value: `scim-token-${next}`,
        created_at: '2024-06-03T12:00:00Z',
      };
      setTokenSeq(next);
      setScimTokens((prev) => [...prev, token]);
      return token;
    },
    deleteScimToken: async (id: string) => {
      setScimTokens((prev) => prev.filter((t) => t.id !== id));
    },
    syncSsoAttributes: async () => {},
    syncProvisioningAttributes: async () => {},
    onDeleteConfirm: async () => {},
    onRemoveConfirm: async () => {},
    handleToggleProvider: async (enabled: boolean) => {
      setProvider((prev) => ({ ...prev, is_enabled: enabled }));
    },
  };
};
