const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.REACT_APP_MAIL,
    pass: process.env.REACT_APP_PASS,
  },
  secure: true,
});

const mailData = {
  from: "youremail@gmail.com", // sender address
  to: "myfriend@gmail.com", // list of receivers
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  html: "<b>Hey there! </b>",
};

transporter.sendMail(mailData, function (err, info) {
  if (err) console.log(err);
  else console.log(info);
});
