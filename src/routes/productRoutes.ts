import { Router } from 'express'
import middleware, { UserRoles } from '../middlewares/middleware';
import { multer, storage } from '../middlewares/multerMiddleware';
import errorHandler from '../services/catchAsyncError';
import ProductController from '../controllers/productController';
const upload = multer({ storage: storage })
const router = Router()

router.route("/product").post(middleware.isAuthenticated, middleware.restrictedTo(UserRoles.Admin), upload.single("image"), errorHandler(ProductController.addProduct))

export default router;