import { useState } from "react";

import "./App.css";
import type { TeamTotalTrendQuery, TrendResult } from "./types/trends.types";
import { analyzeTeamTotalTrend } from "./services/trends.service";
import TrendResultCard from "./components/TrendResultCard";
import { AnalysisForm } from "./components/AnalysisForm";
// import { AnalysisForm } from "./components/AnalysisForm";

const App = () => {
  const [result, setResult] = useState<TrendResult | null>(null);
  const [lastQuery, setLastQuery] = useState<TeamTotalTrendQuery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (query: TeamTotalTrendQuery) => {
    console.log("HANDLE ANALYSIS RECEIVED:", query);
    setLoading(true);
    setError(null);

    try {
      const trendResult = await analyzeTeamTotalTrend(query);

      setResult(trendResult);
      setLastQuery(query);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("something went wrong try again");
      }
      setResult(null);
      setLastQuery(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setLastQuery(null);
  };

  return (
    <>
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
          {!loading && !result && (
            <>
              <header className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
                    🏀
                  </div>

                  <div>
                    <h1 className="text-xs font-bold tracking-tight text-slate-900">
                      QUICK TRENDS
                    </h1>

                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Historical Analytics
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Analyze historical basketball trends
                  </h2>

                  <p className="mt-2 max-w-2xl text-slate-500">
                    Enter a team's analysis parameters and get historical trend
                    results in a few seconds.
                  </p>
                </div>
              </header>

              <div className=" ">
                <AnalysisForm onSubmit={handleAnalysis} loading={loading} />

                {!loading && !error && !result && (
                  <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <p className="font-semibold text-slate-800">
                      No analysis yet
                    </p>

                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                      Choose a team and your analysis parameters to see
                      historical trend results here.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {loading && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="font-medium text-slate-700">
                Analyzing historical games...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Fetching data and calculating the trend.
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
              <p className="font-semibold text-red-700">Analysis failed</p>

              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && result && lastQuery && (
            <div className="mt-6">
              <TrendResultCard
                onReset={handleReset}
                result={result}
                query={lastQuery}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
