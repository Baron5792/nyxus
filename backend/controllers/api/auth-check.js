import express from 'express';
import Authentication from '../../middleware/auth.middleware.js';
import User from '../../model/User.js';
const router = express.Router();

router.get('/check_client_authentication', Authentication, async(req, res) => {
    const id = req.user.id;
    if (!id) {
        console.error('Check auth authentication error');
        return res.status(401).json({ success: false, message: 'Not authenticated' })
    }

    try {
        const verifyAuth = await User.findById(id);
        if (!verifyAuth) {
            return res.status(401).json({ success: false, message: 'Access denied' });
        }

        return res.status(200).json({ success: true, message: 'Success', data: verifyAuth });
    }

    catch (error) {
        console.error('Check auth error: ', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

export default router;