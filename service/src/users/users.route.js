import express from 'express';

import * as userController from './users.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.patch('/update-me', protect, userController.updateMe);
userRouter.delete('/delete-me', protect, userController.deleteMe);

export default userRouter;
