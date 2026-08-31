import { getTeamGames } from "../repository/balldontlie.repository.js";
import type { TeamTotalTrendQuery } from "../types/trends.types.js";
import { calculateTrend } from "../engine/trend.engine.js";

export const analyzeTeamTotalTrend = async (query: TeamTotalTrendQuery) => {
  const games = await getTeamGames({
    teamId: query.teamId,
    season: query.season,
    limit: query.limit,
  });

  if (games.length === 0) {
    throw new Error(
      "No games were returned for this team requested season/query",
    );
  }

  const trendResult = calculateTrend({
    games,
    teamId: query.teamId,
    line: query.line,
  });
  return trendResult;
};
