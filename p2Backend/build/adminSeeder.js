"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("./database/models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const adminSeeder = async () => {
    const [data] = await userModel_1.default.findAll({
        where: {
            userEmail: "admin@gmail.com"
        }
    });
    if (!data) {
        await userModel_1.default.create({
            userEmail: "admin@gmail.com",
            userPassword: bcryptjs_1.default.hashSync("admin", 10),
            username: "admin",
            userRole: "admin"
        });
    }
    else {
        console.log("Admin already exists!");
        return;
    }
    console.log("Admin seeded successfully!");
};
exports.default = adminSeeder;
//# sourceMappingURL=adminSeeder.js.map