import { Router} from "express"
import folderController from "./folder.controller.js";
import { ROLES } from "../../constants/role.constants.js";
import { Protected } from "../../middleware/protected.middleware.js";
import { Roles } from "../../middleware/roles.middleware.js";

const folderRouter = Router();

folderRouter
    .get(
        "/",
        Protected(true),
        Roles(ROLES.ALL),
        folderController.getAllFolders,
    )
    .get(
        "/:id",
        Protected(true),
        Roles(ROLES.ALL),
        folderController.getById,
    )
    .post(
        "/",
        Protected(true),
        Roles(ROLES.ALL),
        folderController.createFolder,
    )
    .put(
        "/:id",
        Protected(true),
        Roles(ROLES.ALL),
        folderController.editFolder,
    )
    .delete(
        "/:id",
        Protected(true),
        Roles(ROLES.ALL),
        folderController.deleteFolder,
    );


export default folderRouter;