import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import CustomError, {
  AuthenticationError,
  ResourceNotFoundError,
} from '../../utils/error.js';
import User from '../users/users.model.js';
import redisClient from '../../config/redis.config.js';
import { sendEmail } from '../../config/smtp.config.js';
import mongoose from 'mongoose';

const roles = {
  USER: 'user',
};

const signToken = (userId) =>
  jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

export const signUp = async (req, res) => {
  const userReq = req.body;

  // check if password and passwordConfirm is same or not
  if (userReq.password !== userReq.passwordConfirm) {
    throw new CustomError('password and passwordConfirm not same', 400);
  }

  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    // Create new user into database
    await User.create(
      [
        {
          name: userReq.name,
          email: userReq.email,
          password: userReq.password,
          role: roles.USER,
        },
      ],
      { session },
    );

    const signUpVerifyCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const cacheKey = `sign_up_verify_code:${userReq.email}`;
    await redisClient.setEx(cacheKey, 86400, signUpVerifyCode);

    await sendEmail({
      email: userReq.email,
      subject: 'Your sign up verification code (valid for 24 hours)',
      message: `Verification code: ${signUpVerifyCode}`,
    });
  });

  res.status(201).json({
    status: 'success',
  });
};

export const verifySignUpEmail = async (req, res) => {
  const { email, signUpVerifyCode } = req.body;

  const user = await findUser(email, { includePassword: false });

  const cacheKey = `sign_up_verify_code:${user.email}`;
  const cacheSignUpVerifyCode = await redisClient.get(cacheKey);

  if (!cacheSignUpVerifyCode)
    throw new CustomError('There is no sign up verify code from cache.', 401);

  if (signUpVerifyCode !== cacheSignUpVerifyCode)
    throw new CustomError('Sign up verify code invalid.', 401);

  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    user.active = true;
    await user.save({ session });

    await redisClient.del(cacheKey);
    await sendEmail({
      email: user.email,
      subject: 'Welcome to Natours',
      message: 'Welcome to Natours',
    });
  });

  res.status(200).json({
    status: 'success',
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser(email);

  const correct = await user.correctPassword(password, user.password);
  if (!correct) throw new AuthenticationError();

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findUser(email, { includePassword: false });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const redisOtpKey = `otp:${user.id}`;
  await redisClient.setEx(redisOtpKey, 300, otp);

  await sendEmail({
    email: user.email,
    subject: 'Your password reset OTP (valid for 5 min)',
    message: `OTP: ${otp}`,
  });

  res.status(200).json({
    status: 'success',
    message: 'check your email for reset password otp',
  });
};

export const validateForgotPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await findUser(email, { includePassword: false });

  const redisOtpKey = `otp:${user.id}`;
  const otpCache = await redisClient.get(redisOtpKey);

  if (otpCache !== otp)
    throw new AuthenticationError('Invalid validate forgot password OTP.', 400);

  await redisClient.del(redisOtpKey);

  const resetPasswordToken = crypto.randomUUID().toString();
  const redisResetPasswordTokenKey = `reset_password_token:${user.id}`;
  await redisClient.setEx(redisResetPasswordTokenKey, 300, resetPasswordToken);

  res.status(200).json({
    status: 'success',
    message: 'OTP valid',
    data: {
      resetPasswordToken,
    },
  });
};

export const resetPassword = async (req, res) => {
  const { email, resetPasswordToken, newPassword } = req.body;

  const user = await findUser(email, { includePassword: false });

  const redisResetPasswordTokenKey = `reset_password_token:${user.id}`;
  const resetPasswordTokenCache = await redisClient.get(
    redisResetPasswordTokenKey,
  );
  if (resetPasswordTokenCache !== resetPasswordToken)
    throw new CustomError('Invalid reset password token!', 400);

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  await redisClient.del(redisResetPasswordTokenKey);

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
  });
};

export const updatePassword = async (req, res) => {
  const { email, password, passwordConfirm, newPassword, newPasswordConfirm } =
    req.body;

  if (password !== passwordConfirm)
    throw new CustomError('password and passwordConfirm not same', 400);

  if (newPassword !== newPasswordConfirm)
    throw new CustomError('newPassword and newPasswordConfirm not same', 400);

  const user = await findUser(email);

  const correct = await user.correctPassword(password, user.password);
  if (!correct) throw new CustomError('Current password invalid', 400);

  user.password = newPassword;
  user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
  });
};

const findUser = async (email, opt = { includePassword: true }) => {
  let query = User.findOne({
    email: {
      $eq: email,
    },
  });

  if (opt.includePassword) {
    query = query.select('+password');
  }

  const user = await query;
  if (!user) throw new ResourceNotFoundError('user', 'email', email);

  return user;
};
