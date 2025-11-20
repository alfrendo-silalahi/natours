import CustomError from '../../utils/error.js';
import log from '../../utils/logger.js';
import pool from '../../config/postgres.config.js';
import { randomUUID } from 'crypto';
import slugify from 'slugify';

export const getAllTours = async (req, res) => {
  const { page = 1, size = 10 } = req.query;

  const client = await pool.connect();
  try {
    const result = await client.query(
      `
        SELECT * FROM tours
        WHERE is_deleted = FALSE
        LIMIT $1
        OFFSET ($2 - 1) * $3
    `,
      [size, page, size],
    );

    const tours = result.rows;

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    log.error(err.message);
    throw err;
  } finally {
    client.release();
  }
};

export const createTour = async (req, res) => {
  const tourReq = req.body;

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

export const getTour = async (req, res) => {
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

export const updateTour = async (req, res) => {
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

export const deleteTour = async (req, res) => {
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

export const getTourStats = async (_req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT UPPER(difficulty) AS difficulty,
        COUNT(*)::int AS "numTours",
        COALESCE(SUM(ratings_quantity)::int, 0) AS "numRatings",
        AVG(ratings_average) AS "avgRating",
        AVG(price) AS "avgPrice",
        MIN(price) AS "minPrice",
        MAX(price) AS "maxPrice"
      FROM tours
      WHERE is_deleted = FALSE AND ratings_average >= 4.5
      GROUP BY UPPER(difficulty)
      ORDER BY "avgPrice" ASC
      `);
    const stats = result.rows;
    res.status(200).json({ status: 'success', stats });
  } catch (err) {
    log.error(err.message);
    throw err;
  } finally {
    client.release();
  }
};

// FUTURE: get monthly plan
