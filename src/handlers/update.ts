import prisma from '../db';

// Get all updates (for a user)
// @ts-ignore
export const getUpdates = async (req, res, next) => {
	try {
		const updates = await prisma.update.findMany({
			where: {
				product: {
					belongsToId: req.user.id,
				},
			},
		});

		res.json({ data: updates });
	} catch (e) {
		next(e);
	}
};

// Get one update
// @ts-ignore
export const getOneUpdate = async (req, res, next) => {
	try {
		const update = await prisma.update.findUnique({
			where: {
				id: req.params.id,
			},
		});

		res.json({ data: update });
	} catch (e) {
		next(e);
	}
};

// Create one update
// @ts-ignore
export const createUpdate = async (req, res, next) => {
	let product;
	try {
		product = await prisma.product.findUnique({
			where: {
				id_belongsToId: {
					id: req.body.productId,
					belongsToId: req.user.id,
				},
			},
		});
	} catch (e) {
		next(e);
	}

	if (!product) {
		// does not belong to user
		const e = new Error();
		// @ts-expect-error
		e.type = 'input';
		next(e);
	}

	try {
		const update = await prisma.update.create({
			data: req.body,
		});

		res.json({ data: update });
	} catch (e) {
		next(e);
	}
};

// Update one update
// @ts-ignore
export const updateUpdate = async (req, res, next) => {
	let update;
	try {
		update = await prisma.update.findFirst({
			where: {
				id: req.params.id,
				product: {
					belongsToId: req.user.id,
				},
			},
		});
	} catch (e) {
		next(e);
	}

	if (!update) {
		// does not belong to user
		const e = new Error();
		// @ts-expect-error
		e.type = 'input';
		next(e);
	}

	try {
		const updatedUpdate = await prisma.update.update({
			where: { id: req.params.id },
			data: req.body,
		});

		res.json({ data: updatedUpdate });
	} catch (e) {
		next(e);
	}
};

// Delete one update
// @ts-ignore
export const deleteUpdate = async (req, res, next) => {
	let update;
	try {
		update = await prisma.update.findFirst({
			where: {
				id: req.params.id,
				product: {
					belongsToId: req.user.id,
				},
			},
		});
	} catch (e) {
		next(e);
	}

	if (!update) {
		// does not belong to user
		const e = new Error();
		// @ts-expect-error
		e.type = 'input';
		next(e);
	}

	try {
		const deletedUpdate = await prisma.update.delete({
			where: { id: req.params.id },
		});

		res.json({ data: deletedUpdate });
	} catch (e) {
		next(e);
	}
};
