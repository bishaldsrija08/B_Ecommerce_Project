import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/models/userModel';

// Type of user attached to request
interface AuthRequest extends Request {
    user?: {
        username: string,
        userEmail: string,
        id: string,
        userRole: string,
        userPassword: string
    }
}

// Enum for user roles

export enum UserRoles {
    Admin = "admin",
    Customer = "customer"
}

class AuthMiddleware {
    async isAuthenticated(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        // Get token from headers
        const token = req.headers.authorization

        if (!token && token === undefined && token === null) {
            res.status(403).json({
                message: "No token provided!"
            })
            return
        }

        // Verify token
        const JWT_SECRET = process.env.JWT_SECRET as string;
        jwt.verify(token as string, JWT_SECRET, async (err, decoded: any) => {
            if (err) {
                res.status(400).json({
                    message: "Invalid token!"
                })
                return
            }

            try {
                // check if the decoded token has id and is valid
                const userData = await User.findByPk((decoded.id))
                if (!userData) {
                    res.status(404).json({
                        message: "No user found!"
                    })
                    return
                }
                // attach user data to request object
                req.user = userData;
                // next
                next();
            } catch (err) {
                res.status(500).json({
                    message: "Internal server error!"
                })
            }
        })
    }

    // Check Roles - restrictTo function allows only specified roles to access certain routes

    restrictedTo(...roles: UserRoles[]) {
        return (req: AuthRequest, res: Response, next: NextFunction) => {
            let userRole = req.user?.userRole as UserRoles
            if (!roles.includes(userRole)) {
                res.status(403).json({
                    message: "You do not have permission to perform this action"
                })
            }else{
                next();
            }
        }
    }
}

export default new AuthMiddleware();