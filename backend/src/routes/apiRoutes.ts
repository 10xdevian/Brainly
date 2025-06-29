import Express from "express";
import {
  signinController,
  signupController,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  addContent,
  deleteContent,
  getContent,
} from "../controllers/contentController";
import { share, sharePublicLink } from "../controllers/brainController";

const router = Express.Router();

//  register Api
router.post("/signup", signupController);

//  Login controllers
router.post("/signin", signinController);

router.post("/content", authMiddleware, addContent);
router.get("/content", authMiddleware, getContent);
router.delete("/content/:id", authMiddleware, deleteContent);
router.post("/brain/share", authMiddleware, share);

router.get("/brain/:shareLink", sharePublicLink);

export default router;
