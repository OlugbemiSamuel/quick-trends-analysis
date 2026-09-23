import { useEffect, useState } from "react";
import "./App.css";
import type { TeamTotalTrendQuery, TrendResult } from "./types/trends.types";
import { analyzeTeamTotalTrend, getTeams } from "./services/trends.service";
import TrendResultCard from "./components/TrendResultCard";
import { AnalysisForm } from "./components/AnalysisForm";
import type { Team } from "./types/trends.types";

const App = () => {
  const [result, setResult] = useState<TrendResult | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  const [lastQuery, setLastQuery] = useState<TeamTotalTrendQuery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teams = await getTeams();
        setTeams(teams);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    loadTeams();
  }, []);

  const handleAnalysis = async (query: TeamTotalTrendQuery) => {
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
                  <h2 className="sm:text-3xl text-xl font-bold tracking-tight text-slate-900">
                    Analyze historical basketball trends
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Enter a team's analysis parameters and get historical trend
                    results in a few seconds.
                  </p>
                </div>
              </header>

              <div className=" ">
                <AnalysisForm
                  teams={teams}
                  onSubmit={handleAnalysis}
                  loading={loading}
                />
              </div>

              {error && !loading && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                  <p className="font-semibold text-red-700">Analysis failed</p>

                  <p className="mt-1 text-sm text-red-600">{error}</p>
                </div>
              )}
            </>
          )}

          {loading && (
            <div className="mt-8 flex flex-col items-center justify-center py-6 text-center ">
              {/*  Animated Spinner Container */}
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute h-full w-full rounded-full border-4 border-slate-100" />

                {/* Inner fast spinning brand ring */}
                <div className="absolute h-full w-full animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
              </div>

              {/* Typography Section */}
              <div className="mt-4 max-w-xs">
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Analyzing Historical Games
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Fetching historical games and calculating the trend.
                </p>
              </div>
            </div>
          )}

          {!loading && !error && result && lastQuery && (
            <div className="mt-6">
              <TrendResultCard
                onReset={handleReset}
                result={result}
                query={lastQuery}
                teams={teams}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
