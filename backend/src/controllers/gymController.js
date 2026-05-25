import { createGym, getGymById, getGymByOwner, getAllGyms, updateGym, deleteGym } from '../models/Gym.js';
import { sendSuccess, sendError, handleError } from '../utils/errorHandler.js';

// Create Gym
export const createGymController = async (req, res) => {
  try {
    const owner_id = req.user.userId;
    const gym = await createGym(owner_id, req.body);
    sendSuccess(res, gym, 'Gym created successfully', 201);
  } catch (error) {
    handleError(error, res);
  }
};

// Get Gym by ID
export const getGymController = async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await getGymById(id);

    if (!gym) {
      return sendError(res, 404, 'Gym not found');
    }

    sendSuccess(res, gym);
  } catch (error) {
    handleError(error, res);
  }
};

// Get All Gyms (for Super Admin)
export const getAllGymsController = async (req, res) => {
  try {
    const gyms = await getAllGyms();
    sendSuccess(res, gyms);
  } catch (error) {
    handleError(error, res);
  }
};

// Get Gym by Owner
export const getOwnerGymController = async (req, res) => {
  try {
    const owner_id = req.user.userId;
    const gym = await getGymByOwner(owner_id);

    if (!gym) {
      return sendError(res, 404, 'No gym found for this owner');
    }

    sendSuccess(res, gym);
  } catch (error) {
    handleError(error, res);
  }
};

// Update Gym
export const updateGymController = async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await updateGym(id, req.body);

    if (!gym) {
      return sendError(res, 404, 'Gym not found');
    }

    sendSuccess(res, gym, 'Gym updated successfully');
  } catch (error) {
    handleError(error, res);
  }
};

// Delete Gym
export const deleteGymController = async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await deleteGym(id);

    if (!gym) {
      return sendError(res, 404, 'Gym not found');
    }

    sendSuccess(res, null, 'Gym deleted successfully');
  } catch (error) {
    handleError(error, res);
  }
};
