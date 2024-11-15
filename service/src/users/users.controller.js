import catchAsync from '../utils/catch-async.js';
import CustomError from '../utils/error.js';
import User from './users.model.js';

export const signup = catchAsync(async (req, res, next) => {
  const userReq = req.body;

  // check if password and passwordConfirm is same or not
  if (userReq.password !== userReq.passwordConfirm) {
    throw new CustomError('password and passwordConfirm not same', 404);
  }

  const newUser = await User.create({
    name: userReq.name,
    email: userReq.email,
    password: userReq.password,
  });

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});
