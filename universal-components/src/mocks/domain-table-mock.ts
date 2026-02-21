/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

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
  },
  {
    id: "domain_def789abc679",
    org_id: "org_abc123xyz456",
    domain: "testdocs.auth0.com",
    status: "verified",
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

const delay = (ms = 800) => new Promise((r) => setTimeout(r, ms));

const createDomain = (name: string): Domain => ({
  id: `domain_${Date.now()}`,
  org_id: "org_abc123xyz456",
  domain: name,
  status: "pending",
  verification_txt: `auth0-domain-verification=${Date.now()}`,
  verification_host: `_auth0-challenge.${name}`,
});

export const getDomainManagementLogic = () => {
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

  const logic = {
    domains,
    providers: mockProviders,
    isCreating,
    isVerifying,
    isFetching: false,
    isLoadingProviders: false,
    isDeleting,
    schema: undefined,
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    hideHeader: false,
    readOnly: false,
    customMessages: {},
    createAction: undefined,
    onOpenProvider: undefined,
    onCreateProvider: undefined,
    fetchProviders: async () => {},
    fetchDomains: async () => domains,
    onCreateDomain: async (name: string) => {
      setIsCreating(true);
      await delay();
      const d = createDomain(name);
      setDomains((prev) => [...prev, d]);
      setIsCreating(false);
      return d;
    },
    onVerifyDomain: async (domain: Domain) => {
      setIsVerifying(true);
      await delay();
      setDomains((prev) =>
        prev.map((d) =>
          d.id === domain.id ? { ...d, status: "verified" } : d,
        ),
      );
      setIsVerifying(false);
      return true;
    },
    onDeleteDomain: async (domain: Domain) => {
      setIsDeleting(true);
      await delay();
      setDomains((prev) => prev.filter((d) => d.id !== domain.id));
      setIsDeleting(false);
    },
    onAssociateToProvider: async () => await delay(),
    onDeleteFromProvider: async () => await delay(),
  };

  const handlers = {
    showCreateModal,
    showConfigureModal,
    showVerifyModal,
    showDeleteModal,
    verifyError,
    selectedDomain,
    setShowCreateModal,
    setShowConfigureModal,
    setShowDeleteModal,
    handleCreate: async (name: string) => {
      setIsCreating(true);
      await delay();
      setDomains((prev) => [...prev, createDomain(name)]);
      setIsCreating(false);
      setShowCreateModal(false);
    },
    handleVerify: async (domain: Domain) => {
      setIsVerifying(true);
      await delay();
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
      await delay();
      setDomains((prev) => prev.filter((d) => d.id !== domain.id));
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSelectedDomain(null);
    },
    handleToggleSwitch: async () => {},
    handleCloseVerifyModal: () => {
      setShowVerifyModal(false);
      setVerifyError(undefined);
    },
    handleCreateClick: async () => setShowCreateModal(true),
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
  };

  return { logic, handlers };
};
