export const getSsoProviderEditMock = () => {
  const mockProvider = {
    id: 'test-provider-id',
    name: 'Provider Name',
    display_name: 'SAML Provider',
    is_enabled: true,
    strategy: 'samlp' as const,
    options: {},
    use_for_third_party_client_access: false,
    cross_app_access_resource_app: { status: 'disabled' as const },
  };

  const mockOrganization = {
    name: 'Org',
    branding: {
      colors: {
        primary: '',
        page_background: '',
      },
      logo_url: undefined,
    },
  };

  const mockIdpConfig = {
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
        cross_app_access_resource_app: {
          status: {
            default_value: 'disabled',
            allowed_values: ['disabled', 'enabled'],
          },
        },
      },
      samlp: {
        provisioning_methods: [],
        enabled_features: [],
        cross_app_access_resource_app: {
          status: {
            default_value: 'disabled',
            allowed_values: ['disabled', 'enabled'],
          },
        },
      },
      okta: {
        provisioning_methods: [],
        enabled_features: [],
        cross_app_access_resource_app: {
          status: {
            default_value: 'disabled',
            allowed_values: ['disabled', 'enabled'],
          },
        },
      },
      pingfederate: {
        provisioning_methods: [],
        enabled_features: [],
      },
    },
  };

  const unifiedProps = {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    schema: undefined,
    readOnly: false,
    providerId: 'mock-provider-id',
    domains: undefined,
    hideHeader: false,
    hideProvisioningTab: false,
    hideDeleteProvider: false,
    hideRemoveFromOrganization: false,
    hideAttributeMappings: false,
    customMessages: {},
    backButton: undefined,

    // Data
    provider: mockProvider,
    organization: mockOrganization,
    idpConfig: mockIdpConfig,

    // Loading states
    isLoading: false,
    isUpdating: false,
    isEnabling: false,
    isDeleting: false,
    isRemoving: false,
    isLoadingConfig: false,
    isLoadingIdpConfig: false,
    isProvisioningUpdating: false,
    isProvisioningDeleting: false,
    isScimTokensLoading: false,
    isScimTokenCreating: false,
    isScimTokenDeleting: false,
    isSsoAttributesSyncing: false,
    isProvisioningAttributesSyncing: false,
    hasSsoAttributeSyncWarning: false,
    hasProvisioningAttributeSyncWarning: false,

    // Feature flags
    shouldAllowDeletion: true,
    showProvisioningTab: true,
    showThirdPartyAccess: true,
    showCrossAppAccess: true,
    isCrossAppAccessReadOnly: false,

    // Handlers
    updateProvider: async () => {},
    listScimTokens: async () => ({ scim_tokens: [] }),
    syncSsoAttributes: async () => {},
    onDeleteConfirm: async () => {},
    onRemoveConfirm: async () => {},
    handleToggleProvider: async () => {},
    createProvisioning: async () => {},
    deleteProvisioning: async () => {},
    createScimToken: async () => undefined,
    deleteScimToken: async () => {},
    syncProvisioningAttributes: async () => {},
    fetchProvisioning: async () => null,

    enableProviderAction: undefined,
  };

  return { ...unifiedProps };
};
