import { verifyToken, type TokenPayload } from './auth';
import { jsonError } from './api-response';

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  return authHeader.split(' ')[1] ?? null;
}

export function requireAuth(request: Request): TokenPayload | Response {
  const token = getTokenFromRequest(request);
  if (!token) {
    return jsonError('Access token required', 401);
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return jsonError('Invalid or expired token', 403);
  }
  return decoded;
}

export function requireRole(user: TokenPayload, allowedRoles: string[]): Response | null {
  if (!allowedRoles.includes(user.role)) {
    return jsonError('Unauthorized access', 403);
  }
  return null;
}
