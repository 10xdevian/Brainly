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
exports.findUserByEmailOrUsername = findUserByEmailOrUsername;
exports.createUser = createUser;
const userModel_1 = require("../models/userModel");
function findUserByEmailOrUsername(email, username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userModel_1.User.findOne({ $or: [{ email }, { username }] });
    });
}
function createUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, username, password, }) {
        const data = new userModel_1.User();
        data.username = username;
        data.password = password;
        data.email = email;
        return yield data.save();
    });
}
