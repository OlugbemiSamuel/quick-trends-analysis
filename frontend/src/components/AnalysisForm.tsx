import type { Team, TeamTotalTrendQuery } from "../types/trends.types";

interface AnalysisFormProps {
  onSubmit: (query: TeamTotalTrendQuery) => void;
  teams: Team[];

  loading: boolean;
}

const SEASON_OPTIONS = [
  // The user sees "2023-24", but the backend receives 2024.
  { label: "2023-24", value: 2023 },
  { label: "2024-25", value: 2024 },
  { label: "2025-26", value: 2025 },
];

const SAMPLE_SIZES = [5, 10, 15, 20];

const DEFAULT_SEASON = 2025;
const DEFAULT_LIMIT = 10;
const DEFAULT_LINE = 110;

import { useEffect, useRef, useState } from "react";

export const AnalysisForm = ({
  onSubmit,
  loading,
  teams,
}: AnalysisFormProps) => {
  const [season, setSeason] = useState(DEFAULT_SEASON);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [teamSearch, setTeamSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showTeamOptions, setShowTeamOptions] = useState(false);

  const [line, setLine] = useState(DEFAULT_LINE);
  const [isFocused, setIsFocused] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShowTeamOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      team.shortName.toLowerCase().includes(teamSearch.toLowerCase()),
  );

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedTeam) return;
    //  objectshape expected by the service layer.
    const query: TeamTotalTrendQuery = {
      teamId: selectedTeam.id,
      season,
      limit,
      line,
    };

    onSubmit(query);
  };

  const handleReset = () => {
    setSelectedTeam(null);
    setShowTeamOptions(false);
    setTeamSearch("");
    setSeason(DEFAULT_SEASON);
    setLimit(DEFAULT_LIMIT);
    setLine(DEFAULT_LINE);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleLineInputClick = () => {
    inputRef.current?.focus();
  };

  const increaseLine = () => {
    setLine((prevLine) => prevLine + 0.5);
  };

  const decreaseLine = () => {
    setLine((prevLine) => Math.max(0, prevLine - 0.5));
  };

  const disable = loading || !selectedTeam;

  return (
    <form
      autoComplete="on"
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] sm:p-7"
    >
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-100">
              <span className="text-sm">☷</span>
            </div>
            <div>
              {/* Main section heading. */}
              <h2 className="text-sm font-bold text-slate-950 sm:text-base">
                Configure Trend Analysis
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                Choose your team, season, sample window, and target points.
              </p>
            </div>
          </div>

          {/* Reset to button restore the form to its default states. */}
          <button
            type="button"
            onClick={handleReset}
            className="self-end text-xs font-medium mt-2 text-orange-600 transition hover:text-orange-600"
          >
            ↻ Reset Analysis
          </button>
        </div>
      </div>

      {/* Main form controls. */}
      <div className="mt-6 space-y-6">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <label
              htmlFor="teamName"
              className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600"
            >
              <span className="text-orange-500">◉</span>
              Team
            </label>

            {/* Team Search/Selector input wrapper. */}
            <div className="relative" ref={dropDownRef}>
              <input
                id="teamName"
                name="teamName"
                required
                value={selectedTeam ? selectedTeam.name : teamSearch}
                onChange={(event) => {
                  setTeamSearch(event.target.value);
                  setSelectedTeam(null);
                  setShowTeamOptions(true);
                }}
                onFocus={() => setShowTeamOptions(true)}
                placeholder="Search and enter/click your team name, e.g. Boston Celtics"
                className=" w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
              />

              {showTeamOptions && filteredTeams.length > 0 && (
                <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                  {filteredTeams.map((team) => (
                    <button
                      key={team.id}
                      type="button"
                      onClick={() => {
                        setSelectedTeam(team);
                        setTeamSearch(team.name);
                        setShowTeamOptions(false);
                      }}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-orange-700"
                    >
                      <div>{team.name}</div>
                      <div className="text-xs text-slate-400">
                        {team.shortName}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Season selector. */}
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600">
              <span className="text-orange-500">▣</span>
              Season
            </p>

            <div className="grid grid-cols-3 gap-2">
              {SEASON_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSeason(option.value)}
                  className={`rounded-xl px-3 py-3 text-xs font-semibold transition ${
                    season === option.value
                      ? "bg-orange-500 text-white shadow-sm"
                      : "border border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* Sample size selector. */}
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600">
              <span className="text-orange-500">◔</span>
              Sample Size
            </p>

            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setLimit(size)}
                  className={`rounded-xl px-2 py-3 text-xs font-semibold transition ${
                    limit === size
                      ? "bg-slate-950 text-white shadow-sm"
                      : "border border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  Last {size}
                </button>
              ))}
            </div>
          </div>

          {/* Target scoring line control. */}
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600">
              <span className="text-orange-500">⚑</span>
              Target Scoring Line
            </p>

            <div
              onClick={handleLineInputClick}
              className={`flex h-11.5 items-center overflow-hidden rounded-xl border ${
                isFocused
                  ? "border-orange-500 bg-white ring-4 ring-orange-500/10"
                  : " border-slate-200 bg-slate-50 hover:border-slate-300"
              }`}
            >
              {/* Decrease button. */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseLine();
                }}

                className="flex h-full w-14 items-center justify-center text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200"
                disabled={line <= 0}
              >
                −0.5
              </button>

              {/* Central target line area. */}
              <div className="flex min-w-0 flex-1 items-center justify-center border-x border-slate-200 bg-white px-3">
                <input
                  ref={inputRef}
                  aria-label="Target scoring line"
                  type="number"
                  min="1"
                  step="0.5"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={line}
                  onChange={(event) => setLine(Number(event.target.value))}
                  className="w-20 bg-transparent text-center text-base font-bold  text-slate-950 outline-none"
                />
                <span className="ml-2 text-[10px] font-bold uppercase tracking-wider select-none text-orange-500">
                  PTS
                </span>
              </div>

              {/* Increase button. */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseLine();
                }}
                className="flex h-full w-14 items-center justify-center text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200"
              >
                +0.5
              </button>
            </div>
          </div>
        </div>

        {/* Primary form action. */}
        <button
          type="submit"
          disabled={disable}

          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>🏀</span>
          {loading ? "Analyzing..." : "Run Trend Analysis"}
        </button>
      </div>
    </form>
  );
};
