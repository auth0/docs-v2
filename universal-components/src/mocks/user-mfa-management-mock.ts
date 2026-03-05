/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUserMfaManagementMock = () => {
  const mockLogic = {
    error: null,
    schema: { email: /^[^@]+@[^@]+\.[^@]+$/, phone: /^\d{10,}$/ },
    isLoading: false,
    isDeleting: false,
    styling: {},
    customMessages: {},
    hideHeader: false,
    showActiveOnly: false,
    disableEnroll: false,
    disableDelete: false,
    readOnly: false,
    factorConfig: undefined,
    dialogOpen: false,
    enrollFactor: null,
    isDeleteDialogOpen: false,
    factorToDelete: null,
    factorsByType: {
      email: [],
      phone: [],
      "push-notification": [],
      "webauthn-roaming": [],
      "webauthn-platform": [],
      "recovery-code": [],
      totp: [],
    },
    visibleFactorTypes: [
      "email",
      "phone",
      "push-notification",
      "webauthn-roaming",
      "webauthn-platform",
      "recovery-code",
      "totp",
    ],
    hasNoActiveFactors: true,
    confirmEnrollment: async () => {},
  };

  const mockHandlers = {
    enrollMfa: async (factorType: any, options: any) => {
      // Return a mock CreateAuthenticationMethodResponseContent object with required properties
      return {
        id: "mock-id",
        type: factorType,
        status: "enrolled",
        recovery_code: "mock-recovery-code",
        auth_session: "mock-auth-session",
        ...options,
      };
    },
    onEnrollFactor: () => {},
    onDeleteFactor: async () => {},
    handleCloseDialog: () => {},
    handleEnrollSuccess: () => {},
    handleEnrollError: () => {},
    handleConfirmDelete: async () => {},
    setIsDeleteDialogOpen: () => {},
  };
  return { logic: mockLogic, handlers: mockHandlers };
};
