const User = require("../../../src/users/userSchema");
const mongoose = require("mongoose");
const sendEmail = require("../../users/utils/email");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/createToken");

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

    const verificationURL = `${clientUrl}/verify-email/${verificationToken}`;

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
exports.sendVerification = async (req, res) => {
  const { email, clientUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (user && !user.verificationToken) {
      return res
        .status(400)
        .json({ message: "This email has already been verified" });
    }
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
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save({ validateBeforeSave: false });
    res.status(200).json({ message: "Your email is successfully verified" });
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

    if (user.isVerified === false) {
      return res.status(401).json({
        status: "failed",
        message: "Please,verify your email",
      });
    }

    createToken(user, 200, res);
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

    const resetURL = `${clientUrl}/reset-password/${resetToken}`;

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
      return res.status(404).json({ message: "Invalid or expired token" });
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Your password has been changed" });
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.logout = (req, res) => {
  try {
    if (req.cookies["jwt"]) {
      res.cookie("jwt", req.cookies["jwt"], {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        sameSite: "Lax",
      });
      return res.status(200).json({ message: "Logged out successfully" });
    } else {
      return res
        .status(200)
        .json({ message: "You have already been logged out" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.isLoggedin = async (req, res) => {
  console.log(req.cookies);
  try {
    if (!req.cookies["jwt"]) {
      return res
        .status(200)
        .json({ loggedIn: false, message: "Not logged in" });
    }

    return res.status(200).json({ loggedIn: true, message: "Logged in" });
  } catch (error) {
    res.status(400).send(err);
  }
};
