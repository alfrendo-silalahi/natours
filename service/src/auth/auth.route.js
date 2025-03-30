import express from 'express';

import * as authController from './auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post(
  '/validate-forgot-password-otp',
  authController.validateForgotPasswordOtp,
);
authRouter.post('/reset-password', authController.resetPassword);

export default authRouter;
