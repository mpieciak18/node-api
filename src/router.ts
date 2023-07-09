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
	body('name').isString().isLength({ max: 255 }),
	handleInputErrors,
	createProduct
);
router.delete('/product/:id', deleteProduct);

// Updates
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
	'/update/:id',
	body('title').optional().isString(),
	body('body').optional().isString(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').optional(),
	handleInputErrors,
	updateUpdate
);
router.post(
	'/update',
	body('title').isString(),
	body('body').isString(),
	body('productId').isString(),
	handleInputErrors,
	createUpdate
);
router.delete('/update/:id', deleteUpdate);

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
