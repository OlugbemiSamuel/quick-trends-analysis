import express from "express";
import {
  analyzeTrends,
  getTeamsController,
} from "../controllers/trends.controller.js";

const trendsRouter = express.Router();

trendsRouter.post("/trends/analyze", analyzeTrends);
trendsRouter.get("/getTeams", getTeamsController);

export default trendsRouter;
