import { jsonError, jsonInternalError, jsonSuccess } from '@/lib/server/api-response';
import { deleteGym, getGymById, updateGym } from '@/lib/server/models/gym';
import { requireAuth, requireRole } from '@/lib/server/request-auth';
import { validateGym } from '@/lib/server/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = { params: { id: string } };

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const auth = requireAuth(request);
    if (auth instanceof Response) return auth;

    const gym = await getGymById(params.id);
    if (!gym) return jsonError('Gym not found', 404);

    return jsonSuccess(gym);
  } catch (error) {
    console.error('Get gym error:', error);
    return jsonInternalError();
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const auth = requireAuth(request);
    if (auth instanceof Response) return auth;

    const roleError = requireRole(auth, ['gym_owner', 'super_admin']);
    if (roleError) return roleError;

    const body = await request.json();
    const validationError = validateGym(body);
    if (validationError) return jsonError(validationError, 400);

    const gym = await updateGym(params.id, body);
    if (!gym) return jsonError('Gym not found', 404);

    return jsonSuccess(gym, 'Gym updated successfully');
  } catch (error) {
    console.error('Update gym error:', error);
    return jsonInternalError();
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const auth = requireAuth(request);
    if (auth instanceof Response) return auth;

    const roleError = requireRole(auth, ['gym_owner', 'super_admin']);
    if (roleError) return roleError;

    const gym = await deleteGym(params.id);
    if (!gym) return jsonError('Gym not found', 404);

    return jsonSuccess(null, 'Gym deleted successfully');
  } catch (error) {
    console.error('Delete gym error:', error);
    return jsonInternalError();
  }
}
