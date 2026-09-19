import type { TeamTotalTrendQuery, TrendResult } from "../types/trends.types";

const API_URL = "http://localhost:3000";

export const analyzeTeamTotalTrend = async (
  query: TeamTotalTrendQuery,
): Promise<TrendResult> => {
  console.log("API REQUEST QUERY:", query);
  const res = await fetch(`${API_URL}/trends/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
  console.log("API RESPONSE:", res.status);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to analyze Trend");
  }

  return res.json();
};
