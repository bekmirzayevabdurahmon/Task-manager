import { Router } from "express";
import userController from "./user.controller.js"
import { Protected } from "../../middleware/protected.middleware.js";
import { ROLES } from "../../constants/role.constants.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { loginSchema, refreshSchema, registerSchema } from "./user.schema.js";
import { Roles } from "../../middleware/roles.middleware.js";

const userRouter = Router();

userRouter
    .get(
        "/",
        // Protected(true),
        // Roles(ROLES.SUPER_ADMIN),
        userController.getAllUser,
    )
    .post(
        "/register",
        Protected(false),
        ValidationMiddleware(registerSchema),
        userController.register,
    )
    .post(
        "/login",
        Protected(false),
        ValidationMiddleware(loginSchema),
        userController.login,
    )
    .post(
        "/refresh",
        Protected(true),
        Roles(ROLES.ALL),
        ValidationMiddleware(refreshSchema),
        userController.refresh,
    )
    .post(
        "/forgot-password",
        Protected(false),
        userController.forgotPassword,
    )
    .put(
        "/:id",
        Protected(true),
        Roles(ROLES.ALL),
        userController.editUser,
    )
    .delete(
        "/:id",
        // Protected(true),
        // Roles(ROLES.SUPER_ADMIN),
        userController.deleteUser
    );

export default userRouter;