import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import app from './app.js';

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connection successfully!'))
  .catch((err) => console.log(`DB connection error:  ${err}`));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
