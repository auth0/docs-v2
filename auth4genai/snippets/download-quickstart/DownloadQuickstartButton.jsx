import { useState } from "react";

export const DownloadQuickstartButton = ({
  category,
  framework,
  label = "Download",
}) => {

  const [isDownloading, setIsDownloading] = useState(false);

  const githubRepo = 'auth0-samples/auth0-ai-samples';
  const filename = `${category}-${framework}-sample.zip`;

  const downloadSample = () => {
    setIsDownloading(true);

    const downloadUrl = `https://github.com/${githubRepo}/releases/latest/download/${filename}`;

    window.open(downloadUrl, '_blank'); // Open in new tab - ensure user stays on docs page, even if error occurs

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="w-full dark:bg-[#18181B] bg-[#F3F3F3] rounded-2xl py-4 px-6 flex gap-4 justify-between">
      <div>
        <h4 className="p-0 m-0 text-base">Download Sample</h4>
        <div className="flex flex-col gap-0 mt-1">
          <p className="text-sm">Start by downloading and extracting the sample app.</p>
          <p className="text-sm">Then open in your preferred IDE.</p>
        </div>

      </div>
      <div className="flex items-center">
        <button
          onClick={downloadSample}
          disabled={isDownloading}
          className={`flex dark:bg-black bg-[#FBFBFB] items-center gap-4 px-6 py-2 rounded-full transition-all duration-300 border-2 border-[#FBFBFB] dark:border-black hover:border-primary dark:hover:border-primary-light dark:text-white text-sm download-button ${isDownloading ? 'downloading' : ''}`}
          aria-label={`Download ${category} ${framework} sample code`}
        >
          {isDownloading ? (
            <>
              Downloading
              <svg
                className="download-spinner"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="31.416"
                  strokeDashoffset="31.416"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    dur="2s"
                    values="0 31.416;15.708 15.708;0 31.416"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dashoffset"
                    dur="2s"
                    values="0;-15.708;-31.416"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </>
          ) : (
            <>
              {label}
              <Icon icon="download"/>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
