import express from 'express';

import * as tourController from './tours.controller.js';
// import * as tourMiddleware from './tours.middleware.js';

const tourRouter = express.Router();

// Not used anymore
// tourRouter.param('id', tourMiddleware.checkParamId);

tourRouter
  .route('/')
  /**
   * @swagger
   * /api/v1/tours:
   *   get:
   *     summary: Retrieve a list of tours
   *     responses:
   *       200:
   *         description: A list of tours
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  .get(tourController.getAllTours)
  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     summary: Retrieve a list of users
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  .post(tourController.createTour);
// .post(tourMiddleware.checkReqBody, tourController.createTour);

tourRouter
  .route('/:id')
  /**
   * @swagger
   * /api/v1/tours/{id}:
   *   get:
   *     summary: Retrieve tour by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The user id
   *     responses:
   *       200:
   *         description: A tour
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default tourRouter;
