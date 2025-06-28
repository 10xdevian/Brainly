import { NextFunction, Response, Request } from "express";
import { ContentModel } from "../models/contentModel";
import { TagModel } from "../models/tagModel";
import { ErrorHandler } from "../utils/errorHandler";

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

export const getContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //@ts-ignore
    const userId = req.user._id;

    const userContent = await ContentModel.find({ userId }) // we are doing filter here bu userid
      .select("title link type tags")
      .populate("tags", "title")
      .lean(); // Get plain JS objects

    //  convert tag to tagname

    const formatedContent = userContent.map((content: any) => ({
      id: content._id,
      title: content.title,
      link: content.link,
      type: content.type,
      tags: content.tags.map((tag: any) => tag.title),
    }));

    res.status(200).json({
      succes: true,
      data: formatedContent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contentId = req.params.id;
    // @ts-ignore
    const userId = req.user._id;

    const content = await ContentModel.findOne({ _id: contentId, userId });

    if (!content) {
      throw new ErrorHandler(404, "Content not found ");
    }

    await ContentModel.deleteOne({ _id: contentId });
    res.status(201).json({
      success: true,
      msg: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};
