import type { Game } from "../types/games.types.js";
import type { TrendsAnalysisQuery } from "../types/trends.types.js";

export const calculateTrend = (query: TrendsAnalysisQuery) => {
  const teamScores = extractTeamScores(query.games, query.teamId);
  const hits = calculateHits(teamScores, query.line);
  const averageScore = calculateAverageScore(teamScores);
  const hitPercentage = calculateHitRates(hits, teamScores.length) * 100;
  const misses = teamScores.length - hits;
  const totalGames = teamScores.length;

  return {
    hits,
    averageScore,
    hitPercentage,
    misses,
    totalGames,
  };
};

export const extractTeamScores = (games: Game[], teamId: number) => {
  if (games.length === 0) return [];
  const teamGames = games.filter(
    (game) => game.homeTeam.id === teamId || game.awayTeam.id === teamId,
  );
  const teamScores = teamGames.map((game) =>
    game.homeTeam.id === teamId ? game.homeScore : game.awayScore,
  );
  return teamScores;
};

export const calculateHits = (teamScores: number[], line: number) => {
  let hits = 0;
  teamScores.forEach((score) => {
    if (score >= line) hits++;
  });
  return hits;
};

export const calculateAverageScore = (teamScores: number[]) => {
  if (teamScores.length === 0) return 0;
  const avgScore =
    teamScores.reduce((acc, score) => acc + score, 0) / teamScores.length;
  // const avgScore = totalScore / teamScores.length;
  return Math.round(avgScore * 100) / 100;
};

export const calculateHitRates = (hits: number, totalGames: number) => {
  if (totalGames === 0) return 0;

  const hitRate = hits / totalGames;
  return Math.round(hitRate * 100) / 100;
};
