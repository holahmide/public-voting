/// <reference path="index.d.ts" />
import dotenv from 'dotenv';
import http from 'http';
import cloudinary from 'cloudinary';

import { PORT, INITIALIZE_DB } from './config';
import app from './app';

dotenv.config();

// Initialize database
(async () => {
  await INITIALIZE_DB();
})();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
  console.log(
    `The REST Server is ready at http://localhost:${process.env.PORT}`
  );
});
