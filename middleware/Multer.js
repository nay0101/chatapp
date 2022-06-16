const multer = require("multer");
const BASE_STORAGE = "public";

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${BASE_STORAGE}/profile_pictures`);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const profileUploads = multer({ storage: profileStorage });

module.exports = { profileUploads };
