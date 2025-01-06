import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                message: 'User is not authenticated',
                success: false
            })
        }

        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

        if (!decodeToken) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            })
        }

        const user = await User.findById(decodeToken?.userId).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'user not found',
                success: false
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message || error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

export default isAuthenticated;