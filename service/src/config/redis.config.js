import { createClient } from 'redis';
import log from '../utils/logger.js';

const redisClient = createClient();

redisClient.on('error', (err) => log.error(err.message));

await redisClient.connect();
log.info('Redis connected successfully');

export default redisClient;
