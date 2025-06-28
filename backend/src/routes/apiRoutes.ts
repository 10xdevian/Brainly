import Express from "express";
import {
  signinController,
  signupController,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { addContent, getContent } from "../controllers/contentController";

const router = Express.Router();

//  register Api
router.post("/signup", signupController);

//  Login controllers
router.post("/signin", signinController);

router.post("/content", authMiddleware, addContent);
router.get("/content", authMiddleware,getContent );


export default router;
