const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((connection) => {
    console.log("DB connected successfully");
  })
  .catch((err) => console.log("Connection error: ", err));

module.exports = mongoose;
