import * as user from '../users';

describe('user handler', () => {
	test('should create a new user', async () => {
		const req = { body: { username: 'hello', password: 'hi' } };
		const res = {
			// @ts-ignore
			json({ token }) {
				expect(token).toBeTruthy();
			},
		};
		await user.createNewUser(req, res, () => {});
	});
});
