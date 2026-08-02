import type { Response, Request } from "express";
import { analyzeTrendsSerivce } from "../services/trends.service.js";
import { getTeamGames } from "../adapter/balldontlie.adapter.js";


export const analyzeTrends = async (req:Request, res:Response) => {
      const teamGames = await getTeamGames(14, 2025, 5);
       
     
         
  
     return res.json(teamGames);
}