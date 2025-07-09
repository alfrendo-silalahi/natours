import mongoose from 'mongoose';
import app from './app.js';
import log from './utils/logger.js';

process.on('uncaughtException', (err) => {
  log.error(err.message);
  process.exit(1);
});

// MongoDB Connection
await mongoose.connect(process.env.DATABASE);
log.info('MongoDB connected successfully');

const port = process.env.PORT;
console.log(port);
console.log(process.env.DATABASE);
const server = app.listen(port, () => {
  log.info(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  log.error(err.message);
  server.close(() => {
    process.exit(1);
  });
});
