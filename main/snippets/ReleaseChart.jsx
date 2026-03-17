export const ReleaseChart = ({ releases }) => {
  console.log('OK', releases);
  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-50 dark:bg-codeblock rounded-xl border border-gray-200">
      {releases.map((release) => (
        <div key={release.version} className="relative h-12 w-full bg-gray-200 rounded-full overflow-hidden">
           {/* Map your date definitions to widths/offsets here */}
           <div 
             className="absolute h-full bg-green-500" 
             style={{ left: `${release.left}%`, width: `${release.width}%` }} 
           />
           <span className="absolute left-4 top-3 font-bold text-sm">v{release.version}</span>
        </div>
      ))}
    </div>
  );
};