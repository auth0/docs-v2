export const ComponentLoader = (props) => {
  const themePref = window?.localStorage?.getItem?.("isDarkMode");
  const theme =
    themePref === "dark" || themePref === "light"
      ? themePref
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  const lang = {
    i18n: {
      currentLanguage: props.lang || "en-US",
    },
  };
  return (
    <div
      style={{
        minHeight: "400px",
        marginTop: "40px",
        background:
          theme === "light"
            ? "rgb(var(--gray-950)/.03)"
            : "rgb(255 255 255/.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundSize: "16px 16px",
        borderRadius: "10px",
        boxShadow: "0 1px 4px 0 rgba(16,30,54,0.04)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          minWidth: "320px",
          width: "96.5%",
          maxWidth: "1200px",
          margin: "12px 12px 0",
          background: theme === "light" ? "#ffffff" : "#101011",
          borderRadius: "10px",
          boxShadow: "0 2px 8px 0 rgba(16,30,54,0.04)",
          padding: "24px",
          minHeight: "400px",
        }}
        data-uc-component={props.componentSelector}
        data-uc-props={JSON.stringify(lang)}
      >
        <Spinner
          size={40}
          color="#8A94A6"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: theme === "light" ? "#6B7280" : "ffffff",
          fontSize: "12px",
          marginTop: "8px",
          marginBottom: "8px",
          letterSpacing: "0.01em",
          fontWeight: 400,
        }}
      >
        {props.componentPreviewText}
      </div>
    </div>
  );
};
