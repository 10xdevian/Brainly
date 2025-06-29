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
exports.signinController = exports.signupController = void 0;
const authServices_1 = require("../services/authServices");
const hashPassword_1 = require("../utils/hashPassword");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const authHandler_1 = __importDefault(require("../utils/authHandler"));
const signupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        //  find user
        const userExist = yield (0, authServices_1.findUserByEmailOrUsername)(email, password);
        if (userExist) {
            throw new ErrorHandler_1.ErrorHandler(401, "Username and email are already use yes  ");
        }
        const hashed = yield (0, hashPassword_1.hashedPassword)(password);
        const saveData = yield (0, authServices_1.createUser)({
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
    }
    catch (error) {
        next(error);
    }
});
exports.signupController = signupController;
const signinController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userExist = yield (0, authServices_1.findUserByEmailOrUsername)(email, password);
        if (!userExist) {
            throw new ErrorHandler_1.ErrorHandler(401, "User doesnot exists Signup first");
        }
        //  check password is correct or not
        const correctHashedPassword = yield (0, hashPassword_1.comparePassword)(password, userExist.password);
        if (!correctHashedPassword) {
            throw new ErrorHandler_1.ErrorHandler(401, "Password doesnot match Enter correct password");
        }
        const { refreshToken, accessToken } = yield (0, authHandler_1.default)({
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
    }
    catch (error) {
        next(error);
    }
});
exports.signinController = signinController;
