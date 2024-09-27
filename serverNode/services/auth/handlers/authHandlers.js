const User = require("./../../../src/users/userSchema");
const mongoose = require("mongoose");
const sendEmail = require("../../users/utils/email");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { createSendToken } = require("../utils/createSendToken");

exports.register = async (req, res) => {
  const { fullName, email, password, passwordConfirm, clientUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email is already in use" });
    }
    const newUser = await User.create({
      fullName,
      email,
      password,
      passwordConfirm,
    });

    const verificationToken = newUser.createVerificationToken(newUser._id);
    newUser.verificationToken = verificationToken;
    await newUser.save({ validateBeforeSave: false });

    const verificationURL = `${clientUrl.origin}/verify-email/${verificationToken}`;

    const message = `<h3>Welcome, ${newUser.fullName}!</h3>
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
      newUser.verificationToken = undefined;
      await newUser.save({ validateBeforeSave: false });
      res.status(500).json({ status: "error sending email" });
    }
  } catch (error) {
    let errorsStr = "";
    if (error instanceof mongoose.Error.ValidationError) {
      for (let field in error.errors) {
        errorsStr += "\n" + error.errors[field].properties.message;
      }
    }
    const errorMessages = errorsStr.trim();
    return res.status(400).json({ message: errorMessages || error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    if (user.isVerified)
      return res
        .status(400)
        .json({ message: "User has already been verified" });

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid)
      return res.status(401).json({
        status: "failed",
        message: "Incorrect credentials",
      });

    createSendToken(user, 200, res);
  } catch (error) {
    let errorsStr = "";
    if (error instanceof mongoose.Error.ValidationError) {
      for (let field in error.errors) {
        errorsStr += "\n" + error.errors[field].properties.message;
      }
    }
    const errorMessages = errorsStr.trim();
    return res.status(400).json({ message: errorMessages || error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email, clientUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Wrong or invalid email, try again!" });
    }
    const resetToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${clientUrl.origin}/reset-password/${resetToken}`;

    const message = `<h3>Hello, ${user.fullName}!</h3>
    <p>To reset your password go to this link:</p>
    <a href=${resetURL}>Reset your password</a>`;

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
  } catch (error) {
    res.status(400).send(err.message);
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
