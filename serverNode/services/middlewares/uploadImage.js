const multer = require("multer");
const path = require("path");
const fs = require("fs");
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

module.exports = { upload };
