import { Router } from "express";
import userRouter from "./user/user.router.js";
import folderRouter from "./folder/folder.router.js";

const router = Router();

router
    .use("/users", userRouter)
    .use("/folders", folderRouter)

export default router