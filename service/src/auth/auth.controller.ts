import jwt, { Secret } from 'jsonwebtoken';

import catchAsync from '../utils/catch-async.js';
import CustomError from '../utils/error.js';
import User from '../users/users.model.js';
import { Request, Response, NextFunction } from 'express';

const signToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined!');
  }

  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    },
  );
};

type UserRequest = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userReq: UserRequest = req.body;

    // check if password and passwordConfirm is same or not
    if (userReq.password !== userReq.passwordConfirm) {
      throw new CustomError('password and passwordConfirm not same', 400);
    }

    const newUser = await User.create({
      name: userReq.name,
      email: userReq.email,
      password: userReq.password,
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
  },
);

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
