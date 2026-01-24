import { Router } from 'express'
import middleware, { UserRoles } from '../middlewares/middleware';
import { multer, storage } from '../middlewares/multerMiddleware';
import errorHandler from '../services/catchAsyncError';
import ProductController from '../controllers/productController';
const upload = multer({ storage: storage })
const router = Router()

router.route("/product").post(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), upload.single("image"), errorHandler(ProductController.addProduct)).get(errorHandler(ProductController.getAllProducts))

router.route("/product/:id").get(errorHandler(ProductController.getSingleProduct)).delete(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), errorHandler(ProductController.deleteProduct)).patch(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), upload.single("image"), errorHandler(ProductController.updateProduct))

export default router;