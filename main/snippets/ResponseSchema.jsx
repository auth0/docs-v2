export const ResponseSchema = ({ statusCode, children }) => {
  const [open, setOpen] = useState(false);

  const isSuccess =
    statusCode &&
    (statusCode.startsWith("2") || statusCode === "default success");
  const isError =
    statusCode &&
    (statusCode.startsWith("4") ||
      statusCode.startsWith("5") ||
      statusCode === "default error");

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: "monospace",
    backgroundColor: isSuccess
      ? "light-dark(#dcfce7, #14532d)"
      : isError
        ? "light-dark(#fee2e2, #450a0a)"
        : "light-dark(#f3f4f6, #1f2937)",
    color: isSuccess
      ? "light-dark(#166534, #86efac)"
      : isError
        ? "light-dark(#991b1b, #fca5a5)"
        : "light-dark(#374151, #d1d5db)",
  };

  const containerStyle = {
    border: "1px solid light-dark(#e5e7eb, #374151)",
    borderRadius: "8px",
    marginBottom: "12px",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: open
      ? "light-dark(#f9fafb, #1f2937)"
      : "transparent",
  };

  const chevronStyle = {
    marginLeft: "auto",
    transition: "transform 0.2s",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    opacity: 0.5,
  };

  const bodyStyle = {
    padding: "4px 16px 12px",
    borderTop: "1px solid light-dark(#e5e7eb, #374151)",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle} onClick={() => setOpen(!open)}>
        {statusCode && <span style={badgeStyle}>{statusCode}</span>}
        <span style={{ fontSize: "13px", color: "light-dark(#6b7280, #9ca3af)" }}>
          {open ? "Hide fields" : "Show fields"}
        </span>
        <svg
          style={chevronStyle}
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
      {open && <div style={bodyStyle}>{children}</div>}
    </div>
  );
};
