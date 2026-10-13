import bcrypt from 'bcryptjs';
import User from '../../model/User.js';

const ChangePassword = async (req, res) => {
    const { current_password, new_password, confirm_new_password } = req.body;
    const userId = req.user.id;

    if (!current_password || !new_password || !confirm_new_password) {
        return res.status(400).json({ success: false, message: 'All fields are required to proceed' });
    }

    if (new_password !== confirm_new_password) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (new_password.length < 6) {
        return res.status(400).json({ success: false, message: 'New password must exceed 6 characters' });
    }

    try {
        /**
         * Check if confirm password matches
         * Hash new password and save
         */
        let user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }

        if (typeof user.password !== 'string' || !user.password) {
            return res.status(400).json({ success: false, message: 'This account uses social login and has no password to change' });
        }

        const verifyPassword = await bcrypt.compare(current_password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({ success: false, message: 'Current password does not match' });
        }

        const sameAsOldPassword = await bcrypt.compare(new_password, user.password);

        if (sameAsOldPassword) {
            return res.status(400).json({ success: false, message: 'Old password cannot be used as the new password' })
        }

        const newPassword = await bcrypt.hash(new_password, 10);

        await User.findByIdAndUpdate(userId, { password: newPassword });
        return res.status(200).json({ success: true, message: 'Password changed successfully' });
    }

    catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


/**
 * Change Currency
 */
const ALLOWED = ['USD', 'EUR', 'GBP', 'JPY'];
const ChangeCurrency = async (req, res) => {
    const { currency } = req.body;
    if (!ALLOWED.includes(currency)) {
        return res.status(400).json({ success: false, message: 'Unsupported currency' });
    }
    try {
        await User.findByIdAndUpdate(req.user.id, { Currency: currency });
        return res.status(200).json({ success: true, message: 'Currency updated successfully' });
    }

    catch (e) {
        return res.status(500).json({ success: false, message: 'An internal server error occured.' });
    }
}

const UpdateController = { ChangePassword, ChangeCurrency };

export default UpdateController;