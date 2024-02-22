import express from "express";
import { logIn, signIn, signUp } from "../Controller/auth.js";

const router = express.Router();

// router.post("/login", logIn);

router.post("/login", signIn);
router.post("/createUser", signUp);

export default router;
