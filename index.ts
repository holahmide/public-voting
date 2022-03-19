/// <reference path="index.d.ts" />
import dotenv from 'dotenv';
import http from 'http';

import { PORT, INITIALIZE_DB } from './config';
import app from './app';

dotenv.config();

// Initialize database
(async () => {
	await INITIALIZE_DB();
  })();

const server = http.createServer(app);

// Start Serve
server.listen(PORT, () => {
	console.log(`The REST Server is ready at http://localhost:${process.env.PORT}`);
});
