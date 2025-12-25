import {Router} from 'express'
import AuthController from '../controllers/userController';
const router = Router()


router.route('/register').post(AuthController.registerUser)




export default router;