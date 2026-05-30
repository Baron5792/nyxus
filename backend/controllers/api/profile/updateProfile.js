import User from "../../../model/User.js";

const profileController = async (req, res) => {
    const { fullname, username, email, phone, dob, address, city, state, postal_code, country_code } = req.body;

    const id = req.user.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const updateUser = await User.updateOne(
        {
            _id: id
        },
        {
            $set: {
                fullname: fullname,
                username: username,
                email: email,
                phone: phone,
                dob: dob,
                residentialAddress: address,
                city: city,
                state: state,
                postalCode: postal_code,
                countryCode: country_code
            }
        })

        if (updateUser.modifiedCount === 0) {
            return res.status(400).json({ success: false, message: 'Failed to update profile' });
        }

        return res.status(200).json({ success: true, message: 'success' });
    }

    catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default profileController;