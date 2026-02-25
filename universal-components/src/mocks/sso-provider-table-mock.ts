/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

const mockProvidersInitial = [
  {
    id: "test-provider-id",
    name: "Test Provider",
    display_name: "WAAD Provider 1",
    is_enabled: true,
    strategy: "waad" as const,
    options: {},
  },
  {
    id: "waad-2",
    name: "waad-2",
    display_name: "WAAD Provider 2",
    strategy: "waad" as const,
    is_enabled: true,
    options: {},
  },
];

export const getSsoProviderTableMock = () => {
  const [providers, setProviders] = useState(mockProvidersInitial);
  const [selectedIdp, setSelectedIdp] = useState<unknown>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleCreate = () => {
    console.log("Navigate to SSO Provider Create Page");
  };

  const handleEdit = () => {
    console.log("Navigate to SSO Provider Edit Page");
  };

  const handleDelete = (idp: string) => {
    setSelectedIdp(idp);
    setShowDeleteModal(true);
  };

  const handleDeleteFromOrganization = (idp: string) => {
    setSelectedIdp(idp);
    setShowRemoveModal(true);
  };

  const handleToggleEnabled = (idp: any, enabled: boolean) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === idp.id ? { ...p, is_enabled: enabled } : p)),
    );
  };

  const handleDeleteConfirm = async (provider: any) => {
    setIsDeleting(true);
    setTimeout(() => {
      setProviders((prev) => prev.filter((p) => p.id !== provider.id));
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSelectedIdp(null);
    }, 700);
  };

  const handleRemoveConfirm = async (provider: any) => {
    setIsRemoving(true);
    setTimeout(() => {
      setProviders((prev) => prev.filter((p) => p.id !== provider.id));
      setIsRemoving(false);
      setShowRemoveModal(false);
      setSelectedIdp(null);
    }, 700);
  };

  const mockLogic = {
    data: providers,
    isLoading: false,
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    customMessages: {},
    hideHeader: false,
    readOnly: false,
    shouldHideCreate: false,
    isViewLoading: false,
    createAction: {
      disabled: false,
      onAfter: () => true,
      onBefore: () => true,
    },
    selectedIdp,
    showDeleteModal,
    showRemoveModal,
    organization: null,
    isDeleting,
    isRemoving,
    editAction: {
      disabled: false,
      onAfter: () => true,
      onBefore: () => true,
    },
    isUpdating: false,
    isUpdatingId: null,
    shouldAllowDeletion: true,
  };

  const mockHandlers = {
    handleCreate,
    handleEdit,
    handleDelete,
    handleDeleteFromOrganization,
    handleToggleEnabled,
    handleDeleteConfirm,
    handleRemoveConfirm,
    setShowDeleteModal,
    setShowRemoveModal,
    setSelectedIdp,
  };
  return { logic: mockLogic, handlers: mockHandlers };
};
