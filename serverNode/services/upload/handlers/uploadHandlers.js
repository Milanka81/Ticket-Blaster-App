const User = require("../../../src/users/userSchema");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded." });
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        avatarImage: `${req.file.filename}`,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.send({
      message: "Avatar uploaded successfully.",
      data: { user },
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "Error uploading avatar" });
  }
};
