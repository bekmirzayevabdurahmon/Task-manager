import { Router } from "express";
import taskController from "./task.controller.js";
import { ROLES } from "../../constants/role.constants.js";
import { Protected } from "../../middleware/protected.middleware.js";
import { Roles } from "../../middleware/roles.middleware.js";

const taskRouter = Router();

taskRouter
    .get(
        "/",
        Protected(true),
        Roles(ROLES.ALL),
        taskController.getAllTasks
    )
    .get(
        "/:id",
        Protected(true),
        Roles(ROLES.ALL),
        taskController.getById
    )
    .post(
        "/",
        Protected(true),
        Roles(ROLES.ALL),
        taskController.createTask
    )
    .put(
        "/:id",
        Protected(true),
        Roles(ROLES.ALL),
        taskController.editTask
    )
    .delete(
        "/:id",
        Protected(true),
        Roles(ROLES.ALL),
        taskController.deleteTask
    )

export default taskRouter;