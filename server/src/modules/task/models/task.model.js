import mongoose, { mongo } from "mongoose";
import { PRIORITIES } from "../../../constants/priority.constants.js"
import { STATUS } from "../../../constants/status.constants.js"

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        description: {
            type: mongoose.SchemaTypes.String,
        },
        priority: {
            type: mongoose.SchemaTypes.String,
            enum: [PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH],
        },
        status: {
            type: mongoose.SchemaTypes.String,
            enum: [STATUS.NOT_STARTED, STATUS.IN_PROCCES, STATUS.FINISHED]
        },
        deadline: {
            type: mongoose.SchemaTypes.Date,
            required: true,
        },
        folderId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        }
    },
    {
        collection: "tasks",
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Task", taskSchema)