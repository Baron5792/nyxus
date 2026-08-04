import express from 'express';
import Authentication from '../../../middleware/auth.middleware.js';
import upload from '../../../middleware/auth.multer.js';
const router = express.Router();
import fs from 'fs/promises'
import User from '../../../model/User.js';

router.post('/update-avatar', Authentication, upload.single('avatar'), async (req, res) => {
    const id = req.user.id;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const allowedTypes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/webp'
        ]

        if (!allowedTypes.includes(req.file.mimetype)) {
            await fs.unlink(req.file.path);
            return res.status(400).json({ success: false, message: 'Invalid file type. Only jpg, jpeg, png, and webp are allowed.' });
        }

        if (req.file.size > 4 * 1024 * 1024) {
            await fs.unlink(req.file.path);
            return res.status(400).json({ success: false, message: 'File size exceeds the 4MB limit.' });
        }

        const filename = req.file.filename;
        const avatarUrl = `${filename}`;

        const updateImg = await User.findByIdAndUpdate(
            id,
            {
                avatar: avatarUrl
            }
        )

        if (!updateImg) {
            await fs.unlink(req.file.path);
            return res.status(404).json({ success: false, message: 'An error occured while processing your request' });
        }

        return res.status(200).json({ success: true, message: 'Avatar updated successfully' });
    }

    catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

export default router;