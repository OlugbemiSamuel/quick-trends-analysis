import type { BallDontLieGame } from "../types/ballDontLie.types.js";
import type { Game } from "../types/games.types.ts";
import {
  BALLDONTLIE_API_KEY,
  BALLDONTLIE_BASE_URL,
} from '../../config.js';



export const mapApiToGame = (apiGame: BallDontLieGame) => {
  return {
    id: apiGame.id,
    date: apiGame.date,
    season: apiGame.season,
    status: apiGame.status,
    homeTeam: {
      id: apiGame.home_team.id,
      name: apiGame.home_team.full_name,
      shortName: apiGame.home_team.abbreviation,
    },
    awayTeam: {
      id: apiGame.visitor_team.id,
      name: apiGame.visitor_team.full_name,
      shortName: apiGame.visitor_team.abbreviation,
    },
    homeScore: apiGame.home_team_score,
    awayScore: apiGame.visitor_team_score,
    homePeriods: {
      q1: apiGame.home_q1,
      q2: apiGame.home_q2,
      q3: apiGame.home_q3,
      q4: apiGame.home_q4,
      ot1: apiGame.home_ot1,
      ot2: apiGame.home_ot2,
      ot3: apiGame.home_ot3,
    },
    awayPeriods: {
      q1: apiGame.visitor_q1,
      q2: apiGame.visitor_q2,
      q3: apiGame.visitor_q3,
      q4: apiGame.visitor_q4,
      ot1: apiGame.visitor_ot1,
      ot2: apiGame.visitor_ot2,
      ot3: apiGame.visitor_ot3,
    },
  };
};

export const getTeamGames = async (
  teamId: number,
  season: number,
  limit: number,
): Promise<Game[]> => {
  
  
 const API_KEY = BALLDONTLIE_API_KEY;
 const BASE_URL = BALLDONTLIE_BASE_URL;

  const response = await fetch(
    `${BASE_URL}/nba/v1/games?team_ids[]=${teamId}&seasons[]=${season}&per_page=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch games for team ${teamId} in season ${season}`,
    );
  };
  
 

  const data = await response.json();
  
   if(!data || !data.data){
    throw new Error(
      `No data returned for team ${teamId} in season ${season}`,
    );
  }
  console.log("Fetched games:", data.data.map(mapApiToGame));
  return data.data.map(mapApiToGame);
};
