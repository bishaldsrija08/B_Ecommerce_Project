"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../database/models/userModel"));
// Enum for user roles
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "admin";
    UserRoles["Customer"] = "customer";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
class AuthMiddleware {
    async isAuthenticated(req, res, next) {
        // Get token from headers
        const token = req.headers.authorization;
        if (!token && token === undefined && token === null) {
            res.status(403).json({
                message: "No token provided!"
            });
            return;
        }
        // Verify token
        const JWT_SECRET = process.env.JWT_SECRET;
        jsonwebtoken_1.default.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(400).json({
                    message: "Invalid token!"
                });
                return;
            }
            try {
                // check if the decoded token has id and is valid
                const userData = await userModel_1.default.findByPk((decoded.id));
                if (!userData) {
                    res.status(404).json({
                        message: "No user found!"
                    });
                    return;
                }
                // attach user data to request object
                req.user = userData;
                // next
                next();
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal server error!"
                });
            }
        });
    }
    // Check Roles - restrictTo function allows only specified roles to access certain routes
    restrictedTo(...roles) {
        return (req, res, next) => {
            let userRole = req.user?.userRole;
            if (!roles.includes(userRole)) {
                res.status(403).json({
                    message: "You do not have permission to perform this action"
                });
            }
            else {
                next();
            }
        };
    }
}
exports.default = new AuthMiddleware();
//# sourceMappingURL=middleware.js.map