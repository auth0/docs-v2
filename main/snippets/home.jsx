export const DocsBanner = () => {
  return (
    <div className="gap-5 flex justify-center p-6 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(180,160,255,.45)_0%,rgba(255,235,240,.35)_40%,rgba(255,245,235,.6)_100%)]">
      <div className="w-[min(860px,90vw)] text-center px-6 py-12">
        <h1 className="mb-5 font-inter text-5xl text-center text-gray-900 dark:text-white">Auth0 Docs</h1>
        <p className="mt-4 mb-10 font-inter font-normal text-body-l leading-body-l tracking-body-l text-center text-gray-600 max-w-2xl mx-auto dark:text-white">
          Browse the latest sample code, articles, tutorials,
          <br /> and API reference.
        </p>

        <div className="flex justify-center mt-5">
          <img noZoom src="/images/home/home-banner.svg" alt="Auth0 Docs Banner" className="rounded-xl shadow-md" />
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
      icon: "/images/home/icon1.svg",
      external: true,
    },
    {
      title: "API References",
      link: "https://auth0.com/docs/api",
      icon: "/images/home/icon2.svg",
      external: false,
    },
    {
      title: "SDKs",
      link: "/docs/libraries",
      icon: "/images/home/icon3.svg",
      external: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[962px] mx-auto py-6">
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
              <img src={f.icon} alt={f.title} className="h-7 w-7" />
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
      img: "/images/home/node-light.svg",
      imgDark: "/images/home/node-dark.svg",
      label: "NodeJS",
      href: "/docs/quickstart/backend/nodejs",
    },
    {
      img: "/images/home/rails-light.svg",
      imgDark: "/images/home/rails-dark.svg",
      label: "Ruby",
      href: "/docs/quickstart/backend/rails",
    },
    {
      img: "/images/home/go-light.svg",
      imgDark: "/images/home/go-dark.svg",
      label: "Go",
      href: "/docs/quickstart/backend/go",
    },
    {
      img: "/images/home/php-light.svg",
      imgDark: "/images/home/php-dark.svg",
      label: "PHP",
      href: "/docs/quickstart/backend/php",
    },
    {
      img: "/images/home/python-light.svg",
      imgDark: "/images/home/python-dark.svg",
      label: "Python",
      href: "/docs/quickstart/backend/python",
    },
    {
      img: "/images/home/node-light.svg",
      imgDark: "/images/home/node-dark.svg",
      label: ".NET",
      href: "/docs/quickstart/backend/dotnet",
    },
    {
      img: "/images/home/java-light.svg",
      imgDark: "/images/home/java-dark.svg",
      label: "Java",
      href: "/docs/quickstart/backend/java",
    },
    {
      img: "/images/home/laravel-light.svg",
      imgDark: "/images/home/laravel-dark.svg",
      label: "Laravel",
      href: "/docs/quickstart/backend/laravel",
    },
  ];

  return (
    <section className="max-w-[962px] mx-auto py-12">
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
            {lang.imgDark ? (
              <>
                <img noZoom src={lang.img} alt={lang.label} className="h-8 w-8 mb-4 block dark:hidden" />
                <img noZoom src={lang.imgDark} alt={lang.label} className="h-8 w-8 mb-4 hidden dark:block" />
              </>
            ) : (
              <img noZoom src={lang.img} alt={lang.label} className="h-8 w-8 mb-4" />
            )}
            <span className="font-inter text-base text-gray-900 dark:text-white">{lang.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export const ProductGrid = () => {
  const products = [
    { label: "Authentication", href: "/docs/authentication" },
    { label: "Fine-Grained Authorization", href: "/docs/fine-grained-authorization" },
    { label: "Auth for GenAI", href: "/docs/genai-auth" },
  ];

  return (
    <section className="max-w-[962px] mx-auto py-12">
      <h2 className="font-inter !font-medium text-[24px] text-gray-900 dark:text-white mb-6 text-left">
        Browse by product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className="
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
      href: "/docs/learn/basic-concepts",
    },
    { title: "Cookbooks", desc: "Open-source collection of examples & guides.", href: "/docs/learn/cookbooks" },
    {
      title: "Community",
      desc: "Join the community for questions, suggestions and product feedback.",
      href: "/community",
    },
    { title: "Status", desc: "Check the status of Auth0 services", href: "https://status.auth0.com/" },
  ];

  return (
    <section className="max-w-[962px] mx-auto py-12 pb-30">
      <h2 className="font-inter !font-medium text-[24px] text-gray-900 dark:text-white mb-6 text-left">
        Learn identity basics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {items.map((it) => (
          <a key={it.title} href={it.href} className="no_external_icon group block">
            {/* Thumbnail */}
            <div
              className="
                rounded-[22px] border border-gray-200 dark:border-white/10
                bg-white/70 dark:bg-neutral-900/60
                shadow-sm hover:shadow-md transition
                aspect-[4/3]
                relative
                p-1.5
              "
            >
              {/* Inner rounded container (clips the image + subtle inner border) */}
              <div className="h-full w-full rounded-[18px] overflow-hidden border border-black/5 dark:border-white/5">
                {/* GRID image (light) */}
                <img
                  src="/images/home/LearnBasics_Light.svg"
                  alt=""
                  className="h-full w-full object-cover block dark:hidden"
                />
                {/* GRID image (dark) */}
                <img
                  src="/images/home/LearnBasics_Dark.svg"
                  alt=""
                  className="h-full w-full object-cover hidden dark:block"
                />
              </div>
            </div>

            {/* Text */}
            <div className="mt-2 px-2">
              <h3 className="font-inter font-medium text-lg text-gray-900 dark:text-white">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-gray-600 dark:text-gray-400">{it.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
