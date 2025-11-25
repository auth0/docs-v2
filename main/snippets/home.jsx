export const DocsBanner = () => {
  return (
    <div className="gap-5 flex justify-center p-6 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(180,160,255,.45)_0%,rgba(255,235,240,.35)_40%,rgba(255,245,235,.6)_100%)]">
      <div className="w-[min(860px,90vw)] text-center px-0 py-2 md:px-6 md:py-12">
        <h1 className="mb-5 font-inter font-semibold text-5xl text-center text-gray-900 dark:text-white">Auth0 Docs</h1>
        <p className="mt-4 mb-10 font-inter font-normal text-body-l leading-body-l tracking-body-l text-center text-gray-600 max-w-2xl mx-auto dark:text-white">
          Browse the latest sample code, articles, tutorials,
          <br /> and API reference.
        </p>

        <div className="flex justify-center mt-5">
          {/* Mobile light banner (< 420px, light mode) */}
          <img
            noZoom
            src="/docs/images/home/banner-mobile.svg"
            alt="Auth0 Docs Banner"
            className="block w-full h-auto sm:hidden"
          />

          {/* Desktop light banner (>= 420px, light mode) */}
          <img
            noZoom
            src="/docs/images/home/banner.svg"
            alt="Auth0 Docs Banner"
            className="hidden w-full h-auto sm:block dark:hidden"
          />
          {/* Desktop dark banner (>= 420px, dark mode) */}
          <img
            noZoom
            src="/docs/images/home/banner-dark.svg"
            alt="Auth0 Docs Banner (dark)"
            className="hidden w-full h-auto sm:dark:block"
          />
        </div>
      </div>
    </div>
  );
};

