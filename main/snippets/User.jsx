export const User = () => {
  const [user, setUser] = React.useState(null);
  const [tenants, setTenants] = React.useState(null);
  const [clients, setClients] = React.useState(null);
  const [resourceServers, setResourceServers] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const initUser = async () => {
      try {
        await window.authService.getAuthStatus();
        const user = window.authService.user;
        if (!user) {
          throw new Error("User not found");
        }
        console.log("User fetched:", user);
        setUser(user);

        const tenantsResult = await window.backendService.getTenants();
        console.log("Tenants fetched:", tenantsResult);
        setTenants(tenantsResult.data);

        const clientsResult = await window.backendService.getClients();
        console.log({"Clients fetched:": clientsResult});
        setClients(clientsResult.data);

        const resourceServersResult = await window.backendService.getResourceServers();
        console.log("Resource Servers fetched:", resourceServersResult);
        setResourceServers(resourceServersResult.data);

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to initialize user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <button
        className="px-2 bg-primary-dark rounded-full group-hover:opacity-[0.9]"
        onClick={window.authService.login}
      >
        Login
      </button>
    );
  }

  return (
    <div className="flex gap-2">
    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
      <span className="text-gray-700">{user.name || user.email}</span>
      <button
        onClick={window.authService.logout}
        className="px-2 bg-primary-dark rounded-full group-hover:opacity-[0.9]"
      >
        Logout
      </button>
      </div>
      <div >
      <span  className="text-gray-500">{JSON.stringify(tenants)}</span>
      <span  className="text-gray-500">{JSON.stringify(clients)}</span>
      <span  className="text-gray-500">{JSON.stringify(resourceServers)}</span>
      </div>
    </div>
  );
};
