const User = require("./../../../src/users/userSchema");
const sendEmail = require("../../users/utils/email");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { createSendToken } = require("../utils/createSendToken");

exports.register = async (req, res) => {
  const { fullName, email, password, passwordConfirm } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const newUser = await User.create({
      fullName,
      email,
      password,
      passwordConfirm,
    });

    const verificationToken = newUser.createVerificationToken(newUser._id);
    newUser.verificationToken = verificationToken;
    await newUser.save({ validateBeforeSave: false });

    const verificationURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verify-email/${verificationToken}`;

    const message = `To verify your email address go to this link: ${verificationURL}`;
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
      newUser.verificationToken = undefined;
      await newUser.save({ validateBeforeSave: false });
      res.status(500).json({ status: "error sending email" });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(401).json({
        status: "failed",
        message: "Both email and password must be provided",
      });

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(401).json({
        status: "failed",
        message: "Incorrect credentials",
      });

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email doesn't exist" });
    }
    const resetToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${resetToken}`;

    const message = `To reset your password go to this link: ${resetURL}`;
    try {
      await sendEmail({ email, subject: "Your password reset token", message });
      res.status(200).json({
        status: "success",
        message: "Password reset token has been sent to your email",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(500).json({ status: "error sending email" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, passwordConfirm } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (password !== passwordConfirm) {
      return res.status(404).json({ message: "Passwords doesn't match" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email doesn't exist" });
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).send(err);
  }
};
