import type { Response, Request, NextFunction } from "express";
import { analyzeTeamTotalTrend, getTeams } from "../services/trends.service.js";
import type { TeamTotalTrendQuery } from "../types/trends.types.js";

export const analyzeTrends = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { season, limit, line, teamId } = req.body;
    const reqData: TeamTotalTrendQuery = {
      season,
      limit,
      line,
      teamId,
    };

    if (
      season === undefined ||
      teamId === undefined ||
      limit === undefined ||
      line === undefined
    ) {
      return res.status(400).json({
        message: "One or more request inputs are missing",
      });
    }

    if (
      typeof season !== "number" ||
      typeof teamId !== "number" ||
      typeof line !== "number" ||
      typeof limit !== "number"
    ) {
      return res.status(400).json({ message: "Request input must be numbers" });
    }

    const teamTotalTrend = await analyzeTeamTotalTrend(reqData);

    return res.json(teamTotalTrend);
  } catch (error) {
    next(error);
  }
};

export const getTeamsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const teams = await getTeams();
    return res.json(teams);
  } catch (error) {
    next(error);
  }
};
