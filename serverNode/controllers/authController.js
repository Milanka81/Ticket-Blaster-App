const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");
const { createSendToken } = require("../utils/createSendToken");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, passwordConfirm } = req.body;
    const user = await User.create({
      fullName,
      email,
      password,
      passwordConfirm,
    });
    createSendToken(user, 201, res);
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

    if (!user || !(await user.correctPassword(password, user.password)))
      return res.status(401).json({
        status: "failed",
        message: "Incorrect credentials",
      });

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
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
    )}/users/reset-password/${resetToken}`;

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
exports.resetPassword = async (req, res, next) => {
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

exports.updatePassword = async (req, res) => {
  const { oldPassword, password, passwordConfirm } = req.body;

  try {
    const user = await User.findById(req.userId).select("+password");
    if (!(await user.correctPassword(oldPassword, user.password))) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).send(err);
  }
};
