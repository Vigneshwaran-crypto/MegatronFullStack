import express from "express";
import {
  editUserNameOrBio,
  getAllUsers,
  logIn,
  signIn,
  signUp,
} from "../Controller/auth.js";

const router = express.Router();

// router.post("/login", logIn);

router.post("/login", signIn);
router.post("/createUser", signUp);
router.post("/getAllUsers", getAllUsers);
router.post("/editUserNameOrBio", editUserNameOrBio);

export default router;
