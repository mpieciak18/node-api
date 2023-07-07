import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';

const router = Router();

// Products
router.get('/product', (req, res) => {
	res.json({ message: 'message' });
});
router.get('/product/:id', () => {});
router.put(
	'/product/:id',
	body('name').isString(),
	handleInputErrors,
	() => {}
);
router.post(
	'/product',
	body(['name', 'belongsToId']).isString(),
	handleInputErrors,
	() => {}
);
router.delete('/product/:id', () => {});

// Updates
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put(
	'/update/:id',
	body('updatedAt').isDate(),
	body(['title', 'body']).isString(),
	body('updatePoints').isArray(),
	handleInputErrors,
	() => {}
);
router.post(
	'/update',
	body('updatedAt').isDate(),
	body(['title', 'body', 'productId']).isString(),
	body('updatePoints').isArray(),
	handleInputErrors,
	() => {}
);
router.delete('/update/:id', () => {});

// Update Points
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put(
	'/updatepoint/:id',
	body('updatedAt').isDate(),
	body(['name', 'description', 'updateId']).isString(),
	body('products').isArray(),
	handleInputErrors,
	() => {}
);
router.post(
	'/updatepoint',
	body('updatedAt').isDate(),
	body(['name', 'description', 'updateId']).isString(),
	body('products').isArray(),
	handleInputErrors,
	() => {}
);
router.delete('/updatepoint/:id', () => {});

// Update Points
router.get('/user', () => {});
router.get('/user/:id', () => {});
router.put(
	'/user/:id',
	body(['username', 'password']).isString(),
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
