import mysql, { Pool, type RowDataPacket, type ExecuteValues } from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: Pool | undefined;
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME || 'zym_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
  });
}

const pool = global.mysqlPool ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  global.mysqlPool = pool;
}

export async function query<T = RowDataPacket>(
  sql: string,
  params: ExecuteValues = []
) {
  const [result] = await pool.execute(sql, params);
  if (Array.isArray(result)) {
    return { rows: result as T[] };
  }
  const header = result as mysql.ResultSetHeader;
  return {
    rows: [] as T[],
    insertId: header.insertId,
    affectedRows: header.affectedRows,
  };
}

export default pool;
