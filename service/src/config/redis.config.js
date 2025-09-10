import { createClient } from 'redis';
import log from '../utils/logger.js';

const { NODE_ENV } = process.env;

const redisClient = createClient();

redisClient.on('error', (err) => {
  if (err instanceof AggregateError) {
    log.error('Redis AggregateError occurred');
    err.errors.forEach((e) => {
      log.error(e.code);
    });
  }
  if (NODE_ENV === 'prod') process.exit(1);
});

redisClient.on('reconnecting', () => log.info('Redis reconnecting...'));

redisClient.on('connect', () => log.info('Redis connected successfully'));

await redisClient.connect();

export default redisClient;
