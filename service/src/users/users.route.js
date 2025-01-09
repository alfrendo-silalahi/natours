import express from 'express';

import * as userController from './users.controller.js';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);

export default userRouter;
