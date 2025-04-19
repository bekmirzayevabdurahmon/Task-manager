import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        tasks: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Task",
            }
        ],
    },
    {
        collection: "folders",
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Folder", folderSchema)