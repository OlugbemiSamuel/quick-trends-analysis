import type { Game } from "./games.types.js";

export interface TrendResult  {
    hits: number,
    hitPercentage: number,
    averageScore: number,
    misses: number,
    totalGames: number,
};

export interface TeamTotalTrendQuery {
    teamId: number,
    season: number,
    limit: number,
    line: number,
}

export interface TrendsAnalysisQuery {
    games: Game[],
    teamId: number,
    line: number
}