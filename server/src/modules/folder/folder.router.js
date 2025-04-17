import { Router} from "express"
import folderController from "./folder.controller.js";

const folderRouter = Router();

folderRouter
    .get(
        "/",
        folderController.getAllFolders,
    )
    .post(
        "/",
        folderController.createFolder,
    )
    .put(
        "/:id",
        folderController.editFolder,
    )
    .delete(
        "/:id",
        folderController.deleteFolder,
    );


export default folderRouter;