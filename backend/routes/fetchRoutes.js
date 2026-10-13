import express  from 'express';
import Authentication from '../middleware/auth.middleware.js';
import fetchController from '../controllers/api/fetchController.js';
const router = express.Router();

router.get('/rates', Authentication, fetchController.GetRates);

export default router;