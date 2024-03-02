import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express from 'express';
import morgan from 'morgan';

import tourRouter from './tours/tours.route.js';
import userRouter from './users/users.route.js';

const app = express();

// 1) Middlewares
app.use(express.json());
app.use(express.static('./public'));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
