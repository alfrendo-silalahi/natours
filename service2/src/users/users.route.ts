import express, { Router } from 'express';

import * as userController from './users.controller.ts';

const userRouter: Router = express.Router();

userRouter.get('/', userController.getAllUsers);

export default userRouter;
