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