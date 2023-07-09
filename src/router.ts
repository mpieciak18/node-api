import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import {
	createProduct,
	deleteProduct,
	getOneProduct,
	getProducts,
	updateProduct,
} from './handlers/product';

const router = Router();

// Products
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
	'/product/:id',
	body('name').optional().isString(),
	handleInputErrors,
	updateProduct
);
router.post(
	'/product',
	body('name').isString(),
	handleInputErrors,
	createProduct
);
router.delete('/product/:id', deleteProduct);

// Updates
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put(
	'/update/:id',
	body('title').optional().isString(),
	body('body').optional().isString(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
	body('version').optional(),
	handleInputErrors,
	() => {}
);
router.post(
	'/update',
	body('title').isString(),
	body('body').isString(),
	handleInputErrors,
	() => {}
);
router.delete('/update/:id', () => {});

// Update Points
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put(
	'/updatepoint/:id',
	body('name').optional().isString(),
	body('description').optional().isString(),
	handleInputErrors,
	() => {}
);
router.post(
	'/updatepoint',
	body('name').isString(),
	body('description').isString(),
	body('updateId').isString(),
	handleInputErrors,
	() => {}
);
router.delete('/updatepoint/:id', () => {});

export default router;
