import type { NextFunction, Request, Response } from "express";
import chalk from "chalk";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const methodColors: Record<string, typeof chalk.green> = {
    GET: chalk.green,
    POST: chalk.blue,
    PUT: chalk.yellow,
    DELETE: chalk.red,
  };

  const colorFn = methodColors[req.method] || chalk.white;
  let logMessage = `${req.method} ${req.protocol}://${req.get("host")} ${req.originalUrl}`;

  if (req.body && Object.keys(req.body).length > 0) {
    logMessage += ` \n Body: ${JSON.stringify(req.body, null, 2)} `;
  }

  console.log(colorFn(logMessage));
  next();
};

export default logger;
