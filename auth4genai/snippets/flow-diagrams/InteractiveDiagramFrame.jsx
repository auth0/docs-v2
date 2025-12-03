// Interactive diagram frame with Manhattan styling
import { useState, useEffect } from "react";

export const InteractiveDiagramFrame = ({ flowId, flowData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode - only check class, not system preference (Mintlify overrides it)
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkDarkMode();

    // Watch for theme changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setCurrentStep(0);
      } else if (e.key === "ArrowLeft" && currentStep > 0) {
        e.preventDefault();
        setCurrentStep(currentStep - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentStep === flowData.steps.length - 1) {
          // On last step, close modal
          setIsOpen(false);
          setCurrentStep(0);
        } else {
          // Otherwise advance to next step
          setCurrentStep(currentStep + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, flowData.steps.length]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Preload first step image on mount
  useEffect(() => {
    if (!flowData?.steps?.[0]) return;

    const img = new Image();
    img.src = `/img/diagrams/${flowData.steps[0].image}_${
      isDark ? "dark" : "light"
    }.svg`;
  }, [isDark, flowData?.steps]);

  // Preload all step images when modal opens (only current theme)
  useEffect(() => {
    if (!isOpen || !flowData?.steps) return;

    flowData.steps.forEach((step) => {
      const img = new Image();
      img.src = `/img/diagrams/${step.image}_${isDark ? "dark" : "light"}.svg`;
    });
  }, [isOpen, isDark, flowData?.steps]);

  // Inline markdown renderer - convert markdown text to HTML
  const renderMarkdown = (text) => {
    if (!text) return null;

    // Split by paragraphs (double newlines)
    const paragraphs = text.split("\n\n");

    return paragraphs.map((paragraph, pIdx) => {
      // Check if it's a bullet list
      if (paragraph.trim().startsWith("- ")) {
        const items = paragraph
          .split("\n")
          .filter((line) => line.trim().startsWith("- "));
        return (
          <ul
            key={pIdx}
            className="space-y-2 list-none"
            style={{ marginTop: "8px", marginBottom: "8px", marginLeft: "8px" }}
          >
            {items.map((item, iIdx) => {
              // Remove the leading "- " and render with bold support
              const content = item.replace(/^- /, "");
              return (
                <li
                  key={iIdx}
                  dangerouslySetInnerHTML={{
                    __html: content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br/>"),
                  }}
                />
              );
            })}
          </ul>
        );
      }

      // Regular paragraph with bold support
      return (
        <p
          key={pIdx}
          dangerouslySetInnerHTML={{
            __html: paragraph
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br/>"),
          }}
        />
      );
    });
  };

  // Just testing if we receive the data
  if (!flowData) {
    return (
      <div className="p-4 border border-red-500 rounded bg-red-50 dark:bg-red-900">
        <p className="text-red-700 dark:text-red-200">
          ❌ No flowData received for flowId: {flowId}
        </p>
      </div>
    );
  }

  // Check if mobile
  const isMobile = () => {
    return window.innerWidth < 768;
  };

  return (
    <div>
      {/* Static image - on mobile use regular img (with Mintlify zoom), on desktop use overlay to intercept clicks */}
      {isMobile() ? (
        <>
          <img
            src={
              isDark ? flowData.staticImage?.dark : flowData.staticImage?.light
            }
            alt={`${flowData.name} diagram`}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
          {/* Steps list on mobile - using same flowData */}
          <div style={{ marginTop: "24px" }}>
            {flowData.steps.map((step, index) => (
              <div
                key={step.id}
                style={{
                  marginBottom: "24px",
                  paddingLeft: "40px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "2px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: isDark ? "#2D2D2D" : "#E8E8E8",
                    color: isDark ? "#FFFFFF" : "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    marginTop: 0,
                    marginBottom: "8px",
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {step.title}
                </h3>
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: isDark ? "#B8B3AD" : "#5D564F",
                  }}
                >
                  {renderMarkdown(step.description)}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "block",
            }}
          >
            <img
              src={
                isDark ? flowData.staticImage?.dark : flowData.staticImage?.light
              }
              alt={`${flowData.name} diagram`}
              className="not-prose"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                margin: 0,
              }}
            />
            {/* Transparent overlay to capture clicks before Mintlify */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(true);
                }
              }}
              className="cursor-pointer hover:opacity-90 transition-opacity"
              role="button"
              tabIndex={0}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 10,
              }}
              aria-label={`Click to explore ${flowData.name} interactive diagram`}
            />
          </div>

          {/* Description and CTA button */}
          <div
            style={{
              display: "flex",
              flex: "1 0 0",
              alignItems: "center",
              gap: "16px",
              marginTop: "16px",
              marginBottom: 0,
            }}
          >
            <p
              style={{
                color: isDark ? "#B8B3AD" : "#5D564F",
                fontFamily: "Inter",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.176px",
                flex: "1 0 0",
                margin: 0,
              }}
            >
              Open an interactive image that guides you through each step of the process, showing details and explanations as you go.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(true);
              }}
              style={{
                display: "flex",
                padding: "8px 14px",
                alignItems: "center",
                borderRadius: "16px",
                border: isDark ? "1px solid #3D3A37" : "1px solid #CECDCA",
                background: isDark ? "#1E1E1E" : "#FFF",
                color: isDark ? "#FFFFFF" : "#000000",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Explore the Diagram
            </button>
          </div>
        </>
      )}

      {/* Modal with Manhattan styling */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setIsOpen(false);
            setCurrentStep(0);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal container */}
          <div
            className="relative w-full max-w-[95vw] h-[95vh] flex flex-col"
            style={{
              backgroundColor: isDark ? "#191919" : "#E8E8E8",
              borderRadius: "32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between px-6"
              style={{
                height: "56px",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "145%",
                  letterSpacing: "-0.084px",
                  color: isDark ? "#FFFFFF" : "#000000",
                  margin: 0,
                }}
              >
                {flowData.name}
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setCurrentStep(0);
                }}
                className="flex items-center justify-center p-1 hover:opacity-70 transition-opacity"
                aria-label="Close modal"
                style={{
                  fontSize: "20px",
                  color: isDark ? "rgba(204, 210, 220, 0.80)" : "#1a1a1a",
                }}
              >
                ✕
              </button>
            </div>

            {/* Main content with grid background */}
            <div
              className="flex-1 flex overflow-hidden"
              style={{
                backgroundColor: isDark ? "#191919" : "#fbfbfb",
                backgroundImage: `url(/img/diagrams/bg-grid-${
                  isDark ? "dark" : "light"
                }.svg)`,
                backgroundSize: "16px 16px",
                backgroundRepeat: "repeat",
                borderRadius: "16px",
                boxShadow:
                  "0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 4px -2px rgba(0, 0, 0, 0.04), 0 3px 3px -1.5px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Left side - Diagram (66.66%) */}
              <div
                style={{
                  flex: "0 0 66.666%",
                  height: "100%",
                  backgroundImage: `url(/img/diagrams/${
                    flowData.steps[currentStep]?.image
                  }_${isDark ? "dark" : "light"}.svg)`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                role="img"
                aria-label={flowData.steps[currentStep]?.title}
              />

              {/* Right side - Sidebar (33.33%) */}
              <div style={{ flex: "0 0 33.333%", padding: "2rem" }}>
                <div
                  className="relative h-full"
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                >
                  {/* Semi-transparent card background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: isDark ? "#2A2A2A" : "#FFFFFF",
                      opacity: 0.6,
                      border: `1px solid ${isDark ? "#555" : "#E0E0E0"}`,
                      borderRadius: "12px",
                      boxShadow:
                        "0 0 0 1px rgba(0, 0, 0, 0.24), 0 6px 6px -3px rgba(0, 0, 0, 0.04), 0 4px 4px -2px rgba(0, 0, 0, 0.04), 0 2px 2px -1px rgba(0, 0, 0, 0.04), 0 2px 2px -1px rgba(0, 0, 0, 0.04), 0 1px 1px -0.5px rgba(0, 0, 0, 0.04), -0.5px -0.5px 2px 0 rgba(0, 0, 0, 0.12) inset",
                    }}
                  />

                  {/* Content */}
                  <div className="relative h-full overflow-y-auto">
                    <div className="p-6">
                      {/* Top section: Breadcrumbs and navigation */}
                      <div className="flex items-center justify-between mb-6">
                        {/* Breadcrumbs */}
                        <div className="flex items-center">
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "115%",
                              color: "#808080",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "120px",
                            }}
                          >
                            {flowData.name}
                          </span>
                          <img
                            src="/img/chevron-right.svg"
                            alt=""
                            style={{
                              margin: "0 8px",
                              width: "16px",
                              height: "16px",
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontSize: "14px",
                              fontWeight: 600,
                              lineHeight: "115%",
                              color: isDark ? "#E5E5E5" : "#000000",
                            }}
                          >
                            STEP {String(currentStep + 1).padStart(2, "0")} /{" "}
                            {String(flowData.steps.length).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            disabled={currentStep === 0}
                            className="flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
                            style={{
                              padding: "4px 16px",
                              gap: "8px",
                              borderRadius: "8px",
                              border: `1px solid ${
                                isDark ? "#CCBCFA" : "#7146E9"
                              }`,
                              background: "transparent",
                              fontFamily:
                                "Inter, system-ui, -apple-system, sans-serif",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                              color: isDark ? "#CCBCFA" : "#7146E9",
                            }}
                            aria-label="Previous step"
                          >
                            ←
                          </button>

                          <button
                            onClick={() => {
                              if (currentStep === flowData.steps.length - 1) {
                                setIsOpen(false);
                                setCurrentStep(0);
                              } else {
                                setCurrentStep(currentStep + 1);
                              }
                            }}
                            className="flex items-center justify-center hover:opacity-90 transition-opacity"
                            style={{
                              padding: "4px 16px",
                              gap: "8px",
                              borderRadius: "8px",
                              background: isDark ? "#B59DF8" : "#9979F5",
                              fontFamily:
                                "Inter, system-ui, -apple-system, sans-serif",
                              fontSize:
                                currentStep === flowData.steps.length - 1
                                  ? "14px"
                                  : "16px",
                              fontWeight:
                                currentStep === flowData.steps.length - 1
                                  ? 500
                                  : 400,
                              lineHeight: "24px",
                              color: "#171717",
                            }}
                            aria-label={
                              currentStep === flowData.steps.length - 1
                                ? "Keep reading"
                                : "Next step"
                            }
                          >
                            {currentStep === flowData.steps.length - 1
                              ? "Keep reading →"
                              : "→"}
                          </button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div
                        className="-mx-6 mb-6"
                        style={{
                          borderTop: `1px solid ${isDark ? "#555" : "#E0E0E0"}`,
                        }}
                      />

                      {/* Step content */}
                      <div>
                        <p
                          className="uppercase mb-2"
                          style={{
                            fontFamily: '"Aeonik"',
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "24px",
                            letterSpacing: "1.5px",
                            color: isDark ? "#C5C5C5" : "#000000",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                          }}
                        >
                          HOW IT WORKS
                        </p>
                        <h3
                          className="mb-3"
                          style={{
                            marginTop: 0,
                            fontFamily: "Inter",
                            fontSize: "24px",
                            fontWeight: 500,
                            lineHeight: "32px",
                            letterSpacing: "-0.2px",
                            color: isDark ? "#E0E0E0" : "#4A4A4A",
                          }}
                        >
                          {flowData.steps[currentStep]?.title}
                        </h3>
                        <div
                          className="space-y-4"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            letterSpacing: "-0.01px",
                            color: isDark ? "#E5E5E5" : "#4A4A4A",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                          }}
                        >
                          {renderMarkdown(
                            flowData.steps[currentStep]?.description
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
