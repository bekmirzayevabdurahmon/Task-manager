import mongoose, { mongo } from "mongoose";
import { ROLES } from "../../../constants/role.constants.js";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        email: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        password: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        role: {
            type: mongoose.SchemaTypes.String,
            enum: [ROLES.USER, ROLES.SUPER_ADMIN],
            default: ROLES.USER,
        },
    },
    {
        collation: "users",
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("User", userSchema);