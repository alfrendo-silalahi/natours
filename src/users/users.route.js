import express from 'express';

import * as userController from './users.controller.js';
// import { checkParamId } from './users.middleware.js';

const userRouter = express.Router();

//userRouter.param('id', checkParamId);

userRouter.post('/signup', userController.signup);

export default userRouter;
