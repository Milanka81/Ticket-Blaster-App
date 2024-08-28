const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "Tickets Blaster App",
      address: process.env.EMAIL,
    },
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("send to", info.response);
  });
};
module.exports = sendEmail;
