import { Request, Response, NextFunction } from "express";
import {
  createUser,
  findUserByEmailOrUsername,
} from "../services/authServices";

import { comparePassword, hashedPassword } from "../utils/hashPassword";
import { ErrorHandler } from "../utils/errorHandler";
import generateToken from "../utils/authHandler";


export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email, password } = req.body;

  try {
    //  find user
    const userExist = await findUserByEmailOrUsername(email, password);

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
  const { email, password } = req.body;
  try {
    const userExist = await findUserByEmailOrUsername(email, password);

    if (!userExist) {
      throw new ErrorHandler(401, "User doesnot exists Signup first");
    }

    //  check password is correct or not
    const correctHashedPassword = await comparePassword(
      password,
      userExist.password,
    );

    if (!correctHashedPassword) {
      throw new ErrorHandler(
        401,
        "Password doesnot match Enter correct password",
      );
    }

    const { refreshToken, accessToken } = await generateToken({
      email: userExist.email,
      _id: userExist._id.toString(),
    });

    res.status(200).json({
      success: true,
      msg: "Signin successful",
      accessToken,
      refreshToken,
      user: {
        id: userExist._id,
        email: userExist.email,
        username: userExist.username,
      },
    });
  } catch (error: any) {
    next(error);
  }
};
