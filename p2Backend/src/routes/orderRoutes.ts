import { Router } from "express";
import orderController from "../controllers/orderController";
import middleware, { UserRoles } from "../middlewares/middleware";
import errorHandler from "../services/catchAsyncError";
const router = Router();

router.route('/order').post(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Customer), orderController.createOrder)
router.route("/verify-pidx").post(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Customer), errorHandler(orderController.verifyKhaltiPayment))
router.route("/order/customer/:orderId").get(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Customer), errorHandler(orderController.fetchMyOrder)).patch(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Customer), errorHandler(orderController.cancelMyOrder))





export default router;