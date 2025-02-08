import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express from 'express';
import morgan from 'morgan';

import CustomError from './utils/error.js';
import tourRouter from './tours/tours.route.js';
import userRouter from './users/users.route.js';
import globalErrorHandler from './errors/errors.controller.js';
import authRouter from './auth/auth.route.js';

const app = express();

// 1) Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// Handle route yang tidak didefinisikan
// Hanya akan dieksekusi jika path sebelumnya tidak ada yang sesuai
// Dalam hal ini misalnya /tours atau /users
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // apapun yang dimasukkan ke dalam next() akan dianggap sebagai error, dan akan dilempar ke global error handler
  next(new CustomError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
