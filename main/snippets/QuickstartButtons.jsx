export const QuickstartButtons = ({ githubLink, downloadLink, lang = "en" }) => {
  const translations = {
    en: {
      viewOnGithub: "View On GitHub",
      loginAndDownload: "Log In & Download Sample",
    },
    es: {
      viewOnGithub: "Ver en GitHub",
      loginAndDownload: "Iniciar sesión y descargar ejemplo",
    },
    ja: {
      viewOnGithub: "GitHubで表示",
      loginAndDownload: "ログインしてサンプルをダウンロード",
    },
  };
  const text = translations[lang] || translations.en;

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
      <a
        href={downloadLink}
        target="_blank"
        rel="noopener noreferrer"
        className="no_external_icon quickstart_button inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-[18px] border border-gray-300 dark:border-[#454545] bg-white dark:bg-[#272728] !text-black dark:!text-white hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
      >
        {text.loginAndDownload}
      </a>
    </div>
  );
};
