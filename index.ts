/// <reference path="index.d.ts" />
import dotenv from 'dotenv';
import http from 'http';

import { PORT, INITIALIZE_DB, CORS_ORIGINS } from './config';
import app from './app';
import graphql from './graphql';

dotenv.config();

// Initialize database
(async () => {
  await INITIALIZE_DB();
})();

// Setup graphql
(async () => {
  await graphql.start();
  graphql.applyMiddleware({
    app,
    cors: {
      origin: CORS_ORIGINS,
      credentials: true,
      exposedHeaders: ['set-cookie']
    },
  });
})();

const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
  console.log(
    `The REST Server is ready at http://localhost:${PORT}`
  );
  console.log(
    `\n Graphql Server is ready at http://localhost:${PORT}/graphql`
  );
});
