import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import CustomError from './utils/error.js';
import tourRouter from './tours/tours.route.js';
import userRouter from './users/users.route.js';
import globalErrorHandler from './errors/errors.controller.js';
import authRouter from './auth/auth.route.js';

const app = express();

// 1) Middlewares
// User Morgan for logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'POST,GET,PUT,DELETE,PATCH',
  }),
);

// JSON parser
app.use(express.json());

// 2) Routes
app.use('/api/check-health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, _res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
