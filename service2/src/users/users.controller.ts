import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catch-async.ts';
import User, { IUser } from './users.model.ts';

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users: IUser[] = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  },
);
