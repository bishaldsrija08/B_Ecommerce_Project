import { Response } from "express";
import { KhaltiResponse, OrderData, PaymentMethod, PaymentStatus, TransactionStatus, TransactionVerification } from "../globals/type";
import { AuthRequest } from "../middlewares/middleware";
import Order from "../database/models/orderMode.";
import Payment from "../database/models/paymentModel";
import OrderDetails from "../database/models/orderDetailsModel";
import axios from "axios";

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

    async verifyTransaction(req: AuthRequest, res: Response): Promise<void> {
        const { pidx } = req.body

        if (!pidx) {
            res.status(400).json({
                message: "Pidx is compulsory!"
            })
            return
        }

        const response = await axios.post(
            "https://dev.khalti.com/api/v2/epayment/lookup/",
            { pidx },
            {
                headers: {
                    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
                }
            }
        )

        const data: TransactionVerification = response.data

        if (data.status === TransactionStatus.Completed) {
            await Payment.update(
                { paymentStatus: PaymentStatus.PAID },
                { where: { pidx } }
            )

            res.status(200).json({
                message: "Payment successful"
            })
        } else {
            res.status(400).json({
                message: "Payment not successful!"
            })
        }
    }
}

export default new OrderController();
