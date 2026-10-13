import express from 'express';
const router = express.Router();
import Authentication from '../middleware/auth.middleware.js';
import UpdateController from '../controllers/api/UpdateController.js';

router.post('/change-password', Authentication, UpdateController.ChangePassword);
router.patch('/currency', Authentication, UpdateController.ChangeCurrency);

export default router;