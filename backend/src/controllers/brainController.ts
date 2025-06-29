import { NextFunction, Request, Response } from "express";
import { linkModel } from "../models/linkModel";
import { ErrorHandler } from "../utils/ErrorHandler";
import { generateRandomHash } from "../utils/linkHashHandler";
import { ContentModel } from "../models/contentModel";
import { User } from "../models/userModel";

export const share = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const share = req.body.share;
  // @ts-ignore
  const userId = req.user._id; // getting userid from request

  try {
    if (share) {
      const existingLink = await linkModel.findOne({
        userId,
      });

      if (existingLink) {
        res.status(201).json({
          hash: existingLink.hash,
        });
        return;
      }

      const sharelink = await linkModel.create({
        userId,
        hash: generateRandomHash(),
      });

      res.status(200).json({
        success: true,
        msg: "Link Shared",
        link: "/share/" + sharelink.hash,
        data: {
          linkId: sharelink._id,
          hash: sharelink.hash,
        },
      });
    } else {
      await linkModel.deleteOne({
        userId,
      });
      res.json({
        msg: "Link is removed",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const sharePublicLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const hash = req.params.shareLink;
  const link = await linkModel.findOne({
    hash,
  });

  if (!link) {
    throw new ErrorHandler(404, "Sorry incorrect input");
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await User.findOne({
    _id: link.userId,
  });
  if (!user) {
    throw new ErrorHandler(
      404,
      "User not found , error should ideally not happen ",
    );
    return;
  }

  res.status(203).json({
    username: user.username,
    content: content,
  });
};
