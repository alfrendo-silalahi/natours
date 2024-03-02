import express from 'express';
import morgan from 'morgan';

import tourRouter from './tours/tours.route.js';
import userRouter from './users/users.route.js';

const app = express();

// 1) Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));

// 2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
