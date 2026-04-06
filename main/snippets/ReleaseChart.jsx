export const NodeReleaseTimeline = ({ startYear = '2022', endYear = '2030', releases = [] }) => {
  const localStartYear = Number(startYear);
  const localEndYear = Number(endYear);
  const totalMonths = (localEndYear - localStartYear + 1) * 12;

  const getPosition = (dateStr) => {
    const [y, m] = dateStr.split('-').map(Number);
    const monthsSinceStart = (y - localStartYear) * 12 + (m - 1);
    return (monthsSinceStart / totalMonths) * 100;
  };

  const years = Array.from({ length: localEndYear - localStartYear + 1 }, (_, i) => localStartYear + i);

  return (
    <div class="rounded-lg border border-border bg-card p-6">
      <div class="space-y-6">

        <div class="flex items-center gap-4 text-xs text-muted-foreground">
          <div class="w-12 shrink-0"></div>
          <div class="flex flex-1 justify-between">
            <div className="flex-1 flex justify-between relative px-2">
              {years.map((year) => (
                <div key={year} className="w-12 shrink-0 font-mono text-sm font-medium text-foreground">
                  {year}
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Release Rows */}
        <div className="space-y-4 relative z-10">
          {releases.map((rel) => {
            const communityCurrent = getPosition(rel.communityCurrent);
            const communityActive = rel.communityActive ? getPosition(rel.communityActive) : null;
            const communityMaintenance = getPosition(rel.communityMaintenance);
            const communityEOL = getPosition(rel.communityEOL);
            const auth0Support = getPosition(rel.auth0Support);
            const auth0ExtendedSupport = getPosition(rel.auth0ExtendedSupport);
            const auth0EOL = getPosition(rel.auth0EOL);

            return (
              <div key={rel.version} className="flex items-center group">
                <div className="w-12 shrink-0 font-mono text-sm font-medium text-foreground">
                  {rel.version}
                </div>
                <div className="flex-1 relative overflow-hidden rounded-md">
                  <div className="flex-1 h-2 relative  bg-black-600">
                    {/* Current / Initial Phase */}
                    <div
                      style={{ left: `${communityCurrent}%`, width: `${(communityActive || communityMaintenance) - communityCurrent}%` }}
                      className="absolute h-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold px-1 whitespace-nowrap"
                    >
                      {/* Current */}
                    </div>
                    {/* Community Active Phase */}
                    {communityActive && (
                      <div
                        style={{ left: `${communityActive}%`, width: `${communityMaintenance - communityActive}%` }}
                        className="absolute h-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold px-1 whitespace-nowrap"
                      >
                        {/* Active */}
                      </div>
                    )}
                    {/* Community Maintenance Phase */}
                    {communityMaintenance && (
                      <div
                        style={{ left: `${communityMaintenance}%`, width: `${communityEOL - communityMaintenance}%` }}
                        className="absolute h-full bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold px-1 whitespace-nowrap"
                      >
                        {/* Maintenance */}
                      </div>
                    )}
                    {/* Community EOL Phase */}
                    <div
                      style={{ left: `${communityEOL}%`, width: `10px` }}
                      className="absolute h-full bg-red-400 flex items-center justify-center text-[10px] text-white font-bold px-1 whitespace-nowrap"
                    >
                      {/* EOL */}
                    </div>
                  </div>
                  <div className="flex-1 h-6 relative bg-black-600">
                    {/* Auth0 Support Phase */}
                    {auth0Support && (
                      <div
                        style={{ left: `${auth0Support}%`, width: `${communityEOL - auth0Support}%` }}
                        className="absolute h-full bg-purple-500 flex items-center justify-center text-[10px] text-white font-bold px-1 whitespace-nowrap"
                      >
                        {/* Support */}
                      </div>
                    )}
                    {/* Auth0 Extended Support Phase */}
                    {auth0ExtendedSupport && (
                      <div
                        style={{ left: `${auth0ExtendedSupport}%`, width: `${auth0EOL - auth0ExtendedSupport}%` }}
                        className="absolute h-full bg-purple-700 flex items-center justify-center text-[10px] text-white font-bold px-1 whitespace-nowrap"
                      >
                        {/* Extended */}
                      </div>
                    )}
                    {/* Auth0 EOL Phase */}
                    {auth0ExtendedSupport && (
                      <div
                        style={{ left: `${auth0EOL}%`, width: `10px` }}
                        className="absolute h-full bg-red-400 flex items-center justify-center text-[10px] text-white font-bold px-1 whitespace-nowrap"
                      >
                        {/* EOL */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div class="flex flex-row gap-4">
          <div className="flex-row group gap-2">
            <div className="w-40 shrink-0 font-mono text-sm font-medium text-foreground">
              Node.js Community
            </div>
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 rounded-sm bg-emerald-500"></div>
              <span class="text-sm text-muted-foreground">Current</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 rounded-sm bg-blue-500"></div>
              <span class="text-sm text-muted-foreground">Active</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 rounded-sm bg-amber-500"></div>
              <span class="text-sm text-muted-foreground">Maintenance</span>
            </div>
          </div>
          <div className="flex-row group gap-2">
            <div className="w-40 shrink-0 font-mono text-sm font-medium text-foreground">
              Auth0
            </div>
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 rounded-sm bg-purple-500"></div>
              <span class="text-sm text-muted-foreground">Support</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 rounded-sm bg-purple-700"></div>
              <span class="text-sm text-muted-foreground">Extended Support</span>
            </div>
          </div>
          <div className="flex-row group gap-2">
            <div className="w-40 shrink-0 font-mono text-sm font-medium text-foreground">
              General
            </div>
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 rounded-sm bg-red-400"></div>
              <span class="text-sm text-muted-foreground">End-of-life (EOL)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
