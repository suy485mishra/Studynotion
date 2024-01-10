const mongoose = require("mongoose");
const mailSender=require('../utils/mailSender')
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

//function to send mails
async function sendVerificationEmail(email, otp) {
  // Create a transporter to send emails

	// Define the email options

	// Send the email
  try {
    const mailResponse = await mailSender(
      email,
      "Verification mail from Studynotion",
     emailTemplate(otp)
    );
    console.log("Email sent successfully", mailResponse.response);
  } catch (error) {
    console.log("error occurred while sending mails", error);
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});


module.exports = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
