import { Router } from 'express';
import userService from '@services/userService/userRoute';
import categoryService from '@services/categoryService/categoryRoute';

const router: Router = Router();

router.use('/userService', userService);
router.use('/categoryService', categoryService);

export default router;
