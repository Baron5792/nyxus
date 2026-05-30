import jwt from 'jsonwebtoken';

const Authentication = async(req, res, next) => {
    try {
        const token = req.cookies['token'] || res.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }

    catch (error) {
        console.error(error.message);
        return res.status(400).json({ success: false, message: 'Token is not valid' });
    }
}

export default Authentication;