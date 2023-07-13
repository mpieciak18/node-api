import merge from 'lodash.merge';

// make sure NODE_ENV is declared
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.STAGE || 'local';

let envConfig;

if (stage === 'production') {
	envConfig = require('./prod').default;
} else if (stage === 'testing') {
	envConfig = require('./testing').default;
} else {
	envConfig = require('./local').default;
}

export const config = merge(
	{
		stage,
		env: process.env.NODE_ENV,
		port: 3001,
		secrets: {
			jwt: process.env.JWT_SECRET,
			dbUrl: process.env.DATABASE_URL,
		},
	},
	envConfig
);
