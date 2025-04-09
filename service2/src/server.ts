import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.ts';
import log from './utils/logger.ts';

process.on('uncaughtException', (err: Error) => {
  log.error(err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

// MongoDB Connection
const database: string = process.env.DATABASE!;
await mongoose.connect(database);
log.info('MongoDB connected successfully');

const port: string = process.env.PORT || '3000';
const server = app.listen(port, (): void => {
  log.info(`App running on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  log.error(err.message);
  server.close(() => {
    process.exit(1);
  });
});
