import type { Response, Request } from "express";
import { analyzeTrendsSerivce } from "../services/trends.service.js";


export const analyzeTrends = (req:Request, res:Response) => {
  
     return res.json(analyzeTrendsSerivce);
}