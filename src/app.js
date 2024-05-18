import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express from 'express';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import tourRouter from './tours/tours.route.js';
import userRouter from './users/users.route.js';

const app = express();

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '0.0.1',
      description: 'API Documentation for Express.js application',
    },
    servers: [
      {
        url: `http://localhost:8000`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/**/*.route.js'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// 1) Middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(express.static('./public'));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
