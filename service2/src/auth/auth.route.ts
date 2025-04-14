import express, { Router } from 'express';

import * as authController from './auth.controller.ts';
import { protect } from '../middlewares/auth.middleware.ts';

const authRouter: Router = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post(
  '/validate-forgot-password-otp',
  authController.validateForgotPasswordOtp,
);
authRouter.post('/reset-password', authController.resetPassword);
authRouter.post('/update-password', protect, authController.updatePassword);

export default authRouter;
