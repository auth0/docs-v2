export const getSsoProviderEditMock = () => {
  const mockProvider = {
    id: "test-provider-id",
    name: "Provider Name",
    is_enabled: true,
    strategy: "waad" as const,
    options: {},
  };

  // Mock provisioning config and SCIM tokens
  const mockProvisioningConfig = {
    scim_url: "https://scim.example.com",
    scim_token: "mock-scim-token",
    status: "active",
    last_synced: "2024-06-01T12:00:00Z",
  };

  const mockScimTokens = [
    {
      id: "token-1",
      value: "scim-token-1",
      created_at: "2024-06-01T12:00:00Z",
    },
    {
      id: "token-2",
      value: "scim-token-2",
      created_at: "2024-06-02T12:00:00Z",
    },
  ];

  const mockLogic = {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    activeTab: "sso",
    schema: undefined,
    readOnly: true,
    providerId: "mock-provider-id",
    domains: undefined,
    hideHeader: false,
    currentStyles: { variables: {}, classes: {} },
    provider: mockProvider,
    organization: {
      name: "Org",
      branding: {
        colors: {
          primary: "",
          page_background: "",
        },
        logo_url: undefined,
      },
    },
    isLoading: false,
    isUpdating: false,
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
        "google-apps": {
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
      return true;
    },
    listScimTokens: async () => mockScimTokens,
    createScimTokenAction: async () => {
      mockLogic.scimTokens.push({
        id: `token-${mockLogic.scimTokens.length + 1}`,
        value: `scim-token-${mockLogic.scimTokens.length + 1}`,
        created_at: new Date().toISOString(),
      });
    },
    deleteScimTokenAction: async (id: string) => {
      mockLogic.scimTokens = mockLogic.scimTokens.filter((t) => t.id !== id);
      return true;
    },
    syncSsoAttributes: async () => {},
    syncProvisioningAttributes: async () => {},
    onDeleteConfirm: async () => {},
    onRemoveConfirm: async () => {},
    handleToggleProvider: async () => {
      mockLogic.provider.is_enabled = !mockLogic.provider.is_enabled;
    },
    // Add mock fetchProvisioning to avoid real API calls
    fetchProvisioning: async () => {
      mockLogic.provisioningConfig = mockProvisioningConfig;
      return mockProvisioningConfig;
    },
  };

  return { logic: mockLogic, handlers: mockHandlers };
};
