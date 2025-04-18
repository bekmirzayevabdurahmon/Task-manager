import { Router } from "express";
import userRouter from "./user/user.router.js";
import folderRouter from "./folder/folder.router.js";
import taskRouter from "./task/task.router.js";

const router = Router();

router
    .use("/users", userRouter)
    .use("/folders", folderRouter)
    .use("/tasks", taskRouter)

export default router