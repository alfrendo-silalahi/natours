import mongoose from 'mongoose';
import dotenv from 'dotenv';
import log from './utils/logger.ts';

process.on('uncaughtException', (err: Error) => {
  log.error(err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

import app from './app.ts';

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE!)
  .then(() => log.info('DB connection successfully!'));

const port = process.env.PORT;
const server = app.listen(port, () => {
  log.info(`App running on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  log.error(err.message);
  server.close(() => {
    process.exit(1);
  });
});
