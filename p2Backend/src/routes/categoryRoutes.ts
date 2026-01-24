import { Router } from "express";
import middleware, { UserRoles } from "../middlewares/middleware";
import errorHandler from "../services/catchAsyncError";
import CategoryController from "../controllers/categoryController";
const router = Router();




router.route("/category").post(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), errorHandler(CategoryController.addCategory)).get(errorHandler(CategoryController.getAllCategories))

router.route("/category/:id").delete(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), errorHandler(CategoryController.deleteCategory))
    .patch(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), errorHandler(CategoryController.updateCategory)).get(errorHandler(CategoryController.getSingleCategory))





export default router;