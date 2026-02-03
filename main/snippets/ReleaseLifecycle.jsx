export const ReleaseLifecycle = ({ releaseLifecycle = "GA" }) => {
  const lifecycleMap = {
    ea: "Early Access",
    ga: "Generally Available",
    deprecated: "Deprecated",
    planned: "Planned",
    beta: "Beta",
  };

  const lifecycle = releaseLifecycle.toLowerCase();
  const lifecycleText = lifecycleMap[lifecycle];

  if (!lifecycleText) {
    return null;
  }

  return (
    <div>
      <div className="api-section-heading flex flex-col gap-y-4 w-full">
        <div className="flex items-baseline border-b pb-2.5 border-gray-100 dark:border-gray-800 w-full">
          <h4 className="api-section-heading-title flex-1 mb-0">
            Release Lifecycle
          </h4>
          <div className="flex items-center"></div>
        </div>
      </div>
      <div
        className="flex font-mono text-sm group/param-head param-head break-all relative mt-6"
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
                ​
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
              data-shape="rounded"
              data-stroke="false"
              data-disabled="false"
              className="inline-flex items-center w-fit font-medium relative data-[disabled='true']:cursor-not-allowed data-[shape='pill']:rounded-full data-[stroke='true']:outline data-[stroke='true']:outline-1 data-[stroke='true']:-outline-offset-[1px] data-[stroke='true']:outline-[rgba(11,12,14,0.08)] dark:data-[stroke='true']:outline-[rgba(255,255,255,0.14)] bg-[--color-bg] text-[--color-text] [&_svg]:bg-[--color-text] data-[disabled='true']:bg-[--color-bg-disabled] data-[disabled='true']:text-[--color-text-disabled] [&_svg]:data-[disabled='true']:bg-[--color-text-disabled] gap-1 py-0.5 pl-2 pr-2 [&_svg]:size-3.5 text-sm tracking-[-0.1px] data-[shape='rounded']:rounded-[8px] [--color-bg:#D1FAE4] dark:[--color-bg:#0F4C2C] [--color-text:#166E3F] dark:[--color-text:#6AE1A1] [--color-bg-disabled:#EDFDF4] dark:[--color-bg-disabled:#072213] [--color-text-disabled:rgba(38,189,108,0.50)] dark:[--color-text-disabled:rgba(38,189,108,0.30)]"
            >
              {lifecycleText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
