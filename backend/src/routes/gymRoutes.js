import express from 'express';
import { body } from 'express-validator';
import {
  createGymController,
  getGymController,
  getAllGymsController,
  getOwnerGymController,
  updateGymController,
  deleteGymController,
} from '../controllers/gymController.js';
import { authenticateToken, authorize } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const gymValidation = [
  body('name').notEmpty().withMessage('Gym name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
];

// Routes
router.post(
  '/',
  authenticateToken,
  authorize(['gym_owner']),
  gymValidation,
  handleValidationErrors,
  createGymController
);

router.get('/', authenticateToken, authorize(['super_admin']), getAllGymsController);

router.get('/owner/my-gym', authenticateToken, authorize(['gym_owner']), getOwnerGymController);

router.get('/:id', authenticateToken, getGymController);

router.put(
  '/:id',
  authenticateToken,
  authorize(['gym_owner', 'super_admin']),
  gymValidation,
  handleValidationErrors,
  updateGymController
);

router.delete('/:id', authenticateToken, authorize(['gym_owner', 'super_admin']), deleteGymController);

export default router;
