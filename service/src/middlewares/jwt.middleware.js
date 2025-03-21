import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import catchAsync from '../utils/catch-async.js';
import CustomError from '../utils/error.js';
import User from '../users/users.model.js';

const jwtMiddleware = catchAsync(async (req, res, next) => {
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
  const freshUser = await User.findById(decoded.id);
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
});

export default jwtMiddleware;
