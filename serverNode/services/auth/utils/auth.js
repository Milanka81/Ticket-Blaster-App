const jwt = require("jsonwebtoken");
const User = require("./../../../pkg/users/userSchema");

const tokenVerify = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    const currentUser = await User.findById(req.userId);
    req.userRole = currentUser.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = { tokenVerify };
