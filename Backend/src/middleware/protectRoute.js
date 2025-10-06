import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'
import User from '../models/usermodel.js'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ message: "Unathorized" })
        }
        const decoded = jwt.decode(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Token is invalid" })
        }

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not foundF" })
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(400).json({error:error.message })
    }
}