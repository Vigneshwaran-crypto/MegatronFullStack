import express from "express";
import {
  editUserNameOrBio,
  getAllUsers,
  logIn,
  signIn,
  signUp,
  userImagesUpload,
} from "../Controller/auth.js";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

// router.post("/login", logIn);

router.post("/login", signIn);
router.post("/createUser", signUp);
router.post("/getAllUsers", getAllUsers);
router.post("/editUserNameOrBio", editUserNameOrBio);
router.post("/userImagesUpload", userImagesUpload);

const path =
  "/Users/admin/Desktop/Vignesh/imageBank/1709209056472-480040326.jpg";

if (fs.existsSync(path)) {
  console.log("File exists");
} else {
  console.error("File does not exist");
}

fs.access(path, fs.constants.R_OK, (err) => {
  if (err) {
    console.log("error while getting permisson :", err);
  } else {
    console.log("File is readable");
  }
});

// router.post(
//   "/userImagesUpload",
//   upload.single("fileData"),
//   (req, res, next) => {
//     console.log("userImagesUpload hit :", req.file);
//     console.log("userImagesUpload body :", req.body);
//   }
// );

export default router;
