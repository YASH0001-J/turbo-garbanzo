import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME || 'zym_dashboard',
  waitForConnections: true,
  connectionLimit: 10,
});

export const query = async (sql, params = []) => {
  const [result] = await pool.execute(sql, params);
  if (Array.isArray(result)) {
    return { rows: result };
  }
  return {
    rows: [],
    insertId: result.insertId,
    affectedRows: result.affectedRows,
  };
};

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    console.error('   Database unavailable. If this is unexpected, check DB credentials and network connectivity.');
    // Do NOT exit the process here. Return false so the caller can decide how to proceed.
    return false;
  }
};

export default pool;
