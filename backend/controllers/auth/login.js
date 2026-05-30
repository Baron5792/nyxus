import User from "../../model/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const loginController = async (req, res) => {
    const { email, password } = req.body;

    /**
     * verify if email exist
     * verify if password matches
     * create a JWT token for authenticated user
     */

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(403).json({ success: false, message: 'Incorrect email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ success: false, message: 'Incorrect email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        })

        return res.status(200).json({ success: true, message: 'Login successful' })
    }

    catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
        console.error('Login error: ', error);
    }
}

export default loginController;