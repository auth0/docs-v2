export const GitHubCards = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group min-h-[170px] flex px-4 pt-4 pb-[14px] transition-border duration-300 flex-col w-full md:flex-1 self-stretch rounded-xl border border-[#CECDCA] dark:border-[#3F3D3A] bg-white dark:bg-[#21201F] transition hover:border-1 hover:border-[#1F1F1F] hover:dark:border-1 hover:dark:border-[#EEEEEE] no-underline cursor-pointer"
        >
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold leading-[115%] tracking-[-0.176px] text-left text-[#232220] dark:text-[#F4F4F4] mb-1 mt-0" style={{ fontFamily: 'Inter' }}>
                {item.title}
              </h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                className="lucide lucide-arrow-up-right w-4 h-4 transition-all duration-300 opacity-30 group-hover:opacity-100">
                <path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>
              </svg>
            </div>
            <p className="text-sm font-medium leading-[130%] text-[#767676] dark:text-[#7B7B7B] mt-0 mb-[17.5px] flex-grow" style={{ fontFamily: 'Inter' }}>
              {item.description}
            </p>
          </div>

          <div className="">
            <div className="w-full h-px bg-[#ECEBE8] dark:bg-[#3F3D3A] mb-[14px]"></div>
            <div className="w-full flex justify-start">
              <div className="flex items-center justify-between w-full gap-2 text-sm font-medium text-[#191919] dark:text-[#F4F4F4]" style={{ fontFamily: 'Inter' }}>
                <div className="flex items-center gap-2 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" className="w-4 h-4 dark:invert dark:brightness-90">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 0C2.90875 0 0 2.98232 0 6.66441C0 9.61341 1.86062 12.1042 4.44437 12.9873C4.76937 13.0456 4.89125 12.8456 4.89125 12.6707C4.89125 12.5124 4.88312 11.9876 4.88312 11.4295C3.25 11.7377 2.8275 11.0213 2.6975 10.6464C2.62437 10.4548 2.3075 9.86333 2.03125 9.70505C1.80375 9.58009 1.47875 9.27186 2.02312 9.26353C2.535 9.2552 2.90062 9.7467 3.0225 9.94663C3.6075 10.9546 4.54188 10.6714 4.91563 10.4964C4.9725 10.0633 5.14312 9.77169 5.33 9.60508C3.88375 9.43847 2.3725 8.86366 2.3725 6.31453C2.3725 5.58977 2.62437 4.98998 3.03875 4.52347C2.97375 4.35686 2.74625 3.67376 3.10375 2.7574C3.10375 2.7574 3.64812 2.58246 4.89125 3.4405C5.41125 3.29055 5.96375 3.21558 6.51625 3.21558C7.06875 3.21558 7.62125 3.29055 8.14125 3.4405C9.38437 2.57413 9.92875 2.7574 9.92875 2.7574C10.2863 3.67376 10.0587 4.35686 9.99375 4.52347C10.4081 4.98998 10.66 5.58144 10.66 6.31453C10.66 8.87199 9.14062 9.43847 7.69438 9.60508C7.93 9.81334 8.13312 10.2132 8.13312 10.838C8.13312 11.7294 8.125 12.4458 8.125 12.6707C8.125 12.8456 8.24687 13.0539 8.57187 12.9873C11.1394 12.1042 13 9.60508 13 6.66441C13 2.98232 10.0912 0 6.5 0Z" fill="#1B1F23"/>
                  </svg>
                  Github
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
