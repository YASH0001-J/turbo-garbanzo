import { jsonSuccess } from '@/lib/server/api-response';

export const runtime = 'nodejs';

export async function GET() {
  return jsonSuccess({ status: 'API is running' });
}
