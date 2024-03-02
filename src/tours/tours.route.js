import express from 'express';

import * as tourController from './tours.controller.js';
import { checkParamId } from './tours.middleware.js';

const tourRouter = express.Router();

tourRouter.param('id', checkParamId);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default tourRouter;
