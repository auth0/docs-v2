export const DownloadManual = ({
  folderPath,
  repository
}) => {
  return (
    <div>
      Clone <Icon icon="github" iconType="solid" /> <a href={`https://github.com/${repository}.git`} target="_blank" rel="noreferrer" className="link">{repository}</a> and navigate to <code>{folderPath}</code> directory.
    </div>
  );
}
