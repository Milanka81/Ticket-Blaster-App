const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../utils/email");
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
    const token = signToken(user._id);
    user.password = undefined;
    res.status(201).json({
      status: "success",
      message: "User created",
      token,
      data: { user },
    });
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

    const token = signToken(user._id);

    res.status(201).json({
      status: "success",
      message: "User logged in",
      token,
    });
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

    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/users/reset-password/${resetToken}}`;
    const resetURL = `http://localhost:8080/users/reset-password/${resetToken}`;

    const message = `Resset your password: ${resetURL}`;
    try {
      await sendEmail({ email, subject: "Your password reset token", message });

      res.status(200).json({ status: "success" });
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
exports.resetPassword = (req, res, next) => {};
