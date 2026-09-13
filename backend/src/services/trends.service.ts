import { getTeamGames } from "../repository/balldontlie.repository.js";
import type { TeamTotalTrendQuery } from "../types/trends.types.js";
import { calculateTrend } from "../engine/trend.engine.js";
import { AppError } from "../errors/appError.js";

export const analyzeTeamTotalTrend = async (query: TeamTotalTrendQuery) => {
  if (
    query.teamId <= 0 ||
    query.season <= 0 ||
    query.limit <= 0 ||
    query.line <= 0
  ) {
    throw new AppError("Invalid trend analysis input", 400);
  }

  const games = await getTeamGames({
    teamId: query.teamId,
    season: query.season,
    limit: query.limit,
  });

  if (games.length === 0) {
    throw new AppError(
      "No games were returned for this team requested season/query",
      404,
    );
  }

  const trendResult = calculateTrend({
    games,
    teamId: query.teamId,
    line: query.line,
  });
  return trendResult;
};
