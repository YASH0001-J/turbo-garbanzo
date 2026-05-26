import { createUser, getUserByEmail, getUserById } from '../models/User.js';
import { comparePassword, generateToken, COOKIE_MAX_AGE_MS } from '../utils/auth.js';
import { sendSuccess, sendError, handleError } from '../utils/errorHandler.js';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return sendError(res, 400, 'Email already registered');
    }

    // Create user
    const user = await createUser(name, email, password, role);
    const token = generateToken(user.id, user.role);

    // Set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE_MS,
    });

    sendSuccess(res, { user }, 'User registered successfully', 201);
  } catch (error) {
    handleError(error, res);
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Temporary bypass for DB authentication during deployment testing
    if (process.env.BYPASS_DB_AUTH === 'true') {
      const mockId = `mock-${Date.now()}`;
      const mockName = (email && email.split('@')[0]) || 'Test User';
      const mockRole = 'member';
      const mockUser = {
        id: mockId,
        name: mockName,
        email,
        role: mockRole,
      };

      const token = generateToken(mockUser.id, mockUser.role, { name: mockUser.name, email: mockUser.email });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE_MS,
      });

      // Also return the token in the response body so deployed frontends
      // that can't read httpOnly cookies during testing can still use it.
      return sendSuccess(res, { user: mockUser, token }, 'Login successful (bypass)');
    }

    // Find user
    const user = await getUserByEmail(email);
    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    // Set httpOnly cookie for session
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE_MS,
    });

    sendSuccess(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, 'Login successful');
  } catch (error) {
    handleError(error, res);
  }
};

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    // If bypassing DB, construct user from token payload
    if (process.env.BYPASS_DB_AUTH === 'true') {
      const userFromToken = req.user || {};
      const mockUser = {
        id: userFromToken.userId || `mock-${Date.now()}`,
        name: userFromToken.name || 'Test User',
        email: userFromToken.email || 'test@example.com',
        role: userFromToken.role || 'member',
      };
      return sendSuccess(res, mockUser);
    }

    const user = await getUserById(req.user.userId);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    sendSuccess(res, user);
  } catch (error) {
    handleError(error, res);
  }
};

// Logout (client-side token deletion)
export const logoutUser = (req, res) => {
  sendSuccess(res, null, 'Logged out successfully');
};
