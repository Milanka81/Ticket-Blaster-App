const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

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
