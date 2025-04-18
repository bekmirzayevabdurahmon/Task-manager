import { isValidObjectId } from "mongoose";
import { BaseException } from "../../exception/base.exception.js";
import folderModel from "./models/folder.model.js";

const getAllFolders = async (req, res, next) => {
    try {
        const folders = await folderModel.find().collation({ locale: 'en'});

        res.send({
            message: "succes✅",
            user: folders.user,
            data: folders,
        });
    } catch (error) {
        next(error)
    };
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundedFolder = await folderModel.findById({ id })

        if(!foundedFolder) {
            throw new BaseException(`Folder is not found`, 404);
        }

        res.send({
            message: "succes✅",
            data: foundedFolder,
        })
    } catch (error) {
        next(error)
    }
};

const createFolder = async (req, res, next) => {
    try {
        const { name, userId } = req.body;

        const foundedFolder = await folderModel.findOne({ name, userId: userId});

        if(foundedFolder){
            throw new BaseException(`This folder already created`);
        }

        const newFolder = await folderModel.create({
            name,
            userId,
        });

        res.send({
            message: "succes✅",
            user: userId,
            data: newFolder,
        });
    } catch (error) {
        next(error)
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