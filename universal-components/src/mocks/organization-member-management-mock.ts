/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import { mockRefetch } from './query-result';

/**
 * Mock for `OrganizationMemberManagementView`.
 */

type ModalState =
  | { type: null }
  | { type: 'create' }
  | { type: 'details'; invitation: any }
  | { type: 'revoke'; invitation: any }
  | { type: 'revokeResend'; invitation: any }
  | { type: 'assignRole'; member: any }
  | { type: 'removeFromOrganization'; member: any };

type ViewMemberDetailsParams = {
  userId: string;
  tab?: 'details' | 'roles';
};

const ORG_NAME = 'Auth0 Corporation';

const availableRoles = [
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

const availableConnections = [
  { id: 'con_okta123', name: 'Okta Workforce', type: 'identity_provider' as const },
  {
    id: 'con_waad456',
    name: 'Microsoft Entra ID',
    type: 'identity_provider' as const,
  },
  {
    id: 'con_db789',
    name: 'Username-Password-Authentication',
    type: 'user_store' as const,
  },
];

const initialMembers = [
  {
    user_id: 'auth0|65f1a2b3c4d5e6f7a8b9c0d1',
    access_level: 'full',
    email: 'ada.lovelace@example.com',
    name: 'Ada Lovelace',
    given_name: 'Ada',
    family_name: 'Lovelace',
    nickname: 'ada',
    created_at: '2024-01-15T09:24:00.000Z',
    updated_at: '2025-06-02T11:02:00.000Z',
    last_login: '2025-07-28T08:15:00.000Z',
    roles: [availableRoles[0]],
  },
  {
    user_id: 'auth0|65f1a2b3c4d5e6f7a8b9c0d2',
    access_level: 'full',
    email: 'grace.hopper@example.com',
    name: 'Grace Hopper',
    given_name: 'Grace',
    family_name: 'Hopper',
    nickname: 'grace',
    created_at: '2024-03-02T14:10:00.000Z',
    updated_at: '2025-05-19T16:41:00.000Z',
    last_login: '2025-07-30T13:47:00.000Z',
    roles: availableRoles,
  },
  {
    user_id: 'auth0|65f1a2b3c4d5e6f7a8b9c0d3',
    access_level: 'full',
    email: 'alan.turing@example.com',
    name: 'Alan Turing',
    given_name: 'Alan',
    family_name: 'Turing',
    nickname: 'alan',
    created_at: '2024-05-21T10:05:00.000Z',
    updated_at: '2025-04-11T09:30:00.000Z',
    last_login: '2025-06-14T18:20:00.000Z',
    roles: [availableRoles[1]],
  },
];

const initialInvitations = [
  {
    id: 'uinv_pending001',
    organization_id: 'org_abc123xyz456',
    inviter: { name: 'Ada Lovelace' },
    invitee: { email: 'katherine.johnson@example.com' },
    created_at: '2025-07-25T10:00:00.000Z',
    expires_at: '2025-08-25T10:00:00.000Z',
    roles: ['rol_member'],
    invitation_url:
      'https://your-tenant.auth0.com/login?invitation=inv_pending001&organization=org_abc123xyz456',
    ticket_id: 'tkt_pending001',
  },
  {
    id: 'uinv_expired002',
    organization_id: 'org_abc123xyz456',
    inviter: { name: 'Ada Lovelace' },
    invitee: { email: 'margaret.hamilton@example.com' },
    created_at: '2025-05-01T10:00:00.000Z',
    expires_at: '2025-06-01T10:00:00.000Z',
    roles: ['rol_viewer'],
    invitation_url:
      'https://your-tenant.auth0.com/login?invitation=inv_expired002&organization=org_abc123xyz456',
    ticket_id: 'tkt_expired002',
  },
];

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const getOrganizationMemberManagementMock = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'invitations'>(
    'members',
  );
  const [members, setMembers] = useState<any[]>(initialMembers);
  const [invitations, setInvitations] = useState<any[]>(initialInvitations);
  const [modalState, setModalState] = useState<ModalState>({ type: null });
  const [searchedRoles, setSearchedRoles] = useState(availableRoles);
  const [memberSortConfig, setMemberSortConfig] = useState<any>({
    key: null,
    direction: 'asc',
  });
  const [memberFilters, setMemberFilters] = useState<any>({});
  const [isCreatingInvitation, setIsCreatingInvitation] = useState(false);
  const [isRevokingInvitation, setIsRevokingInvitation] = useState(false);
  const [isResendingInvitation, setIsResendingInvitation] = useState(false);
  const [isAssigningRoles, setIsAssigningRoles] = useState(false);
  const [isRemovingFromOrganization, setIsRemovingFromOrganization] =
    useState(false);
  const [invitationSeq, setInvitationSeq] = useState(0);

  const closeModal = () => setModalState({ type: null });

  const memberRoles =
    modalState.type === 'assignRole' ? (modalState.member?.roles ?? []) : [];

  const pagination = (totalItems: number) => ({
    pageSize: 10,
    currentPage: 1,
    totalItems,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  return {
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    customMessages: {},
    hideHeader: false,
    readOnly: false,

    permissions: {
      canInvite: true,
      canAssignRole: true,
      canRemoveRole: true,
      canRemoveFromOrganization: true,
      canRevokeInvitation: true,
      canResendInvitation: true,
      canShowMemberMenu: true,
      canShowInvitationMenu: true,
    },

    activeTab,
    availableRoles,
    searchedRoles,
    availableConnections,
    members,
    invitations,
    organizationDisplayName: ORG_NAME,

    isInitialLoading: false,
    isFetchingInvitations: false,
    isFetchingMembers: false,
    isMembersStale: false,
    isInvitationsStale: false,
    membersUpdatedAt: 0,
    invitationsUpdatedAt: 0,
    isFetchingAvailableRoles: false,
    isCreatingInvitation,
    isRevokingInvitation,
    isResendingInvitation,
    isAssigningRoles,
    isRemovingFromOrganization,
    isLoadingMemberRoles: false,
    memberRoles,

    invitationPagination: pagination(invitations.length),
    memberPagination: pagination(members.length),
    invitationFilters: {},
    invitationSortConfig: { key: null, direction: 'asc' as const },
    memberFilters,
    memberSortConfig,

    // Modals are intentionally live so readers can interact with them.
    modalState,

    refetchMembers: mockRefetch(() => ({ members, next: null })),
    refetchInvitations: mockRefetch(() => ({ invitations, next: null })),

    onRoleSearch: (term: string) => {
      const q = term.trim().toLowerCase();
      setSearchedRoles(
        q
          ? availableRoles.filter((r) => r.name.toLowerCase().includes(q))
          : availableRoles,
      );
    },

    setActiveTab,
    openModal: (state: ModalState) => setModalState(state),
    closeModal,

    handleCreateSubmit: async (data: any) => {
      setIsCreatingInvitation(true);
      await delay();
      const next = invitationSeq + 1;
      const emails: string[] = Array.isArray(data?.emails)
        ? data.emails.map((e: any) => (typeof e === 'string' ? e : e?.value))
        : [data?.email].filter(Boolean);

      setInvitations((prev) => [
        ...prev,
        ...emails.filter(Boolean).map((email, i) => ({
          id: `uinv_preview${next}_${i}`,
          organization_id: 'org_abc123xyz456',
          inviter: { name: 'Ada Lovelace' },
          invitee: { email },
          created_at: '2025-08-01T10:00:00.000Z',
          expires_at: '2025-09-01T10:00:00.000Z',
          roles: data?.roles ?? [],
          invitation_url: `https://your-tenant.auth0.com/login?invitation=inv_preview${next}_${i}&organization=org_abc123xyz456`,
          ticket_id: `tkt_preview${next}_${i}`,
        })),
      ]);
      setInvitationSeq(next);
      setIsCreatingInvitation(false);
      setActiveTab('invitations');
      closeModal();
    },

    handleRevokeConfirm: async () => {
      const target =
        modalState.type === 'revoke' ? modalState.invitation : null;
      setIsRevokingInvitation(true);
      await delay();
      if (target) {
        setInvitations((prev) => prev.filter((i) => i.id !== target.id));
      }
      setIsRevokingInvitation(false);
      closeModal();
    },

    handleRevokeResendConfirm: async () => {
      const target =
        modalState.type === 'revokeResend' ? modalState.invitation : null;
      setIsResendingInvitation(true);
      await delay();
      if (target) {
        setInvitations((prev) =>
          prev.map((i) =>
            i.id === target.id
              ? {
                  ...i,
                  created_at: '2025-08-10T10:00:00.000Z',
                  expires_at: '2025-09-10T10:00:00.000Z',
                }
              : i,
          ),
        );
      }
      setIsResendingInvitation(false);
      closeModal();
    },

    handleCopyUrl: async (invitation: any) => {
      console.log('[preview] copy invitation url', invitation?.invitation_url);
    },

    handleNextPage: () => {},
    handlePreviousPage: () => {},
    handlePageSizeChange: () => {},
    handleSortChange: (sortConfig: any) => setMemberSortConfig(sortConfig),
    handleRoleFilterChange: (roleId: string | undefined) =>
      setMemberFilters((prev: any) => ({ ...prev, roleId })),

    handleViewMemberDetails: ({ userId, tab }: ViewMemberDetailsParams) => {
      console.log(
        '[preview] navigate to member detail for',
        userId,
        tab ? `(tab: ${tab})` : '',
      );
    },

    handleAssignRolesSubmit: async (
      roleIds: string[],
      _memberRoles: any[],
      userId?: string | null,
    ) => {
      const target =
        userId ??
        (modalState.type === 'assignRole' ? modalState.member?.user_id : null);
      setIsAssigningRoles(true);
      await delay();
      setMembers((prev) =>
        prev.map((m) =>
          m.user_id === target
            ? {
                ...m,
                roles: availableRoles.filter((r) => roleIds.includes(r.id)),
              }
            : m,
        ),
      );
      setIsAssigningRoles(false);
      closeModal();
    },

    handleRemoveFromOrganizationConfirm: async (userId?: string | null) => {
      const target =
        userId ??
        (modalState.type === 'removeFromOrganization'
          ? modalState.member?.user_id
          : null);
      setIsRemovingFromOrganization(true);
      await delay();
      setMembers((prev) => prev.filter((m) => m.user_id !== target));
      setIsRemovingFromOrganization(false);
      closeModal();
    },
  };
};
