import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers["token"];
    if (!header) throw new Error("Token doesnot exists");
    const decode = jwt.verify(
      header as string,
      process.env.JWT_SECRET_KEY as string,
    ) as {
      data: { id: string };
    };
    //@ts-ignore
    req.user = {
      _id: decode.data.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};
