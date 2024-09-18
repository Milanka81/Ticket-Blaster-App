const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "Tickets Blaster App",
      address: process.env.EMAIL_SENDER,
    },
    to: options.email,
    subject: options.subject,
    text: options.message,
    attachments: options.attachments || null,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("send to", info.response);
  });
};
module.exports = sendEmail;
