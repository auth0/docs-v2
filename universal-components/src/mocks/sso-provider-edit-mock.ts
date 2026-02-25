export const getSsoProviderEditMock = () => {
  const mockProvider = {
    id: "test-provider-id",
    name: "Test Provider",
    is_enabled: true,
    strategy: "waad" as const,
    options: {},
  };
  const mockLogic = {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    activeTab: "sso",
    schema: undefined,
    readOnly: false,
    providerId: "mock-provider-id",
    domains: undefined,
    hideHeader: false,
    currentStyles: { variables: {}, classes: {} },
    provider: mockProvider,
    organization: {
      name: "Mock Org",
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
    t: (key: string) => key,
  };

  const mockHandlers = {
    setActiveTab: () => {},
    updateProvider: async () => {},
    createProvisioningAction: async () => {},
    deleteProvisioningAction: async () => {},
    listScimTokens: async () => null,
    createScimTokenAction: async () => undefined,
    deleteScimTokenAction: async () => {},
    syncSsoAttributes: async () => {},
    syncProvisioningAttributes: async () => {},
    onDeleteConfirm: async () => {},
    onRemoveConfirm: async () => {},
    handleToggleProvider: async () => {},
  };

  return { logic: mockLogic, handlers: mockHandlers };
};
