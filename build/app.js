"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Parse JSON bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Dotenv Config
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Database Connection
require("./database/connection");
// admin Seeder
const adminSeeder_1 = __importDefault(require("./adminSeeder"));
(0, adminSeeder_1.default)();
// Importing Routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.use("/", userRoutes_1.default);
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
app.use("/admin", productRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Bye HII!");
});
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map