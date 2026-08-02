import { calculateTrend } from "../engine/trend.engine.js";
import type { Game } from "../types/games.types.js";


export const analyzeTrendsSerivce = async () => {

   

};

export const extractTeamScores = (games:Game[], teamId:number) => {
    if(games.length === 0) return [];
    const teamGames = games.filter(game => game.homeTeam.id === teamId || game.awayTeam.id === teamId);
    const teamScores = teamGames.map(game => game.homeTeam.id === teamId ? game.homeScore : game.awayScore);
    return teamScores;
};

export const calculateHits = (teamScores: number[], line:number) => {
    let hits = 0;
   teamScores.forEach(score => {
    if(score > line ) hits++;
   });
   return hits;

};

export const calculateAverageScore = (teamScores: number[]) => {
    if(teamScores.length === 0) return 0;
    const totalScore = teamScores.reduce((acc, score) => acc + score, 0);
    const avgScore = totalScore / teamScores.length;
    return Math.round(avgScore * 100 ) / 100;

};

export const calculateHitRates = (hit: number, totalGames:number) => {
    if(totalGames === 0) return 0;

    const hitRate = hit/totalGames;
    return Math.round(hitRate * 100) / 100;

}


