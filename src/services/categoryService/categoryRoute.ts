import { Router } from 'express';
import category from './categoryController';

const router: Router = Router();

// create
router.post('/category/createDefaultCategory', category.createCategory);
// get all
router.get('/category', category.getAllCategory);
// get by id
router.get('/category/:category', category.getCategoryById);

export default router;
