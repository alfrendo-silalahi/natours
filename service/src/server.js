import mongoose from 'mongoose';
import dotenv from 'dotenv';
import log from './utils/logger.js';

dotenv.config({ path: './.env' });

import app from './app.js';

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => log.info('DB connection successfully!'))
  .catch((err) => log.error(`DB connection error:  ${err}`));

const port = process.env.PORT;
app.listen(port, () => {
  log.info(`App running on port ${port}`);
});
