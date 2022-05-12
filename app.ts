import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/User';
import authRoutes from './routes/Auth';
import sessionRoutes from './routes/Session';
import categoryRoutes from './routes/Session/Category';
import nomineeRoutes from './routes/Session/Nominee';
import voteRoutes from './routes/Session/Vote';

import { CORS_ORIGINS } from './config';
const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(cookieParser());
app.use(express.static('public'));

// dev middlewares
let isDev = false;
if (isDev) {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/session/category/nominee', nomineeRoutes);
app.use('/api/v1/session/category/vote', voteRoutes);
app.use('/api/v1/session/category', categoryRoutes);
app.use('/api/v1/session', sessionRoutes);

export default app;