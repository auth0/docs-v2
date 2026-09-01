export const ResponseSchema = ({ statusCode, type = "{}", children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-lg mb-3 overflow-hidden">
      <div
        className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer select-none ${
          open ? "bg-gray-50 dark:bg-gray-800" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        {statusCode && (
          <span className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-mono text-xs px-1.5 py-0.5 rounded">
            {statusCode.startsWith("default") ? "default" : statusCode}
          </span>
        )}
        <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
          {type}
        </span>
        <span className="text-gray-400 dark:text-gray-500 text-sm italic">
          application/json
        </span>
        <svg
          className={`ml-auto opacity-50 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {open && (
        <div className="px-4 pt-1 pb-3 border-t border-gray-100 dark:border-gray-800">
          {children}
        </div>
      )}
    </div>
  );
};