const User = require("./../models/userModel");

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
      return res.status(404).send();
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
      return res.status(404).send();
    }
    res.status(200).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).send(err);
  }
};
