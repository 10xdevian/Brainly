import { NextFunction, Request, Response } from "express";
import { CoustomError } from "../utils/CustomError";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof CoustomError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error(`[Error] ${req.method} ${req.url}:`, error);
  res.status(500).json({
    success: false,
    message: "Somthing went wrong",
  });
};
