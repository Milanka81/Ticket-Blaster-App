const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
app.use(cors());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour",
});

app.use("/api", limiter);

const authProxy = proxy("http://localhost:9000", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
});
const eventsProxy = proxy("http://localhost:9001", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/events${req.url}`;
  },
});
const usersProxy = proxy("http://localhost:9002", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/users${req.url}`;
  },
});
const uploadProxy = proxy("http://localhost:9003", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/upload${req.url}`;
  },
});

app.use("/api/v1/auth/", authProxy);
app.use("/api/v1/events/", eventsProxy);
app.use("/api/v1/users/", usersProxy);
app.use("/api/v1/upload/", uploadProxy);

app.listen(9005, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Proxy service started on port 9005");
});
