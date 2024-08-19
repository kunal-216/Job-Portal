import express from "express"
import { loginUser, registerUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/login",loginUser);
userRouter.post("/register",registerUser);

export default userRouter;