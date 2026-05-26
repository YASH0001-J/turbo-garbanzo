import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Deployment-only: completely DB-free login route
router.post('/login', (req, res) => {
  // Accept any email/password and return mock response
  return res.status(200).json({
    success: true,
    token: 'mock-token',
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin',
    },
  });
});

// Deployment-only: completely DB-free register route
router.post('/register', (req, res) => {
  // Return a fake created user (no DB operations)
  const { name, email, role } = req.body || {};
  const user = {
    id: 1,
    name: name || 'Test User',
    email: email || 'test@example.com',
    role: role || 'admin',
  };
  return res.status(201).json({ success: true, user, token: 'mock-token' });
});

// Keep /me and logout using authenticateToken (middleware provides mock user when bypass enabled)
router.get('/me', authenticateToken, (req, res) => {
  const u = req.user || { userId: 1, name: 'Test User', email: 'test@example.com', role: 'admin' };
  return res.json({ success: true, user: { id: u.userId || 1, name: u.name, email: u.email, role: u.role } });
});

router.post('/logout', authenticateToken, (req, res) => {
  return res.json({ success: true, message: 'Logged out' });
});

export default router;
