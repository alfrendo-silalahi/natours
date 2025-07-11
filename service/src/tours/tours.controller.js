import Tour from './tours.model.js';
import { APIFeatures } from '../utils/util.js';
import catchAsync from '../utils/catch-async.js';
import CustomError from '../utils/error.js';

export const aliasTopTours = (req, _res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

export const getAllTours = catchAsync(async (req, res, _next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const tours = await features.query;

  // Send response
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

export const createTour = catchAsync(async (req, res, _next) => {
  const tour = new Tour(req.body);
  const newTour = await tour.save();
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

export const getTour = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);
  if (!tour) {
    throw new CustomError(`No tour found with id ${id}`, 404);
  }
  res.status(200).json({ status: 'success', data: { tour } });
});

export const updateTour = catchAsync(async (req, res, _next) => {
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

export const deleteTour = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const tour = await Tour.findOneAndDelete({ _id: id });

  if (!tour) {
    throw new CustomError(`No tour found with id ${id}`, 404);
  }

  res.status(200).json({
    status: 'success',
  });
});

export const getTourStats = catchAsync(async (_req, res, _next) => {
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
});

export const getMonthlyPlan = catchAsync(async (req, res, _next) => {
  const year = parseInt(req.params.year);
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
});
