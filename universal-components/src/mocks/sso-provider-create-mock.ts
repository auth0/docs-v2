/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

// Mock strategies as IdpStrategy[]
const mockFilteredStrategies = ["samlp", "oidc"];

// Mock idpConfig for each strategy
const mockIdpConfig = {
  organization: {
    name: "Organization",
    id: "mock-org-id",
    can_set_show_as_button: true,
    can_set_assign_membership_on_login: true,
  },
  strategies: {
    samlp: {
      fields: [
        {
          name: "entryPoint",
          label: "Entry Point",
          type: "text",
          required: true,
        },
        { name: "issuer", label: "Issuer", type: "text", required: true },
      ],
      helpText: "Enter your SAML provider details.",
      provisioning_methods: [],
      enabled_features: [],
    },
    oidc: {
      fields: [
        { name: "clientId", label: "Client ID", type: "text", required: true },
        {
          name: "clientSecret",
          label: "Client Secret",
          type: "password",
          required: true,
        },
        { name: "issuer", label: "Issuer", type: "text", required: true },
      ],
      helpText: "Enter your OIDC provider details.",
      provisioning_methods: [],
      enabled_features: [],
    },
    // Add empty configs for other strategies to satisfy the type
    adfs: {
      provisioning_methods: [],
      enabled_features: [],
    },
    "google-apps": {
      provisioning_methods: [],
      enabled_features: [],
    },
    facebook: {
      provisioning_methods: [],
      enabled_features: [],
    },
    github: {
      provisioning_methods: [],
      enabled_features: [],
    },
    linkedin: {
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
    waad: {
      provisioning_methods: [],
      enabled_features: [],
    },
  },
};

// Mock refs for ProviderDetails and ProviderConfigure
const detailsRef = {
  current: {
    validate: async () => true,
    getData: () => ({
      name: "mock-name",
      display_name: "Display Name",
    }),
    isDirty: () => false,
    reset: () => {},
  },
};

const configureRef = {
  current: {
    validate: async () => true,
    getData: () => ({
      clientId: "mock-client-id",
      clientSecret: "mock-client-secret",
      issuer: "mock-issuer",
      // Add any other fields required by ProviderConfigureFormValues
    }),
    isDirty: () => false,
    reset: () => {},
  },
};

// Mock formData state for the flow
type FormState = {
  strategy?: unknown;
  details?: unknown;
  configure?: unknown;
};

export const getSsoProviderCreateMock = () => {
  const [formData, setFormData] = useState<FormState>({});
  const mockLogic = {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    customMessages: {
      provider_select: {},
      provider_details: {},
      provider_configure: {},
    },
    backButton: undefined,
    isCreating: false,
    currentStyles: { variables: {}, classes: {} },
    t: (key: string) => key,
    strategy: formData.strategy,
    details: formData.details,
    configure: formData.configure,
    isLoadingConfig: false,
    filteredStrategies: mockFilteredStrategies,
    isLoadingIdpConfig: false,
    idpConfig: mockIdpConfig,
    isDarkMode: false,
    formData,
    wizardSteps: [],
  };

  const mockHandlers = {
    onNext: () => true,
    onPrevious: () => true,
    setFormData,
    detailsRef,
    configureRef,
    handleCreate: async () => {
      console.log("Provider created!");
    },
    createStepActions: () => ({
      onNextAction: async () => true,
      onPreviousAction: async () => true,
    }),
  };
  return { logic: mockLogic, handlers: mockHandlers };
};
