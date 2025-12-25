import { Request, Response } from 'express';
import User from '../database/models/userModel';
import bcrypt from 'bcryptjs'

class AuthController {
    public static async registerUser(req: Request, res: Response): Promise<void> {
        if(!req.body){
            res.status(400).json({message: "Invalid request"})
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
}


export default AuthController;