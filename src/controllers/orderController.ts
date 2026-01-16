import { Response } from "express";
import { OrderData } from "../globals/type";
import { AuthRequest } from "../middlewares/middleware";
import Order from "../database/models/orderMode.";

class OrderController {
    async createOrder(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id;

        const {
            phoneNumber,
            shippingAddress,
            totalAmount,
            paymentDetails,
            items
        }: OrderData = req.body;

        if (
            !phoneNumber ||
            !shippingAddress ||
            !totalAmount ||
            !paymentDetails?.paymentMethod ||
            !items ||
            items.length === 0
        ) {
            res.status(400).json({ message: "All fields are required!" });
            return;
        }

        await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId
        });

        

        res.status(201).json({
            message: "Order created successfully!"
        });
    }
}

export default new OrderController();
