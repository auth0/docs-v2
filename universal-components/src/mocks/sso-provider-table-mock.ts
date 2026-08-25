/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import { mockRefetch } from './query-result';

const mockProvidersInitial = [
  {
    id: 'test-provider-id',
    name: 'Provider Name',
    display_name: 'WAAD Provider 1',
    is_enabled: true,
    strategy: 'waad' as const,
    options: {},
  },
  {
    id: 'waad-2',
    name: 'waad-2',
    display_name: 'WAAD Provider 2',
    strategy: 'waad' as const,
    is_enabled: true,
    options: {},
  },
  {
    id: 'waad-3',
    name: 'waad-3',
    display_name: 'WAAD Provider 3',
    strategy: 'waad' as const,
    is_enabled: true,
    options: {},
  },
];

/**
 * Mock for `SsoProviderTableView`.
 */
export const getSsoProviderTableMock = () => {
  const [providers, setProviders] = useState(mockProvidersInitial);
  const [selectedIdp, setSelectedIdp] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  return {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    customMessages: {},
    readOnly: false,
    hideHeader: false,
    hideDeleteProvider: false,
    hideRemoveFromOrganization: false,
    createAction: {
      disabled: false,
      onBefore: () => true,
      onAfter: () => true,
    },
    editAction: { disabled: false, onBefore: () => true, onAfter: () => true },
    enableProviderAction: undefined,

    providers,
    organization: null,
    isLoading: false,
    isViewLoading: false,
    isRefetchingProviders: false,
    isProvidersStale: false,
    providersUpdatedAt: 0,
    isDeleting,
    isRemoving,
    isUpdating: false,
    isUpdatingId: null,
    shouldAllowDeletion: true,
    shouldHideCreate: false,

    // Modals are intentionally live so readers can open the confirm dialogs.
    showDeleteModal,
    showRemoveModal,
    setShowDeleteModal,
    setShowRemoveModal,

    selectedIdp,
    setSelectedIdp,
    refetchProviders: mockRefetch(() => providers),
    fetchProviders: async () => {},
    fetchOrganizationDetails: async () => null,

    handleCreate: () => {
      console.log('Navigate to SSO Provider Create Page');
    },
    handleEdit: () => {
      console.log('Navigate to SSO Provider Edit Page');
    },
    handleDelete: (idp: any) => {
      setSelectedIdp(idp);
      setShowDeleteModal(true);
    },
    handleDeleteFromOrganization: (idp: any) => {
      setSelectedIdp(idp);
      setShowRemoveModal(true);
    },
    handleToggleEnabled: async (idp: any, enabled: boolean) => {
      setProviders((prev) =>
        prev.map((p) => (p.id === idp.id ? { ...p, is_enabled: enabled } : p)),
      );
    },
    handleDeleteConfirm: async (provider: any) => {
      setIsDeleting(true);
      setTimeout(() => {
        setProviders((prev) => prev.filter((p) => p.id !== provider.id));
        setIsDeleting(false);
        setSelectedIdp(null);
        setShowDeleteModal(false);
      }, 700);
    },
    handleRemoveConfirm: async (provider: any) => {
      setIsRemoving(true);
      setTimeout(() => {
        setProviders((prev) => prev.filter((p) => p.id !== provider.id));
        setIsRemoving(false);
        setSelectedIdp(null);
        setShowRemoveModal(false);
      }, 700);
    },
  };
};
