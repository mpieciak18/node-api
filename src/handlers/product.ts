import prisma from '../db';

// Get all products
// @ts-ignore
export const getProducts = async (req, res, next) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.user.id,
			},
			include: {
				products: true,
			},
		});

		// @ts-ignore
		res.json({ data: user.products });
	} catch (err) {
		next(err);
	}
};

// Get one product
// @ts-ignore
export const getOneProduct = async (req, res, next) => {
	try {
		const product = await prisma.product.findFirst({
			where: {
				id: req.params.id,
				belongsToId: req.user.id,
			},
		});

		res.json({ data: product });
	} catch (err) {
		next(err);
	}
};

// Create one product
// @ts-ignore
export const createProduct = async (req, res, next) => {
	try {
		const product = await prisma.product.create({
			data: {
				name: req.body.name,
				belongsToId: req.user.id,
			},
		});

		res.json({ data: product });
	} catch (err) {
		next(err);
	}
};

// Update one product
// @ts-ignore
export const updateProduct = async (req, res, next) => {
	try {
		const updated = await prisma.product.update({
			where: {
				id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
			},
			data: {
				name: req.body.name,
			},
		});

		res.json({ data: updated });
	} catch (err) {
		next(err);
	}
};

// Delete one product
// @ts-ignore
export const deleteProduct = async (req, res, next) => {
	try {
		const deleted = await prisma.product.delete({
			where: {
				id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
			},
		});

		res.json({ data: deleted });
	} catch (err) {
		next(err);
	}
};
