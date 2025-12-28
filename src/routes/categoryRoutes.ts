import { Router } from "express";
import categoryController from "../controllers/categoryController";
import middleware, { UserRoles } from "../middlewares/middleware";
import errorHandler from "../services/catchAsyncError";
const router = Router();




router.route("/category").post(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), errorHandler(categoryController.addCategory))
    .get(errorHandler(categoryController.getAllCategoriess))

router.route("/category:id").delete(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), errorHandler(categoryController.deleteCategory))
    .patch(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), errorHandler(categoryController.updateCategory))






export default router;