import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
const COOKIE_MAX_AGE_MS = Number(process.env.COOKIE_MAX_AGE_MS) || 7 * 24 * 60 * 60 * 1000; // 7 days

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT Token
// Generate JWT Token. Accept optional extra payload to support test bypass.
export const generateToken = (userId, role, extra = {}) => {
  const payload = { userId, role, ...extra };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

// Verify JWT Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { JWT_EXPIRY, COOKIE_MAX_AGE_MS };
