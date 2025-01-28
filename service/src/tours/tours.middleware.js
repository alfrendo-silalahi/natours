import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catch-async.js';
import CustomError from '../utils/error.js';
import log from '../utils/logger.js';

export const protect = catchAsync(async (req, res, next) => {
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

  // 4) Check if user changed password after token was issued

  next();
});

export const checkParamId = (req, res, next, val) => {
  if (parseInt(val) < 0) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }
  next();
};

export const checkReqBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
    return;
  }
  next();
};
