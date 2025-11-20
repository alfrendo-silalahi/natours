import app from './app.js';
import log from './utils/logger.js';

process.on('uncaughtException', (err) => {
  log.error(err.message);
  process.exit(1);
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  log.info(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  log.error(err.message);
  server.close(() => {
    process.exit(1);
  });
});
