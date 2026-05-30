import express from 'express';
import Authentication from '../../../middleware/auth.middleware.js';
const router = express.Router();

router.post('/update-avatar', Authentication, async (req, res) => {
    console.log(req.body);
    return;
    const id = req.user.id;
    const { avatar } = req.body;
    try {
        
    }

    catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

export default router;