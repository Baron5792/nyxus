import express from 'express';
import User from '../../model/User.js';
const router = express.Router();
import bcrypt from 'bcryptjs';

const registerController = async(req, res) => {
    const { fullname, phone, email, password, confirmPassword, referralCode } = req.body;

    try {
        /**
         * Verify users details
         * check if email already exist
         * hash the password
         * create an account ID
         * create a unique username
         * create a card number
         * create a card CVC number
         * create an expiry date
         * create referral ID
         * Validate inputed referral ID if found
         * create a new account
         */
        const confirmExistence = await User.findOne({ email: email });
        if (confirmExistence) {
            return res.status(400).json({ success: false, message: 'Email address exist already' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const generateAccountID = [];
        for (let i = 0; i < 5; i++) {
            const generateValue = Math.floor(Math.random() * 100);
            generateAccountID.push(generateValue);
        }
        const accountID = generateAccountID.join("");

        const generateUsername = (fullName) => {
            const name = fullName
            .toLowerCase()
            .replace(/\s+/g,"");

            const shortenedName = name.slice(0, 8);
            let randomNumbers = Math.floor(1000, Math.random() * 9000);
            return `@${shortenedName}_${randomNumbers}`;
        }
        const username = generateUsername(fullname);

        const generateCardNumber = () => {
            let cardNumber = "";
            for (let i = 0; i <= 16; i++) {
                cardNumber += Math.floor(Math.random() * 10);
            }
            return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
        };
        const appCardNumber = generateCardNumber();
    
        const generateCVC = () => {
            return Math.floor(100 + Math.random() * 900);
        }
        const appCVCNumber = generateCVC();

        const expiryYear = new Date().getFullYear() + 1;
        const betterYearFormat = expiryYear.slice(0, 2);
        const expiryMonth = new Date().getMonth();
        const expiryDate = `${expiryMonth}/${betterYearFormat}`;

        const newReferralCode = () => {
            return Math.floor(100 + Math.random() * 900);
        }
        const newRefCode = newReferralCode();

        if (referralCode.length > 0) {
            const verifyCode = await User.find({ refererID: referralCode });
            if (!verifyCode) {
                return res.status(400).json({ success: false, message: 'Invalid referral code' });
            }
        } 

        const newUser = new User({
            fullname: fullname,
            email: email,
            phone: phone,
            password: hashedPassword,
            accountId: accountID,
            username: username,
            cardNumber: appCardNumber,
            cvcNumber: appCVCNumber,
            referralCode: newRefCode,
            refererID: referralCode,
            expiryDate: expiryDate
        })

        await newUser.save();
        return res.status(201).json({ success: true, message: 'User created successfully' });
    }

    catch (error) {
        console.error(`Registration error: `, error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default registerController;