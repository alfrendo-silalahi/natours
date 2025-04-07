import express, { Router } from 'express';

import * as userController from './users.controller.ts'; //TODO

const userRouter: Router = express.Router();

userRouter.get('/', userController.getAllUsers);

export default userRouter;
