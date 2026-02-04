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

const initialDomains: Domain[] = [
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
  {
    id: "domain_def789abc679",
    org_id: "org_abc123xyz456",
    domain: "testdocs.auth0.com",
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
  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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
        setIsCreating(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newDomain: Domain = {
          id: `domain_${Date.now()}`,
          org_id: "org_abc123xyz456",
          domain: domain,
          status: "pending",
          verification_txt: `auth0-domain-verification=${Math.random()
            .toString(36)
            .substring(7)}`,
          verification_host: `_auth0-challenge.${domain}`,
        };

        setDomains((prev) => [...prev, newDomain]);
        setIsCreating(false);
        setShowCreateModal(false);

        console.log("Created domain:", newDomain);
        return newDomain;
      },
      handleVerify: async (domain: Domain) => {
        setIsVerifying(true);
        console.log("Verifying domain:", domain);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Update domain status to verified
        setDomains((prev) =>
          prev.map((d) =>
            d.id === domain.id ? { ...d, status: "verified" } : d,
          ),
        );

        setIsVerifying(false);
        setShowVerifyModal(false);
        setVerifyError(undefined);
      },
      handleDelete: async (domain: Domain) => {
        setIsDeleting(true);
        console.log("Deleting domain:", domain);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Remove domain from list
        setDomains((prev) => prev.filter((d) => d.id !== domain.id));

        setIsDeleting(false);
        setShowDeleteModal(false);
        setSelectedDomain(null);
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
      domains: domains,
      providers: mockProviders,
      isCreating: isCreating,
      isVerifying: isVerifying,
      isFetching: false,
      isLoadingProviders: false,
      isDeleting: isDeleting,
      createAction: async () => {},
      fetchProviders: async () => {},
      fetchDomains: async () => {
        // Simulate fetching domains
        await new Promise((resolve) => setTimeout(resolve, 500));
        return domains;
      },
      onCreateDomain: async (domainName: string) => {
        setIsCreating(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create new domain
        const newDomain: Domain = {
          id: `domain_${Date.now()}`,
          org_id: "org_abc123xyz456",
          domain: domainName,
          status: "pending",
          verification_txt: `auth0-domain-verification=${Math.random()
            .toString(36)
            .substring(7)}`,
          verification_host: `_auth0-challenge.${domainName}`,
        };

        setDomains((prev) => [...prev, newDomain]);
        setIsCreating(false);

        console.log("Created domain via onCreateDomain:", newDomain);
        return newDomain;
      },
      onVerifyDomain: async (domain: Domain) => {
        setIsVerifying(true);

        // Simulate API delay with 80% success rate
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const success = Math.random() > 0.2;

        if (success) {
          // Update domain status to verified
          setDomains((prev) =>
            prev.map((d) =>
              d.id === domain.id ? { ...d, status: "verified" } : d,
            ),
          );
          setIsVerifying(false);
          return true;
        } else {
          setVerifyError(
            "Domain verification failed. Please check your DNS settings.",
          );
          setIsVerifying(false);
          return false;
        }
      },
      onDeleteDomain: async (domain: Domain) => {
        setIsDeleting(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Remove domain from list
        setDomains((prev) => prev.filter((d) => d.id !== domain.id));

        setIsDeleting(false);
        console.log("Deleted domain via onDeleteDomain:", domain.domain);
      },
      onAssociateToProvider: async (domain: Domain, provider: any) => {
        console.log("Associating domain to provider:", domain, provider);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
      },
      onDeleteFromProvider: async (domain: Domain, provider: any) => {
        console.log("Removing domain from provider:", domain, provider);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
      },
    },
  };

  return customLogic;
};
