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
import {
	createUpdate,
	deleteUpdate,
	getOneUpdate,
	getUpdates,
	updateUpdate,
} from './handlers/update';

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
router.get('/update', getUpdates);
router.get('/update/:id', () => {});
router.put(
	'/update/:id',
	body('title').optional().isString(),
	body('body').optional().isString(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').optional(),
	handleInputErrors,
	() => {}
);
router.post(
	'/update',
	body('title').isString(),
	body('body').isString(),
	body('productId').isString(),
	handleInputErrors,
	() => {}
);
router.delete('/update/:id', () => {});

// Update Points
router.get('/updatepoint', getOneUpdate);
router.get('/updatepoint/:id', getUpdates);
router.put(
	'/updatepoint/:id',
	body('name').optional().isString(),
	body('description').optional().isString(),
	handleInputErrors,
	updateUpdate
);
router.post(
	'/updatepoint',
	body('name').isString(),
	body('description').isString(),
	body('updateId').isString(),
	handleInputErrors,
	createUpdate
);
router.delete('/updatepoint/:id', deleteUpdate);

export default router;
