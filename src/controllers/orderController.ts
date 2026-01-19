import { Response } from "express";
import { KhaltiResponse, OrderData, OrderStatus, PaymentMethod, PaymentStatus, TransactionStatus, TransactionVerification } from "../globals/type";
import { AuthRequest } from "../middlewares/middleware";
import Order from "../database/models/orderMode.";
import Payment from "../database/models/paymentModel";
import OrderDetails from "../database/models/orderDetailsModel";
import axios from "axios";
import Product from "../database/models/productModel";

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
            items.length === 0
        ) {
            res.status(400).json({ message: "All fields are required!" });
            return;
        }

        const orderData = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId
        });

        const paymentDAta = await Payment.create({
            paymentMethod: paymentDetails?.paymentMethod
        })

        for (let item of items) {
            await OrderDetails.create({
                quantity: item.quantity,
                productId: item.productId,
                orderId: orderData.id

            })
        }

        if (PaymentMethod.Khalti === paymentDetails.paymentMethod) {

            const khaltiData = {
                return_url: "http://localhost:3000/order/success",
                website_url: "http://localhost:3000",
                amount: totalAmount * 100,
                purchase_order_id: orderData.id,
                purchase_order_name: 'Order Payment' + orderData.id
            }
            const khaltiResponse = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", khaltiData, {
                headers: {
                    Authorization: `key ${process.env.KHALTI_SECRET_KEY}`
                }
            })
            const khaltiResponseData: KhaltiResponse = khaltiResponse.data
            paymentDAta.pidx = khaltiResponseData.pidx
            await paymentDAta.save()

            res.status(200).json({
                message: "Order created successfully!",
                url: khaltiResponseData.payment_url
            })
        } else {
            res.status(200).json({
                message: "Order created successfully!"
            })
        }
    }

    // Verify pidx from khalti
    async verifyKhaltiPayment(req: AuthRequest, res: Response): Promise<void> {
        const { pidx } = req.body;
        if (!pidx) {
            res.status(400).json({ message: "Missing pidx" });
            return;
        }

        // Verify payment with khalti
        const khaltiResponse = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/", {
            pidx: pidx
        }, {
            headers: {
                Authorization: "Key " + process.env.KHALTI_SECRET_KEY
            }
        })
        const khaltiResponseData: TransactionVerification = khaltiResponse.data

        if (khaltiResponseData.status == TransactionStatus.Completed) {
            // update payment status in db
            await Payment.update({
                paymentStatus: PaymentStatus.PAID
            }, {
                where: { pidx: pidx }
            })
            res.status(200).json({
                message: "Payment verified successfully"
            })
        } else {
            res.status(400).json({
                message: "Payment verification failed"
            })
        }
    }
    // fetch my order
    async fetchMyOrder(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const myOrder = await Order.findAll({
            where: {
                userId
            },
            include: {
                model: Payment
            }
        })
        if (myOrder.length == 0) {
            res.status(400).json({
                message: "No order yet",
                data: []
            })
            return
        }
        res.status(200).json({
            message: "Your order fetched successfylly!",
            data: myOrder
        })
    }

    // Order details

    async fetchOrderDetails(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { orderId } = req.params
        const myOrder = await OrderDetails.findAll({
            where: {
                orderId,
                userId
            },
            include: {
                model: Product
            }
        })
        if (myOrder.length == 0) {
            res.status(400).json({
                message: "No order yet",
                data: []
            })
            return
        }
        res.status(200).json({
            message: "Your order fetched successfylly!",
            data: myOrder
        })
    }
    // cancel order
    async cancelMyOrder(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { orderId } = req.params

        if (!orderId) {
            res.status(400).json({
                message: "Order is must before began!"
            })
            return
        }
        const order: any = await Order.findAll({
            where: {
                userId,
                id: orderId
            }
        })
        if (order.length == 0) {
            res.status(400).json({
                message: "No order placed!"
            })
            return
        }
        if (order?.orderStatus == OrderStatus.SHIPPED || order?.orderStatus == OrderStatus.PREPERATION || order?.orderStatus == OrderStatus.DELIVERED || order?.orderStatus == OrderStatus) {
            res.status(400).json({
                message: "You can't cacel order!"
            })
            return
        }
        await Order.update({
            OrderStatus: OrderStatus.CANCELLED
        }, {
            where: {
                id: orderId
            }
        })
    }

    async changeOrderStatus(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { orderStatus } = req.body
        if (!orderStatus) {
            res.status(400).json({
                message: "Order status must be provided!"
            })
            return
        }

        await Order.update({
            orderStatus
        }, {
            where: {
                id: userId
            }
        })
    }
}

export default new OrderController();
