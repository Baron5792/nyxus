import express from 'express';

const router = express.Router();
/**
 * import validators
 */
import registerValidator from '../validator/registerValidator.js';
import registerController from '../controllers/auth/Register.js';
import loginValidator from '../validator/loginValidator.js';
import loginController from '../controllers/auth/login.js';

/**
 * Route controller
 */
router.post('/register', registerValidator, registerController);
router.post('/login', loginValidator, loginController);

export default router;