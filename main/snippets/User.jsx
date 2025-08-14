export const User = () => {
  const [user, setUser] = React.useState(null);
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
        className="px-2 text-white bg-primary-dark rounded-full group-hover:opacity-[0.9]"
        onClick={window.authService.login}
      >
        Login
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <span className="text-gray-700">{user.name || user.email}</span>
      <button
        onClick={window.authService.logout}
        className="px-2 bg-primary-dark text-white rounded-full group-hover:opacity-[0.9]"
      >
        Logout
      </button>
    </div>
  );
};
