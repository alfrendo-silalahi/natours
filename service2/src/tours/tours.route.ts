import express, { Router } from 'express';

import * as tourController from './tours.controller.ts'; //IN PROGRESS
import * as authMiddleware from '../middlewares/auth.middleware.js';
// import * as tourMiddleware from './tours.middleware.js';

const tourRouter: Router = express.Router();

// Not used anymore
// tourRouter.param('id', tourMiddleware.checkParamId);

tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter.route('/tour-stats').get(tourController.getTourStats);
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

tourRouter
  .route('/')
  .get(authMiddleware.protect, tourController.getAllTours)
  .post(tourController.createTour);
// .post(tourMiddleware.checkReqBody, tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

export default tourRouter;
