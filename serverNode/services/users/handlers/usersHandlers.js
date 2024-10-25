const User = require("./../../../src/users/userSchema");
const { createSendToken } = require("../../auth/utils/createSendToken");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updatePassword = async (req, res) => {
  const { oldPassword, password, passwordConfirm } = req.body;

  try {
    const user = await User.findById(req.user._id).select("+password");
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

exports.getMyAccount = async (req, res) => {
  res.status(200).json({ user: req.user });
};

exports.updateMyAccount = async (req, res) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return res.status(404).json({
        message: "To change current password go to route /change-password",
      });
    }
    const { fullName, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userd,
      { fullName, email },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.deleteMyAccount = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { active: false });
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      role: req.body.role,
    });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { active: false });
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).send(err);
  }
};