export const DocsFeatureCards = () => {
  const features = [
    {
      title: "Documentation",
      link: "/docs/get-started",
      icon: "/docs/images/home/icon1",
      external: true,
    },
    {
      title: "API References",
      link: "/docs/api",
      icon: "/docs/images/home/icon2",
      external: false,
    },
    {
      title: "SDKs",
      link: "/docs/libraries",
      icon: "/docs/images/home/icon3",
      external: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[962px] mx-auto py-6 px-8 lg:px-0">
      {features.map((f, i) => (
        <a
          key={i}
          href={f.link}
          className="group flex flex-col items-start justify-between rounded-2xl px-6 py-6 
                     bg-white dark:bg-neutral-900/60 
                     border border-gray-200 dark:border-white/10 
                     hover:border-black dark:hover:border-white 
                     transition no_external_icon"
        >
          <div className="flex flex-col items-start gap-3 w-full">
            <div className="h-9 w-9 flex items-center justify-center rounded-md">
              <img src={`${f.icon}.svg`} alt={f.title} className="block dark:hidden h-7 w-7" />
              <img src={`${f.icon}-dark.svg`} alt={f.title} className="hidden dark:block h-7 w-7" />
            </div>

            <div className="flex items-center justify-between w-full">
              <h3 className="font-inter font-medium text-gray-900 dark:text-gray-100 text-xl">{f.title}</h3>
              <span
                className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                  transition-all duration-200 ease-out
                  flex items-center justify-center h-7 w-7 rounded-full 
                  bg-black dark:bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 256 256"
                  className="fill-white dark:fill-black"
                >
                  <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"></path>
                </svg>
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export const LanguageGrid = () => {
  const languages = [
    {
      img: "react.svg",
      label: "React",
      href: "/docs/quickstart/spa/react",
    },
    {
      img: "angular.svg",
      label: "Angular",
      href: "/docs/quickstart/spa/angular",
    },
    {
      img: "nextjs.svg",
      label: "Next.js",
      href: "/docs/quickstart/webapp/nextjs",
    },
    {
      img: "apple.svg",
      label: "iOS",
      href: "/docs/quickstart/native/ios-swift",
    },
    {
      img: "android.svg",
      label: "Android",
      href: "/docs/quickstart/native/android",
    },
    {
      img: "java.svg",
      label: "Java",
      href: "/docs/quickstart/backend/java-spring-security5/interactive",
    },
    {
      img: "dotnet.svg",
      label: ".NET",
      href: "/docs/quickstart/backend/aspnet-core-webapi",
    },
    {
      img: "python.svg",
      label: "Python",
      href: "/docs/quickstart/backend/python",
    },
  ];

  return (
    <section className="max-w-[962px] mx-auto py-12 px-8 lg:px-0">
      <h2 className="font-inter !font-medium text-[24px] text-gray-900 dark:text-white mb-6">
        Get started with authentication
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {languages.map((lang, idx) => (
          <a
            key={idx}
            href={lang.href}
            className="flex flex-col items-center justify-center px-8 py-4 rounded-2xl 
                      bg-white/60 dark:bg-neutral-900/60 
                      border border-gray-200 dark:border-white/10 
                      shadow-sm hover:shadow-md 
                      hover:border-black dark:hover:border-white 
                      transition"
          >
            <img
              noZoom
              src={`/docs/images/icons/light/${lang.img}`}
              alt={lang.label}
              className="h-8 w-8 mb-4 block dark:hidden"
            />
            <img
              noZoom
              src={`/docs/images/icons/dark/${lang.img}`}
              alt={lang.label}
              className="h-8 w-8 mb-4 hidden dark:block"
            />
            <span className="font-inter text-base text-gray-900 dark:text-white">{lang.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export const ProductGrid = () => {
  const products = [
    { label: "Authentication", href: "https://auth0.com/platform/authentication" },
    { label: "Fine-Grained Authorization", href: "https://auth0.com/fine-grained-authorization" },
    { label: "Auth0 for AI Agents", href: "https://auth0.com/ai" },
  ];

  return (
    <section className="max-w-[962px] mx-auto py-12 px-8 lg:px-0">
      <h2 className="font-inter !font-medium text-[24px] text-gray-900 dark:text-white mb-6 text-left">
        Browse by product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className="
              no_external_icon
              group
              flex items-center justify-center
              rounded-2xl
              min-h-[72px] md:min-h-[80px]
              px-6
              text-base md:text-lg font-inter font-medium
              bg-white/70 dark:bg-neutral-900/60
              border border-gray-200 dark:border-white/10
              shadow-sm
              hover:shadow-md
              hover:border-black dark:hover:border-white
              transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 dark:focus-visible:ring-white/60
            "
          >
            <span className="text-gray-900 dark:text-white">{p.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export const LearnBasicsGrid = () => {
  const items = [
    {
      title: "Basic concepts",
      desc: "Comprehensive course designed on the fundamental principles of identity.",
      href: "https://auth0.com/learn#concepts",
      img: "/docs/images/home/basics-card1",
    },
    {
      title: "Cookbooks",
      desc: "Open-source collection of examples & guides.",
      href: "https://developer.auth0.com/resources/guides?_gl=1*hg464v*_gcl_aw*R0NMLjE3NTg1NTU5NTQuQ2owS0NRanc1OFBHQmhDa0FSSXNBRGJEaWx6TGFiRWtJUWNCR0Iybi1WcjA2Z2lZX0FoTjdpaFoxTjRValdTMGZJX2sxVjNNV3FOOUowY2FBdmg2RUFMd193Y0I.*_gcl_au*MjYwOTY4MDAwLjE3NTUwODIyNDM.*_ga*NTU0NzcwODMwLjE3NTUwODIyNDM.*_ga_QKMSDV5369*czE3NjAzNjgxMDYkbzEwMCRnMSR0MTc2MDM2ODEyNCRqNDIkbDAkaDA.",
      img: "/docs/images/home/basics-card2",
    },
    {
      title: "Community",
      desc: "Join the community for questions, suggestions and product feedback.",
      href: "https://community.auth0.com/?_gl=1*1mc779c*_gcl_aw*R0NMLjE3NTg1NTU5NTQuQ2owS0NRanc1OFBHQmhDa0FSSXNBRGJEaWx6TGFiRWtJUWNCR0Iybi1WcjA2Z2lZX0FoTjdpaFoxTjRValdTMGZJX2sxVjNNV3FOOUowY2FBdmg2RUFMd193Y0I.*_gcl_au*MjYwOTY4MDAwLjE3NTUwODIyNDM.*_ga*NTU0NzcwODMwLjE3NTUwODIyNDM.*_ga_QKMSDV5369*czE3NjAzNjgxMDYkbzEwMCRnMSR0MTc2MDM2ODk2OSRqNTkkbDAkaDA.",
      img: "/docs/images/home/basics-card3",
    },
    {
      title: "Support",
      desc: "Get support for your Auth0 implementation.",
      href: "https://support.auth0.com/",
      img: "/docs/images/home/basics-card4",
    },
  ];

  return (
    <section className="max-w-[962px] mx-auto py-12 pb-30 px-8 lg:px-0">
      <h2 className="font-inter !font-medium text-[24px] text-gray-900 dark:text-white mb-6 text-left">
        Resources & Support
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <a
            key={it.title}
            href={it.href}
            target="_blank"
            className="no_external_icon group block rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:border-black dark:hover:border-white hover:shadow-lg transition-all"
          >
            {/* Icon */}
            <div className="w-12 h-12 mb-4 overflow-hidden">
              <img src={`${it.img}.svg`} alt={it.title} className="block dark:hidden w-full h-full object-cover" />
              <img src={`${it.img}-dark.svg`} alt={it.title} className="hidden dark:block w-full h-full object-cover" />
            </div>

            {/* Text */}
            <div>
              <h3 className="font-inter font-medium text-lg text-gray-900 dark:text-white mb-2">{it.title}</h3>
              <p className="text-[15px] leading-6 text-gray-600 dark:text-gray-400">{it.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
