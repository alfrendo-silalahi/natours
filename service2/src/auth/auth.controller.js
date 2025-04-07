import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import catchAsync from '../utils/catch-async.ts';
import CustomError from '../utils/error.ts';
import User from '../users/users.model.ts';
import redisClient from '../redis.ts';

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

export const signup = catchAsync(async (req, res, next) => {
  const userReq = req.body;

  // check if password and passwordConfirm is same or not
  if (userReq.password !== userReq.passwordConfirm) {
    throw new CustomError('password and passwordConfirm not same', 400);
  }

  const newUser = await User.create({
    name: userReq.name,
    email: userReq.email,
    password: userReq.password,
    role: userReq.role,
    // Temporary
    passwordChangedAt: userReq.passwordChangedAt,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password)
    throw new CustomError('Email and password required', 400);

  // 2) Check if user exists & password is correct
  // Menggunakan + untuk memaksa field tertentu tetap dimasukkan
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new CustomError('Incorrect email or password', 401);

  const correct = await user.correctPassword(password, user.password);
  if (!correct) throw new CustomError('Incorrect email or password', 401);

  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new CustomError('There is no user with email address', 404);

  // 2) Generate random reset
  // const resetToken = crypto.randomBytes(32).toString('hex');
  // const hashedToken = crypto
  //   .createHash('sha256')
  //   .update(resetToken)
  //   .digest('hex');

  // 2) Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // 3) Send to Redis
  await redisClient.setEx(`${user.id}_OTP`, 300, otp);

  // 4) Send it user email
  await sendEmail({
    email: user.email,
    subject: 'Your password reset OTP (valid for 5 min)',
    message: `OTP: ${otp}`,
  });

  res.status(200).json({
    status: 'success',
    messaage: 'check your email for reset password otp',
  });
});

export const validateForgotPasswordOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new CustomError('There is no user with email address', 404);

  const otpCache = await redisClient.get(`${user.id}_OTP`);

  if (otpCache !== otp) throw new CustomError('Invalid OTP!', 400);

  await redisClient.del(`${user.id}_OTP`);

  const resetPasswordToken = crypto.randomUUID().toString();
  await redisClient.setEx(
    `${user.id}_RESET_PASSWORD_TOKEN`,
    300,
    resetPasswordToken,
  );

  res.status(200).json({
    status: 'success',
    message: 'OTP valid',
    data: {
      resetPasswordToken,
    },
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { email, resetPasswordToken, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new CustomError('There is no user with email address', 404);

  const resetPasswordTokenCache = await redisClient.get(
    `${user.id}_RESET_PASSWORD_TOKEN`,
  );
  if (resetPasswordTokenCache !== resetPasswordToken)
    throw new CustomError('Invalid reset password token!', 400);

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  await redisClient.del(`${user.id}_RESET_PASSWORD_TOKEN`);

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
  });
});

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define email options
  const mailOptions = {
    from: 'natours@email.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send email
  await transporter.sendMail(mailOptions);
};
