const express = require("express");
const auth = require("./handlers/authHandlers");
const authVerify = require("./utils/auth");
const db = require("../../src/db/index");
const cors = require("cors");
// const helmet = require("helmet");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
db.init();
// app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    maxAge: 900000,
  })
);
app.use("/api/v1/auth", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/v1/auth/register", auth.register);
app.post("/api/v1/auth/login", auth.login);
app.post("/api/v1/auth/forgot-password", auth.forgotPassword);
app.patch("/api/v1/auth/reset-password/:token", auth.resetPassword);
app.get("/api/v1/auth/verify-email/:token", auth.verifyEmail);
app.get("/api/v1/auth/logout", auth.logout);
app.get("/api/v1/auth/me", auth.isLoggedin);
app.listen(process.env.PORTAUTH, (err) => {
  if (err) {
    console.log("Could not start service");
  }
  console.log(`service started successfully on port ${process.env.PORTAUTH}`);
});
