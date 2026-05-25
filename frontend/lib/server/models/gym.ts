import { query } from '../db';

export async function createGym(owner_id: number, gymData: Record<string, unknown>) {
  const { name, address, city, state, postal_code, phone, email, website } = gymData;
  const { insertId } = await query(
    `INSERT INTO gyms (owner_id, name, address, city, state, postal_code, phone, email, website)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      owner_id,
      name as string,
      address as string,
      city as string,
      state as string | null,
      postal_code as string | null,
      phone as string | null,
      email as string | null,
      website as string | null,
    ]
  );

  const { rows } = await query('SELECT * FROM gyms WHERE id = ?', [insertId!]);
  return rows[0];
}

export async function getGymById(id: number | string) {
  const { rows } = await query('SELECT * FROM gyms WHERE id = ?', [id]);
  return rows[0] ?? null;
}

export async function getGymByOwner(owner_id: number) {
  const { rows } = await query('SELECT * FROM gyms WHERE owner_id = ?', [owner_id]);
  return rows[0] ?? null;
}

export async function getAllGyms() {
  const { rows } = await query('SELECT * FROM gyms ORDER BY created_at DESC');
  return rows;
}

export async function updateGym(id: number | string, updates: Record<string, unknown>) {
  const { name, address, city, state, postal_code, phone, email, website, is_active } = updates;
  await query(
    `UPDATE gyms SET name = ?, address = ?, city = ?, state = ?, postal_code = ?,
     phone = ?, email = ?, website = ?, is_active = ? WHERE id = ?`,
    [
      name as string,
      address as string,
      city as string,
      state as string | null,
      postal_code as string | null,
      phone as string | null,
      email as string | null,
      website as string | null,
      (is_active as number) ?? 1,
      id,
    ]
  );

  const { rows } = await query('SELECT * FROM gyms WHERE id = ?', [id]);
  return rows[0] ?? null;
}

export async function deleteGym(id: number | string) {
  const gym = await getGymById(id);
  if (!gym) return null;

  await query('DELETE FROM gyms WHERE id = ?', [id]);
  return { id: (gym as { id: number }).id };
}
