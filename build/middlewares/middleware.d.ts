import { Request, Response, NextFunction } from 'express';
interface AuthRequest extends Request {
    user?: {
        username: string;
        userEmail: string;
        id: string;
        userRole: string;
        userPassword: string;
    };
}
export declare enum UserRoles {
    Admin = "admin",
    Customer = "customer"
}
declare class AuthMiddleware {
    isAuthenticated(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    restrictedTo(...roles: UserRoles[]): (req: AuthRequest, res: Response, next: NextFunction) => void;
}
declare const _default: AuthMiddleware;
export default _default;
//# sourceMappingURL=middleware.d.ts.map