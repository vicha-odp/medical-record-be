import { Router } from 'express';
import createCategory from './categoryController';

const router: Router = Router();

// create
router.post('/category/createDefaultCategory', createCategory.createCategory);

export default router;
