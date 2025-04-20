import { Router } from "express";
import userRouter from "../modules/user/user.router.js";
import taskRouter from "../modules/task/task.router.js";
import folderRouter from "../modules/folder/folder.router.js";

const router = Router();

router
    .use("/users", userRouter)
    .use("/folders", folderRouter)
    .use("/tasks", taskRouter)

export default router