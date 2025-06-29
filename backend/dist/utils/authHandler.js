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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret)
        throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    const accessToken = jsonwebtoken_1.default.sign({ data: { email: user === null || user === void 0 ? void 0 : user.email, id: user._id } }, secret, { expiresIn: 60 * 60 } // 1 hour
    );
    const refreshToken = jsonwebtoken_1.default.sign({ data: { email: user === null || user === void 0 ? void 0 : user.email, id: user._id } }, secret, { expiresIn: "7d" });
    return { accessToken, refreshToken };
});
exports.default = generateToken;
