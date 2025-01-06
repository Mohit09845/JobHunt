import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const register = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
        throw new ApiError(404, "All fields are mandatory")
    }

    const user = await User.findOne({ email })

    if (user) {
        throw new ApiError(404, "Provide valid email id or password")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        fullName, email, phoneNumber, password: hashedPassword, role
    })

    return res.status(200).json(
        new ApiResponse(200, '', 'Account created successsfully')
    )
})

export const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        throw new ApiError(400, "All fields are mandatory")
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Email or password is invalid")
    }

    if (role !== user.role) {
        throw new ApiError(403, "Please check your role again")
    }

    const sanitizedUser = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    };

    await generateToken(res, sanitizedUser, `Welcome back ${user.fullName}`);
})

export const logout = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 0
    }
    return res.status(200).clearCookie("token", options,).json(
        new ApiResponse(200, '', "User Logged out Successfully")
    )
})

export const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    if (!req.user?._id) {
        throw new ApiError(401, 'Unauthorized access');
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new ApiError(400, 'Invalid email format');
    }

    if (!phoneNumber.match(/^\d{10}$/)) {
        throw new ApiError(400, 'Phone number must be 10 digits');
    }

    const emailExists = await User.findOne({ email, _id: { $ne: req.user?._id } });
    if (emailExists) {
        throw new ApiError(400, 'Email is already in use by another user');
    }

    const skillsArray = skills ? skills.split(',').map(skill => skill.trim()) : [];

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                phoneNumber,
                email,
                'profile.bio': bio,
                'profile.skills': skillsArray,
            },
        },
        { new: true } 
    );

    if (!updatedUser) {
        throw new ApiError(404, 'User not found');
    }

    const { _id, profile } = updatedUser;
    return res.status(200).json(
        new ApiResponse(200, { _id, fullName, email, phoneNumber, profile }, 'Profile updated successfully')
    );
});



