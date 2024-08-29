const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const auth = require("./../middleware/auth");
const protectedRoutes = require("./../middleware/protectedRoutes");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.put("/reset-password/:token", authController.resetPassword);
router.put("/change-password", auth.tokenVerify, authController.updatePassword);

router.get(
  "/",
  auth.tokenVerify,
  protectedRoutes.protected,
  userController.getAllUsers
);
module.exports = router;
