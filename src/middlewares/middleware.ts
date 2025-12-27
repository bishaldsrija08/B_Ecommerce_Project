import { Request, Response, NextFunction } from 'express';


class AuthMiddleware {
    async isAuthenticated(req: Request, res: Response): Promise<void> {
        // Get token from headers


        // Verify token


        //
    }
}