export const getOrganizationDetailsEditLMock = () => {
  const unifiedProps = {
    organization: {
      id: 'org_123',
      name: 'auth0-corp',
      display_name: 'Auth0 Corporation',
      branding: {
        colors: {
          primary: '#000',
          page_background: '#fff',
        },
        logo_url: '',
      },
      metadata: {},
    },
    isLoading: false,
    isFetchLoading: false,
    isSaveLoading: false,
    updateOrgDetails: async () => true,
    formActions: {
      isLoading: false,
      nextAction: { disabled: false, onClick: async () => true },
    },
    schema: undefined,
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    customMessages: {
      header: { title: 'Organization Settings' },
      details: {},
    },
    readOnly: false,
    hideHeader: false,
  };
  return { ...unifiedProps };
};
