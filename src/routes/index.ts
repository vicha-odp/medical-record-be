import { Router } from 'express';
import userService from '@services/userService/userRoute';
import categoryService from '@services/categoryService/categoryRoute';
import medicalRecordService from '@services/medicalRecordService/medicalRecordRoute';

const router: Router = Router();

router.use('/userService', userService);
router.use('/categoryService', categoryService);
router.use('/medicalRecordService', medicalRecordService);

export default router;
