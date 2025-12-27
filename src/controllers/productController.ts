import { Request, Response } from 'express';
import Product from '../database/models/productModel';


class ProductController {
    public static async addProduct(req: Request, res: Response): Promise<void> {
        const { productName, productPrice, productDescription, procuctTotalStockQty } = req.body;
        let fileName
        if (req.file) {
            fileName = req.file?.filename
        } else {
            fileName = "https://bishalrijal.info.np/wp-content/uploads/2024/05/Bishal-Rijal-Computer-Science.png"
        }

        if (!productName || !productDescription || !productPrice || !procuctTotalStockQty) {
            res.status(400).json({ message: "All fields are required" });
            return
        }

        Product.create({
            productName,
            productDescription,
            productPrice,
            procuctTotalStockQty,
            productImageUrl: fileName
        })

        res.status(200).json({
            message: "Product added successfully"
        })
    }
}

export default ProductController