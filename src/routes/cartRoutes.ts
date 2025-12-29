import { Router } from "express";
import middleware, { UserRoles } from "../middlewares/middleware";
import cartController from "../controllers/cartController";
import errorHandler from "../services/catchAsyncError";
const router = Router();


router.route("/cart").post(middleware.isAuthenticated, errorHandler(cartController.addToCart))
    .get(middleware.isAuthenticated, errorHandler(cartController.getCartItems))



export default router;