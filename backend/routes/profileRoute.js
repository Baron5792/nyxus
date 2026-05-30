import express from 'express';
const router = express.Router();

import ProfileValidator from '../validator/ProfileValidator.js';
import profileController from '../controllers/api/profile/updateProfile.js';
import Authentication from '../middleware/auth.middleware.js';

router.post('/update-profile', Authentication, ProfileValidator, profileController);

export default router;