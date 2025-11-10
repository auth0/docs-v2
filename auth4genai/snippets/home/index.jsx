export const GenAIBanner = () => {
  return (
    <div className="gap-5 flex justify-center p-6 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(103,66,213,.45)_0%,rgba(179,167,255,.35)_40%,rgba(103,66,213,.6)_100%)]">
      <div className="text-center px-6">
        <h1 className="mt-[30px] mb-4 font-heading text-[40px] font-semibold leading-[120%] tracking-[-0.8px] text-center text-[#232220] dark:text-[#EFEDE9]">Auth for AI Agents</h1>
        <p className="mb-[40px] text-[20px] font-medium leading-[130%] tracking-[-0.34px] text-center text-[#767676] max-w-2xl mx-auto dark:text-[#7B7B7B]" style={{ fontFamily: 'Inter' }}>
          Secure your AI Agents and GenAI applications
        </p>
      </div>
    </div>
  );
};

export const UseCasesGrid = () => {
  const useCases = [
    {
      title: "User Authentication",
      description: "Strong user authentication is crucial for personalizing AI Agent interactions. It enhances security, and manages access to AI models and features.",
      icon: "/img/icon-landing-user-light.png",
      href: "/intro/user-authentication"
    },
    {
      title: "Calling APIs",
      description: "A secure way to enable API calls with credential management using a token vault, for both backend services and SPAs (Single-page Applications).",
      icon: "/img/icon-multishape-light.png",
      href: "/calling-apis/langgraph/intro/overview"
    },
    {
      title: "Asynchronous Authorization",
      description: "A secure \"human-in-the-loop\" mechanism, allowing agents to act asynchronously in the background and seek user consent.",
      icon: "/img/icon-landing-light.png",
      href: "/async-authorization/langgraph/intro/asynchronous-authorization"
    },
    {
      title: "Authorization for RAG",
      description: "Ensures that a GenAI application only accesses data that a user is allowed to see. This safeguards sensitive information and prevents unauthorized exposure.",
      icon: "/img/icon-store_4-light.png",
      href: "/authorization-for-rag/langgraph/intro/authorization-for-rag"
    },
    {
      title: "Auth for MCP",
      description: "Auth0 strong user authentication is crucial for personalizing AI Agent interactions. It enhances security, and manages access to AI models and features.",
      icon: "/img/icon-landing-mcp-light.png",
      href: "/mcp/auth-for-mcp"
    }
  ];

  return (
    <section className="max-w-[960px] mx-auto px-5 md:px-0">
      <h2 className="font-heading text-[32px] font-medium leading-[120%] tracking-[-0.32px] text-[#232220] dark:text-[#EFEDE9] mb-6">
        Use Cases
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {useCases.map((useCase, idx) => (
          <a
            key={idx}
            href={useCase.href}
            className="group flex px-6 pt-6 pb-3 flex-col items-start rounded-xl border border-[#C5C5C5] dark:border-[#3F3D3A] transition duration-300 hover:border-2 hover:border-[#1F1F1F] hover:dark:border-2 hover:dark:border-[#EEEEEE] hover:-m-px hover:cursor-pointer no-underline dark:[box-shadow:0px_0px_4px_0px_#2927250D,0px_-1px_1px_-1px_#29272580,0px_-1px_12px_-4px_#FFFFFF17,0.5px_0.5px_4px_0px_#29272580_inset,-0.5px_-0.5px_2px_0px_#FFFFFF17_inset]"
          >
            <div className="w-[58px] h-[58px] aspect-square rounded-lg flex items-center justify-center text-white text-2xl mb-3">
              <img src={useCase.icon} />
            </div>

            <h3 className="text-base font-semibold leading-[115%] tracking-[-0.176px] text-left text-[#232220] dark:text-[#F4F4F4] mb-1" style={{ fontFamily: 'Inter' }}>
              {useCase.title}
            </h3>

            <p className="text-xs font-medium leading-[130%] text-left text-[#767676] dark:text-[#7B7B7B] mb-[10.5px] flex-grow" style={{ fontFamily: 'Inter' }}>
              {useCase.description}
            </p>

            <div className="w-full h-px bg-[#ECEBE8] dark:bg-[#3F3D3A] mb-[13px]"></div>

            <div className="w-full flex justify-end">
              <div className="inline h-8 py-1 items-center">
                <span className="inline text-[14px] font-medium leading-[130%] text-center text-[#191919] dark:text-[#EFEDE9]" style={{ fontFamily: 'Inter' }}>Learn more</span>
                <img src="/img/arrow-right.svg" alt="arrow" className="inline -ml-2 group-hover:ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 dark:invert dark:brightness-90" style={{ width: '9.4px', height: '11.375px' }} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export const AvailableSDKs = () => {
  const sdks = [
    {
      name: "LangChain",
      logo: "/img/icon-landing-langchain-light.png",
      href: "/sdks/langchain-sdk",
      padding: "5.71px"
    },
    {
      name: "LlamaIndex",
      logo: "/img/icon-landing-llamaindex-light.png",
      href: "/sdks/llamaindex-sdk",
      padding: "5px 6px 6px 5px"
    },
    {
      name: "AI SDK",
      logo: "/img/icon-landing-vercel-light.png",
      href: "/sdks/vercel-ai-sdk",
      padding: "10px 8.45px"
    },
    {
      name: "Cloudflare Agents",
      logo: "/img/icon-landing-cloudflare-light.png",
      href: "/sdks/cloudflare-sdk",
      padding: "6.429px 5.714px"
    }
  ];

  return (
    <section className="max-w-[960px] mx-auto px-5 md:px-0">
      <h2 className="font-heading text-[32px] font-medium leading-[120%] tracking-[-0.32px] text-[#232220] dark:text-[#EFEDE9] mb-6">
        Available SDKs
      </h2>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mb-6">
        {sdks.map((sdk, idx) => (
          <a
            key={idx}
            href={sdk.href}
            className="flex p-4 items-center transition duration-300 gap-3 w-full md:flex-1 self-stretch rounded-xl border border-[#CECDCA] dark:border-[#3F3D3A] bg-white dark:bg-[#18181B] transition hover:border-2 hover:border-[#1F1F1F] hover:dark:border-2 hover:dark:border-[#EEEEEE] hover:[box-shadow:0px_2px_12px_-4px_rgba(0,0,0,0.08),0.5px_0.5px_4px_0px_rgba(255,255,255,0.4)_inset,-0.5px_-0.5px_2px_0px_rgba(0,0,0,0.12)_inset] hover:dark:[box-shadow:0px_2px_12px_-4px_rgba(0,0,0,0.25),0.5px_0.5px_4px_0px_rgba(31,31,31,1)_inset,-0.5px_-0.5px_2px_0px_rgba(0,0,0,0.25)_inset] hover:-m-px dark:[box-shadow:-0.5px_-0.5px_2px_0px_rgba(255,255,255,0.09)_inset,0.5px_0.5px_4px_0px_rgba(41,39,37,0.50)_inset,0px_2px_12px_-4px_rgba(255,255,255,0.09)] [box-shadow:-0.5px_-0.5px_2px_0px_rgba(0,0,0,0.12)_inset,0.5px_0.5px_4px_0px_rgba(255,255,255,0.40)_inset,0px_2px_12px_-4px_rgba(0,0,0,0.08)]"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={sdk.logo}
                alt={sdk.name}
                className="dark:invert"
                style={{ padding: sdk.padding }}
              />
            </div>
            <span className="text-gray-900 dark:text-white text-base font-semibold" style={{ fontFamily: 'Inter', lineHeight: '115%', letterSpacing: '-0.176px' }}>{sdk.name}</span>
          </a>
        ))}
      </div>

      <div className="text-right">
        <a
          href="/sdks/overview"
          className="inline-flex items-center gap-2 text-sm font-medium leading-[145%] tracking-[-0.084px] text-[#6742D5] dark:text-[#B0A8FC] hover:text-[#5D34C7] hover:dark:text-[#7549F2] transition duration-300" style={{ fontFamily: 'Inter' }}
        >
          View more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.46967 3.46967C8.76256 3.17678 9.23744 3.17678 9.53033 3.46967L13.5303 7.46967C13.8232 7.76256 13.8232 8.23744 13.5303 8.53033L9.53033 12.5303C9.23744 12.8232 8.76256 12.8232 8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697L11.1893 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H11.1893L8.46967 4.53033C8.17678 4.23744 8.17678 3.76256 8.46967 3.46967Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export const GetStartedCTA = () => {
  return (
    <a href="/build-with-ai/using-ai-tools" className="group max-w-[960px] mx-auto px-5 md:px-0 block">
      <div
        className="rounded-xl flex flex-col md:flex-row p-8 items-center justify-between gap-4 self-stretch bg-[#DCD4F6] dark:bg-[#B49BFCF1]"
        style={{
          boxShadow: '0px 2px 4px 0px #0000000D, 0px 2px 1px -1px #0000000A, 0px 2px 12px -4px #00000014, 0.5px 0.5px 4px 0px #FFFFFF66 inset, -0.5px -0.5px 2px 0px #0000001F inset, 0px 2px 2px 0px #FFFFFF40 inset'
        }}
      >
        <div className="flex flex-col">
          <h2 className="text-base font-semibold leading-[115%] tracking-[-0.176px] text-left text-[#232220] dark:text-[#1F1F1F] mb-1 mt-0" style={{ fontFamily: 'Inter' }}>
            Get started quickly with Auth for AI Agents
          </h2>
          <p
            className="text-xs font-medium leading-[130%] text-[#767676] dark:text-[#1F1F1F] mt-0 mb-0"
            style={{ fontFamily: 'Inter' }}
          >
            Use it for explanations, workflows, or direct integration into your app.
          </p>
        </div>
        <div
          className="transition-all flex px-[14px] py-2 items-center text-[#232220] font-semibold text-[14px] pl-6"
          style={{
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.40)',
            background: '#F2EFFC',
            fontFamily: 'Inter',
            lineHeight: '140%',
            letterSpacing: '0'
          }}
        >
          <div className="w-full flex transition-all">
              <div className="flex items-center transition-all">
                <span>Start Building with AI</span>
                <img
                  src="/img/arrow-right.svg"
                  alt="arrow"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:ml-5 ml-1"
                  style={{ width: '9.4px', height: '11.375px' }}
                />
              </div>
            </div>
        </div>
      </div>
    </a>
  );
};

export const StarterKits = () => {
  const kits = [
    {
      title: "Assistant0",
      description: "An assistant with secure auth, API access, approvals, and FGA-protected RAG.",
      githubUrl: "https://github.com/auth0-samples/auth0-assistant0"
    },
    {
      title: "SmartHR Assistant",
      description: "An AI-driven assistant provides secure access to HR documents based on complex authorization rules.",
      githubUrl: "https://github.com/auth0-samples/auth0-ai-smart-hr-assistant"
    },
    {
      title: "Agent0",
      description: "Reference AI personal assistant with pre-configured auth that demonstrates different Auth0 for AI Agents features.",
      githubUrl: "https://github.com/auth0-samples/agent0"
    }
  ];

  return (
    <section className="max-w-[960px] mx-auto px-5 md:px-0">
      <h2 className="font-heading text-[32px] font-medium leading-[120%] tracking-[-0.32px] text-[#232220] dark:text-[#EFEDE9] mb-6">
        Starter Kits
      </h2>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mb-6">
        {kits.map((kit, idx) => (
          <a
            key={idx}
            href={kit.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex px-4 pt-4 pb-[14px] transition duration-300 flex-col w-full md:flex-1 self-stretch rounded-xl border border-[#CECDCA] dark:border-[#3F3D3A] bg-white dark:bg-[#18181B] transition hover:border-2 hover:border-[#1F1F1F] hover:dark:border-2 hover:dark:border-[#EEEEEE] hover:[box-shadow:0px_2px_12px_-4px_rgba(0,0,0,0.08),0.5px_0.5px_4px_0px_rgba(255,255,255,0.4)_inset,-0.5px_-0.5px_2px_0px_rgba(0,0,0,0.12)_inset] hover:dark:[box-shadow:0px_2px_12px_-4px_rgba(0,0,0,0.25),0.5px_0.5px_4px_0px_rgba(31,31,31,1)_inset,-0.5px_-0.5px_2px_0px_rgba(0,0,0,0.25)_inset] hover:-m-px hover:cursor-pointer dark:[box-shadow:-0.5px_-0.5px_2px_0px_rgba(255,255,255,0.09)_inset,0.5px_0.5px_4px_0px_rgba(41,39,37,0.50)_inset,0px_2px_12px_-4px_rgba(255,255,255,0.09)] [box-shadow:-0.5px_-0.5px_2px_0px_rgba(0,0,0,0.12)_inset,0.5px_0.5px_4px_0px_rgba(255,255,255,0.40)_inset,0px_2px_12px_-4px_rgba(0,0,0,0.08)] no-underline"
          >
            <h3 className="text-base font-semibold leading-[115%] tracking-[-0.176px] text-left text-[#232220] dark:text-[#F4F4F4] mb-1 mt-0" style={{ fontFamily: 'Inter' }}>
              {kit.title}
            </h3>
            <p className="text-xs font-medium leading-[130%] text-[#767676] dark:text-[#7B7B7B] mt-0 mb-[17.5px] flex-grow" style={{ fontFamily: 'Inter' }}>
              {kit.description}
            </p>

            <div className="mt-auto">
              <div className="w-full h-px bg-[#ECEBE8] dark:bg-[#3F3D3A] mb-[14px]"></div>

              <div className="w-full flex justify-start pl-3 pb-1.5">
                <div className="flex items-center gap-2 text-xs font-medium leading-[130%] text-[#191919] dark:text-[#F4F4F4]" style={{ fontFamily: 'Inter' }}>
                  <img src="/img/github-logo-light.svg" alt="GitHub" className="w-4 h-4 dark:invert dark:brightness-90" />
                  Github
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-right">
        <a
          href="/sample-apps"
          className="inline-flex items-center gap-2 text-sm font-medium leading-[145%] tracking-[-0.084px] text-[#6742D5] dark:text-[#B0A8FC] hover:text-[#5D34C7] hover:dark:text-[#7549F2] transition duration-300" style={{ fontFamily: 'Inter' }}
        >
          View more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.46967 3.46967C8.76256 3.17678 9.23744 3.17678 9.53033 3.46967L13.5303 7.46967C13.8232 7.76256 13.8232 8.23744 13.5303 8.53033L9.53033 12.5303C9.23744 12.8232 8.76256 12.8232 8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697L11.1893 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H11.1893L8.46967 4.53033C8.17678 4.23744 8.17678 3.76256 8.46967 3.46967Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export const DeveloperProgram = () => {
  return (
    <a className="max-w-[960px] mx-auto group block" href="https://auth0.com/signup?onboard_app=genai">
      <div
        className="overflow-hidden pt-1 pb-1 pl-1 pr-0 transition duration-300 border border-[#ECEBE8] dark:border-[#3F3D3A] border-box hover:cursor-pointer bg-[#FEFEFD] dark:bg-[#1F1F1F]"
        style={{
          borderRadius: '16px'
        }}
      >
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex-1 flex flex-col p-10 gap-6">
            <div>
              <h2 className="font-heading text-[40px] font-medium leading-[120%] tracking-[-0.8px] text-[#191919] dark:text-[#F4F4F4] mb-2">
                Developer Program
              </h2>
              <p className="text-base font-normal leading-[150%] tracking-[-0.176px] text-[#282622] dark:text-[#767676] mb-0" style={{ fontFamily: 'Inter' }}>
                Join today to start building secure GenAI applications and provide feedback to shape the platform's future.
              </p>
            </div>
            <div
              className="pl-7 transition-all inline-flex px-[14px] rounded-2xl py-1 items-center bg-[#191919] dark:bg-[#F4F4F4] self-start gap-2"
              style={{
                fontFamily: 'Inter',
              }}
            >
              <div className="flex transition-all">
                <div className="flex items-center transition-all">
                  <span className="text-sm font-medium leading-6 font-medium text-[14px] text-[#FEFEFD] dark:text-[#232220]">Join Dev Program</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:ml-3 ml-1 w-4 h-4 dark:invert"
                  >
                    <path d="M6 4L10 8L6 12" stroke="#FEFEFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <script xmlns="" id="eaecf3c2-fe49-4c57-9236-91fec2a36396"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-1">
            <div className="flex items-center justify-center">
              <img
                src="/img/developer-program-diagram.png"
                alt="Developer Program"
                className="pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
