import { jsonError, jsonInternalError, jsonSuccess } from '@/lib/server/api-response';
import { query } from '@/lib/server/db';

export const runtime = 'nodejs';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!id) return jsonError('Invalid id', 400);
    await query('DELETE FROM users WHERE id = ? AND role = ?', [id, 'member']);
    return jsonSuccess(null, 'Member deleted');
  } catch (error) {
    console.error('Members DELETE error:', error);
    return jsonInternalError(error as Error);
  }
}
