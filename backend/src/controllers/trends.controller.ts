import type { Response, Request } from "express";
import { analyzeTeamTotalTrend } from "../services/trends.service.js";
import type { TeamTotalTrendQuery } from "../types/trends.types.js";

export const analyzeTrends = async (req: Request, res: Response) => {
  const reqData: TeamTotalTrendQuery = {
    season: 2025,
    teamId: 14,
    limit: 6,
    line: 112.5,
  };
  const teamTotalTrend = await analyzeTeamTotalTrend(reqData);

  return res.json(teamTotalTrend);
};
