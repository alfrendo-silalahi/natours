import { Request, Response, NextFunction } from 'express';

import Tour, { ITour, TourDoc } from './tours.model.ts'; //TODO
import { APIFeatures } from '../utils/util.ts'; //TODO
import catchAsync from '../utils/catch-async.ts'; //TODO
import CustomError from '../utils/error.ts'; //TODO
import { HydratedDocument } from 'mongoose';

export const aliasTopTours = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

export const getAllTours = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    const features: APIFeatures<TourDoc> = new APIFeatures(
      Tour.find(),
      req.query,
    )
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const tours: ITour[] = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  },
);

// TODO
export const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tour: HydratedDocument<TourDoc> = new Tour(req.body);
    const newTour: TourDoc = await tour.save();
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  },
);

// TODO
export const getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    if (!tour) {
      throw new CustomError(`No tour found with id ${id}`, 404);
    }
    res.status(200).json({ status: 'success', data: { tour } });
  },
);

// TODO
export const updateTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    throw new CustomError(`No tour found with id ${id}`, 404);
  }

  res.status(200).json({ status: 'success', data: { tour } });
});

// TODO
export const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const tour: TourDoc | null = await Tour.findOneAndDelete({ _id: id });

    if (!tour) {
      throw new CustomError(`No tour found with id ${id}`, 404);
    }

    res.status(200).json({
      status: 'success',
    });
  },
);

// TODO
export const getTourStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const stats = await Tour.aggregate([
      {
        $match: {
          ratingsAverage: {
            $gte: 4.5,
          },
        },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: {
            $sum: 1,
          },
          numRatings: {
            $sum: '$ratingsQuantity',
          },
          avgRating: {
            $avg: '$ratingsAverage',
          },
          avgPrice: {
            $avg: '$price',
          },
          minPrice: {
            $min: '$price',
          },
          maxPrice: {
            $max: '$price',
          },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
    ]);
    res.status(200).json({ status: 'success', stats });
  },
);

// TODO
export const getMonthlyPlan = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const year: number = parseInt(req.params.year);
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: '$startDates',
          },
          numTourStarts: {
            $sum: 1,
          },
          tours: {
            $push: '$name',
          },
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTourStarts: 1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    res.status(200).json({ status: 'success', plan });
  },
);
