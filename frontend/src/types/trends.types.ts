export interface TeamTotalTrendQuery {
  teamId: number;
  season: number;
  limit: number;
  line: number;
}

export interface TrendResult {
  hits: number;
  misses: number;
  totalGames: number;
  averageScore: number;
  hitPercentage: number;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
}
