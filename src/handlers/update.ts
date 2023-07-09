import prisma from '../db';

// Get all updates (for a user)
// @ts-ignore
export const getUpdates = async (req, res) => {
	const updates = await prisma.update.findMany({
		where: {
			product: {
				belongsToId: req.user.id,
			},
		},
	});

	res.json({ data: updates });
};

// Get one update
// @ts-ignore
export const getOneUpdate = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: update });
};

// Create one update
// @ts-ignore
export const createUpdate = async (req, res) => {
	const product = await prisma.product.findUnique({
		where: {
			id_belongsToId: {
				id: req.body.productId,
				belongsToId: req.user.id,
			},
		},
	});

	if (!product) {
		// does not belong to user
		res.status(403).json({
			message: 'product not found or not accessible by user',
		});
	}

	const update = await prisma.update.create({
		data: req.body,
	});

	res.json({ data: update });
};

// Update one update
// @ts-ignore
export const updateUpdate = async (req, res) => {
	const update = await prisma.update.findFirst({
		where: {
			id: req.params.id,
			product: {
				belongsToId: req.user.id,
			},
		},
	});

	if (!update) {
		// does not belong to user
		res.status(403).json({
			message: 'update not found or not accessible by user',
		});
	}

	const updatedUpdate = await prisma.update.update({
		where: { id: req.params.id },
		data: req.body,
	});

	res.json({ data: updatedUpdate });
};

// Delete one update
// @ts-ignore
export const deleteUpdate = async (req, res) => {
	const update = await prisma.update.findFirst({
		where: {
			id: req.params.id,
			product: {
				belongsToId: req.user.id,
			},
		},
	});

	if (!update) {
		// does not belong to user
		res.status(403).json({
			message: 'update not found or not accessible by user',
		});
	}

	const deletedUpdate = await prisma.update.delete({
		where: { id: req.params.id },
	});

	res.json({ data: deletedUpdate });
};
