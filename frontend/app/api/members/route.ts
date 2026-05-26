import { jsonError, jsonInternalError, jsonSuccess } from '@/lib/server/api-response';
import { createUser } from '@/lib/server/models/user';
import { query } from '@/lib/server/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const statsOnly = url.searchParams.get('stats') === '1' || url.searchParams.get('stats') === 'true';

    if (statsOnly) {
      const { rows: totalRows } = await query('SELECT COUNT(*) AS total FROM users WHERE role = ?', ['member']);
      const { rows: activeRows } = await query('SELECT COUNT(*) AS active FROM users WHERE role = ? AND is_active = 1', ['member']);
      // For now expired is 0 unless membership logic exists
      const total = (totalRows[0] as any).total ?? 0;
      const active = (activeRows[0] as any).active ?? 0;
      const expired = 0;
      return jsonSuccess({ total, active, expired }, 'Member stats');
    }

    const { rows } = await query('SELECT id, name, email, phone, profile_picture, is_active, created_at FROM users WHERE role = ? ORDER BY created_at DESC', ['member']);
    return jsonSuccess(rows, 'Members list');
  } catch (error) {
    console.error('Members GET error:', error);
    return jsonInternalError(error as Error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body as { name: string; email: string; password: string; phone?: string };
    if (!name || !email || !password) return jsonError('Name, email and password are required', 400);

    const user = await createUser(name, email, password, 'member');
    if (phone) {
      await query('UPDATE users SET phone = ? WHERE id = ?', [phone, user.id]);
    }
    return jsonSuccess(user, 'Member created', 201);
  } catch (error) {
    console.error('Members POST error:', error);
    return jsonInternalError(error as Error);
  }
}
