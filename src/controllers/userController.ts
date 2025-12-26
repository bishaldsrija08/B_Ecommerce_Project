import { Request, Response } from 'express';
import User from '../database/models/userModel';
import bcrypt from 'bcryptjs'
import { promises } from 'node:dns';
import jwt from 'jsonwebtoken';
class AuthController {
    // Register a new user
    public static async registerUser(req: Request, res: Response): Promise<void> {
        if (!req.body) {
            res.status(400).json({ message: "Invalid request" })
            return
        }
        const { username, userPassword, userEmail } = req.body;
        if (!username || !userPassword || !userEmail) {
            res.status(400).json({ message: "Missing required fields" });
            return
        }
        await User.create({
            username,
            userPassword: bcrypt.hashSync(userPassword, 10),
            userEmail
        })
        res.status(200).json({
            message: "User registered successfully"
        })
    }
    // User login
    public static async loginUser(req: Request, res: Response): Promise<void> {
        const { userEmail, userPassword } = req.body;
        if (!userEmail || !userPassword) {
            res.status(400).json({
                message: "Missing required fields"
            })
            return
        }
        // Check if user exists
        const isUserExists = await User.findOne({
            where: { userEmail }
        })

        if (!isUserExists) {
            res.status(400).json({
                message: "User does not exist"
            })
            return
        }
        // Validate password
        const isPasswordValid = bcrypt.compareSync(userPassword, isUserExists?.userPassword);
        if (!isPasswordValid) {
            res.status(400).json({
                message: "Invalid password or email"
            })
            return
        }
        const token = jwt.sign({id:isUserExists?.id}, "secretKey", {
            expiresIn: "30d"
        })
        res.status(200).json({
            message: "Login successful",
            data: token
        })
    }
}


export default AuthController;