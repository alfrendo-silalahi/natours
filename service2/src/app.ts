import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import CustomError from './utils/error.ts'; //IN PROGRESS
import tourRouter from './tours/tours.route.ts'; //IN PROGRESS
import userRouter from './users/users.route.ts'; //IN PROGRESS
import globalErrorHandler from './errors/errors.controller.ts'; //IN PROGRESS
import authRouter from './auth/auth.route.ts'; //IN PROGRESS

const app: Express = express();

// 1) Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2) Routes
app.use('/api/check-health', (req: Request, res: Response): void => {
  res.json({ status: 'OK' });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// Handle route yang tidak didefinisikan
// Hanya akan dieksekusi jika path sebelumnya tidak ada yang sesuai
// Dalam hal ini misalnya /tours atau /users
app.all('*', (req: Request, res: Response, next: NextFunction) => {
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
