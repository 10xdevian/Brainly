import Express from "express";
import {
  signinController,
  signupController,
} from "../controllers/authController";

const router = Express.Router();

//  register Api
router.post("/signup", signupController);

//  Login controllers
router.post("/signin", signinController);

export default router;
