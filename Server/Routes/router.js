import express from "express";
import { logIn } from "../Controller/controller.js";

const router = express.Router();

router.get("/login", logIn);

export default router;
