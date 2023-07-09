import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';

app.listen(3001, () => {
	console.log('hello on http://localhost:3001');
});

process.on('uncaughtException', () => {
	console.log('uncaught exception (sync) at top level of node process');
});

process.on('unhandledRejection', () => {
	console.log('unhandled rejection (async) at top level of node process');
});
