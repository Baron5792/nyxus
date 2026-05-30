import express from 'express';
import Authentication from '../../../middleware/auth.middleware.js';
import User from '../../../model/User.js';
const router = express.Router();

router.post('/balance-display', Authentication, async (req, res) => {
    const id = req.user.id;

    if (!id) {
        return res.status(401).json({ success: false, message: 'Access denied' });
    }

    const { value } = req.body;

    try {
        if (value === undefined || value === null) {
            return res.status(400).json({ success: false, message: 'Invalid JSON format' });
        }

        /**
         * update current status
         */
        const update = await User.updateOne({
            displayBalance: value
        })

        if (!update) {
            return res.status(400).json({ success: false, message: 'Something went wrong' });
        }

        return res.status(200).json({ success: true, message: 'success' });
    }

    catch (error) {
        console.error('Balance Display: ', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

export default router;