const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const db = require("../../src/db/index");
const auth = require("../auth/utils/auth");
const protected = require("./../auth/utils/adminRoutes");
const {
  uploadEventImages,
  uploadUserAvatar,
  uploadEventCover,
} = require("./handlers/uploadHandlers");

db.init();
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    maxAge: 900000,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const uploads = "public/images/";
    if (!fs.existsSync(uploads)) {
      fs.mkdirSync(uploads);
    }
    callback(null, uploads);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    return callback(null, true);
  }
  return callback(new Error("File is not an image"), false);
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

// const uploadEventImages = upload.fields([
//   { name: "avatarImage", maxCount: 1 },
//   { name: "images", maxCount: 3 },
// ]);

upload.array("images", 5);

app.use(auth.tokenVerify);

app.patch("/api/v1/upload/avatar", upload.single("image"), uploadUserAvatar);

app.use(protected.adminRoutes);

app.patch(
  "/api/v1/upload/eventCover/:id",
  upload.single("image"),
  uploadEventCover
);
app.patch(
  "/api/v1/upload/eventImages/:id",
  upload.array("images", 3),
  uploadEventImages
);

app.listen(process.env.PORTUPLOAD, (err) => {
  if (err) {
    console.log("Could not start upload service");
  }
  console.log(
    `Upload service started successfully on port ${process.env.PORTUPLOAD}`
  );
});
