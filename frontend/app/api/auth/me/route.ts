import { jsonError, jsonInternalError, jsonSuccess } from '@/lib/server/api-response';
import { getUserById } from '@/lib/server/models/user';
import { requireAuth } from '@/lib/server/request-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const auth = requireAuth(request);
    if (auth instanceof Response) return auth;

    const user = await getUserById(auth.userId);
    if (!user) return jsonError('User not found', 404);

    return jsonSuccess(user);
  } catch (error) {
    console.error('Get me error:', error);
    return jsonInternalError(error as Error);
  }
}
