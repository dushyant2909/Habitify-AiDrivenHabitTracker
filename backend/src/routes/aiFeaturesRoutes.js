import { Router } from 'express';
import { suggestHabit } from '../controllers/aifeatures.controller.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const aiRoutes = Router();

aiRoutes.use(verifyUser);

aiRoutes.route('/suggest-habit').post(suggestHabit);

export default aiRoutes;
