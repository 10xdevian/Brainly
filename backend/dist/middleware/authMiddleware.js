"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers["token"];
        if (!header)
            throw new Error("Token doesnot exists");
        const decode = jsonwebtoken_1.default.verify(header, process.env.JWT_SECRET_KEY);
        //@ts-ignore
        req.user = {
            _id: decode.data.id,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
