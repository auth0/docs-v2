/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import { mockRefetch } from './query-result';

interface Domain {
  id: string;
  org_id: string;
  domain: string;
  status: 'failed' | 'pending' | 'verified';
  verification_txt: string;
  verification_host: string;
}

const initialDomains: Domain[] = [
  {
    id: 'domain_abc123xyz456',
    org_id: 'org_abc123xyz456',
    domain: 'example.auth0.com',
    status: 'pending',
    verification_txt: 'auth0-domain-verification=abc123xyz456def789',
    verification_host: '_auth0-challenge.example.auth0.com',
  },
  {
    id: 'domain_def789abc123',
    org_id: 'org_abc123xyz456',
    domain: 'verified.auth0.com',
    status: 'verified',
    verification_txt: 'auth0-domain-verification=def789abc123ghi456',
    verification_host: '_auth0-challenge.verified.auth0.com',
  },
  {
    id: 'domain_def789abc679',
    org_id: 'org_abc123xyz456',
    domain: 'testdocs.auth0.com',
    status: 'verified',
    verification_txt: 'auth0-domain-verification=def789abc679jkl012',
    verification_host: '_auth0-challenge.testdocs.auth0.com',
  },
];

const mockProviders: unknown[] = [
  {
    id: 'con_test123',
    display_name: 'Test Provider',
    strategy: 'samlp',
    name: 'test-provider',
    is_associated: false,
  },
];

const delay = (ms = 800) => new Promise((r) => setTimeout(r, ms));

let domainSeq = 0;
const createDomain = (name: string): Domain => {
  domainSeq += 1;
  return {
    id: `domain_preview_${domainSeq}`,
    org_id: 'org_abc123xyz456',
    domain: name,
    status: 'pending',
    verification_txt: `auth0-domain-verification=preview${domainSeq}`,
    verification_host: `_auth0-challenge.${name}`,
  };
};

/**
 * Mock for `DomainTableView`.
 */
export const getDomainManagementMock = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [verifyError, setVerifyError] = useState<string | undefined>(undefined);
  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const noop = () => {};

  const domainTable = {
    domains,
    providers: mockProviders,
    isFetching: false,
    isRefetchingDomains: false,
    isDomainsStale: false,
    domainsUpdatedAt: 0,
    isCreating,
    isDeleting,
    isVerifying,
    isLoadingProviders: false,
    pagination: {
      pageSize: 10,
      currentPage: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },

    // Modals suppressed for this component's preview.
    showCreateModal: false,
    showConfigureModal: false,
    showVerifyModal: false,
    showDeleteModal: false,
    setShowCreateModal: noop,
    setShowConfigureModal: noop,
    setShowVerifyModal: noop,
    setShowDeleteModal: noop,

    verifyError,
    selectedDomain,
    refetchDomains: mockRefetch(() => domains),

    handleCreate: async (domainUrl: string) => {
      setIsCreating(true);
      await delay();
      setDomains((prev) => [...prev, createDomain(domainUrl)]);
      setIsCreating(false);
    },
    handleVerify: async (domain: Domain) => {
      setIsVerifying(true);
      await delay();
      setDomains((prev) =>
        prev.map((d) =>
          d.id === domain.id ? { ...d, status: 'verified' } : d,
        ),
      );
      setIsVerifying(false);
    },
    handleDelete: async (domain: Domain) => {
      setIsDeleting(true);
      await delay();
      setDomains((prev) => prev.filter((d) => d.id !== domain.id));
      setIsDeleting(false);
    },
    handleToggleSwitch: async () => {},
    handleCloseVerifyModal: () => setVerifyError(undefined),
    handleCreateClick: noop,
    handleConfigureClick: (domain: Domain) => setSelectedDomain(domain),
    handleVerifyClick: async (domain: Domain) => setSelectedDomain(domain),
    handleDeleteClick: (domain: Domain) => setSelectedDomain(domain),
    handleNextPage: noop,
    handlePreviousPage: noop,
    handlePageSizeChange: noop,
  };

  return {
    domainTable,
    schema: undefined,
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    hideHeader: false,
    readOnly: false,
    customMessages: {},
    createAction: undefined,
    onOpenProvider: undefined,
    onCreateProvider: undefined,
  };
};
