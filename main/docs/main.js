const userSymbol = Symbol("userSymbol");
const authOrigin = "https://auth0-docs-auth-proxy.vercel.app";

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
