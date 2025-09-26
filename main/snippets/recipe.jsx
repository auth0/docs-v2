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

export const Section = ({ id, title, stepNumber, children, isSingleColumn = false }) => {
  return (
    <div id={id} className={`recipe-section flex flex-col transition-opacity duration-200`}>
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
        if (scrollY + viewportHeight * multiplier >= sectionTop && scrollY <= sectionBottom) {
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
    <div id={`side-menu-item-${id}`} className="recipe-side-menu-item flex flex-col w-full h-full">
      {children}
    </div>
  );
};

export const SignUpForm = () => {
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
        <a href="https://auth0.com/signup" target="_blank" rel="noopener noreferrer">
          Auth0 account
        </a>{" "}
        or{" "}
        <span className="font-semibold text-primary cursor-pointer" onClick={() => console.log("log in")}>
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
};
