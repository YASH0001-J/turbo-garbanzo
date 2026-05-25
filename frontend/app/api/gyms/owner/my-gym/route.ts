import { jsonError, jsonInternalError, jsonSuccess } from '@/lib/server/api-response';
import { getGymByOwner } from '@/lib/server/models/gym';
import { requireAuth, requireRole } from '@/lib/server/request-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const auth = requireAuth(request);
    if (auth instanceof Response) return auth;

    const roleError = requireRole(auth, ['gym_owner']);
    if (roleError) return roleError;

    const gym = await getGymByOwner(auth.userId);
    if (!gym) return jsonError('No gym found for this owner', 404);

    return jsonSuccess(gym);
  } catch (error) {
    console.error('Get owner gym error:', error);
    return jsonInternalError();
  }
}
