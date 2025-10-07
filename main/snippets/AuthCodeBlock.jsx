export const AuthCodeBlock = ({ filename, icon = "file-code", language, lines, highlight, children }) => {
  let header = "";

  if (language) {
    header += language;
  }

  if (filename) {
    header += ` ${filename}`;
  }

  if (lines === "true" || lines === true) {
    header += " lines";
  }

  return (
    <pre>
      <code className={language ? `language-${language}` : ""}>{children}</code>
    </pre>
  );
};
