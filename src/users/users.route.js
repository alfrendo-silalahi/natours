import express from 'express';

import * as userController from './users.controller.js';
import { checkParamId } from './users.middleware.js';

const userRouter = express.Router();

userRouter.param('id', checkParamId);

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;
