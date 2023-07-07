import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const createJwt = (user: { id: any; username: any }) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		// @ts-ignore
		process.env.JWT_SECRET
	);
	return token;
};

// @ts-ignore
export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: 'Not Authorized' });
		return;
	}

	const [, token] = bearer.split(' ');

	if (!token) {
		res.status(401);
		res.json({ message: 'Invalid Token' });
		return;
	}

	try {
		// @ts-ignore
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (e) {
		console.log(e);
		res.status(401);
		res.json({ message: 'Token Unverifiable' });
		return;
	}
};
// @ts-ignore
export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

// @ts-ignore
export const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};
