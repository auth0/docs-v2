const Spinner = ({ size = 40, color = "#8A94A6", style = {} }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
    aria-label="Loading"
    role="status"
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      style={{ display: "block" }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray="90 150"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

export default Spinner;
