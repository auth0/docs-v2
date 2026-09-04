import { useState } from "react";

export const DownloadQuickstartButton = ({
  category,
  framework,
  label = "Download Sample",
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
    <div className="download-button-container">
      <button
        onClick={downloadSample}
        disabled={isDownloading}
        className={`download-button ${isDownloading ? 'downloading' : ''}`}
        aria-label={`Download ${category} ${framework} sample code`}
      >
        {isDownloading ? (
          <>
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
            Downloading...
          </>
        ) : (
          <>
            <Icon icon="download" color="white"/>
            {label}
          </>
        )}
      </button>
    </div>
  );
}