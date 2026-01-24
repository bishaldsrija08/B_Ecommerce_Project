"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../database/models/productModel"));
class ProductController {
    static async addProduct(req, res) {
        const { productName, productPrice, productDescription, procuctTotalStockQty } = req.body;
        let fileName;
        if (req.file) {
            fileName = req.file?.filename;
        }
        else {
            fileName = "https://bishalrijal.info.np/wp-content/uploads/2024/05/Bishal-Rijal-Computer-Science.png";
        }
        if (!productName || !productDescription || !productPrice || !procuctTotalStockQty) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        productModel_1.default.create({
            productName,
            productDescription,
            productPrice,
            procuctTotalStockQty,
            productImageUrl: fileName
        });
        res.status(200).json({
            message: "Product added successfully"
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=productController.js.map