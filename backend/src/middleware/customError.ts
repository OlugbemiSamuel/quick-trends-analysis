import type { NextFunction, Request, Response } from "express";
import type { AppError } from "../errors/appError.js";

const customErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
};

export default customErrorHandler;
