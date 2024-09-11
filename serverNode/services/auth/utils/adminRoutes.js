const adminRoutes = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    }
    return res.status(401).json({ message: "This route is protected" });
  } catch (error) {
    res.status(401).send(error);
  }
};
module.exports = { adminRoutes };
