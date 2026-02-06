export const ReleaseLifecycle = ({ releaseLifecycle = 'GA' }) => {
  const lifecycleMap = {
    ea: 'Early Access',
    ga: 'Generally Available',
    deprecated: 'Deprecated',
    planned: 'Planned',
    beta: 'Beta',
  };

  // Color theme configuration for different lifecycle stages
  const LIFECYCLE_THEMES = {
    info: {
      light: {
        bg: 'lab(91.896% .077188 -6.94053)',
        text: 'lab(36.091% 25.9241 -68.0384)',
      },
      dark: {
        bg: 'lab(16.0426% 6.71726 -27.2409)',
        text: 'lab(72.6029% 4.08953 -41.9669)',
      },
    },
    secondary: {
      light: {
        bg: 'lab(90.8548% 11.3355 8.01476)',
        text: 'lab(47.5286% 56.4238 43.4706)',
      },
      dark: {
        bg: 'lab(16.3609% 37.191 25.6346)',
        text: 'lab(71.881% 41.5 29.4839)',
      },
    },
    danger: {
      light: {
        bg: 'lab(94.7916% -.0000298023 0)',
        text: 'lab(54.3656% 0 -.0000119209)',
      },
      dark: { bg: 'lab(13.232% 0 0)', text: 'lab(51.6164% 0 0)' },
    },
  };

  // Map lifecycle stages to their corresponding themes
  const LIFECYCLE_THEME_MAP = {
    ea: 'info',
    ga: 'info',
    beta: 'info',
    deprecated: 'secondary',
    planned: 'danger',
  };

  const lifecycle = releaseLifecycle.toLocaleLowerCase();
  const lifecycleText = lifecycleMap[lifecycle];

  if (!lifecycleText) {
    return null;
  }

  const theme = LIFECYCLE_THEMES[LIFECYCLE_THEME_MAP[lifecycle]];

  return (
    <div>
      <div className="api-section-heading flex flex-col gap-y-4 w-full">
        <div className="flex items-baseline border-b pb-2.5 border-gray-100 dark:border-gray-800 w-full">
          <h4 className="api-section-heading-title flex-1 mb-0">
            Release Lifecycle
          </h4>
        </div>
      </div>
      <div
        className="flex font-mono text-sm group/param-head param-head break-all relative mt-2.5"
        id="releaselifecycle-lifecycle"
      >
        <div className="flex-1 flex flex-col content-start py-0.5 mr-5">
          <div className="flex items-center flex-wrap gap-2">
            <div className="absolute -top-1.5">
              <a
                href="#releaselifecycle-lifecycle"
                className="-ml-10 flex items-center opacity-0 border-0 group-hover/param-head:opacity-100 focus:opacity-100 focus:outline-0 py-2 [.expandable-content_&]:-ml-[2.1rem] group/link"
                aria-label="Navigate to header"
              >
                <div className="w-6 h-6 rounded-md flex items-center justify-center shadow-sm text-gray-400 dark:text-white/50 dark:bg-background-dark dark:brightness-[1.35] dark:ring-1 dark:hover:brightness-150 bg-white ring-1 ring-gray-400/30 dark:ring-gray-700/25 hover:ring-gray-400/60 dark:hover:ring-white/20 group-focus/link:border-2 group-focus/link:border-primary dark:group-focus/link:border-primary-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="gray"
                    height="12px"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 256C0 167.6 71.6 96 160 96h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C98.1 144 48 194.1 48 256s50.1 112 112 112h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c61.9 0 112-50.1 112-112s-50.1-112-112-112H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c88.4 0 160 71.6 160 160zM184 232H392c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                  </svg>
                </div>
              </a>
            </div>
            <span
              className="inline-flex items-center w-fit font-medium gap-1 py-0.5 px-2 text-sm tracking-[-0.1px] rounded-lg"
              style={{
                backgroundColor: `light-dark(${theme.light.bg}, ${theme.dark.bg})`,
                color: `light-dark(${theme.light.text}, ${theme.dark.text})`,
              }}
            >
              {lifecycleText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
