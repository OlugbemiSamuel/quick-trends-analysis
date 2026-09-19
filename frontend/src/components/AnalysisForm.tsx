import type { TeamTotalTrendQuery } from "../types/trends.types";

interface AnalysisFormProps {
  onSubmit: (query: TeamTotalTrendQuery) => void;
  loading: boolean;
}

export const AnalysisForm = ({ onSubmit, loading }: AnalysisFormProps) => {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const query: TeamTotalTrendQuery = {
      teamId: Number(formData.get("teamId")),
      season: Number(formData.get("season")),
      limit: Number(formData.get("limit")),
      line: Number(formData.get("line")),
    };

    onSubmit(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)] sm:p-7"
    >
      <div className="mb-7">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
            Analysis Parameters
          </p>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-slate-950">
          Configure your analysis
        </h2>

        <p className="mt-1.5 max-w-lg text-sm leading-6 text-slate-500">
          Choose a team, season, sample size, and scoring line to analyze
          historical performance.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="teamId"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Team ID
          </label>

          <input
            id="teamId"
            name="teamId"
            type="number"
            min="1"
            required
            placeholder="14"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="season"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Season
          </label>

          <input
            id="season"
            name="season"
            type="number"
            min="1"
            required
            placeholder="2025"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="limit"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Games to analyze
          </label>

          <input
            id="limit"
            name="limit"
            type="number"
            min="1"
            required
            placeholder="10"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="line"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Target line
          </label>

          <input
            id="line"
            name="line"
            type="number"
            min="0"
            step="0.5"
            required
            placeholder="120"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 w-full rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Run Trend Analysis"}
      </button>
    </form>
  );
};
