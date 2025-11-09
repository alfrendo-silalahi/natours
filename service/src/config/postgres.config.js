import pg from 'pg';
import log from '../utils/logger.js';

const { Pool } = pg;

const PG_DATABASE = process.env.PG_DATABASE;
const pool = new Pool({
  connectionString: PG_DATABASE,
});

pool.on('error', (err, _client) => {
  log.error(err.message);
  process.exit(1);
});

export default pool;
