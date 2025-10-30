import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import CustomError from '../utils/error.js';
import log from '../utils/logger.js';
import db from '../config/mongodb.config.js';
import { ObjectId } from 'mongodb';

const usersCollection = db.collection('users');

export const protect = async (req, res, next) => {
  // 1) Get token from Authorization header
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    throw new CustomError('Authorization invalid', 401);
  }
  const token = req.headers.authorization.substring(7);

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const freshUser = await usersCollection.findOne(
    {
      _id: new ObjectId(decoded.id),
    },
    {
      projection: {
        _id: 1,
        name: 1,
        email: 1,
        passwordChangedAt: 1,
      },
    },
  );

  if (!freshUser)
    throw new CustomError(
      'The token belonging to this user does no longer exist',
      401,
    );

  // 4) Check if user changed password after token was issued
  if (freshUser.passwordChangedAt) {
    const passwordChangedAt = new Date(freshUser.passwordChangedAt);
    const changedTimestamp = passwordChangedAt.getTime() / 1000;

    if (decoded.iat < changedTimestamp) {
      throw new CustomError(
        'User recently changed password, please sign in again.',
        401,
      );
    }
  }

  // Grant access to protected route
  req.user = freshUser;

  next();
};

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    log.info(roles);
    if (!roles.includes(req.user.role)) {
      throw new CustomError(
        'You do not have permission to perform this action',
        403,
      );
    }
    next();
  };
