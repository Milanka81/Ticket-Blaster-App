const sendEmail = require("../../users/utils/email");

const sendVerificationToken = async (user, clientUrl, res) => {
  const verificationToken = user.createVerificationToken(user._id);
  user.verificationToken = verificationToken;
  await user.save({ validateBeforeSave: false });

  const verificationURL = `${clientUrl}/verify-email/${verificationToken}`;

  const message = `<h3>Welcome, ${user.fullName}!</h3>
<p>Please confirm your email address by clicking on this link</p>
<a href=${verificationURL}> Verify email </a>`;

  try {
    await sendEmail({
      email,
      subject: "Please, verify your email address",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Verification link has been sent to your email",
    });
  } catch (err) {
    user.verificationToken = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ status: "error sending email" });
  }
};
module.exports = { sendVerificationToken };
