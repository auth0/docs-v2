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
        className="no_external_icon quickstart_button inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-[4px] border dark:border-[#fff] bg-transparent text-white dark:text-white hover:bg-[#f1f1f1] dark:hover:bg-[#242424] transition-colors"
      >
        {text.viewOnGithub}
      </a>
      <a
        href={downloadLink}
        target="_blank"
        rel="noopener noreferrer"
        className="no_external_icon quickstart_button inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-[4px] bg-[#3F59E4] dark:bg-[#3F59E4] !text-white hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
      >
        {text.loginAndDownload}
      </a>
    </div>
  );
};
