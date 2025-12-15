export const QuickstartButtons = ({ githubLink, lang = "en" }) => {
  const translations = {
    en: {
      viewOnGithub: "View On GitHub",
      loginAndDownload: "Download Sample",
    },
    "fr-ca": {
      viewOnGithub: "Afficher sur GitHub",
      loginAndDownload: "Télécharger un exemple",
    },
    ja: {
      viewOnGithub: "Githubで表示",
      loginAndDownload: "サンプルをダウンロード",
    },
  };
  const text = translations[lang] || translations.en;

  // Parse GitHub URL to extract repo, branch, and path
  const parseGithubUrl = (url) => {
    try {
      // Expected format: https://github.com/{owner}/{repo}/tree/{branch}/{path}
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/").filter(Boolean);

      if (pathParts.length >= 4 && pathParts[2] === "tree") {
        const repoName = pathParts[1];
        const branch = pathParts[3];
        const path = pathParts.slice(4).join("/") || undefined;

        return {
          repo: repoName,
          branch,
          path,
        };
      }

      // Fallback if format doesn't match
      console.warn("Could not parse GitHub URL:", url);
      return null;
    } catch (error) {
      console.error("Error parsing GitHub URL:", error);
      return null;
    }
  };

  const handleDownload = async () => {
    const params = parseGithubUrl(githubLink);

    if (!params) {
      console.error("Invalid GitHub URL format");
      return;
    }

    try {
      await window.Auth0DocsUI?.getSample(params);
    } catch (error) {
      console.error("Failed to download sample:", error);
    }
  };

  return (
    <div className="quickstart_buttons flex flex-wrap gap-3 mb-4">
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="no_external_icon quickstart_button inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-[18px] bg-black dark:bg-white !text-white dark:!text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
      >
        {text.viewOnGithub}
      </a>
      <button
        onClick={handleDownload}
        type="button"
        className="no_external_icon quickstart_button inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-[18px] border border-gray-300 dark:border-[#454545] bg-white dark:bg-[#272728] !text-black dark:!text-white hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
      >
        {text.loginAndDownload}
      </button>
    </div>
  );
};
