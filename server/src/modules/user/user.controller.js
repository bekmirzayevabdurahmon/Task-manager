import { compare, hash } from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import { BaseException } from "../../exception/base.exception.js";
import userModel from "./models/user.model.js";
import { sendMail } from "../../utils/mail.utils.js";
import { 
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRE_TIME,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRE_TIME        
 } from "../../config/jwt.config.js";

const getAllUser = async (req, res, next) => {
    try {
        const users = await userModel.find().collation({ locale: 'en' });

        res.send({
            message: "Succes✅",
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error)
    }
};

const register = async (req, res, next) => {
    try {
        const { username, email, password, } = req.body;

        const foundedUser = await userModel.findOne({
            $or: [{ email }, { username }],
        }).collation({ locale: 'en' })
    
        if (foundedUser) {
            throw new BaseException(`User already available!`)
        }
    
        const passwordHash = await hash(password, 10);
        const newUser = await userModel.create({
            username,
            email,
            password: passwordHash,
        });

        res.send({
            message: "Success",
            data: newUser
        });
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).collation({ locale: 'en' });
        if(!user){
            throw new BaseException(`User not found`, 404);
        }

        const isCorrect = await compare(password, user.password);
        if(!isCorrect){
            throw new BaseException(`Invalid password`, 401);
        }

        const accessToken = jwt.sign(
            {id: user.id, role: user.role},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: +ACCESS_TOKEN_EXPIRE_TIME,
                algorithm: "HS256",
            }
        );

        const refreshToken = jwt.sign(
            {id: user.id, role: user.role},
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: +REFRESH_TOKEN_EXPIRE_TIME,
                algorithm: "HS256",
            }
        );

        res.cookie("accesToken", accessToken, {
            maxAge: +ACCESS_TOKEN_EXPIRE_TIME * 1000,
            httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
            maxAge: +REFRESH_TOKEN_EXPIRE_TIME * 1000,
            httpOnly: true,
        });

        res.cookie("user", JSON.stringify(user))

        res.send({
            message: "Succes✅",
            AccesToken: accessToken,
            RefreshToken: refreshToken,
        });
    } catch (error) {
        next(error)
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({email}).collation({ locale: 'en' })

        if(!user){
            throw new BaseException("User not found", 400)
        };

        const server_base_url = "http://localhost:4000"

        const token = crypto.randomBytes(50);
        user.token = token.toString("hex");

        await user.save();


        await sendMail({
            to: email,
            subject: "Reset password",
            html: `
            <h2>Quyidagi link orqali yangilang</h2>
            <a href="${server_base_url}/users/reset-password?token=${user.token}">Link</a>`
        });

        res.send({
            message: "Password sent",
        });
    } catch (error) {
        next(error)
    }
}



export default { getAllUser, register, login, forgotPassword };