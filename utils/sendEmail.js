"use strict";

const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER, // generated mailtrap user
        pass: process.env.EMAIL_PASSWORD, // generated mailtrap password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: options.email,
      subject: "Test Email",
      html: options.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
