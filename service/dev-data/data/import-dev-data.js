import { readFileSync } from 'node:fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

import Tour from '../../src/tours/tours.model.js';

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connection successfully!'))
  .catch((err) => console.log(`DB connection error:  ${err}`));

// Read JSON file
const tours = JSON.parse(readFileSync('./tours-simple.json', 'utf-8'));

// Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
