/**
 * Mock for `UserMFAManagementView`.
 */
export const getUserMfaManagementMock = () => ({
  schema: { email: /^[^@]+@[^@]+\.[^@]+$/, phone: /^\d{10,}$/ },
  styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
  customMessages: {},

  isEnrolling: false,
  isDeleting: false,
  isConfirming: false,

  hideHeader: false,
  showActiveOnly: false,
  disableEnroll: false,
  disableDelete: false,
  readOnly: false,
  factorConfig: undefined,

  // Modals suppressed for this component's preview.
  isEnrollDialogOpen: false,
  enrollFactor: null,
  enrollmentPhase: null,
  contact: '',
  otpData: { barcodeUri: '', manualInputCode: '' },
  recoveryCode: '',
  isDeleteDialogOpen: false,
  factorToDelete: null,

  factorsByType: {
    email: [],
    phone: [],
    'push-notification': [],
    'webauthn-roaming': [],
    'webauthn-platform': [],
    'recovery-code': [],
    totp: [],
  },
  visibleFactorTypes: [
    'email',
    'phone',
    'push-notification',
    'webauthn-roaming',
    'webauthn-platform',
    'recovery-code',
    'totp',
  ],
  hasNoActiveFactors: true,

  onEnrollFactor: () => {},
  onDeleteFactor: async () => {},
  onCloseEnrollDialog: async () => {},
  onConfirmDelete: async () => {},
  onCancelDelete: () => {},
  onSubmitContact: async () => false,
  onResendCode: async () => {},
  onConfirmOtp: async () => {},
  onContinueQRScan: async () => {},
  onConfirmRecoveryCode: async () => {},
  onStartQREnrollment: async () => {},
});
