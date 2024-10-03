const express = require("express");
const authentication = require("./handlers/authHandlers");
const auth = require("./utils/auth");
const db = require("../../src/db/index");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    maxAge: 12,
  })
);
db.init();
app.use(helmet());

app.post("/api/v1/auth/register", authentication.register);
app.post("/api/v1/auth/login", authentication.login);
app.post("/api/v1/auth/forgot-password", authentication.forgotPassword);
app.patch("/api/v1/auth/reset-password/:token", authentication.resetPassword);
app.get("/api/v1/auth/verify-email/:token", authentication.verifyEmail);
app.post("/api/v1/auth/verificationToken", authentication.sendVerification);
app.get("/api/v1/auth/logout", authentication.logout);
app.get("/api/v1/auth/me", auth.tokenVerify, authentication.isLoggedin);

app.listen(process.env.PORTAUTH, (err) => {
  if (err) {
    console.log("Could not start service");
  }
  console.log(`service started successfully on port ${process.env.PORTAUTH}`);
});
