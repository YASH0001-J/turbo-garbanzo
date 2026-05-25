import type { UserRole } from '@/lib/auth-service';

const ROLES: UserRole[] = ['super_admin', 'gym_owner', 'trainer', 'member'];

export function validateRegister(body: Record<string, unknown>): string | null {
  if (!body.name || typeof body.name !== 'string') return 'Name is required';
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return 'Valid email is required';
  }
  if (!body.password || typeof body.password !== 'string' || body.password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (!body.role || !ROLES.includes(body.role as UserRole)) return 'Invalid role';
  return null;
}

export function validateLogin(body: Record<string, unknown>): string | null {
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return 'Valid email is required';
  }
  if (!body.password || typeof body.password !== 'string') return 'Password is required';
  return null;
}

export function validateGym(body: Record<string, unknown>): string | null {
  if (!body.name || typeof body.name !== 'string') return 'Gym name is required';
  if (!body.address || typeof body.address !== 'string') return 'Address is required';
  if (!body.city || typeof body.city !== 'string') return 'City is required';
  return null;
}
