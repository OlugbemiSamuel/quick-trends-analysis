// import type { TeamTotalTrendQuery, TrendResult } from "../types/trends.types";

// interface TrendResultCardProps {
//   result: TrendResult;
//   query: TeamTotalTrendQuery;
//   onReset: () => void;
// }

// const TrendResultCard = ({ result, query, onReset }: TrendResultCardProps) => {
//   return (
//     <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//       <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <div className="flex justify-between">
//             <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
//               Trend Analysis Overview
//             </p>

//             <button
//               className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition"
//               onClick={onReset}
//             >
//               New Analyis
//             </button>
//           </div>

//           <h2 className="mt-1 text-2xl font-bold text-slate-900">
//             Team {query.teamId}
//           </h2>

//           <div className="mt-2 flex flex-wrap items-center gap-2 text-md text-slate-500">
//             <span>Season {query.season}</span>
//             <span>·</span>
//             <span>Last {query.limit} games</span>

//             <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
//               Target Line: {query.line}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6">
//         <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 text-center">
//           <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
//             Hit Rate
//           </p>

//           <p className="mt-2 text-5xl font-bold text-slate-900">
//             {result.hitPercentage}%
//           </p>

//           <p className="mt-2 text-sm text-slate-500">
//             {result.hits} of {result.totalGames} games
//           </p>
//         </div>
//       </div>

//       <div className="mt-4 grid gap-4 sm:grid-cols-3">
//         <div className="rounded-xl border border-slate-200 p-5">
//           <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//             Average Score
//           </p>

//           <p className="mt-2 text-2xl font-bold text-slate-900">
//             {result.averageScore}
//           </p>
//         </div>

//         <div className="rounded-xl border border-slate-200 p-5">
//           <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//             Hits
//           </p>

//           <p className="mt-2 text-2xl font-bold text-slate-900">
//             {result.hits}
//           </p>
//         </div>

//         <div className="rounded-xl border border-slate-200 p-5">
//           <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//             Misses
//           </p>

//           <p className="mt-2 text-2xl font-bold text-slate-900">
//             {result.misses}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendResultCard;

import type { TeamTotalTrendQuery, TrendResult } from "../types/trends.types";

interface TrendResultCardProps {
  result: TrendResult;
  query: TeamTotalTrendQuery;
  onReset: () => void;
}

const TrendResultCard = ({ result, query, onReset }: TrendResultCardProps) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
                Trend Analysis
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Team {query.teamId}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span>Season {query.season}</span>

              <span className="text-slate-300">•</span>

              <span>Last {query.limit} games</span>

              <span className="rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-700 ring-1 ring-inset ring-orange-100">
                Line {query.line}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] sm:w-auto"
          >
            New Analysis
          </button>
        </div>
      </div>

      {/* Main Result */}
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 sm:p-8">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Hit Rate
            </p>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  {result.hitPercentage}%
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {result.hits} of {result.totalGames} games exceeded the target
                  line.
                </p>
              </div>

              <div className="w-full sm:w-48">
                <div className="mb-2 flex justify-between text-xs text-slate-400">
                  <span>Performance</span>
                  <span>{result.hitPercentage}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all"
                    style={{
                      width: `${Math.min(result.hitPercentage, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Stats */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Average Score
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {result.averageScore}
            </p>

            <p className="mt-1 text-xs text-slate-500">Average team score</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Hits
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {result.hits}
            </p>

            <p className="mt-1 text-xs text-slate-500">Games above line</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Misses
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {result.misses}
            </p>

            <p className="mt-1 text-xs text-slate-500">Games below line</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendResultCard;
