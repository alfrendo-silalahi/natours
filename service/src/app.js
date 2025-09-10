import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import CustomError from './utils/error.js';
import tourRouter from './modules/tours/tours.route.js';
import userRouter from './modules/users/users.route.js';
import globalErrorHandler from './errors/errors.controller.js';
import authRouter from './modules/auth/auth.route.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: 'POST, GET, PUT, DELETE, PATCH',
  }),
);

app.use(helmet());

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(
  rateLimit({
    limit: 100,
    windowMs: 15 * 60 * 1000,
    message: {
      error: 'Too many requests from this IP, please try again in 15 minutes!',
    },
  }),
);

app.use(express.json({ limit: '10kb' }));

// 2) Routes
app.use('/api/check-health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('/api/{*splat}', (req, _res) => {
  throw new CustomError(`Can't find ${req.originalUrl} on this server`, 404);
});

app.use(globalErrorHandler);

export default app;
