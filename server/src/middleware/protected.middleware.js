import jwt from "jsonwebtoken";
import { 
    ACCESS_TOKEN_SECRET, 
    ACCESS_TOKEN_EXPIRE_TIME, 
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRE_TIME
} from "../config/jwt.config.js";
import { BaseException } from "../exception/base.exception.js";
import { ROLES } from "../constants/role.constants.js"

export const Protected = (isProtected) => {
    return (req, res, next) => {
      if (!isProtected) {
        req.role = ROLES.USER;
        return next();
      }
  
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;
  
      if(!accessToken && !refreshToken){
        return res.redirect('login')
      }
  
      if (!accessToken) {
        try {
            const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            const cleanedData = {
                id: data.id,
                role: data.role
            };
    
            const newAccessToken = jwt.sign(cleanedData, ACCESS_TOKEN_SECRET, {
                expiresIn: +ACCESS_TOKEN_EXPIRE_TIME,
                algorithm: "HS256",
            });
    
            const newRefreshToken = jwt.sign(cleanedData, REFRESH_TOKEN_SECRET, {
                expiresIn: +REFRESH_TOKEN_EXPIRE_TIME,
                algorithm: "HS256",
            });
    
            res.cookie("accessToken", newAccessToken, {
                maxAge: +ACCESS_TOKEN_EXPIRE_TIME * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
    
            res.cookie("refreshToken", newRefreshToken, {
                maxAge: +REFRESH_TOKEN_EXPIRE_TIME * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
    
            req.role = cleanedData.role;
            req.user = cleanedData.id;
    
            return next();
        } catch (err) {
            return next(new BaseException("Refresh token yaroqsiz", 401));
        }
      }
     
      try {
        const decodedData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  
        req.role = decodedData.role;
        req.user = decodedData.id;
  
        next();
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return next(new BaseException("Token muddati eskirgan", 406));
        } else if (err instanceof jwt.JsonWebTokenError) {
          return next(
            new BaseException("JWT token xato formatda yuborildi", 400)
          );
        } else if (err instanceof jwt.NotBeforeError) {
          return next(new BaseException("Not Before Error", 409));
        } else {
          next(err);
        }
      }
    };
};
