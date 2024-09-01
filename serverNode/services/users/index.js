const express = require("express");
const users = require("./handlers/usersHandlers");
const db = require("../../pkg/db/index");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

db.init();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/api/v1/users", users.getAllUsers);

app.get("/api/v1/users", users.getAllUsers);
app.get("/api/v1/users/:id", users.getUser);
app.patch("/api/v1/users/:id", users.updateUser);
app.patch("/api/v1/users/update-my-account", users.updateMyAccount);
app.delete("/api/v1/users/delete-my-account", users.deleteMyAccount);
app.delete("/api/v1/users/:id", users.deleteUser);

app.listen(process.env.PORTUSERS, (err) => {
  if (err) {
    console.log("Could not start service");
  }
  console.log(`service started successfully on port ${process.env.PORTUSERS}`);
});
