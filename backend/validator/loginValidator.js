const loginValidator = async (req, res, next) => {
    const { email, password } = req.body;

    if (
        !email ||
        !password
    ) {
        return res.status(400).json({ success: false, message: 'All fields are required to proceed' });
    }

    next();
}

export default loginValidator;