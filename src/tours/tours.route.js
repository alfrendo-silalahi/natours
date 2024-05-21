import express from 'express';

import * as tourController from './tours.controller.js';
// import * as tourMiddleware from './tours.middleware.js';

const tourRouter = express.Router();

// Not used anymore
// tourRouter.param('id', tourMiddleware.checkParamId);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
// .post(tourMiddleware.checkReqBody, tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default tourRouter;
