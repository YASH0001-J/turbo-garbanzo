import { jsonSuccess } from '@/lib/server/api-response';
import { requireAuth } from '@/lib/server/request-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth instanceof Response) return auth;

  return jsonSuccess(null, 'Logged out successfully');
}
