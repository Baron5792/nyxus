const ProfileValidator = async (req, res, next) => {
    const { fullname, username, email, phone, dob, address, city, state, postal_code, country_code } = req.body;

    if (
        !fullname.trim() ||
        !username.trim() || 
        !email.trim() ||
        !phone.trim() ||
        !address.trim() ||
        !city.trim() ||
        !state.trim() ||
        !postal_code.trim() ||
        !country_code.trim()
    ) {
        return res.status(400).json({ success: false, message: 'Fill every required field to proceed' });
    }
    next();
}

export default ProfileValidator;