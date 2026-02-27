export const ComponentLoader = (props) => {
  return (
    <div
      style={{
        minHeight: "400px",
        minWidth: "650px",
        marginTop: "40px",
        background: "rgb(var(--gray-950)/.03)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundSize: "16px 16px",
        borderRadius: "10px",
        boxShadow: "0 1px 4px 0 rgba(16,30,54,0.04)",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          minWidth: "640px",
          margin: "12px 12px 0",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px 0 rgba(16,30,54,0.04)",
          padding: "24px",
          display: "flex",
          gap: "24px",
          minHeight: "400px",
          position: "relative",
          justifyContent: "center",
          overflowY: "scroll",
          maxHeight: "450px",
        }}
        data-uc-component={props.componentSelector}
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
          color: "#6B7280",
          fontSize: "12px",
          marginTop: "8px",
          marginBottom: "8px",
          letterSpacing: "0.01em",
          fontWeight: 400,
        }}
      >
        {`Preview of the ${props.componentName} component`}
      </div>
    </div>
  );
};
