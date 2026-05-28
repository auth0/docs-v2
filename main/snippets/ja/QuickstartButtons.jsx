export const QuickstartButtons = ({ githubLink }) => {
  const text = {
    viewOnGithub: "GitHubで見る",
    loginAndDownload: "サンプルをダウンロード",
  };

  // GitHub URL を解析してリポジトリ、ブランチ、パスを抽出
  const parseGithubUrl = (url) => {
    try {
      // 想定される形式: https://github.com/{owner}/{repo}/tree/{branch}/{path}
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

      // 形式が一致しない場合のフォールバック
      console.warn("GitHub URLを解析できませんでした:", url);
      return null;
    } catch (error) {
      console.error("GitHub URLの解析中にエラーが発生しました:", error);
      return null;
    }
  };

  const handleDownload = async () => {
    const params = parseGithubUrl(githubLink);

    if (!params) {
      console.error("GitHub URLの形式が無効です");
      return;
    }

    try {
      await window.Auth0DocsUI?.getSample(params);
    } catch (error) {
      console.error("サンプルのダウンロードに失敗しました:", error);
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