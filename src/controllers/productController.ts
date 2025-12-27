import { Request, Response } from 'express';
import Product from '../database/models/productModel';
import { AuthRequest } from '../middlewares/middleware';
import User from '../database/models/userModel';
import Category from '../database/models/categoryModel';
import { where } from 'sequelize';


class ProductController {
    // Add Product
    public static async addProduct(req: AuthRequest, res: Response): Promise<void> {
        const { productName, productPrice, productDescription, procuctTotalStockQty, categoryId } = req.body;
        const userId = req.user?.id;
        let fileName
        if (req.file) {
            fileName = req.file?.filename
        } else {
            fileName = "https://bishalrijal.info.np/wp-content/uploads/2024/05/Bishal-Rijal-Computer-Science.png"
        }

        if (!productName || !productDescription || !productPrice || !procuctTotalStockQty || !categoryId) {
            res.status(400).json({ message: "All fields are required" });
            return
        }

        Product.create({
            productName,
            productDescription,
            productPrice,
            procuctTotalStockQty,
            productImageUrl: fileName,
            userId,
            categoryId
        })

        res.status(200).json({
            message: "Product added successfully"
        })
    }

    // Get All Products

    public static async getAllProducts(req: Request, res: Response): Promise<void> {
        const allProducts = await Product.findAll(
            {
                include: [{
                    model: User,
                    attributes: ['username']
                }, {
                    model: Category,
                    attributes: ['categoryName']
                }]
            }
        );
        res.status(200).json({
            data: allProducts,
            message: "All products fetched successfully"
        })
    }

    // Get single product

    public static async getSingleProduct(req: Request, res: Response): Promise<void> {
        const productId = req.params.id;
        const isProduct = await Product.findByPk(productId)
        if (!isProduct) {
            res.status(404).json({ message: "Product not found" });
            return
        }
        res.status(200).json({
            data: isProduct,
            message: "Single Product fetched successfully"
        })
    }

    // Delete Product
    public static async deleteProduct(req: Request, res: Response): Promise<void> {
        const productId = req.params.id;
        const isProduct = await Product.findByPk(productId)
        if (!isProduct) {
            res.status(404).json({ message: "Product not found" });
            return
        }
        await Product.destroy({
            where: { id: productId }
        });
        res.status(200).json({ message: "Single Product deleted successfully" })
    }

    // Update Product

    public static async updateProduct(req: AuthRequest, res: Response): Promise<void> {
        const productId = req.params.id;
        const { productName, productPrice, productDescription, procuctTotalStockQty, categoryId } = req.body;
        const userId = req.user?.id;
        let fileName
        if (req.file) {
            fileName = req.file?.filename
        } else {
            fileName = "https://bishalrijal.info.np/wp-content/uploads/2024/05/Bishal-Rijal-Computer-Science.png"
        }

        if (!productName || !productDescription || !productPrice || !procuctTotalStockQty || !categoryId) {
            res.status(400).json({ message: "All fields are required" });
            return
        }
        const isProduct = await Product.findByPk(productId)
        if (!isProduct) {
            res.status(404).json({ message: "Product not found" });
            return
        }
        await Product.update({
            productName,
            productDescription,
            productPrice,
            procuctTotalStockQty,
            categoryId,
            userId,
            productImageUrl: fileName
        }, {
            where: { id: productId }
        })
        res.status(200).json({ message: "Single Product updated successfully" })
    }
}

export default ProductController