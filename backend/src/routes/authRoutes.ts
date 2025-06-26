import Express from "express";
import {
  signinController,
  signupController,
} from "../controllers/authController";

const router = Express.Router();

//  register Api
router.get("/signup", signupController);

//  Login controllers
router.get("/signin", signinController);

export default router;
