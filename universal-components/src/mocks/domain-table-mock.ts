/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

// Define Domain type locally to avoid import issues
interface Domain {
  id: string;
  org_id: string;
  domain: string;
  status: string;
  verification_txt?: string;
  verification_host?: string;
}

const mockDomains: Domain[] = [
  {
    id: "domain_abc123xyz456",
    org_id: "org_abc123xyz456",
    domain: "example.auth0.com",
    status: "pending",
    verification_txt: "auth0-domain-verification=abc123xyz456def789",
    verification_host: "_auth0-challenge.example.auth0.com",
  },
  {
    id: "domain_def789abc123",
    org_id: "org_abc123xyz456",
    domain: "verified.auth0.com",
    status: "verified",
    verification_txt: "auth0-domain-verification=def789abc123ghi456",
    verification_host: "_auth0-challenge.verified.auth0.com",
  },
];

const mockProviders: unknown[] = [
  {
    id: "con_test123",
    display_name: "Test Provider",
    strategy: "samlp",
    name: "test-provider",
    is_associated: false,
  },
];

export const getDomainManagementLogic = () => {
  // State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [verifyError, setVerifyError] = useState<string | undefined>(undefined);

  const customLogic = {
    // Add MyOrgClient configuration
    myOrgClient: {
      domain: "example.auth0.com",
      proxyUrl: "https://example.auth0.com",
      getAccessToken: async () => "mock-access-token",
    },
    state: {
      showCreateModal,
      showConfigureModal,
      showVerifyModal,
      showDeleteModal,
      verifyError,
      selectedDomain,
      setShowCreateModal,
      setShowConfigureModal,
      setShowVerifyModal,
      setShowDeleteModal,
      setSelectedDomain,
      setVerifyError,
    },
    actions: {
      handleCreate: async (domain: string) => {
        console.log("Creating domain:", domain);
        setShowCreateModal(false);
      },
      handleVerify: async (domain: Domain) => {
        console.log("Verifying domain:", domain);
        setShowVerifyModal(false);
      },
      handleDelete: async (domain: Domain) => {
        console.log("Deleting domain:", domain);
        setShowDeleteModal(false);
      },
      handleToggleSwitch: async (provider: Domain) => {
        console.log("Toggling provider association:", provider);
      },
      handleCloseVerifyModal: () => {
        setShowVerifyModal(false);
        setVerifyError(undefined);
      },
      handleCreateClick: async () => {
        setShowCreateModal(true);
      },
      handleConfigureClick: async (domain: Domain) => {
        setSelectedDomain(domain);
        setShowConfigureModal(true);
      },
      handleVerifyClick: async (domain: Domain) => {
        setSelectedDomain(domain);
        setShowVerifyModal(true);
      },
      handleDeleteClick: async (domain: Domain) => {
        setSelectedDomain(domain);
        setShowDeleteModal(true);
      },
    },
    domainTableActions: {
      domains: mockDomains,
      providers: mockProviders,
      isCreating: false,
      isVerifying: false,
      isFetching: false,
      isLoadingProviders: false,
      isDeleting: false,
      createAction: async () => {},
      fetchProviders: async () => {},
      fetchDomains: async () => {},
      onCreateDomain: async () => null,
      onVerifyDomain: async () => false,
      onDeleteDomain: async () => {},
      onAssociateToProvider: async () => {},
      onDeleteFromProvider: async () => {},
    },
  };

  return customLogic;
};
