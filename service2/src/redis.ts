import { createClient, RedisClientType } from 'redis';
import log from './utils/logger.ts';

const redisClient: RedisClientType = createClient();

redisClient.on('error', (err: Error): void => {
  log.error(err.message);
});

await redisClient.connect();
log.info('Redis connected successfully');

export default redisClient;
