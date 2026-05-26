import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getCurrentUser, logoutUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['super_admin', 'gym_owner', 'trainer', 'member']).withMessage('Invalid role'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
// If BYPASS_DB_AUTH is enabled, skip validation for register as well
if (process.env.BYPASS_DB_AUTH === 'true') {
  router.post('/register', registerUser);
} else {
  router.post('/register', registerValidation, handleValidationErrors, registerUser);
}
// If BYPASS_DB_AUTH is enabled, accept any credentials (skip validation)
if (process.env.BYPASS_DB_AUTH === 'true') {
  router.post('/login', loginUser);
} else {
  router.post('/login', loginValidation, handleValidationErrors, loginUser);
}
router.get('/me', authenticateToken, getCurrentUser);
router.post('/logout', authenticateToken, logoutUser);

export default router;
