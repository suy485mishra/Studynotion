const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },

    });

    let info = await transporter.sendMail({
      from: "Suyash Mishra - StudyNotion", // sender address
      to: [email], // Use an array for multiple recipients
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.log("Error in mailSender", error.message);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

module.exports = mailSender;
