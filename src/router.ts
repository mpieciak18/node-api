import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { handleInputErrors } from './modules/middleware';

const router = Router();

// Products
router.get('/product', (req, res) => {
	res.json({ message: 'message' });
});
router.get('/product/:id', () => {});
router.put(
	'/product/:id',
	body('name').optional().isString(),
	handleInputErrors,
	() => {}
);
router.post(
	'/product',
	body('name').exists().isString(),
	handleInputErrors,
	() => {}
);
router.delete('/product/:id', () => {});

// Updates
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put(
	'/update/:id',
	body('title').optional().isString(),
	body('body').optional().isString(),
	// @ts-ignore
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
	body('version').optional(),
	handleInputErrors,
	() => {}
);
router.post(
	'/update',
	body('title').exists().isString(),
	body('body').exists().isString(),
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
	body('name').exists().isString(),
	body('description').exists().isString(),
	body('updateId').exists().isString(),
	handleInputErrors,
	() => {}
);
router.delete('/updatepoint/:id', () => {});

// Update Points
router.get('/user', () => {});
router.get('/user/:id', () => {});
router.put(
	'/user/:id',
	body(['username', 'description']).isString(),
	body('products').isArray(),
	handleInputErrors,
	() => {}
);
router.post(
	'/user',
	body(['username', 'password']).isString(),
	body('products').isArray(),
	handleInputErrors,
	() => {}
);
router.delete('/user/:id', () => {});

export default router;
