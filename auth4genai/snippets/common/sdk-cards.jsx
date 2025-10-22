export const SDKCards = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          className="flex p-4 py-3.5 items-center transition duration-300 gap-3 w-full md:flex-1 self-stretch rounded-xl border border-[#CECDCA] dark:border-[#3F3D3A] bg-white dark:bg-[#18181B] transition hover:border-1 hover:border-[#1F1F1F] hover:dark:border-1 hover:dark:border-[#EEEEEE]"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src={item.logo}
              alt={item.name}
              className="dark:invert"
            />
          </div>
          <span className="text-gray-900 dark:text-white text-md font-regular" style={{ fontFamily: 'Inter', lineHeight: '115%', letterSpacing: '-0.176px' }}>{item.name}</span>
        </a>
      ))}
    </div>
  );
}
