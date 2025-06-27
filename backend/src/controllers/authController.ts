import { Request, Response, NextFunction } from "express";
import {
  createUser,
  findUserByEmailOrUsername,
} from "../services/authServices";

import { hashedPassword } from "../utils/hashPassword";
import { ErrorHandler } from "../utils/errorHandler";
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
      throw new ErrorHandler(401, "Username and email are already use yes  ");
    }
    const hashed = await hashedPassword(password);

    const saveData = await createUser({
      username,
      email,
      password: hashed,
    });

    // Return response (excluding password)

    res.status(200).json({
      success: true,
      msg: "User Signup sucess",
      data: saveData,
    });
  } catch (error) {
    next(error);
  }
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.send("signin");
};
