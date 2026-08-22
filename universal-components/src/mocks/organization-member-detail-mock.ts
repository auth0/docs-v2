/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

/**
 * Mock for `OrganizationMemberDetailView`.
 */

type ModalState =
  | { type: null }
  | { type: 'removeFromOrganization' }
  | { type: 'assignRoles' }
  | { type: 'removeRoles'; roles: any[] };

const ORG_NAME = 'Auth0 Corporation';

const allRoles = [
  {
    id: 'rol_admin',
    name: 'Admin',
    description: 'Full access to the organization',
  },
  {
    id: 'rol_member',
    name: 'Member',
    description: 'Standard organization member',
  },
  { id: 'rol_viewer', name: 'Viewer', description: 'Read-only access' },
  {
    id: 'rol_billing',
    name: 'Billing Manager',
    description: 'Manages billing and invoices',
  },
];

const mockMember = {
  user_id: 'auth0|65f1a2b3c4d5e6f7a8b9c0d1',
  email: 'ada.lovelace@example.com',
  name: 'Ada Lovelace',
  given_name: 'Ada',
  family_name: 'Lovelace',
  nickname: 'ada',
  phone_number: '+1 555 0100',
  created_at: '2024-01-15T09:24:00.000Z',
  updated_at: '2025-06-02T11:02:00.000Z',
  last_login: '2025-07-28T08:15:00.000Z',
  identities: [
    {
      connection: 'Username-Password-Authentication',
      provider: 'auth0',
      user_id: '65f1a2b3c4d5e6f7a8b9c0d1',
      isSocial: false,
    },
  ],
  roles: [allRoles[0], allRoles[1]],
};

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const getOrganizationMemberDetailMock = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'roles'>('details');
  const [member, setMember] = useState<any>(mockMember);
  const [memberRoles, setMemberRoles] = useState<any[]>([
    allRoles[0],
    allRoles[1],
  ]);
  const [searchedRoles, setSearchedRoles] = useState(allRoles);
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);
  const [modalState, setModalState] = useState<ModalState>({ type: null });
  const [isAssigningRoles, setIsAssigningRoles] = useState(false);
  const [isRemovingRoles, setIsRemovingRoles] = useState(false);
  const [isRemovingFromOrganization, setIsRemovingFromOrganization] =
    useState(false);
  const [removingRoleIds, setRemovingRoleIds] = useState<string[]>([]);

  const closeModal = () => setModalState({ type: null });

  return {
    styling: {
      variables: { common: {}, light: {}, dark: {} },
      classes: {
        'OrganizationMemberDetail-header': 'uc-preview-hide-back-button',
      },
    },
    customMessages: {},

    activeTab,
    member,
    organizationDisplayName: ORG_NAME,
    memberRoles,
    searchedRoles,
    selectedRoles,

    isLoading: false,
    memberError: null,
    isFetchingMember: false,
    isFetchingMemberRoles: false,
    isRemovingFromOrganization,
    isAssigningRoles,
    isRemovingRoles,
    removingRoleIds,

    // Modals are intentionally live so readers can interact with them.
    modalState,

    setActiveTab,
    setSelectedRoles,

    onRoleSearch: (term: string) => {
      const q = term.trim().toLowerCase();
      setSearchedRoles(
        q ? allRoles.filter((r) => r.name.toLowerCase().includes(q)) : allRoles,
      );
    },

    handleBack: () => {
      console.log('[preview] navigate back to member management');
    },

    openModal: (state: ModalState) => setModalState(state),
    closeModal,

    handleRemoveFromOrganizationConfirm: async () => {
      setIsRemovingFromOrganization(true);
      await delay();
      setMember(null);
      setMemberRoles([]);
      setIsRemovingFromOrganization(false);
      closeModal();
    },

    handleAssignRolesSubmit: async (roleIds: string[]) => {
      setIsAssigningRoles(true);
      await delay();
      const assigned = allRoles.filter((r) => roleIds.includes(r.id));
      setMemberRoles(assigned);
      setMember((prev: any) => (prev ? { ...prev, roles: assigned } : prev));
      setIsAssigningRoles(false);
      closeModal();
    },

    handleRemoveRolesCancel: () => {
      setRemovingRoleIds([]);
      closeModal();
    },

    handleRemoveRolesConfirm: async () => {
      const targets = modalState.type === 'removeRoles' ? modalState.roles : [];
      const targetIds = targets.map((r: any) => r.id);
      setRemovingRoleIds(targetIds);
      setIsRemovingRoles(true);
      await delay();
      setMemberRoles((prev) => prev.filter((r) => !targetIds.includes(r.id)));
      setMember((prev: any) =>
        prev
          ? {
              ...prev,
              roles: (prev.roles ?? []).filter(
                (r: any) => !targetIds.includes(r.id),
              ),
            }
          : prev,
      );
      setSelectedRoles([]);
      setRemovingRoleIds([]);
      setIsRemovingRoles(false);
      closeModal();
    },
  };
};
