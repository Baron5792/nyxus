import express from 'express';

const router = express.Router();

const registerValidator = async(req, res, next) => {
    const { fullname, email, phone, password, confirmPassword, referralCode } = req.body;

    if (
        !fullname?.trim() ||
        !phone?.trim() ||
        !email?.trim() ||
        !password ||
        !confirmPassword
    ) {
        return res.status(400).json({ success: false, message: 'All fields are required to proceed' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    next();
}

export default registerValidator;