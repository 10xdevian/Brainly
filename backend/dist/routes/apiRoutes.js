"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const contentController_1 = require("../controllers/contentController");
const brainController_1 = require("../controllers/brainController");
const router = express_1.default.Router();
//  register Api
router.post("/signup", authController_1.signupController);
//  Login controllers
router.post("/signin", authController_1.signinController);
router.post("/content", authMiddleware_1.authMiddleware, contentController_1.addContent);
router.get("/content", authMiddleware_1.authMiddleware, contentController_1.getContent);
router.delete("/content/:id", authMiddleware_1.authMiddleware, contentController_1.deleteContent);
router.post("/brain/share", authMiddleware_1.authMiddleware, brainController_1.share);
router.get("/brain/:shareLink", brainController_1.sharePublicLink);
exports.default = router;
