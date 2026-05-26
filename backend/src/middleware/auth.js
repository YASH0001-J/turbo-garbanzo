import { verifyToken } from '../utils/auth.js';

export const authenticateToken = (req, res, next) => {
  // If bypass is enabled, do not require DB or strict token validation.
  if (process.env.BYPASS_DB_AUTH === 'true') {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // try to read from cookies header (if httpOnly cookie is used)
    const cookieHeader = req.headers['cookie'] || '';
    const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
    const cookieToken = match ? match[1] : null;

    const rawToken = token || cookieToken;
    const decoded = rawToken ? verifyToken(rawToken) : null;

    if (decoded) {
      req.user = decoded;
    } else {
      // Provide a mock user so protected routes work without DB
      req.user = {
        userId: process.env.BYPASS_USER_ID || `mock-${Date.now()}`,
        role: process.env.BYPASS_ROLE || 'super_admin',
        name: process.env.BYPASS_NAME || 'Test User',
        email: process.env.BYPASS_EMAIL || 'test@example.com',
      };
    }
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // try to read from cookies header (if httpOnly cookie is used)
    const cookieHeader = req.headers['cookie'] || '';
    const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
    if (match) {
      req.token = match[1];
    }
    if (!req.token) {
      return res.status(401).json({ message: 'Access token required' });
    }
  }

  const decoded = verifyToken(token || req.token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded;
  next();
};

export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };
};
