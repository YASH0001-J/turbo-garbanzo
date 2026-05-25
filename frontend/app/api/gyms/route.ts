import { jsonError, jsonInternalError, jsonSuccess } from '@/lib/server/api-response';
import { createGym, getAllGyms } from '@/lib/server/models/gym';
import { requireAuth, requireRole } from '@/lib/server/request-auth';
import { validateGym } from '@/lib/server/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const auth = requireAuth(request);
    if (auth instanceof Response) return auth;

    const roleError = requireRole(auth, ['super_admin']);
    if (roleError) return roleError;

    const gyms = await getAllGyms();
    return jsonSuccess(gyms);
  } catch (error) {
    console.error('Get gyms error:', error);
    return jsonInternalError();
  }
}

export async function POST(request: Request) {
  try {
    const auth = requireAuth(request);
    if (auth instanceof Response) return auth;

    const roleError = requireRole(auth, ['gym_owner']);
    if (roleError) return roleError;

    const body = await request.json();
    const validationError = validateGym(body);
    if (validationError) return jsonError(validationError, 400);

    const gym = await createGym(auth.userId, body);
    return jsonSuccess(gym, 'Gym created successfully', 201);
  } catch (error) {
    console.error('Create gym error:', error);
    return jsonInternalError();
  }
}
