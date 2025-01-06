import jwt from 'jsonwebtoken';
import { ApiResponse } from "./ApiResponse.js";
import { ApiError } from "./ApiError.js";

const generateToken = async (res,user,message) => {
    try {
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXPIRY }
        )
    
        const options = {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 24*60*60*1000
        }
    
        return res.
        status(200).
        cookie('token',token,options).
        json(new ApiResponse(200,user,message))
    } catch (error) {
        console.error(`error: ${error}`);
        throw new ApiError(500,'Error in generating token')
    }
}

export default generateToken;