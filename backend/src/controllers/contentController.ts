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

    const tagName = await Promise.all(
      tags.map(async (tagNames: string) => {
        await TagModel.findOneAndUpdate(
          { title: tagNames },
          { $setOnInsert: { title: tagNames } },
          { upsert: true, new: true }, // create if not exists
        );
        return tagNames;
      }),
    );

    const newContent = await ContentModel.create({
      title,
      link,
      type,
      //@ts-ignore

      userId: req.user._id,
      tags: tagName,
    });

    // // Get updated tag suggestions (all tags sorted by popularity)
    // const allTags = await TagModel.aggregate([
    //   { $sort: { title: 1 } }, // Alphabetical sort
    //   // For popularity-based sorting you could add a usageCount field to Tag
    // ]);

    res.status(201).json({
      success: true,
      msg: "Content is created",
      data: {
        content: {
          id: newContent._id,
          title: newContent.title,
          type: newContent.type,
          tags: tagName,
        },

        // updatedTags: allTags.map((t: any) => t.title), // Return all tags for suggestions
      },
    });
  } catch (error) {
    next(error);
  }
};
