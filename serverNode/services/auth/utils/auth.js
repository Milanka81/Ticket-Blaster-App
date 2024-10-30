const jwt = require("jsonwebtoken");
const User = require("./../../../src/users/userSchema");

const tokenVerify = async (req, res, next) => {
  if (!req.cookies?.jwt) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  try {
    // const token = req.headers.authorization.replace("Bearer ", "");
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    const currentUser = await User.findById(req.userId);
    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = { tokenVerify };
