import { query } from '../config/database.js';

export const createGym = async (owner_id, gymData) => {
  const { name, address, city, state, postal_code, phone, email, website } = gymData;
  const { insertId } = await query(
    `INSERT INTO gyms (owner_id, name, address, city, state, postal_code, phone, email, website)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [owner_id, name, address, city, state, postal_code, phone, email, website]
  );

  const { rows } = await query('SELECT * FROM gyms WHERE id = ?', [insertId]);
  return rows[0];
};

export const getGymById = async (id) => {
  const { rows } = await query('SELECT * FROM gyms WHERE id = ?', [id]);
  return rows[0] || null;
};

export const getGymByOwner = async (owner_id) => {
  const { rows } = await query('SELECT * FROM gyms WHERE owner_id = ?', [owner_id]);
  return rows[0] || null;
};

export const getAllGyms = async () => {
  const { rows } = await query('SELECT * FROM gyms ORDER BY created_at DESC');
  return rows;
};

export const updateGym = async (id, updates) => {
  const { name, address, city, state, postal_code, phone, email, website, is_active } = updates;
  await query(
    `UPDATE gyms SET name = ?, address = ?, city = ?, state = ?, postal_code = ?,
     phone = ?, email = ?, website = ?, is_active = ? WHERE id = ?`,
    [name, address, city, state, postal_code, phone, email, website, is_active ?? 1, id]
  );

  const { rows } = await query('SELECT * FROM gyms WHERE id = ?', [id]);
  return rows[0] || null;
};

export const deleteGym = async (id) => {
  const gym = await getGymById(id);
  if (!gym) return null;

  await query('DELETE FROM gyms WHERE id = ?', [id]);
  return { id: gym.id };
};
