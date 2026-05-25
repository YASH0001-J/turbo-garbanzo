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
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    console.error('   Start MySQL in XAMPP Control Panel, then run: npm run migrate');
    process.exit(1);
  }
};

export default pool;
