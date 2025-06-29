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
exports.sharePublicLink = exports.share = void 0;
const linkModel_1 = require("../models/linkModel");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const linkHashHandler_1 = require("../utils/linkHashHandler");
const contentModel_1 = require("../models/contentModel");
const userModel_1 = require("../models/userModel");
const share = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    // @ts-ignore
    const userId = req.user._id; // getting userid from request
    try {
        if (share) {
            const existingLink = yield linkModel_1.linkModel.findOne({
                userId,
            });
            if (existingLink) {
                res.status(201).json({
                    hash: existingLink.hash,
                });
                return;
            }
            const sharelink = yield linkModel_1.linkModel.create({
                userId,
                hash: (0, linkHashHandler_1.generateRandomHash)(),
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
        }
        else {
            yield linkModel_1.linkModel.deleteOne({
                userId,
            });
            res.json({
                msg: "Link is removed",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.share = share;
const sharePublicLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield linkModel_1.linkModel.findOne({
        hash,
    });
    if (!link) {
        throw new ErrorHandler_1.ErrorHandler(404, "Sorry incorrect input");
        return;
    }
    const content = yield contentModel_1.ContentModel.find({
        userId: link.userId,
    });
    const user = yield userModel_1.User.findOne({
        _id: link.userId,
    });
    if (!user) {
        throw new ErrorHandler_1.ErrorHandler(404, "User not found , error should ideally not happen ");
        return;
    }
    res.status(203).json({
        username: user.username,
        content: content,
    });
});
exports.sharePublicLink = sharePublicLink;
