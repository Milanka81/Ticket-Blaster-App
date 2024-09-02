const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const db = require("../../src/db/index");
const auth = require("../auth/utils/auth");
const { uploadImage } = require("./handlers/uploadHandlers");

db.init();
const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const uploads = "./services/upload/images";
    if (!fs.existsSync(uploads)) {
      fs.mkdirSync(uploads);
    }
    callback(null, uploads);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(auth.tokenVerify, upload.single("image"));

app.patch("/api/v1/upload", uploadImage);

app.listen(process.env.PORTUPLOAD, (err) => {
  if (err) {
    console.log("Could not start upload service");
  }
  console.log(
    `Upload service started successfully on port ${process.env.PORTUPLOAD}`
  );
});
