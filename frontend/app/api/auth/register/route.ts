import { generateToken } from '@/lib/server/auth';
import { jsonError, jsonInternalError, jsonSuccess } from '@/lib/server/api-response';
import { createUser, getUserByEmail } from '@/lib/server/models/user';
import { validateRegister } from '@/lib/server/validation';
import type { UserRole } from '@/lib/auth-service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationError = validateRegister(body);
    if (validationError) return jsonError(validationError, 400);

    const { name, email, password, role } = body as {
      name: string;
      email: string;
      password: string;
      role: UserRole;
    };

    const existingUser = await getUserByEmail(email);
    if (existingUser) return jsonError('Email already registered', 400);

    const user = await createUser(name, email, password, role);
    const token = generateToken(user.id, user.role);

    return jsonSuccess({ token, user }, 'User registered successfully', 201);
  } catch (error) {
    console.error('Register error:', error);
    return jsonInternalError(error as Error);
  }
}
