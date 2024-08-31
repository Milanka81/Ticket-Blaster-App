const User = require("./../../../pkg/users/userSchema");
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

exports.updateMyAccount = async (req, res) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return res.status(404).json({
        message: "To change current password go to route /change-password",
      });
    }

    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).send(err);
  }
};

/////////////////            NO ROUTES YET              ////////////////////////////////

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(user);
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
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    res.status(200).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).send(err);
  }
};
