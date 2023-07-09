import prisma from '../db';
import { comparePasswords, createJwt, hashPassword } from '../modules/auth';

// @ts-ignore
export const createNewUser = async (req, res, next) => {
	try {
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				password: await hashPassword(req.body.password),
			},
		});
		const token = createJwt(user);
		res.json({ token });
	} catch (err) {
		// @ts-ignore
		err.type = 'input';
		next(err);
	}
};

// @ts-ignore
export const signIn = async (req, res) => {
	// First, find user by username
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		},
	});
	if (!user) {
		res.status(401);
		res.json({ message: 'Invalid Username or Password' });
		return;
	}
	// Second, compare passwords
	// @ts-ignore
	const isValid = await comparePasswords(req.body.password, user.password);
	if (!isValid) {
		res.status(401);
		res.json({ message: 'Invalid Username or Password' });
		return;
	}
	// Third, return auth token
	const token = createJwt(user);
	res.json({ token });
};
