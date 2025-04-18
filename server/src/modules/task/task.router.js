import { Router } from "express";
import taskController from "./task.controller.js";

const taskRouter = Router();

taskRouter
    .get(
        "/",
        taskController.getAllTasks
    )
    .get(
        "/:id",
        taskController.getById
    )
    .post(
        "/",
        taskController.createTask
    )
    .put(
        "/:id",
        taskController.editTask
    )
    .delete(
        "/:id",
        taskController.deleteTask
    )


export default taskRouter;