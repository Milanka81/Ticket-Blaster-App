const express = require("express");
const users = require("./handlers/usersHandlers");
const auth = require("./../auth/utils/auth");
const protected = require("../auth/utils/adminRoutes");
const db = require("../../src/db/index");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { upload } = require("../middlewares/uploadImage");
db.init();
app.use(helmet());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    maxAge: 900000,
  })
);
app.use(cookieParser());
app.use("/api/v1/users", auth.tokenVerify);
app.get("/api/v1/users/get-my-account", users.getMyAccount);
app.patch(
  "/api/v1/users/update-my-account",
  upload.single("avatarImage"),
  users.updateMyAccount
);
app.patch("/api/v1/users/change-password", users.changeMyPassword);
app.delete("/api/v1/users/delete-my-account", users.deleteMyAccount);

app.use("/api/v1/users", protected.adminRoutes);

app.get("/api/v1/users", users.getAllUsers);
app.get("/api/v1/users/:id", users.getUser);
app.patch("/api/v1/users/toggle-role", users.updateUserRole);
app.delete("/api/v1/users/:id", users.deleteUser);

app.listen(process.env.PORTUSERS, (err) => {
  if (err) {
    console.log("Could not start service");
  }
  console.log(`service started successfully on port ${process.env.PORTUSERS}`);
});
