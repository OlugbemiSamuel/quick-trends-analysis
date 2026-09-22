import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});
export default router;
