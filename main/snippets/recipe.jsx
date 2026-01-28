export const Recipe = ({ children, isSingleColumn = false }) => {
  return (
    <div
      className={`pl-4 recipe-container mx-auto grid grid-cols-1 gap-10 relative ${
        isSingleColumn ? "md:grid-cols-1" : "md:grid-cols-2"
      }`}
    >
      {children}
    </div>
  );
};

export const Content = ({ title, children }) => {
  return (
    <div className="recipe-content flex flex-col">
      {title && <h1 className="text-3xl">{title}</h1>}
      {children}
    </div>
  );
};

export const Section = ({
  id,
  title,
  stepNumber,
  children,
  isSingleColumn = false,
}) => {
  return (
    <div
      id={id}
      className={`recipe-section flex flex-col transition-opacity duration-200`}
    >
      {/*
    OPTION WITH OPACITY
    <div
      id={id}
      className={`recipe-section flex flex-col transition-opacity duration-200 ${
        isSingleColumn ? "opacity-100 dark:opacity-100" : "opacity-60 dark:opacity-60"
      }`}
    > */}
      <Step title={title} stepNumber={stepNumber} titleSize="h3">
        {children}
      </Step>
    </div>
  );
};

export const SideMenu = ({ sections, children }) => {
  const [visibleSection, setVisibleSection] = useState(sections[0]?.id ?? null);

  const checkVisibility = () => {
    let currentVisible = null;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;

        const multiplier = viewportHeight > 1600 ? 0.34 : 0.22;
        if (
          scrollY + viewportHeight * multiplier >= sectionTop &&
          scrollY <= sectionBottom
        ) {
          currentVisible = id;
        }
      }
    });

    if (currentVisible && currentVisible !== visibleSection) {
      setVisibleSection(currentVisible);
    }
  };

  useEffect(() => {
    const throttledCheck = () => {
      setTimeout(checkVisibility, 100);
    };

    checkVisibility();
    window.addEventListener("scroll", throttledCheck);

    return () => {
      window.removeEventListener("scroll", throttledCheck);
    };
  }, [sections, visibleSection]);

  useEffect(() => {
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      const sideMenuItem = document.getElementById(`side-menu-item-${id}`);
      if (section) {
        if (id === visibleSection) {
          section.classList.add("active-section");
        } else {
          section.classList.remove("active-section");
        }
      }

      if (sideMenuItem) {
        if (id === visibleSection) {
          sideMenuItem.classList.add("active-side-menu-item");
        } else {
          sideMenuItem.classList.remove("active-side-menu-item");
        }
      }
    });
  }, [visibleSection, sections]);

  return (
    <div
      className="recipe-side-menu sticky px-2 py-1"
      style={{
        height: "calc(100vh - 7rem)",
        top: "7rem",
        scrollMarginTop: "var(--scroll-mt)",
      }}
    >
      {children.map((child) => {
        if (child.props.id === visibleSection) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

export const SideMenuSectionItem = ({ id, children }) => {
  return (
    <div
      id={`side-menu-item-${id}`}
      className="recipe-side-menu-item flex flex-col w-full h-full"
    >
      {children}
    </div>
  );
};

export const SignUpForm = ({
  appType, // 'regular_web' | 'spa' | 'native' | 'non_interactive',
  sampleAppUrl,
}) => {
  const TOAST_DISPLAY_DURATION = 2200;

  const [storeReady, setStoreReady] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [route, setRoute] = useState("menu");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedClientId, setSelectedClientIdState] = useState(null);
  const [selectedApiId, setSelectedApiIdState] = useState(null);

  // Side effects

  useEffect(() => {
    const init = () => setStoreReady(true);

    if (window.rootStore) {
      init();
    } else if (typeof window !== "undefined") {
      window.addEventListener("adu:storeReady", init);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("adu:storeReady", init);
      }
    };
  }, []);

  useEffect(() => {
    if (!storeReady) return;

    const disposer = autorun(() => {
      const rootStore = window.rootStore;
      setIsAuthenticated(rootStore.sessionStore.isAuthenticated);
      setSelectedClientIdState(rootStore.clientStore.selectedClientId ?? null);
      setSelectedApiIdState(
        rootStore.resourceServerStore.selectedApiId ?? null
      );
    });

    return () => {
      disposer();
    };
  }, [storeReady]);

  if (!storeReady || typeof window === "undefined") {
    return <></>;
  }

  // Utility functions

  const setSelectedClientId = (clientId) => {
    window.rootStore.clientStore.setSelectedClient(clientId);
  };

  const setSelectedApiId = (apiId) => {
    window.rootStore.resourceServerStore.setSelectedApi(apiId);
  };

  const showToast = (message, type = "success") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DISPLAY_DURATION);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  // Components

  function Toast({ open, onClose, children, type = "success" }) {
    if (open) {
      setTimeout(onClose, TOAST_DISPLAY_DURATION);
    }

    const isError = type === "error";

    const bgColorClass = isError ? "bg-red-500" : "bg-emerald-500";
    const ringColorClass = isError ? "ring-red-200" : "ring-emerald-200";
    const textColorClass = isError ? "text-red-600" : "text-emerald-600";

    return (
      <div
        className={cn(
          "fixed right-4 top-4 z-50 transition",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl shadow ring-1",
            "bg-white dark:bg-zinc-900 px-4 py-2",
            ringColorClass
          )}
        >
          <span className={cn("w-1.5 h-8 rounded-l", bgColorClass)} />
          <svg
            className={cn("w-5 h-5", textColorClass)}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isError ? (
              // Error icon (X)
              <>
                <path d="M18 6L6 18M6 6l12 12" />
              </>
            ) : (
              // Success icon (checkmark)
              <path d="M20 6L9 17l-5-5" />
            )}
          </svg>
          <span className="text-sm text-zinc-900 dark:text-zinc-100">
            {children}
          </span>
        </div>
      </div>
    );
  }

  function Wrapper({ children }) {
    return (
      <>
        {children}
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              open={true}
              onClose={() => dismissToast(toast.id)}
              type={toast.type}
            >
              {toast.message}
            </Toast>
          ))}
        </div>
      </>
    );
  }

  function Card({ className = "", children }) {
    return (
      <div
        className={cn(
          "rounded-2xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800",
          className
        )}
      >
        {children}
      </div>
    );
  }

  function Button({ variant, children, className, ...props }) {
    const commonClasses =
      "inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary:
        "mint-bg-indigo-600 text-white hover:mint-bg-indigo-700 disabled:hover:mint-bg-indigo-600",
      outline:
        "border border-zinc-300 dark:border-zinc-700 mint-bg-transparent hover:mint-bg-zinc-50 dark:hover:mint-bg-zinc-800 disabled:hover:mint-bg-transparent",
      ghost:
        "hover:mint-bg-zinc-100 dark:hover:mint-bg-zinc-800 disabled:hover:mint-bg-transparent",
    };

    return (
      <button
        className={cn(commonClasses, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }

  function Input({ id, label, value, onChange, placeholder, name }) {
    return (
      <label className="block space-y-1">
        <span className="text-sm text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        <input
          id={id}
          name={name}
          className={cn(
            "w-full h-11 px-3 rounded-xl border",
            "border-zinc-300 dark:border-zinc-700",
            "bg-white dark:bg-zinc-900",
            "text-zinc-900 dark:text-zinc-100",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500"
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    );
  }

  function Select({ label, value, onChange, options }) {
    return (
      <label className="block space-y-1 max-w-[300px]">
        <span className="text-sm text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        <div className="relative">
          <select
            className={cn(
              "w-full h-11 appearance-none px-3 pr-9 rounded-xl border",
              "border-zinc-300 dark:border-zinc-700",
              "bg-white dark:bg-zinc-900",
              "text-zinc-900 dark:text-zinc-100",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500"
            )}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select an option</option>
            {options.length > 0 && (
              <optgroup label="Available Options">
                {options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" fill="currentColor" />
          </svg>
        </div>
      </label>
    );
  }

  function IconTile({ children }) {
    return (
      <div
        className={cn(
          "shrink-0 grid place-items-center w-10 h-10 rounded-lg",
          "bg-indigo-50 ring-1 ring-indigo-200/60",
          "dark:bg-indigo-950/40 dark:ring-white/10"
        )}
      >
        {children}
      </div>
    );
  }

  function SignUpFormInternal() {
    return (
      <div className="flex flex-col gap-2 items-center h-full">
        <img
          noZoom
          src="/docs/img/quickstarts/action_hero_dashboard.svg"
          alt="Sign up for an Auth0 account"
          style={{
            width: "250px",
            height: "250px",
          }}
        />
        <span
          className="text-center"
          style={{
            width: "400px",
          }}
        >
          Sign up for an{" "}
          <a
            href="https://auth0.com/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            Auth0 account
          </a>{" "}
          or{" "}
          <span
            className="font-semibold text-primary dark:text-white cursor-pointer"
            onClick={() => console.log("log in")}
          >
            log in
          </span>{" "}
          to your existing account to integrate directly with your own tenant.
        </span>
        <button
          onClick={() => console.log("sign up")}
          className="bg-primary dark:bg-primary-light text-white dark:text-black px-4 py-2 rounded-md mt-4 font-medium"
          style={{
            width: "140px",
          }}
        >
          Sign up
        </button>
      </div>
    );
  }

  function RightChevron({ className = "w-5 h-5", ...props }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    );
  }

  function LightningIcon() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-[#3F59E4] dark:fill-[#99A7F1]"
          d="M24.971 30.152H7.088c-1.786 0-2.745-2.103-1.574-3.453l19.07-21.988c1.33-1.532 3.835-.4 3.569 1.607L24.97 30.152z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-[#3F59E4] dark:fill-[#99A7F1]"
          d="M23.201 17.885h17.885c1.787 0 2.746 2.102 1.575 3.453l-19.073 21.99c-1.33 1.532-3.835.4-3.568-1.607L23.2 17.885z"
        />
      </svg>
    );
  }

  function LayersIcon() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-[#3F59E4] dark:fill-[#99A7F1]"
          d="M34.54 29.135l6.373 3.183c1.566.782 1.566 3.017 0 3.8l-14.815 7.396a4.623 4.623 0 01-4.125 0L7.174 36.12c-1.565-.782-1.565-3.017 0-3.798l6.532-3.214"
        />
        <path
          className="fill-[#AAB6F3] dark:fill-[#3449BA]"
          d="M34.54 18.86l6.373 3.183c1.566.782 1.566 3.016 0 3.8L26.098 33.24a4.623 4.623 0 01-4.125 0L7.174 25.843c-1.565-.781-1.565-3.016 0-3.798l6.33-3.164"
        />
        <path
          className="fill-[#CFD6F8] dark:fill-[#22307C]"
          d="M21.94 23.058L7.306 15.745c-1.62-.81-1.62-3.123 0-3.932l14.631-7.319a4.693 4.693 0 014.194 0l14.648 7.319c1.622.81 1.62 3.124 0 3.932L26.13 23.058c-1.321.66-2.873.66-4.191 0z"
        />
      </svg>
    );
  }

  function GithubIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    );
  }

  function Menu() {
    const showBackendFlow = appType === "non_interactive";

    const createLabel = showBackendFlow
      ? "Create a new API"
      : "Create a new application";

    const integrateLabel = showBackendFlow
      ? "Integrate with an existing API"
      : "Integrate with an existing application";

    const handleCreate = () => {
      setRoute(showBackendFlow ? "createApi" : "create");
    };

    const handleIntegrate = () => {
      setRoute(showBackendFlow ? "integrateApi" : "integrate");
    };

    return (
      <ul className="space-y-4 list-none login_list">
        <li className="list-none !px-0">
          <button onClick={handleCreate} className="w-full text-left">
            <Card className="p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <IconTile>
                    <LightningIcon />
                  </IconTile>
                  <h2 className="text-lg">{createLabel}</h2>
                </div>
                <RightChevron className="w-4 h-4 text-zinc-500" />
              </div>
            </Card>
          </button>
        </li>
        <li className="list-none !px-0">
          <button onClick={handleIntegrate} className="w-full text-left">
            <Card className="p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <IconTile>
                    <LayersIcon />
                  </IconTile>
                  <h2 className="text-lg">{integrateLabel}</h2>
                </div>
                <RightChevron className="w-4 h-4 text-zinc-500" />
              </div>
            </Card>
          </button>
        </li>
        <li className="list-none !px-0">
          <a
            className="no_external_icon block"
            href={sampleAppUrl ?? "/"}
            target="_blank"
            rel="noreferrer"
          >
            <Card className="p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <IconTile>
                    <GithubIcon />
                  </IconTile>
                  <h2 className="text-lg">View a sample application</h2>
                </div>
                <RightChevron className="w-4 h-4 text-zinc-500" />
              </div>
            </Card>
          </a>
        </li>
      </ul>
    );
  }

  function CreateClientForm({ onCancel }) {
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const reset = () => {
      setName("");
      setError(null);
      if (onCancel) {
        onCancel();
      } else {
        setRoute("menu");
      }
    };

    const handleSubmit = async () => {
      if (!name.trim()) {
        setError("Application name is required");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Create client using the clientStore method
        await window.rootStore.clientStore.createClient({
          name: name.trim(),
        });

        setName("");
        showToast("Application created successfully!", "success");
        reset();
      } catch (err) {
        console.error("Error creating client:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create application";
        setError(errorMessage);
        showToast(errorMessage, "error");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        <Input
          id="app-name"
          label="Application Name"
          placeholder="My App"
          value={name}
          onChange={setName}
        />
        <p className="text-sm text-zinc-500">
          You can change this later in the application settings.
        </p>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-3">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
          <Button variant="outline" onClick={reset}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  function IntegrateClientForm({ clients, onCancel }) {
    const [callbacks, setCallbacks] = useState("");
    const [logouts, setLogouts] = useState("");
    const [origins, setOrigins] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const reset = () => {
      if (onCancel) {
        onCancel();
      } else {
        setRoute("menu");
      }
    };

    // Load stored config when selected client changes
    useEffect(() => {
      if (selectedClientId) {
        const selectedClient = clients.find(
          (c) => c.client_id === selectedClientId
        );
        if (selectedClient) {
          setCallbacks(selectedClient.callbacks?.join(", ") || "");
          setLogouts("");
          setOrigins("");
        }
      }
    }, [selectedClientId, clients]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        // TODO: Update client using the clientStore method
        // await window.rootStore.clientStore.updateClient(selectedClientId, {
        //   callbacks: callbacks
        //     .split(",")
        //     .map((url) => url.trim())
        //     .filter((url) => url),
        //   allowed_logout_urls: logouts
        //     .split(",")
        //     .map((url) => url.trim())
        //     .filter((url) => url),
        //   web_origins: origins
        //     .split(",")
        //     .map((url) => url.trim())
        //     .filter((url) => url),
        // });
        showToast("Configuration saved successfully!", "success");
        reset();
      } catch (err) {
        console.error("Failed to save configuration:", err);
        showToast("Failed to save configuration", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (clients.length === 0) {
      return (
        <div className="space-y-6">
          <p className="text-sm text-zinc-500">
            No applications found. Please create one first.
          </p>
          <Button onClick={reset}>Back</Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <span className="block text-sm text-zinc-600 dark:text-zinc-300 mb-1">
            Select your Application
          </span>
          <Select
            label=""
            value={selectedClientId || ""}
            onChange={setSelectedClientId}
            options={clients.map((c) => ({
              id: c.client_id,
              name: c.name,
            }))}
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="callbacks"
            name="callbacks"
            label="Callback URLs"
            placeholder="http://localhost:3000/callback"
            value={callbacks}
            onChange={setCallbacks}
          />
          <Input
            id="logout"
            name="allowed_logout_urls"
            label="Logout URLs"
            placeholder="http://localhost:3000"
            value={logouts}
            onChange={setLogouts}
          />
          <Input
            id="origins"
            name="web_origins"
            label="Allowed Web Origins"
            placeholder="http://localhost:3000"
            value={origins}
            onChange={setOrigins}
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" type="button" onClick={reset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  function CreateApiForm({ onCancel }) {
    const [name, setName] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const reset = () => {
      setName("");
      setIdentifier("");
      setError(null);
      if (onCancel) {
        onCancel();
      } else {
        setRoute("menu");
      }
    };

    const handleSubmit = async () => {
      if (!name.trim()) {
        setError("API name is required");
        return;
      }
      if (!identifier.trim()) {
        setError("API identifier is required");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Create API using the resourceServerStore method
        await rootStore.resourceServerStore.createApi({
          name: name.trim(),
          identifier: identifier.trim(),
        });

        setName("");
        setIdentifier("");
        showToast("API created successfully!", "success");
        reset();
      } catch (err) {
        console.error("Error creating API:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create API";
        setError(errorMessage);
        showToast(errorMessage, "error");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        <Input
          id="api-name"
          label="API Name"
          placeholder="My API"
          value={name}
          onChange={setName}
        />
        <Input
          id="api-identifier"
          label="API Identifier"
          placeholder="https://my-api.example.com"
          value={identifier}
          onChange={setIdentifier}
        />
        <p className="text-sm text-zinc-500">
          The identifier is used to uniquely identify your API.
        </p>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-3">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
          <Button variant="outline" onClick={reset}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  function IntegrateApiForm({ apis, onCancel }) {
    const [isLoading, setIsLoading] = useState(false);

    const reset = () => {
      if (onCancel) {
        onCancel();
      } else {
        setRoute("menu");
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        // TODO: Update selected API using the resourceServerStore method
        // await rootStore.resourceServerStore.updateApi(selectedApiId, {
        //   // Include any necessary data for the update
        // });
        showToast("API configuration saved successfully!", "success");
        reset();
      } catch (err) {
        console.error("Failed to save API configuration:", err);
        showToast("Failed to save API configuration", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (apis.length === 0) {
      return (
        <div className="space-y-6">
          <p className="text-sm text-zinc-500">
            No APIs found. Please create one first.
          </p>
          <Button onClick={reset}>Back</Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <span className="block text-sm text-zinc-600 dark:text-zinc-300 mb-1">
            Select your API
          </span>
          <Select
            label=""
            value={selectedApiId || ""}
            onChange={setSelectedApiId}
            options={apis.map((api) => ({
              id: api.id,
              name: api.name,
            }))}
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Selected API will be used for your backend configuration.
          </p>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" type="button" onClick={reset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  function Flows({ clients, apis }) {
    return (
      <div>
        {route === "menu" && <Menu />}

        {route === "create" && (
          <CreateClientForm onCancel={() => setRoute("menu")} />
        )}

        {route === "integrate" && (
          <IntegrateClientForm
            clients={clients}
            onCancel={() => setRoute("menu")}
          />
        )}

        {route === "createApi" && (
          <CreateApiForm onCancel={() => setRoute("menu")} />
        )}

        {route === "integrateApi" && (
          <IntegrateApiForm apis={apis} onCancel={() => setRoute("menu")} />
        )}
      </div>
    );
  }

  function LoggedInForm() {
    const [clients, setClients] = useState([]);
    const [apis, setApis] = useState([]);

    // Fetch fresh clients for non_interactive app types on mount
    useEffect(() => {
      const rootStore = window.rootStore;
      if (appType && appType !== "non_interactive") {
        rootStore.clientStore.init();
      } else if (appType === "non_interactive") {
        // For non_interactive, we also fetch resource servers
        rootStore.resourceServerStore.init();
      }
    }, [appType]);

    // Subscribe to client store changes
    useEffect(() => {
      if (!appType || appType === "non_interactive") return;

      const disposer = window.autorun(() => {
        const allClients = rootStore.clientStore.clients || [];
        const filteredClients = allClients.filter(
          (client) => !client.app_type || client.app_type === appType
        );
        setClients(filteredClients);
      });

      return () => {
        disposer();
      };
    }, [appType]);

    // Subscribe to resource server store changes (for non_interactive)
    useEffect(() => {
      if (appType !== "non_interactive") return;

      const resourceServerStore = window.rootStore.resourceServerStore;
      resourceServerStore.init?.();
      const allApis = resourceServerStore.resourceServers || [];
      setApis(allApis);
    }, [appType]);

    return (
      <div className="w-full mx-auto py-8">
        <Flows clients={clients} apis={apis} />
      </div>
    );
  }

  return (
    <Wrapper>
      {isAuthenticated ? <LoggedInForm /> : <SignUpFormInternal />}
    </Wrapper>
  );
};
