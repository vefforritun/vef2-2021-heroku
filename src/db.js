import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {
  DATABASE_URL: connectionString,
  NODE_ENV: nodeEnv = 'development',
} = process.env;

console.log('process.env :>> ', process.env.DATABASE_URL);

if (!connectionString) {
  console.error('Vantar DATABASE_URL!');
  process.exit(1);
}

// Notum SSL tengingu við gagnagrunn ef við erum *ekki* í development mode, þ.e.a.s. á local vél
const ssl = nodeEnv !== 'development' ? { rejectUnauthorized: false } : false;

const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  const client = await pool.connect();

  try {
    const result = await client.query(q, values);
    return result;
  } catch(e) {
    console.error('Error selecting', e);
  } finally {
    client.release();
  }
}
