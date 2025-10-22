export const AIContainer = ({
  children
}) => {
  return (
    <div>
      <h2 className="mt-0">Getting started using AI</h2>
      <p style={{marginBottom: "16px", display:"block" }}>To get started quickly:</p>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
