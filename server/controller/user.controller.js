import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../model/user.model.js';
import bcrypt from 'bcryptjs';

export const register = asyncHandler(async(req,res)=>{
    const {fullName,email,phoneNumber,password,role} = req.body;

    if(!fullName || !fullName || !email || !phoneNumber || !password || !role){
        throw new ApiError(404,"All fields are mandatory")
    }

    const user = await User.findOne({email})

    if(user){
        throw new ApiError(404,"Provide valid email id or password")
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({
        fullName,email,phoneNumber,password: hashedPassword,role
    })

    return res.status(200).json(
        new ApiResponse(200,'user created successsfully')
    )
})

export const login = asyncHandler(async(req,res)=>{
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        throw new ApiError(404,"All fields are mandatory")
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        throw new ApiError(404,"Email or password is invalid")
    }

    if(role!==user.role){
        throw new ApiError(404,"Please check your role again")
    }

})