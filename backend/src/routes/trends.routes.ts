import  express from "express";
import { analyzeTrends } from "../controllers/trends.controller.js";

const trendsRouter = express.Router();

trendsRouter.post("/trends/analyze", analyzeTrends);

export default trendsRouter;