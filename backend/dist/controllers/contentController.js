"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.getContent = exports.addContent = void 0;
const contentModel_1 = require("../models/contentModel");
const tagModel_1 = require("../models/tagModel");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const addContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, link, type, tags } = req.body;
        const tagIds = yield Promise.all(tags.map((tagName) => __awaiter(void 0, void 0, void 0, function* () {
            const tag = yield tagModel_1.TagModel.findOneAndUpdate({ title: tagName }, { $setOnInsert: { title: tagName } }, { upsert: true, new: true });
            return tag._id;
        })));
        yield contentModel_1.ContentModel.create({
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
    }
    catch (error) {
        next(error);
    }
});
exports.addContent = addContent;
const getContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.user._id;
        const userContent = yield contentModel_1.ContentModel.find({ userId }) // we are doing filter here bu userid
            .select("title link type tags")
            .populate("tags", "title")
            .lean(); // Get plain JS objects
        //  convert tag to tagname
        const formatedContent = userContent.map((content) => ({
            id: content._id,
            title: content.title,
            link: content.link,
            type: content.type,
            tags: content.tags.map((tag) => tag.title),
        }));
        res.status(200).json({
            succes: true,
            data: formatedContent,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getContent = getContent;
const deleteContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.params.id;
        // @ts-ignore
        const userId = req.user._id;
        const content = yield contentModel_1.ContentModel.findOne({ _id: contentId, userId });
        if (!content) {
            throw new ErrorHandler_1.ErrorHandler(404, "Content not found ");
        }
        yield contentModel_1.ContentModel.deleteOne({ _id: contentId });
        res.status(201).json({
            success: true,
            msg: "User deleted",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteContent = deleteContent;
