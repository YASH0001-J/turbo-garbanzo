import { comparePassword, generateToken } from '@/lib/server/auth';
import { jsonError, jsonInternalError, jsonSuccess } from '@/lib/server/api-response';
import { getUserByEmail } from '@/lib/server/models/user';
import { validateLogin } from '@/lib/server/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationError = validateLogin(body);
    if (validationError) return jsonError(validationError, 400);

    const { email, password } = body as { email: string; password: string };

    const user = await getUserByEmail(email);
    if (!user) return jsonError('Invalid email or password', 401);

    const isValidPassword = await comparePassword(password, user.password as string);
    if (!isValidPassword) return jsonError('Invalid email or password', 401);

    const token = generateToken(user.id as number, user.role as string);

    return jsonSuccess(
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      'Login successful'
    );
  } catch (error) {
    console.error('Login error:', error);
    return jsonInternalError(error as Error);
  }
}
