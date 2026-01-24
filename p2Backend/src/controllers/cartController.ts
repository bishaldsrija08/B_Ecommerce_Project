

import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/middleware';
import Cart from '../database/models/cartModel';
import Product from '../database/models/productModel';
import Category from '../database/models/categoryModel';


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
                    attributes: ['productName', 'productPrice', 'productTotalStockQty'],
                    include: [
                        {
                            model: Category,
                            attributes: ["id", "categoryName"]
                        }
                    ]
                }],
                attributes: ["id", "quantity"]
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
    // Remove item from cart => Delete
    async remoreFromCart(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { productId } = req.params
        // Check if the product exists in Cart table or not
        const cartItem: any = await Cart.findOne({
            where: {
                userId,
                productId
            }
        })
        if (!cartItem) {
            res.status(404).json({
                message: "Cart item not found"
            })
            return
        }
        console.log(cartItem)
        // Check if the cart item belongs to the user
        if (cartItem.userId !== userId) {
            res.status(404).json({
                message: "You do not have permission to delete this item"
            })
            return
        }
        // Delete the cart item
        await Cart.destroy({
            where: {
                userId,
                productId
            }
        })
        res.status(200).json({
            message: "Cart item removed successfully"
        })
    }
    // Update cart item quantity
    async updateCartItem(req: AuthRequest, res: Response): Promise<void> {
        const { productId } = req.params;
        const userId = req.user?.id;
        const { quantity } = req.body;

        if (!quantity) {
            res.status(400).json({
                message: "Quantity is required"
            })
            return
        }

        const cartItem = await Cart.findOne({
            where: {
                userId,
                productId
            }
        })
        if (!cartItem) {
            res.status(404).json({
                message: "Cart item not found"
            })
            return
        }
        cartItem.quantity = quantity;
        await cartItem?.save()
        res.status(200).json({
            message: "Cart item updated successfully",
            data: cartItem
        })
    }
}

export default new CartController();