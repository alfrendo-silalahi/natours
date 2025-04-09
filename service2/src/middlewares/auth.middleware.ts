import { Request, Response, NextFunction } from 'express';

import jwt, { SigningKeyCallback } from 'jsonwebtoken';
import { promisify } from 'util';
import catchAsync from '../utils/catch-async.ts';
import CustomError from '../utils/error.ts';
import User from '../users/users.model.ts';
import log from '../utils/logger.ts';

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorization: string | undefined = req.headers.authorization;

    // 1) Get token from Authorization header
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new CustomError('Authorization invalid', 401);
    }
    const token: string = authorization.substring(7);

    // 2) Verification token
    const jwtSecret: string = process.env.JWT_SECRET!;
    const decoded: SigningKeyCallback = await promisify(jwt.verify)(
      token,
      jwtSecret,
    );

    // 3) Check if user still exists
    const freshUser = await User.findById(decoded.idjwtSecret);
    if (!freshUser)
      throw new CustomError(
        'The token belonging to this user does no longer exist',
        401,
      );

    // 4) Check if user changed password after token was issued
    if (freshUser.changedPasswordAfter(decoded.iat))
      throw new CustomError(
        'User recently changed password, please login again!',
        401,
      );

    // Grant access to protected route
    req.user = freshUser;

    next();
  },
);

export const restrictTo =
  (...roles) =>
  (req: Request, res: Response, next: NextFunction) => {
    log.info(roles);
    if (!roles.includes(req.user.role)) {
      throw new CustomError(
        'You do not have permission to perform this action',
        403,
      );
    }
    next();
  };
