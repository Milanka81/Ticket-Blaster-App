const protected = (req, res, next) => {
  try {
    if (req.userRole === "admin") {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "This route is protected" });
  }
};
module.exports = { protected };
