import { Request, Response, NextFunction } from "express";
import { findUserByEmailOrUsername } from "../services/authServices";
import { CoustomError } from "../utils/CustomError";
export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email, password } = req.body;
  try {
    //  find user
    const userExist = await findUserByEmailOrUsername(email, username);

    if (userExist) {
      throw new CoustomError(401, "Username and email are already use ");
    }
  } catch (error) {}
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.send("signin");
};
