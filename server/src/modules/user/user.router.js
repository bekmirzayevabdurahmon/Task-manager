import { Router } from "express";
import userController from "./user.controller.js"

const userRouter = Router();

userRouter
    .get(
        "/",
        userController.getAllUser,
    )
    .post(
        "/register",
        userController.register,
    )
    .post(
        "/login",
        userController.login,
    )
    .post(
        "/forgot-password",
        userController.forgotPassword,
    )

export default userRouter