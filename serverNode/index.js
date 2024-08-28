const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
require("./config/db");

const eventRouter = require("./routes/eventRoutes");
const userRouter = require("./routes/userRoutes");
const { tokenVerify } = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/events", tokenVerify, eventRouter);
app.use("/users", userRouter);

app.listen(8080, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
