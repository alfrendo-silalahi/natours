import Tour from './tours.model.js';
import { APIFeatures } from '../../utils/util.js';
import CustomError from '../../utils/error.js';
import log from '../../utils/logger.js';
import pool from '../../config/postgres.config.js';
import { randomUUID } from 'crypto';
import slugify from 'slugify';

export const aliasTopTours = (req, _res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

export const getAllTours = async (req, res, _next) => {
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
};

export const createTour = async (req, res, _next) => {
  const tourReq = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const query = `
      INSERT INTO tours (id, name, slug, duration, max_group_size, difficulty, price, summary, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const params = [
      randomUUID(),
      tourReq.name,
      slugify(tourReq.name),
      tourReq.duration,
      tourReq.maxGroupSize,
      tourReq.difficulty,
      tourReq.price,
      tourReq.summary,
      tourReq.description,
    ];
    await client.query(query, params);
    await client.query('COMMIT');

    res.status(201).json({
      status: 'success',
    });
  } catch (err) {
    log.error(err.message);
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const getTour = async (req, res, _next) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    const response = await client.query(
      `
      SELECT *
      FROM tours
      WHERE id = $1 AND is_deleted = FALSE
      `,
      [id],
    );

    const tour = response.rows[0];

    if (!tour) {
      throw new CustomError(`No tour found with id ${id}`, 404);
    }
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (err) {
    log.error(err.message);
    throw err;
  } finally {
    client.release();
  }
};

export const updateTour = async (req, res, _next) => {
  const { id } = req.params;
  const tourReq = req.body;

  const client = await pool.connect();

  try {
    // get tour
    const result = await client.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM tours
        WHERE id = $1 AND is_deleted = FALSE
      )
      `,
      [id],
    );

    const tour = result.rows[0];

    if (!tour.exists) {
      throw new CustomError(`No tour found with id ${id}`, 404);
    }

    // update tour
    await client.query('BEGIN');
    const query = `
      UPDATE tours
      SET name = $2,
          slug = $3,
          duration = $4,
          max_group_size = $5,
          difficulty = $6,
          price = $7,
          summary = $8,
          description = $9
      WHERE id = $1
    `;
    const params = [
      id,
      tourReq.nae,
      slugify(tourReq.name),
      tourReq.duration,
      tourReq.maxGroupSize,
      tourReq.difficulty,
      tourReq.price,
      tourReq.summary,
      tourReq.description,
    ];
    await client.query(query, params);
    await client.query('COMMIT');

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    log.error(err.message);
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const deleteTour = async (req, res, _next) => {
  const { id } = req.params;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM tours
        WHERE id = $1 AND is_deleted = FALSE
      )
      `,
      [id],
    );

    const tour = result.rows[0];
    if (!tour.exists) {
      throw new CustomError(`No tour found with id ${id}`, 404);
    }

    await client.query(
      `
      UPDATE tours
      SET is_deleted = TRUE
      WHERE id = $1
      `,
      [id],
    );

    await client.query('COMMIT');

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    log.error(err.message);
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const getTourStats = async (_req, res, _next) => {
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
};

export const getMonthlyPlan = async (req, res, _next) => {
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
};
