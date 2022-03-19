import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/User';
import authRoutes from './routes/Auth';

import { CORS_ORIGINS } from './config';
const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(cookieParser());
// dev middlewares
let isDev = false;
if (isDev) {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

export default app;
