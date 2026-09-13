import type { Response, Request, NextFunction } from "express";
import { analyzeTeamTotalTrend } from "../services/trends.service.js";
import type { TeamTotalTrendQuery } from "../types/trends.types.js";

export const analyzeTrends = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqData: TeamTotalTrendQuery = {
      season: req.body.season,
      teamId: req.body.teamId,
      limit: req.body.limit,
      line: req.body.line,
    };

    if (
      reqData.season === undefined ||
      reqData.teamId === undefined ||
      reqData.limit === undefined ||
      reqData.line === undefined
    ) {
      return res.status(400).json({
        message: "One or more request inputs are missing",
      });
    }

    if (
      typeof reqData.season !== "number" ||
      typeof reqData.teamId !== "number" ||
      typeof reqData.line !== "number" ||
      typeof reqData.limit !== "number"
    ) {
      return res.status(400).json({ message: "Request input must be numbers" });
    }

    const teamTotalTrend = await analyzeTeamTotalTrend(reqData);

    return res.json(teamTotalTrend);
  } catch (error) {
    next(error);
  }
};
