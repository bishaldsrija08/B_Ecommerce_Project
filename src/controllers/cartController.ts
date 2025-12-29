

import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/middleware';
import Cart from '../database/models/cartModel';
import Product from '../database/models/productModel';


class CartController {
    // Add item to cart
    async addToCart(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { quantity, productId } = req.body;
        if (!quantity || !productId) {
            res.status(400).json({
                message: "Quantity and Product ID are required"
            })
        }
        // Check if the product exists in Cart table or not
        let cartItem = await Cart.findOne({
            where: {
                productId,
                userId
            }
        })
        if (cartItem) {
            // If exists, update the quantity
            cartItem.quantity += quantity;
            await cartItem.save();
            res.status(200).json({
                message: "Cart updated successfully",
                data: cartItem
            })
        } else {
            // If not, create a new cart item
            cartItem = await Cart.create({
                userId,
                productId,
                quantity
            })

            res.status(200).json({
                message: "Item added to cart",
                data: cartItem
            })
        }
    }
    // Get all cart items for a user
    async getCartItems(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const cartItems = await Cart.findAll
            ({
                where: {
                    userId
                },
                include: [{
                    model: Product,
                    attributes: ['productName', 'productPrice', 'productTotalStockQty']
                }]
            })
        if (cartItems.length === 0) {
            res.status(200).json({
                message: "Cart is empty.",
            })
        } else {
            res.status(200).json({
                message: "Cart items retrieved successfully",
                data: cartItems
            })
        }
    }
}

export default new CartController();