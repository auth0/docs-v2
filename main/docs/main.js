const userSymbol = Symbol("userSymbol");
const authOrigin = "https://auth0-docs-auth-proxy.vercel.app";
const backendOrigin = "http://localhost:3000/docs/auth/v2/";

window.authService = {
  [userSymbol]: null,
  get user() {
    return this[userSymbol];
  },
  get isAuthenticated() {
    return this[userSymbol] !== null;
  },
  getAuthStatus: async () => {
    const response = await fetch(`${authOrigin}/api/auth/status`, {
      credentials: "include",
    });
    const { user, authenticated } = await response.json();
    if (authenticated) {
      window.authService[userSymbol] = user;
    } else {
      window.authService[userSymbol] = null;
    }
  },
  login: () => {
    const returnTo = window.location.href;
    const encodedReturnTo = encodeURIComponent(returnTo);
    window.location.href = `${authOrigin}/api/auth/login?returnTo=${encodedReturnTo}`;
  },
  logout: () => {
    const returnTo = encodeURIComponent(window.location.origin);
    window.location.href = `${authOrigin}/api/auth/logout?returnTo=${returnTo}`;
  },
  initUser: async () => {
    const response = await fetch(`${authOrigin}/api/user`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const user = await response.json();
    window.authService[userSymbol] = user;
  },
};

window.backendService = {
  helloWorld: async () => {
    return await fetchData('');
  },
  getTenants: async () => {
    return await fetchData('tenants');
  },
  getTenantDetails: async (tenantId) => {
    console.log("getTenantDetails called", tenantId);
  },
  getClients: async (tenantId) => {
    return await fetchData(`clients?tenantId=${tenantId}`);
  },
  getResourceServers: async (tenantId) => {
    return await fetchData(`resource-servers?tenantId=${tenantId}`);
  },
  createClient: async (tenantId, clientData) => {
    console.log("createClient called", tenantId, clientData);
  },
  createResourceServer: async (tenantId, resourceServerData) => {
    console.log("createResourceServer called", tenantId, resourceServerData);
  },
  updateClientConfiguration: async (tenantId, clientId, configData) => {
    console.log("updateClientConfiguration called", tenantId, clientId, configData);
  },
  updateSessionData: async (tenantId, sessionData) => {
    console.log("updateSessionData called", tenantId, sessionData);
  },
  sendFeedback: async (feedbackData) => {
    console.log("sendFeedback called", feedbackData);
  }
}

async function fetchData(endpoint){
  const response = await fetch(`${backendOrigin}${endpoint}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
}