import taskModel from "./models/task.model.js"
import { BaseException } from "../../exception/base.exception.js";
import { isValidObjectId } from "mongoose";
import folderModel from "../folder/models/folder.model.js";

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskModel.find().collation({ locale: 'en' });

        res.send({
            message: "succes✅",
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundedTask = await taskModel.findById({ id })

        if(!foundedTask){
            throw new BaseException(`Task not found with this id: ${id}`)
        };

        res.send({
            message: "success✅",
            data: foundedTask,
        });
    } catch (error) {
        next(error)
    }
};

const createTask = async (req, res, next) => {
    try {
        const { name, description, priority, status, deadline, folderId } = req.body;

        if(!name || !deadline){
            throw new BaseException(`Name or deadline is not Given`, 400);
        }
    
        const newTask = await taskModel.create({
            name,
            description,
            priority,
            status,
            deadline,
            folderId
        });

        await folderModel.updateOne(
            { _id: folderId },
            { $push: { tasks: newTask._id } }
        );
    
        res.send({
            message: "success✅",
            data: newTask,
        });
    } catch (error) {
        next(error)
    }
};

const editTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const updates = req.body

        const updatedTask = await taskModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if(!updatedTask) {
            throw new BaseException(`Task not found`, 404)
        }

        res.send({
            message: "succes✅",
            data: updatedTask,
        });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        if(!isValidObjectId(id)) {
            throw new BaseException(`Given id: ${id} is not valid object`, 400);
        }

        const deletedTask = await taskModel.findByIdAndDelete(id)

        if(!deletedTask) {
            throw new BaseException(`Task is not found`, 404);
        }

        res.send({
            message: "delete 🗑",
        })
    } catch (error) {
        next(error)
    }
};

export default { getAllTasks, getById, createTask, editTask, deleteTask, }