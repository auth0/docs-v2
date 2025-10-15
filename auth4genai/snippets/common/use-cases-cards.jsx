export const UseCaseCards = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          className="group flex px-6 pt-6 pb-3 flex-col items-start rounded-xl border border-[#C5C5C5] dark:border-[#3F3D3A] transition duration-300 hover:border-1 hover:border-[#1F1F1F] hover:dark:border-1 hover:dark:border-[#EEEEEE] hover:cursor-pointer no-underline"
        >
          <div className="w-[35px] h-[35px] aspect-square dark:invert -ml-[9px]">
            {item.icon}
          </div>

          <h3 className="mt-4 text-base font-semibold leading-[115%] tracking-[-0.176px] text-left text-[#232220] dark:text-[#F4F4F4] mb-1" style={{ fontFamily: 'Inter' }}>
            {item.title}
          </h3>

          <p className="mt-2 leading-2 text-sm font-normal text-left text-[#767676] dark:text-[#7B7B7B] mb-[10.5px] flex-grow" style={{ fontFamily: 'Inter' }}>
            {item.description}
          </p>

          <div className="w-full h-px bg-[#ECEBE8] dark:bg-[#3F3D3A] mb-1"></div>

          <div className="w-full flex justify-end">
            <div className="inline h-8 py-1 items-center">
              <span className="inline text-[14px] font-medium leading-[130%] text-center text-[#191919] dark:text-[#EFEDE9]" style={{ fontFamily: 'Inter' }}>Learn more</span>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="inline -ml-2 group-hover:ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 dark:invert dark:brightness-90"
              >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.625 4.99999C0.625 4.59028 0.957136 4.25815 1.36685 4.25815L9.46717 4.25815L6.77706 1.56804C6.48735 1.27833 6.48735 0.808616 6.77706 0.518907C7.06677 0.229197 7.53649 0.229197 7.8262 0.518907L11.7827 4.47543C12.0724 4.76514 12.0724 5.23485 11.7827 5.52456L7.8262 9.48108C7.53649 9.77079 7.06677 9.77079 6.77706 9.48108C6.48736 9.19137 6.48736 8.72166 6.77706 8.43195L9.46717 5.74184L1.36685 5.74184C0.957136 5.74184 0.625 5.40971 0.625 4.99999Z" fill="#191919"/>
              </svg>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
