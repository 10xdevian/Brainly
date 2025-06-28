import { NextFunction, Response, Request } from "express";
import { ContentModel } from "../models/contentModel";
import { TagModel } from "../models/tagModel";

export const addContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, link, type, tags } = req.body;

    const tagIds = await Promise.all(
      tags.map(async (tagName: string) => {
        const tag = await TagModel.findOneAndUpdate(
          { title: tagName },
          { $setOnInsert: { title: tagName } },
          { upsert: true, new: true }, // create if not exists
        );
        return tag._id;
      }),
    );

    const newContent = await ContentModel.create({
      title,
      link,
      type,
      //@ts-ignore

      userId: req.user._id,
      tags: tagIds,
    });

    res.status(201).json({
      success: true,
      msg: "Content is created",
    });
  } catch (error) {
    next(error);
  }
};
