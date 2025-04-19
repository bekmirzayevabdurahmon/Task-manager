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
        const users = await userModel.find().populate('folders').collation({ locale: 'en' });

        res.send({
            message: "Succes✅",
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error)
    }
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.id

        const user = await userModel.findById({ id }).populate('folders');

        if(!user) {
            throw new BaseException(`User not found`, 404);
        };

        res.send({
            message: "succes✅",
            data: user,
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
};

const refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  
      const newAccessToken = jwt.sign(data, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
        algorithm: "HS256",
      });
  
      const newRefreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        algorithm: "HS256",
      });
  
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: +ACCESS_TOKEN_EXPIRE_TIME * 1000,
      });
  
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: +REFRESH_TOKEN_EXPIRE_TIME * 1000,
      });
  
      res.send({
        message: "Tokenlar yangilandi",
        tokens: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        next(new BaseException("Refresh token muddati tugagan", 401));
      } else if (error instanceof jwt.JsonWebTokenError) {
        next(new BaseException("Noto'g'ri refresh token", 400));
      } else {
        next(error);
      }
    }
  };

const editUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const updatedUser = await userModel.findByIdAndUpdate({ id }).populate('tasks');

        if(!updatedUser) {
            throw new BaseException(`User not found`, 404);
        }

        res.send({
            message: "succes✅",
            data: updatedUser,
        });
    } catch (error) {
        next(error)
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        

        const deletedUser = await userModel.findByIdAndDelete(id)

        if(!deletedUser) {
            throw new BaseException(`User not found`, 404);
        }

        res.send({
            message: "deleted 🗑",
        })
    } catch (error) {
        next(error)
    }
};

export default { getAllUser, getById, register, login, refresh, forgotPassword, editUser, deleteUser };