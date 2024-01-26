const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
// exports.resetPasswordToken = async (req, res) => {
// 	try {
// 		const email = req.body.email;
// 		const user = await User.findOne({ email: email });
// 		if (!user) {
// 			return res.json({
// 				success: false,
// 				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
// 			});
// 		}
// 		const token = crypto.randomBytes(20).toString("hex");

// 		const updatedDetails = await User.findOneAndUpdate(
// 			{ email: email },
// 			{
// 				token: token,
// 				resetPasswordExpires: Date.now() + 3600000,
// 			},
// 			{ new: true }
// 		);
// 		console.log("DETAILS", updatedDetails);

// 		const url = `http://localhost:3000/update-password/${token}`;

// 		await mailSender(
// 			email,
// 			"Password Reset",
// 			`Your Link for email verification is ${url}. Please click this url to reset your password.`
// 		);

// 		res.json({
// 			success: true,
// 			message:
// 				"Email Sent Successfully, Please Check Your Email to Continue Further",
// 		});
// 	} catch (error) {
// 		return res.json({
// 			error: error.message,
// 			success: false,
// 			message: `Some Error in Sending the Reset Message`,
// 		});
// 	}
// };
exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us. Enter a Valid Email `,
            });
        }

        // Nodemailer Configuration
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace with your email service provider
            auth: {
				user: 'studynotionme@gmail.com',
                pass: 'kyxhketokxbzrdyn',
            },
        });

        // Generate Token
        const token = crypto.randomBytes(20).toString('hex');

        // Update User Details
        const updatedDetails = await User.findOneAndUpdate(
            { email },
            {
                token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            { new: true }
        );

        console.log('User Details Updated:', updatedDetails);

        // Generate URL
        const url = `http://localhost:3000/update-password/${token}`;
        console.log('Generated URL:', url);

        // Send Email
        const mailOptions = {
            from: 'studynotionme@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Your Link for email verification is ${url}. Please click this URL to reset your password.`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email Sent Successfully:', info.response);

        res.json({
            success: true,
            message: 'Email Sent Successfully, Please Check Your Email to Continue Further',
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.json({
            error: error.message,
            success: false,
            message: 'Some Error in Sending the Reset Message',
        });
    }
};



exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};