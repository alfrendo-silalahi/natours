import { createClient } from 'redis';
import log from './utils/logger.js';

const redisClient = createClient();

redisClient.on('error', (err) => log.error(err.message));

await redisClient.connect();
log.info('Redis connection successfully');

export default redisClient;
