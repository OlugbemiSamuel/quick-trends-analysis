import type {
  Team,
  TeamTotalTrendQuery,
  TrendResult,
} from "../types/trends.types";

interface TrendResultCardProps {
  result: TrendResult;
  query: TeamTotalTrendQuery;
  onReset: () => void;
  teams: Team[];
}

const TrendResultCard = ({
  result,
  query,
  onReset,
  teams,
}: TrendResultCardProps) => {
  const selectedTeam = teams.find((team) => team.id === query.teamId);
  // Return the visual representation of the analysis result.
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.3)]">
      <div className="border-b border-slate-100 px-5 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600 sm:text-[11px]">
              <span>⌁</span>
              Trend Analysis Overview
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Team {selectedTeam?.name}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">
              <span>Season: {query.season}</span>
              <span className="text-slate-300">•</span>
              <span>Last {query.limit} games</span>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-semibold text-orange-700 ring-1 ring-inset ring-orange-100 sm:text-xs">
                Target Line: {query.line} Pts
              </span>
            </div>
          </div>

          {/* Reset Button to start another analysis. */}
          <button
            type="button"
            onClick={onReset}
            className="self-start rounded-xl border border-white-600 bg-orange-600 px-4 py-2 text-xs sm:text-md font-semibold text-white - transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            + New Analysis
          </button>
        </div>
      </div>

      {/* Main result area. */}
      <div className="p-5 sm:p-8">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-2 ">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

              <p className="text-[10px] font-bold uppercase tracking-[0.15em]  text-orange-400">
                Hit Rate
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  {result.hitPercentage}%
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm">
                  {result.hits} of {result.totalGames} games exceeded the target
                  line.
                </p>
              </div>

              {/* Performance progress section. */}
              <div className="w-full sm:max-w-xs">
                <div className="mb-2 flex items-center justify-between text-[10px] font-medium">
                  <span className="text-slate-400">Performance Pace</span>
                  <span className="font-bold text-orange-500">
                    {result.hitPercentage}%
                  </span>
                </div>

                {/* Empty progress track. */}
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    style={{
                      width: `${Math.min(result.hitPercentage, 100)}%`,
                    }}
                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting statistics. */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            {/* Statistic category. */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Average Score
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {result.averageScore}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              Average team score
            </p>
          </div>

          {/* Hits card. */}
          <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
              Hits
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-orange-600">
              {result.hits}
            </p>

            <p className="mt-1 text-[11px] text-orange-700/70">
              Games above line
            </p>
          </div>

          {/* Misses card. */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Misses
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {result.misses}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">Games below line</p>
          </div>
        </div>

        {/* Small explanatory footer. */}
        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
            Historical statistics based on the selected games and target line.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrendResultCard;
