import express from 'express';
import Authentication from '../../middleware/auth.middleware.js';
import User from '../../model/User.js';
const router = express.Router();

router.get('/middleware', Authentication, async(req, res) => {
    const id = req.user.id;

    if (!id) {
        return res.status(401).json({ success: false, message: 'Token ID not found' });
    }

    try {
        /**
         * fetch current users details
         */
        const userData = await User.findById(id);
        return res.status(200).json({ success: true, message: 'Authenticated successfully', data: userData });
    }

    catch (error) {
        console.error('Authentication error: ', error);
        return res.status(500).json({ success: false, message: 'Authentication error' });
    }
})

export default router;