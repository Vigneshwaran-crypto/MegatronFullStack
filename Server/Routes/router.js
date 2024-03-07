import express from "express";
import {
  commentPost,
  createPost,
  editUserNameOrBio,
  getAllPosts,
  getAllUsers,
  getPostComments,
  getUserPosts,
  likePost,
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
router.post("/createPost", createPost);
router.post("/getAllPosts", getAllPosts);
router.post("/userPosts", getUserPosts);
router.post("/likePost", likePost);
router.post("/commentPost", commentPost);
router.post("/getPostComments", getPostComments);

export default router;
