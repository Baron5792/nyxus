import { OAuth2Client } from 'google-auth-library';
import User from '../../model/User.js';
import jwt from 'jsonwebtoken';
import { randomInt } from 'node:crypto';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const GoogleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: 'Token is required' });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const { sub, email, name, picture, email_verified } = payload;

        if (!email_verified) {
            return res.status(403).json({ success: false, message: 'Unverified google token' });
        };

        let user = await User.findOne({ email });

        if (user) {
            if (user.password && !user.googleId) {
                return res.status(400).json({ success: false, message: 'This account is not linked to Google OAuth' })
            }

            if (user.googleId && user.googleId !== sub) {
                return res.status(400).json({ success: false, message: 'This account is linked to another Google account' })
            }
        }        

        else {
            /** 
             * Verify that a different account doesnt use the googleId
             * Generate Username
             * Generate card number
             * Generate CVC number
             * Generate new referral code
             * Generate expiry date
             */

            const generateUsername = (fullName) => {
                const baseName = (fullName || 'user') .toLowerCase() .replace(/[^a-z0-9]/g, '').slice(0, 8) || 'user'; 
                return `@${baseName}_${randomInt(1000, 10000)}`;
            }
            const username = generateUsername(name);
            // End of generate username

            const generateCardNumber = () => {
                let cardNumber = "";
                for (let i = 0; i <= 16; i++) {
                    cardNumber += Math.floor(Math.random() * 10);
                }
                return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
            };
            const appCardNumber = generateCardNumber();
            // End of generate card number

            const generateCVC = () => {
                return Math.floor(100 + Math.random() * 900);
            }
            // End of generate CVC number

            const generateReferralCode = () => { 
                return `nyx${randomInt(100000, 1000000)}`; 
            };
            const newRefCode = generateReferralCode();
            // End of generate new referral code

            const expiryDate = () => {
                const now = new Date();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = String(now.getFullYear() + 1).slice(-2);

                return `${month}/${year}`;
            };
            // End of expiry date

            const generateAccountID = [];
            for (let i = 0; i < 5; i++) {
                const generateValue = Math.floor(Math.random() * 100);
                generateAccountID.push(generateValue);
            }
            const accountID = generateAccountID.join("");
            // End of account ID

            user = await User.create({
                email: email,
                fullname: name,
                avatar: picture,
                googleId: sub,
                username: username,
                cardNumber: appCardNumber,
                cvcNumber: generateCVC(),
                referralCode: newRefCode,
                expiryDate: expiryDate(),
                accountId: accountID
            })
        }

        // Generate a new JWT token for the user
        const JWTtoken = jwt.sign({
            id: user._id,
            email: user.email,
            fullname: user.fullname,
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', JWTtoken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        })

        return res.status(200).json({ success: true, message: 'Google login successful', user: user });
    }

    catch (err) {
        console.error("Error: ", err);
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
}

export default GoogleLogin;