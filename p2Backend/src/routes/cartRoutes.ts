import { Router } from "express";
import middleware, { UserRoles } from "../middlewares/middleware";
import cartController from "../controllers/cartController";
import errorHandler from "../services/catchAsyncError";
const router = Router();


router.route("/cart").post(middleware.isAuthenticated, errorHandler(cartController.addToCart))
    .get(middleware.isAuthenticated, errorHandler(cartController.getCartItems))

    router.route("/cart/:productId").delete(middleware.isAuthenticated, errorHandler(cartController.remoreFromCart))

    router.route("/cart/:productId").patch(middleware.isAuthenticated, errorHandler(cartController.updateCartItem))


export default router;