import { isValidObjectId } from "mongoose";
import { BaseException } from "../../exception/base.exception.js";
import folderModel from "./models/folder.model.js";
import userModel from "../user/models/user.model.js"


const getAllFolders = async (req, res, next) => {
    try {
        const userID = req.user;
        console.log(userID)
        const folders = await folderModel
            .find({ userId: userID })
            .populate('tasks')
            .collation({ locale: 'en'});

        res.send({
            message: "succes✅",
            count: folders.length,
            data: folders,
        });
    } catch (error) {
        next(error)
    };
};

const getById = async (req, res, next) => {
    try {
        const userID = req.user;
        const folderId = req.params.id;

        const folder = await folderModel.find({userId: userID}).findById(folderId).populate('tasks');

        if (!folder) {
            throw new BaseException("Folder not found", 404);
        }

        res.send({
            message: "success✅",
            data: folder,
        });
    } catch (error) {
        next(error);
    }
};

const createFolder = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user;

        const foundedFolder = await folderModel.findOne({ name, userId });

        if (foundedFolder) {
            throw new BaseException(`This folder already exists`);
        }

        const newFolder = await folderModel.create({
            name,
            userId,
        });

        await userModel.updateOne(
            { _id: userId },
            { $push: { folders: newFolder._id } }
        ).collation({ locale: 'en' });

        res.send({
            message: "success✅",
            data: newFolder,
        });
    } catch (error) {
        next(error);
    }
};

const editFolder = async (req, res, next) => {
    try {
        const { id } = req.body;
        const { name } = req.body;

        if(!isValidObjectId(id)){
            throw new BaseException(`Given id: ${id} is not valid object`, 400);
        };

        const updateFolder = await folderModel.findOneAndUpdate({ name });
        
        res.send({
            message: "success✅",
            data: updateFolder,
        });
    } catch (error) {
        next(error)
    }
};

const deleteFolder = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        

        if(!isValidObjectId(id)){
            throw new BaseException(`Given id: ${id} is not valid object`, 400);
        };

        const deletedFolder = await folderModel.findByIdAndDelete(id);
        
        if(!deletedFolder){
            throw new BaseException(`Folder is not found`, 404);
        };

        res.send({
            message: "delete 🗑",
        });
    } catch (error) {
        next(error)
    }
};

export default { getAllFolders, getById, createFolder, editFolder, deleteFolder }