import type { Team } from "../types/trends.types";
import type { TeamTotalTrendQuery, TrendResult } from "../types/trends.types";

const API_URL = import.meta.env.VITE_API_URL;

export const analyzeTeamTotalTrend = async (
  query: TeamTotalTrendQuery,
): Promise<TrendResult> => {
  const res = await fetch(`${API_URL}/trends/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to analyze Trend");
  }

  return res.json();
};

export const getTeams = async (): Promise<Team[]> => {
  const res = await fetch(`${API_URL}/getTeams`);
  if (!res.ok) {
    const error = await res.json();
    console.log("error:", error.message);

    throw new Error(error.message || "failed to fetch teams");
  }

  return res.json();
};
