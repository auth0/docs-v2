export const getOrganizationDetailsEditLMock = () => {
  const mockLogic = {
    organization: {
      id: "org_123",
      name: "auth0-corp",
      display_name: "Auth0 Corporation",
      branding: {
        colors: {
          primary: "#000",
          page_background: "#fff",
        },
        logo_url: "https://logo.example.com/logo.png",
      },
      metadata: {},
    },
    isFetchLoading: false,
    schema: undefined,
    styling: { variables: { common: {}, light: {}, dark: {} }, classes: {} },
    customMessages: {
      header: { title: "Organization Settings" },
      details: {},
    },
    readOnly: false,
    hideHeader: false,
  };

  const mockHandlers = {
    formActions: {
      isLoading: false,
      nextAction: {
        disabled: false,
        onClick: () => {
          console.log("Save clicked");
          return true;
        },
      },
    },
  };
  return { logic: mockLogic, handlers: mockHandlers };
};
