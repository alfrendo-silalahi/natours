import express from 'express';

import * as authController from './auth.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import * as authValidator from './auth.validator.js';

const authRouter = express.Router();

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/sign-up-verify', authController.verifySignUpEmail);

authRouter.post(
  '/sign-in',
  authValidator.signInValidator,
  authController.signIn,
);

authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post(
  '/validate-forgot-password-otp',
  authController.validateForgotPasswordOtp,
);
authRouter.post('/reset-password', authController.resetPassword);
authRouter.post('/update-password', protect, authController.updatePassword);

export default authRouter;
