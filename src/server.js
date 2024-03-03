import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfully!'))
  .catch((err) => console.log(`DB connection error:  ${err}`));

import app from './app.js';

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
