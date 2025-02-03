import { Router } from 'express';
import { getMotivationalQuotes, suggestHabit } from '../controllers/aifeatures.controller.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const aiRoutes = Router();

aiRoutes.use(verifyUser);

aiRoutes.route('/suggest-habit').post(suggestHabit);
aiRoutes.route('/get-motivational-quotes').get(getMotivationalQuotes);

export default aiRoutes;
