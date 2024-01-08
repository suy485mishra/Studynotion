const User = require("../models/User");
const OTP = require("../models/OTP");
// const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//otp
exports.sendOTP = async (req, res) => {
  try {
    //fetching email
    const { email } = req.body;

    //checking if user already exists
    const checkUserPresent = await User.findOne({ email });

    //if yes, then return resposne
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    //otherwise generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP Generated", otp);

    //check if generated otp or not, if not make it unique
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    //unique otp generated now save it
    const otpPayload = { email, otp };
    //creating entry
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    //return response successful
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signup
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    ///validate for emptiness
    if (
      !firstName ||
      !email ||
      !lastName ||
      !otp ||
      !password ||
      !confirmPassword
    ) {
      return res.status(403).json({
        successs: false,
        message: "All fields are required",
      });
    }

    //match passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        successs: false,
        message: "Password and ConfirmPassword doesnt match,Please try again!",
      });
    }

    //check if user already exists kya
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        successs: false,
        message: "User is already registered",
      });
    }

    //there can be many otps, so find the recentmost one
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);

    //validate otp
    if (recentOtp.length == 0) {
      return res.status(400).json({
        successs: false,
        message: "OTP Not found",
      });
    } else if (otp !== recentOtp) {
      //invalid otp
      return res.status(400).json({
        successs: false,
        message: "Invalid Otp",
      });
    }

    //if matches
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create entry in db
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      //fetching profile pic from an api
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //return response
    return res.status(400).json({
      successs: true,
      message: "User is Registered!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      successs: false,
      message: "User cannot be registered!!",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //get data
    const { email, password } = req.body;

    //validation data
    if (!email || !password) {
      return res.status(403).json({
        successs: false,
        message: "All fields are required!",
      });
    }
    //check user exists or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        successs: false,
        message: "User is not Registered, Signup please",
      });
    }
    //generate jwt, after comparing passwords
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        role: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      //CREATE COOKIE and add it in response & send it
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    }
    //password doesn't match
    else {
      return res.status(401).json({
        successs: false,
        message: "Incorrect Password!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      successs: false,
      message: "Login Failure,please try again",
    });
  }
};

//CHANGE PASSWORD
exports.changePassword = async (req, res) => {};
