"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../database/models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    // Register a new user
    static async registerUser(req, res) {
        if (!req.body) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        const { username, userPassword, userEmail } = req.body;
        if (!username || !userPassword || !userEmail) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        await userModel_1.default.create({
            username,
            userPassword: bcryptjs_1.default.hashSync(userPassword, 10),
            userEmail
        });
        res.status(200).json({
            message: "User registered successfully"
        });
    }
    // User login
    static async loginUser(req, res) {
        const { userEmail, userPassword } = req.body;
        if (!userEmail || !userPassword) {
            res.status(400).json({
                message: "Missing required fields"
            });
            return;
        }
        // Check if user exists
        const isUserExists = await userModel_1.default.findOne({
            where: { userEmail }
        });
        if (!isUserExists) {
            res.status(400).json({
                message: "User does not exist"
            });
            return;
        }
        // Validate password
        const isPasswordValid = bcryptjs_1.default.compareSync(userPassword, isUserExists?.userPassword);
        if (!isPasswordValid) {
            res.status(400).json({
                message: "Invalid password or email"
            });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: isUserExists?.id }, JWT_SECRET, {
            expiresIn: "30d"
        });
        res.status(200).json({
            message: "Login successful",
            data: token
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=userController.js.map