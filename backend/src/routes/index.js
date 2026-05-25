import express from 'express';
import { body } from 'express-validator';
import authRoutes from './authRoutes.js';
import gymRoutes from './gymRoutes.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// API Routes
router.use('/auth', authRoutes);
router.use('/gyms', gymRoutes);

export default router;
