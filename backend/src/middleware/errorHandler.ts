import { NextFunction, Request, Response } from "express";

interface CoutomeError extends Error {
  statusCode: number;
  status: string;
}
export const errorHandler = (
  error: CoutomeError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
