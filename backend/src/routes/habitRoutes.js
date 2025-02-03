import { Router } from 'express';
import { createHabit, getHabits, updateHabit, completeHabit, deleteHabit } from '../controllers/habit.controller.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const habitRoute = Router();

// Apply auth middleware for all habit routes
habitRoute.use(verifyUser);

habitRoute.route('/').post(createHabit).get(getHabits).put(updateHabit);
habitRoute.route('/:id').delete(deleteHabit);
habitRoute.route('/:id/complete').patch(completeHabit);

export default habitRoute;