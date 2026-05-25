import { query } from '../db';
import { hashPassword } from '../auth';
import type { UserRole } from '@/lib/auth-service';

export async function createUser(name: string, email: string, password: string, role: UserRole) {
  const hashedPassword = await hashPassword(password);
  const { insertId } = await query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
    name,
    email,
    hashedPassword,
    role,
  ]);

  const { rows } = await query<{ id: number; name: string; email: string; role: string }>(
    'SELECT id, name, email, role FROM users WHERE id = ?',
    [insertId!]
  );
  return rows[0];
}

export async function getUserByEmail(email: string) {
  const { rows } = await query<Record<string, unknown>>('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] ?? null;
}

export async function getUserById(id: number) {
  const { rows } = await query<{ id: number; name: string; email: string; role: string }>(
    'SELECT id, name, email, role, profile_picture, is_active FROM users WHERE id = ?',
    [id]
  );
  return rows[0] ?? null;
}
