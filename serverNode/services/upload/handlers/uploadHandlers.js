const User = require("../../../src/users/userSchema");
const Event = require("./../../../src/events/eventSchema");

exports.uploadUserAvatar = async (req, res) => {
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
exports.uploadEventCover = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded." });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        imageCover: `${req.file.filename}`,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.send({
      message: "Event cover images uploaded successfully.",
      data: { event },
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "Error uploading event cover image" });
  }
};
exports.uploadEventImages = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send({ message: "No file uploaded." });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        images: req.files.map((el) => el.filename),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.send({
      message: "Event images are uploaded successfully.",
      data: { event },
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "Error uploading event images" });
  }
};
