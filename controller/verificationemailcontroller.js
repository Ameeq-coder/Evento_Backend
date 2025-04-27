const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Users = require('../models/user');

require('dotenv').config({ path: `${process.cwd()}/.env` });

// 💥 Temporary store for verification codes
const verificationCodes = {}; // { "email@example.com": "123456" }

// 💌 Function to send verification email
const sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email" });
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString(); // 6 digit code

        // store code temporarily
        verificationCodes[email] = verificationCode;

        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Verification Code for Evento',
            html: `<h2>Your verification code is: <strong>${verificationCode}</strong></h2>`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            message: 'Verification code sent successfully. Also check Spam Folder.', 
            code: verificationCode // (only for testing, remove later)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send verification email.' });
    }
};

// ✅ Function to verify the code
const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!verificationCodes[email]) {
            return res.status(400).json({ message: "No verification code sent to this email." });
        }

        if (verificationCodes[email] !== code) {
            return res.status(400).json({ message: "Invalid verification code." });
        }

        // Code matches, update user
        await Users.update(
            { emailVerified: true },
            { where: { email } }
        );

        // Remove code from memory
        delete verificationCodes[email];

        res.status(200).json({ message: "Email verified successfully." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to verify code.' });
    }
};

module.exports = { sendVerificationEmail, verifyCode };
