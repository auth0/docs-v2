export const getSsoProviderEditMock = () => {
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

  const mockScimTokens = [
    {
      token_id: 'token-1',
      scopes: ['scim'],
      created_at: '2024-06-01T12:00:00Z',
    },
    {
      token_id: 'token-2',
      scopes: ['scim'],
      created_at: '2024-06-02T12:00:00Z',
    },
  ];

  const mockLogic = {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    activeTab: 'sso',
    schema: undefined,
    readOnly: true,
    providerId: 'mock-provider-id',
    domains: undefined,
    hideHeader: false,
    currentStyles: { variables: {}, classes: {} },
    provider: mockProvider,
    organization: {
      name: 'Org',
      branding: {
        colors: {
          primary: '',
          page_background: '',
        },
        logo_url: undefined,
      },
    },
    isLoading: false,
    isUpdating: false,
    isEnabling: false,
    isDeleting: false,
    isRemoving: false,
    idpConfig: {
      organization: {
        can_set_show_as_button: false,
        can_set_assign_membership_on_login: false,
      },
      strategies: {
        waad: {
          provisioning_methods: [],
          enabled_features: [],
        },
        adfs: {
          provisioning_methods: [],
          enabled_features: [],
        },
        'google-apps': {
          provisioning_methods: [],
          enabled_features: [],
        },
        oidc: {
          provisioning_methods: [],
          enabled_features: [],
        },
        samlp: {
          provisioning_methods: [],
          enabled_features: [],
        },
        okta: {
          provisioning_methods: [],
          enabled_features: [],
        },
        pingfederate: {
          provisioning_methods: [],
          enabled_features: [],
        },
      },
    },
    customMessages: {},
    backButton: undefined,
    shouldAllowDeletion: true,
    isLoadingConfig: false,
    isLoadingIdpConfig: false,
    showProvisioningTab: true,
    isProvisioningUpdating: false,
    isProvisioningDeleting: false,
    isScimTokensLoading: false,
    isScimTokenCreating: false,
    isScimTokenDeleting: false,
    isSsoAttributesSyncing: false,
    isProvisioningAttributesSyncing: false,
    hasSsoAttributeSyncWarning: false,
    hasProvisioningAttributeSyncWarning: false,
    provisioningConfig: mockProvisioningConfig as
      | typeof mockProvisioningConfig
      | undefined,
    scimTokens: mockScimTokens,
    t: (key: string) => key,
  };

  const mockHandlers = {
    setActiveTab: () => {},
    updateProvider: async () => {},
    createProvisioningAction: async () => {
      mockLogic.provisioningConfig = mockProvisioningConfig;
    },
    deleteProvisioningAction: async () => {
      mockLogic.provisioningConfig = undefined;
    },
    listScimTokens: async () => ({ scim_tokens: mockScimTokens }),
    createScimTokenAction: async () => {
      const token = {
        token_id: `token-${mockLogic.scimTokens.length + 1}`,
        scopes: ['scim'],
        created_at: '2024-06-03T12:00:00Z',
      };
      mockLogic.scimTokens.push(token);
      return { ...token, token: `scim-secret-${token.token_id}` };
    },
    deleteScimTokenAction: async (idpScimTokenId: string) => {
      mockLogic.scimTokens = mockLogic.scimTokens.filter(
        (t) => t.token_id !== idpScimTokenId,
      );
    },
    syncSsoAttributes: async () => {},
    syncProvisioningAttributes: async () => {},
    onDeleteConfirm: async () => {},
    onRemoveConfirm: async () => {},
    handleToggleProvider: async () => {
      mockLogic.provider.is_enabled = !mockLogic.provider.is_enabled;
    },
    fetchProvisioning: async () => {
      mockLogic.provisioningConfig = mockProvisioningConfig;
      return mockProvisioningConfig;
    },
  };

  return { logic: mockLogic, handlers: mockHandlers };
};
