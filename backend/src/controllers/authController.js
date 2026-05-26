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
