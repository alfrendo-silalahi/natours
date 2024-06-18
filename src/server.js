import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import app from './app.js';
import { logger } from './logger.js';

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => logger.info('DB connection successfully!'))
  .catch((err) => logger.error(`DB connection error:  ${err}`));

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`App running on port ${port}`);
});
