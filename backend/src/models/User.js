import { query } from '../config/database.js';
import { hashPassword } from '../utils/auth.js';

export const createUser = async (name, email, password, role) => {
  const hashedPassword = await hashPassword(password);
  const { insertId } = await query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );

  const { rows } = await query(
    'SELECT id, name, email, role FROM users WHERE id = ?',
    [insertId]
  );
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const { rows } = await query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
};

export const getUserById = async (id) => {
  const { rows } = await query(
    'SELECT id, name, email, role, profile_picture, is_active FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

export const updateUser = async (id, updates) => {
  const { name, phone, profile_picture } = updates;
  await query(
    'UPDATE users SET name = ?, phone = ?, profile_picture = ? WHERE id = ?',
    [name, phone, profile_picture, id]
  );

  const { rows } = await query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
};

export const userExists = async (email) => {
  const { rows } = await query('SELECT id FROM users WHERE email = ?', [email]);
  return rows.length > 0;
};
