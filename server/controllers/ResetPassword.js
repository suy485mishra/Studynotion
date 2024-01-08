const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//reset p/w token
exports.resetPasswordToken = async (req, res) => {
  try {
    //fetch email
    const email = req.body.email;

    //check user for this email
    const user = await User.findOne({ email: email });
    //validate
    if (!user) {
      return res.json({
        success: false,
        message: "Your Email isnot registered",
      });
    }

    //generate token
    const token = crypto.randomUUID(); //inbuilt now

    //update user by adding token & expiration time
    const updatedDetails = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, //5 min
      },
      { new: true } //isse updated details return hoga
    );

    //create URL--frontend ka
    const url = `https://localhost:3000/update-password/${token}`;

    //send mail containing the url
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link:${url}`
    );

    //return response
    return res.json({
      successs: true,
      message: "Email Sent Successfuly!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      successs: false,
      message: "Something went wrong while resetting password",
    });
  }
};

//reset password actual function

exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body; //fronetend ne dala sari cheezein body pe
    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords are not matching, check again",
      });
    }

    //get userdetails from database using token
    const userDetails = await User.findOne({ token: token });

    //if no entry, token is invalis
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }
    //token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is expired, regenerate it",
      });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //pwd update
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    //return response
    return res.status(200).json({
      successs: true,
      message: "Password is successfully reset",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      successs: false,
      message: "Something went wrong while resetting password",
    });
  }
};
