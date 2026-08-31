import type { Game, TeamGamesQuery } from "../types/games.types.js";

import { mapApiToGame } from "../adapter/balldontlie.adapter.js";
import { BALLDONTLIE_API_KEY, BALLDONTLIE_BASE_URL } from "../config.js";

export const getTeamGames = async (
  query: TeamGamesQuery
): Promise<Game[]> => { 
  
  
 const API_KEY = BALLDONTLIE_API_KEY;
 const BASE_URL = BALLDONTLIE_BASE_URL;

  const response = await fetch(
    `${BASE_URL}/nba/v1/games?team_ids[]=${query.teamId}&seasons[]=${query.season}&per_page=${query.limit}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch games for team ${query.teamId} in season ${query.season}`,
    );
  };
  
 

  const data = await response.json();
  
   if(!data || !data.data){
    throw new Error(
      `No data returned for team ${query.teamId} in season ${query.season}`,
    );
  };
 
  return data.data.map(mapApiToGame);
};