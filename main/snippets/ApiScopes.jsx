export const Scopes = ({ scopes = [] }) => {
  return (
    <div>
      <div class="api-section-heading flex flex-col gap-y-4 w-full">
        <div class="flex items-baseline border-b pb-2.5 border-gray-100 dark:border-gray-800 w-full">
          <h4 class="api-section-heading-title flex-1 mb-0">Scopes</h4>
          <div class="flex items-center"></div>
        </div>
      </div>
      <div class="mt-4">
        <div class="space-y-4 whitespace-normal prose prose-sm prose-gray dark:prose-invert overflow-wrap-anywhere [&amp;_*]:overflow-wrap-anywhere">
          <p class="whitespace-pre-line">
            {
              "Scopes define permissions and access levels for API requests and authentication tokens."
            }
          </p>
        </div>
      </div>
      <div
        class="flex font-mono text-sm group/param-head param-head break-all relative mt-6"
        id="scopes-scopes"
      >
        <div class="flex-1 flex flex-col content-start py-0.5 mr-5">
          <div class="flex items-center flex-wrap gap-2">
            <div class="absolute -top-1.5">
              <a
                href="#scopes-scopes"
                class="-ml-10 flex items-center opacity-0 border-0 group-hover/param-head:opacity-100 focus:opacity-100 focus:outline-0 py-2 [.expandable-content_&amp;]:-ml-[2.1rem] group/link"
                aria-label="Navigate to header"
              >
                ​
                <div class="w-6 h-6 rounded-md flex items-center justify-center shadow-sm text-gray-400 dark:text-white/50 dark:bg-background-dark dark:brightness-[1.35] dark:ring-1 dark:hover:brightness-150 bg-white ring-1 ring-gray-400/30 dark:ring-gray-700/25 hover:ring-gray-400/60 dark:hover:ring-white/20 group-focus/link:border-2 group-focus/link:border-primary dark:group-focus/link:border-primary-light">
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
            {scopes.map((scope, index) => {
              return (
                <div
                  class="flex items-center px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200 font-medium break-all"
                  data-component-part="field-info-pill"
                  key={index}
                >
                  <span>{scope}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
